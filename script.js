
"use strict";

/*
 * ============================================================
 * SAPHIRA
 * Pediatric Oral Antibiotic Dose Calculator
 * ============================================================
 *
 * IMPORTANT:
 * This calculator is intended as a clinical calculation aid.
 * It is NOT a substitute for a current pediatric reference,
 * local antibiogram, clinical assessment, renal/hepatic dosing,
 * or prescriber/pharmacist verification.
 *
 * Doses are deliberately indication-specific.
 * Maximum doses are applied by the calculation engine.
 *
 * ============================================================
 */

const STORAGE_KEY = "saphira-theme-v2";

const $ = (id) => document.getElementById(id);

const weightInput = $("weight");
const drugSelect = $("drugSelect");
const indicationSelect = $("indicationSelect");
const strengthSelect = $("strengthSelect");

const indicationField = $("indicationField");
const strengthField = $("strengthField");

const drugClass = $("drugClass");

const drugInfo = $("drugInfo");
const drugInfoTitle = $("drugInfoTitle");
const drugInfoClass = $("drugInfoClass");
const drugInfoComponent = $("drugInfoComponent");
const drugInfoAge = $("drugInfoAge");
const drugNotes = $("drugNotes");
const ageWarningBadge = $("ageWarningBadge");

const doseReference = $("doseReference");
const referenceTag = $("referenceTag");
const referenceDose = $("referenceDose");
const referenceInterval = $("referenceInterval");
const referenceDuration = $("referenceDuration");
const referenceMaximum = $("referenceMaximum");
const referenceNote = $("referenceNote");

const calculateButton = $("calculateButton");
const resetButton = $("resetButton");

const errorBox = $("errorBox");
const resultSection = $("resultSection");

const resultPatient = $("resultPatient");
const resultMl = $("resultMl");
const resultFrequency = $("resultFrequency");
const resultDoseMg = $("resultDoseMg");
const resultDaily = $("resultDaily");
const resultConcentration = $("resultConcentration");
const resultDuration = $("resultDuration");
const resultMaximum = $("resultMaximum");
const resultWarning = $("resultWarning");
const resultAdministration = $("resultAdministration");
const calculationSteps = $("calculationSteps");

const copyButton = $("copyButton");
const printButton = $("printButton");

const themeToggle = $("themeToggle");
const themeIcon = $("themeIcon");
const toast = $("toast");

/* ============================================================
 * Persian number utilities
 * ============================================================
 */

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

function toPersian(value) {
  if (value === null || value === undefined) return "";

  return String(value)
    .replace(/[0-9]/g, (d) => PERSIAN_DIGITS[d])
    .replace(/[٠-٩]/g, (d) => PERSIAN_DIGITS[ARABIC_DIGITS.indexOf(d)]);
}

function normalizeNumber(value) {
  if (typeof value === "number") return value;

  return Number(
    String(value)
      .replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d)))
      .replace(/[٠-٩]/g, (d) => String(ARABIC_DIGITS.indexOf(d)))
      .replace(",", ".")
  );
}

function formatNumber(value, decimals = 1) {
  const number = Number(value);

  if (!Number.isFinite(number)) return "—";

  const rounded = Number(number.toFixed(decimals));

  return toPersian(
    rounded.toLocaleString("en-US", {
      maximumFractionDigits: decimals,
      minimumFractionDigits: 0
    })
  );
}

function formatMl(value) {
  if (value < 1) return formatNumber(value, 2);
  if (value < 10) return formatNumber(value, 1);

  return formatNumber(value, 1);
}

/* ============================================================
 * HTML safety
 * ============================================================
 */

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* ============================================================
 * Clinical database
 * ============================================================
 *
 * component:
 * - active ingredient used for mg/kg calculation.
 *
 * dosing:
 * - mg/kg/day OR mg/kg/dose
 *
 * maxDaily:
 * - absolute maximum daily dose.
 *
 * maxDose:
 * - absolute maximum per administration.
 *
 * minAge:
 * - minimum age in years for this dosing entry.
 *
 * NOTE:
 * These entries represent common outpatient oral pediatric
 * regimens. They are not exhaustive.
 * ============================================================
 */

