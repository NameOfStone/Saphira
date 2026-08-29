/* ================================================================
   دیتابیس داروهای وزن‌محور (کامل‌شده با منابع معتبر)
   ================================================================ */

const DRUGS = [
  // ---------- ضددرد / ضدتب ----------
  {
    id: "acetaminophen",
    name: "Acetaminophen شربت",
    notes: `✅ اندیکاسیون‌ها: تب، درد خفیف تا متوسط (گوش‌درد، گلودرد، دندان‌درد، سردرد، پس از واکسیناسیون).
✅ دوز: ۱۰–۱۵ mg/kg هر ۴–۶ ساعت (حداکثر ۶۰–۷۵ mg/kg/day).
⚠️ در بیماری کبدی یا سوءتغذیه دوز را کاهش دهید.
⚠️ غلظت‌های مختلف (۱۲۰ و ۱۶۰ mg/5ml) را به والدین توضیح دهید.
⚠️ همراه غذا یا بدون غذا قابل مصرف است.
⚠️ حداکثر روزانه برای کودکان ≤ ۶ سال: ۲۴۰۰ mg/day (معمولاً کمتر).`,
    strengths: [
      { id: "apap_120", label: "۱۲۰ mg/5ml", mgPer5ml: 120 },
      { id: "apap_160", label: "۱۶۰ mg/5ml", mgPer5ml: 160 }
    ],
    diseases: [
      {
        id: "apap_fever",
        name: "تب / درد خفیف تا متوسط",
        mgPerKgPerDay: 60,
        dosesPerDay: 4,
        days: 3,
        maxMgPerKgPerDay: 75,
        extraNote: "۱۰–۱۵ mg/kg هر ۴–۶ ساعت (معادل ۶۰ mg/kg/day در ۴ نوبت)."
      }
    ]
  },
  {
    id: "ibuprofen",
    name: "Ibuprofen سوسپانسیون",
    notes: `✅ اندیکاسیون‌ها: تب (در صورت عدم پاسخ به استامینوفن)، درد التهابی (اوتیت، دندان‌درد، گلودرد، درد عضلانی).
✅ دوز: ۵–۱۰ mg/kg هر ۶–۸ ساعت (حداکثر ۳۰–۴۰ mg/kg/day).
⚠️ همراه غذا مصرف شود تا تحریک گوارشی کاهش یابد.
⚠️ در کم‌آبی، استفراغ شدید، بیماری کلیوی، زخم گوارشی با احتیاط.
⚠️ در آسم وابسته به NSAID یا حساسیت به آسپرین ممنوع.`,
    strengths: [
      { id: "ibu_100", label: "۱۰۰ mg/5ml", mgPer5ml: 100 }
    ],
    diseases: [
      {
        id: "ibu_fever",
        name: "تب / درد التهابی",
        mgPerKgPerDay: 30,
        dosesPerDay: 3,
        days: 3,
        maxMgPerKgPerDay: 40,
        extraNote: "معمولاً ۳۰ mg/kg/day در ۳ نوبت (هر نوبت ۱۰ mg/kg)."
      }
    ]
  },

  // ---------- آنتی‌بیوتیک‌ها ----------
  {
    id: "amoxicillin",
    name: "Amoxicillin شربت",
    notes: `✅ اندیکاسیون‌ها: اوتیت میانی، فارنژیت استرپتوکوکی، سینوزیت، پنومونی خفیف، عفونت ادراری.
✅ دوز معمول: ۴۰–۴۵ mg/kg/day در ۲–۳ نوبت.
✅ دوز بالا (AOM، سینوزیت، CAP مقاوم): ۸۰–۹۰ mg/kg/day در ۲ نوبت.
⚠️ همراه غذا برای کاهش عوارض گوارشی.
⚠️ در آلرژی شدید به پنی‌سیلین ممنوع.
⚠️ در مونونوکلئوز عفونی ممکن است راش ایجاد کند (نه لزوماً آلرژی).
⚠️ شربت را قبل از مصرف تکان دهید و در یخچال نگهداری کنید.`,
    strengths: [
      { id: "amox_125", label: "۱۲۵ mg/5ml", mgPer5ml: 125 },
      { id: "amox_250", label: "۲۵۰ mg/5ml", mgPer5ml: 250 },
      { id: "amox_200", label: "۲۰۰ mg/5ml", mgPer5ml: 200 },
      { id: "amox_400", label: "۴۰۰ mg/5ml", mgPer5ml: 400 }
    ],
    diseases: [
      {
        id: "amox_mild_tds",
        name: "عفونت خفیف – ۳ بار در روز",
        mgPerKgPerDay: 45,
        dosesPerDay: 3,
        days: 7,
        extraNote: "۴۵ mg/kg/day در ۳ نوبت (هر نوبت ۱۵ mg/kg)."
      },
      {
        id: "amox_mild_bd",
        name: "عفونت خفیف – ۲ بار در روز",
        mgPerKgPerDay: 45,
        dosesPerDay: 2,
        days: 7,
        extraNote: "۴۵ mg/kg/day در ۲ نوبت (هر نوبت ۲۲٫۵ mg/kg)."
      },
      {
        id: "amox_high_bd",
        name: "AOM / سینوزیت / CAP – دوز بالا (۲ بار)",
        mgPerKgPerDay: 90,
        dosesPerDay: 2,
        days: 10,
        extraNote: "۹۰ mg/kg/day در ۲ نوبت (۴۵ mg/kg هر نوبت) برای پوشش پنوموکوک مقاوم."
      }
    ]
  },
  {
    id: "amoxiclav",
    name: "Amoxicillin/Clavulanate (Co-amoxiclav)",
    notes: `✅ اندیکاسیون‌ها: AOM، سینوزیت، عفونت تنفسی تحتانی، عفونت پوستی (زمانی که به آموکسی‌سیلین پاسخ نداده یا مظنون به بتالاکتاماز).
✅ دوز بر اساس جزء آموکسی‌سیلین: ۴۰–۴۵ mg/kg/day (معمول) یا ۸۰–۹۰ mg/kg/day (دوز بالا).
⚠️ همراه غذا برای کاهش تهوع و اسهال.
⚠️ در سابقه هپاتیت کولستاتیک ناشی از دارو ممنوع.
⚠️ اسهال، کاندیدیازیس دهانی و پوشکی شایع است.
⚠️ برای عفونت‌های ساده از آنتی‌بیوتیک‌های با طیف باریک‌تر استفاده کنید.`,
    strengths: [
      { id: "amcl_156", label: "۱۵۶ (۱۲۵/۳۱٫۲۵) mg/5ml – بر اساس ۱۲۵ mg آموکسی‌سیلین", mgPer5ml: 125 },
      { id: "amcl_228", label: "۲۲۸ (۲۰۰/۲۸٫۵) mg/5ml – بر اساس ۲۰۰ mg", mgPer5ml: 200 },
      { id: "amcl_312", label: "۳۱۲ (۲۵۰/۶۲٫۵) mg/5ml – بر اساس ۲۵۰ mg", mgPer5ml: 250 },
      { id: "amcl_457", label: "۴۵۷ (۴۰۰/۵۷) mg/5ml – بر اساس ۴۰۰ mg", mgPer5ml: 400 },
      { id: "amcl_643", label: "۶۴۳ (۶۰۰/۴۲٫۹) mg/5ml – بر اساس ۶۰۰ mg", mgPer5ml: 600 }
    ],
    diseases: [
      {
        id: "amcl_mild_tds",
        name: "عفونت خفیف–متوسط – ۳ بار در روز",
        mgPerKgPerDay: 45,
        dosesPerDay: 3,
        days: 7,
        extraNote: "۴۵ mg/kg/day بر اساس آموکسی‌سیلین در ۳ نوبت."
      },
      {
        id: "amcl_mild_bd",
        name: "عفونت خفیف–متوسط – ۲ بار در روز",
        mgPerKgPerDay: 45,
        dosesPerDay: 2,
        days: 7,
        extraNote: "۴۵ mg/kg/day در ۲ نوبت."
      },
      {
        id: "amcl_high_bd",
        name: "AOM / سینوزیت باکتریال – دوز بالا (۲ بار)",
        mgPerKgPerDay: 90,
        dosesPerDay: 2,
        days: 10,
        extraNote: "۹۰ mg/kg/day در ۲ نوبت برای موارد مقاوم."
      }
    ]
  },
  {
    id: "cephalexin",
    name: "Cephalexin شربت",
    notes: `✅ اندیکاسیون‌ها: عفونت پوستی (امپتیگو، سلولیت)، عفونت ادراری خفیف، فارنژیت استرپتوکی (در عدم تحمل پنی‌سیلین غیرآنافیلاکسی).
✅ دوز: ۲۵–۵۰ mg/kg/day در ۲–۴ نوبت (عفونت شدید: تا ۷۵–۱۰۰ mg/kg/day).
⚠️ در آلرژی آنافیلاکتیک به پنی‌سیلین با احتیاط.
⚠️ همراه غذا یا بدون غذا مصرف شود.
⚠️ دفعات زیاد مصرف ممکن است پایبندی را کاهش دهد.`,
    strengths: [
      { id: "ceph_125", label: "۱۲۵ mg/5ml", mgPer5ml: 125 },
      { id: "ceph_250", label: "۲۵۰ mg/5ml", mgPer5ml: 250 }
    ],
    diseases: [
      {
        id: "ceph_mild",
        name: "UTI خفیف / فارنژیت / SSTI خفیف",
        mgPerKgPerDay: 40,
        dosesPerDay: 3,
        days: 7,
        extraNote: "۴۰ mg/kg/day در ۳ نوبت."
      },
      {
        id: "ceph_severe",
        name: "SSTI شدید",
        mgPerKgPerDay: 80,
        dosesPerDay: 4,
        days: 10,
        maxMgPerKgPerDay: 100,
        extraNote: "۸۰–۱۰۰ mg/kg/day در ۴ نوبت."
      }
    ]
  },
  {
    id: "cefixime",
    name: "Cefixime سوسپانسیون",
    notes: `✅ اندیکاسیون‌ها: UTI غیرپیچیده، AOM، سینوزیت، CAP خفیف.
✅ دوز: ۸ mg/kg/day یک‌بار در روز (یا ۴ mg/kg هر ۱۲ ساعت).
⚠️ پوشش ضعیف روی MSSA، برای عفونت پوستی انتخاب اول نیست.
⚠️ اسهال شایع است.
⚠️ همراه غذا یا بدون غذا قابل مصرف است.`,
    strengths: [
      { id: "cefi_100", label: "۱۰۰ mg/5ml", mgPer5ml: 100 }
    ],
    diseases: [
      {
        id: "cefi_od",
        name: "UTI / AOM / سینوزیت – یک‌بار در روز",
        mgPerKgPerDay: 8,
        dosesPerDay: 1,
        days: 7,
        extraNote: "۸ mg/kg/day یک‌بار در روز."
      },
      {
        id: "cefi_bd",
        name: "UTI / AOM / سینوزیت – دو بار در روز",
        mgPerKgPerDay: 8,
        dosesPerDay: 2,
        days: 7,
        extraNote: "۸ mg/kg/day در ۲ نوبت (هر نوبت ۴ mg/kg)."
      }
    ]
  },
  {
    id: "cefuroxime",
    name: "Cefuroxime سوسپانسیون",
    notes: `✅ اندیکاسیون‌ها: AOM، سینوزیت، CAP خفیف تا متوسط، SSTI.
✅ دوز: ۲۰–۳۰ mg/kg/day در ۲ نوبت (هر ۱۲ ساعت).
⚠️ همراه غذا برای جذب بهتر.
⚠️ طعم ناخوشایند ممکن است؛ به والدین توضیح دهید.
⚠️ جایگزین Amoxiclav در عفونت‌های تنفسی.`,
    strengths: [
      { id: "cefu_125", label: "۱۲۵ mg/5ml", mgPer5ml: 125 },
      { id: "cefu_250", label: "۲۵۰ mg/5ml", mgPer5ml: 250 }
    ],
    diseases: [
      {
        id: "cefu_resp",
        name: "AOM / سینوزیت / CAP / SSTI",
        mgPerKgPerDay: 25,
        dosesPerDay: 2,
        days: 7,
        extraNote: "۲۵ mg/kg/day در ۲ نوبت."
      }
    ]
  },
  {
    id: "azithromycin",
    name: "Azithromycin سوسپانسیون",
    notes: `✅ اندیکاسیون‌ها: فارنژیت (در حساسیت به بتالاکتام)، AOM، پنومونی آتیپیک (مایکوپلاسما، کلامیدیا).
✅ رژیم ۳ روزه: ۱۰ mg/kg/day یک‌بار در روز به مدت ۳ روز.
✅ رژیم ۵ روزه: روز اول ۱۰ mg/kg، روزهای ۲–۵: ۵ mg/kg.
⚠️ نیمه‌عمر طولانی.
⚠️ عوارض گوارشی (تهوع، درد شکم، اسهال) شایع است.
⚠️ فاصله QT را طولانی می‌کند؛ در بیماران قلبی یا مصرف داروهای طولانی‌کننده QT احتیاط.`,
    strengths: [
      { id: "azi_100", label: "۱۰۰ mg/5ml", mgPer5ml: 100 },
      { id: "azi_200", label: "۲۰۰ mg/5ml", mgPer5ml: 200 }
    ],
    diseases: [
      {
        id: "azi_3day",
        name: "رژیم ۳ روزه",
        mgPerKgPerDay: 10,
        dosesPerDay: 1,
        days: 3,
        extraNote: "۱۰ mg/kg/day یک‌بار در روز به مدت ۳ روز."
      },
      {
        id: "azi_5day",
        name: "رژیم ۵ روزه",
        mgPerKgPerDay: 10,
        dosesPerDay: 1,
        days: 5,
        extraNote: "روز اول ۱۰ mg/kg، روزهای ۲–۵: ۵ mg/kg."
      }
    ]
  },
  {
    id: "clarithromycin",
    name: "Clarithromycin سوسپانسیون",
    notes: `✅ اندیکاسیون‌ها: عفونت تنفسی فوقانی و تحتانی، بخشی از رژیم H. pylori، جایگزین در آلرژی به پنی‌سیلین.
✅ دوز: ۱۵ mg/kg/day در ۲ نوبت.
⚠️ همراه غذا برای تحمل گوارشی بهتر.
⚠️ طعم فلزی دهان و تهوع شایع است.
⚠️ مهارکننده CYP3A4؛ تداخلات دارویی را بررسی کنید.`,
    strengths: [
      { id: "clar_125", label: "۱۲۵ mg/5ml", mgPer5ml: 125 },
      { id: "clar_250", label: "۲۵۰ mg/5ml", mgPer5ml: 250 }
    ],
    diseases: [
      {
        id: "clar_resp",
        name: "عفونت تنفسی فوقانی / تحتانی",
        mgPerKgPerDay: 15,
        dosesPerDay: 2,
        days: 10,
        extraNote: "۱۵ mg/kg/day در ۲ نوبت به مدت ۷–۱۰ روز."
      }
    ]
  },
  {
    id: "clindamycin",
    name: "Clindamycin سوسپانسیون",
    notes: `✅ اندیکاسیون‌ها: SSTI (با شک به MRSA)، عفونت دندانی، فارنژیت استرپتوکی در حساسیت شدید به بتالاکتام.
✅ دوز: ۲۰–۴۰ mg/kg/day در ۳–۴ نوبت (هر ۶–۸ ساعت).
⚠️ خطر کولیت ناشی از Clostridioides difficile؛ در صورت اسهال شدید یا خونی، سریعاً ارزیابی شود.
⚠️ همراه با یک لیوان آب مصرف شود و کودک تا چند دقیقه نخوابد.
⚠️ طعم ناخوشایند دهانی شایع است.`,
    strengths: [
      { id: "clin_75", label: "۷۵ mg/5ml", mgPer5ml: 75 }
    ],
    diseases: [
      {
        id: "clin_ssti",
        name: "SSTI / عفونت دندانی / فارنژیت",
        mgPerKgPerDay: 30,
        dosesPerDay: 3,
        days: 10,
        maxMgPerKgPerDay: 40,
        extraNote: "۳۰ mg/kg/day در ۳ نوبت (محدوده ۲۰–۴۰)."
      }
    ]
  },
  {
    id: "metronidazole",
    name: "Metronidazole شربت",
    notes: `✅ اندیکاسیون‌ها: ژیاردیاز، آمیبیاز روده‌ای، عفونت بی‌هوازی.
✅ دوز: ۳۰–۵۰ mg/kg/day در ۳ نوبت (هر ۸ ساعت).
⚠️ همراه با غذا برای کاهش تهوع.
⚠️ طعم فلزی دهان و تیره شدن ادرار (بی‌خطر).
⚠️ همراه با الکل ممنوع (واکنش شبه دی‌سولفیرام).
⚠️ در صورت بروز علائم عصبی (بی‌حسی، گزگز) در مصرف طولانی‌مدت ارزیابی شود.`,
    strengths: [
      { id: "metro_125", label: "۱۲۵ mg/5ml", mgPer5ml: 125 }
    ],
    diseases: [
      {
        id: "metro_gi",
        name: "ژیاردیا / آمیبیاز / عفونت بی‌هوازی",
        mgPerKgPerDay: 40,
        dosesPerDay: 3,
        days: 7,
        maxMgPerKgPerDay: 50,
        extraNote: "۴۰ mg/kg/day در ۳ نوبت."
      }
    ]
  },
  {
    id: "tmpsmx",
    name: "Co-trimoxazole (TMP-SMX) شربت",
    notes: `✅ اندیکاسیون‌ها: UTI، SSTI (از جمله بعضی MRSA)، پروفیلاکسی/درمان PCP.
✅ دوز بر اساس جزء TMP: ۸ mg TMP/kg/day در ۲ نوبت.
⚠️ در آلرژی به سولفونامیدها ممنوع.
⚠️ می‌تواند پتاسیم را افزایش دهد.
⚠️ در شیرخواران خیلی کوچک و اواخر بارداری با احتیاط.`,
    strengths: [
      { id: "tmp_40", label: "۴۰ mg TMP/5ml (فرمول ۴۰/۲۰۰)", mgPer5ml: 40 }
    ],
    diseases: [
      {
        id: "tmp_uti",
        name: "UTI / SSTI خفیف",
        mgPerKgPerDay: 8,
        dosesPerDay: 2,
        days: 10,
        extraNote: "۸ mg TMP/kg/day در ۲ نوبت."
      }
    ]
  },

  // ---------- ضداحتقان‌ها ----------
  {
    id: "pseudoephedrine",
    name: "Pseudoephedrine شربت",
    notes: `✅ اندیکاسیون‌ها: احتقان بینی ناشی از سرماخوردگی، آلرژی، سینوزیت.
✅ دوز: ۴ mg/kg/day در ۴ نوبت (هر ۴–۶ ساعت). حداکثر ۱۲۰ mg/day.
⚠️ در کودکان زیر ۴ سال معمولاً توصیه نمی‌شود.
⚠️ بی‌خوابی، تحریک‌پذیری، افزایش ضربان قلب و فشارخون.
⚠️ در بیماری قلبی، فشارخون بالا، پرکاری تیروئید، مصرف MAOI با احتیاط.`,
    strengths: [
      { id: "pse_15", label: "۱۵ mg/5ml", mgPer5ml: 15 },
      { id: "pse_30", label: "۳۰ mg/5ml", mgPer5ml: 30 }
    ],
    diseases: [
      {
        id: "pse_cold",
        name: "احتقان بینی / سینوزیت",
        mgPerKgPerDay: 4,
        dosesPerDay: 4,
        days: 5,
        maxMgPerKgPerDay: 4,
        extraNote: "۴ mg/kg/day در ۴ نوبت (حداکثر روزانه ۱۲۰ mg)."
      }
    ]
  },
  {
    id: "phenylephrine",
    name: "Phenylephrine شربت",
    notes: `✅ اندیکاسیون‌ها: احتقان بینی.
✅ دوز: ۱٫۵ mg/kg/day در ۶ نوبت (هر ۴ ساعت). حداکثر روزانه ~۱۵ mg.
⚠️ در کودکان با بیماری قلبی یا فشارخون بالا با احتیاط.
⚠️ همراه با MAOI ممنوع.
⚠️ از مصرف همزمان با سایر ضداحتقان‌ها اجتناب کنید.`,
    strengths: [
      { id: "phe_2_5", label: "۲٫۵ mg/5ml", mgPer5ml: 2.5 },
      { id: "phe_5", label: "۵ mg/5ml", mgPer5ml: 5 }
    ],
    diseases: [
      {
        id: "phe_cold",
        name: "احتقان بینی",
        mgPerKgPerDay: 1.5,
        dosesPerDay: 6,
        days: 5,
        maxMgPerKgPerDay: 1.5,
        extraNote: "۱٫۵ mg/kg/day در ۶ نوبت (حداکثر روزانه ~۱۵ mg)."
      }
    ]
  },
  {
    id: "chlorpheniramine",
    name: "Chlorpheniramine شربت",
    notes: `✅ اندیکاسیون‌ها: رینیت آلرژیک، کهیر حاد، آبریزش و عطسه.
✅ دوز: ۰٫۴ mg/kg/day در ۴ نوبت (هر نوبت ۰٫۱ mg/kg). حداکثر ۱۲ mg/day.
⚠️ نسل اول؛ خواب‌آلودگی، کاهش تمرکز؛ در کودکان خردسال ممکن است بی‌قراری پارادوکسیک ایجاد کند.
⚠️ در گلوکوم زاویه بسته، احتباس ادرار با احتیاط.
⚠️ با شربت‌های سرماخوردگی آماده تداخل دارد (جمع نشوند).`,
    strengths: [
      { id: "cpn_2", label: "۲ mg/5ml", mgPer5ml: 2 }
    ],
    diseases: [
      {
        id: "cpn_allergy",
        name: "رینیت آلرژیک / کهیر حاد",
        mgPerKgPerDay: 0.4,
        dosesPerDay: 4,
        days: 5,
        maxMgPerKgPerDay: 0.4,
        extraNote: "۰٫۴ mg/kg/day در ۴ نوبت (هر نوبت ۰٫۱ mg/kg)."
      }
    ]
  },
  {
    id: "diphenhydramine",
    name: "Diphenhydramine شربت",
    notes: `✅ اندیکاسیون‌ها: کهیر حاد، واکنش آلرژیک خفیف.
✅ دوز: ۴ mg/kg/day در ۴ نوبت (هر نوبت ۱ mg/kg). حداکثر ۵ mg/kg/day یا ۱۵۰ mg/day (هرکدام کمتر).
⚠️ خواب‌آور قوی؛ در کودکان خردسال ممکن است بی‌قراری پارادوکسیک ایجاد کند.
⚠️ برای درمان مزمن مناسب نیست.
⚠️ در کودکان زیر ۲ سال فقط با تجویز متخصص.`,
    strengths: [
      { id: "dph_12_5", label: "۱۲٫۵ mg/5ml", mgPer5ml: 12.5 }
    ],
    diseases: [
      {
        id: "dph_allergy",
        name: "آلرژی حاد / کهیر",
        mgPerKgPerDay: 4,
        dosesPerDay: 4,
        days: 3,
        maxMgPerKgPerDay: 5,
        extraNote: "۴ mg/kg/day در ۴ نوبت (حداکثر ۵ mg/kg/day)."
      }
    ]
  }
];

