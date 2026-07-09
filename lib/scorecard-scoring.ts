import "server-only";
import type { Locale, Localized } from "@/lib/i18n";
import {
  SCORECARD_MODEL_VERSION,
  scorecardDimensions,
  type DimensionId,
  type ScorecardAnswers,
} from "@/lib/scorecard-config";

export interface ScorecardResult {
  modelVersion: string;
  overall: number;
  dimensions: { id: DimensionId; label: string; score: number }[];
  risks: string[];
}

/**
 * Tibyan readiness model v1.
 * Each dimension is scored 0–100 from the relevant answers; the overall
 * score is the weighted mean. Weights and mappings are deliberately simple
 * and documented so results are explainable to the lead on a call.
 */
const dimensionWeights: Record<DimensionId, number> = {
  data: 0.3,
  stakeholder: 0.25,
  trust: 0.25,
  localization: 0.2,
};

const scoreMaps: Record<DimensionId, Record<string, Record<string, number>>> = {
  data: {
    "data-position": { none: 15, proxy: 55, commissioned: 90 },
    "mena-experience": { no: 30, yes: 75 },
  },
  stakeholder: {
    "stakeholder-plan": { no: 15, draft: 55, yes: 90 },
  },
  trust: {
    "local-ties": { none: 15, informal: 50, formal: 90 },
    origin: {
      diaspora: 85,
      gulf: 65,
      turkey: 60,
      europe: 45,
      "north-america": 40,
      other: 45,
    },
  },
  localization: {
    localization: { no: 10, translated: 45, native: 90 },
  },
};

interface RiskRule {
  applies: (a: ScorecardAnswers) => boolean;
  message: Localized;
}

const riskRules: RiskRule[] = [
  {
    applies: (a) => a["data-position"] === "none",
    message: {
      en: "You have no Syria-specific data. Decisions made now will rest on assumption — commission proxy modeling before committing spend.",
      ar: "لا تملكون بيانات خاصة بسوريا. أي قرار الآن سيقوم على الافتراض — ابدأوا بنمذجة بيانات بديلة قبل الالتزام بأي إنفاق.",
    },
  },
  {
    applies: (a) => a["stakeholder-plan"] === "no",
    message: {
      en: "No stakeholder-communications plan. In a scrutinized reconstruction market, this is the single fastest way to turn a good project into a public problem.",
      ar: "لا توجد خطة اتصالات لأصحاب المصلحة. في سوق إعمار خاضع للتدقيق، هذا أسرع طريق لتحويل مشروع جيد إلى مشكلة علنية.",
    },
  },
  {
    applies: (a) => a["local-ties"] === "none",
    message: {
      en: "No local or diaspora ties. Trust cannot be bought with media spend here — a partnership and diaspora-bridge program should precede consumer marketing.",
      ar: "لا روابط محلية أو اغترابية. الثقة هنا لا تُشترى بالإنفاق الإعلاني — ينبغي أن يسبق برنامجُ شراكات وجسرِ اغتراب أيَّ تسويق استهلاكي.",
    },
  },
  {
    applies: (a) => a["localization"] !== "native",
    message: {
      en: "Your Arabic content is translated or absent. Audiences detect translated content within a sentence; budget for native Arabic drafting from day one.",
      ar: "محتواكم العربي مترجم أو غائب. الجمهور يكشف المحتوى المترجم من الجملة الأولى؛ خصّصوا ميزانية لكتابة عربية أصيلة من اليوم الأول.",
    },
  },
  {
    applies: (a) => a["risk"] === "low",
    message: {
      en: "Low risk tolerance in an early, fast-moving market. Consider a phased entry with defined evidence gates rather than waiting for full certainty.",
      ar: "قدرة منخفضة على تحمل المخاطر في سوق مبكر سريع الحركة. فكّروا في دخول مرحلي ببوابات أدلة محددة بدل انتظار اليقين الكامل.",
    },
  },
  {
    applies: (a) => a["budget"] === "over-10m" && a["stakeholder-plan"] !== "yes",
    message: {
      en: "A $10M+ commitment without a working stakeholder plan concentrates reputational risk. Communications planning should move in step with capital planning.",
      ar: "التزام يتجاوز 10 ملايين دولار دون خطة فاعلة لأصحاب المصلحة يركّز المخاطر السمعية. ينبغي أن يسير تخطيط الاتصالات بموازاة تخطيط رأس المال.",
    },
  },
];

export function scoreAnswers(
  answers: ScorecardAnswers,
  locale: Locale
): ScorecardResult {
  const dimensions = scorecardDimensions.map((dim) => {
    const maps = scoreMaps[dim.id];
    const parts = Object.entries(maps)
      .map(([questionId, valueMap]) => valueMap[answers[questionId]])
      .filter((v): v is number => typeof v === "number");
    const score = parts.length
      ? Math.round(parts.reduce((a, b) => a + b, 0) / parts.length)
      : 0;
    return { id: dim.id, label: dim.label[locale], score };
  });

  const overall = Math.round(
    dimensions.reduce(
      (sum, d) => sum + d.score * dimensionWeights[d.id],
      0
    )
  );

  const risks = riskRules
    .filter((rule) => rule.applies(answers))
    .map((rule) => rule.message[locale]);

  return { modelVersion: SCORECARD_MODEL_VERSION, overall, dimensions, risks };
}