const DRUGS = [

  /* ----------------------------------------------------------
   * AMOXICILLIN
   * ---------------------------------------------------------- */

  {
    id: "amoxicillin",
    name: "Amoxicillin — آموکسی‌سیلین",
    className: "Aminopenicillin",
    component: "Amoxicillin",
    componentLabel: "خود آموکسی‌سیلین",
    minAge: 0,
    notes: [
      "در بسیاری از عفونت‌های تنفسی کودکان یکی از انتخاب‌های خط اول است.",
      "دوز high-dose معمولاً برای افزایش مواجهه با پنوموکوک کم‌حساسیت استفاده می‌شود.",
      "در حساسیت شدید فوری به پنی‌سیلین‌ها نباید استفاده شود.",
      "راش در مونونوکلئوز عفونی می‌تواند رخ دهد و الزاماً به معنی آلرژی IgE-mediated نیست.",
      "سوسپانسیون قبل از مصرف باید به‌خوبی تکان داده شود."
    ],
    strengths: [
      { id: "amox125", label: "۱۲۵ mg / 5 mL", mgPer5ml: 125 },
      { id: "amox250", label: "۲۵۰ mg / 5 mL", mgPer5ml: 250 },
      { id: "amox400", label: "۴۰۰ mg / 5 mL", mgPer5ml: 400 }
    ],
    indications: [
      {
        id: "strep",
        name: "فارنژیت استرپتوکوکی",
        doseType: "mgkgday",
        dose: 50,
        dosesPerDay: 1,
        minAge: 3,
        maxDaily: 1000,
        duration: "۱۰ روز",
        tag: "GAS pharyngitis",
        note: "دوز رایج ۵۰ mg/kg/day؛ حداکثر ۱۰۰۰ mg/day.",
        administration: "یک‌بار در روز یا طبق رفرنس/نسخه. درمان باید برای کل دوره تکمیل شود."
      },
      {
        id: "aom-standard",
        name: "اوتیت میانی حاد — دوز استاندارد",
        doseType: "mgkgday",
        dose: 45,
        dosesPerDay: 2,
        maxDaily: 2000,
        duration: "معمولاً ۵–۱۰ روز بر اساس سن و شدت",
        tag: "AOM standard",
        note: "انتخاب دوز و مدت باید با سن، شدت و سابقه درمان قبلی تطبیق داده شود.",
        administration: "هر ۱۲ ساعت."
      },
      {
        id: "aom-high",
        name: "اوتیت میانی حاد — high dose",
        doseType: "mgkgday",
        dose: 90,
        dosesPerDay: 2,
        maxDose: 1000,
        maxDaily: 2000,
        duration: "معمولاً ۵–۱۰ روز بر اساس سن و شدت",
        tag: "AOM high-dose",
        note: "۹۰ mg/kg/day در دو دوز؛ در راهنمای UCSF حداکثر معمول ۱۰۰۰ mg/dose ذکر شده است.",
        administration: "هر ۱۲ ساعت."
      },
      {
        id: "sinusitis",
        name: "سینوزیت باکتریال — دوز استاندارد",
        doseType: "mgkgday",
        dose: 45,
        dosesPerDay: 2,
        maxDaily: 2000,
        minAge: 1,
        duration: "طبق گایدلاین و پاسخ بالینی",
        tag: "Acute bacterial sinusitis",
        note: "در سینوزیت ساده و بدون ریسک مقاومت، آموکسی‌سیلین می‌تواند گزینه خط اول باشد.",
        administration: "هر ۱۲ ساعت؛ در صورت عدم بهبود یا worsening باید بیمار reassess شود."
      },
      {
        id: "sinusitis-high",
        name: "سینوزیت باکتریال — high dose",
        doseType: "mgkgday",
        dose: 90,
        dosesPerDay: 2,
        maxDose: 1000,
        maxDaily: 2000,
        minAge: 1,
        duration: "معمولاً ۱۰ روز در رژیم‌های کلاسیک",
        tag: "Sinusitis high-dose",
        note: "در برخی شرایط با ریسک پنوموکوک کم‌حساسیت استفاده می‌شود؛ انتخاب آن وابسته به گایدلاین و وضعیت بیمار است.",
        administration: "هر ۱۲ ساعت."
      },
      {
        id: "cap",
        name: "پنومونی اکتسابی از جامعه — درمان خوراکی",
        doseType: "mgkgday",
        dose: 90,
        dosesPerDay: 2,
        maxDose: 1000,
        maxDaily: 2000,
        minAge: 3,
        duration: "طبق گایدلاین و پاسخ بالینی",
        tag: "CAP",
        note: "دوز و انتخاب دارو باید بر اساس شدت CAP و سن کودک تعیین شود.",
        administration: "هر ۱۲ ساعت."
      }
    ]
  },

  /* ----------------------------------------------------------
   * AMOXICILLIN / CLAVULANATE
   * ---------------------------------------------------------- */

  {
    id: "amoxiclav",
    name: "Amoxicillin/Clavulanate — آموکسی‌سیلین/کلاوولانات",
    className: "Aminopenicillin + β-lactamase inhibitor",
    component: "Amoxicillin",
    componentLabel: "فقط جزء Amoxicillin",
    minAge: 0,
    notes: [
      "تمام محاسبات این دارو بر اساس جزء amoxicillin انجام می‌شود، نه مجموع وزن فرآورده.",
      "فرآورده‌های مختلف نسبت amoxicillin/clavulanate متفاوت دارند.",
      "برای کاهش اسهال و بهبود تحمل گوارشی، همراه غذا مصرف شود.",
      "در سابقه هپاتیت کلستاتیک/اختلال کبدی مرتبط با این دارو از مصرف مجدد پرهیز شود.",
      "در عفونت‌های ساده، در صورت کفایت طیف، آموکسی‌سیلین ساده معمولاً ترجیح داده می‌شود."
    ],
    strengths: [
      {
        id: "ac156",
        label: "125/31.25 mg / 5 mL",
        mgPer5ml: 125,
        clavulanatePer5ml: 31.25
      },
      {
        id: "ac228",
        label: "200/28.5 mg / 5 mL",
        mgPer5ml: 200,
        clavulanatePer5ml: 28.5
      },
      {
        id: "ac312",
        label: "250/62.5 mg / 5 mL",
        mgPer5ml: 250,
        clavulanatePer5ml: 62.5
      },
      {
        id: "ac457",
        label: "400/57 mg / 5 mL",
        mgPer5ml: 400,
        clavulanatePer5ml: 57
      },
      {
        id: "ac643",
        label: "600/42.9 mg / 5 mL",
        mgPer5ml: 600,
        clavulanatePer5ml: 42.9
      }
    ],
    indications: [
      {
        id: "resp-standard",
        name: "عفونت تنفسی / AOM — دوز استاندارد",
        doseType: "mgkgday",
        dose: 45,
        dosesPerDay: 2,
        maxDose: 1000,
        maxDaily: 2000,
        duration: "طبق اندیکاسیون",
        tag: "Standard dose",
        note: "محاسبه بر اساس جزء amoxicillin انجام می‌شود.",
        administration: "هر ۱۲ ساعت و همراه غذا."
      },
      {
        id: "high",
        name: "AOM / سینوزیت با ریسک مقاومت — high dose",
        doseType: "mgkgday",
        dose: 90,
        dosesPerDay: 2,
        maxDose: 1000,
        maxDaily: 2000,
        minAge: 0,
        duration: "طبق گایدلاین و شرایط بالینی",
        tag: "High-dose",
        note: "در رژیم high-dose معمولاً 80–90 mg/kg/day از جزء amoxicillin همراه حدود 6.4 mg/kg/day clavulanate هدف‌گذاری می‌شود.",
        administration: "هر ۱۲ ساعت و همراه غذا."
      }
    ]
  },

  /* ----------------------------------------------------------
   * PENICILLIN V
   * ---------------------------------------------------------- */

  {
    id: "penicillin-v",
    name: "Penicillin V — پنی‌سیلین V",
    className: "Natural penicillin",
    component: "Penicillin V",
    componentLabel: "خود Penicillin V",
    minAge: 0,
    notes: [
      "یکی از گزینه‌های narrow-spectrum برای GAS pharyngitis است.",
      "در حساسیت شدید فوری به پنی‌سیلین نباید استفاده شود.",
      "درمان فارنژیت استرپتوکوکی معمولاً ۱۰ روز است."
    ],
    strengths: [
      { id: "penv125", label: "۱۲۵ mg / 5 mL", mgPer5ml: 125 },
      { id: "penv250", label: "۲۵۰ mg / 5 mL", mgPer5ml: 250 }
    ],
    indications: [
      {
        id: "strep",
        name: "فارنژیت استرپتوکوکی",
        doseType: "mgkgday",
        dose: 50,
        dosesPerDay: 2,
        maxDose: 500,
        maxDaily: 1000,
        minAge: 3,
        duration: "۱۰ روز",
        tag: "GAS pharyngitis",
        note: "دوز روزانه تا حداکثر ۱۰۰۰ mg/day.",
        administration: "هر ۱۲ ساعت."
      }
    ]
  },

  /* ----------------------------------------------------------
   * CEPHALEXIN
   * ---------------------------------------------------------- */

  {
    id: "cephalexin",
    name: "Cephalexin — سفالکسین",
    className: "First-generation cephalosporin",
    component: "Cephalexin",
    componentLabel: "خود Cephalexin",
    minAge: 0,
    notes: [
      "برای بسیاری از عفونت‌های پوست و بافت نرم ناشی از MSSA و Streptococcus مناسب است.",
      "دوز بر اساس اندیکاسیون و شدت متفاوت است.",
      "در سابقه آنافیلاکسی یا واکنش شدید فوری به بتالاکتام‌ها احتیاط جدی لازم است.",
      "در نارسایی کلیه ممکن است نیاز به تعدیل دوز باشد."
    ],
    strengths: [
      { id: "ceph125", label: "۱۲۵ mg / 5 mL", mgPer5ml: 125 },
      { id: "ceph250", label: "۲۵۰ mg / 5 mL", mgPer5ml: 250 }
    ],
    indications: [
      {
        id: "mild",
        name: "عفونت خفیف پوست / فارنژیت",
        doseType: "mgkgdose",
        dose: 25,
        dosesPerDay: 3,
        maxDose: 500,
        maxDaily: 1500,
        duration: "طبق اندیکاسیون",
        tag: "Mild–moderate",
        note: "UCSF برای عفونت‌های خفیف تا متوسط 25 mg/kg/dose سه بار در روز ذکر می‌کند.",
        administration: "هر ۸ ساعت."
      },
      {
        id: "severe",
        name: "عفونت شدید پوست / UTI / pyelonephritis منتخب",
        doseType: "mgkgdose",
        dose: 50,
        dosesPerDay: 3,
        maxDose: 1000,
        maxDaily: 3000,
        duration: "طبق تشخیص",
        tag: "Severe",
        note: "برای برخی عفونت‌های شدید، 50 mg/kg/dose سه بار در روز استفاده می‌شود.",
        administration: "هر ۸ ساعت."
      }
    ]
  },

  /* ----------------------------------------------------------
   * CEFDINIR
   * ---------------------------------------------------------- */

  {
    id: "cefdinir",
    name: "Cefdinir — سفدینیر",
    className: "Third-generation oral cephalosporin",
    component: "Cefdinir",
    componentLabel: "خود Cefdinir",
    minAge: 0.5,
    notes: [
      "دوز رایج کودکان 14 mg/kg/day است.",
      "می‌تواند یک‌بار در روز یا برای برخی اندیکاسیون‌ها دو بار در روز داده شود.",
      "در نارسایی کلیه نیاز به توجه به عملکرد کلیه وجود دارد.",
      "آهن و برخی فرآورده‌های آهن‌دار می‌توانند جذب آن را کاهش دهند و تغییر رنگ مدفوع ممکن است رخ دهد."
    ],
    strengths: [
      { id: "cefd125", label: "125 mg / 5 mL", mgPer5ml: 125 },
      { id: "cefd250", label: "250 mg / 5 mL", mgPer5ml: 250 }
    ],
    indications: [
      {
        id: "aom",
        name: "اوتیت میانی حاد",
        doseType: "mgkgday",
        dose: 14,
        dosesPerDay: 1,
        maxDaily: 600,
        duration: "۵–۱۰ روز طبق سن و شدت",
        tag: "AOM",
        note: "حداکثر 600 mg/day.",
        administration: "یک‌بار در روز."
      },
      {
        id: "aom-bid",
        name: "اوتیت / عفونت — رژیم BID",
        doseType: "mgkgday",
        dose: 14,
        dosesPerDay: 2,
        maxDose: 300,
        maxDaily: 600,
        duration: "طبق اندیکاسیون",
        tag: "BID",
        note: "7 mg/kg/dose هر 12 ساعت؛ حداکثر 300 mg/dose.",
        administration: "هر ۱۲ ساعت."
      },
      {
        id: "skin",
        name: "عفونت پوست و بافت نرم",
        doseType: "mgkgday",
        dose: 14,
        dosesPerDay: 2,
        maxDose: 300,
        maxDaily: 600,
        duration: "۱۰ روز",
        tag: "SSTI",
        note: "برای عفونت پوستی طبق برچسب دارو رژیم BID استفاده می‌شود.",
        administration: "هر ۱۲ ساعت."
      }
    ]
  },

  /* ----------------------------------------------------------
   * CEFIXIME
   * ---------------------------------------------------------- */

  {
    id: "cefixime",
    name: "Cefixime — سفیکسیم",
    className: "Third-generation oral cephalosporin",
    component: "Cefixime",
    componentLabel: "خود Cefixime",
    minAge: 0.5,
    notes: [
      "دوز رایج کودکان 8 mg/kg/day است.",
      "می‌تواند به‌صورت یک‌بار در روز یا 4 mg/kg هر 12 ساعت تجویز شود.",
      "در نارسایی کلیه باید دوز/فاصله بررسی شود.",
      "انتخاب آن برای UTI باید با الگوی مقاومت محلی و کشت در موارد لازم تطبیق داده شود."
    ],
    strengths: [
      { id: "cefi100", label: "100 mg / 5 mL", mgPer5ml: 100 },
      { id: "cefi200", label: "200 mg / 5 mL", mgPer5ml: 200 }
    ],
    indications: [
      {
        id: "daily",
        name: "UTI / AOM / اندیکاسیون‌های منتخب — روزانه",
        doseType: "mgkgday",
        dose: 8,
        dosesPerDay: 1,
        maxDaily: 400,
        duration: "طبق اندیکاسیون",
        tag: "Once daily",
        note: "حداکثر معمول 400 mg/day.",
        administration: "یک‌بار در روز."
      },
      {
        id: "bid",
        name: "UTI / AOM — دو بار در روز",
        doseType: "mgkgday",
        dose: 8,
        dosesPerDay: 2,
        maxDose: 200,
        maxDaily: 400,
        duration: "طبق اندیکاسیون",
        tag: "BID",
        note: "4 mg/kg/dose هر 12 ساعت.",
        administration: "هر ۱۲ ساعت."
      }
    ]
  },

  /* ----------------------------------------------------------
   * CEFUROXIME
   * ---------------------------------------------------------- */

  {
    id: "cefuroxime",
    name: "Cefuroxime — سفوروکسیم",
    className: "Second-generation cephalosporin",
    component: "Cefuroxime",
    componentLabel: "Cefuroxime",
    minAge: 0.25,
    notes: [
      "برای برخی AOM، سینوزیت و عفونت‌های تنفسی استفاده می‌شود.",
      "جذب خوراکی قرص/سوسپانسیون با غذا بهتر است.",
      "در صورت حساسیت شدید بتالاکتام باید احتیاط شود.",
      "برای جلوگیری از مصرف بی‌دلیل طیف وسیع، اندیکاسیون دقیق باید مشخص باشد."
    ],
    strengths: [
      { id: "cefuro125", label: "125 mg / 5 mL", mgPer5ml: 125 },
      { id: "cefuro250", label: "250 mg / 5 mL", mgPer5ml: 250 }
    ],
    indications: [
      {
        id: "resp",
        name: "AOM / سینوزیت / عفونت تنفسی منتخب",
        doseType: "mgkgday",
        dose: 30,
        dosesPerDay: 2,
        maxDose: 500,
        maxDaily: 1000,
        duration: "طبق اندیکاسیون",
        tag: "Respiratory",
        note: "رژیم رایج 30 mg/kg/day در دو دوز؛ حداکثر 500 mg/dose.",
        administration: "هر ۱۲ ساعت و همراه غذا."
      }
    ]
  },

  /* ----------------------------------------------------------
   * AZITHROMYCIN
   * ---------------------------------------------------------- */

  {
    id: "azithromycin",
    name: "Azithromycin — آزیترومایسین",
    className: "Macrolide",
    component: "Azithromycin",
    componentLabel: "خود Azithromycin",
    minAge: 0.5,
    notes: [
      "برای عفونت‌های ناشی از پاتوژن‌های حساس و برخی atypical infections استفاده می‌شود.",
      "برای GAS pharyngitis خط اول نیست و در موارد مناسب جایگزین استفاده می‌شود.",
      "QT prolongation و تداخلات مرتبط باید در بیماران پرخطر در نظر گرفته شود.",
      "در بیماری‌های کبدی مهم باید احتیاط شود."
    ],
    strengths: [
      { id: "azi100", label: "100 mg / 5 mL", mgPer5ml: 100 },
      { id: "azi200", label: "200 mg / 5 mL", mgPer5ml: 200 }
    ],
    indications: [
      {
        id: "aom-single",
        name: "AOM — تک‌دوز",
        doseType: "mgkgday",
        dose: 30,
        dosesPerDay: 1,
        maxDose: 1500,
        maxDaily: 1500,
        duration: "یک نوبت",
        tag: "AOM single dose",
        note: "بر اساس برچسب دارویی: 30 mg/kg به‌صورت single dose.",
        administration: "فقط یک نوبت."
      },
      {
        id: "aom-three",
        name: "AOM / برخی اندیکاسیون‌ها — ۳ روزه",
        doseType: "mgkgday",
        dose: 10,
        dosesPerDay: 1,
        maxDose: 500,
        maxDaily: 500,
        duration: "۳ روز",
        tag: "3-day regimen",
        note: "10 mg/kg once daily برای 3 روز؛ حداکثر بر اساس اندیکاسیون.",
        administration: "یک‌بار در روز."
      },
      {
        id: "five-day",
        name: "CAP / AOM — رژیم ۵ روزه",
        doseType: "special-azi5",
        dose: 0,
        dosesPerDay: 1,
        maxDose: 500,
        maxDaily: 500,
        duration: "۵ روز",
        tag: "5-day regimen",
        note: "روز اول 10 mg/kg؛ روزهای 2 تا 5، روزانه 5 mg/kg.",
        administration: "روز اول یک‌بار؛ سپس روزهای ۲ تا ۵ یک‌بار در روز."
      },
      {
        id: "pharyngitis",
        name: "فارنژیت / تونسیلیت در بیمار مناسب برای ماکرولید",
        doseType: "mgkgday",
        dose: 12,
        dosesPerDay: 1,
        maxDose: 500,
        maxDaily: 500,
        minAge: 2,
        duration: "۵ روز",
        tag: "Pharyngitis",
        note: "12 mg/kg once daily for 5 days طبق برچسب برخی فرآورده‌ها.",
        administration: "یک‌بار در روز."
      }
    ]
  },

  /* ----------------------------------------------------------
   * CLINDAMYCIN
   * ---------------------------------------------------------- */

  {
    id: "clindamycin",
    name: "Clindamycin — کلیندامایسین",
    className: "Lincosamide",
    component: "Clindamycin",
    componentLabel: "خود Clindamycin",
    minAge: 0,
    notes: [
      "برای برخی عفونت‌های پوست و بافت نرم، عفونت‌های دندانی و برخی عفونت‌های ناشی از ارگانیسم‌های حساس کاربرد دارد.",
      "در مناطق با مقاومت بالای MRSA یا مقاومت القایی باید antibiogram در نظر گرفته شود.",
      "اسهال شدید یا مداوم می‌تواند نشانه C. difficile باشد.",
      "طعم فرآورده خوراکی ممکن است تحمل درمان را کاهش دهد."
    ],
    strengths: [
      { id: "clin75", label: "75 mg / 5 mL", mgPer5ml: 75 }
    ],
    indications: [
      {
        id: "ssti",
        name: "SSTI / عفونت دندانی / عفونت‌های منتخب",
        doseType: "mgkgday",
        dose: 30,
        dosesPerDay: 3,
        maxDose: 900,
        maxDaily: 2700,
        duration: "طبق شدت و محل عفونت",
        tag: "SSTI",
        note: "در برخی منابع 20–40 mg/kg/day در 3 یا 4 دوز استفاده می‌شود.",
        administration: "هر ۸ ساعت در این محاسبه."
      },
      {
        id: "high",
        name: "عفونت شدید منتخب",
        doseType: "mgkgday",
        dose: 40,
        dosesPerDay: 4,
        maxDose: 900,
        maxDaily: 3600,
        duration: "طبق تشخیص",
        tag: "Severe",
        note: "دوزهای بالاتر باید بر اساس شدت، محل عفونت و رفرنس تخصصی انتخاب شوند.",
        administration: "هر ۶ ساعت."
      }
    ]
  },

  /* ----------------------------------------------------------
   * TMP-SMX
   * ---------------------------------------------------------- */

  {
    id: "tmpsmx",
    name: "Trimethoprim/Sulfamethoxazole — کوتریموکسازول",
    className: "Folate antagonist combination",
    component: "Trimethoprim",
    componentLabel: "فقط جزء Trimethoprim (TMP)",
    minAge: 2 / 12,
    notes: [
      "دوز این دارو در کودکان بر اساس جزء TMP محاسبه می‌شود.",
      "فرمول رایج سوسپانسیون 40 mg TMP + 200 mg SMX در هر 5 mL است.",
      "در شیرخواران زیر ۲ ماه معمولاً نباید استفاده شود مگر در شرایط تخصصی مشخص.",
      "در اختلال کلیه، hyperkalemia و تداخل با داروهای مؤثر بر پتاسیم باید احتیاط شود.",
      "راش‌های شدید پوستی و اختلالات خونی از عوارض مهم نادر هستند."
    ],
    strengths: [
      {
        id: "tmp40",
        label: "40 mg TMP + 200 mg SMX / 5 mL",
        mgPer5ml: 40
      }
    ],
    indications: [
      {
        id: "uti",
        name: "UTI — رژیم بر اساس TMP",
        doseType: "mgkgday",
        dose: 8,
        dosesPerDay: 2,
        maxDose: 160,
        maxDaily: 320,
        duration: "طبق تشخیص و کشت",
        tag: "UTI",
        note: "محاسبه بر اساس TMP: حدود 8 mg/kg/day در دو دوز.",
        administration: "هر ۱۲ ساعت."
      },
      {
        id: "ssti",
        name: "SSTI / MRSA حساس",
        doseType: "mgkgday",
        dose: 8,
        dosesPerDay: 2,
        maxDose: 160,
        maxDaily: 320,
        duration: "معمولاً ۵–۱۰ روز طبق شدت",
        tag: "SSTI",
        note: "برای MRSA باید حساسیت ارگانیسم و نیاز به پوشش Streptococcus در نظر گرفته شود.",
        administration: "هر ۱۲ ساعت."
      }
    ]
  },

  /* ----------------------------------------------------------
   * METRONIDAZOLE
   * ---------------------------------------------------------- */

  {
    id: "metronidazole",
    name: "Metronidazole — مترونیدازول",
    className: "Nitroimidazole",
    component: "Metronidazole",
    componentLabel: "خود Metronidazole",
    minAge: 0,
    notes: [
      "برای عفونت‌های ناشی از anaerobes و برخی protozoal infections استفاده می‌شود.",
      "دوز بر اساس اندیکاسیون به‌طور قابل توجهی متفاوت است.",
      "طعم فلزی و ناراحتی گوارشی شایع است.",
      "مصرف الکل همزمان و مدت کوتاهی پس از درمان باید اجتناب شود.",
      "در مصرف طولانی‌مدت، علائم نوروپاتی باید جدی گرفته شوند."
    ],
    strengths: [
      { id: "metro125", label: "125 mg / 5 mL", mgPer5ml: 125 },
      { id: "metro250", label: "250 mg / 5 mL", mgPer5ml: 250 }
    ],
    indications: [
      {
        id: "giardia",
        name: "Giardiasis",
        doseType: "mgkgday",
        dose: 15,
        dosesPerDay: 3,
        maxDose: 500,
        maxDaily: 1500,
        duration: "۵–۷ روز",
        tag: "Giardiasis",
        note: "حدود 5 mg/kg/dose سه بار در روز.",
        administration: "هر ۸ ساعت."
      },
      {
        id: "amebiasis",
        name: "Amebiasis",
        doseType: "mgkgday",
        dose: 40,
        dosesPerDay: 3,
        maxDose: 750,
        maxDaily: 2250,
        duration: "۵–۱۰ روز طبق تشخیص",
        tag: "Amebiasis",
        note: "دوز بسته به سن، شدت و رفرنس می‌تواند متفاوت باشد.",
        administration: "هر ۸ ساعت."
      },
      {
        id: "anaerobic",
        name: "Anaerobic infection",
        doseType: "mgkgday",
        dose: 30,
        dosesPerDay: 4,
        maxDose: 500,
        maxDaily: 2000,
        duration: "طبق محل عفونت",
        tag: "Anaerobic",
        note: "برای عفونت‌های بی‌هوازی، رژیم دقیق باید با محل عفونت و رفرنس تطبیق داده شود.",
        administration: "هر ۶ ساعت."
      }
    ]
  }
];