/* ================================================================
   دیتابیس آنتی‌هیستامین‌های سن‌محور
   ================================================================ */
const AGE_ANTIHISTAMINES = [
  {
    id: "cetirizine",
    name: "Cetirizine (ستیریزین) شربت",
    notes: `✅ اندیکاسیون‌ها: رینیت آلرژیک، کهیر مزمن.
✅ دوز بر اساس سن:
  • ۶ ماه – ۲ سال: ۲٫۵ mg/day
  • ۲ – ۶ سال: ۵ mg/day
  • ≥ ۶ سال: ۱۰ mg/day
⚠️ نسل دوم؛ خواب‌آلودگی کمتر اما ممکن است رخ دهد.
⚠️ در نارسایی کلیوی دوز را کاهش دهید.
⚠️ معمولاً یک‌بار در روز (ترجیحاً عصر).`,
    strengths: [
      { id: "ctz_5", label: "۵ mg/5ml", mgPer5ml: 5 }
    ],
    ageBands: [
      { id: "ctz_0_2", label: "۶ ماه تا ۲ سال", minAge: 0.5, maxAge: 2, mgPerDay: 2.5, dosesPerDay: 1, note: "۲٫۵ mg/day یک‌بار." },
      { id: "ctz_2_6", label: "۲ تا ۶ سال", minAge: 2, maxAge: 6, mgPerDay: 5, dosesPerDay: 1, note: "۵ mg/day یک‌بار." },
      { id: "ctz_6plus", label: "۶ سال و بالاتر", minAge: 6, maxAge: 18, mgPerDay: 10, dosesPerDay: 1, note: "۱۰ mg/day یک‌بار." }
    ]
  },
  {
    id: "loratadine",
    name: "Loratadine (لوراتادین) شربت",
    notes: `✅ اندیکاسیون‌ها: رینیت آلرژیک، کهیر مزمن.
✅ دوز بر اساس سن:
  • ۲ – ۶ سال: ۵ mg/day
  • ≥ ۶ سال: ۱۰ mg/day
⚠️ نسل دوم؛ خواب‌آلودگی بسیار کم.
⚠️ در نارسایی کبدی دوز تعدیل شود.
⚠️ یک‌بار در روز.`,
    strengths: [
      { id: "lor_5", label: "۵ mg/5ml", mgPer5ml: 5 }
    ],
    ageBands: [
      { id: "lor_2_6", label: "۲ تا ۶ سال", minAge: 2, maxAge: 6, mgPerDay: 5, dosesPerDay: 1, note: "۵ mg/day یک‌بار." },
      { id: "lor_6plus", label: "۶ سال و بالاتر", minAge: 6, maxAge: 18, mgPerDay: 10, dosesPerDay: 1, note: "۱۰ mg/day یک‌بار." }
    ]
  },
  {
    id: "fexofenadine",
    name: "Fexofenadine (فکسوفنادین) شربت",
    notes: `✅ اندیکاسیون‌ها: رینیت آلرژیک، کهیر مزمن.
✅ دوز برای شربت ۳۰ mg/5ml:
  • ۲ – ۱۱ سال: ۳۰ mg دو بار در روز (جمعاً ۶۰ mg/day)
⚠️ نسل دوم؛ تقریباً بدون خواب‌آلودگی.
⚠️ همراه آب‌میوه (گریپ‌فروت، پرتقال، سیب) مصرف نشود (کاهش جذب).
⚠️ برای کهیر مزمن ممکن است دوز بالاتر نیاز باشد (تحت نظر پزشک).`,
    strengths: [
      { id: "fexo_30", label: "۳۰ mg/5ml", mgPer5ml: 30 }
    ],
    ageBands: [
      { id: "fexo_2_11", label: "۲ تا ۱۱ سال", minAge: 2, maxAge: 12, mgPerDay: 60, dosesPerDay: 2, note: "۳۰ mg دو بار در روز." }
    ]
  }
];

