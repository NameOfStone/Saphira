
"use strict";

/*
  Saphira
  Pediatric Antibiotic Dose Calculator

  اصول:
  1. ابتدا اندیکاسیون انتخاب می‌شود.
  2. دوز بر اساس mg/kg محاسبه می‌شود.
  3. سقف روزانه و سقف هر دوز اعمال می‌شود.
  4. مقدار mg به mL تبدیل می‌شود.
  5. آموکسی‌کلاو بر اساس جزء amoxicillin محاسبه می‌شود.
  6. TMP-SMX بر اساس جزء trimethoprim محاسبه می‌شود.
*/

const SOURCES = [
  {
    title: "AAP Red Book 2024–2027",
    note: "Systems-Based Treatment Table",
    url: "https://publications.aap.org/redbook/book/755/chapter/14074070/Systems-Based-Treatment-Table"
  },
  {
    title: "AAP — Acute Otitis Media",
    note: "دوزهای منتخب AOM و آموکسی‌سیلین / آموکسی‌کلاو",
    url: "https://publications.aap.org/pediatrics/article/131/3/e964/30912/The-Diagnosis-and-Management-of-Acute-Otitis-Media"
  },
  {
    title: "AAP — Acute Bacterial Sinusitis",
    note: "رژیم‌های آموکسی‌سیلین و آموکسی‌کلاو",
    url: "https://publications.aap.org/pediatrics/article-abstract/132/1/e262/31288/Clinical-Practice-Guideline-for-the-Diagnosis-and-Management-of-Acute-Bacterial-Sinusitis-in-Children-Aged-1-to-18-Years"
  },
  {
    title: "WHO AWaRe Antibiotic Book",
    note: "راهنمای انتخاب، دوز و مدت درمان عفونت‌های شایع",
    url: "https://www.who.int/publications/i/item/9789240062382"
  },
  {
    title: "CDC — Group A Streptococcal Pharyngitis",
    note: "دوزهای درمان GAS",
    url: "https://www.cdc.gov/group-a-strep/hcp/clinical-guidance/strep-throat.html"
  },
  {
    title: "DailyMed",
    note: "اطلاعات رسمی فرآورده‌های دارویی",
    url: "https://dailymed.nlm.nih.gov/"
  }
];


/* =========================================================
   DATABASE
========================================================= */

