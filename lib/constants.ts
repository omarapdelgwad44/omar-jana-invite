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
  eventOf: { ar: "حفل خطوبة", en: "The engagement of" },
  joinTitle: {
    ar: "شاركونا فرحتنا",
    en: "Join Us To Celebrate Our Engagement",
  },
  joinBody: {
    ar: "يسعدنا أن نشارككم هذه الليلة، وأن تكونوا معنا في بداية حكايتنا.",
    en: "We are so excited to celebrate this special day with you.",
  },
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