/* ================================================================
   توابع کمکی
   ================================================================ */
function findDrugById(id) {
  return DRUGS.find(d => d.id === id) || null;
}
function findStrength(drug, strengthId) {
  return drug?.strengths?.find(s => s.id === strengthId) || null;
}
function findDisease(drug, diseaseId) {
  return drug?.diseases?.find(d => d.id === diseaseId) || null;
}
function findAgeDrugById(id) {
  return AGE_ANTIHISTAMINES.find(d => d.id === id) || null;
}

function toPersianDigits(num) {
  const map = { '0': '۰', '1': '۱', '2': '۲', '3': '۳', '4': '۴', '5': '۵', '6': '۶', '7': '۷', '8': '۸', '9': '۹' };
  return num.toString().replace(/[0-9]/g, d => map[d]);
}

/* ================================================================
   گرفتن المان‌ها
   ================================================================ */
const weightMode = document.getElementById("weightMode");
const ageMode = document.getElementById("ageMode");
const tabWeight = document.getElementById("tabWeight");
const tabAge = document.getElementById("tabAge");

const weightInput = document.getElementById("weight");
const drugSelect = document.getElementById("drugSelect");
const strengthSelect = document.getElementById("strengthSelect");
const diseaseSelect = document.getElementById("diseaseSelect");
const drugNotesWrapper = document.getElementById("drugNotesWrapper");
const drugNotes = document.getElementById("drugNotes");
const strengthWrapper = document.getElementById("strengthWrapper");
const diseaseWrapper = document.getElementById("diseaseWrapper");
const doseInfoWrapper = document.getElementById("doseInfoWrapper");
const doseInfo = document.getElementById("doseInfo");
const resultDiv = document.getElementById("result");
const calcBtn = document.getElementById("calcBtn");
const resetBtn = document.getElementById("resetBtn");