const DRUGS = [

  {
    id: "amoxicillin",

    name: "Amoxicillin — آموکسی‌سیلین",

    type: "Aminopenicillin",

    minAgeMonths: 0,

    strengths: [
      {
        id: "amox125",
        label: "125 mg / 5 mL",
        mgPer5mL: 125
      },
      {
        id: "amox250",
        label: "250 mg / 5 mL",
        mgPer5mL: 250
      },
      {
        id: "amox400",
        label: "400 mg / 5 mL",
        mgPer5mL: 400
      }
    ],

    notes:
`• در بسیاری از عفونت‌های شایع کودکان، در صورت وجود اندیکاسیون باکتریال، انتخاب خط اول است.
• در AOM دوز high-dose معمولاً 80–90 mg/kg/day است.
• در GAS: 50 mg/kg/day یک‌بار در روز یا 25 mg/kg/dose هر 12 ساعت، با سقف‌های مربوطه.
• با غذا یا بدون غذا قابل مصرف است.
• در سابقه حساسیت شدید به پنی‌سیلین نباید بدون ارزیابی بالینی استفاده شود.
• سوسپانسیون قبل از هر نوبت به‌خوبی تکان داده شود.`,

    indications: [

      {
        id: "amox-aom",
        label: "AOM — high-dose",
        mgPerKgPerDay: 90,
        dosesPerDay: 2,
        maxDailyMg: 4000,
        maxSingleMg: 2000,
        duration: "معمولاً 5–10 روز بر اساس سن و شدت",
        note:
          "دوز بر اساس AAP برای AOM: 80–90 mg/kg/day."
      },

      {
        id: "amox-gas-qd",
        label: "GAS pharyngitis — روزی یک‌بار",
        mgPerKgPerDay: 50,
        dosesPerDay: 1,
        maxDailyMg: 1000,
        duration: "10 روز",
        note:
          "دوز CDC: 50 mg/kg یک‌بار در روز، حداکثر 1000 mg/day."
      },

      {
        id: "amox-gas-bid",
        label: "GAS pharyngitis — هر 12 ساعت",
        mgPerKgPerDay: 50,
        dosesPerDay: 2,
        maxSingleMg: 500,
        duration: "10 روز",
        note:
          "دوز CDC: 25 mg/kg/dose هر 12 ساعت، حداکثر 500 mg/dose."
      },

      {
        id: "amox-sinus",
        label: "سینوزیت باکتریال — standard",
        mgPerKgPerDay: 45,
        dosesPerDay: 2,
        maxDailyMg: 4000,
        duration: "بر اساس راهنمای اندیکاسیون و پاسخ بیمار",
        note:
          "انتخاب رژیم باید با شدت بیماری و عوامل خطر مقاومت تطبیق داده شود."
      },

      {
        id: "amox-cap",
        label: "CAP خفیف — رژیم high-dose",
        mgPerKgPerDay: 90,
        dosesPerDay: 2,
        maxDailyMg: 4000,
        maxSingleMg: 2000,
        duration: "در CAP بدون عارضه معمولاً کوتاه؛ مطابق راهنمای محلی",
        note:
          "WHO برای پنومونی کودکان از آموکسی‌سیلین با دوز بالا استفاده می‌کند."
      }

    ]
  },


  {
    id: "amoxiclav",

    name: "Amoxicillin/Clavulanate — آموکسی‌کلاو",

    type: "β-lactam / β-lactamase inhibitor",

    minAgeMonths: 3,

    strengths: [
      {
        id: "amcl125",
        label: "125 / 31.25 mg / 5 mL",
        mgPer5mL: 125,
        ratio: "4:1"
      },
      {
        id: "amcl200",
        label: "200 / 28.5 mg / 5 mL",
        mgPer5mL: 200,
        ratio: "7:1"
      },
      {
        id: "amcl400",
        label: "400 / 57 mg / 5 mL",
        mgPer5mL: 400,
        ratio: "7:1"
      },
      {
        id: "amcl600",
        label: "600 / 42.9 mg / 5 mL",
        mgPer5mL: 600,
        ratio: "14:1"
      }
    ],

    notes:
`• تمام محاسبات این دارو بر اساس جزء amoxicillin انجام می‌شود.
• برای high-dose معمولاً فرآورده 14:1 یعنی 600/42.9 mg در 5 mL ترجیح داده می‌شود تا مقدار clavulanate اضافی کمتر باشد.
• بهتر است در ابتدای غذا مصرف شود.
• اسهال و تهوع نسبتاً شایع هستند.
• سابقه آسیب کبدی/کلستاتیک ناشی از amoxicillin-clavulanate مهم است.
• برای عفونت‌هایی که آموکسی‌سیلین ساده کافی است، استفاده روتین از آموکسی‌کلاو ضرورتی ندارد.`,

    indications: [

      {
        id: "amcl-aom",
        label: "AOM — high-dose",
        mgPerKgPerDay: 90,
        dosesPerDay: 2,
        maxDailyMg: 4000,
        maxSingleMg: 2000,
        preferredStrength: "amcl600",
        duration: "معمولاً 5–10 روز بر اساس سن و شدت",
        note:
          "دوز بر اساس جزء amoxicillin است؛ برای high-dose نسبت 14:1 مناسب‌تر است."
      },

      {
        id: "amcl-sinus",
        label: "سینوزیت باکتریال — high-dose",
        mgPerKgPerDay: 90,
        dosesPerDay: 2,
        maxDailyMg: 4000,
        maxSingleMg: 2000,
        preferredStrength: "amcl600",
        duration: "مطابق راهنمای اندیکاسیون و شرایط بیمار",
        note:
          "عوامل خطر مقاومت و شدت بیماری در انتخاب high-dose اهمیت دارند."
      },

      {
        id: "amcl-standard",
        label: "عفونت منتخب — standard dose",
        mgPerKgPerDay: 45,
        dosesPerDay: 2,
        maxDailyMg: 4000,
        duration: "بر اساس تشخیص و راهنمای مربوطه",
        note:
          "اندیکاسیون باید واقعاً به پوشش β-lactamase نیاز داشته باشد."
      }

    ]
  },


  {
    id: "cephalexin",

    name: "Cephalexin — سفالکسین",

    type: "First-generation cephalosporin",

    minAgeMonths: 0,

    strengths: [
      {
        id: "ceph125",
        label: "125 mg / 5 mL",
        mgPer5mL: 125
      },
      {
        id: "ceph250",
        label: "250 mg / 5 mL",
        mgPer5mL: 250
      }
    ],

    notes:
`• برای بسیاری از عفونت‌های پوست و بافت نرم ناشی از Streptococcus و MSSA مناسب است.
• برای MRSA قابل اتکا نیست.
• در GAS، در حساسیت غیر فوری به پنی‌سیلین یکی از گزینه‌هاست.
• در واکنش فوری/آنافیلاکسی به پنی‌سیلین، انتخاب سفالوسپورین باید با توجه به نوع واکنش بررسی شود.
• با غذا یا بدون غذا قابل مصرف است.`,

    indications: [

      {
        id: "ceph-gas",
        label: "GAS pharyngitis — حساسیت غیر فوری به پنی‌سیلین",
        mgPerKgPerDay: 40,
        dosesPerDay: 2,
        maxDailyMg: 1000,
        maxSingleMg: 500,
        duration: "10 روز",
        note:
          "دوز CDC: 20 mg/kg/dose هر 12 ساعت، حداکثر 500 mg/dose."
      },

      {
        id: "ceph-ssti",
        label: "SSTI / Impetigo — دوز معمول",
        mgPerKgPerDay: 50,
        dosesPerDay: 3,
        maxDailyMg: 4000,
        duration: "معمولاً 5–10 روز بر اساس پاسخ",
        note:
          "در آبسه، drainage و احتمال MRSA باید جداگانه ارزیابی شود."
      }

    ]
  },


  {
    id: "cefuroxime",

    name: "Cefuroxime — سفوروکسیم",

    type: "Second-generation cephalosporin",

    minAgeMonths: 3,

    strengths: [
      {
        id: "cefu125",
        label: "125 mg / 5 mL",
        mgPer5mL: 125
      },
      {
        id: "cefu250",
        label: "250 mg / 5 mL",
        mgPer5mL: 250
      }
    ],

    notes:
`• سوسپانسیون خوراکی cefuroxime جذب بهتری همراه غذا دارد.
• قرص و سوسپانسیون را نباید صرفاً بر اساس حجم و بدون توجه به فرمولاسیون جایگزین کرد.
• در نارسایی کلیه ممکن است نیاز به تعدیل رژیم وجود داشته باشد.
• طیف آن از بسیاری از سفالوسپورین‌های نسل اول گسترده‌تر است؛ مصرف باید اندیکاسیون‌محور باشد.`,

    indications: [

      {
        id: "cefu-aom",
        label: "AOM",
        mgPerKgPerDay: 30,
        dosesPerDay: 2,
        maxDailyMg: 1000,
        duration: "تا 10 روز بر اساس سن و شدت",
        note:
          "دوز سوسپانسیون خوراکی طبق برچسب دارویی."
      },

      {
        id: "cefu-gas",
        label: "Pharyngitis / Tonsillitis",
        mgPerKgPerDay: 20,
        dosesPerDay: 2,
        maxDailyMg: 500,
        duration: "10 روز",
        note:
          "برای GAS، حساسیت دارویی و راهنمای محلی بررسی شود."
      }

    ]
  },


  {
    id: "cefdinir",

    name: "Cefdinir — سفدینیر",

    type: "Third-generation cephalosporin",

    minAgeMonths: 6,

    strengths: [
      {
        id: "cefd125",
        label: "125 mg / 5 mL",
        mgPer5mL: 125
      },
      {
        id: "cefd250",
        label: "250 mg / 5 mL",
        mgPer5mL: 250
      }
    ],

    notes:
`• دوز معمول: 14 mg/kg/day.
• حداکثر روزانه معمول: 600 mg.
• می‌تواند به صورت 7 mg/kg هر 12 ساعت یا 14 mg/kg روزی یک‌بار استفاده شود، بسته به اندیکاسیون.
• فرآورده‌های آهن می‌توانند باعث تغییر رنگ مدفوع شوند.
• برای MRSA مناسب نیست.`,

    indications: [

      {
        id: "cefd-aom",
        label: "AOM",
        mgPerKgPerDay: 14,
        dosesPerDay: 1,
        maxDailyMg: 600,
        minAgeMonths: 6,
        duration: "بر اساس سن و رژیم انتخاب‌شده",
        note:
          "سقف روزانه 600 mg."
      },

      {
        id: "cefd-pharyngitis",
        label: "Pharyngitis / Tonsillitis",
        mgPerKgPerDay: 14,
        dosesPerDay: 1,
        maxDailyMg: 600,
        minAgeMonths: 6,
        duration: "طبق رژیم انتخاب‌شده",
        note:
          "در حساسیت immediate-type به پنی‌سیلین، انتخاب سفالوسپورین باید بالینی ارزیابی شود."
      }

    ]
  },


  {
    id: "cefpodoxime",

    name: "Cefpodoxime — سفپودوکسیم",

    type: "Third-generation cephalosporin",

    minAgeMonths: 2,

    strengths: [
      {
        id: "cefp50",
        label: "50 mg / 5 mL",
        mgPer5mL: 50
      },
      {
        id: "cefp100",
        label: "100 mg / 5 mL",
        mgPer5mL: 100
      }
    ],

    notes:
`• دوز معمول برای برخی عفونت‌های کودکان 10 mg/kg/day است.
• در برخی اندیکاسیون‌ها در دو نوبت تقسیم می‌شود.
• سقف دوز بسته به اندیکاسیون متفاوت است.
• در نارسایی شدید کلیه فاصله مصرف ممکن است نیاز به تغییر داشته باشد.`,

    indications: [

      {
        id: "cefp-aom",
        label: "AOM",
        mgPerKgPerDay: 10,
        dosesPerDay: 2,
        maxDailyMg: 400,
        maxSingleMg: 200,
        minAgeMonths: 2,
        duration: "بر اساس سن و شدت",
        note:
          "در این محاسبه 5 mg/kg/dose هر 12 ساعت استفاده شده است."
      },

      {
        id: "cefp-sinus",
        label: "سینوزیت باکتریال",
        mgPerKgPerDay: 10,
        dosesPerDay: 2,
        maxDailyMg: 400,
        maxSingleMg: 200,
        minAgeMonths: 2,
        duration: "طبق راهنمای اندیکاسیون",
        note:
          "سقف دوز باید رعایت شود."
      }

    ]
  },


  {
    id: "cefixime",

    name: "Cefixime — سفیکسیم",

    type: "Third-generation cephalosporin",

    minAgeMonths: 6,

    strengths: [
      {
        id: "cefi100",
        label: "100 mg / 5 mL",
        mgPer5mL: 100
      }
    ],

    notes:
`• دوز معمول کودکان: 8 mg/kg/day.
• می‌توان روزی یک‌بار یا در دو نوبت تقسیم کرد.
• برای برخی UTIها استفاده می‌شود، اما مقاومت محلی اهمیت دارد.
• برای عفونت‌های پوستی ناشی از MSSA انتخاب مناسبی نیست.
• در نارسایی کلیه ممکن است نیاز به تنظیم داشته باشد.`,

    indications: [

      {
        id: "cefi-uti",
        label: "UTI — روزی یک‌بار",
        mgPerKgPerDay: 8,
        dosesPerDay: 1,
        maxDailyMg: 400,
        duration: "بر اساس محل عفونت و پاسخ بیمار",
        note:
          "مقاومت محلی و کشت در صورت اندیکاسیون باید در نظر گرفته شود."
      },

      {
        id: "cefi-uti-bid",
        label: "UTI — هر 12 ساعت",
        mgPerKgPerDay: 8,
        dosesPerDay: 2,
        maxDailyMg: 400,
        duration: "بر اساس محل عفونت و پاسخ بیمار",
        note:
          "4 mg/kg/dose هر 12 ساعت."
      }

    ]
  },


  {
    id: "azithromycin",

    name: "Azithromycin — آزیترومایسین",

    type: "Macrolide",

    minAgeMonths: 6,

    strengths: [
      {
        id: "azi100",
        label: "100 mg / 5 mL",
        mgPer5mL: 100
      },
      {
        id: "azi200",
        label: "200 mg / 5 mL",
        mgPer5mL: 200
      }
    ],

    notes:
`• مصرف باید اندیکاسیون‌محور باشد و برای بسیاری از عفونت‌های معمول تنفسی انتخاب اول نیست.
• رژیم رایج 5 روزه: روز اول 10 mg/kg و روزهای 2 تا 5، روزانه 5 mg/kg.
• رژیم 3 روزه در برخی اندیکاسیون‌ها استفاده می‌شود.
• می‌تواند باعث تهوع، درد شکم و اسهال شود.
• در افراد با عوامل خطر طولانی‌شدن QT باید احتیاط شود.
• در GAS، آزیترومایسین معمولاً جایگزین انتخاب اول بتالاکتام‌هاست، نه درمان روتین.`,

    indications: [

      {
        id: "azi-5day",
        label: "رژیم 5 روزه",
        special: "azithromycin5",
        duration: "5 روز",
        minAgeMonths: 6,
        note:
          "روز اول 10 mg/kg؛ روزهای 2 تا 5، 5 mg/kg/day."
      },

      {
        id: "azi-3day",
        label: "رژیم 3 روزه",
        mgPerKgPerDay: 10,
        dosesPerDay: 1,
        duration: "3 روز",
        minAgeMonths: 6,
        note:
          "10 mg/kg/day روزی یک‌بار برای 3 روز."
      }

    ]
  },


  {
    id: "tmpsmx",

    name: "TMP-SMX — کوتریموکسازول",

    type: "Antifolate combination",

    minAgeMonths: 2,

    strengths: [
      {
        id: "tmpsmx40-200",
        label: "40 mg TMP + 200 mg SMX / 5 mL",
        mgPer5mL: 40,
        activeComponent: "TMP"
      }
    ],

    notes:
`• محاسبات این بخش بر اساس جزء Trimethoprim (TMP) انجام می‌شود.
• فرآورده استاندارد رایج: 40 mg TMP + 200 mg SMX در 5 mL.
• در برخی UTIها و SSTIهای منتخب کاربرد دارد.
• برای GAS pharyngitis نباید به عنوان درمان انتخابی استفاده شود.
• در شیرخواران زیر 2 ماه منع مصرف دارد مگر در شرایط تخصصی خاص.
• در نارسایی کلیه، هایپرکالمی، مصرف داروهای مؤثر بر پتاسیم و برخی تداخلات باید احتیاط شود.`,

    indications: [

      {
        id: "tmpsmx-uti",
        label: "UTI — بر اساس TMP",
        mgPerKgPerDay: 8,
        dosesPerDay: 2,
        maxDailyMg: 320,
        minAgeMonths: 2,
        duration: "بر اساس محل عفونت و کشت",
        note:
          "در این محاسبه 4 mg/kg TMP هر 12 ساعت در نظر گرفته شده است."
      },

      {
        id: "tmpsmx-ssti",
        label: "SSTI منتخب / MRSA — بر اساس TMP",
        mgPerKgPerDay: 8,
        dosesPerDay: 2,
        maxDailyMg: 320,
        minAgeMonths: 2,
        duration: "معمولاً 5–10 روز بر اساس پاسخ",
        note:
          "برای آبسه، drainage و تصمیم درباره پوشش استرپتوکوک باید جداگانه ارزیابی شود."
      }

    ]
  }

];


