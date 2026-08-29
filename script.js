
"use strict";

/*
  Saphira v2
  - مقادیر دوزینگ منتخب و محافظه‌کارانه طراحی شده‌اند.
  - calculator فقط تبدیل dose -> mL را انجام می‌دهد و انتخاب درمان را به کاربر واگذار می‌کند.
*/

const SOURCES = [
  {
    title: "CDC — Clinical Guidance for Group A Streptococcal Pharyngitis",
    url: "https://www.cdc.gov/group-a-strep/hcp/clinical-guidance/strep-throat.html",
    note: "دوزهای آموکسی‌سیلین، سفالکسین، کلیندامایسین و ماکرولیدها برای GAS."
  },
  {
    title: "AAP — Acute Otitis Media",
    url: "https://publications.aap.org/pediatrics/article/131/3/e964/30912/The-Diagnosis-and-Management-of-Acute-Otitis-Media",
    note: "دوز high-dose آموکسی‌سیلین و آموکسی‌کلاو و گزینه‌های اوتیت."
  },
  {
    title: "AAP — Acute Bacterial Sinusitis in Children",
    url: "https://publications.aap.org/pediatrics/article-abstract/132/1/e262/31288/Clinical-Practice-Guideline-for-the-Diagnosis-and-Management-of-Acute-Bacterial-Sinusitis-in-Children-Aged-1-to-18-Years",
    note: "دوز استاندارد/بالای آموکسی‌سیلین و آموکسی‌کلاو در سینوزیت باکتریال."
  },
  {
    title: "AAP Red Book 2024–2027 — Systems-Based Treatment Table",
    url: "https://publications.aap.org/redbook/book/755/chapter/14074070/Systems-Based-Treatment-Table",
    note: "مرور رژیم‌ها و مدت‌های منتخب برای عفونت‌های کودکان."
  },
  {
    title: "DailyMed — Cefdinir for Oral Suspension",
    url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2bd2101c-511d-45a9-b1d8-a45ed40c5b80",
    note: "دوز 14 mg/kg/day و سقف 600 mg/day."
  },
  {
    title: "DailyMed — Cefuroxime Axetil for Oral Suspension",
    url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=135e2dfc-eb47-4d04-a903-a081d36c267e",
    note: "دوزهای اطفال بر اساس اندیکاسیون و الزام مصرف همراه غذا."
  },
  {
    title: "DailyMed — Amoxicillin/Clavulanate",
    url: "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=amoxicillin%20clavulanate%20for%20oral%20suspension",
    note: "فرمولاسیون‌های خوراکی و دوزینگ بر اساس جزء آموکسی‌سیلین."
  },
  {
    title: "DailyMed — Cefpodoxime Proxetil for Oral Suspension",
    url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5310de78-22c3-4bee-9956-854e767b6bef",
    note: "دوز 10 mg/kg/day و سقف‌های هر اندیکاسیون."
  },
  {
    title: "DailyMed — Azithromycin",
    url: "https://www.dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=77f12139-2e38-4298-b4f4-c24976cf0636",
    note: "رژیم‌های 3 و 5 روزه و دوزهای اطفال."
  },
  {
    title: "FDA — Cough and Cold Medicines in Children",
    url: "https://www.fda.gov/consumers/consumer-updates/should-you-give-kids-medicine-coughs-and-colds",
    note: "برای جلوگیری از قرار دادن ضداحتقان‌ها و فرآورده‌های سرماخوردگی به‌عنوان داروی اصلی این ابزار."
  },
  {
    title: "DailyMed — Sulfamethoxazole/Trimethoprim Oral Suspension",
    url: "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=sulfamethoxazole%20trimethoprim%20oral%20suspension",
    note: "اطلاعات فرآورده و غلظت 40/200 mg در 5 mL؛ دوز درمانی بر حسب اندیکاسیون باید با رفرنس محلی تطبیق داده شود."
  }
];