const ageDrugSelect = document.getElementById("ageDrugSelect");
const ageYearsInput = document.getElementById("ageYears");
const ageDrugNotesWrapper = document.getElementById("ageDrugNotesWrapper");
const ageDrugNotes = document.getElementById("ageDrugNotes");
const ageStrengthWrapper = document.getElementById("ageStrengthWrapper");
const ageStrengthSelect = document.getElementById("ageStrengthSelect");
const ageDoseInfoWrapper = document.getElementById("ageDoseInfoWrapper");
const ageDoseInfo = document.getElementById("ageDoseInfo");
const ageCalcBtn = document.getElementById("ageCalcBtn");
const ageResultDiv = document.getElementById("ageResult");

const themeSwitch = document.getElementById("themeSwitch");
const themeIcon = document.getElementById("themeIcon");

/* ================================================================
   پر کردن لیست‌ها
   ================================================================ */
function populateDrugs() {
  DRUGS.forEach(drug => {
    const opt = document.createElement("option");
    opt.value = drug.id;
    opt.textContent = drug.name;
    drugSelect.appendChild(opt);
  });
}
function populateAgeDrugs() {
  AGE_ANTIHISTAMINES.forEach(drug => {
    const opt = document.createElement("option");
    opt.value = drug.id;
    opt.textContent = drug.name;
    ageDrugSelect.appendChild(opt);
  });
}