/* =========================================================
   DOM
========================================================= */

const els = {
  form: document.getElementById("doseForm"),

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

  calculateButton: document.getElementById("calculateButton"),

  resetButton: document.getElementById("resetButton"),

  result: document.getElementById("result"),

  statusBadge: document.getElementById("statusBadge"),

  themeButton: document.getElementById("themeButton"),

  sourcesButton: document.getElementById("sourcesButton"),

  aboutButton: document.getElementById("aboutButton"),

  sourcesDialog: document.getElementById("sourcesDialog"),

  aboutDialog: document.getElementById("aboutDialog"),

  sourceLinks: document.getElementById("sourceLinks")
};


/* =========================================================
   UTILITIES
========================================================= */

function normalizeNumber(value) {

  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .replace(/[۰-۹]/g, char =>
      String("۰۱۲۳۴۵۶۷۸۹".indexOf(char))
    )
    .replace(/[٠-٩]/g, char =>
      String("٠١٢٣٤٥٦٧٨٩".indexOf(char))
    )
    .replace(/٫/g, ".")
    .replace(/٬/g, "")
    .trim();
}


function parseNumber(value) {

  const normalized = normalizeNumber(value);

  if (!normalized) {
    return NaN;
  }

  const number = Number.parseFloat(normalized);

  return Number.isFinite(number)
    ? number
    : NaN;
}


