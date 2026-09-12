
const DRUGS_DB = {
    weightBased: {
        antibiotic: [
            {
                id: "amoxicillin",
                name: "Amoxicillin (آموکسی‌سیلین)",
                notes: `✅ کاربرد: اوتیت مدیا حاد (AOM)، فارنژیت استرپتوکوکی، پنومونی خفیف.
                ✅ دوز استاندارد: ۴۰–۴۵ mg/kg/day در ۲ تا ۳ دوز منقسم.
                ✅ دوز بالا: ۸۰–۹۰ mg/kg/day در ۲ دوز منقسم برای پوشش پنوموکوک مقاوم.
                ⚠️ قبل از مصرف سوسپانسیون تکان داده شود. نگهداری در یخچال.`,
                strengths: [
                    { id: "amox_125", label: "125 mg / 5 mL", mgPerMl: 125/5 },
                    { id: "amox_200", label: "200 mg / 5 mL", mgPerMl: 200/5 },
                    { id: "amox_250", label: "250 mg / 5 mL", mgPerMl: 250/5 },
                    { id: "amox_400", label: "400 mg / 5 mL", mgPerMl: 400/5 }
                ],
                indications: [
                    { id: "ind_am_1", name: "عفونت خفیف (هر ۸ ساعت)", mgPerKgPerDay: 45, dosesPerDay: 3, duration: 7 },
                    { id: "ind_am_2", name: "عفونت خفیف (هر ۱۲ ساعت)", mgPerKgPerDay: 45, dosesPerDay: 2, duration: 7 },
                    { id: "ind_am_3", name: "AOM / دوز بالا (هر ۱۲ ساعت)", mgPerKgPerDay: 90, dosesPerDay: 2, duration: 10 }
                ]
            },
            {
                id: "amoxiclav",
                name: "Co-amoxiclav (کوآموکسی‌کلاو)",
                notes: `✅ محاسبات حجم دارو همواره بر اساس جزء «آموکسی‌سیلین» صورت می‌گیرد.
                ✅ دوز معمول: ۴۰-۴۵ mg/kg/day | دوز بالا: ۸۰-۹۰ mg/kg/day.
                ⚠️ عوارض گوارشی شایع است؛ دارو ترجیحاً در ابتدای وعده غذایی مصرف شود.
                ⚠️ سوسپانسیون ES-600 مختص دوز بالا جهت به حداقل رساندن اسهال ناشی از کلاوولانات است.`,
                strengths: [
                    { id: "amc_156", label: "156 (125/31.25) mg / 5 mL", mgPerMl: 125/5 },
                    { id: "amc_228", label: "228 (200/28.5) mg / 5 mL", mgPerMl: 200/5 },
                    { id: "amc_312", label: "312 (250/62.5) mg / 5 mL", mgPerMl: 250/5 },
                    { id: "amc_457", label: "457 (400/57) mg / 5 mL", mgPerMl: 400/5 },
                    { id: "amc_es600", label: "ES-600 (600/42.9) mg / 5 mL", mgPerMl: 600/5 }
                ],
                indications: [
                    { id: "ind_amc_1", name: "عفونت متوسط (هر ۸ ساعت)", mgPerKgPerDay: 40, dosesPerDay: 3, duration: 7 },
                    { id: "ind_amc_2", name: "عفونت متوسط (هر ۱۲ ساعت)", mgPerKgPerDay: 45, dosesPerDay: 2, duration: 7 },
                    { id: "ind_amc_3", name: "عفونت شدید / دوز بالا (هر ۱۲ ساعت)", mgPerKgPerDay: 90, dosesPerDay: 2, duration: 10 }
                ]
            },
            {
                id: "cephalexin",
                name: "Cephalexin (سفالکسین)",
                notes: `✅ کاربرد: عفونت‌های پوستی (زردزخم، سلولیت)، UTI خفیف، فارنژیت در صورت حساسیت به پنی‌سیلین.
                ✅ دوز: ۲۵–۵۰ mg/kg/day (در عفونت شدید تا ۱۰۰ میلی‌گرم).
                ⚠️ در آلرژی آنافیلاکتیک به پنی‌سیلین با احتیاط مصرف شود.`,
                strengths: [
                    { id: "ceph_125", label: "125 mg / 5 mL", mgPerMl: 125/5 },
                    { id: "ceph_250", label: "250 mg / 5 mL", mgPerMl: 250/5 }
                ],
                indications: [
                    { id: "ind_ceph_1", name: "عفونت خفیف پوستی/ادراری (هر ۸ ساعت)", mgPerKgPerDay: 40, dosesPerDay: 3, duration: 7 },
                    { id: "ind_ceph_2", name: "عفونت شدید پوستی (هر ۶ ساعت)", mgPerKgPerDay: 80, dosesPerDay: 4, duration: 10, maxDailyMg: 4000 }
                ]
            },
            {
                id: "cefixime",
                name: "Cefixime (سفیکسیم)",
                notes: `✅ کاربرد: UTI، سینوزیت، اوتیت مدیا.
                ✅ دوز: ۸ mg/kg/day یک‌بار در روز یا منقسم در ۲ دوز.
                ⚠️ پوشش ضعیفی بر روی استافیلوکوک اورئوس دارد، لذا برای عفونت پوستی مناسب نیست. اسهال از عوارض شایع است.`,
                strengths: [
                    { id: "cef_100", label: "100 mg / 5 mL", mgPerMl: 100/5 }
                ],
                indications: [
                    { id: "ind_cef_1", name: "یک‌بار در روز (OD)", mgPerKgPerDay: 8, dosesPerDay: 1, duration: 7 },
                    { id: "ind_cef_2", name: "دو بار در روز (هر ۱۲ ساعت)", mgPerKgPerDay: 8, dosesPerDay: 2, duration: 7 }
                ]
            },
            {
                id: "cefuroxime",
                name: "Cefuroxime (سفوروکسیم)",
                notes: `✅ کاربرد: اوتیت مدیا، سینوزیت، عفونت‌های تنفسی تحتانی و پوستی.
                ✅ دوز: ۲۰–۳۰ mg/kg/day در ۲ دوز منقسم.
                ⚠️ برای افزایش جذب گوارشی، دارو ترجیحاً همراه با غذا مصرف شود. طعم سوسپانسیون ممکن است برای کودک ناخوشایند باشد.`,
                strengths: [
                    { id: "cefuro_125", label: "125 mg / 5 mL", mgPerMl: 125/5 },
                    { id: "cefuro_250", label: "250 mg / 5 mL", mgPerMl: 250/5 }
                ],
                indications: [
                    { id: "ind_cefuro_1", name: "عفونت‌های معمول (هر ۱۲ ساعت)", mgPerKgPerDay: 30, dosesPerDay: 2, duration: 7 }
                ]
            },
            {
                id: "azithromycin",
                name: "Azithromycin (آزیترومایسین)",
                notes: `✅ کاربرد: پنومونی آتیپیک، فارنژیت، اوتیت مدیا.
                ✅ رژیم ۳ روزه: ۱۰ mg/kg/day. 
                ✅ رژیم ۵ روزه: روز اول ۱۰ mg/kg و سپس روزهای ۲ تا ۵ معادل ۵ mg/kg.
                ⚠️ هشدار: در بیماران با اختلالات قلبی و فواصل طولانی QT با احتیاط تجویز شود.`,
                strengths: [
                    { id: "azi_100", label: "100 mg / 5 mL", mgPerMl: 100/5 },
                    { id: "azi_200", label: "200 mg / 5 mL", mgPerMl: 200/5 }
                ],
                indications: [
                    { id: "ind_azi_1", name: "رژیم ۳ روزه (یک‌بار در روز)", mgPerKgPerDay: 10, dosesPerDay: 1, duration: 3, maxDailyMg: 500 },
                    { id: "ind_azi_2", name: "رژیم ۵ روزه (تغییر دوز پس از روز اول)", mgPerKgPerDay: 10, dosesPerDay: 1, duration: 5, isComplexAZI: true }
                ]
            },
            {
                id: "clarithromycin",
                name: "Clarithromycin (کلاریترومایسین)",
                notes: `✅ کاربرد: عفونت‌های تنفسی، جایگزین پنی‌سیلین، ریشه‌کنی H. pylori.
                ✅ دوز: ۱۵ mg/kg/day در ۲ نوبت.
                ⚠️ مصرف همراه غذا تحمل گوارشی را بالا می‌برد. طعم فلزی در دهان از عوارض آن است. مهارکننده قوی سیتوکروم P450 (تداخلات بررسی شود).`,
                strengths: [
                    { id: "clar_125", label: "125 mg / 5 mL", mgPerMl: 125/5 },
                    { id: "clar_250", label: "250 mg / 5 mL", mgPerMl: 250/5 }
                ],
                indications: [
                    { id: "ind_clar_1", name: "عفونت تنفسی (هر ۱۲ ساعت)", mgPerKgPerDay: 15, dosesPerDay: 2, duration: 10, maxDailyMg: 1000 }
                ]
            },
            {
                id: "clindamycin",
                name: "Clindamycin (کلیندامایسین)",
                notes: `✅ کاربرد: عفونت‌های پوستی با شک به MRSA، عفونت دندانی، فارنژیت در حساسیت شدید به پنی‌سیلین.
                ✅ دوز: ۲۰–۴۰ mg/kg/day در ۳-۴ دوز.
                ⚠️ هشدار: ریسک بالای انتروکولیت با غشای کاذب ناشی از کلستریدیوم دیفیسیل (اسهال خونی سریعاً پیگیری شود). با یک لیوان پر آب مصرف شود.`,
                strengths: [
                    { id: "clin_75", label: "75 mg / 5 mL", mgPerMl: 75/5 }
                ],
                indications: [
                    { id: "ind_clin_1", name: "عفونت پوستی / دندانی (هر ۸ ساعت)", mgPerKgPerDay: 30, dosesPerDay: 3, duration: 10, maxDailyMg: 1800 }
                ]
            },
            {
                id: "erythromycin",
                name: "Erythromycin (اریترومایسین)",
                notes: `✅ کاربرد: جایگزین پنی‌سیلین، سیاه‌سرفه، عفونت‌های کلامیدیایی.
                ✅ دوز معمول: ۳۰–۵۰ mg/kg/day در ۴ دوز منقسم.
                ⚠️ عوارض گوارشی شایع است. دارای تداخلات دارویی متعدد می‌باشد.`,
                strengths: [
                    { id: "ery_200", label: "200 mg / 5 mL", mgPerMl: 200/5 }
                ],
                indications: [
                    { id: "ind_ery_1", name: "عفونت تنفسی (هر ۶ ساعت)", mgPerKgPerDay: 40, dosesPerDay: 4, duration: 10 }
                ]
            },
            {
                id: "tmpsmx",
                name: "Co-trimoxazole / TMP-SMX (کوتریموکسازول)",
                notes: `✅ کاربرد: عفونت ادراری (UTI)، پروفیلاکسی PCP، عفونت‌های MRSA انتخابی.
                ✅ محاسبات صرفاً بر اساس جزء تری‌متوپریم (TMP) انجام می‌گیرد. دوز معمول: ۸ mg/kg/day (جزء TMP) در ۲ نوبت.
                ⚠️ منع مصرف در نوزادان زیر ۲ ماه (خطر کرن‌ایکتروس). در بیماران فاویسم (G6PD deficiency) با احتیاط مصرف شود.`,
                strengths: [
                    { id: "tmp_40", label: "40 mg TMP / 5 mL (200/40)", mgPerMl: 40/5 }
                ],
                indications: [
                    { id: "ind_tmp_1", name: "درمان UTI / عفونت خفیف (هر ۱۲ ساعت)", mgPerKgPerDay: 8, dosesPerDay: 2, duration: 7 }
                ]
            }
        ],
        antipyretic: [
            {
                id: "acetaminophen",
                name: "Acetaminophen (استامینوفن / پاراستامول)",
                notes: `✅ کاربرد: تب و دردهای خفیف تا متوسط.
                ✅ دوز: ۱۰ تا ۱۵ mg/kg هر ۴ تا ۶ ساعت.
                ⚠️ هشدار کبدی: حداکثر دوز ایمن روزانه ۷۵ mg/kg یا ۴۰۰۰ میلی‌گرم (هرکدام که کمتر است) می‌باشد. تفاوت غلظت قطره و شربت به دقت لحاظ شود.`,
                strengths: [
                    { id: "apa_drop", label: "قطره 100 mg / 1 mL", mgPerMl: 100/1 },
                    { id: "apa_120", label: "شربت 120 mg / 5 mL", mgPerMl: 120/5 },
                    { id: "apa_160", label: "شربت 160 mg / 5 mL", mgPerMl: 160/5 }
                ],
                indications: [
                    { id: "ind_apa_1", name: "کنترل تب و درد (هر ۶ ساعت)", mgPerKgPerDay: 60, dosesPerDay: 4, duration: 3, maxDailyMg: 4000 }
                ]
            },
            {
                id: "ibuprofen",
                name: "Ibuprofen (ایبوپروفن)",
                notes: `✅ کاربرد: تب، اوتیت، دردهای اسکلتی-عضلانی و التهابی.
                ✅ دوز: ۵ تا ۱۰ mg/kg هر ۶ تا ۸ ساعت.
                ⚠️ هشدار: در کودکان مبتلا به کاهش حجم مایعات (اسهال/استفراغ) ریسک نارسایی حاد کلیوی دارد. حتماً پس از غذا مصرف شود. زیر ۶ ماه ممنوع.`,
                strengths: [
                    { id: "ibu_100", label: "100 mg / 5 mL", mgPerMl: 100/5 }
                ],
                indications: [
                    { id: "ind_ibu_1", name: "درد و تب التهابی (هر ۸ ساعت)", mgPerKgPerDay: 30, dosesPerDay: 3, duration: 3, maxDailyMg: 2400 }
                ]
            },
            {
                id: "mefenamic",
                name: "Mefenamic Acid (مفنامیک اسید)",
                notes: `✅ کاربرد: دردهای عضلانی، دندان‌درد، و تب.
                ✅ دوز: ۴ تا ۶٫۵ mg/kg در هر نوبت، قابل تکرار هر ۸ ساعت.
                ⚠️ در کودکان زیر ۶ ماه توصیه نمی‌شود. دوره درمان نباید طولانی گردد.`,
                strengths: [
                    { id: "mef_50", label: "50 mg / 5 mL", mgPerMl: 50/5 },
                    { id: "mef_100", label: "100 mg / 5 mL", mgPerMl: 100/5 }
                ],
                indications: [
                    { id: "ind_mef_1", name: "تسکین درد/تب (هر ۸ ساعت)", mgPerKgPerDay: 15, dosesPerDay: 3, duration: 3 }
                ]
            }
        ],
        gastro_resp: [
            {
                id: "ondansetron",
                name: "Ondansetron (اندانسترون)",
                notes: `✅ کاربرد: پیشگیری از تهوع و استفراغ ناشی از گاستروآنتریت جهت تسهیل دریافت ORT.
                ✅ دوز: ۰٫۱۵ mg/kg در هر نوبت. (روزی ۳ بار قابل تکرار).
                ⚠️ در بیماران دارای اختلال الکترولیتی یا سندرم QT طولانی ارزیابی نوار قلب الزامی است.`,
                strengths: [
                    { id: "onda_4", label: "4 mg / 5 mL", mgPerMl: 4/5 }
                ],
                indications: [
                    { id: "ind_onda_1", name: "گاستروآنتریت / تهوع (هر ۸ ساعت)", mgPerKgPerDay: 0.45, dosesPerDay: 3, duration: 2, maxDailyMg: 16 }
                ]
            },
            {
                id: "salbutamol",
                name: "Salbutamol (سالبوتامول)",
                notes: `✅ کاربرد: رفع اسپاسم راه‌های هوایی در برونشیولیت یا آسم خفیف.
                ✅ دوز خوراکی: ۰٫۱ تا ۰٫۱۵ mg/kg در هر نوبت.
                ⚠️ تاکیکاردی (تپش قلب) و لرزش دست‌ها از عوارض شایع اما گذرا می‌باشد.`,
                strengths: [
                    { id: "salb_2", label: "2 mg / 5 mL", mgPerMl: 2/5 }
                ],
                indications: [
                    { id: "ind_salb_1", name: "برونکواسپاسم (هر ۸ ساعت)", mgPerKgPerDay: 0.45, dosesPerDay: 3, duration: 5, maxDailyMg: 12 }
                ]
            }
        ],
        antifungal: [
            {
                id: "metronidazole",
                name: "Metronidazole (مترونیدازول)",
                notes: `✅ کاربرد: ژیاردیازیس، آمیبیازیس، عفونت بی‌هوازی.
                ✅ دوز: ۳۰–۵۰ mg/kg/day در ۳ نوبت.
                ⚠️ طعم فلزی دهان. در صورت مصرف سوسپانسیون، ادرار ممکن است تیره شود (بی‌خطر).`,
                strengths: [
                    { id: "metro_125", label: "125 mg / 5 mL", mgPerMl: 125/5 }
                ],
                indications: [
                    { id: "ind_metro_1", name: "ژیاردیا / بی‌هوازی (هر ۸ ساعت)", mgPerKgPerDay: 40, dosesPerDay: 3, duration: 7, maxDailyMg: 2250 }
                ]
            },
            {
                id: "nitazoxanide",
                name: "Nitazoxanide (نیتازوکسانید)",
                notes: `✅ کاربرد: اسهال ناشی از پروتوزوآها نظیر ژیاردیا و کریپتوسپوریدیوم.
                ✅ دوز وزنی/سنی: تقریباً ۷٫۵ mg/kg در هر نوبت (هر ۱۲ ساعت).
                ⚠️ دوره درمان دقیقاً ۳ روز است. جهت جذب بهتر با غذا مصرف شود. رنگ ادرار ممکن است زرد روشن شود.`,
                strengths: [
                    { id: "nita_100", label: "100 mg / 5 mL", mgPerMl: 100/5 }
                ],
                indications: [
                    { id: "ind_nita_1", name: "اسهال انگلی (هر ۱۲ ساعت)", mgPerKgPerDay: 15, dosesPerDay: 2, duration: 3 }
                ]
            },
            {
                id: "nystatin",
                name: "Nystatin (نیستاتین)",
                notes: `✅ کاربرد: کاندیدیازیس دهانی (برفک).
                ✅ دوز بر اساس حجم: نوزادان (۲ میلی‌لیتر در هر نوبت) / کودکان (۴ تا ۶ میلی‌لیتر در هر نوبت).
                ⚠️ در این ماشین‌حساب، دوز بر اساس استاندارد ۲ میلی‌لیتر در هر نوبت (مجموع ۸ میلی‌لیتر در روز) برای وزن‌های پایین، و ۴ میلی‌لیتر برای وزن‌های بالاتر تنظیم شده است. باید در دهان مزه‌مزه شود.`,
                strengths: [
                    { id: "nys_100k", label: "100,000 Unit / 1 mL", mgPerMl: 100000/1 } // محاسبات بر اساس واحد
                ],
                indications: [
                    { id: "ind_nys_1", name: "برفک دهان - اطفال (هر ۶ ساعت)", mgPerKgPerDay: 400000, dosesPerDay: 4, duration: 7 } 
                    // توجه: mgPerKgPerDay در اینجا به عنوان "واحد کل روزانه" به صورت تقریبی بر کیلوگرم فرض نمی‌شود بلکه فرمول اختصاصی در app.js آن را مدیریت می‌کند، یا دوز ثابت لحاظ می‌شود. برای هماهنگی با سیستم وزنی، مقدار را به گونه‌ای تنظیم می‌کنیم که خروجی ۲ سی‌سی بشود. 
                    // اصلاحیه: چون سیستم ما mg/kg است، بهتر است نیستاتین را از فرمول ثابت محاسبه کنیم. اما برای انطباق، برای یک کودک فرضی ۵ کیلویی: دوز روزانه 800,000 واحد است => 160,000 واحد پر کیلو!
                    // لذا mgPerKgPerDay = 160000
                ]
            }
        ],
        antihistamine_weight: [
            {
                id: "diphenhydramine",
                name: "Diphenhydramine (دیفن‌هیدرامین)",
                notes: `✅ کاربرد: کنترل سریع کهیر حاد و واکنش آلرژیک.
                ✅ دوز: ۵ mg/kg/day در ۴ دوز منقسم.
                ⚠️ به دلیل عبور از سد خونی-مغزی، سداسیون (خواب‌آلودگی) و در برخی موارد بی‌قراری پارادوکسیکال ایجاد می‌کند. زیر ۲ سال ممنوع.`,
                strengths: [
                    { id: "dph_12_5", label: "12.5 mg / 5 mL", mgPerMl: 12.5/5 }
                ],
                indications: [
                    { id: "ind_dph_1", name: "آلرژی حاد (هر ۶ ساعت)", mgPerKgPerDay: 5, dosesPerDay: 4, duration: 3, maxDailyMg: 300 }
                ]
            },
            {
                id: "chlorpheniramine",
                name: "Chlorpheniramine (کلرفنیرامین)",
                notes: `✅ کاربرد: رینیت آلرژیک، آبریزش شدید.
                ✅ دوز: ۰٫۳۵ میلی‌گرم/کیلوگرم/روز در ۴ دوز.
                ⚠️ آنتی‌هیستامین نسل اول با عوارض آنتی‌کولینرژیک (خشکی دهان، خواب‌آلودگی).`,
                strengths: [
                    { id: "cpm_2", label: "2 mg / 5 mL", mgPerMl: 2/5 }
                ],
                indications: [
                    { id: "ind_cpm_1", name: "علائم آلرژیک (هر ۶ ساعت)", mgPerKgPerDay: 0.35, dosesPerDay: 4, duration: 5, maxDailyMg: 12 }
                ]
            },
            {
                id: "hydroxyzine",
                name: "Hydroxyzine (هیدروکسی‌زین)",
                notes: `✅ کاربرد: خارش شدید پوست، کهیر مقاوم.
                ✅ دوز: ۰٫۵ mg/kg در هر نوبت. (روزی ۴ بار).
                ⚠️ اثرات آرام‌بخشی بسیار قوی دارد.`,
                strengths: [
                    { id: "hyd_10", label: "10 mg / 5 mL", mgPerMl: 10/5 }
                ],
                indications: [
                    { id: "ind_hyd_1", name: "خارش و کهیر (هر ۶ ساعت)", mgPerKgPerDay: 2, dosesPerDay: 4, duration: 5, maxDailyMg: 100 }
                ]
            },
            {
                id: "pseudoephedrine",
                name: "Pseudoephedrine (پسودوافدرین)",
                notes: `✅ کاربرد: ضداحتقان بینی در سینوزیت یا سرماخوردگی.
                ✅ دوز: ۴ mg/kg/day در ۴ دوز.
                ⚠️ عوارض: بی‌خوابی، تحریک‌پذیری، تپش قلب. زیر ۴ سال توصیه نمی‌شود.`,
                strengths: [
                    { id: "pse_15", label: "15 mg / 5 mL", mgPerMl: 15/5 },
                    { id: "pse_30", label: "30 mg / 5 mL", mgPerMl: 30/5 }
                ],
                indications: [
                    { id: "ind_pse_1", name: "احتقان بینی (هر ۶ ساعت)", mgPerKgPerDay: 4, dosesPerDay: 4, duration: 5, maxDailyMg: 120 }
                ]
            }
        ]
    },
    ageBased: [
        {
            id: "cetirizine",
            name: "Cetirizine (ستیریزین)",
            notes: `✅ نسل دوم آنتی‌هیستامین‌ها.
            ✅ کاربرد: رینیت آلرژیک فصلی، کهیر مزمن.
            ⚠️ در نارسایی کلیوی نیاز به تنظیم دوز دارد.`,
            strengths: [
                { id: "cet_5", label: "5 mg / 5 mL", mgPerMl: 5/5 }
            ],
            ageBands: [
                { minAge: 0.5, maxAge: 1.9, totalDailyMg: 2.5, doses: 1, note: "۲٫۵ میلی‌گرم یک‌بار در روز (معادل ۲٫۵ سی‌سی)" },
                { minAge: 2, maxAge: 5.9, totalDailyMg: 5, doses: 1, note: "۵ میلی‌گرم یک‌بار در روز (معادل ۵ سی‌سی)" },
                { minAge: 6, maxAge: 18, totalDailyMg: 10, doses: 1, note: "۱۰ میلی‌گرم یک‌بار در روز (معادل ۱۰ سی‌سی)" }
            ]
        },
        {
            id: "loratadine",
            name: "Loratadine (لوراتادین)",
            notes: `✅ نسل دوم آنتی‌هیستامین‌ها با حداقل عبور از سد خونی مغزی.
            ✅ کاربرد: حساسیت‌های فصلی و تنفسی.`,
            strengths: [
                { id: "lor_5", label: "5 mg / 5 mL", mgPerMl: 5/5 }
            ],
            ageBands: [
                { minAge: 2, maxAge: 5.9, totalDailyMg: 5, doses: 1, note: "۵ میلی‌گرم یک‌بار در روز" },
                { minAge: 6, maxAge: 18, totalDailyMg: 10, doses: 1, note: "۱۰ میلی‌گرم یک‌بار در روز" }
            ]
        },
        {
            id: "fexofenadine",
            name: "Fexofenadine (فکسوفنادین)",
            notes: `✅ ایمن‌ترین آنتی‌هیستامین از نظر عدم ایجاد خواب‌آلودگی.
            ⚠️ مصرف همزمان با آب‌میوه‌ها (گریپ‌فروت، پرتقال، سیب) جذب دارو را به‌شدت کاهش می‌دهد؛ با آب میل شود.`,
            strengths: [
                { id: "fexo_30", label: "30 mg / 5 mL", mgPerMl: 30/5 }
            ],
            ageBands: [
                { minAge: 2, maxAge: 11.9, totalDailyMg: 60, doses: 2, note: "۳۰ میلی‌گرم (۵ سی‌سی) دو بار در روز" },
                { minAge: 12, maxAge: 18, totalDailyMg: 120, doses: 1, note: "۱۲۰ میلی‌گرم روزانه (معمولاً فرم قرص ترجیح داده می‌شود)" }
            ]
        },
        {
            id: "desloratadine_age",
            name: "Desloratadine (دسلوراتادین)",
            notes: `✅ متابولیت فعال لوراتادین با اثربخشی سریع‌تر.
            ✅ طعم مطلوب شربت، پذیرش (Palatability) آن را در اطفال افزایش می‌دهد.`,
            strengths: [
                { id: "des_2_5", label: "2.5 mg / 5 mL", mgPerMl: 2.5/5 }
            ],
            ageBands: [
                { minAge: 0.5, maxAge: 0.9, totalDailyMg: 1, doses: 1, note: "۱ میلی‌گرم روزانه (۲ سی‌سی)" },
                { minAge: 1, maxAge: 5.9, totalDailyMg: 1.25, doses: 1, note: "۱٫۲۵ میلی‌گرم روزانه (۲٫۵ سی‌سی)" },
                { minAge: 6, maxAge: 11.9, totalDailyMg: 2.5, doses: 1, note: "۲٫۵ میلی‌گرم روزانه (۵ سی‌سی)" }
            ]
        }
    ]
};