/* ================================================================
   تب‌ها
   ================================================================ */
tabWeight.addEventListener("click", () => {
  tabWeight.classList.add("active");
  tabAge.classList.remove("active");
  weightMode.classList.remove("hidden");
  ageMode.classList.add("hidden");
});
tabAge.addEventListener("click", () => {
  tabAge.classList.add("active");
  tabWeight.classList.remove("active");
  ageMode.classList.remove("hidden");
  weightMode.classList.add("hidden");
});

/* ================================================================
   تغییر دارو (وزن‌محور)
   ================================================================ */
drugSelect.addEventListener("change", () => {
  const drug = findDrugById(drugSelect.value);

  strengthSelect.innerHTML = "";
  diseaseSelect.innerHTML = "";
  strengthWrapper.classList.add("hidden");
  diseaseWrapper.classList.add("hidden");
  drugNotesWrapper.classList.add("hidden");
  doseInfoWrapper.classList.add("hidden");
  resultDiv.classList.add("hidden");
  drugNotes.textContent = "";
  doseInfo.innerHTML = "";
  resultDiv.innerHTML = "";

  if (!drug) return;

  drugNotes.textContent = drug.notes || "نکته‌ای ثبت نشده است.";
  drugNotesWrapper.classList.remove("hidden");

  if (drug.strengths?.length) {
    drug.strengths.forEach(s => {
      const opt = document.createElement("option");
      opt.value = s.id;
      opt.textContent = s.label;
      strengthSelect.appendChild(opt);
    });
    strengthWrapper.classList.remove("hidden");
  }

  if (drug.diseases?.length) {
    diseaseSelect.innerHTML = '<option value="">-- بیماری / اندیکاسیون را انتخاب کنید --</option>';
    drug.diseases.forEach(d => {
      const opt = document.createElement("option");
      opt.value = d.id;
      opt.textContent = d.name;
      diseaseSelect.appendChild(opt);
    });
    diseaseWrapper.classList.remove("hidden");
  }
});