function formatNumber(number, decimals = 1) {

  if (!Number.isFinite(number)) {
    return "—";
  }

  let text;

  if (Number.isInteger(number)) {

    text = String(number);

  } else {

    text = number
      .toFixed(decimals)
      .replace(/\.0+$/, "")
      .replace(/(\.\d*?[1-9])0+$/, "$1");

  }

  return text.replace(
    /[0-9]/g,
    digit => "۰۱۲۳۴۵۶۷۸۹"[digit]
  );
}


function formatEnglishNumber(number, decimals = 1) {

  if (!Number.isFinite(number)) {
    return "—";
  }

  if (Number.isInteger(number)) {
    return String(number);
  }

  return number
    .toFixed(decimals)
    .replace(/\.0+$/, "")
    .replace(/(\.\d*?[1-9])0+$/, "$1");
}


function findDrug(id) {

  return DRUGS.find(
    drug => drug.id === id
  ) || null;
}


function findStrength(drug, id) {

  return drug?.strengths?.find(
    strength => strength.id === id
  ) || null;
}


function findIndication(drug, id) {

  return drug?.indications?.find(
    indication => indication.id === id
  ) || null;
}


function ageText(months) {

  if (!Number.isFinite(months)) {
    return "نامشخص";
  }

  if (months < 24) {
    return `${formatNumber(months, 0)} ماه`;
  }

  const years = months / 12;

  if (Number.isInteger(years)) {
    return `${formatNumber(years, 0)} سال`;
  }

  return `${formatNumber(years, 1)} سال`;
}


