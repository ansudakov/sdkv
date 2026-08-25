export const site = {
  name: "Александр Судаков",
  role: "Редактор, контент-лид, креативный копирайтер",
  domain: "sdkv.ru",
  url: "https://sdkv.ru",
  email: "a.n.sudakov@gmail.com",
  telegram: "https://t.me/sashasdkv",
  telegramHandle: "@sashasdkv",
  telegramContact: "https://t.me/sashasudakov",
  instagram: "https://www.instagram.com/ademoscu",
  instagramHandle: "@ademoscu",
  resume: "https://hh.ru/resume/2e68dc8bff07075f900039ed1f556c79685871",
  description:
    "Сеньор-редактор, контент-лид и креативный копирайтер. Пишу, руковожу редакциями и снимаю рилсы.",
};

export const nav = [
  { href: "/projects", label: "Проекты" },
  { href: "/work", label: "Работы" },
  { href: "/blog", label: "Блог" },
  { href: "/photos", label: "Фото" },
];

export type IconKey =
  | "timeweb"
  | "hostman"
  | "alfa"
  | "tbank"
  | "yandex"
  | "alpina"
  | "skillbox"
  | "vk"
  | "communicator"
  | "batumi"
  | "flag"
  | "misc";

export type WorkLink = {
  label: string;
  url: string;
};

export type WorkCase = {
  slug: string;
  icon: IconKey;
  company: string;
  tagline: string;
  period?: string;
  audience?: string;
  body: string[];
  highlights: string[];
  links: WorkLink[];
};