/* ============================================================
 * Helpers
 * ============================================================
 */

function getDrug(id) {
  return DRUGS.find((drug) => drug.id === id);
}

function getIndication(drug, id) {
  return drug?.indications?.find((item) => item.id === id);
}

function getStrength(drug, id) {
  return drug?.strengths?.find((item) => item.id === id);
}

function ageText(minAge) {
  if (minAge <= 0) return "از نظر سنی محدودیت اختصاصی ندارد";

  if (minAge < 1) {
    return `≥ ${formatNumber(minAge * 12, 0)} ماه`;
  }

  return `≥ ${formatNumber(minAge, 1)} سال`;
}

function ageAllowed(drug, indication, weight) {
  const age = null;

  /*
   * This calculator intentionally does not estimate age from weight.
   * Weight alone is not a safe surrogate for chronological age.
   *
   * Therefore age-dependent restrictions are displayed but not
   * silently guessed.
   */
  return {
    allowed: true,
    ageRequired: Boolean(drug?.minAge > 0 || indication?.minAge > 0)
  };
}

function getIntervalText(dosesPerDay) {
  if (dosesPerDay === 1) return "هر ۲۴ ساعت";
  if (dosesPerDay === 2) return "هر ۱۲ ساعت";
  if (dosesPerDay === 3) return "هر ۸ ساعت";
  if (dosesPerDay === 4) return "هر ۶ ساعت";
  if (dosesPerDay === 5) return "هر ۴٫۸ ساعت";

  return `${formatNumber(24 / dosesPerDay, 1)} ساعت یک‌بار`;
}