/* =========================================================
   STATUS
========================================================= */

function setStatus(text, type = "") {

  els.statusBadge.textContent = text;

  els.statusBadge.className = "status-badge";

  if (type) {
    els.statusBadge.classList.add(type);
  }
}


/* =========================================================
   DRUG LIST
========================================================= */

function populateDrugs() {

  els.drugSelect.innerHTML = `
    <option value="">انتخاب آنتی‌بیوتیک...</option>
  `;

  DRUGS.forEach(drug => {

    const option = document.createElement("option");

    option.value = drug.id;

    option.textContent = drug.name;

    els.drugSelect.appendChild(option);

  });
}


/* =========================================================
   DRUG CHANGE
========================================================= */

function handleDrugChange() {

  clearResult();

  const drug = findDrug(
    els.drugSelect.value
  );

  els.strengthSelect.innerHTML = "";

  els.indicationSelect.innerHTML = "";

  els.strengthField.classList.add("hidden");

  els.indicationField.classList.add("hidden");

  els.drugDetails.classList.add("hidden");

  els.drugMeta.textContent =
    "ابتدا دارو را انتخاب کنید.";

  els.strengthHint.textContent = "";

  els.indicationHint.textContent = "";

  if (!drug) {

    setStatus("آماده");

    return;
  }

  els.drugMeta.textContent =
    `${drug.type} · حداقل سن این پروفایل: ${ageText(drug.minAgeMonths)}`;

  els.drugNotes.textContent =
    drug.notes;

  els.drugDetails.classList.remove("hidden");


  /* Strengths */

  drug.strengths.forEach(strength => {

    const option =
      document.createElement("option");

    option.value = strength.id;

    option.textContent = strength.label;

    els.strengthSelect.appendChild(option);

  });

  els.strengthField.classList.remove("hidden");


  /* Indications */

  drug.indications.forEach(indication => {

    const option =
      document.createElement("option");

    option.value = indication.id;

    option.textContent = indication.label;

    els.indicationSelect.appendChild(option);

  });

  els.indicationField.classList.remove("hidden");


  const firstIndication =
    drug.indications[0];

  if (firstIndication?.preferredStrength) {

    els.strengthSelect.value =
      firstIndication.preferredStrength;

  }

  updateHints();

  setStatus("آماده");

}


/* =========================================================
   HINTS
========================================================= */

function updateHints() {

  const drug =
    findDrug(els.drugSelect.value);

  const strength =
    findStrength(
      drug,
      els.strengthSelect.value
    );

  const indication =
    findIndication(
      drug,
      els.indicationSelect.value
    );

  if (!drug || !strength || !indication) {

    els.strengthHint.textContent = "";

    els.indicationHint.textContent = "";

    return;
  }


  let strengthText =
    `محاسبه بر اساس ${formatNumber(strength.mgPer5mL, 1)} mg در 5 mL`;

  if (strength.ratio) {

    strengthText +=
      ` · نسبت ${strength.ratio}`;

  }

  if (
    drug.id === "amoxiclav" &&
    indication.preferredStrength === "amcl600" &&
    strength.id !== "amcl600"
  ) {

    strengthText +=
      " · برای high-dose معمولاً فرآورده 14:1 ترجیح داده می‌شود.";

  }

  if (drug.id === "tmpsmx") {

    strengthText +=
      " · محاسبه بر اساس TMP";

  }

  els.strengthHint.textContent =
    strengthText;


  if (indication.special === "azithromycin5") {

    els.indicationHint.textContent =
      "روز اول: 10 mg/kg؛ روزهای 2 تا 5: 5 mg/kg/day.";

    return;
  }


  let hint =
    `دوز: ${formatNumber(indication.mgPerKgPerDay)} mg/kg/day`;

  if (indication.dosesPerDay) {

    hint +=
      ` · ${formatNumber(indication.dosesPerDay, 0)} نوبت در روز`;

  }

  if (indication.duration) {

    hint +=
      ` · ${indication.duration}`;

  }

  els.indicationHint.textContent =
    hint;

}


/* =========================================================
   VALIDATION
========================================================= */