export const workCases: WorkCase[] = [
  {
    slug: "timeweb-cloud",
    icon: "timeweb",
    company: "Timeweb Cloud",
    tagline: "Главред облачного провайдера",
    period: "Апрель 2022 — настоящее время · 4 года 5 месяцев",
    audience: "Разработчики и IT-компании, b2b",
    body: [
      "Главредил российским облачным провайдером из Питера, у которого достаточно амбиций, чтобы конкурировать с самыми известными грандами рынка.",
      "Переписал все продуктовые лендинги на сайте и запустил новые — около 100 страниц. Разработал ToV: не гиковский, но технически подкованный язык.",
      "Перепродумал телеграм-канал компании: ресурсный подход вместо контента ради контента. Канал вырос с 2 000 до 10 000 подписчиков.",
      "Запустил ежемесячный дайджест обновлений — статья, рассылка и пост в телеграме. Выстроил систему клиентских кейсов: дорожную карту, вопросы для интервью, единую структуру.",
      "Занимались велком-посадками и UX-текстами в личном кабинете, составили общую редполитику облачного провайдера.",
    ],
    highlights: [
      "~100 продуктовых лендингов",
      "ТГ-канал: 2 000 → 10 000 подписчиков",
      "Ежемесячный дайджест обновлений",
      "Система клиентских кейсов",
      "Редполитика с нуля",
    ],
    links: [
      { label: "Главная страница сайта", url: "https://docs.google.com/document/d/1g-EmE_iaaHLGTwmuzRcgDZ96JOzgJn505VW-txdX9Jg/edit?usp=share_link" },
      { label: "Страница о компании", url: "https://docs.google.com/document/d/19Thy8K3sS7FpStLbJ8rIeew2hGqOU0sqefwMUwALw1c/edit?usp=share_link" },
      { label: "Посты для ТГ, ВК и Дзена", url: "https://docs.google.com/document/d/1P8j9HDL5Cff0W36GaGMrm2Ajf8gWGgEP145ATi79c5Y/edit?usp=share_link" },
      { label: "Клиентские кейсы", url: "https://timeweb.cloud/success-story" },
      { label: "Тон-оф-войс компании", url: "https://docs.google.com/document/d/1pkMBuumORmv_bFnBk7C9mJGXJ0c9xhzxjxNfsB1Ta4M/edit?usp=share_link" },
      { label: "Дайджест обновлений", url: "https://timeweb.cloud/blog/digest-july-2023" },
      { label: "Кейс про дайджест на vc.ru", url: "https://vc.ru/u/66957-timeweb-cloud/898702-digest-as-a-product-kak-rasskazyvat-pro-novye-fichi-regulyarno-mnogo-frendli-i-bez-podvigov" },
      { label: "Фигма: UX-тексты, пуши, карточки", url: "https://www.figma.com/file/hpMbg8ETlyD64ijPdQ8don/%D0%A2%D0%B5%D0%BA%D1%81%D1%82%D1%8B-Timeweb-Cloud?type=design&node-id=1534%3A851&mode=design" },
    ],
  },
  {
    slug: "hostman",
    icon: "hostman",
    company: "Hostman",
    tagline: "Cloud-as-a-Service для англоязычной аудитории",
    period: "Сентябрь 2022 — Март 2024 · 1 год 7 месяцев",
    audience: "Developers, English-speaking market",
    body: [
      "Глобальный облачный провайдер. Обновил сайт с учётом аудитории, редакторских практик, SEO и UX-принципов.",
      "Пригласил в команду сильного англоязычного автора Сергея Короля — и вместе выстроили редакцию, которая говорит на языке разработчиков.",
    ],
    highlights: [
      "Home page и SEO-страницы баз данных",
      "MySQL / PostgreSQL / MongoDB / Redis",
      "Англоязычная редакция с нуля",
    ],
    links: [
      { label: "Home page", url: "https://docs.google.com/document/d/1j36m45hK4HovnbJPoIBPASvgJNv2_mpNnkOsYQDfCWI/edit?usp=sharing" },
      { label: "Managed databases", url: "https://docs.google.com/document/d/1k4oh05ya7CFtctLFKa-oZcYCcuLodvd8PGpvCfDt3pw/edit" },
      { label: "SEO-страница про базы данных", url: "https://docs.google.com/document/d/1tYuI8OWti1W8b_D6eKv6FlE_X3surQfPGHX5MgsZ_mU/edit?usp=sharing" },
      { label: "MySQL", url: "https://docs.google.com/document/d/1uNGuUhlwo6ImFncvvJLwtAp_951gN4oYspS3TeKZgow/edit?usp=sharing" },
      { label: "PostgreSQL", url: "https://docs.google.com/document/d/1zTCuly20Pe-GJljenpjTrfRApP4qquYSxvClXNGad0M/edit?usp=sharing" },
      { label: "MongoDB", url: "https://docs.google.com/document/d/1b13YVkdQr_gukvT7_pqtL5uk8_sS2VOQ7c6eVOPckNI/edit?usp=sharing" },
      { label: "Redis", url: "https://docs.google.com/document/d/1V51ALb0uB4uVOJ1sP64orvmSL4RwRh6I7cu-QITT_6M/edit?usp=sharing" },
      { label: "Cloud Servers", url: "https://docs.google.com/document/d/1WuuhrEbeb50PGvH_2EcaF3xVCTFT3Ts1GPcRO5YWdws/edit?usp=sharing" },
    ],
  },
  {
    slug: "batumi",
    icon: "batumi",
    company: "«Свой Дубай» в Батуми",
    tagline: "Премиальный лендинг на английском",
    body: [
      "Английский лендинг премиального жилого комплекса в Батуми — с позиционированием «свой Дубай у моря».",
      "Работал с англоязычной аудиторией инвесторов: тон, структура и убедительность текста под премиальный сегмент недвижимости.",
    ],
    highlights: ["Премиум-сегмент", "Текст на английском", "Позиционирование проекта"],
    links: [
      { label: "Лендинг про Дубай в Батуми", url: "https://docs.google.com/document/d/1qvu7j1WqGXeOutNEpIp5yQ0uqYP6Cu4OzC9FHxdyWac/edit?usp=sharing" },
    ],
  },
  {
    slug: "alpina",
    icon: "alpina",
    company: "Альпина Паблишер",
    tagline: "Учебник о презентациях для недизайнеров",
    period: "Ноябрь 2021 — Октябрь 2022 · 1 год",
    body: [
      "Проектная работа: редактировал и готовил к публикации учебник про создание презентаций для недизайнеров. Заказчик — Академия презентаций и школа дизайна Bonnie&Slide.",
      "За референс взяли первое издание «Пиши, сокращай»: строгая структура + художественная часть в виде комикса, пронизывающего всю книгу.",
      "Написал сценарий комикса — в книгу он не вошёл, но это то, чем я особенно горжусь.",
    ],
    highlights: [
      "Полноценный учебник, 4 раздела",
      "Сценарий сквозного комикса",
      "Книга: Ozon и Wildberries",
    ],
    links: [
      { label: "Раздел 1: «Рыба презентации»", url: "https://docs.google.com/document/d/1Z3D3hv2JY290VDwZ-8TVluLlAuiBEoU4iaUvPzesVOg/edit?usp=sharing" },
      { label: "Раздел 2: «Композиция»", url: "https://docs.google.com/document/d/1qDn6QFM7fNk9NiO44_fpb2GKyau4akBWtmgBqB1hxu0/edit?usp=sharing" },
      { label: "Раздел 3: «Визуальная концепция»", url: "https://docs.google.com/document/d/1t_rjFcRJo14MzWbf_TKHf1kU4V09liDTcNoJp00EvL4/edit?usp=sharing" },
      { label: "Раздел 4: «Сложный контент»", url: "https://docs.google.com/document/d/1prrkE4VepdNFtMUzv--HjeCynr0UjAD4eI2h6RpA3Es/edit?usp=sharing" },
      { label: "Комикс: персонажи и сюжеты", url: "https://docs.google.com/document/d/1MHXUOyhVKSzWTwRaj099ZD7vjaQrYFtF1K65CTrz5zU/edit?usp=sharing" },
      { label: "Комикс: полный сценарий", url: "https://docs.google.com/document/d/1dJEnTLJL0vPecu39CvmsMNjcMqCjaYeOQiFMlWaWWWo/edit?usp=sharing" },
      { label: "Книга на Ozon", url: "https://www.ozon.ru/product/sekrety-uboynyh-prezentatsiy-nikolay-pere-svetlana-firsova-1393131873/" },
    ],
  },
  {
    slug: "yandex-delivery",
    icon: "yandex",
    company: "Яндекс Доставка",
    tagline: "Маркетинг и раздел «Помощь» с нуля",
    period: "Июль 2021 — Июнь 2022 · 1 год",
    body: [
      "Помогал подразделению Яндекс Доставки в качестве внештатного редактора.",
      "Занимался посадочными страницами, лендингами, рассылками, презентациями, пушами и баннерами в приложении Яндекс Go.",
      "С нуля запустили раздел «Справка» и наполнили его инструкциями по всем продуктам, которые были на тот момент.",
    ],
    highlights: [
      "Раздел «Помощь» с нуля",
      "Пуши и баннеры в приложении",
      "Шаблоны писем для клиентов",
    ],
    links: [
      { label: "Карточки «Актуальное»", url: "https://docs.google.com/document/d/14KVeYmE1URPBVDoozrKEV5qlomflmsw4GSQqm3gjld0/edit?usp=sharing" },
      { label: "Фигма: пуши и баннеры", url: "https://www.figma.com/file/2aYHh1WTPvRSia2DOmK0cD/%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD%D1%8B-%D0%B4%D0%BB%D1%8F-%D0%B8%D0%BD%D0%B0%D0%BF%D0%BF%D0%BE%D0%B2?node-id=262%3A2923" },
      { label: "Лендинг про доставку по ссылке", url: "https://www.figma.com/file/U4vlBvFZ17QFehRn53EnXA/%D0%BB%D0%B5%D0%BD%D0%B4%D0%B8%D0%BD%D0%B3-%D1%8F%D0%BD%D0%B4%D0%B5%D0%BA%D1%81-%D0%B4%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0-%D0%BF%D0%BE-%D1%81%D1%81%D1%8B%D0%BB%D0%BA%D0%B5?node-id=0%3A1" },
      { label: "Тексты для личного кабинета", url: "https://www.figma.com/file/ZsLRBfLeHcKWlZO900SRSY/yandex-delivery?node-id=34%3A13347" },
      { label: "Раздел «Помощь»", url: "https://yandex.ru/support/delivery-profile/index.html" },
      { label: "Шаблоны писем", url: "https://docs.google.com/document/d/18fFgdBBNNEGKbeLWuQIagee4yNl5opGtNlv4yiQaXCk/edit?usp=sharing" },
    ],
  },
  {
    slug: "lebedev",
    icon: "flag",
    company: "Студия Артемия Лебедева",
    tagline: "Сайт бренда одежды Red Flag",
    body: [
      "Креативно копирайтил для Студии Лебедева: делали сайт бренда одежды Red Flag.",
    ],
    highlights: ["Бренд одежды", "Креативный копирайтинг"],
    links: [
      { label: "Студия Лебедева: сайт Red Flag", url: "https://www.artlebedev.ru/red-flag/" },
    ],
  },
  {
    slug: "alfa-bank",
    icon: "alfa",
    company: "Альфа-Банк",
    tagline: "Мультиформатный редактор в разгар редакторского движа",
    period: "Август 2019 — Сентябрь 2021 · 2 года 2 месяца",
    audience: "От частных клиентов до крупного бизнеса",
    body: [
      "Пришёл, когда редакторская культура в компании только зарождалась — стартапный драйв внутри огромной корпорации.",
      "За 2 года прошёл через все форматы: пуши, рассылки, лендинги, статьи на VC, посты в телеграм-каналах, тексты в интерфейсах.",
      "Занимался неймингом — продукты, мероприятия, акции, мерч. Строил воронку аутсорс-авторов почти на 1000 человек, отобрал 4 в штат.",
      "Писал сценарии рекламных роликов, дружил с PR-отделом, участвовал в исследованиях и А/Б-тестах.",
    ],
    highlights: [
      "Лендинги о тарифах для бизнеса",
      "Нейминг продуктов и акций",
      "Воронка из ~1000 авторов",
      "Сценарии рекламных роликов",
    ],
    links: [
      { label: "Лендинги о тарифах для бизнеса", url: "https://alfabank.ru/sme/tariffs/onepercent/" },
      { label: "Лендинг про овердрафт", url: "https://alfabank.ru/sme/profits/overdraft/" },
      { label: "Статья об изменениях в законодательстве", url: "https://docs.google.com/document/d/1zkQAIenn9Lwml19SGjdAa1F0HeWq53vN7zobkRoKLUo/edit" },
      { label: "Лендинг про карту для зарплаты", url: "https://www.figma.com/file/s6ZtqnchvAVFpTAMHOVdDo/%D0%9B%D0%B5%D0%BD%D0%B4%D0%B8%D0%BD%D0%B3-%D0%98%D0%97%D0%9A-%D1%82%D0%B5%D0%BA%D1%81%D1%82%D1%8B?node-id=0%3A1" },
      { label: "Онбординг зарплатного проекта", url: "https://www.figma.com/file/kYfVDjqoYrpGBQPTxvyi90/Concepts?node-id=0%3A1" },
    ],
  },
  {
    slug: "skillbox",
    icon: "skillbox",
    company: "Skillbox",
    tagline: "Единственный автор соцсетей 9 месяцев подряд",
    period: "Март 2019 — Ноябрь 2019 · 9 месяцев",
    body: [
      "Проектная работа: 9 месяцев был единственным автором в соцсетях одной из крупнейших образовательных платформ.",
      "Придумывал контент-план и писал все посты для FB, VK, TG, IG и YT.",
    ],
    highlights: ["Контент на 5 площадок", "Игры в сторис", "Анонсы мероприятий"],
    links: [
      { label: "Типичная неделя постов", url: "https://docs.google.com/document/d/1rHxKnfQx4bBSebbOz8HSAOjJzmovL9KMla9TBt7e4hc/edit#heading=h.s98sl2wux4tq" },
      { label: "Ещё одна неделя", url: "https://docs.google.com/document/d/1eyD5MjWxr7mqQ-IYXmF0U3pWOYc0al7llNMOZbyzYVw/edit" },
      { label: "Игры в сторис", url: "https://docs.google.com/document/d/1K26PSRew3OLgSS3FzTOz9c1n_Z1D2EVX6xeQZClpeMY/edit" },
      { label: "Анонсы мероприятий", url: "https://docs.google.com/document/d/1oFpuBS24m6r1De_zctMEDP-jvz9zNjwD4Dcl5_thKPQ/edit#heading=h.xei7ss7aw6bl" },
    ],
  },
  {
    slug: "vk",
    icon: "vk",
    company: "VK",
    tagline: "Mail.ru для бизнеса — статьи в корпоративный блог",
    body: [
      "Подработка на аутсорсе: писал статьи о том, как технологии помогают развивать бизнес — дропшиппинг, email-маркетинг, выбор между конструктором и разработкой сайта с нуля.",
    ],
    highlights: ["Формат «вопрос–ответ»", "Обзоры книг", "b2b-блог"],
    links: [
      { label: "Статья про дропшиппинг", url: "https://biz.mail.ru/blog/dropshipping-kak-otkryt-onlajn-magazin-bez-sklada-i-dostavki/" },
      { label: "Обзор книг про тексты", url: "https://biz.mail.ru/blog/kak-pisat-teksty-kotorye-privlekut-vnimanie-klientov-7-knig-i-koe-chto-eshhe/" },
      { label: "Обзор книг про email-маркетинг", url: "https://biz.mail.ru/blog/email-direct_marketing/" },
      { label: "Конструктор сайтов или разработка с нуля", url: "https://docs.google.com/document/d/1S7A5aEBI0Ff_10dNqCq95fypA04-qpfUAPcURxlfvnk/edit?usp=sharing" },
    ],
  },
  {
    slug: "t-bank",
    icon: "tbank",
    company: "Т-Банк",
    tagline: "Продуктовый редактор в Т-Бизнесе",
    period: "Июнь 2018 — Май 2019 · 1 год",
    body: [
      "Продуктовый редактор в Т-Бизнесе — подразделении банка для ИП, малого бизнеса, среднего и корпораций.",
      "Писал и редактировал статьи, лендинги, презентации, хелпы, рассылки и сторис.",
      "Управлял командой из 9 авторов: принимал задачи, распределял, искал новых, редактировал и выпускал тексты.",
    ],
    highlights: [
      "Команда из 9 авторов",
      "Лендинги, хелпы, сторис",
      "Про овердрафт, конструктор сайтов, регистрацию ИП",
    ],
    links: [
      { label: "Как работает овердрафт", url: "https://drive.google.com/file/d/1Cny_srTzGQN7RIkYLv-PJJGcODSSMBts/view?usp=sharing" },
      { label: "Сторис: конструктор сайтов", url: "https://docs.google.com/document/d/1UNRPV1YHAk2RfzPC5L3KByBRbCPbBkm-Dp41nOOLGGk/" },
      { label: "Сторис: регистрация ИП", url: "https://docs.google.com/document/d/1EHu3s9RHP4nB0QM0XY7xr0V-E8U1PnMb3FJrmcZ4Kb8/" },
      { label: "Лендинг для чата на сайт", url: "https://www.tinkoff.ru/business/chat/" },
      { label: "Хелп для СМС-рассылок", url: "https://help.tinkoff.ru/mailing-sms/" },
    ],
  },
  {
    slug: "communicator",
    icon: "communicator",
    company: "COMMUNICATOR Creative Events",
    tagline: "Первая редакторская роль — блог ивент-агентства",
    period: "Август 2017 — Июнь 2018 · 11 месяцев",
    body: [
      "Проектная работа в ивент-агентстве в роли главного редактора и издателя корпоративного блога.",
      "Придумал стратегию продвижения в интернете и контент-план для блога, привлёк автора для первых 10 обучающих статей, адресованных потенциальным заказчикам агентства.",
      "Привлёк дизайнера и верстальщика — вместе разработали новый фирменный стиль и сайт компании.",
    ],
    highlights: [
      "Первая редакторская роль",
      "Контент-стратегия блога с нуля",
      "Новый фирстиль и сайт агентства",
    ],
    links: [
      { label: "Статьи для блога агентства", url: "http://creativevents.ru/articles/" },
      { label: "Сайт агентства", url: "http://creativevents.ru/" },
      { label: "Сайт студии компьютерной графики", url: "http://greenfx.ru/" },
      { label: "Сайт юрфирмы для ритейла", url: "http://retailtrusts.ru/" },
    ],
  },
  {
    slug: "misc",
    icon: "misc",
    company: "Разные работы",
    tagline: "Винегрет из лендингов, статей и презентаций — из разных лет",
    body: [
      "Отдельные проекты вне штата и вне долгих контрактов: лендинги, UX-тексты, статьи и презентации для разных заказчиков. Пополняется по мере новых работ.",
      "Редачил для Газпромбанк Инвестиций, Yota и Райффайзен Банка.",
    ],
    highlights: [
      "6 разных заказчиков",
      "Лендинги, статьи, презентации",
      "Газпромбанк, Yota, Райффайзен",
    ],
    links: [
      { label: "Статья для Райффайзен Банка", url: "https://www.raiffeisen-media.ru/zhizn/gde-eshhe-prodat-starye-veshhi-smartfony-mebel-i-nenuzhnye-bilety-krome-kak-na-avito-i-yule/" },
      { label: "Газпромбанк Инвестиции: экраны входа", url: "https://www.figma.com/file/A9kQukRawXGJrcTwhSqEJG/Self%3A-%D0%93%D0%9F%D0%91-%D0%A3%D0%90-%D0%9B%D0%9A-%D0%94%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD?node-id=8662%3A1" },
      { label: "Презентация для ThePartners", url: "https://docs.google.com/presentation/d/1pxvLr8Vof0VWfhbU-ywsuUYuvk1Lxp6hf52IP51UkUs/edit?usp=sharing" },
      { label: "Статья про надёжность застройщика", url: "https://docs.google.com/document/d/1jTCfxywRpvDN02U3mo8yvxQJmroSj1l5sER69v9Jlo4/" },
      { label: "Интервью для Бюро Горбунова", url: "http://studentbureau.ru/anna-chjornaja/" },
      { label: "Статья про страх перед психологами", url: "https://lively.ru/psihologicheskaja-pomoshh/" },
    ],
  },
];