function calculateDose(weight, indication, strength) {

  if (indication.doseType === "special-azi5") {
    const day1Mg = Math.min(
      weight * 10,
      indication.maxDose ?? Infinity
    );

    const nextMg = Math.min(
      weight * 5,
      indication.maxDose ?? Infinity
    );

    const day1Ml = day1Mg / (strength.mgPer5ml / 5);
    const nextMl = nextMg / (strength.mgPer5ml / 5);

    return {
      special: true,
      day1Mg,
      nextMg,
      day1Ml,
      nextMl,
      totalDailyMg: day1Mg,
      doseMg: day1Mg,
      doseMl: day1Ml,
      frequency: "روز اول یک‌بار؛ روزهای ۲ تا ۵ یک‌بار در روز",
      interval: "روزانه",
      maxApplied: day1Mg < weight * 10 || nextMg < weight * 5
    };
  }

  let dailyMg;
  let doseMg;

  if (indication.doseType === "mgkgdose") {
    doseMg = weight * indication.dose;
    dailyMg = doseMg * indication.dosesPerDay;
  } else {
    dailyMg = weight * indication.dose;
    doseMg = dailyMg / indication.dosesPerDay;
  }

  let maxApplied = false;

  if (
    Number.isFinite(indication.maxDaily) &&
    dailyMg > indication.maxDaily
  ) {
    dailyMg = indication.maxDaily;
    doseMg = dailyMg / indication.dosesPerDay;
    maxApplied = true;
  }

  if (
    Number.isFinite(indication.maxDose) &&
    doseMg > indication.maxDose
  ) {
    doseMg = indication.maxDose;
    dailyMg = doseMg * indication.dosesPerDay;
    maxApplied = true;
  }

  const concentrationMgPerMl = strength.mgPer5ml / 5;
  const volumeMl = doseMg / concentrationMgPerMl;

  return {
    special: false,
    dailyMg,
    doseMg,
    volumeMl,
    concentrationMgPerMl,
    maxApplied,
    frequency: getIntervalText(indication.dosesPerDay),
    interval: getIntervalText(indication.dosesPerDay)
  };
}