function validate() {

  const drug =
    findDrug(els.drugSelect.value);

  const strength =
    findStrength(
      drug,
      els.strengthSelect.value
    );

  const indication =
    findIndication(
      drug,
      els.indicationSelect.value
    );

  const weight =
    parseNumber(els.weight.value);

  const ageMonths =
    parseNumber(els.ageMonths.value);


  if (!drug) {

    return {
      ok: false,
      message: "لطفاً ابتدا آنتی‌بیوتیک را انتخاب کنید."
    };

  }


  if (!Number.isFinite(weight) || weight <= 0) {

    return {
      ok: false,
      message: "لطفاً وزن معتبر کودک را وارد کنید."
    };

  }


  if (weight < 0.5 || weight > 200) {

    return {
      ok: false,
      message: "وزن واردشده خارج از محدوده قابل قبول این ابزار است."
    };

  }


  if (
    Number.isFinite(ageMonths) &&
    (ageMonths < 0 || ageMonths > 240)
  ) {

    return {
      ok: false,
      message: "سن واردشده معتبر نیست."
    };

  }


  if (!strength) {

    return {
      ok: false,
      message: "لطفاً غلظت فرآورده را انتخاب کنید."
    };

  }


  if (!indication) {

    return {
      ok: false,
      message: "لطفاً اندیکاسیون را انتخاب کنید."
    };

  }


  const minimumAge =
    Math.max(
      drug.minAgeMonths ?? 0,
      indication.minAgeMonths ?? 0
    );


  if (
    Number.isFinite(ageMonths) &&
    ageMonths < minimumAge
  ) {

    return {
      ok: false,
      message:
        `سن کودک (${ageText(ageMonths)}) از حداقل سن این رژیم (${ageText(minimumAge)}) کمتر است.`
    };

  }


  return {
    ok: true,
    drug,
    strength,
    indication,
    weight,
    ageMonths
  };

}


/* =========================================================
   CALCULATIONS
========================================================= */

function calculateRegular(
  indication,
  weight
) {

  const rawDaily =
    weight *
    indication.mgPerKgPerDay;


  const dailyMg =
    indication.maxDailyMg
      ? Math.min(
          rawDaily,
          indication.maxDailyMg
        )
      : rawDaily;


  const rawDose =
    dailyMg /
    indication.dosesPerDay;


  const mgPerDose =
    indication.maxSingleMg
      ? Math.min(
          rawDose,
          indication.maxSingleMg
        )
      : rawDose;


  return {
    rawDaily,
    dailyMg,
    mgPerDose,
    dosesPerDay:
      indication.dosesPerDay,

    intervalHours:
      24 / indication.dosesPerDay,

    cappedDaily:
      dailyMg < rawDaily,

    cappedSingle:
      mgPerDose < rawDose
  };

}


function calculateAzithromycinFiveDay(
  indication,
  weight
) {

  const day1Mg =
    weight * 10;

  const days2to5Mg =
    weight * 5;


  return {
    day1Mg,
    days2to5Mg
  };

}


function volumeForDose(
  mg,
  mgPer5mL
) {

  return (
    mg * 5
  ) / mgPer5mL;

}


/* =========================================================
   RESULT
========================================================= */

function renderResult(
  validation
) {

  const {
    drug,
    strength,
    indication,
    weight
  } = validation;


  if (
    indication.special ===
    "azithromycin5"
  ) {

    renderAzithromycinFiveDay(
      drug,
      strength,
      indication,
      weight
    );

    return;
  }


  const calculation =
    calculateRegular(
      indication,
      weight
    );


  const volume =
    volumeForDose(
      calculation.mgPerDose,
      strength.mgPer5mL
    );


  const warnings = [];


  if (calculation.cappedDaily) {

    warnings.push(
      `دوز روزانه بر اساس سقف ${formatNumber(indication.maxDailyMg)} mg/day محدود شده است.`
    );

  }


  if (calculation.cappedSingle) {

    warnings.push(
      `دوز هر نوبت بر اساس سقف ${formatNumber(indication.maxSingleMg)} mg/dose محدود شده است.`
    );

  }


  if (
    drug.id === "amoxiclav" &&
    indication.mgPerKgPerDay >= 80 &&
    strength.id !== "amcl600"
  ) {

    warnings.push(
      "برای رژیم high-dose آموکسی‌کلاو، فرآورده 14:1 (600/42.9 mg در 5 mL) معمولاً برای کاهش بار clavulanate ترجیح داده می‌شود."
    );

  }


  const interval =
    calculation.intervalHours;


  els.result.innerHTML = `

    <div class="result-title">
      <span class="result-check">✓</span>
      نتیجه محاسبه
    </div>


    <div class="result-main">

      <div class="result-number">
        <small>دوز روزانه</small>

        <strong>
          ${formatEnglishNumber(calculation.dailyMg)}
        </strong>

        <span>mg/day</span>
      </div>


      <div class="result-number">
        <small>هر نوبت</small>

        <strong>
          ${formatEnglishNumber(calculation.mgPerDose)}
        </strong>

        <span>mg/dose</span>
      </div>


      <div class="result-number">
        <small>فاصله مصرف</small>

        <strong>
          ${formatEnglishNumber(interval)}
        </strong>

        <span>ساعت</span>
      </div>

    </div>


    <div class="result-dose">

      <span class="dose-label">
        حجم قابل اندازه‌گیری از فرآورده انتخاب‌شده
      </span>

      <strong class="big-dose">
        ${formatEnglishNumber(volume)} mL
      </strong>

      <span class="dose-label">
        هر ${formatEnglishNumber(interval, 0)} ساعت
      </span>

    </div>


    ${
      warnings.length
        ? `
          <div class="result-warning">
            <strong>⚠️ توجه</strong>
            <ul>
              ${warnings.map(
                warning => `<li>${escapeHTML(warning)}</li>`
              ).join("")}
            </ul>
          </div>
        `
        : ""
    }


    <div class="result-note">

      <strong>رژیم:</strong>
      ${escapeHTML(indication.label)}
      <br>

      <strong>مدت:</strong>
      ${escapeHTML(indication.duration || "طبق تشخیص و راهنمای مربوطه")}
      <br>

      ${escapeHTML(indication.note || "")}

    </div>


    <div class="result-disclaimer">

      محاسبه فوق صرفاً تبدیل دوز منتخب به مقدار فرآورده است.
      تشخیص، انتخاب آنتی‌بیوتیک، مدت درمان، تنظیمات کلیوی/کبدی،
      آلرژی و سایر ملاحظات بالینی باید جداگانه بررسی شوند.

    </div>


    <button
      id="copyResultButton"
      class="result-copy"
      type="button"
    >
      کپی نتیجه
    </button>

  `;


  els.result.classList.remove("hidden");

  attachCopyButton();

}