export type ExperienceItem = {
  period: string;
  duration: string;
  company: string;
  role: string;
  location: string;
  icon: IconKey;
  summary: string;
};

export const experience: ExperienceItem[] = [
  {
    period: "Апрель 2022 — настоящее время",
    duration: "4 года 5 месяцев",
    company: "Timeweb Cloud",
    role: "Главный редактор, content lead",
    location: "Санкт-Петербург",
    icon: "timeweb",
    summary:
      "Редакция b2b-облака: продуктовые лендинги, рассылки, телеграм-канал, дайджесты, кейсы, редполитика.",
  },
  {
    period: "Сентябрь 2022 — Март 2024",
    duration: "1 год 7 месяцев",
    company: "Hostman",
    role: "Editor-in-chief, editor",
    location: "Кипр, hostman.com",
    icon: "hostman",
    summary: "Англоязычная редакция международного Cloud-as-a-Service провайдера.",
  },
  {
    period: "Ноябрь 2021 — Октябрь 2022",
    duration: "1 год",
    company: "«Альпина Паблишер»",
    role: "Литературный редактор, сценарист",
    location: "Москва",
    icon: "alpina",
    summary: "Учебник о презентациях для недизайнеров — редактура и сценарий комикса.",
  },
  {
    period: "Июль 2021 — Июнь 2022",
    duration: "1 год",
    company: "Яндекс",
    role: "IT-редактор",
    location: "Москва",
    icon: "yandex",
    summary:
      "Внештатный редактор Яндекс Доставки: маркетинговые тексты и раздел «Справка» с нуля.",
  },
  {
    period: "Август 2019 — Сентябрь 2021",
    duration: "2 года 2 месяца",
    company: "Альфа-Банк (Россия)",
    role: "Продуктовый редактор, креативный копирайтер",
    location: "Москва",
    icon: "alfa",
    summary:
      "Все форматы редактуры для всех направлений банка, нейминг, работа с аутсорс-авторами.",
  },
  {
    period: "Март 2019 — Ноябрь 2019",
    duration: "9 месяцев",
    company: "Skillbox",
    role: "Редактор соцсетей",
    location: "Россия",
    icon: "skillbox",
    summary: "Единственный автор соцсетей образовательной платформы: FB, VK, TG, IG, YT.",
  },
  {
    period: "Июнь 2018 — Май 2019",
    duration: "1 год",
    company: "Т-Банк",
    role: "Продуктовый редактор",
    location: "Москва",
    icon: "tbank",
    summary: "Т-Бизнес: статьи, лендинги, презентации, хелпы — и команда из 9 авторов.",
  },
  {
    period: "Август 2017 — Июнь 2018",
    duration: "11 месяцев",
    company: "COMMUNICATOR Creative Events",
    role: "Главный редактор, издатель корпоративного блога",
    location: "Москва",
    icon: "communicator",
    summary: "Первая редакторская роль: контент-стратегия и запуск блога ивент-агентства.",
  },
];

