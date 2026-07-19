import type { Localized } from "@/lib/i18n";

export interface ServiceTier {
  name: Localized;
  audience: Localized;
  description: Localized;
}

export interface Faq {
  question: Localized;
  answer: Localized;
}

export type ServiceRoute = "syria" | "gulf";

export interface Service {
  slug: string;
  /** Which audience route the service belongs to (drives landing-page grouping). */
  route: ServiceRoute;
  name: Localized;
  short: Localized;
  problem: Localized;
  approach: Localized;
  deliverables: Localized<string[]>;
  forWho: Localized;
  tiers: ServiceTier[];
  faqs: Faq[];
}

const standardTiers = (
  workshop: Localized,
  project: Localized,
  retainer: Localized
): ServiceTier[] => [
  {
    name: { en: "Workshop / audit", ar: "ورشة عمل / تدقيق" },
    audience: { en: "SMEs and first explorations", ar: "الشركات الصغيرة والمتوسطة والاستكشاف الأولي" },
    description: workshop,
  },
  {
    name: { en: "Strategy engagement", ar: "مشروع استراتيجي" },
    audience: { en: "Mid-size entrants", ar: "الشركات المتوسطة الداخلة إلى السوق" },
    description: project,
  },
  {
    name: { en: "Retainer / advisory", ar: "استشارة مستمرة" },
    audience: {
      en: "Large corporates and reconstruction-linked entities",
      ar: "الشركات الكبرى والكيانات المرتبطة بإعادة الإعمار",
    },
    description: retainer,
  },
];

