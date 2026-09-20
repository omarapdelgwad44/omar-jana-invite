export const COUPLE = {
  first: "عمر",
  second: "جنى",
  firstLatin: "Omar",
  secondLatin: "Jana",
  monogram: "ع ج",
} as const;

/** Thursday 8 October 2026, 19:00 Arabia Standard Time */
export const EVENT_ISO = "2026-10-08T19:00:00+03:00";

export const EVENT_LABEL = {
  weekday: { ar: "الخميس", en: "Thursday" },
  date: { ar: "٨ أكتوبر", en: "8 October" },
  year: { ar: "٢٠٢٦", en: "2026" },
  gregorian: "8 October 2026",
  gregorianCaps: "OCTOBER 8, 2026",
  day: "08",
  month: "10",
  yearNum: "2026",
} as const;

export const VENUE = {
  name: { ar: "نادي نقابة المهندسين", en: "Engineers Syndicate Club" },
  address: {
    ar: "شارع البحر الأعظم، كورنيش النيل، المعادي",
    en: "El Bahr El Aazam Street, Nile Corniche, Maadi",
  },
  mapsUrl: "https://maps.app.goo.gl/CadJZ8AUGYbZF37D6?g_st=aw",
  time: { ar: "٧:٠٠ مساءً", en: "7:00 PM" },
} as const;

export const TIMELINE = [
  {
    time: { ar: "٧:٠٠ مساءً", en: "7:00 PM" },
    title: { ar: "حفل الخطوبة", en: "Engagement Ceremony" },
  },
] as const;

export type Lang = "ar" | "en";
export type Localized = Record<Lang, string>;

export const COPY = {
  together: {
    ar: "معًا مكانٌ جميل أن نكون فيه",
    en: "Together is a beautiful place to be",
  },
  togetherForever: { ar: "معًا إلى الأبد", en: "Together Forever" },
  eventOf: { ar: "حفل خطوبة", en: "The engagement of" },
  joinTitle: {
    ar: "حفل خطوبتنا",
    en: "Our Engagement",
  },
  joinBody: {
    ar: "بكل الحب والسعادة ندعوكم لمشاركتنا أجمل لحظات العمر، والاحتفال بخطوبتنا وسط الأهل والأصدقاء",
    en: "With love and joy, we invite you to share the most beautiful moments of our lives and celebrate our engagement among family and friends.",
  },
  dateCardLabel: { ar: "موعد الخطوبة", en: "Engagement Date" },
  dateCardNote: {
    ar: "في ليلة مليئة بالفرح والحب ننتظر حضوركم الكريم",
    en: "On a night filled with joy and love, we await your presence.",
  },
  verseShort: {
    ar: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً",
    en: "And among His signs is that He created for you mates from among yourselves, that you may find tranquility in them, and He placed between you affection and mercy.",
  },
  verseFull: {
    ar: "﴿وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ﴾",
    en: "And among His signs is that He created for you mates from among yourselves, that you may find tranquility in them, and He placed between you affection and mercy. Indeed in that are signs for a people who reflect.",
  },
  verseSource: { ar: "سورة الروم — ٢١", en: "Surah Ar-Rum — 30:21" },
  scroll: { ar: "تابعوا", en: "Scroll" },
  day: { ar: "اليوم", en: "Day" },
  month: { ar: "الشهر", en: "Month" },
  yearWord: { ar: "السنة", en: "Year" },
  timeLocation: { ar: "الوقت والمكان", en: "Time & Location" },
  openMaps: { ar: "فتح في خرائط جوجل", en: "Open in Google Maps" },
  countdown: { ar: "العدّ التنازلي", en: "Countdown" },
  until: { ar: "حتى ٨ أكتوبر ٢٠٢٦", en: "Until 8 October 2026" },
  timeline: { ar: "جدول الليلة", en: "Timeline of the Evening" },
  timelineBody: {
    ar: "تبدأ الليلة بحفل الخطوبة في السابعة مساءً.",
    en: "The celebration begins with the engagement ceremony at 7:00 PM.",
  },
  blessing: { ar: "تهنئة للعروسين", en: "Congratulations" },
  blessingBody: {
    ar: "شاركونا الفرحة بكلمة حب لعمر وجنى. اكتبوا اسمكم وتهنئتكم، وتُحفظ في سجل الخطوبة.",
    en: "Share a word of love for Omar and Jana. Write your name and message, and it will be saved in the guestbook.",
  },
  blessingName: { ar: "الاسم", en: "Name" },
  blessingNamePlaceholder: { ar: "اسمكم الكريم", en: "Your name" },
  blessingLabel: { ar: "رسالتكم", en: "Your message" },
  blessingPlaceholder: {
    ar: "اكتبوا تهنئتكم هنا…",
    en: "Write your congratulations here…",
  },
  sendBlessing: { ar: "إرسال التهنئة", en: "Send congratulations" },
  blessingSending: { ar: "جاري الحفظ…", en: "Saving…" },
  blessingThanks: {
    ar: "وصلت تهنئتكم، شكرًا لحبكم. بارك الله فيكم.",
    en: "Your congratulations reached us. Thank you for your love.",
  },
  blessingError: {
    ar: "تعذّر حفظ التهنئة. حاولوا مرة أخرى.",
    en: "Could not save your message. Please try again.",
  },
  blessingHint: {
    ar: "تظهر تهنئتكم مباشرة في صفحة سجل التهاني.",
    en: "Your message appears on the guestbook page right away.",
  },
  guestbookSetup: {
    ar: "سجل التهاني غير متصل حاليًا. تعذّر حفظ الرسائل.",
    en: "The guestbook is not connected, so messages cannot be saved yet.",
  },
  readWishes: { ar: "قراءة سجل التهاني", en: "Read the guestbook" },
  wishesTitle: { ar: "سجل التهاني", en: "Guestbook" },
  wishesBody: {
    ar: "كلمات الحب التي كتبها الأهل والأصدقاء لعمر وجنى.",
    en: "Words of love written for Omar and Jana.",
  },
  wishesLoading: { ar: "جاري تحميل التهاني…", en: "Loading messages…" },
  wishesEmpty: {
    ar: "لا توجد تهاني بعد. كونوا أول المهنئين.",
    en: "No messages yet. Be the first to congratulate them.",
  },
  wishesError: {
    ar: "تعذّر تحميل سجل التهاني الآن.",
    en: "The guestbook could not be loaded.",
  },
  backToInvite: { ar: "العودة إلى الدعوة", en: "Back to the invitation" },
  inviteLine: {
    ar: "يدعوانكم لحضور حفل خطوبتهما",
    en: "request the pleasure of your company",
  },
  poem: {
    ar: "حين يلتقي القلبُ بالقلب، يبدأ الضوء",
    en: "When heart meets heart, the light begins",
  },
  presence: {
    ar: "وجودكم يكتمل به الفرح",
    en: "Your presence completes our joy",
  },
} as const;

export function tx(value: Localized, lang: Lang): string {
  return value[lang];
}