/*
 * Rounding:
 * The calculator keeps the mathematical result and rounds the
 * displayed volume conservatively for readability.
 *
 * We do NOT silently round to a specific syringe graduation,
 * because available oral syringes differ.
 */

function getVolumeDisplay(volumeMl) {
  return formatMl(volumeMl);
}

/* ============================================================
 * UI state
 * ============================================================
 */

function hideElement(element) {
  element.classList.add("hidden");
}

function showElement(element) {
  element.classList.remove("hidden");
}

function clearResult() {
  hideElement(resultSection);
  hideElement(resultWarning);
  resultWarning.innerHTML = "";
}

function showError(message) {
  errorBox.innerHTML = escapeHTML(message);
  showElement(errorBox);
}

function clearError() {
  hideElement(errorBox);
  errorBox.textContent = "";
}

function resetDoseReference() {
  hideElement(doseReference);

  referenceTag.textContent = "";
  referenceDose.textContent = "";
  referenceInterval.textContent = "";
  referenceDuration.textContent = "";
  referenceMaximum.textContent = "";
  referenceNote.textContent = "";
}

function resetDrugInfo() {
  hideElement(drugInfo);
  hideElement(ageWarningBadge);

  drugClass.textContent = "";

  drugInfoTitle.textContent = "";
  drugInfoClass.textContent = "";
  drugInfoComponent.textContent = "";
  drugInfoAge.textContent = "";

  drugNotes.innerHTML = "";
}