const DRUGS = [
  {
    id: "amoxicillin",
    name: "Amoxicillin — آموکسی‌سیلین",
    type: "Penicillin / aminopenicillin",
    minAgeMonths: 0,
    strengths: [
      { id: "amox125", label: "125 mg / 5 mL", mgPer5mL: 125 },
      { id: "amox250", label: "250 mg / 5 mL", mgPer5mL: 250 },
      { id: "amox400", label: "400 mg / 5 mL", mgPer5mL: 400 }
    ],
    notes: `خط اول بسیاری از عفونت‌های شایع کودکان در صورت وجود اندیکاسیون باکتریال.
در AOM دوز high-dose معمولاً 80–90 mg/kg/day در دو نوبت است.
در GAS، CDC: 50 mg/kg یک‌بار در روز (حداکثر 1000 mg/day) برای 10 روز، یا 25 mg/kg/dose دو بار در روز (حداکثر 500 mg/dose).
با غذا یا بدون غذا قابل مصرف است؛ سوسپانسیون را قبل از هر نوبت خوب تکان دهید.
حساسیت شدید به پنی‌سیلین باید قبل از انتخاب بررسی شود.`,
    indications: [
      {
        id: "aom-high",
        label: "AOM — دوز بالا",
        mgPerKgPerDay: 90,
        dosesPerDay: 2,
        maxDailyMg: 4000,
        duration: "معمولاً 5–10 روز بر اساس سن و شدت؛ مدت را مستقل از ماشین‌حساب تعیین کنید.",
        ageNote: "دوز high-dose برای AOM مطابق AAP است.",
        references: ["AAP AOM"]
      },
      {
        id: "gas",
        label: "فارنژیت استرپتوکوکی (GAS) — روزی یک‌بار",
        mgPerKgPerDay: 50,
        dosesPerDay: 1,
        maxDailyMg: 1000,
        duration: "10 روز",
        ageNote: "CDC: 50 mg/kg یک‌بار در روز، حداکثر 1000 mg/day.",
        references: ["CDC GAS"]
      },
      {
        id: "gas-bid",
        label: "فارنژیت استرپتوکوکی (GAS) — هر ۱۲ ساعت",
        mgPerKgPerDay: 50,
        dosesPerDay: 2,
        maxSingleMg: 500,
        duration: "10 روز",
        ageNote: "CDC: 25 mg/kg/dose دو بار در روز، حداکثر 500 mg/dose.",
        references: ["CDC GAS"]
      },
      {
        id: "sinus-standard",
        label: "سینوزیت باکتریال — استاندارد",
        mgPerKgPerDay: 45,
        dosesPerDay: 2,
        maxDailyMg: 4000,
        duration: "کوتاه‌ترین مدت مؤثر بر اساس راهنمای محلی/Red Book",
        ageNote: "برای بیمار ساده، بدون ریسک مقاومت و در شرایط مناسب بالینی.",
        references: ["AAP Sinusitis"]
      }
    ]
  },
  {
    id: "amoxiclav",
    name: "Amoxicillin/Clavulanate — آموکسی‌کلاو",
    type: "β-lactam / β-lactamase inhibitor",
    minAgeMonths: 3,
    strengths: [
      { id: "amcl125", label: "125/31.25 mg / 5 mL", mgPer5mL: 125, ratio: "4:1" },
      { id: "amcl200", label: "200/28.5 mg / 5 mL", mgPer5mL: 200, ratio: "7:1" },
      { id: "amcl400", label: "400/57 mg / 5 mL", mgPer5mL: 400, ratio: "7:1" },
      { id: "amcl600", label: "600/42.9 mg / 5 mL", mgPer5mL: 600, ratio: "14:1" }
    ],
    notes: `دوزها بر اساس جزء آموکسی‌سیلین محاسبه می‌شوند.
برای high-dose در AOM/سینوزیت، فرمول 14:1 (600/42.9 mg/5 mL) برای رساندن آموکسی‌سیلین زیاد با کلاوولانات کمتر مناسب‌تر است.
بهتر است در شروع غذا مصرف شود تا تحمل گوارشی بهتر شود.
اسهال و تهوع شایع‌تر از آموکسی‌سیلین ساده است؛ سابقه آسیب کبدی/کلستاتیک مرتبط با دارو مهم است.`,
    indications: [
      {
        id: "aom-high-amcl",
        label: "AOM — high-dose (جزء آموکسی‌سیلین)",
        mgPerKgPerDay: 90,
        dosesPerDay: 2,
        maxDailyMg: 4000,
        maxSingleMg: 2000,
        preferredStrength: "amcl600",
        duration: "بر اساس سن و شدت؛ در راهنماهای AAP معمولاً 5–10 روز.",
        ageNote: "برای high-dose ترجیحاً نسبت 14:1 را انتخاب کنید؛ دوز بر اساس آموکسی‌سیلین است.",
        references: ["AAP AOM", "DailyMed Amoxicillin/Clavulanate"]
      },
      {
        id: "sinus-high-amcl",
        label: "سینوزیت باکتریال — high-dose",
        mgPerKgPerDay: 90,
        dosesPerDay: 2,
        maxDailyMg: 4000,
        maxSingleMg: 2000,
        preferredStrength: "amcl600",
        duration: "راهکار منتخب: اغلب 5–7 روز در برخی منابع جدید، اما با سن/شدت/پاسخ بیمار تطبیق شود.",
        ageNote: "سن پایین، شدت بیشتر، daycare یا مصرف اخیر آنتی‌بیوتیک می‌تواند به نفع high-dose باشد.",
        references: ["AAP Sinusitis", "AAP Red Book"]
      },
      {
        id: "resp-standard-amcl",
        label: "عفونت تنفسی منتخب — استاندارد",
        mgPerKgPerDay: 45,
        dosesPerDay: 2,
        maxDailyMg: 4000,
        duration: "بر اساس تشخیص و راهنما",
        ageNote: "تشخیص باید نشان‌دهندهٔ نیاز به پوشش β-lactamase باشد.",
        references: ["AAP Sinusitis"]
      }
    ]
  },
  {
    id: "cephalexin",
    name: "Cephalexin — سفالکسین",
    type: "1st-generation cephalosporin",
    minAgeMonths: 12,
    strengths: [
      { id: "ceph125", label: "125 mg / 5 mL", mgPer5mL: 125 },
      { id: "ceph250", label: "250 mg / 5 mL", mgPer5mL: 250 }
    ],
    notes: `پوشش مناسب برای بسیاری از استرپتوکوک‌ها و MSSA؛ برای MRSA قابل اتکا نیست.
در حساسیت فوری/آنافیلاکسی به پنی‌سیلین، مصرف سفالوسپورین باید با توجه به نوع واکنش و راهنمای محلی ارزیابی شود.
با غذا یا بدون غذا قابل مصرف است.
دوز دقیق به اندیکاسیون وابسته است و در UTI باید الگوی مقاومت محلی در نظر گرفته شود.`,
    indications: [
      {
        id: "strep-cephalexin",
        label: "فارنژیت GAS در حساسیت غیر فوری به پنی‌سیلین",
        mgPerKgPerDay: 40,
        dosesPerDay: 2,
        maxDailyMg: 1000,
        maxSingleMg: 500,
        duration: "10 روز",
        ageNote: "CDC: 20 mg/kg/dose دو بار در روز، حداکثر 500 mg/dose.",
        references: ["CDC GAS"]
      },
      {
        id: "ssti-cephalexin",
        label: "SSTI / امپتیگو — دوز معمول",
        mgPerKgPerDay: 50,
        dosesPerDay: 3,
        maxDailyMg: 4000,
        duration: "معمولاً 5–10 روز بر اساس پاسخ بالینی",
        ageNote: "برای عفونت پوستی، وجود آبسه/احتمال MRSA و نیاز به drainage را جداگانه ارزیابی کنید.",
        references: ["AAP Red Book"]
      }
    ]
  },
  {
    id: "cefuroxime",
    name: "Cefuroxime — سفوروکسیم",
    type: "2nd-generation cephalosporin",
    minAgeMonths: 3,
    strengths: [
      { id: "cefu125", label: "125 mg / 5 mL", mgPer5mL: 125 },
      { id: "cefu250", label: "250 mg / 5 mL", mgPer5mL: 250 }
    ],
    notes: `سوسپانسیون خوراکی سفوروکسیم با غذا جذب بهتری دارد؛ هنگام تحویل فرآورده این نکته را مشخص کنید.
قرص و سوسپانسیون از نظر bioavailability کاملاً قابل جایگزینی mg-for-mg نیستند.
در نارسایی کلیوی ممکن است نیاز به تعدیل رژیم باشد.`,
    indications: [
      {
        id: "aom-cefuroxime",
        label: "AOM",
        mgPerKgPerDay: 30,
        dosesPerDay: 2,
        maxDailyMg: 1000,
        duration: "تا 10 روز؛ بر اساس سن و شدت",
        ageNote: "DailyMed برای سوسپانسیون: 30 mg/kg/day در دو نوبت، حداکثر 1000 mg/day.",
        references: ["DailyMed Cefuroxime"]
      },
      {
        id: "pharyngitis-cefuroxime",
        label: "فارنژیت/تونسیلیت",
        mgPerKgPerDay: 20,
        dosesPerDay: 2,
        maxDailyMg: 500,
        duration: "10 روز",
        ageNote: "در درمان GAS، حساسیت به پنی‌سیلین و مقاومت محلی را در نظر بگیرید.",
        references: ["DailyMed Cefuroxime"]
      }
    ]
  },
  {
    id: "cefdinir",
    name: "Cefdinir — سفدینیر",
    type: "3rd-generation cephalosporin",
    minAgeMonths: 6,
    strengths: [
      { id: "cefd125", label: "125 mg / 5 mL", mgPer5mL: 125 },
      { id: "cefd250", label: "250 mg / 5 mL", mgPer5mL: 250 }
    ],
    notes: `محدودیت سنی مهم: سوسپانسیون خوراکی برای کودکان 6 ماه تا 12 سال در برچسب دارویی ذکر شده است.
دوز کل معمول 14 mg/kg/day (حداکثر 600 mg/day) است؛ می‌توان آن را یک‌بار در روز یا 7 mg/kg هر 12 ساعت داد، ولی برای عفونت پوستی رژیم BID استفاده می‌شود.
ممکن است مدفوع به رنگ قرمز متمایل شود، به‌خصوص همراه فرآورده‌های آهن؛ معمولاً بی‌خطر است، اما باید با خونریزی اشتباه نشود.`,
    indications: [
      {
        id: "aom-cefdinir",
        label: "AOM",
        mgPerKgPerDay: 14,
        dosesPerDay: 1,
        maxDailyMg: 600,
        minAgeMonths: 6,
        duration: "5–10 روز بر اساس رژیم و سن؛ برچسب دارویی برای QD، 10 روز را ذکر می‌کند.",
        ageNote: "Q12h یا Q24h قابل استفاده است؛ برای انتخاب رژیم با راهنمای اندیکاسیون تطبیق دهید.",
        references: ["DailyMed Cefdinir"]
      },
      {
        id: "pharyngitis-cefdinir",
        label: "فارنژیت/تونسیلیت",
        mgPerKgPerDay: 14,
        dosesPerDay: 1,
        maxDailyMg: 600,
        minAgeMonths: 6,
        duration: "5–10 روز؛ QD طبق برچسب 10 روز.",
        ageNote: "در حساسیت immediate-type به پنی‌سیلین، انتخاب سفالوسپورین نسل سوم باید با نظر بالینی باشد.",
        references: ["DailyMed Cefdinir", "CDC GAS"]
      },
      {
        id: "ssti-cefdinir",
        label: "SSTI غیرپیچیده",
        mgPerKgPerDay: 14,
        dosesPerDay: 2,
        maxDailyMg: 600,
        minAgeMonths: 6,
        duration: "10 روز در برچسب دارویی",
        ageNote: "برای skin infection، رژیم BID استفاده می‌شود.",
        references: ["DailyMed Cefdinir"]
      }
    ]
  },
  {
    id: "cefpodoxime",
    name: "Cefpodoxime — سفپودوکسیم",
    type: "3rd-generation cephalosporin",
    minAgeMonths: 2,
    strengths: [
      { id: "cefp50", label: "50 mg / 5 mL", mgPer5mL: 50 },
      { id: "cefp100", label: "100 mg / 5 mL", mgPer5mL: 100 }
    ],
    notes: `برچسب دارویی: 2 ماه تا 12 سال.
برای OMA و سینوزیت، 10 mg/kg/day در دو نوبت؛ سقف روزانه 400 mg و سقف هر نوبت 200 mg در اندیکاسیون‌های ذکرشده.
در نارسایی شدید کلیه فاصلهٔ مصرف ممکن است از q12h به q24h تغییر کند.`,
    indications: [
      {
        id: "aom-cefpodoxime",
        label: "AOM",
        mgPerKgPerDay: 10,
        dosesPerDay: 2,
        maxDailyMg: 400,
        maxSingleMg: 200,
        minAgeMonths: 2,
        duration: "5 روز در برچسب دارویی",
        ageNote: "5 mg/kg/dose هر 12 ساعت، حداکثر 200 mg/dose.",
        references: ["DailyMed Cefpodoxime"]
      },
      {
        id: "sinus-cefpodoxime",
        label: "سینوزیت باکتریال",
        mgPerKgPerDay: 10,
        dosesPerDay: 2,
        maxDailyMg: 400,
        maxSingleMg: 200,
        minAgeMonths: 2,
        duration: "10 روز در برچسب دارویی",
        ageNote: "5 mg/kg/dose هر 12 ساعت، حداکثر 200 mg/dose.",
        references: ["DailyMed Cefpodoxime"]
      }
    ]
  },
  {
    id: "azithromycin",
    name: "Azithromycin — آزیترومایسین",
    type: "Macrolide",
    minAgeMonths: 6,
    strengths: [
      { id: "azi100", label: "100 mg / 5 mL", mgPer5mL: 100 },
      { id: "azi200", label: "200 mg / 5 mL", mgPer5mL: 200 }
    ],
    notes: `در بسیاری از عفونت‌ها جایگزین β-lactam خط اول نیست؛ انتخاب آن باید بر اساس اندیکاسیون، آلرژی و مقاومت باشد.
رژیم 5 روزهٔ شایع: روز اول 10 mg/kg و روزهای 2–5، 5 mg/kg روزانه.
می‌تواند QT را طولانی کند و در بیماران پرخطر یا همراه داروهای طولانی‌کنندهٔ QT نیاز به احتیاط دارد.
با یا بدون غذا قابل مصرف است.`,
    indications: [
      {
        id: "azi5",
        label: "رژیم 5 روزه — AOM/CAP منتخب",
        special: "azithro5",
        mgPerKgPerDay: 10,
        dosesPerDay: 1,
        maxSingleMg: 500,
        minAgeMonths: 6,
        duration: "روز 1: 10 mg/kg؛ روزهای 2–5: 5 mg/kg/day",
        ageNote: "برای هر اندیکاسیون فقط زمانی استفاده شود که ماکرولید از نظر بالینی مناسب باشد.",
        references: ["DailyMed Azithromycin"]
      },
      {
        id: "azi-strep",
        label: "GAS — جایگزین در برخی حساسیت‌های پنی‌سیلین",
        special: "azithro5strep",
        mgPerKgPerDay: 12,
        dosesPerDay: 1,
        maxSingleMg: 500,
        minAgeMonths: 6,
        duration: "5 روز",
        ageNote: "CDC: روز اول 12 mg/kg (حداکثر 500 mg) و روزهای 2 تا 5، 6 mg/kg/day (حداکثر 250 mg/day)؛ مقاومت به ماکرولیدها متغیر است.",
        references: ["CDC GAS"]
      }
    ]
  },
  {
    id: "clarithromycin",
    name: "Clarithromycin — کلاریترومایسین",
    type: "Macrolide",
    minAgeMonths: 6,
    strengths: [
      { id: "clar125", label: "125 mg / 5 mL", mgPer5mL: 125 },
      { id: "clar250", label: "250 mg / 5 mL", mgPer5mL: 250 }
    ],
    notes: `مهارکنندهٔ مهم CYP3A4 و مستعد تداخلات دارویی است.
دوز معمول بسیاری از اندیکاسیون‌های اطفال 15 mg/kg/day در دو نوبت است، اما انتخاب اندیکاسیون باید دقیق باشد.
در GAS، CDC: 7.5 mg/kg/dose دو بار در روز، حداکثر 250 mg/dose، 10 روز.
تهوع، درد شکم و طعم فلزی ممکن است رخ دهد.`,
    indications: [
      {
        id: "clar-strep",
        label: "GAS — جایگزین در برخی حساسیت‌های پنی‌سیلین",
        mgPerKgPerDay: 15,
        dosesPerDay: 2,
        maxSingleMg: 250,
        maxDailyMg: 500,
        minAgeMonths: 6,
        duration: "10 روز",
        ageNote: "CDC: 7.5 mg/kg/dose دو بار در روز؛ حداکثر 250 mg/dose.",
        references: ["CDC GAS"]
      }
    ]
  },
  {
    id: "clindamycin",
    name: "Clindamycin — کلیندامایسین",
    type: "Lincosamide",
    minAgeMonths: 0,
    strengths: [
      { id: "clin75", label: "75 mg / 5 mL", mgPer5mL: 75 }
    ],
    notes: `دوز به‌شدت به محل عفونت و شدت آن وابسته است.
خطر مهم: اسهال وابسته به آنتی‌بیوتیک و C. difficile؛ در اسهال شدید، آبکی یا خونی باید ارزیابی شود.
برای GAS در CDC: 7 mg/kg/dose سه بار در روز، حداکثر 300 mg/dose، 10 روز.
برای SSTI، انتخاب دارو باید با الگوی مقاومت و احتمال MRSA تطبیق داده شود.`,
    indications: [
      {
        id: "clin-strep",
        label: "GAS — حساسیت شدید به β-lactam",
        mgPerKgPerDay: 21,
        dosesPerDay: 3,
        maxDailyMg: 900,
        maxSingleMg: 300,
        duration: "10 روز",
        ageNote: "CDC: 7 mg/kg/dose سه بار در روز؛ حداکثر 300 mg/dose.",
        references: ["CDC GAS"]
      },
      {
        id: "clin-ssti",
        label: "SSTI منتخب — رژیم معمول",
        mgPerKgPerDay: 30,
        dosesPerDay: 3,
        maxDailyMg: 1800,
        maxSingleMg: 600,
        duration: "معمولاً 5–10 روز بر اساس پاسخ",
        ageNote: "20–40 mg/kg/day یکی از محدوده‌های رایج است؛ در این ماشین‌حساب 30 mg/kg/day انتخاب شده است.",
        references: ["AAP AOM", "AAP Red Book"]
      }
    ]
  },
  {
    id: "tmpsmx",
    name: "TMP–SMX — کوتریموکسازول",
    type: "Trimethoprim + sulfamethoxazole",
    minAgeMonths: 2,
    strengths: [
      { id: "tmp40", label: "40 mg TMP / 5 mL (40/200)", mgPer5mL: 40 }
    ],
    notes: `محاسبهٔ دوز بر اساس جزء trimethoprim (TMP) انجام می‌شود، نه مجموع دو جزء.
برای برخی UTIها و عفونت‌های پوستی انتخاب می‌شود؛ برای GAS pharyngitis داروی مناسبی نیست.
در شیرخواران <2 ماه معمولاً استفاده نمی‌شود مگر در شرایط تخصصی خاص.
راش شدید، هایپرکالمی، اختلالات خونی و تداخلات مهم در برخی بیماران ممکن است رخ دهد.`,
    indications: [
      {
        id: "tmp-uti",
        label: "UTI منتخب — بر اساس TMP",
        mgPerKgPerDay: 8,
        dosesPerDay: 2,
        maxDailyMg: 320,
        maxSingleMg: 160,
        minAgeMonths: 2,
        duration: "اغلب 7–14 روز بر اساس محل عفونت و راهنمای محلی",
        ageNote: "مقاومت E. coli محلی و عملکرد کلیه باید بررسی شود.",
        references: ["DailyMed TMP-SMX"]
      },
      {
        id: "tmp-ssti",
        label: "SSTI/MRSA منتخب — بر اساس TMP",
        mgPerKgPerDay: 10,
        dosesPerDay: 2,
        maxDailyMg: 320,
        maxSingleMg: 160,
        minAgeMonths: 2,
        duration: "معمولاً 5–10 روز بر اساس پاسخ و drainage",
        ageNote: "مقدار 8–12 mg/kg/day TMP در بسیاری از منابع استفاده می‌شود؛ اینجا 10 انتخاب شده است.",
        references: ["DailyMed TMP-SMX"]
      }
    ]
  }
];

