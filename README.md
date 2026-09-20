# عمر وجنى — دعوة الخطوبة

دعوة رقمية لحضور حفل خطوبة عمر وجنى في **٨ أكتوبر ٢٠٢٦** بنادي نقابة المهندسين، المعادي.

- المستودع: https://github.com/omarapdelgwad44/omarapdelgwad44.github.io
- الدعوة المنشورة: https://omarapdelgwad44.github.io/
- سجل التهاني: https://omarapdelgwad44.github.io/tahani/ (أو `/wishes/`)

تهاني الضيوف تُحفظ عبر MantleDB (مجاني ويعمل من GitHub Pages)، ثم تُعرض في صفحة `/tahani`.

## التشغيل محليًا

```bash
npm install
npm run dev
```

ثم افتح [http://localhost:3000](http://localhost:3000).

## نشر الموقع

```bash
npm run build
git checkout gh-pages
# انسخ محتوى out/ إلى جذر الفرع ثم ادفع إلى origin
```

## بديل اختياري: Google Apps Script

إن رغبت في حفظ التهاني في Google Sheet بدل MantleDB:

1. افتح المشروع: https://script.google.com/home/projects/1XkMNsuc07fg_AI5rzWFRq3e2VMcHzsmcrbABQpp9BWSTJdN4DVEeyoUC/edit
2. **Deploy → Manage deployments** → Web app
3. Execute as: **Me** · Who has access: **Anyone**
4. Authorize، ثم الصق رابط `…/exec` في `lib/guestbook-config.ts` داخل `GUESTBOOK_SCRIPT_URL`
5. أعد البناء والنشر