/* ============================================================
 * Populate drug list
 * ============================================================
 */

function populateDrugs() {

  drugSelect.innerHTML =
    `<option value="">انتخاب آنتی‌بیوتیک...</option>`;

  DRUGS.forEach((drug) => {

    const option = document.createElement("option");

    option.value = drug.id;
    option.textContent = drug.name;

    drugSelect.appendChild(option);
  });
}

/* ============================================================
 * Drug selection
 * ============================================================
 */

function onDrugChange() {

  clearError();
  clearResult();
  resetDoseReference();
  resetDrugInfo();

  indicationSelect.innerHTML =
    `<option value="">انتخاب اندیکاسیون...</option>`;

  strengthSelect.innerHTML =
    `<option value="">انتخاب غلظت...</option>`;

  hideElement(indicationField);
  hideElement(strengthField);

  const drug = getDrug(drugSelect.value);

  if (!drug) return;

  drugClass.textContent = drug.className;

  drugInfoTitle.textContent = drug.name;
  drugInfoClass.textContent = drug.className;
  drugInfoComponent.textContent = drug.componentLabel;
  drugInfoAge.textContent = ageText(drug.minAge);

  drug.notes.forEach((note) => {

    const item = document.createElement("div");

    item.className = "note-item";
    item.textContent = note;

    drugNotes.appendChild(item);
  });

  showElement(drugInfo);

  if (drug.minAge > 0) {
    showElement(ageWarningBadge);
  }

  drug.indications.forEach((indication) => {

    const option = document.createElement("option");

    option.value = indication.id;
    option.textContent = indication.name;

    indicationSelect.appendChild(option);
  });

  drug.strengths.forEach((strength) => {

    const option = document.createElement("option");

    option.value = strength.id;
    option.textContent = strength.label;

    strengthSelect.appendChild(option);
  });

  showElement(indicationField);
  showElement(strengthField);
}

/* ============================================================
 * Indication / strength changes
 * ============================================================
 */

function updateReference() {

  clearError();
  clearResult();

  const drug = getDrug(drugSelect.value);
  const indication = getIndication(
    drug,
    indicationSelect.value
  );

  if (!drug || !indication) {
    resetDoseReference();
    return;
  }

  referenceTag.textContent = indication.tag || "";

  if (indication.doseType === "special-azi5") {

    referenceDose.textContent =
      "روز ۱: ۱۰ mg/kg/day  •  روزهای ۲–۵: ۵ mg/kg/day";

  } else if (indication.doseType === "mgkgdose") {

    referenceDose.textContent =
      `${formatNumber(indication.dose, 1)} mg/kg/dose`;

  } else {

    referenceDose.textContent =
      `${formatNumber(indication.dose, 1)} mg/kg/day`;
  }

  referenceInterval.textContent =
    getIntervalText(indication.dosesPerDay);

  referenceDuration.textContent =
    indication.duration || "طبق اندیکاسیون";

  if (indication.maxDose) {

    referenceMaximum.textContent =
      `${formatNumber(indication.maxDose, 0)} mg/dose`;

  } else if (indication.maxDaily) {

    referenceMaximum.textContent =
      `${formatNumber(indication.maxDaily, 0)} mg/day`;

  } else {

    referenceMaximum.textContent = "طبق رفرنس";
  }

  referenceNote.textContent = indication.note || "";

  showElement(doseReference);
}