function renderAzithromycinFiveDay(
  drug,
  strength,
  indication,
  weight
) {

  const result =
    calculateAzithromycinFiveDay(
      indication,
      weight
    );


  const day1Volume =
    volumeForDose(
      result.day1Mg,
      strength.mgPer5mL
    );


  const days2to5Volume =
    volumeForDose(
      result.days2to5Mg,
      strength.mgPer5mL
    );


  els.result.innerHTML = `

    <div class="result-title">
      <span class="result-check">✓</span>
      رژیم ۵ روزه آزیترومایسین
    </div>


    <div class="result-dose">

      <span class="dose-label">
        روز اول
      </span>

      <strong class="big-dose">
        ${formatEnglishNumber(day1Volume)} mL
      </strong>

      <span class="dose-label">
        یک‌بار در روز · 10 mg/kg
      </span>

    </div>


    <div class="result-dose">

      <span class="dose-label">
        روزهای ۲ تا ۵
      </span>

      <strong class="big-dose">
        ${formatEnglishNumber(days2to5Volume)} mL
      </strong>

      <span class="dose-label">
        روزی یک‌بار · 5 mg/kg/day
      </span>

    </div>


    <div class="result-note">

      <strong>فرمولاسیون:</strong>
      ${escapeHTML(strength.label)}
      <br>

      <strong>وزن:</strong>
      ${formatEnglishNumber(weight)} kg
      <br><br>

      ${escapeHTML(indication.note)}

    </div>


    <div class="result-disclaimer">

      این رژیم فقط برای اندیکاسیون‌هایی مناسب است که رژیم ۵ روزه
      آزیترومایسین در آن‌ها مورد تأیید منبع مربوطه باشد.

    </div>


    <button
      id="copyResultButton"
      class="result-copy"
      type="button"
    >
      کپی نتیجه
    </button>

  `;


  els.result.classList.remove("hidden");

  attachCopyButton();

}


/* =========================================================
   COPY
========================================================= */

function attachCopyButton() {

  const button =
    document.getElementById(
      "copyResultButton"
    );

  if (!button) {
    return;
  }


  button.addEventListener(
    "click",
    async () => {

      const text =
        els.result.innerText
          .replace(
            "کپی نتیجه",
            ""
          )
          .trim();


      try {

        await navigator.clipboard.writeText(
          text
        );

        button.textContent =
          "✓ نتیجه کپی شد";

        setTimeout(() => {

          button.textContent =
            "کپی نتیجه";

        }, 1600);

      } catch {

        button.textContent =
          "کپی انجام نشد";

      }

    }
  );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


/* =========================================================
   CALCULATE
========================================================= */

function calculate() {

  const validation =
    validate();


  if (!validation.ok) {

    clearResult();

    setStatus(
      "نیاز به اصلاح",
      "error"
    );

    showError(
      validation.message
    );

    return;
  }


  setStatus(
    "محاسبه شد"
  );


  renderResult(
    validation
  );


  setTimeout(() => {

    els.result.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });

  }, 50);

}


/* =========================================================
   ERROR
========================================================= */

function showError(message) {

  els.result.innerHTML = `

    <div class="result-warning">

      <strong>⚠️ خطا در ورودی</strong>

      <p>
        ${escapeHTML(message)}
      </p>

    </div>

  `;

  els.result.classList.remove("hidden");

}


/* =========================================================
   CLEAR
========================================================= */

function clearResult() {

  els.result.classList.add("hidden");

  els.result.innerHTML = "";

}


/* =========================================================
   RESET
========================================================= */

function resetAll() {

  els.form.reset();

  els.strengthSelect.innerHTML = "";

  els.indicationSelect.innerHTML = "";

  els.strengthField.classList.add("hidden");

  els.indicationField.classList.add("hidden");

  els.drugDetails.classList.add("hidden");

  els.drugMeta.textContent =
    "ابتدا دارو را انتخاب کنید.";

  els.strengthHint.textContent = "";

  els.indicationHint.textContent = "";

  clearResult();

  setStatus("آماده");

}


/* =========================================================
   THEME
========================================================= */

function applyTheme(theme) {

  document.body.dataset.theme =
    theme;

  localStorage.setItem(
    "saphira-theme",
    theme
  );

  els.themeButton.textContent =
    theme === "dark"
      ? "☀"
      : "☾";

}


function initTheme() {

  const saved =
    localStorage.getItem(
      "saphira-theme"
    );


  if (
    saved === "dark" ||
    saved === "light"
  ) {

    applyTheme(saved);

    return;
  }


  const prefersDark =
    window.matchMedia &&
    window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;


  applyTheme(
    prefersDark
      ? "dark"
      : "light"
  );

}


/* =========================================================
   SOURCES
========================================================= */

function renderSources() {

  els.sourceLinks.innerHTML =
    SOURCES.map(source => `

      <a
        href="${source.url}"
        target="_blank"
        rel="noopener noreferrer"
      >

        <strong>
          ${escapeHTML(source.title)}
        </strong>

        <span>
          ${escapeHTML(source.note)}
        </span>

      </a>

    `).join("");

}


/* =========================================================
   DIALOGS
========================================================= */