export const education = [
  {
    year: "2025",
    title: "Курс по рилсам от Никиты из Одиннадцать",
    org: "Одиннадцать, Рилс-мейкер",
  },
  { year: "2023", title: "Английский язык (C1)", org: "Duolingo" },
  { year: "2022", title: "Сильный текст в соцсетях", org: "Skill Cup" },
  { year: "2022", title: "Визуальные презентации", org: "Яндекс Практикум" },
  { year: "2022", title: "Академия презентаций", org: "Bonnie & Slide" },
  {
    year: "2018",
    title: "Школа редакторов Бюро Горбунова: 3 ступени",
    org: "Бюро Горбунова, Редактор",
  },
  { year: "2018", title: "Продвинутый курс Главреда", org: "Максим Ильяхов" },
  { year: "2018", title: "Работа с клиентом для редакторов", org: "Максим Ильяхов" },
];

export const skills = [
  "Копирайтинг",
  "Редактирование текстов",
  "Литературное редактирование",
  "SEO-копирайтинг",
  "UX-тексты",
  "SMM-тексты",
  "Рассылки",
  "Написание сценариев",
  "Написание пресс-релизов",
  "Деловая переписка",
  "Корректура текстов",
  "Тон-оф-войс",
  "Figma",
  "Content editor",
  "Управление авторами",
  "ChatGPT и нейросети",
  "Контентные метрики",
  "Английский — C1",
];

export const experienceStats = {
  years: "9 лет",
  companies: `${experience.length}`,
};
