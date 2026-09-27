import type { Metadata } from "next";
import { NotausgangLink } from "@/components/Notausgang";
import { Seitenkopf } from "@/components/Seitenkopf";

export const metadata: Metadata = {
  title: "Sprachen",
  description: "Hilfe bei Gewalt in Arabisch, Russisch, Englisch und Türkisch.",
};

// OFFEN: Übersetzungen fachlich vom AG freigeben lassen (Abschnitt 13, Punkt 3)
const texte = [
  {
    code: "ar",
    dir: "rtl" as const,
    titel: "العربية",
    text: "يجري حاليًا إعداد هذا الموقع باللغة العربية. حتى ذلك الحين: يقدّم خط المساعدة «العنف ضد المرأة» استشارة مجانية وسرية على مدار الساعة بـ 18 لغة.",
    notfall: "في حالات الطوارئ اتصلي بالشرطة:",
    hilfetelefon: "خط المساعدة:",
    exit: "مغادرة الصفحة",
  },
  {
    code: "ru",
    dir: "ltr" as const,
    titel: "Русский",
    text: "Русская версия сайта готовится. А пока: телефон доверия «Насилие в отношении женщин» круглосуточно, бесплатно и конфиденциально консультирует на 18 языках.",
    notfall: "В экстренном случае звоните в полицию:",
    hilfetelefon: "Телефон доверия:",
    exit: "Покинуть страницу",
  },
  {
    code: "en",
    dir: "ltr" as const,
    titel: "English",
    text: "An English version of this website is being prepared. Until then: the helpline “Violence against Women” offers free and confidential advice around the clock in 18 languages.",
    notfall: "In an emergency, call the police:",
    hilfetelefon: "Helpline:",
    exit: "Leave this page",
  },
  {
    code: "tr",
    dir: "ltr" as const,
    titel: "Türkçe",
    text: "Bu web sitesinin Türkçe sürümü hazırlanıyor. O zamana kadar: „Kadına Yönelik Şiddet“ yardım hattı günün her saatinde 18 dilde ücretsiz ve gizli danışmanlık sunuyor.",
    notfall: "Acil durumda polisi arayın:",
    hilfetelefon: "Yardım hattı:",
    exit: "Sayfadan çık",
  },
];

export default function SprachenSeite() {
  return (
    <>
      <Seitenkopf
        titel="Sprachen"
        einleitung="Die Übersetzungen der Website sind in Arbeit. Das Hilfetelefon berät schon heute in 18 Sprachen."
      />
      <div className="wide">
        {texte.map((t) => (
          <section key={t.code} id={t.code} lang={t.code} dir={t.dir} className="sprache measure stack">
            <h2>{t.titel}</h2>
            <p>{t.text}</p>
            <p>
              {t.hilfetelefon}{" "}
              <a href="tel:116016" className="tel" dir="ltr">
                116&#8239;016
              </a>
            </p>
            <p>
              {t.notfall}{" "}
              <a href="tel:110" className="tel" dir="ltr">
                110
              </a>
            </p>
            <p>
              <NotausgangLink label={t.exit} />
            </p>
          </section>
        ))}
      </div>
    </>
  );
}
