window.WEDDING_DATA = {
  "couple": {
    "groom": "ابرام",
    "bride": "شيري",
    "groomEn": "Ebram",
    "brideEn": "Sherry"
  },
  "events": {
    "engagement": "2026-05-22",
    "wedding": "2027-01-07"
  },
  "phases": [
    {
      "id": "phase-0",
      "title": "قبل الخطوبة",
      "titleEn": "Pre-Engagement",
      "dateRange": "15-21 May 2026",
      "icon": "💍",
      "color": "#E8B4B8",
      "description": "Last preparations before the engagement day",
      "tasks": [
        { "id": "t1",  "title": "تحديد الـ budget الكلي للفرح", "owner": "both",    "deadline": "ASAP",           "notes": "أهم خطوة قبل اي صرف. حدد سقف لكل بند" },
        { "id": "t2",  "title": "فستان الخطوبة",                "owner": "sherry",  "deadline": "قبل 20 مايو",   "notes": "لو محتاج تعديلات سيبي وقت كافي" },
        { "id": "t3",  "title": "البدلة",                        "owner": "ebram",   "deadline": "قبل 20 مايو",   "notes": "جرب وخد البروفة بدري" },
        { "id": "t4",  "title": "الدبل (خطوبة)",                 "owner": "ebram",   "deadline": "قبل 18 مايو",   "notes": "خد فاتورة معتمدة، احتفظ بضمان" },
        { "id": "t5",  "title": "بوكيه الورد",                   "owner": "ebram",   "deadline": "قبل 19 مايو",   "notes": "اتفق على اللون يطابق فستانها" },
        { "id": "t6",  "title": "مكان الخروج بعد الخطوبة",      "owner": "ebram",   "deadline": "قبل 18 مايو",   "notes": "احجز deposit، أكد عدد الناس" },
        { "id": "t7",  "title": "Guest list للخطوبة",            "owner": "both",    "deadline": "قبل 17 مايو",   "notes": "حدد العدد عشان كل حاجة تانية" },
        { "id": "t8",  "title": "تأكيد الدعوات للأهل والمقربين", "owner": "both",    "deadline": "قبل 19 مايو",   "notes": "اتصال شخصي أحسن من رسالة" },
        { "id": "t9",  "title": "حجز مصور الخطوبة",              "owner": "ebram",   "deadline": "قبل 19 مايو",   "notes": "فكر تحجز نفس المصور للفرح → discount" },
        { "id": "t10", "title": "كوافير ومكياج للخطوبة",          "owner": "sherry",  "deadline": "احجزي دلوقتي", "notes": "الجمعة مزدحم، الميعاد لازم يتثبت" },
        { "id": "t11", "title": "تنسيق ملابس الأمهات",            "owner": "both",    "deadline": "قبل 19 مايو",   "notes": "تنسيق الألوان مع الفستان" },
        { "id": "t12", "title": "عربية الطلعة",                   "owner": "ebram",   "deadline": "قبل 20 مايو",   "notes": "لو مؤجرة، اتأكد من حجزها" },
        { "id": "t13", "title": "شيلة ورد لأم العروسة",          "owner": "ebram",   "deadline": "يوم 22 مايو",   "notes": "بوكيه أصغر، تقليد جميل" },
        { "id": "t84", "title": "شراء الشبكة (ذهب العروسة)",     "owner": "ebram",   "deadline": "قبل الخطوبة",   "notes": "تقليد أساسي: حلق + سلسلة + غويشة على الأقل. اتفقي مع أمها على الميل", "critical": true },
        { "id": "t85", "title": "تجهيز خاتم شبكة لأم العروسة",   "owner": "ebram",   "deadline": "قبل الخطوبة",   "notes": "اختياري بس تقليد جميل" }
      ]
    },
    {
      "id": "phase-1",
      "title": "يوم الخطوبة",
      "titleEn": "Engagement Day",
      "dateRange": "22 May 2026",
      "icon": "🎉",
      "color": "#F4C2C2",
      "description": "Enjoy the day — you earned it",
      "milestone": true,
      "tasks": []
    },
    {
      "id": "phase-2",
      "title": "أول أسبوعين بعد الخطوبة",
      "titleEn": "First Two Weeks After",
      "dateRange": "23 May – 5 Jun 2026",
      "icon": "🏠",
      "color": "#C5A572",
      "description": "Big decisions — apartment, budget, church",
      "tasks": [
        { "id": "t14", "title": "قرار الشقة (تجديد ولا جديدة)",     "owner": "both",  "deadline": "بحد أقصى 5 يونيو",       "notes": "⚠️ الـ critical path — كل حاجة بعدها متوقفة عليها", "critical": true },
        { "id": "t15", "title": "Budget breakdown تفصيلي",          "owner": "both",  "deadline": "قبل 31 مايو",             "notes": "فرح/شهر عسل/شقة/عفش/أجهزة + 15% احتياطي" },
        { "id": "t16", "title": "زيارة الكنيسة + حجز ميعاد 7 يناير", "owner": "both",  "deadline": "قبل 30 مايو",             "notes": "اطلب قائمة الأوراق وسؤال عن مدارس الزواج", "critical": true },
        { "id": "t17", "title": "أخذ قائمة أوراق الكنيسة",           "owner": "ebram", "deadline": "عند زيارة الكنيسة",      "notes": "شهادات ميلاد، خلو موانع، إعلانات، تحاليل" },
        { "id": "t18", "title": "فتح Notion/Google Sheet مشترك",     "owner": "ebram", "deadline": "قبل 25 مايو",             "notes": "للمتابعة المشتركة مع شيري" },
        { "id": "t19", "title": "إمضاء عقد الإيجار/الشراء",          "owner": "ebram", "deadline": "بعد قرار الشقة بأسبوع",  "notes": "راجع البنود قانونياً قبل التوقيع" },
        { "id": "t20", "title": "مقاسات الشقة بالتفصيل",              "owner": "ebram", "deadline": "بعد التوقيع مباشرة",      "notes": "لازمة قبل اي شراء عفش" },
        { "id": "t21", "title": "عروض من ٣ معلمين تشطيب",            "owner": "ebram", "deadline": "أول أسبوع يونيو",         "notes": "قارن السعر والوقت والـ references" },
        { "id": "t86", "title": "استخراج صحيفة الحالة الجنائية",     "owner": "ebram", "deadline": "يونيو",                 "notes": "من قسم الشرطة. صلاحيتها 3 شهور غالباً، احسبها صح" },
        { "id": "t87", "title": "صحيفة حالة جنائية لشيري",          "owner": "sherry","deadline": "يونيو",                 "notes": "نفس الكلام، شرط للأوراق الكنسية والمدنية" }
      ]
    },
    {
      "id": "phase-3",
      "title": "التأسيس",
      "titleEn": "Foundation",
      "dateRange": "Jun – Jul 2026",
      "icon": "🛠️",
      "color": "#9CAF88",
      "description": "Apartment work begins + main bookings",
      "tasks": [
        { "id": "t22", "title": "بدء التشطيب (سباكة، كهربا، دهان، أرضيات)", "owner": "ebram",  "deadline": "بدء 10 يونيو",        "notes": "حط buffer شهر فوق المدة المتفق عليها" },
        { "id": "t23", "title": "بدء مدارس الزواج الكنسية",                 "owner": "both",   "deadline": "بمجرد ما تبدأ الجلسات", "notes": "الكنيسة بتطلبها كشرط للزواج، ممكن ٦ شهور", "critical": true },
        { "id": "t24", "title": "تجميع أوراق الكنيسة",                       "owner": "both",   "deadline": "يونيو-يوليو",          "notes": "شهادات ميلاد، خلو موانع، صور" },
        { "id": "t25", "title": "حجز قاعة الاستقبال",                       "owner": "both",   "deadline": "بحد أقصى منتصف يونيو", "notes": "⚠️ الأماكن الكويسة بتتحجز قبلها بشهور", "critical": true },
        { "id": "t26", "title": "حجز المصور والفيديوجرافر للفرح",            "owner": "ebram",  "deadline": "يونيو",                "notes": "شوف portfolio وقابله شخصياً" },
        { "id": "t27", "title": "حجز الكوافير والمكياج للفرح",               "owner": "sherry", "deadline": "يوليو",                "notes": "احجزي اللي عملت لها بروفة الخطوبة لو عجبك شغلها" },
        { "id": "t28", "title": "حجز DJ أو فرقة موسيقية",                    "owner": "ebram",  "deadline": "يوليو",                "notes": "اسأل عن قائمة الأغاني الممنوعة في الكنيسة" },
        { "id": "t29", "title": "حجز البوفيه/الكاترينج",                     "owner": "both",   "deadline": "يوليو",                "notes": "لو مش included في القاعة. اطلب tasting" },
        { "id": "t30", "title": "تحديد وجهة شهر العسل",                      "owner": "both",   "deadline": "بحد أقصى 15 يونيو",     "notes": "يحدد التأشيرة والميزانية" },
        { "id": "t31", "title": "تقديم على تأشيرات السفر",                   "owner": "ebram",  "deadline": "يونيو-يوليو",          "notes": "شنجن ممكن ياخد ٢-٣ شهور، احجز اپوينتمنت بدري", "critical": true },
        { "id": "t32", "title": "تجديد جوازات السفر لو محتاجة",               "owner": "both",   "deadline": "يونيو",                "notes": "لازم سارية ٦ شهور بعد العودة" },
        { "id": "t88", "title": "ميتنج مع كاهن الكنيسة لترتيب الفرح",         "owner": "both",   "deadline": "يوليو",                "notes": "ترتيب الدخول، الموسيقى، الأشبين والإشبينة، أوقات البروفات" },
        { "id": "t89", "title": "شهادة طبية من القومسيون / تحاليل الزواج",    "owner": "both",   "deadline": "يوليو",                "notes": "شرط للزواج. هتاخد منكوا دم + كشف عام", "critical": true }
      ]
    },
    {
      "id": "phase-4",
      "title": "الحاجات الكبيرة",
      "titleEn": "Big Items",
      "dateRange": "Aug – Sep 2026",
      "icon": "👗",
      "color": "#E8B4B8",
      "description": "Dress, suit, rings, furniture, honeymoon",
      "tasks": [
        { "id": "t33", "title": "شراء فستان الفرح",                "owner": "sherry", "deadline": "أغسطس",        "notes": "يحتاج ٣-٤ بروفات على ٣ شهور" },
        { "id": "t34", "title": "شراء بدلة الفرح",                 "owner": "ebram",  "deadline": "أغسطس-سبتمبر",  "notes": "بروفات ٢-٣ مرات" },
        { "id": "t35", "title": "شراء دبل الفرح",                  "owner": "both",   "deadline": "سبتمبر",        "notes": "محفور عليها الاسم والتاريخ" },
        { "id": "t36", "title": "تصميم وطباعة الدعوات",            "owner": "both",   "deadline": "أغسطس",        "notes": "الطباعة بتاخد ٣-٤ أسابيع" },
        { "id": "t37", "title": "حجز عربية الفرح",                 "owner": "ebram",  "deadline": "سبتمبر",        "notes": "اتفق على الديكور" },
        { "id": "t38", "title": "اختيار الإشبين والإشبينة",        "owner": "both",   "deadline": "أغسطس",        "notes": "يقدروا يساعدوا في حاجات تانية" },
        { "id": "t39", "title": "شراء أوضة النوم",                  "owner": "both",   "deadline": "أغسطس",        "notes": "اطلب تسليم نوفمبر، مش وقت الشراء" },
        { "id": "t40", "title": "شراء أوضة السفرة",                 "owner": "both",   "deadline": "أغسطس",        "notes": "نفس الكلام، تسليم متأخر" },
        { "id": "t41", "title": "شراء الانتريه",                    "owner": "both",   "deadline": "أغسطس-سبتمبر",  "notes": "جرب الراحة قبل ما تقرر" },
        { "id": "t42", "title": "شراء الليفينج",                    "owner": "both",   "deadline": "سبتمبر",        "notes": "يطابق الانتريه" },
        { "id": "t43", "title": "شراء أوضة الضيوف",                 "owner": "both",   "deadline": "سبتمبر",        "notes": "ممكن تأجيلها بعد الفرح لو الميزانية ضيقة" },
        { "id": "t44", "title": "حجز طيران شهر العسل",              "owner": "ebram",  "deadline": "أغسطس",        "notes": "الأسعار بتزيد كل ما اتأخرت" },
        { "id": "t45", "title": "حجز فنادق شهر العسل",              "owner": "ebram",  "deadline": "أغسطس-سبتمبر",  "notes": "اقرأ الـ reviews كويس" },
        { "id": "t46", "title": "متابعة التشطيب — Final stretch",   "owner": "ebram",  "deadline": "سبتمبر",        "notes": "لازم يخلص بحد أقصى 15 أكتوبر" },
        { "id": "t90", "title": "شراء السجاد والكليم",               "owner": "both",   "deadline": "سبتمبر",        "notes": "للأوض كلها. قيس قبل الشراء" },
        { "id": "t91", "title": "شراء طاقم سفرة فاخر (china)",       "owner": "both",   "deadline": "سبتمبر",        "notes": "للمناسبات والضيوف. غير الطاقم العادي" }
      ]
    },
    {
      "id": "phase-5",
      "title": "الإنهاء والتجهيز",
      "titleEn": "Finishing & Setup",
      "dateRange": "Oct – Nov 2026",
      "icon": "🍳",
      "color": "#D4AF37",
      "description": "Move into the apartment, finalize wedding details",
      "tasks": [
        { "id": "t47", "title": "تسليم العفش وتركيبه في الشقة",       "owner": "ebram",  "deadline": "أكتوبر",                "notes": "لازم التشطيب يكون خلص" },
        { "id": "t48", "title": "شراء الأجهزة الكهربائية",            "owner": "both",   "deadline": "أكتوبر",                "notes": "تلاجة، غسالة، بوتاجاز، فرن، ميكروويف، تكييفات، سخان، شفاط" },
        { "id": "t49", "title": "شراء حاجة المطبخ",                    "owner": "sherry", "deadline": "أكتوبر-نوفمبر",         "notes": "أوانٍ، أطباق، فضيات، فوط، تنظيف" },
        { "id": "t50", "title": "حاجة الحمام",                         "owner": "sherry", "deadline": "نوفمبر",                "notes": "فوط، مفارش، اكسسوارات" },
        { "id": "t51", "title": "الستائر والمفروشات",                  "owner": "both",   "deadline": "نوفمبر",                "notes": "بعد ما تخلص الدهانات" },
        { "id": "t52", "title": "الإضاءة والأباجورات",                 "owner": "ebram",  "deadline": "نوفمبر",                "notes": "يكون متناسق مع الديكور" },
        { "id": "t53", "title": "توزيع الدعوات على الضيوف",            "owner": "both",   "deadline": "بحد أقصى 7 نوفمبر",      "notes": "اطلب RSVP بحد أقصى 7 ديسمبر" },
        { "id": "t54", "title": "بروفات فستان الفرح",                  "owner": "sherry", "deadline": "أكتوبر-ديسمبر",         "notes": "٣ بروفات على الأقل" },
        { "id": "t55", "title": "تجربة مكياج وكوافير (Trial)",         "owner": "sherry", "deadline": "نوفمبر",                "notes": "جربي قبل ما تثبتي اللوك" },
        { "id": "t56", "title": "طلب توزيعات الضيوف",                  "owner": "sherry", "deadline": "نوفمبر",                "notes": "بوكسات صغيرة أو شوكولاتة أو ورد" },
        { "id": "t57", "title": "طلب تورتة الفرح",                     "owner": "both",   "deadline": "نوفمبر",                "notes": "tasting قبل ما تثبت الطعم" },
        { "id": "t58", "title": "عمل التحاليل الطبية للكنيسة",         "owner": "both",   "deadline": "نوفمبر",                "notes": "بعضها بيكون له صلاحية ٣ شهور" },
        { "id": "t59", "title": "حصر الـ RSVPs وعدد الضيوف النهائي",   "owner": "both",   "deadline": "بداية ديسمبر",          "notes": "بلغ القاعة والكاترينج بالعدد" },
        { "id": "t92", "title": "شراء الأدوات الكهربية الصغيرة",       "owner": "sherry", "deadline": "أكتوبر-نوفمبر",         "notes": "ميكسر، كاتل، توستر، خلاط، عصارة، حلة ضغط، إيركير" },
        { "id": "t93", "title": "شراء مكنسة كهربا",                    "owner": "sherry", "deadline": "نوفمبر",                "notes": "هتحتاجيها للنظافة قبل وبعد النقل" },
        { "id": "t94", "title": "أدوات تنظيف للبيت",                   "owner": "sherry", "deadline": "نوفمبر",                "notes": "ممسحة، فرش، صابون، مساحيق، قفازات" },
        { "id": "t95", "title": "نقل اشتراك الكهرباء للشقة",            "owner": "ebram",  "deadline": "نوفمبر",                "notes": "تحويل العقد لاسم المستأجر/المالك الجديد" },
        { "id": "t96", "title": "نقل اشتراك الغاز",                     "owner": "ebram",  "deadline": "نوفمبر",                "notes": "نفس الكلام" },
        { "id": "t97", "title": "اشتراك إنترنت + دش",                   "owner": "ebram",  "deadline": "نوفمبر",                "notes": "WE / فودافون / إتصالات، اختار الأنسب" },
        { "id": "t98", "title": "شركة نظافة شاملة بعد التشطيب",         "owner": "ebram",  "deadline": "أكتوبر",                "notes": "قبل تركيب العفش. اتفق على Deep Clean" },
        { "id": "t99", "title": "ديكور وصور للحوائط",                    "owner": "both",   "deadline": "نوفمبر",                "notes": "تابلوهات، مرايات، إضاءة ديكور" }
      ]
    },
    {
      "id": "phase-6",
      "title": "الـ Final Stretch",
      "titleEn": "Final Stretch",
      "dateRange": "Dec 2026",
      "icon": "⏰",
      "color": "#B8860B",
      "description": "Confirm everything, last details",
      "tasks": [
        { "id": "t60", "title": "تأكيد كل الـ vendors والـ deposits",          "owner": "ebram", "deadline": "أول ديسمبر",         "notes": "مصور، DJ، قاعة، كاترينج، كوافير، عربية" },
        { "id": "t61", "title": "دفع الباقي للـ vendors",                       "owner": "ebram", "deadline": "منتصف ديسمبر",       "notes": "احتفظ بفواتير" },
        { "id": "t62", "title": "بروفة الكنيسة (Rehearsal)",                    "owner": "both",  "deadline": "أسبوع قبل الفرح",     "notes": "اتفقوا مع الكاهن على البروفة" },
        { "id": "t63", "title": "جلسة تصوير قبل الفرح (Pre-wedding shoot)",     "owner": "both",  "deadline": "ديسمبر",              "notes": "اختيارية بس بتطلع حلوة" },
        { "id": "t64", "title": "تسليم أوراق الكنيسة النهائية",                  "owner": "ebram", "deadline": "منتصف ديسمبر",       "notes": "تأكد إن كل حاجة معتمدة" },
        { "id": "t65", "title": "تجهيز شنطة شهر العسل",                          "owner": "both",  "deadline": "آخر ديسمبر",          "notes": "فضل تجهزها مبكر" },
        { "id": "t66", "title": "شراء العملة الأجنبية",                          "owner": "ebram", "deadline": "ديسمبر",              "notes": "السعر بيتقلب، اشتري في وقت كويس" },
        { "id": "t67", "title": "Travel insurance لشهر العسل",                    "owner": "ebram", "deadline": "ديسمبر",              "notes": "لازم للشنجن وكويس عموماً" },
        { "id": "t68", "title": "تجربة نهائية للفستان والبدلة",                  "owner": "both",  "deadline": "آخر أسبوع ديسمبر",    "notes": "تعديلات أخيرة" },
        { "id": "t69", "title": "Timeline يوم الفرح (دقيقة بدقيقة)",             "owner": "both",  "deadline": "منتصف ديسمبر",       "notes": "اعمله Google Doc وشاركه مع كل الـ vendors" },
        { "id": "t70", "title": "قائمة أغاني الفرح",                              "owner": "both",  "deadline": "ديسمبر",              "notes": "حدد أغاني الدخول، الرقصة الأولى، الكيكة" },
        { "id": "t100", "title": "تحضير شنطة طوارئ العروس",                       "owner": "sherry","deadline": "آخر ديسمبر",           "notes": "مكياج touch-up، دبابيس، إبر وخيط، مسكنات، مناديل، plasters" },
        { "id": "t101", "title": "حلويات وشوكولاتة للضيوف بعد الكنيسة",            "owner": "both",  "deadline": "آخر ديسمبر",           "notes": "تقليد لطيف للي بيستنوا برة الكنيسة" }
      ]
    },
    {
      "id": "phase-7",
      "title": "أسبوع الفرح",
      "titleEn": "Wedding Week",
      "dateRange": "1 – 6 Jan 2027",
      "icon": "🎊",
      "color": "#C71585",
      "description": "Rest, glow up, last-minute details",
      "tasks": [
        { "id": "t71", "title": "Spa / Manicure / Pedicure",         "owner": "sherry", "deadline": "3-5 يناير",       "notes": "مش يوم الفرح" },
        { "id": "t72", "title": "حلاقة وعناية",                       "owner": "ebram",  "deadline": "4-5 يناير",       "notes": "مش يوم الفرح، الجلد محتاج وقت" },
        { "id": "t73", "title": "تجهيز أوراق التوثيق المدني",         "owner": "ebram",  "deadline": "الأسبوع ده",      "notes": "للقسيمة الرسمية" },
        { "id": "t74", "title": "تأكيد نهائي مع كل الـ vendors",       "owner": "ebram",  "deadline": "5-6 يناير",       "notes": "call أو رسالة" },
        { "id": "t75", "title": "راحة وامتناع عن السهر",               "owner": "both",   "deadline": "كل الأسبوع",       "notes": "البشرة هتشكرك" },
        { "id": "t76", "title": "اليوم اللي قبل: نوم بدري",            "owner": "both",   "deadline": "6 يناير",          "notes": "متعملش حاجة جديدة، استريح" },
        { "id": "t102", "title": "مل بنزين كل العربيات",                "owner": "ebram",  "deadline": "6 يناير",          "notes": "العربية بتاعتك + عربية الفرح + عربية الأهل" },
        { "id": "t103", "title": "تحديد مين هيمسك الدبل في الكنيسة",    "owner": "both",   "deadline": "قبل الفرح بأسبوع",  "notes": "غالباً الكاهن أو الإشبين. اتفق ومتنساش الدبل!" },
        { "id": "t104", "title": "تأكيد استلام التورتة والورد يوم الفرح", "owner": "ebram",  "deadline": "6 يناير",          "notes": "حدد ساعة الاستلام مع المصدر، حد يستلم" }
      ]
    },
    {
      "id": "phase-8",
      "title": "يوم الفرح",
      "titleEn": "Wedding Day",
      "dateRange": "7 Jan 2027",
      "icon": "💒",
      "color": "#8B0000",
      "description": "The best day of your lives 💍",
      "milestone": true,
      "tasks": []
    },
    {
      "id": "phase-9",
      "title": "بعد الفرح",
      "titleEn": "After the Wedding",
      "dateRange": "Jan 2027 onwards",
      "icon": "✈️",
      "color": "#4682B4",
      "description": "Honeymoon and life as newlyweds",
      "tasks": [
        { "id": "t77", "title": "شهر العسل",                                       "owner": "both",   "deadline": "بعد الفرح",   "notes": "استمتعوا" },
        { "id": "t78", "title": "توثيق الزواج المدني (القسيمة)",                    "owner": "ebram",  "deadline": "بعد الرجوع",  "notes": "لازم للأوراق الرسمية" },
        { "id": "t79", "title": "تحديث البطاقة الشخصية والـ documents لشيري",       "owner": "sherry", "deadline": "بعد الرجوع",  "notes": "الحالة الاجتماعية + الاسم" },
        { "id": "t80", "title": "فتح حساب بنك مشترك",                                "owner": "both",   "deadline": "بعد الرجوع",  "notes": "اختياري" },
        { "id": "t81", "title": "تحديث التأمين الصحي والمستفيدين",                   "owner": "both",   "deadline": "بعد الرجوع",  "notes": "المستفيد بقى الزوج/ة" },
        { "id": "t82", "title": "كروت شكر للضيوف",                                   "owner": "sherry", "deadline": "شهر بعد الفرح", "notes": "تقليد جميل" },
        { "id": "t83", "title": "طلب الألبوم والفيديو من المصور",                    "owner": "ebram",  "deadline": "شهر بعد الفرح", "notes": "تابع التسليم" },
        { "id": "t105", "title": "شراء سيم كارت دولية أو Roaming لشهر العسل",        "owner": "ebram",  "deadline": "قبل السفر",   "notes": "Airalo / Holafly eSIM أو فعّل Roaming من شركتك" },
        { "id": "t106", "title": "تحديث عقد الإيجار/التأمين بالاسم الجديد لشيري",   "owner": "both",   "deadline": "بعد القسيمة", "notes": "بعد ما البطاقة تتغير، حدّث كل العقود" }
      ]
    }
  ]
}
;