const els = {
  drugSelect: document.getElementById("drugSelect"),
  weight: document.getElementById("weight"),
  ageMonths: document.getElementById("ageMonths"),
  strengthField: document.getElementById("strengthField"),
  strengthSelect: document.getElementById("strengthSelect"),
  strengthHint: document.getElementById("strengthHint"),
  indicationField: document.getElementById("indicationField"),
  indicationSelect: document.getElementById("indicationSelect"),
  indicationHint: document.getElementById("indicationHint"),
  drugMeta: document.getElementById("drugMeta"),
  drugDetails: document.getElementById("drugDetails"),
  drugNotes: document.getElementById("drugNotes"),
  calcBtn: document.getElementById("calcBtn"),
  resetBtn: document.getElementById("resetBtn"),
  result: document.getElementById("result"),
  statusBadge: document.getElementById("statusBadge"),
  themeBtn: document.getElementById("themeBtn"),
  themeIcon: document.getElementById("themeIcon"),
  sourcesBtn: document.getElementById("sourcesBtn"),
  sourcesDialog: document.getElementById("sourcesDialog"),
  aboutBtn: document.getElementById("aboutBtn"),
  aboutDialog: document.getElementById("aboutDialog"),
  sourceLinks: document.getElementById("sourceLinks")
};