/* ================================================================
   انتخاب بیماری (وزن‌محور)
   ================================================================ */
diseaseSelect.addEventListener("change", () => {
  const drug = findDrugById(drugSelect.value);
  const disease = findDisease(drug, diseaseSelect.value);

  doseInfoWrapper.classList.add("hidden");
  doseInfo.innerHTML = "";

  if (!disease) return;

  const { mgPerKgPerDay, extraNote, dosesPerDay } = disease;
  let html = `
    <strong>دوز انتخاب‌شده:</strong><br />
    ${toPersianDigits(mgPerKgPerDay)} mg/kg/day &nbsp;|&nbsp; تعداد نوبت: ${toPersianDigits(dosesPerDay)} بار در روز
  `;
  if (extraNote) {
    html += `<br /><span style="font-size:12px; opacity:0.85;">${extraNote}</span>`;
  }
  doseInfo.innerHTML = html;
  doseInfoWrapper.classList.remove("hidden");
});

/* ================================================================
   محاسبه دوز (وزن‌محور)
   ================================================================ */
calcBtn.addEventListener("click", () => {
  const weight = parseFloat(weightInput.value);
  if (!weight || weight <= 0) {
    alert("لطفاً وزن معتبر وارد کنید.");
    return;
  }

  const drug = findDrugById(drugSelect.value);
  if (!drug) {
    alert("لطفاً ابتدا دارو را انتخاب کنید.");
    return;
  }

  const strength = findStrength(drug, strengthSelect.value);
  if (!strength) {
    alert("لطفاً غلظت شربت را انتخاب کنید.");
    return;
  }

  const disease = findDisease(drug, diseaseSelect.value);
  if (!disease) {
    alert("لطفاً بیماری / اندیکاسیون را انتخاب کنید.");
    return;
  }

  // ---------- رژیم ۵ روزه آزیترومایسین ----------
  if (drug.id === "azithromycin" && disease.id === "azi_5day") {
    const day1Mg = weight * 10;
    const day2_5Mg = weight * 5;
    const mlDay1 = day1Mg * (5 / strength.mgPer5ml);
    const mlNext = day2_5Mg * (5 / strength.mgPer5ml);

    const html = `
      <strong>وزن کودک: ${toPersianDigits(weight.toFixed(1))} کیلوگرم</strong><br /><br />
      <span style="display:block; background:var(--dose-bg); padding:8px; border-radius:8px; margin-bottom:6px;">
        <strong>روز اول:</strong> ${toPersianDigits(day1Mg.toFixed(1))} mg (۱۰ mg/kg) 
        → <span class="highlight-dose">${toPersianDigits(mlDay1.toFixed(1))} ml</span> یک‌بار
      </span>
      <span style="display:block; background:var(--dose-bg); padding:8px; border-radius:8px;">
        <strong>روزهای ۲ تا ۵:</strong> ${toPersianDigits(day2_5Mg.toFixed(1))} mg/day (۵ mg/kg) 
        → <span class="highlight-dose">${toPersianDigits(mlNext.toFixed(1))} ml</span> یک‌بار
      </span>
      <br />مدت درمان: <strong>۵ روز</strong>
    `;
    resultDiv.innerHTML = html;
    resultDiv.classList.remove("hidden");
    return;
  }

  // ---------- محاسبه عمومی ----------
  const totalMgPerDay = weight * disease.mgPerKgPerDay;
  const mgPerDose = totalMgPerDay / disease.dosesPerDay;
  const mlPerDose = mgPerDose * (5 / strength.mgPer5ml);
  const intervalHours = (24 / disease.dosesPerDay).toFixed(1);

  let html = `
    <strong>وزن کودک: ${toPersianDigits(weight.toFixed(1))} کیلوگرم</strong><br /><br />
    • دوز روزانه: <strong>${toPersianDigits(totalMgPerDay.toFixed(1))} mg</strong><br />
    • دوز هر نوبت: <strong>${toPersianDigits(mgPerDose.toFixed(1))} mg</strong><br />
    • حجم هر نوبت: <span class="highlight-dose">${toPersianDigits(mlPerDose.toFixed(1))} ml</span><br />
    • تعداد نوبت: <strong>${toPersianDigits(disease.dosesPerDay)}</strong> بار در روز<br />
    • فاصله نوبت‌ها: <span class="highlight-dose">${toPersianDigits(intervalHours)} ساعت</span><br />
    • مدت درمان: <strong>${toPersianDigits(disease.days)}</strong> روز
  `;

  // هشدار دوز بالا
  if (disease.maxMgPerKgPerDay) {
    const maxTotal = disease.maxMgPerKgPerDay * weight;
    if (totalMgPerDay > maxTotal) {
      html += `<br /><br /><span style="color:var(--warning-color);"><i class="fas fa-exclamation-triangle"></i> <strong>هشدار:</strong> دوز محاسبه‌شده (${toPersianDigits(totalMgPerDay.toFixed(1))} mg/day) از حداکثر مجاز (${toPersianDigits(maxTotal.toFixed(1))} mg/day) تجاوز کرده است. لطفاً بررسی کنید.</span>`;
    }
  }

  resultDiv.innerHTML = html;
  resultDiv.classList.remove("hidden");
});

