import crypto from "node:crypto";
import fs from "node:fs";

const KEY_PATH = new URL("../google-service-account.json", import.meta.url);

export async function googleToken(scope) {
  const key = JSON.parse(fs.readFileSync(KEY_PATH, "utf8"));
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const unsigned = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({
    iss: key.client_email,
    scope,
    aud: key.token_uri,
    iat: now,
    exp: now + 3600,
  })}`;
  const sig = crypto.createSign("RSA-SHA256").update(unsigned).sign(key.private_key, "base64url");
  const res = await fetch(key.token_uri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${sig}`,
    }),
  });
  const json = await res.json();
  if (!json.access_token) throw new Error(`token: ${JSON.stringify(json)}`);
  return json.access_token;
}