function normalizeDigits(value) {
  if (value == null) return "";
  return String(value)
    .replace(/[۰-۹]/g, ch => String("۰۱۲۳۴۵۶۷۸۹".indexOf(ch)))
    .replace(/[٠-٩]/g, ch => String("٠١٢٣٤٥٦٧٨٩".indexOf(ch)))
    .replace(/٫/g, ".")
    .replace(/٬/g, "");
}

function faNum(value, digits = 1) {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return "—";
  const txt = Number.isInteger(n) ? String(n) : n.toFixed(digits).replace(/\.0+$/, "").replace(/(\.\d*?[1-9])0+$/, "$1");
  return txt.replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);
}

function parseNumber(input) {
  const value = normalizeDigits(input?.value ?? input);
  const n = Number.parseFloat(value);
  return Number.isFinite(n) ? n : NaN;
}

function findDrug(id) {
  return DRUGS.find(d => d.id === id) || null;
}

function findIndication(drug, id) {
  return drug?.indications?.find(i => i.id === id) || null;
}

function findStrength(drug, id) {
  return drug?.strengths?.find(s => s.id === id) || null;
}

function ageLabel(months) {
  if (!Number.isFinite(months)) return "سن وارد نشده";
  if (months < 24) return `${faNum(months, 0)} ماه`;
  const years = months / 12;
  return Number.isInteger(years)
    ? `${faNum(years, 0)} سال`
    : `${faNum(years, 1)} سال`;
}