/* ================================================================
   شروع مجدد (وزن‌محور)
   ================================================================ */
resetBtn.addEventListener("click", () => {
  weightInput.value = "";
  drugSelect.value = "";
  strengthSelect.innerHTML = "";
  diseaseSelect.innerHTML = "";
  strengthWrapper.classList.add("hidden");
  diseaseWrapper.classList.add("hidden");
  drugNotesWrapper.classList.add("hidden");
  doseInfoWrapper.classList.add("hidden");
  resultDiv.classList.add("hidden");
  drugNotes.textContent = "";
  doseInfo.innerHTML = "";
  resultDiv.innerHTML = "";
});

/* ================================================================
   آنتی‌هیستامین سن‌محور
   ================================================================ */
ageDrugSelect.addEventListener("change", () => {
  const drug = findAgeDrugById(ageDrugSelect.value);

  ageStrengthSelect.innerHTML = "";
  ageStrengthWrapper.classList.add("hidden");
  ageDrugNotesWrapper.classList.add("hidden");
  ageDoseInfoWrapper.classList.add("hidden");
  ageResultDiv.classList.add("hidden");
  ageDrugNotes.textContent = "";
  ageDoseInfo.innerHTML = "";

  if (!drug) return;

  ageDrugNotes.textContent = drug.notes || "نکته‌ای ثبت نشده است.";
  ageDrugNotesWrapper.classList.remove("hidden");

  if (drug.strengths?.length) {
    drug.strengths.forEach(s => {
      const opt = document.createElement("option");
      opt.value = s.id;
      opt.textContent = s.label;
      ageStrengthSelect.appendChild(opt);
    });
    ageStrengthWrapper.classList.remove("hidden");
  }

  updateAgeDoseInfo();
});

function getAgeBand(drug, ageYears) {
  if (!drug?.ageBands) return null;
  return drug.ageBands.find(b =>
    ageYears >= b.minAge && (b.maxAge == null || ageYears < b.maxAge)
  ) || null;
}

function updateAgeDoseInfo() {
  const ageYears = parseFloat(ageYearsInput.value);
  const drug = findAgeDrugById(ageDrugSelect.value);

  if (!drug || !Number.isFinite(ageYears) || ageYears <= 0) {
    ageDoseInfoWrapper.classList.add("hidden");
    ageDoseInfo.innerHTML = "";
    return;
  }

  const band = getAgeBand(drug, ageYears);
  if (!band) {
    ageDoseInfoWrapper.classList.add("hidden");
    ageDoseInfo.innerHTML = "";
    return;
  }

  const { mgPerDay, dosesPerDay, label, note } = band;
  let html = `
    <strong>${label}</strong><br />
    دوز روزانه: ${toPersianDigits(mgPerDay)} mg &nbsp;|&nbsp; ${toPersianDigits(dosesPerDay)} بار در روز
  `;
  if (note) html += `<br /><span style="font-size:12px; opacity:0.85;">${note}</span>`;
  ageDoseInfo.innerHTML = html;
  ageDoseInfoWrapper.classList.remove("hidden");
}

ageYearsInput.addEventListener("input", updateAgeDoseInfo);
ageDrugSelect.addEventListener("change", updateAgeDoseInfo);

/* ================================================================
   محاسبه دوز (سن‌محور)
   ================================================================ */
ageCalcBtn.addEventListener("click", () => {
  const ageYears = parseFloat(ageYearsInput.value);
  if (!Number.isFinite(ageYears) || ageYears <= 0) {
    alert("لطفاً سن معتبر وارد کنید.");
    return;
  }

  const drug = findAgeDrugById(ageDrugSelect.value);
  if (!drug) {
    alert("لطفاً داروی آنتی‌هیستامین را انتخاب کنید.");
    return;
  }

  const strength = drug.strengths.find(s => s.id === ageStrengthSelect.value);
  if (!strength) {
    alert("لطفاً غلظت شربت را انتخاب کنید.");
    return;
  }

  const band = getAgeBand(drug, ageYears);
  if (!band) {
    alert("برای این سن دوزی ثبت نشده است.");
    return;
  }

  const { mgPerDay, dosesPerDay, label } = band;
  const mgPerDose = mgPerDay / dosesPerDay;
  const mlPerDose = mgPerDose * (5 / strength.mgPer5ml);
  const intervalHours = (24 / dosesPerDay).toFixed(1);

  const html = `
    <strong>سن کودک: ${toPersianDigits(ageYears.toFixed(1))} سال</strong> (${label})<br /><br />
    • دوز روزانه: <strong>${toPersianDigits(mgPerDay)} mg</strong><br />
    • دوز هر نوبت: <strong>${toPersianDigits(mgPerDose.toFixed(1))} mg</strong><br />
    • حجم هر نوبت: <span class="highlight-dose">${toPersianDigits(mlPerDose.toFixed(1))} ml</span><br />
    • تعداد نوبت: <strong>${toPersianDigits(dosesPerDay)}</strong> بار در روز<br />
    • فاصله نوبت‌ها: <span class="highlight-dose">${toPersianDigits(intervalHours)} ساعت</span>
  `;
  ageResultDiv.innerHTML = html;
  ageResultDiv.classList.remove("hidden");
  updateAgeDoseInfo();
});

/* ================================================================
   تم روز/شب
   ================================================================ */
function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  themeSwitch.checked = theme === "dark";
  themeIcon.textContent = theme === "dark" ? "🌙" : "☀️";
}

(function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") {
    applyTheme(saved);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    applyTheme("dark");
  } else {
    applyTheme("light");
  }
})();

themeSwitch.addEventListener("change", () => {
  const theme = themeSwitch.checked ? "dark" : "light";
  applyTheme(theme);
  localStorage.setItem("theme", theme);
});

/* ================================================================
   پر کردن لیست‌ها در شروع
   ================================================================ */
populateDrugs();
populateAgeDrugs();

/* ================================================================
   افکت پس‌زمینه (حروف Saphira)
   ================================================================ */
