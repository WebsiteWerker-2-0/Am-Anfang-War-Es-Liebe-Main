import type { Metadata } from "next";
import { QuickExitLink } from "@/components/QuickExit";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Sprachen",
  description: "Hilfe bei Gewalt in Arabisch, Russisch, Englisch und Türkisch.",
};

// OFFEN: Übersetzungen fachlich vom AG freigeben lassen (Abschnitt 13, Punkt 3)
const languageVersions = [
  {
    code: "ar",
    dir: "rtl" as const,
    title: "العربية",
    text: "يجري حاليًا إعداد هذا الموقع باللغة العربية. حتى ذلك الحين: يقدّم خط المساعدة «العنف ضد المرأة» استشارة مجانية وسرية على مدار الساعة بـ 18 لغة.",
    emergency: "في حالات الطوارئ اتصلي بالشرطة:",
    helpline: "خط المساعدة:",
    exit: "مغادرة الصفحة",
  },
  {
    code: "ru",
    dir: "ltr" as const,
    title: "Русский",
    text: "Русская версия сайта готовится. А пока: телефон доверия «Насилие в отношении женщин» круглосуточно, бесплатно и конфиденциально консультирует на 18 языках.",
    emergency: "В экстренном случае звоните в полицию:",
    helpline: "Телефон доверия:",
    exit: "Покинуть страницу",
  },
  {
    code: "en",
    dir: "ltr" as const,
    title: "English",
    text: "An English version of this website is being prepared. Until then: the helpline “Violence against Women” offers free and confidential advice around the clock in 18 languages.",
    emergency: "In an emergency, call the police:",
    helpline: "Helpline:",
    exit: "Leave this page",
  },
  {
    code: "tr",
    dir: "ltr" as const,
    title: "Türkçe",
    text: "Bu web sitesinin Türkçe sürümü hazırlanıyor. O zamana kadar: „Kadına Yönelik Şiddet“ yardım hattı günün her saatinde 18 dilde ücretsiz ve gizli danışmanlık sunuyor.",
    emergency: "Acil durumda polisi arayın:",
    helpline: "Yardım hattı:",
    exit: "Sayfadan çık",
  },
];

export default function LanguagesPage() {
  return (
    <>
      <PageHeader
        title="Sprachen"
        intro="Die Übersetzungen der Website sind in Arbeit. Das Hilfetelefon berät schon heute in 18 Sprachen."
      />
      <div className="wide">
        {languageVersions.map((version) => (
          <section key={version.code} id={version.code} lang={version.code} dir={version.dir} className="language measure stack">
            <h2>{version.title}</h2>
            <p>{version.text}</p>
            <p>
              {version.helpline}{" "}
              <a href="tel:116016" className="tel" dir="ltr">
                116&#8239;016
              </a>
            </p>
            <p>
              {version.emergency}{" "}
              <a href="tel:110" className="tel" dir="ltr">
                110
              </a>
            </p>
            <p>
              <QuickExitLink label={version.exit} />
            </p>
          </section>
        ))}
      </div>
    </>
  );
}
