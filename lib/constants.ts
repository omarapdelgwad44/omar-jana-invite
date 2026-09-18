export const COUPLE = {
  first: "عمر",
  second: "جنى",
  firstLatin: "Omar",
  secondLatin: "Jana",
  monogram: "ع ج",
} as const;

/** Friday 9 October 2026, 19:00 Arabia Standard Time */
export const EVENT_ISO = "2026-10-09T19:00:00+03:00";

export const EVENT_LABEL = {
  weekday: { ar: "الجمعة", en: "Friday" },
  date: { ar: "٩ أكتوبر", en: "9 October" },
  year: { ar: "٢٠٢٦", en: "2026" },
  gregorian: "9 October 2026",
  gregorianCaps: "OCTOBER 9, 2026",
  day: "09",
  month: "10",
  yearNum: "2026",
} as const;

export const VENUE = {
  name: { ar: "يُعلن المكان قريبًا", en: "Venue to be announced" },
  mapsUrl: "",
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
  tapToOpen: { ar: "اضغطوا للفتح", en: "Tap to open" },
  skip: { ar: "تخطّي", en: "Skip" },
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
  until: { ar: "حتى ٩ أكتوبر ٢٠٢٦", en: "Until 9 October 2026" },
  timeline: { ar: "جدول الليلة", en: "Timeline of the Evening" },
  timelineBody: {
    ar: "تبدأ الليلة بحفل الخطوبة في السابعة مساءً.",
    en: "The celebration begins with the engagement ceremony at 7:00 PM.",
  },
  rsvp: { ar: "تأكيد الحضور", en: "RSVP" },
  rsvpBy: {
    ar: "يرجى الرد قبل ١ أكتوبر ٢٠٢٦",
    en: "Please respond by 1 October 2026.",
  },
  willYou: { ar: "هل ستحضرون؟", en: "Will you attend?" },
  yes: { ar: "سأكون هناك", en: "Yes, I'll be there" },
  no: { ar: "للأسف لن أستطيع", en: "Sorry, I can't make it" },
  fullName: { ar: "الاسم بالكامل", en: "Full name" },
  fullNamePlaceholder: { ar: "اكتبوا اسمكم", en: "Your full name" },
  message: { ar: "رسالة للعروسين", en: "A message for the couple" },
  messagePlaceholder: {
    ar: "أمنياتكم، ذكرى، أو كلمة…",
    en: "Share a wish, a memory, or a note…",
  },
  send: { ar: "إرسال التأكيد", en: "Send RSVP" },
  sentYes: {
    ar: "وصلت فرحتكم. ننتظركم في ٩ أكتوبر.",
    en: "Your joy reached us. We cannot wait to see you.",
  },
  sentNo: {
    ar: "شكرًا لإخبارنا. قلوبنا معكم.",
    en: "Thank you for letting us know. You are in our hearts.",
  },
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

export type ExperienceStage = "envelope" | "doors" | "venue" | "letter";