function onStrengthChange() {
  clearError();
  clearResult();
}

/* ============================================================
 * Validation
 * ============================================================
 */

function validateForm() {

  const weight = normalizeNumber(weightInput.value);

  if (!Number.isFinite(weight) || weight <= 0) {
    return "لطفاً وزن معتبر کودک را وارد کنید.";
  }

  if (weight > 300) {
    return "وزن واردشده غیرواقعی به نظر می‌رسد؛ مقدار را بررسی کنید.";
  }

  if (!drugSelect.value) {
    return "لطفاً آنتی‌بیوتیک را انتخاب کنید.";
  }

  if (!indicationSelect.value) {
    return "لطفاً اندیکاسیون یا نوع عفونت را انتخاب کنید.";
  }

  if (!strengthSelect.value) {
    return "لطفاً غلظت فرآورده را انتخاب کنید.";
  }

  const drug = getDrug(drugSelect.value);
  const indication = getIndication(
    drug,
    indicationSelect.value
  );

  /*
   * We do not infer age from weight.
   * Instead, when a regimen has a minimum age,
   * we explicitly remind the user that age verification
   * is necessary.
   */

  if (drug.minAge > 0 || indication.minAge > 0) {

    const minimum =
      Math.max(
        drug.minAge || 0,
        indication.minAge || 0
      );

    const minimumText =
      minimum < 1
        ? `${formatNumber(minimum * 12, 0)} ماه`
        : `${formatNumber(minimum, 1)} سال`;

    return {
      requiresAgeCheck: true,
      message:
        `این رژیم محدودیت سنی دارد (حداقل حدود ${minimumText}). ` +
        `سن کودک در این نسخه از ابزار وارد نمی‌شود؛ ` +
        `لطفاً قبل از استفاده، سن بیمار را با رفرنس دارویی تطبیق دهید.`
    };
  }

  return null;
}

/* ============================================================
 * Calculation
 * ============================================================
 */

function calculate() {

  clearError();
  clearResult();

  const validation = validateForm();

  if (typeof validation === "string") {
    showError(validation);
    return;
  }

  if (validation?.requiresAgeCheck) {

    showError(validation.message);

    /*
     * We intentionally stop calculation rather than silently
     * calculating a regimen whose minimum age has not been checked.
     */

    return;
  }

  const weight = normalizeNumber(weightInput.value);

  const drug = getDrug(drugSelect.value);

  const indication = getIndication(
    drug,
    indicationSelect.value
  );

  const strength = getStrength(
    drug,
    strengthSelect.value
  );

  if (!drug || !indication || !strength) {
    showError("اطلاعات انتخاب‌شده کامل نیست.");
    return;
  }

  const result = calculateDose(
    weight,
    indication,
    strength
  );

  renderResult(
    weight,
    drug,
    indication,
    strength,
    result
  );
}

/* ============================================================
 * Render result
 * ============================================================
 */

function renderResult(
  weight,
  drug,
  indication,
  strength,
  result
) {

  resultPatient.textContent =
    `${formatNumber(weight, 1)} kg`;

  resultConcentration.textContent =
    `${formatNumber(strength.mgPer5ml / 5, 1)} mg/mL`;

  resultDuration.textContent =
    indication.duration || "طبق اندیکاسیون";

  resultMaximum.textContent =
    indication.maxDose
      ? `${formatNumber(indication.maxDose, 0)} mg/dose`
      : indication.maxDaily
        ? `${formatNumber(indication.maxDaily, 0)} mg/day`
        : "طبق رفرنس";

  if (result.special) {

    resultMl.innerHTML =
      `${formatMl(result.day1Ml)} <small>mL</small>`;

    resultFrequency.textContent =
      "روز اول یک‌بار؛ روزهای ۲ تا ۵ یک‌بار در روز";

    resultDoseMg.textContent =
      `روز اول ${formatNumber(result.day1Mg, 0)} mg؛ ` +
      `روزهای ۲ تا ۵ روزانه ${formatNumber(result.nextMg, 0)} mg`;

    resultDaily.textContent =
      `${formatNumber(result.day1Mg, 0)} mg روز اول`;

    calculationSteps.innerHTML = `
      <div class="calculation-step">
        روز اول:
        <strong>
          ${formatNumber(weight, 1)} × 10 =
          ${formatNumber(weight * 10, 1)} mg
        </strong>
      </div>

      <div class="calculation-step">
        حجم روز اول:
        <strong>
          ${formatNumber(result.day1Mg, 1)} ÷
          ${formatNumber(strength.mgPer5ml / 5, 1)}
          =
          ${formatMl(result.day1Ml)} mL
        </strong>
      </div>

      <div class="calculation-step">
        روزهای ۲ تا ۵:
        <strong>
          ${formatNumber(weight, 1)} × 5 =
          ${formatNumber(weight * 5, 1)} mg
        </strong>
      </div>

      <div class="calculation-step">
        حجم هر یک از روزهای ۲ تا ۵:
        <strong>
          ${formatNumber(result.nextMg, 1)} ÷
          ${formatNumber(strength.mgPer5ml / 5, 1)}
          =
          ${formatMl(result.nextMl)} mL
        </strong>
      </div>
    `;

    resultAdministration.textContent =
      indication.administration ||
      "طبق نسخه و رفرنس دارویی.";

  } else {

    resultMl.innerHTML =
      `${getVolumeDisplay(result.volumeMl)} <small>mL</small>`;

    resultFrequency.textContent =
      `${indication.dosesPerDay} نوبت در روز · ${result.frequency}`;

    resultDoseMg.textContent =
      `${formatNumber(result.doseMg, 1)} mg در هر نوبت`;

    resultDaily.textContent =
      `${formatNumber(result.dailyMg, 1)} mg/day`;

    calculationSteps.innerHTML = `
      <div class="calculation-step">
        وزن:
        <strong>
          ${formatNumber(weight, 1)} kg
        </strong>
      </div>

      <div class="calculation-step">
        دوز روزانه:
        <strong>
          ${formatNumber(result.dailyMg, 1)} mg/day
        </strong>
      </div>

      <div class="calculation-step">
        دوز هر نوبت:
        <strong>
          ${formatNumber(result.doseMg, 1)} mg/dose
        </strong>
      </div>

      <div class="calculation-step">
        غلظت:
        <strong>
          ${formatNumber(strength.mgPer5ml / 5, 1)} mg/mL
        </strong>
      </div>

      <div class="calculation-step">
        حجم:
        <strong>
          ${formatNumber(result.doseMg, 1)} ÷
          ${formatNumber(strength.mgPer5ml / 5, 1)}
          =
          ${formatMl(result.volumeMl)} mL
        </strong>
      </div>
    `;

    resultAdministration.textContent =
      indication.administration ||
      "طبق نسخه و رفرنس دارویی.";
  }

  if (result.maxApplied) {

    resultWarning.innerHTML =
      `<strong>حداکثر دوز اعمال شد.</strong><br>` +
      `دوز محاسباتی بر اساس وزن از سقف تعریف‌شده برای این رژیم بیشتر بود؛ ` +
      `بنابراین حداکثر دوز اعمال شده است.`;

    showElement(resultWarning);
  }

  showElement(resultSection);

  resultSection.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
}