function safeText(text) {
  return String(text ?? "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[ch]));
}

function setStatus(text, type = "") {
  els.statusBadge.textContent = text;
  els.statusBadge.className = `status-badge${type ? ` ${type}` : ""}`;
}

function clearResult() {
  els.result.className = "result-panel is-hidden";
  els.result.innerHTML = "";
}

function populateDrugs() {
  els.drugSelect.innerHTML = `<option value="">دارو را انتخاب کنید</option>`;

  DRUGS.forEach(drug => {
    const option = document.createElement("option");
    option.value = drug.id;
    option.textContent = drug.name;
    els.drugSelect.appendChild(option);
  });
}

function selectPreferredStrength(drug, indication) {
  const preferred = indication?.preferredStrength &&
    findStrength(drug, indication.preferredStrength);

  if (preferred) {
    els.strengthSelect.value = preferred.id;
    updateStrengthHint(drug, preferred, indication);
    return;
  }

  const first = drug?.strengths?.[0];

  if (first) {
    els.strengthSelect.value = first.id;
    updateStrengthHint(drug, first, indication);
  }
}

function updateStrengthHint(drug, strength, indication) {
  if (!strength) {
    els.strengthHint.textContent = "";
    return;
  }

  let hint = `محاسبه بر اساس ${faNum(strength.mgPer5mL)} mg در 5 mL`;

  if (drug?.id === "amoxiclav") {
    hint += ` · نسبت محصول: ${strength.ratio}`;

    if (
      indication?.preferredStrength === "amcl600" &&
      strength.id !== "amcl600"
    ) {
      hint += " · برای high-dose بهتر است محصول 14:1 انتخاب شود.";
    }
  }

  els.strengthHint.textContent = hint;
}

function onDrugChange() {
  const drug = findDrug(els.drugSelect.value);

  clearResult();

  els.strengthSelect.innerHTML = "";
  els.indicationSelect.innerHTML = "";

  els.strengthField.classList.add("is-hidden");
  els.indicationField.classList.add("is-hidden");
  els.drugDetails.classList.add("is-hidden");

  els.drugMeta.textContent = "ابتدا یک آنتی‌بیوتیک انتخاب کنید.";
  els.indicationHint.textContent = "";
  els.strengthHint.textContent = "";

  setStatus("آماده");

  if (!drug) return;

  els.drugMeta.textContent =
    `${drug.type} · حداقل سن ثبت‌شده برای این پروفایل: ` +
    `${drug.minAgeMonths ? ageLabel(drug.minAgeMonths) : "بدون محدودیت اختصاصی در این پروفایل"}`;

  els.drugNotes.textContent = drug.notes;
  els.drugDetails.classList.remove("is-hidden");

  drug.strengths.forEach(s => {
    const option = document.createElement("option");
    option.value = s.id;
    option.textContent = s.label;
    els.strengthSelect.appendChild(option);
  });

  els.strengthField.classList.remove("is-hidden");

  drug.indications.forEach(ind => {
    const option = document.createElement("option");
    option.value = ind.id;
    option.textContent = ind.label;
    els.indicationSelect.appendChild(option);
  });

  els.indicationField.classList.remove("is-hidden");

  if (drug.strengths.length) {
    selectPreferredStrength(drug, drug.indications[0]);
  }

  if (drug.indications.length) {
    els.indicationSelect.value = drug.indications[0].id;
    onIndicationChange();
  }
}

function onStrengthChange() {
  const drug = findDrug(els.drugSelect.value);
  const indication = findIndication(drug, els.indicationSelect.value);
  const strength = findStrength(drug, els.strengthSelect.value);

  updateStrengthHint(drug, strength, indication);
  clearResult();
}

function onIndicationChange() {
  const drug = findDrug(els.drugSelect.value);
  const indication = findIndication(drug, els.indicationSelect.value);

  clearResult();

  if (!drug || !indication) return;

  const strength = findStrength(
    drug,
    indication.preferredStrength || els.strengthSelect.value
  );

  if (indication.preferredStrength && strength) {
    els.strengthSelect.value = strength.id;
  }

  updateStrengthHint(
    drug,
    findStrength(drug, els.strengthSelect.value),
    indication
  );

  els.indicationHint.textContent =
    `${indication.duration}${indication.ageNote ? ` · ${indication.ageNote}` : ""}`;

  setStatus("پروفایل انتخاب شد", "");
}

function validateInputs(drug, indication, strength) {
  const weight = parseNumber(els.weight);
  const ageMonthsRaw = parseNumber(els.ageMonths);
  const ageMonths = Number.isFinite(ageMonthsRaw)
    ? ageMonthsRaw
    : NaN;

  if (
    !Number.isFinite(weight) ||
    weight < 0.5 ||
    weight > 200
  ) {
    return {
      ok: false,
      message: "وزن معتبر بین ۰٫۵ تا ۲۰۰ کیلوگرم وارد کنید."
    };
  }

  if (!drug || !indication || !strength) {
    return {
      ok: false,
      message: "دارو، اندیکاسیون و غلظت فرآورده را کامل انتخاب کنید."
    };
  }

  if (Number.isFinite(ageMonths) && ageMonths < 0) {
    return {
      ok: false,
      message: "سن نمی‌تواند منفی باشد."
    };
  }

  const minAge = Math.max(
    drug.minAgeMonths ?? 0,
    indication.minAgeMonths ?? 0
  );

  if (minAge > 0 && !Number.isFinite(ageMonths)) {
    return {
      ok: false,
      message:
        `برای این دارو وارد کردن سن کودک ضروری است تا ` +
        `محدودیت سنی ${ageLabel(minAge)} بررسی شود.`
    };
  }

  if (Number.isFinite(ageMonths) && ageMonths < minAge) {
    return {
      ok: false,
      message:
        `برای این پروفایل حداقل سن درج‌شده ${ageLabel(minAge)} است.`
    };
  }

  if (
    drug.id === "amoxiclav" &&
    indication.preferredStrength === "amcl600" &&
    strength.id !== "amcl600"
  ) {
    return {
      ok: false,
      message:
        "برای این رژیم high-dose، فرآوردهٔ 600/42.9 mg در 5 mL (نسبت 14:1) انتخاب شود."
    };
  }

  return {
    ok: true,
    weight,
    ageMonths
  };
}

function calculateRegular(indication, weight) {
  const requestedDaily =
    weight * indication.mgPerKgPerDay;

  let dailyMg = requestedDaily;
  let cappedByDaily = false;

  const dailyCap =
    indication.maxDailyMg ?? Infinity;

  if (
    Number.isFinite(dailyCap) &&
    dailyMg > dailyCap
  ) {
    dailyMg = dailyCap;
    cappedByDaily = true;
  }

  let mgPerDose =
    dailyMg / indication.dosesPerDay;

  let cappedBySingle = false;

  if (
    Number.isFinite(indication.maxSingleMg) &&
    mgPerDose > indication.maxSingleMg
  ) {
    mgPerDose = indication.maxSingleMg;
    cappedBySingle = true;
    dailyMg =
      mgPerDose * indication.dosesPerDay;
  }

  return {
    requestedDaily,
    dailyMg,
    mgPerDose,
    cappedByDaily,
    cappedBySingle,
    intervalHours:
      24 / indication.dosesPerDay
  };
}

function calculateAzithromycinFiveDay(
  indication,
  weight
) {
  const day1Requested =
    weight *
    (
      indication.special === "azithro5strep"
        ? 12
        : 10
    );

  const nextRequested =
    indication.special === "azithro5strep"
      ? weight * 6
      : weight * 5;

  const maxSingle =
    indication.maxSingleMg ?? Infinity;

  const day1 =
    Math.min(day1Requested, maxSingle);

  const next =
    Math.min(
      nextRequested,
      indication.special === "azithro5strep"
        ? maxSingle
        : 250
    );

  return {
    special: true,
    day1,
    next,
    day1Requested,
    nextRequested,
    cappedDay1:
      day1 < day1Requested,
    cappedNext:
      next < nextRequested,
    dailyFrequency: 1
  };
}

function volumeForDose(mg, mgPer5mL) {
  return mg * 5 / mgPer5mL;
}

function formatDoseNote(
  result,
  drug,
  indication,
  strength
) {
  const parts = [];

  if (result.cappedByDaily) {
    parts.push(
      `سقف روزانه ${faNum(indication.maxDailyMg, 0)} mg اعمال شد.`
    );
  }

  if (result.cappedBySingle) {
    parts.push(
      `سقف هر نوبت ${faNum(indication.maxSingleMg, 0)} mg اعمال شد.`
    );
  }

  if (drug.id === "amoxiclav") {
    parts.push(
      `دقت کنید محاسبه بر اساس جزء آموکسی‌سیلینِ فرآورده ${safeText(strength.label)} انجام شده است.`
    );
  }

  if (drug.id === "tmpsmx") {
    parts.push(
      "این مقدار بر اساس جزء TMP است، نه مجموع TMP+SMX."
    );
  }

  return parts.join(" ");
}

function renderResultRegular({
  drug,
  indication,
  strength,
  weight,
  ageMonths,
  result
}) {
  const ml =
    volumeForDose(
      result.mgPerDose,
      strength.mgPer5mL
    );

  const interval = result.intervalHours;
  const warnings = [];

  if (
    result.cappedByDaily ||
    result.cappedBySingle
  ) {
    warnings.push(
      formatDoseNote(
        result,
        drug,
        indication,
        strength
      )
    );
  }

  if (
    drug.id === "amoxiclav" &&
    strength.ratio !== "14:1" &&
    indication.preferredStrength === "amcl600"
  ) {
    warnings.push(
      "فرآوردهٔ انتخاب‌شده نسبت 14:1 ندارد؛ برای high-dose آموکسی‌کلاو این انتخاب می‌تواند کلاوولانات بیشتری بدهد."
    );
  }

  if (
    Number.isFinite(ageMonths) &&
    indication.minAgeMonths &&
    ageMonths < indication.minAgeMonths
  ) {
    warnings.push(
      "سن واردشده زیر حداقل سن این پروفایل است."
    );
  }

  const tone =
    warnings.length
      ? "warn"
      : "good";

  const note =
    formatDoseNote(
      result,
      drug,
      indication,
      strength
    );

  els.result.className =
    `result-panel ${tone}`;

  els.result.innerHTML = `
    <div class="result-title">
      نتیجه برای کودک ${faNum(weight, 1)} kg
      ${Number.isFinite(ageMonths)
        ? ` · سن ${ageLabel(ageMonths)}`
        : ""}
    </div>

    <div class="result-volume">
      <span class="number">${faNum(ml, 1)}</span>
      <span class="unit">mL</span>
      <span class="qualifier">در هر نوبت</span>
    </div>

    <div class="result-grid">
      <div class="result-stat">
        <div class="k">دوز هر نوبت</div>
        <div class="v">${faNum(result.mgPerDose, 1)} mg</div>
      </div>

      <div class="result-stat">
        <div class="k">دوز روزانه</div>
        <div class="v">${faNum(result.dailyMg, 1)} mg/day</div>
      </div>

      <div class="result-stat">
        <div class="k">تعداد دفعات</div>
        <div class="v">${faNum(indication.dosesPerDay, 0)} بار / روز</div>
      </div>

      <div class="result-stat">
        <div class="k">فاصلهٔ تقریبی</div>
        <div class="v">هر ${faNum(interval, 1)} ساعت</div>
      </div>
    </div>

    <div class="result-foot">
      ${safeText(indication.label)}
      · ${safeText(indication.mgPerKgPerDay)} mg/kg/day
      · ${safeText(
        indication.duration ||
        "مدت را مستقل از این ابزار تعیین کنید."
      )}
    </div>

    ${
      note
        ? `
          <div class="result-foot">
            <b>کنترل:</b>
            ${safeText(note)}
          </div>
        `
        : ""
    }

    ${
      warnings.length
        ? `
          <div class="result-warning">
            <b>⚠️ توجه:</b>
            ${warnings.map(safeText).join(" ")}
          </div>
        `
        : ""
    }

    <div class="result-source">
      مادهٔ فعال/غلظت:
      ${safeText(strength.label)}
      ${
        strength.ratio
          ? ` · نسبت ${safeText(strength.ratio)}`
          : ""
      }
    </div>
  `;
}

function renderResultAzithro({
  drug,
  indication,
  strength,
  weight,
  ageMonths,
  result
}) {
  const day1ml =
    volumeForDose(
      result.day1,
      strength.mgPer5mL
    );

  const nextml =
    volumeForDose(
      result.next,
      strength.mgPer5mL
    );

  const warnings = [];

  if (
    result.cappedDay1 ||
    result.cappedNext
  ) {
    warnings.push(
      "سقف دوز بر اساس برچسب/پروفایل این رژیم اعمال شده است."
    );
  }

  els.result.className =
    `result-panel ${
      warnings.length ? "warn" : "good"
    }`;

  els.result.innerHTML = `
    <div class="result-title">
      رژیم مرحله‌ای برای کودک
      ${faNum(weight, 1)} kg
      ${
        Number.isFinite(ageMonths)
          ? ` · سن ${ageLabel(ageMonths)}`
          : ""
      }
    </div>

    <div class="result-grid">
      <div class="result-stat">
        <div class="k">روز اول</div>
        <div class="v">${faNum(day1ml, 1)} mL یک‌بار</div>
      </div>

      <div class="result-stat">
        <div class="k">دوز روز اول</div>
        <div class="v">${faNum(result.day1, 1)} mg</div>
      </div>

      <div class="result-stat">
        <div class="k">روزهای بعد</div>
        <div class="v">${faNum(nextml, 1)} mL یک‌بار</div>
      </div>

      <div class="result-stat">
        <div class="k">دوز روزهای بعد</div>
        <div class="v">${faNum(result.next, 1)} mg</div>
      </div>
    </div>

    <div class="result-foot">
      ${safeText(indication.label)}
      · ${safeText(indication.duration)}
    </div>

    ${
      warnings.length
        ? `
          <div class="result-warning">
            <b>⚠️ توجه:</b>
            ${warnings.map(safeText).join(" ")}
          </div>
        `
        : ""
    }

    <div class="result-source">
      غلظت: ${safeText(strength.label)}
      · حداکثرهای پروفایل در محاسبه اعمال شده‌اند.
    </div>
  `;
}

function calculate() {
  const drug =
    findDrug(
      els.drugSelect.value
    );

  const indication =
    findIndication(
      drug,
      els.indicationSelect.value
    );

  const strength =
    findStrength(
      drug,
      els.strengthSelect.value
    );

  const validation =
    validateInputs(
      drug,
      indication,
      strength
    );

  if (!validation.ok) {
    setStatus(
      "نیاز به اصلاح",
      "danger"
    );

    els.result.className =
      "result-panel danger";

    els.result.innerHTML = `
      <div class="result-warning">
        ⚠️ ${safeText(validation.message)}
      </div>
    `;

    return;
  }

  const {
    weight,
    ageMonths
  } = validation;

  if (
    indication.special?.startsWith("azithro5")
  ) {
    const result =
      calculateAzithromycinFiveDay(
        indication,
        weight
      );

    renderResultAzithro({
      drug,
      indication,
      strength,
      weight,
      ageMonths,
      result
    });
  } else {
    const result =
      calculateRegular(
        indication,
        weight
      );

    renderResultRegular({
      drug,
      indication,
      strength,
      weight,
      ageMonths,
      result
    });
  }

  setStatus(
    "محاسبه شد",
    ""
  );

  els.result.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
}

function resetAll() {
  els.drugSelect.value = "";
  els.weight.value = "";
  els.ageMonths.value = "";

  els.strengthSelect.innerHTML = "";
  els.indicationSelect.innerHTML = "";

  els.strengthField.classList.add(
    "is-hidden"
  );

  els.indicationField.classList.add(
    "is-hidden"
  );

  els.drugDetails.classList.add(
    "is-hidden"
  );

  els.drugMeta.textContent =
    "ابتدا یک آنتی‌بیوتیک انتخاب کنید.";

  els.indicationHint.textContent = "";
  els.strengthHint.textContent = "";

  clearResult();

  setStatus(
    "آماده"
  );
}

function applyTheme(theme) {
  document.body.dataset.theme =
    theme;

  els.themeIcon.textContent =
    theme === "dark"
      ? "☀"
      : "☾";

  localStorage.setItem(
    "saphira-theme",
    theme
  );
}

function initTheme() {
  const saved =
    localStorage.getItem(
      "saphira-theme"
    );

  if (
    saved === "light" ||
    saved === "dark"
  ) {
    return applyTheme(saved);
  }

  const prefersDark =
    window.matchMedia?.(
      "(prefers-color-scheme: dark)"
    )?.matches;

  applyTheme(
    prefersDark
      ? "dark"
      : "light"
  );
}

function renderSources() {
  els.sourceLinks.innerHTML =
    SOURCES.map(source => `
      <a
        href="${source.url}"
        target="_blank"
        rel="noopener noreferrer"
      >
        ${safeText(source.title)}
        <small>
          ${safeText(source.note)}
        </small>
      </a>
    `).join("");
}

function setupDialogs() {
  document
    .querySelectorAll("[data-close]")
    .forEach(btn => {
      btn.addEventListener(
        "click",
        () =>
          document
            .getElementById(
              btn.dataset.close
            )
            ?.close()
      );
    });

  [
    els.sourcesDialog,
    els.aboutDialog
  ].forEach(dialog => {
    dialog.addEventListener(
      "click",
      event => {
        const rect =
          dialog.getBoundingClientRect();

        const inside =
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom;

        if (!inside) {
          dialog.close();
        }
      }
    );
  });
}

/* Background animation: سبک‌تر از نسخهٔ قبلی و سازگار با موبایل */
function initBackground() {
  const canvas =
    document.getElementById(
      "sceneBg"
    );

  const ctx =
    canvas?.getContext(
      "2d"
    );

  if (!canvas || !ctx) return;

  const reduceMotion =
    window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;

  const mobile =
    window.matchMedia?.(
      "(max-width: 680px)"
    )?.matches;

  if (reduceMotion) return;

  const DPR =
    Math.min(
      window.devicePixelRatio || 1,
      1.7
    );

  let width = 0;
  let height = 0;
  let particles = [];

  const countBase =
    mobile
      ? 90
      : 150;

  function resize() {
    width =
      window.innerWidth;

    height =
      window.innerHeight;

    canvas.width =
      Math.floor(
        width * DPR
      );

    canvas.height =
      Math.floor(
        height * DPR
      );

    canvas.style.width =
      `${width}px`;

    canvas.style.height =
      `${height}px`;

    ctx.setTransform(
      DPR,
      0,
      0,
      DPR,
      0,
      0
    );

    particles =
      Array.from(
        {
          length: countBase
        },
        () => ({
          x:
            Math.random() *
            width,

          y:
            Math.random() *
            height,

          vx:
            (Math.random() - 0.5) *
            0.28,

          vy:
            (Math.random() - 0.5) *
            0.28,

          r:
            0.6 +
            Math.random() *
            1.7,

          p:
            Math.random() *
            Math.PI *
            2
        })
      );
  }

  function frame(t) {
    ctx.clearRect(
      0,
      0,
      width,
      height
    );

    const dark =
      document.body.dataset.theme ===
      "dark";

    const color =
      dark
        ? "rgba(96,165,250,.46)"
        : "rgba(37,99,235,.20)";

    const glow =
      dark
        ? "rgba(129,140,248,.20)"
        : "rgba(96,165,250,.10)";

    for (const p of particles) {
      p.x +=
        p.vx +
        Math.sin(
          t * 0.0004 +
          p.p
        ) *
          0.03;

      p.y +=
        p.vy +
        Math.cos(
          t * 0.00035 +
          p.p
        ) *
          0.03;

      if (p.x < -10)
        p.x =
          width + 10;

      if (p.x > width + 10)
        p.x = -10;

      if (p.y < -10)
        p.y =
          height + 10;

      if (p.y > height + 10)
        p.y = -10;

      ctx.beginPath();

      ctx.fillStyle =
        color;

      ctx.arc(
        p.x,
        p.y,
        p.r,
        0,
        Math.PI * 2
      );

      ctx.fill();
    }

    const x =
      width * 0.5;

    const y =
      Math.min(
        height * 0.33,
        360
      );

    const radius =
      Math.min(
        width,
        540
      ) *
      0.34;

    const gradient =
      ctx.createRadialGradient(
        x,
        y,
        0,
        x,
        y,
        radius
      );

    gradient.addColorStop(
      0,
      glow
    );

    gradient.addColorStop(
      1,
      "rgba(0,0,0,0)"
    );

    ctx.fillStyle =
      gradient;

    ctx.fillRect(
      0,
      0,
      width,
      height
    );

    requestAnimationFrame(
      frame
    );
  }

  resize();

  window.addEventListener(
    "resize",
    resize,
    { passive: true }
  );

  requestAnimationFrame(
    frame
  );
}

function bindEvents() {
  els.drugSelect.addEventListener(
    "change",
    onDrugChange
  );

  els.strengthSelect.addEventListener(
    "change",
    onStrengthChange
  );

  els.indicationSelect.addEventListener(
    "change",
    onIndicationChange
  );

  els.calcBtn.addEventListener(
    "click",
    calculate
  );

  els.resetBtn.addEventListener(
    "click",
    resetAll
  );

  els.themeBtn.addEventListener(
    "click",
    () =>
      applyTheme(
        document.body.dataset.theme ===
        "dark"
          ? "light"
          : "dark"
      )
  );

  els.sourcesBtn.addEventListener(
    "click",
    () =>
      els.sourcesDialog.showModal()
  );

  els.aboutBtn.addEventListener(
    "click",
    () =>
      els.aboutDialog.showModal()
  );

  [
    els.weight,
    els.ageMonths
  ].forEach(input => {
    input.addEventListener(
      "keydown",
      e => {
        if (e.key === "Enter") {
          calculate();
        }
      }
    );
  });

  window.addEventListener(
    "keydown",
    event => {
      if (event.key === "Escape") {
        if (
          els.sourcesDialog.open
        ) {
          els.sourcesDialog.close();
        }

        if (
          els.aboutDialog.open
        ) {
          els.aboutDialog.close();
        }
      }
    }
  );
}

function runSelfChecks() {
  const checkWeight = 20;

  const drug =
    findDrug(
      "amoxicillin"
    );

  const ind =
    findIndication(
      drug,
      "aom-high"
    );

  const strength =
    findStrength(
      drug,
      "amox400"
    );

  const r =
    calculateRegular(
      ind,
      checkWeight
    );

  const ml =
    volumeForDose(
      r.mgPerDose,
      strength.mgPer5mL
    );

  console.assert(
    Math.abs(
      r.dailyMg - 1800
    ) < 0.001,
    "Amoxicillin daily dose self-check failed"
  );

  console.assert(
    Math.abs(
      r.mgPerDose - 900
    ) < 0.001,
    "Amoxicillin per-dose self-check failed"
  );

  console.assert(
    Math.abs(
      ml - 11.25
    ) < 0.001,
    "Amoxicillin volume self-check failed"
  );

  const cef =
    findDrug(
      "cefdinir"
    );

  const cefInd =
    findIndication(
      cef,
      "aom-cefdinir"
    );

  const cefRes =
    calculateRegular(
      cefInd,
      50
    );

  console.assert(
    cefRes.dailyMg === 600,
    "Cefdinir max-dose self-check failed"
  );
}

(function init() {
  initTheme();
  populateDrugs();
  renderSources();
  setupDialogs();
  bindEvents();
  runSelfChecks();
  initBackground();
})();
