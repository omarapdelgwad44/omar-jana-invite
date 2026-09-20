# عمر وجنى — دعوة الخطوبة

دعوة رقمية لحضور حفل خطوبة عمر وجنى في **٨ أكتوبر ٢٠٢٦** بنادي نقابة المهندسين، المعادي.

- المستودع: https://github.com/omarapdelgwad44/omarapdelgwad44.github.io
- الدعوة المنشورة: https://omarapdelgwad44.github.io/
- سجل التهاني: https://omarapdelgwad44.github.io/tahani/ (أو `/wishes/`)

تهاني الضيوف تُحفظ في Google Sheet عبر Apps Script (مجاني)، ثم تُعرض في صفحة `/tahani`.

## تفعيل سجل التهاني (دقيقتان)

مشروع Apps Script جاهز بالفعل باسم **Omar Jana Guestbook**. افتحه وفعّل Web app مرة واحدة:

1. افتح المشروع: https://script.google.com/home/projects/1XkMNsuc07fg_AI5rzWFRq3e2VMcHzsmcrbABQpp9BWSTJdN4DVEeyoUC/edit
2. **Deploy → Manage deployments** (أو New deployment → Web app)
3. Execute as: **Me** · Who has access: **Anyone**
4. اضغط Authorize واسمح بالوصول لجداول Google
5. انسخ رابط الـ Web app (`…/exec`) إلى `lib/guestbook-config.ts` داخل `GUESTBOOK_SCRIPT_URL`
6. أعد نشر الموقع (`npm run build` ثم رفع `out/` على فرع `gh-pages`)

بديل يدوي: أنشئ Google Sheet → Extensions → Apps Script → الصق `scripts/guestbook-apps-script.js` ثم Deploy كـ Web app بنفس الإعدادات.

بدون هذه الخطوة يعمل النموذج للتجربة على `localhost` فقط، ولن تظهر تهاني الضيوف لبعضهم على الموقع الحي.

## التشغيل محليًا

```bash
npm install
npm run dev
```

ثم افتح [http://localhost:3000](http://localhost:3000).
