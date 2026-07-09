import type { Localized } from "@/lib/i18n";

export interface PostBlock {
  type: "h2" | "p";
  text: string;
}

export interface Post {
  slug: string;
  date: string; // ISO
  pillar: Localized;
  title: Localized;
  excerpt: Localized;
  body: Localized<PostBlock[]>;
}

export const posts: Post[] = [
  {
    slug: "syria-regulatory-market-tracker",
    date: "2026-07-09",
    pillar: {
      en: "Regulatory & Market Tracker",
      ar: "متتبّع التنظيم والسوق",
    },
    title: {
      en: "Syria Regulatory & Market Tracker: what is open, what is not (July 2026)",
      ar: "متتبّع التنظيم والسوق في سوريا: ما المفتوح وما المغلق (تموز 2026)",
    },
    excerpt: {
      en: "The Caesar Act is repealed, the central bank is back on SWIFT, and capital is arriving — but a state-sponsor designation, targeted sanctions, and export controls remain. A plain-language, dated summary for investors.",
      ar: "أُلغي قانون قيصر وعاد المصرف المركزي إلى سويفت ورؤوس الأموال تتدفق — لكن تصنيف الدولة الراعية والعقوبات الموجهة وقيود التصدير ما تزال قائمة. ملخص واضح ومؤرَّخ للمستثمرين.",
    },
    body: {
      en: [
        {
          type: "p",
          text: "Direct answer first: as of July 2026, US and EU country-wide sanctions on Syria are gone, the Caesar Act was fully repealed in December 2025, and Syria's central bank has been delisted and has completed its first international SWIFT transfer since the war. What remains: the US State Sponsor of Terrorism designation, targeted sanctions on individuals and entities linked to the former regime, Iran, and Russia, and US export controls on certain goods, software, and technology. Investment is legal and happening at scale; diligence on counterparties and exports is still mandatory.",
        },
        { type: "h2", text: "What changed" },
        {
          type: "p",
          text: "The FY2026 National Defense Authorization Act, signed December 18, 2025, repealed the Caesar Syria Civilian Protection Act — the secondary-sanctions regime that had kept foreign banks and investors out even after the June 2025 executive relief. Since then, the Central Bank of Syria has reopened an account at the Federal Reserve Bank of New York, reconnected to SWIFT, and begun rebuilding correspondent banking relationships. Foreign-issued Visa and Mastercard have started working at equipped merchants inside Syria.",
        },
        { type: "h2", text: "What has not changed" },
        {
          type: "p",
          text: "Syria remains designated a State Sponsor of Terrorism, which carries financing and export consequences independent of the repealed sanctions. Targeted designations against specific individuals and entities remain in force — which is why we screen local partners and public associations as part of stakeholder mapping. US export controls on software, technology, and dual-use items also remain, and they affect cloud services and marketing technology stacks more often than investors expect.",
        },
        { type: "h2", text: "The recurring event to watch" },
        {
          type: "p",
          text: "The Caesar repeal obliges the US President to certify to Congress every 180 days, for four years, that Syria's government meets specified conditions. Each certification window is a predictable moment of policy risk and media attention. We update this tracker on each development; the date in the title tells you how current it is.",
        },
      ],
      ar: [
        {
          type: "p",
          text: "الجواب المباشر أولًا: حتى تموز 2026، زالت العقوبات الأمريكية والأوروبية الشاملة على سوريا، وأُلغي قانون قيصر كليًا في كانون الأول 2025، ورُفع المصرف المركزي السوري من قوائم العقوبات وأتمّ أول تحويل دولي عبر سويفت منذ الحرب. أما ما بقي: تصنيف الولايات المتحدة لسوريا دولةً راعية للإرهاب، وعقوبات موجهة على أفراد وكيانات مرتبطة بالنظام السابق وإيران وروسيا، وقيود تصدير أمريكية على سلع وبرمجيات وتقنيات معينة. الاستثمار قانوني ويجري على نطاق واسع؛ لكن العناية الواجبة تجاه الأطراف المقابلة والصادرات ما تزال واجبة.",
        },
        { type: "h2", text: "ما الذي تغيّر" },
        {
          type: "p",
          text: "ألغى قانون تفويض الدفاع الوطني للسنة المالية 2026، الموقَّع في 18 كانون الأول 2025، قانونَ قيصر لحماية المدنيين — نظام العقوبات الثانوية الذي أبقى المصارف والمستثمرين الأجانب خارج السوق حتى بعد الإعفاءات التنفيذية في حزيران 2025. ومنذ ذلك الحين أعاد المصرف المركزي السوري فتح حساب لدى الاحتياطي الفيدرالي في نيويورك، وعاد إلى سويفت، وبدأ إعادة بناء علاقات المراسلة المصرفية. كما بدأت بطاقات فيزا وماستركارد الصادرة في الخارج بالعمل لدى التجار المجهزين داخل سوريا.",
        },
        { type: "h2", text: "ما الذي لم يتغيّر" },
        {
          type: "p",
          text: "ما تزال سوريا مصنفةً دولةً راعية للإرهاب، بما يحمله ذلك من تبعات تمويلية وتصديرية مستقلة عن العقوبات الملغاة. وتبقى العقوبات الموجهة على أفراد وكيانات محددة سارية — ولهذا نُجري فحص الشركاء المحليين والارتباطات العامة ضمن خريطة أصحاب المصلحة. كما تبقى قيود التصدير الأمريكية على البرمجيات والتقنيات والمواد مزدوجة الاستخدام، وهي تطال الخدمات السحابية ومنظومات تقنيات التسويق أكثر مما يتوقع المستثمرون.",
        },
        { type: "h2", text: "الحدث الدوري الذي يجب مراقبته" },
        {
          type: "p",
          text: "يُلزم إلغاءُ قانون قيصر الرئيسَ الأمريكي بأن يشهد أمام الكونغرس كل 180 يومًا، ولمدة أربع سنوات، بأن الحكومة السورية تفي بشروط محددة. وكل نافذة تصديق لحظةٌ متوقعة من المخاطر السياساتية والاهتمام الإعلامي. نُحدّث هذا المتتبّع مع كل تطور؛ والتاريخ في العنوان يخبرك بمدى حداثته.",
        },
      ],
    },
  },
  {
    slug: "building-brand-trust-where-data-is-scarce",
    date: "2026-07-02",
    pillar: {
      en: "Syria market entry",
      ar: "دخول السوق السورية",
    },
    title: {
      en: "Building brand trust where data is scarce",
      ar: "بناء ثقة العلامة حيث تندر البيانات",
    },
    excerpt: {
      en: "No syndicated research, no reliable panels, no brand trackers. Here is how disciplined entrants build evidence — and trust — in Syria anyway.",
      ar: "لا أبحاث جاهزة ولا لوحات قياس موثوقة ولا متتبّعات علامة. هكذا يبني الداخلون المنضبطون الأدلةَ — والثقة — في سوريا رغم ذلك.",
    },
    body: {
      en: [
        {
          type: "p",
          text: "Direct answer first: you build trust in a data-scarce market by substituting documented proxy evidence for missing syndicated data, by making your methodology public, and by letting local and diaspora voices carry your credibility before your advertising does. Brands that wait for perfect data will enter late; brands that invent numbers will be found out.",
        },
        { type: "h2", text: "Proxy data is a discipline, not a shortcut" },
        {
          type: "p",
          text: "Comparable-market baselines (Jordan and Lebanon for consumer behavior, pre-2011 Syrian data for category structure), mobile-operator reach figures, diaspora surveys, and partner interviews each cover part of the picture. The discipline is in documenting what each proxy can and cannot support — and pricing the uncertainty into your plan rather than hiding it.",
        },
        { type: "h2", text: "Transparency is the trust strategy" },
        {
          type: "p",
          text: "In a market that has been burned by promises, showing your work is a competitive weapon. Publish your assumptions. Name your risks. Syrian counterparties, community bodies, and international stakeholders all respond to the same signal: this entrant expects to be checked, and holds up when checked.",
        },
      ],
      ar: [
        {
          type: "p",
          text: "الجواب المباشر أولًا: تُبنى الثقة في سوق تندر بياناته بإحلال أدلة بديلة موثّقة محل البيانات الجاهزة الغائبة، وبإعلان منهجيتك، وبترك الأصوات المحلية وأصوات الاغتراب تحمل مصداقيتك قبل إعلاناتك. من ينتظر البيانات الكاملة يدخل متأخرًا؛ ومن يختلق الأرقام يُكشف أمره.",
        },
        { type: "h2", text: "البيانات البديلة انضباطٌ لا طريق مختصر" },
        {
          type: "p",
          text: "خطوط الأساس من الأسواق المشابهة (الأردن ولبنان لسلوك المستهلك، وبيانات سوريا قبل 2011 لبنية الفئات)، وأرقام تغطية مشغّلي الاتصالات، واستطلاعات الاغتراب، ومقابلات الشركاء — كلٌّ منها يغطي جزءًا من الصورة. الانضباط هو في توثيق ما يحتمله كل بديل وما لا يحتمله، وتسعير اللايقين في خطتك بدل إخفائه.",
        },
        { type: "h2", text: "الشفافية هي استراتيجية الثقة" },
        {
          type: "p",
          text: "في سوق اكتوى بالوعود، يصبح إظهارُ طريقة عملك سلاحًا تنافسيًا. انشر افتراضاتك. سمِّ مخاطرك. فالأطراف السورية والهيئات المجتمعية وأصحاب المصلحة الدوليون يستجيبون جميعًا للإشارة نفسها: هذا الداخل يتوقع أن يُدقَّق في عمله، ويصمد حين يُدقَّق.",
        },
      ],
    },
  },
  {
    slug: "arabic-first-vs-translated-content",
    date: "2026-06-25",
    pillar: {
      en: "Bilingual & cross-cultural craft",
      ar: "الصنعة ثنائية اللغة",
    },
    title: {
      en: "Why Arabic-first content outperforms translated content",
      ar: "لماذا يتفوق المحتوى المكتوب بالعربية أولًا على المحتوى المترجم",
    },
    excerpt: {
      en: "Translated campaigns read as foreign because they are. Drafting natively in Arabic changes structure, rhythm, and reference — and audiences can tell within a sentence.",
      ar: "الحملات المترجمة تُقرأ غريبةً لأنها كذلك فعلًا. الكتابة الأصيلة بالعربية تغيّر البنية والإيقاع والمرجعية — والجمهور يميّز ذلك من الجملة الأولى.",
    },
    body: {
      en: [
        {
          type: "p",
          text: "Direct answer first: Arabic-first content outperforms translation because Arabic persuasion is structured differently — it builds context before claims, carries rhythm that translation flattens, and draws on references no English brief contains. Machine translation gets you understood; native drafting gets you believed.",
        },
        { type: "h2", text: "What translation flattens" },
        {
          type: "p",
          text: "Word-for-word accuracy preserves meaning and destroys register. Formality levels, regional coloring (a Damascene reader is not a Gulf reader), and the cadence that makes a line quotable — these are drafting decisions, not translation decisions. RTL design is the same story: mirroring a layout is not designing one.",
        },
        { type: "h2", text: "The operational answer" },
        {
          type: "p",
          text: "Write both languages from one strategic brief, not one language from the other. It costs more per piece and converts enough better to pay for itself — especially in a market where sounding foreign is the fastest way to be distrusted.",
        },
      ],
      ar: [
        {
          type: "p",
          text: "الجواب المباشر أولًا: يتفوق المحتوى المكتوب بالعربية أولًا لأن الإقناع بالعربية يُبنى بنيةً مختلفة — يمهّد بالسياق قبل الادعاء، ويحمل إيقاعًا تسحقه الترجمة، ويستند إلى مرجعيات لا يتضمنها أي موجز إنجليزي. الترجمة الآلية تجعلك مفهومًا؛ والكتابة الأصيلة تجعلك مُصدَّقًا.",
        },
        { type: "h2", text: "ما الذي تسحقه الترجمة" },
        {
          type: "p",
          text: "الدقة الحرفية تحفظ المعنى وتهدم المقام. مستويات الرسمية، والتلوين المحلي (فقارئ دمشق غير قارئ الخليج)، والإيقاع الذي يجعل العبارة جديرة بالاقتباس — كلها قرارات كتابة لا قرارات ترجمة. وتصميم الواجهات من اليمين إلى اليسار قصةٌ مماثلة: عكسُ التخطيط ليس تصميمًا له.",
        },
        { type: "h2", text: "الجواب العملي" },
        {
          type: "p",
          text: "اكتب اللغتين من موجز استراتيجي واحد، لا لغةً من الأخرى. الكلفة أعلى لكل قطعة، لكن التحويل الأفضل يغطيها وزيادة — خصوصًا في سوق يُعدّ فيه الصوتُ الأجنبي أسرعَ طريق إلى فقدان الثقة.",
        },
      ],
    },
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