(function initBackground() {
  const canvas = document.getElementById("sceneBg");
  const ctx = canvas.getContext("2d");
  const hero = document.querySelector(".hero");

  let W = window.innerWidth;
  let H = window.innerHeight;
  let textPoints = [];
  let particles = [];
  let startTime = performance.now();
  let lastPhase = null;

  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const CHAOS_DURATION = 4000;
  const FORM_DURATION = 4000;
  const HOLD_DURATION = 2000;
  const DISSOLVE_DURATION = 4000;
  const TOTAL_DURATION = CHAOS_DURATION + FORM_DURATION + HOLD_DURATION + DISSOLVE_DURATION;

  function buildTextPoints() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const heroRect = hero.getBoundingClientRect();
    const cx = heroRect.left + heroRect.width / 2;
    const cy = heroRect.top + heroRect.height / 2;
    const fontSize = Math.min(heroRect.height * 0.55, 120);

    const offscreen = document.createElement("canvas");
    offscreen.width = W;
    offscreen.height = H;
    const offCtx = offscreen.getContext("2d");
    offCtx.font = `bold ${fontSize}px system-ui, sans-serif`;
    offCtx.textAlign = "center";
    offCtx.textBaseline = "middle";
    offCtx.fillStyle = "#fff";
    offCtx.fillText("Saphira", cx, cy);

    const imageData = offCtx.getImageData(0, 0, W, H).data;
    const points = [];
    const step = 7;
    for (let y = 0; y < H; y += step) {
      for (let x = 0; x < W; x += step) {
        const idx = (y * W + x) * 4 + 3;
        if (imageData[idx] > 128) points.push({ x, y });
      }
    }
    textPoints = points;
  }

  function initParticles() {
    particles = [];
    if (!textPoints.length) return;
    const maxP = Math.min(1200, textPoints.length * 2);
    for (let i = 0; i < maxP; i++) {
      const tp = textPoints[i % textPoints.length];
      particles.push({
        char: LETTERS[Math.floor(Math.random() * LETTERS.length)],
        x: Math.random() * W,
        y: Math.random() * H,
        homeX: tp.x,
        homeY: tp.y,
        wanderX: Math.random() * W,
        wanderY: Math.random() * H,
        size: 10 + Math.random() * 6,
        phaseOffset: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2
      });
    }
  }

  function resetChaosVel() {
    for (const p of particles) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.4 + Math.random() * 1.2;
      p.vx = Math.cos(angle) * speed;
      p.vy = Math.sin(angle) * speed;
    }
  }

  function assignDissolveTargets() {
    for (const p of particles) {
      p.wanderX = Math.random() * W;
      p.wanderY = Math.random() * H;
    }
  }

  function getPhase(time) {
    const t = (time - startTime) % TOTAL_DURATION;
    if (t < CHAOS_DURATION) return { name: "chaos", localT: t / CHAOS_DURATION };
    if (t < CHAOS_DURATION + FORM_DURATION) return { name: "forming", localT: (t - CHAOS_DURATION) / FORM_DURATION };
    if (t < CHAOS_DURATION + FORM_DURATION + HOLD_DURATION) return { name: "hold", localT: (t - CHAOS_DURATION - FORM_DURATION) / HOLD_DURATION };
    return { name: "dissolve", localT: (t - CHAOS_DURATION - FORM_DURATION - HOLD_DURATION) / DISSOLVE_DURATION };
  }

  function updateParticles(now, phase) {
    const { name, localT } = phase;
    const time = now * 0.001;
    for (const p of particles) {
      if (name === "chaos") {
        p.x += p.vx;
        p.y += p.vy;
        p.x += Math.cos(p.phaseOffset + time * 2) * 0.7;
        p.y += Math.sin(p.phaseOffset + time * 2) * 0.7;
        if (p.x < -20) p.x = W + 20;
        if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20;
        if (p.y > H + 20) p.y = -20;
      } else if (name === "forming" || name === "hold") {
        const strength = name === "forming" ? (0.04 + localT * 0.08) : 0.16;
        p.x += (p.homeX - p.x) * strength;
        p.y += (p.homeY - p.y) * strength;
        const swirl = name === "forming" ? (1.2 * (1 - localT)) : 0.2;
        p.x += Math.cos(p.phaseOffset + time * 3) * swirl;
        p.y += Math.sin(p.phaseOffset + time * 3) * swirl;
      } else {
        const ease = localT * localT * (3 - 2 * localT);
        const strength = 0.06 + ease * 0.12;
        p.x += (p.wanderX - p.x) * strength;
        p.y += (p.wanderY - p.y) * strength;
        const swirl = 1.2 + localT * 1.2;
        p.x += Math.cos(p.phaseOffset + time * 3.2) * swirl;
        p.y += Math.sin(p.phaseOffset + time * 3.2) * swirl;
      }
    }
  }

  function drawParticles(now, phase) {
    const { name, localT } = phase;
    const isDark = document.body.getAttribute("data-theme") === "dark";
    ctx.clearRect(0, 0, W, H);

    // نیمه‌شفاف پس‌زمینه
    ctx.fillStyle = isDark ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.18)";
    ctx.fillRect(0, 0, W, H);

    for (const p of particles) {
      let alpha;
      if (name === "chaos") alpha = isDark ? 0.35 : 0.30;
      else if (name === "forming") alpha = 0.40 + 0.50 * localT;
      else if (name === "hold") alpha = 0.90;
      else alpha = 0.90 - 0.60 * localT;

      ctx.save();
      ctx.globalAlpha = alpha;
      const hue = (isDark ? 190 : 210) + 0.3 * ((p.phaseOffset * 180 / Math.PI + now * 0.01) % 360);
      ctx.fillStyle = `hsl(${hue}, ${isDark ? 80 : 65}%, ${isDark ? 70 : 45}%)`;
      ctx.font = `${p.size}px "JetBrains Mono", "SF Mono", monospace`;
      ctx.fillText(p.char, p.x, p.y);
      ctx.restore();
    }
  }

  function loop(now) {
    const phase = getPhase(now);
    if (phase.name !== lastPhase) {
      if (phase.name === "chaos") resetChaosVel();
      else if (phase.name === "dissolve") assignDissolveTargets();
      lastPhase = phase.name;
    }
    updateParticles(now, phase);
    drawParticles(now, phase);
    requestAnimationFrame(loop);
  }

  function resize() {
    buildTextPoints();
    initParticles();
    resetChaosVel();
  }

  window.addEventListener("resize", resize);
  buildTextPoints();
  initParticles();
  resetChaosVel();
  requestAnimationFrame(loop);
})();
