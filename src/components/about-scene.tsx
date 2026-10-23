"use client";

import { Suspense, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { TrackballControls, useGLTF } from "@react-three/drei";
import { useTheme } from "next-themes";
import { BackSide, Box3, Color, Mesh, ShaderMaterial, Vector3, type Group } from "three";

// Геометрия скана без текстуры: рисуем её штриховкой, как скетч.
const MODEL_URL = "/models/me-sketch.glb";

const TARGET_HEIGHT = 1.8;
const OUTLINE_WIDTH = 0.005;

const vertexShader = /* glsl */ `
  uniform float uOutline;
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec3 pos = position + normal * uOutline;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fillFragment = /* glsl */ `
  uniform vec3 uPaper;
  uniform vec3 uInk;
  uniform vec3 uAccent;
  varying vec3 vNormal;

  float hatch(vec2 p, float angle, float period) {
    float c = cos(angle), s = sin(angle);
    float v = p.x * c + p.y * s;
    return smoothstep(0.32, 0.5, abs(fract(v / period) - 0.5));
  }

  void main() {
    vec3 n = normalize(vNormal);
    vec3 light = normalize(vec3(-0.45, 0.55, 0.7));
    float tone = clamp(dot(n, light) * 0.5 + 0.5, 0.0, 1.0);
    float dark = 1.0 - tone;

    vec2 p = gl_FragCoord.xy;
    float ink = (1.0 - hatch(p, 0.785, 7.0)) * step(0.38, dark);
    float cross = (1.0 - hatch(p, -0.785, 7.0)) * step(0.62, dark);
    float rim = 1.0 - abs(n.z);
    float band = smoothstep(0.55, 0.68, rim) * (1.0 - smoothstep(0.8, 0.9, rim));

    vec3 color = mix(uPaper, uInk, ink * 0.9);
    color = mix(color, uAccent, max(cross, band * 0.85));
    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
  }
`;

const outlineFragment = /* glsl */ `
  uniform vec3 uInk;
  void main() {
    gl_FragColor = vec4(uInk, 1.0);
    #include <colorspace_fragment>
  }
`;

function SketchModel({
  dragging,
  onReady,
}: {
  dragging: { current: boolean };
  onReady: () => void;
}) {
  const { scene } = useGLTF(MODEL_URL);
  const { resolvedTheme } = useTheme();
  const ref = useRef<Group>(null);
  const spin = useRef<Group>(null);
  const dark = resolvedTheme === "dark";

  const { fill, outline, model } = useMemo(() => {
    const paper = new Color(dark ? "#2b2118" : "#fbfaf6");
    const ink = new Color(dark ? "#ebe6d9" : "#0d0d0c");
    const accent = new Color(dark ? "#ffc233" : "#f2b200");
    const fill = new ShaderMaterial({
      vertexShader,
      fragmentShader: fillFragment,
      uniforms: {
        uPaper: { value: paper },
        uInk: { value: ink },
        uAccent: { value: accent },
        uOutline: { value: 0 },
      },
    });
    const outline = new ShaderMaterial({
      vertexShader,
      fragmentShader: outlineFragment,
      side: BackSide,
      uniforms: { uInk: { value: ink }, uOutline: { value: OUTLINE_WIDTH } },
    });
    const model = scene.clone(true);
    const meshes: Mesh[] = [];
    model.traverse((obj) => {
      if (obj instanceof Mesh) meshes.push(obj);
    });
    for (const mesh of meshes) {
      mesh.material = fill;
      mesh.add(new Mesh(mesh.geometry, outline));
    }
    return { fill, outline, model };
  }, [scene, dark]);

  useLayoutEffect(() => {
    const group = ref.current;
    if (!group) return;
    group.scale.setScalar(1);
    group.position.set(0, 0, 0);
    const box = new Box3().setFromObject(group);
    const size = box.getSize(new Vector3());
    group.scale.setScalar(TARGET_HEIGHT / size.y);
    const fitted = new Box3().setFromObject(group);
    const center = fitted.getCenter(new Vector3());
    group.position.set(-center.x, -fitted.min.y, -center.z);
    return () => {
      fill.dispose();
      outline.dispose();
    };
  }, [model, fill, outline]);

  useEffect(() => {
    onReady();
  }, [onReady]);

  useFrame((_, delta) => {
    if (spin.current && !dragging.current) spin.current.rotation.y += delta * 0.3;
  });

  return (
    <group ref={spin}>
      <group ref={ref}>
        <primitive object={model} />
      </group>
    </group>
  );
}

export default function AboutScene({ onReady }: { onReady: () => void }) {
  const dragging = useRef(false);

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 1.1, 3.6], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      aria-label="3D-фигура. Можно крутить"
    >
      <Suspense fallback={null}>
        <SketchModel dragging={dragging} onReady={onReady} />
      </Suspense>
      <TrackballControls
        target={[0, 0.9, 0]}
        noZoom
        noPan
        rotateSpeed={3}
        dynamicDampingFactor={0.12}
        onStart={() => {
          dragging.current = true;
        }}
        onEnd={() => {
          dragging.current = false;
        }}
      />
    </Canvas>
  );
}

useGLTF.preload(MODEL_URL);
