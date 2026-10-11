import type { PageData } from "../model";

// OFFEN: Übersetzungen fachlich vom AG freigeben lassen (Abschnitt 13, Punkt 3)
export const languages: PageData = {
  slug: "sprachen",
  title: "Sprachen",
  description: "Hilfe bei Gewalt in Arabisch, Russisch, Englisch und Türkisch.",
  intro: "Die Übersetzungen der Website sind in Arbeit. Das Hilfetelefon berät schon heute in 18 Sprachen.",
  layout: "wide",
  blocks: [
    {
      blockType: "languageVersions",
      versions: [
        {
          code: "ar",
          direction: "rtl",
          title: "العربية",
          text: "يجري حاليًا إعداد هذا الموقع باللغة العربية. حتى ذلك الحين: يقدّم خط المساعدة «العنف ضد المرأة» استشارة مجانية وسرية على مدار الساعة بـ 18 لغة.",
          emergencyLabel: "في حالات الطوارئ اتصلي بالشرطة:",
          helplineLabel: "خط المساعدة:",
          exitLabel: "مغادرة الصفحة",
        },
        {
          code: "ru",
          direction: "ltr",
          title: "Русский",
          text: "Русская версия сайта готовится. А пока: телефон доверия «Насилие в отношении женщин» круглосуточно, бесплатно и конфиденциально консультирует на 18 языках.",
          emergencyLabel: "В экстренном случае звоните в полицию:",
          helplineLabel: "Телефон доверия:",
          exitLabel: "Покинуть страницу",
        },
        {
          code: "en",
          direction: "ltr",
          title: "English",
          text: "An English version of this website is being prepared. Until then: the helpline “Violence against Women” offers free and confidential advice around the clock in 18 languages.",
          emergencyLabel: "In an emergency, call the police:",
          helplineLabel: "Helpline:",
          exitLabel: "Leave this page",
        },
        {
          code: "tr",
          direction: "ltr",
          title: "Türkçe",
          text: "Bu web sitesinin Türkçe sürümü hazırlanıyor. O zamana kadar: „Kadına Yönelik Şiddet“ yardım hattı günün her saatinde 18 dilde ücretsiz ve gizli danışmanlık sunuyor.",
          emergencyLabel: "Acil durumda polisi arayın:",
          helplineLabel: "Yardım hattı:",
          exitLabel: "Sayfadan çık",
        },
      ],
    },
  ],
};