export const services: Service[] = [
  {
    slug: "market-entry-strategy",
    route: "syria",
    name: { en: "Market-Entry Strategy", ar: "استراتيجية دخول السوق" },
    short: {
      en: "Research and strategy for a market where reliable data barely exists.",
      ar: "بحث واستراتيجية لسوقٍ تكاد تنعدم فيه البيانات الموثوقة.",
    },
    problem: {
      en: "Syria has no reliable market-research infrastructure. Sizing demand, understanding consumers, and choosing channels cannot rely on syndicated data that does not exist.",
      ar: "لا تملك سوريا بنية موثوقة لأبحاث السوق. لا يمكن تقدير الطلب أو فهم المستهلك أو اختيار القنوات اعتمادًا على بيانات جاهزة غير موجودة أصلًا.",
    },
    approach: {
      en: "We build proxy-data models from comparable markets (Jordan, Lebanon, pre-2011 Syrian baselines, diaspora behavior), then design targeted primary research — surveys, partner interviews, field checks — to close the gaps that matter for your decision. Every assumption is documented with its source.",
      ar: "نبني نماذج بيانات بديلة من أسواق مشابهة (الأردن، لبنان، خطوط الأساس السورية قبل 2011، سلوك الاغتراب)، ثم نصمّم بحثًا ميدانيًا موجّهًا — استطلاعات ومقابلات مع الشركاء وتحققًا ميدانيًا — لسدّ الفجوات المؤثرة في قرارك. كل افتراض موثّق بمصدره.",
    },
    deliverables: {
      en: [
        "Market sizing with documented proxy methodology",
        "Audience and channel map (Arabic-first)",
        "Competitive and substitute landscape",
        "Primary research design and field management",
        "Entry-marketing strategy with budget scenarios in USD",
      ],
      ar: [
        "تقدير حجم السوق بمنهجية بدائل موثّقة",
        "خريطة الجمهور والقنوات (العربية أولًا)",
        "مشهد المنافسين والبدائل",
        "تصميم البحث الميداني وإدارته",
        "استراتيجية تسويق للدخول بسيناريوهات ميزانية بالدولار",
      ],
    },
    forWho: {
      en: "Investors and operators at feasibility or pre-launch stage, in any sector.",
      ar: "المستثمرون والمشغّلون في مرحلة دراسة الجدوى أو ما قبل الإطلاق، في أي قطاع.",
    },
    tiers: standardTiers(
      {
        en: "A one-week readiness audit: what you know, what you don't, and what it costs to find out.",
        ar: "تدقيق جاهزية خلال أسبوع: ما تعرفه، وما تجهله، وكلفة معرفته.",
      },
      {
        en: "A 6–10 week market-entry strategy with proxy modeling and targeted primary research.",
        ar: "استراتيجية دخول سوق خلال 6–10 أسابيع مع نمذجة بديلة وبحث ميداني موجّه.",
      },
      {
        en: "Ongoing research and strategy support as your entry unfolds quarter by quarter.",
        ar: "دعم بحثي واستراتيجي مستمر مع تقدّم دخولك فصلًا بعد فصل.",
      }
    ),
    faqs: [
      {
        question: {
          en: "How can you size a market when Syria has no reliable data?",
          ar: "كيف تقدّرون حجم السوق وسوريا بلا بيانات موثوقة؟",
        },
        answer: {
          en: "We build proxy-data models from comparable markets — Jordan, Lebanon, pre-2011 Syrian baselines, and diaspora behavior — then close the gaps that matter for your decision with targeted primary research: surveys, partner interviews, and field checks. Every assumption is documented with its source.",
          ar: "نبني نماذج بيانات بديلة من أسواق مشابهة — الأردن ولبنان وخطوط الأساس السورية قبل 2011 وسلوك الاغتراب — ثم نسدّ الفجوات المؤثرة في قرارك ببحث ميداني موجّه: استطلاعات ومقابلات مع الشركاء وتحقق ميداني. وكل افتراض موثّق بمصدره.",
        },
      },
      {
        question: {
          en: "Who is market-entry strategy for?",
          ar: "لمن هذه الخدمة؟",
        },
        answer: {
          en: "Investors and operators at feasibility or pre-launch stage, in any sector.",
          ar: "المستثمرون والمشغّلون في مرحلة دراسة الجدوى أو ما قبل الإطلاق، في أي قطاع.",
        },
      },
      {
        question: {
          en: "How long does an engagement take?",
          ar: "كم يستغرق التعاون؟",
        },
        answer: {
          en: "A readiness audit takes one week. A full market-entry strategy with proxy modeling and targeted primary research runs 6–10 weeks. Ongoing research and strategy support is available as your entry unfolds quarter by quarter.",
          ar: "تدقيق الجاهزية يستغرق أسبوعًا واحدًا. والاستراتيجية الكاملة لدخول السوق مع النمذجة البديلة والبحث الميداني الموجّه تمتد من 6 إلى 10 أسابيع. ويتوافر دعم بحثي واستراتيجي مستمر مع تقدّم دخولك فصلًا بعد فصل.",
        },
      },
    ],
  },
  {
    slug: "responsible-investment-communications",
    route: "syria",
    name: {
      en: "Responsible Investment Communications",
      ar: "اتصالات الاستثمار المسؤول",
    },
    short: {
      en: "Stakeholder communications built for scrutiny, not spin.",
      ar: "اتصالات لأصحاب المصلحة تصمد أمام التدقيق ولا تجمّل الواقع.",
    },
    problem: {
      en: "Reconstruction investment is publicly scrutinized — by media, regulators, communities, and your own home-market stakeholders. Syria also remains under residual restrictions (state-sponsor designation, targeted sanctions, export controls), so what you say publicly carries real risk.",
      ar: "استثمارات إعادة الإعمار تخضع لتدقيق علني — من الإعلام والجهات الرقابية والمجتمعات المحلية وأصحاب المصلحة في بلدك الأم. وما تزال سوريا خاضعة لقيود متبقية (تصنيفات وعقوبات موجهة وقيود تصدير)، فما تقوله علنًا يحمل مخاطر حقيقية.",
    },
    approach: {
      en: "We build transparent reconstruction narratives: stakeholder mapping (including association-risk screening of local partners and public figures), message architecture that names risk honestly, and government- and community-facing communications in both languages. We work alongside your legal and compliance counsel — we do not replace them.",
      ar: "نبني سرديات إعمار شفافة: خريطة أصحاب المصلحة (بما فيها فحص مخاطر الارتباط بالشركاء المحليين والشخصيات العامة)، وهيكل رسائل يسمّي المخاطر بصدق، واتصالات موجهة للجهات الحكومية والمجتمعية باللغتين. نعمل إلى جانب مستشاريك القانونيين ومسؤولي الامتثال — ولا نحلّ محلهم.",
    },
    deliverables: {
      en: [
        "Stakeholder and association-risk map",
        "Message architecture and public-narrative playbook",
        "Government and community communications (AR/EN)",
        "Crisis and scrutiny-response protocols",
        "Home-market investor communications support",
      ],
      ar: [
        "خريطة أصحاب المصلحة ومخاطر الارتباط",
        "هيكل الرسائل ودليل السردية العامة",
        "اتصالات حكومية ومجتمعية بالعربية والإنجليزية",
        "بروتوكولات الأزمات والرد على التدقيق",
        "دعم التواصل مع المستثمرين في بلد المنشأ",
      ],
    },
    forWho: {
      en: "Any investor whose entry will be publicly visible — which, in Syria today, is every investor.",
      ar: "كل مستثمر سيكون دخوله مرئيًا للعامة — وهذا في سوريا اليوم يشمل كل مستثمر.",
    },
    tiers: standardTiers(
      {
        en: "A scrutiny-readiness audit of your current narrative and stakeholder exposure.",
        ar: "تدقيق جاهزية للتدقيق العلني: سرديتك الحالية وانكشافك أمام أصحاب المصلحة.",
      },
      {
        en: "A full stakeholder-communications strategy for your entry announcement and first year.",
        ar: "استراتيجية اتصالات متكاملة لإعلان دخولك وعامك الأول.",
      },
      {
        en: "Standing communications counsel through the reconstruction news cycle.",
        ar: "استشارة اتصالات دائمة عبر دورة أخبار إعادة الإعمار.",
      }
    ),
    faqs: [
      {
        question: {
          en: "Why do reconstruction investments need special communications?",
          ar: "لماذا تحتاج استثمارات إعادة الإعمار إلى اتصالات من نوع خاص؟",
        },
        answer: {
          en: "Reconstruction investment is publicly scrutinized — by media, regulators, communities, and your own home-market stakeholders. Syria also remains under residual restrictions such as targeted sanctions and export controls, so what you say publicly carries real risk.",
          ar: "استثمارات إعادة الإعمار تخضع لتدقيق علني — من الإعلام والجهات الرقابية والمجتمعات المحلية وأصحاب المصلحة في بلدك الأم. وما تزال سوريا خاضعة لقيود متبقية كالعقوبات الموجهة وقيود التصدير، فما تقوله علنًا يحمل مخاطر حقيقية.",
        },
      },
      {
        question: {
          en: "Do you replace legal or compliance counsel?",
          ar: "هل تحلّون محل المستشارين القانونيين ومسؤولي الامتثال؟",
        },
        answer: {
          en: "No. We work alongside your legal and compliance counsel — we do not replace them. Our work covers stakeholder mapping with association-risk screening, message architecture that names risk honestly, and government- and community-facing communications in both languages.",
          ar: "لا. نعمل إلى جانب مستشاريك القانونيين ومسؤولي الامتثال — ولا نحلّ محلهم. يشمل عملنا خريطة أصحاب المصلحة مع فحص مخاطر الارتباط، وهيكل رسائل يسمّي المخاطر بصدق، واتصالات موجهة للجهات الحكومية والمجتمعية باللغتين.",
        },
      },
      {
        question: {
          en: "Who needs this service?",
          ar: "من يحتاج هذه الخدمة؟",
        },
        answer: {
          en: "Any investor whose entry will be publicly visible — which, in Syria today, is every investor.",
          ar: "كل مستثمر سيكون دخوله مرئيًا للعامة — وهذا في سوريا اليوم يشمل كل مستثمر.",
        },
      },
    ],
  },
  {
    slug: "ai-marketing-execution",
    route: "syria",
    name: { en: "AI Marketing Execution", ar: "تنفيذ التسويق بالذكاء الاصطناعي" },
    short: {
      en: "Arabic-first campaigns, AI-assisted operations, and answer-engine visibility.",
      ar: "حملات عربية أولًا، وعمليات معزّزة بالذكاء الاصطناعي، وحضور في محركات الإجابة.",
    },
    problem: {
      en: "Campaign execution in a rebuilding market needs speed and efficiency without sacrificing craft — and increasingly, visibility happens inside AI answer engines, not just search results.",
      ar: "تنفيذ الحملات في سوق يُعاد بناؤه يتطلب سرعة وكفاءة دون التضحية بجودة الصنعة — والحضور اليوم يتحقق داخل محركات الإجابة بالذكاء الاصطناعي، لا في نتائج البحث وحدها.",
    },
    approach: {
      en: "We build and run campaigns with AI-assisted personalization and production, always Arabic-first (drafted natively, never machine-translated), and we optimize your content to be cited by AI answer engines (GEO) as well as ranked by search. Tools are evaluated before they're recommended — our evaluation criteria are public.",
      ar: "نبني الحملات وندير تشغيلها بتخصيص وإنتاج معزّزين بالذكاء الاصطناعي، بالعربية أولًا دائمًا (كتابةً أصيلة لا ترجمة آلية)، ونهيّئ محتواك ليُستشهد به في محركات الإجابة (GEO) وليتصدّر نتائج البحث. نقيّم الأدوات قبل التوصية بها — ومعايير تقييمنا معلنة.",
    },
    deliverables: {
      en: [
        "Campaign build and management (paid, organic, CRM)",
        "Arabic-first content production system",
        "AI-assisted personalization and workflow design",
        "GEO / answer-engine optimization program",
        "Measurement framework and monthly evidence reports",
      ],
      ar: [
        "بناء الحملات وإدارتها (مدفوعة وعضوية وإدارة علاقات العملاء)",
        "منظومة إنتاج محتوى عربية أولًا",
        "تصميم التخصيص وسير العمل المعزّز بالذكاء الاصطناعي",
        "برنامج تهيئة لمحركات الإجابة (GEO)",
        "إطار قياس وتقارير أدلة شهرية",
      ],
    },
    forWho: {
      en: "Entrants past the strategy phase who need campaigns live in-market.",
      ar: "الداخلون الذين تجاوزوا مرحلة الاستراتيجية ويحتاجون حملات فاعلة في السوق.",
    },
    tiers: standardTiers(
      {
        en: "An AI-marketing readiness audit of your current stack, content, and team.",
        ar: "تدقيق جاهزية للتسويق بالذكاء الاصطناعي: منظومتك ومحتواك وفريقك.",
      },
      {
        en: "A launch campaign designed, built, and run for a defined entry window.",
        ar: "حملة إطلاق تُصمَّم وتُبنى وتُدار لنافذة دخول محددة.",
      },
      {
        en: "A managed AI-marketing operation as your in-market team scales.",
        ar: "تشغيل تسويقي مُدار بالذكاء الاصطناعي مع نموّ فريقك داخل السوق.",
      }
    ),
    faqs: [
      {
        question: {
          en: "Is your Arabic content machine-translated?",
          ar: "هل محتواكم العربي مترجم آليًا؟",
        },
        answer: {
          en: "No. Campaigns are Arabic-first: content is drafted natively in Arabic, never machine-translated, and both languages are written from one strategic brief.",
          ar: "لا. الحملات عربية أولًا: يُكتب المحتوى بالعربية كتابةً أصيلة لا ترجمة آلية، وتُكتب اللغتان من موجز استراتيجي واحد.",
        },
      },
      {
        question: {
          en: "What is GEO (answer-engine optimization)?",
          ar: "ما هي تهيئة محركات الإجابة (GEO)؟",
        },
        answer: {
          en: "GEO optimizes your content to be cited by AI answer engines — not just ranked by search. Visibility increasingly happens inside AI answers, and a GEO program is part of this service.",
          ar: "تهيئة محركات الإجابة تجعل محتواك مادةً يُستشهد بها في إجابات الذكاء الاصطناعي — لا مجرد نتيجة في البحث. فالحضور اليوم يتحقق داخل محركات الإجابة، وبرنامج GEO جزء من هذه الخدمة.",
        },
      },
      {
        question: {
          en: "How do you choose which AI tools to use?",
          ar: "كيف تختارون أدوات الذكاء الاصطناعي؟",
        },
        answer: {
          en: "Every tool passes a documented evaluation before it is recommended: data handling and residency, Arabic-language quality tested natively, output reliability on real marketing tasks, and total cost against the workflow it replaces. Our evaluation criteria are public.",
          ar: "تجتاز كل أداة تقييمًا موثقًا قبل التوصية بها: التعامل مع البيانات ومكان إقامتها، وجودة اللغة العربية مختبرةً بالعربية، وموثوقية المخرجات في مهام تسويقية حقيقية، والكلفة الكلية مقابل سير العمل الذي تستبدله. ومعايير تقييمنا معلنة.",
        },
      },
    ],
  },
  {
    slug: "diaspora-bridge-strategy",
    route: "syria",
    name: {
      en: "Diaspora & Community Bridge Strategy",
      ar: "استراتيجية جسر الاغتراب والمجتمع",
    },
    short: {
      en: "Syrian diaspora networks as your source of trust, talent, and local credibility.",
      ar: "شبكات الاغتراب السوري مصدرًا للثقة والكفاءات والمصداقية المحلية.",
    },
    problem: {
      en: "You cannot buy local trust with media spend. The Syrian diaspora — investors, professionals, families — is the single most effective bridge into it, and most entrants have no strategy for engaging it.",
      ar: "الثقة المحلية لا تُشترى بالإنفاق الإعلاني. الاغتراب السوري — مستثمرين ومهنيين وعائلات — هو الجسر الأكثر فاعلية إليها، ومعظم الداخلين بلا استراتيجية للتفاعل معه.",
    },
    approach: {
      en: "We map the diaspora networks relevant to your sector and origin market, design engagement programs (advisory circles, talent pipelines, community partnerships), and build the storytelling that earns their advocacy — because their endorsement is what Syrian communities actually trust.",
      ar: "نرسم خريطة شبكات الاغتراب ذات الصلة بقطاعك وسوق منشئك، ونصمّم برامج تفاعل (حلقات استشارية، ومسارات كفاءات، وشراكات مجتمعية)، ونبني السرد الذي يستحق مناصرتهم — لأن تزكيتهم هي ما تثق به المجتمعات السورية فعلًا.",
    },
    deliverables: {
      en: [
        "Sector-specific diaspora network map",
        "Engagement and advocacy program design",
        "Diaspora talent and partnership pipeline",
        "Community-facing storytelling (AR/EN)",
        "Measurement of trust signals over time",
      ],
      ar: [
        "خريطة شبكات اغتراب خاصة بقطاعك",
        "تصميم برامج التفاعل والمناصرة",
        "مسار كفاءات وشراكات من الاغتراب",
        "سرد موجّه للمجتمع بالعربية والإنجليزية",
        "قياس مؤشرات الثقة عبر الزمن",
      ],
    },
    forWho: {
      en: "Consumer-facing and community-dependent entrants: real estate, healthcare, telecom, agriculture.",
      ar: "الداخلون المعتمدون على المستهلك والمجتمع: العقارات، والرعاية الصحية، والاتصالات، والزراعة.",
    },
    tiers: standardTiers(
      {
        en: "A diaspora-relevance workshop: where the networks are and what they can carry for you.",
        ar: "ورشة عمل حول الاغتراب: أين الشبكات وما الذي يمكن أن تحمله لأجلك.",
      },
      {
        en: "A designed and launched diaspora engagement program for your entry.",
        ar: "برنامج تفاعل مع الاغتراب يُصمَّم ويُطلق لدخولك.",
      },
      {
        en: "Ongoing community and diaspora relations as your operation grows roots.",
        ar: "علاقات مجتمع واغتراب مستمرة مع تجذّر عملياتك.",
      }
    ),
    faqs: [
      {
        question: {
          en: "Why does the Syrian diaspora matter for market entry?",
          ar: "لماذا يهمّ الاغتراب السوري في دخول السوق؟",
        },
        answer: {
          en: "You cannot buy local trust with media spend. The Syrian diaspora — investors, professionals, families — is the single most effective bridge into it, because their endorsement is what Syrian communities actually trust.",
          ar: "الثقة المحلية لا تُشترى بالإنفاق الإعلاني. الاغتراب السوري — مستثمرين ومهنيين وعائلات — هو الجسر الأكثر فاعلية إليها، لأن تزكيتهم هي ما تثق به المجتمعات السورية فعلًا.",
        },
      },
      {
        question: {
          en: "What does a diaspora engagement program include?",
          ar: "ماذا يتضمن برنامج التفاعل مع الاغتراب؟",
        },
        answer: {
          en: "A map of the diaspora networks relevant to your sector and origin market, engagement programs such as advisory circles, talent pipelines, and community partnerships, community-facing storytelling in Arabic and English, and measurement of trust signals over time.",
          ar: "خريطة شبكات الاغتراب ذات الصلة بقطاعك وسوق منشئك، وبرامج تفاعل كالحلقات الاستشارية ومسارات الكفاءات والشراكات المجتمعية، وسردًا موجّهًا للمجتمع بالعربية والإنجليزية، وقياس مؤشرات الثقة عبر الزمن.",
        },
      },
      {
        question: {
          en: "Which sectors benefit most from diaspora strategy?",
          ar: "أي القطاعات تستفيد أكثر من استراتيجية الاغتراب؟",
        },
        answer: {
          en: "Consumer-facing and community-dependent entrants: real estate, healthcare, telecom, and agriculture.",
          ar: "الداخلون المعتمدون على المستهلك والمجتمع: العقارات، والرعاية الصحية، والاتصالات، والزراعة.",
        },
      },
    ],
  },
  {
    slug: "applied-ai-for-marketing-teams",
    route: "gulf",
    name: {
      en: "Applied AI for Marketing Teams",
      ar: "الذكاء الاصطناعي التطبيقي لفرق التسويق",
    },
    short: {
      en: "Corporate enablement for KSA and Gulf marketing teams — on your live campaigns, not slides.",
      ar: "تمكين مؤسسي لفرق التسويق في السعودية والخليج — على حملاتكم الفعلية لا على الشرائح.",
    },
    problem: {
      en: "AI literacy programs are everywhere — and free. What they don't do is change how your marketing team actually ships work. The gap between 'we did an AI course' and 'our campaigns run on AI-assisted workflows' is where budgets go to die.",
      ar: "برامج الثقافة العامة في الذكاء الاصطناعي متاحة في كل مكان — ومجانًا. لكنها لا تغيّر طريقة إنجاز فريقك التسويقي لعمله فعليًا. والفجوة بين «أخذنا دورة في الذكاء الاصطناعي» و«حملاتنا تعمل بسير عمل معزّز بالذكاء الاصطناعي» هي حيث تذهب الميزانيات هدرًا.",
    },
    approach: {
      en: "We run enablement programs on your team's live campaigns: real briefs, real content, real reporting. By the end, the team isn't 'aware of AI' — it ships AI-assisted work weekly, with quality controls and a tool stack we've evaluated against public criteria. Delivered remotely across KSA and the Gulf, in Arabic and English.",
      ar: "ننفّذ برامج تمكين على حملات فريقك الفعلية: موجزات حقيقية ومحتوى حقيقي وتقارير حقيقية. في نهاية البرنامج لا يكون الفريق «مطّلعًا على الذكاء الاصطناعي» بل يُنجز أسبوعيًا عملًا معزّزًا به، مع ضوابط جودة ومنظومة أدوات قيّمناها وفق معايير معلنة. يُقدَّم عن بُعد في السعودية والخليج، بالعربية والإنجليزية.",
    },
    deliverables: {
      en: [
        "Team AI-readiness assessment",
        "4–6 week applied program on live campaigns",
        "Evaluated tool stack and workflow designs",
        "Quality-control and prompt playbooks (AR/EN)",
        "Post-program adoption measurement",
      ],
      ar: [
        "تقييم جاهزية الفريق للذكاء الاصطناعي",
        "برنامج تطبيقي من 4 إلى 6 أسابيع على حملات فعلية",
        "منظومة أدوات مُقيَّمة وتصاميم سير عمل",
        "أدلة ضبط الجودة وصياغة الموجهات بالعربية والإنجليزية",
        "قياس التبنّي بعد البرنامج",
      ],
    },
    forWho: {
      en: "Marketing teams at KSA and Gulf mid-market companies that want shipped output, not certificates.",
      ar: "فرق التسويق في شركات السوق المتوسطة بالسعودية والخليج التي تريد إنتاجًا فعليًا لا شهادات.",
    },
    tiers: [
      {
        name: { en: "Open workshop", ar: "ورشة عمل مفتوحة" },
        audience: { en: "Individual marketers and small teams", ar: "المسوّقون الأفراد والفرق الصغيرة" },
        description: {
          en: "A one-day applied workshop: your team leaves with working AI-assisted workflows for two real tasks.",
          ar: "ورشة تطبيقية ليوم واحد: يغادر فريقك ومعه سير عمل فعلي معزّز بالذكاء الاصطناعي لمهمّتين حقيقيتين.",
        },
      },
      {
        name: { en: "In-house team program", ar: "برنامج داخلي للفريق" },
        audience: { en: "Mid-market marketing departments", ar: "إدارات التسويق في الشركات المتوسطة" },
        description: {
          en: "4–6 weeks embedded with your team on live campaigns — the core offer.",
          ar: "من 4 إلى 6 أسابيع مع فريقك على حملات فعلية — وهذا هو العرض الأساسي.",
        },
      },
      {
        name: { en: "Enablement retainer", ar: "تمكين مستمر" },
        audience: { en: "Teams scaling AI adoption", ar: "الفرق التي توسّع تبنّي الذكاء الاصطناعي" },
        description: {
          en: "Ongoing coaching, tool evaluation, and workflow upgrades as the field moves.",
          ar: "تدريب مستمر وتقييم للأدوات وتحديث لسير العمل مع تطور المجال.",
        },
      },
    ],
    faqs: [
      {
        question: {
          en: "How is this different from an AI literacy course?",
          ar: "بمَ يختلف هذا عن دورات الثقافة العامة في الذكاء الاصطناعي؟",
        },
        answer: {
          en: "AI literacy programs are everywhere — and free. This program runs on your team's live campaigns: real briefs, real content, real reporting. By the end, the team isn't 'aware of AI' — it ships AI-assisted work weekly, with quality controls and an evaluated tool stack.",
          ar: "برامج الثقافة العامة متاحة في كل مكان — ومجانًا. هذا البرنامج يعمل على حملات فريقك الفعلية: موجزات حقيقية ومحتوى حقيقي وتقارير حقيقية. وفي نهايته لا يكون الفريق «مطّلعًا على الذكاء الاصطناعي» بل يُنجز أسبوعيًا عملًا معزّزًا به، مع ضوابط جودة ومنظومة أدوات مُقيَّمة.",
        },
      },
      {
        question: {
          en: "How long is the program and how is it delivered?",
          ar: "كم مدة البرنامج وكيف يُقدَّم؟",
        },
        answer: {
          en: "The core offer is 4–6 weeks embedded with your team on live campaigns, delivered remotely across KSA and the Gulf, in Arabic and English. A one-day open workshop and an ongoing enablement retainer are also available.",
          ar: "العرض الأساسي من 4 إلى 6 أسابيع مع فريقك على حملات فعلية، ويُقدَّم عن بُعد في السعودية والخليج بالعربية والإنجليزية. وتتوافر أيضًا ورشة عمل مفتوحة ليوم واحد وتمكين مستمر.",
        },
      },
      {
        question: {
          en: "Who is the program for?",
          ar: "لمن هذا البرنامج؟",
        },
        answer: {
          en: "Marketing teams at KSA and Gulf mid-market companies that want shipped output, not certificates.",
          ar: "فرق التسويق في شركات السوق المتوسطة بالسعودية والخليج التي تريد إنتاجًا فعليًا لا شهادات.",
        },
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
