// Ziel des Notausgangs (Abschnitt 6.2). Bewusst im Code und nicht im CMS, damit es niemand versehentlich ändert.
export const QUICK_EXIT_URL = "https://www.google.com/search?q=wetter";

// Hinweis zum Notausgang je Sprachfassung auf /sprachen, nach Sprachkürzel. Aus demselben Grund im Code:
// Er beschreibt das Ziel oben und muss sich mit ihm ändern. Der deutsche Hinweis steht auf /internetspuren.
// OFFEN: Übersetzungen fachlich vom AG freigeben lassen (Abschnitt 13, Punkt 3)
export const QUICK_EXIT_HINTS: Record<string, string> = {
  ar: "يأخذكِ هذا الزر فورًا إلى توقعات الطقس على Google. وبلوحة المفاتيح أسرع: اضغطي مفتاح Esc مرتين متتاليتين.",
  ru: "Эта кнопка сразу откроет прогноз погоды в Google. С клавиатуры ещё быстрее: дважды подряд нажмите клавишу Esc.",
  en: "This button takes you straight to a weather forecast on Google. With a keyboard it is even quicker: press the Esc key twice in a row.",
  tr: "Bu düğme sizi hemen Google’da bir hava durumu sayfasına götürür. Klavyeyle daha da hızlı: Esc tuşuna art arda iki kez basın.",
};