/* ============================================================
 * Copy result
 * ============================================================
 */

function buildCopyText() {

  const drug = getDrug(drugSelect.value);
  const indication = getIndication(
    drug,
    indicationSelect.value
  );
  const strength = getStrength(
    drug,
    strengthSelect.value
  );

  if (!drug || !indication || !strength) {
    return "";
  }

  const weight = normalizeNumber(weightInput.value);

  const result = calculateDose(
    weight,
    indication,
    strength
  );

  let text = "";

  text += "Saphira — Pediatric Dose Calculator\n";
  text += "-----------------------------------\n";
  text += `Drug: ${drug.name}\n`;
  text += `Indication: ${indication.name}\n`;
  text += `Weight: ${formatNumber(weight, 1)} kg\n`;
  text += `Strength: ${strength.label}\n\n`;

  if (result.special) {

    text +=
      `Day 1: ${formatMl(result.day1Ml)} mL ` +
      `(${formatNumber(result.day1Mg, 0)} mg) once\n`;

    text +=
      `Days 2–5: ${formatMl(result.nextMl)} mL ` +
      `(${formatNumber(result.nextMg, 0)} mg) once daily\n`;

  } else {

    text +=
      `Dose: ${formatMl(result.volumeMl)} mL ` +
      `(${formatNumber(result.doseMg, 1)} mg) ` +
      `${result.frequency}\n`;

    text +=
      `Daily dose: ${formatNumber(result.dailyMg, 1)} mg/day\n`;
  }

  text +=
    `Duration: ${indication.duration || "according to indication"}\n\n`;

  text +=
    "Clinical verification required before administration.";

  return text;
}

async function copyResult() {

  const text = buildCopyText();

  if (!text) {
    showToast("ابتدا یک محاسبه انجام دهید.");
    return;
  }

  try {

    await navigator.clipboard.writeText(text);

    showToast("نتیجه کپی شد.");

  } catch {

    const textarea = document.createElement("textarea");

    textarea.value = text;

    textarea.style.position = "fixed";
    textarea.style.opacity = "0";

    document.body.appendChild(textarea);

    textarea.select();

    document.execCommand("copy");

    textarea.remove();

    showToast("نتیجه کپی شد.");
  }
}

/* ============================================================
 * Print
 * ============================================================
 */

function printResult() {

  if (resultSection.classList.contains("hidden")) {
    showToast("ابتدا یک محاسبه انجام دهید.");
    return;
  }

  window.print();
}

/* ============================================================
 * Reset
 * ============================================================
 */

function resetAll() {

  weightInput.value = "";

  drugSelect.value = "";

  indicationSelect.innerHTML =
    `<option value="">انتخاب اندیکاسیون...</option>`;

  strengthSelect.innerHTML =
    `<option value="">انتخاب غلظت...</option>`;

  hideElement(indicationField);
  hideElement(strengthField);

  clearError();
  clearResult();
  resetDoseReference();
  resetDrugInfo();

  weightInput.focus();
}

/* ============================================================
 * Theme
 * ============================================================
 */

function applyTheme(theme) {

  document.body.dataset.theme = theme;

  const dark = theme === "dark";

  themeIcon.textContent = dark ? "🌙" : "☀️";

  themeToggle.setAttribute(
    "aria-label",
    dark
      ? "فعال کردن حالت روشن"
      : "فعال کردن حالت تاریک"
  );

  themeToggle.title =
    dark
      ? "حالت روشن"
      : "حالت تاریک";
}

function initTheme() {

  const saved =
    localStorage.getItem(STORAGE_KEY);

  if (saved === "dark" || saved === "light") {

    applyTheme(saved);
    return;
  }

  const prefersDark =
    window.matchMedia &&
    window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

  applyTheme(
    prefersDark ? "dark" : "light"
  );
}

function toggleTheme() {

  const current =
    document.body.dataset.theme || "light";

  const next =
    current === "dark"
      ? "light"
      : "dark";

  localStorage.setItem(
    STORAGE_KEY,
    next
  );

  applyTheme(next);
}

/* ============================================================
 * Toast
 * ============================================================
 */

let toastTimer;

function showToast(message) {

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer =
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2200);
}

/* ============================================================
 * Keyboard UX
 * ============================================================
 */

function handleEnterKey(event) {

  if (event.key !== "Enter") return;

  if (
    document.activeElement === weightInput ||
    document.activeElement === indicationSelect ||
    document.activeElement === strengthSelect
  ) {

    event.preventDefault();

    calculate();
  }
}

/* ============================================================
 * Event listeners
 * ============================================================
 */

drugSelect.addEventListener(
  "change",
  onDrugChange
);

indicationSelect.addEventListener(
  "change",
  updateReference
);

strengthSelect.addEventListener(
  "change",
  onStrengthChange
);

calculateButton.addEventListener(
  "click",
  calculate
);

resetButton.addEventListener(
  "click",
  resetAll
);

copyButton.addEventListener(
  "click",
  copyResult
);

printButton.addEventListener(
  "click",
  printResult
);

themeToggle.addEventListener(
  "click",
  toggleTheme
);

document.addEventListener(
  "keydown",
  handleEnterKey
);

/* ============================================================
 * Live input cleanup
 * ============================================================
 */

weightInput.addEventListener(
  "input",
  () => {

    clearError();
    clearResult();

    const value =
      normalizeNumber(weightInput.value);

    if (
      Number.isFinite(value) &&
      value > 0
    ) {
      weightInput.setCustomValidity("");
    }
  }
);

/* ============================================================
 * Initialization
 * ============================================================
 */

function init() {

  initTheme();

  populateDrugs();

  resetDoseReference();
  resetDrugInfo();
  clearResult();
  clearError();
}

init();