function setupDialogs() {

  document
    .querySelectorAll("[data-close]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const id =
            button.dataset.close;

          document
            .getElementById(id)
            ?.close();

        }
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


/* =========================================================
   BACKGROUND
========================================================= */

function initBackground() {

  const canvas =
    document.getElementById(
      "backgroundCanvas"
    );

  const ctx =
    canvas?.getContext("2d");


  if (!canvas || !ctx) {
    return;
  }


  const reduceMotion =
    window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;


  if (reduceMotion) {
    return;
  }


  let width = 0;
  let height = 0;

  let particles = [];


  function resize() {

    const ratio =
      Math.min(
        window.devicePixelRatio || 1,
        1.5
      );


    width =
      window.innerWidth;

    height =
      window.innerHeight;


    canvas.width =
      Math.floor(width * ratio);

    canvas.height =
      Math.floor(height * ratio);


    canvas.style.width =
      `${width}px`;

    canvas.style.height =
      `${height}px`;


    ctx.setTransform(
      ratio,
      0,
      0,
      ratio,
      0,
      0
    );


    const mobile =
      width < 700;


    const count =
      mobile ? 35 : 65;


    particles =
      Array.from(
        {
          length: count
        },
        () => ({

          x:
            Math.random() *
            width,

          y:
            Math.random() *
            height,

          r:
            Math.random() *
              1.4 +
            0.4,

          vx:
            (Math.random() - 0.5) *
            0.18,

          vy:
            (Math.random() - 0.5) *
            0.18

        })
      );

  }


  function frame() {

    ctx.clearRect(
      0,
      0,
      width,
      height
    );


    ctx.fillStyle =
      "rgba(99,102,241,0.22)";


    particles.forEach(p => {

      p.x += p.vx;

      p.y += p.vy;


      if (p.x < 0) {
        p.x = width;
      }

      if (p.x > width) {
        p.x = 0;
      }

      if (p.y < 0) {
        p.y = height;
      }

      if (p.y > height) {
        p.y = 0;
      }


      ctx.beginPath();

      ctx.arc(
        p.x,
        p.y,
        p.r,
        0,
        Math.PI * 2
      );

      ctx.fill();

    });


    requestAnimationFrame(frame);

  }


  resize();

  window.addEventListener(
    "resize",
    resize,
    {
      passive: true
    }
  );

  requestAnimationFrame(frame);

}


/* =========================================================
   EVENTS
========================================================= */

function bindEvents() {

  els.drugSelect.addEventListener(
    "change",
    handleDrugChange
  );


  els.strengthSelect.addEventListener(
    "change",
    updateHints
  );


  els.indicationSelect.addEventListener(
    "change",
    updateHints
  );


  els.form.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      calculate();

    }
  );


  els.resetButton.addEventListener(
    "click",
    resetAll
  );


  els.themeButton.addEventListener(
    "click",
    () => {

      const current =
        document.body.dataset.theme;

      applyTheme(
        current === "dark"
          ? "light"
          : "dark"
      );

    }
  );


  els.sourcesButton.addEventListener(
    "click",
    () => {

      els.sourcesDialog.showModal();

    }
  );


  els.aboutButton.addEventListener(
    "click",
    () => {

      els.aboutDialog.showModal();

    }
  );


  [
    els.weight,
    els.ageMonths
  ].forEach(input => {

    input.addEventListener(
      "keydown",
      event => {

        if (event.key === "Enter") {

          event.preventDefault();

          calculate();

        }

      }
    );

  });

}


/* =========================================================
   SELF TESTS
========================================================= */

function runSelfTests() {

  /*
    Amoxicillin:
    20 kg × 90 = 1800 mg/day
    /2 = 900 mg/dose
    400 mg/5mL
    => 11.25 mL/dose
  */

  const amox =
    findDrug("amoxicillin");

  const amoxInd =
    findIndication(
      amox,
      "amox-aom"
    );

  const amoxStrength =
    findStrength(
      amox,
      "amox400"
    );


  const result =
    calculateRegular(
      amoxInd,
      20
    );


  const volume =
    volumeForDose(
      result.mgPerDose,
      amoxStrength.mgPer5mL
    );


  console.assert(
    Math.abs(
      result.dailyMg - 1800
    ) < 0.001,
    "Amoxicillin daily dose test failed"
  );


  console.assert(
    Math.abs(
      result.mgPerDose - 900
    ) < 0.001,
    "Amoxicillin dose test failed"
  );


  console.assert(
    Math.abs(
      volume - 11.25
    ) < 0.001,
    "Amoxicillin volume test failed"
  );


  /*
    Cefdinir:
    50 kg × 14 = 700
    cap = 600 mg/day
  */

  const cefdinir =
    findDrug("cefdinir");

  const cefInd =
    findIndication(
      cefdinir,
      "cefd-aom"
    );


  const cefResult =
    calculateRegular(
      cefInd,
      50
    );


  console.assert(
    cefResult.dailyMg === 600,
    "Cefdinir max-dose test failed"
  );


  /*
    Azithromycin 5 day:
    20 kg:
    day 1 = 200 mg
    days 2-5 = 100 mg
  */

  const azi =
    calculateAzithromycinFiveDay(
      {},
      20
    );


  console.assert(
    azi.day1Mg === 200,
    "Azithromycin day 1 test failed"
  );


  console.assert(
    azi.days2to5Mg === 100,
    "Azithromycin days 2-5 test failed"
  );

}


/* =========================================================
   INIT
========================================================= */

(function init() {

  initTheme();

  populateDrugs();

  renderSources();

  setupDialogs();

  bindEvents();

  runSelfTests();

  initBackground();

})();
