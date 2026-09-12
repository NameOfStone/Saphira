
// توابع یوتیلیتی برای زبان و نمایش
const persianMap = { '0':'۰','1':'۱','2':'۲','3':'۳','4':'۴','5':'۵','6':'۶','7':'۷','8':'۸','9':'۹' };
function toFaDigits(num) {
    if(num === undefined || num === null) return '';
    return num.toString().replace(/[0-9]/g, d => persianMap[d]);
}

// مدیریت DOM
const DOM = {
    themeSwitch: document.getElementById('themeSwitch'),
    themeIcon: document.getElementById('themeIcon'),
    tabWeight: document.getElementById('tabWeight'),
    tabAge: document.getElementById('tabAge'),
    weightMode: document.getElementById('weightMode'),
    ageMode: document.getElementById('ageMode'),
    catBtns: document.querySelectorAll('.cat-btn'),
    drugSelect: document.getElementById('drugSelect'),
    weightInput: document.getElementById('weightInput'),
    strengthWrapper: document.getElementById('strengthWrapper'),
    strengthSelect: document.getElementById('strengthSelect'),
    diseaseWrapper: document.getElementById('diseaseWrapper'),
    diseaseSelect: document.getElementById('diseaseSelect'),
    drugNotesWrapper: document.getElementById('drugNotesWrapper'),
    drugNotes: document.getElementById('drugNotes'),
    doseInfoWrapper: document.getElementById('doseInfoWrapper'),
    doseInfo: document.getElementById('doseInfo'),
    calcBtnWeight: document.getElementById('calcBtnWeight'),
    resetBtnWeight: document.getElementById('resetBtnWeight'),
    resultWeight: document.getElementById('resultWeight'),
    ageDrugSelect: document.getElementById('ageDrugSelect'),
    ageInput: document.getElementById('ageInput'),
    ageDrugNotesWrapper: document.getElementById('ageDrugNotesWrapper'),
    ageDrugNotes: document.getElementById('ageDrugNotes'),
    ageStrengthWrapper: document.getElementById('ageStrengthWrapper'),
    ageStrengthSelect: document.getElementById('ageStrengthSelect'),
    calcBtnAge: document.getElementById('calcBtnAge'),
    resetBtnAge: document.getElementById('resetBtnAge'),
    resultAge: document.getElementById('resultAge')
};

let currentCategory = 'antibiotic';
let currentDrugWeight = null;
let currentDrugAge = null;

// تنظیمات تم
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    DOM.themeSwitch.checked = (savedTheme === 'dark');
    DOM.themeIcon.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

    DOM.themeSwitch.addEventListener('change', (e) => {
        const theme = e.target.checked ? 'dark' : 'light';
        document.body.setAttribute('data-theme', theme);
        DOM.themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
        localStorage.setItem('theme', theme);
    });
}

// جابجایی تب‌ها
DOM.tabWeight.addEventListener('click', () => {
    DOM.tabWeight.classList.add('active');
    DOM.tabAge.classList.remove('active');
    DOM.weightMode.classList.remove('hidden');
    DOM.ageMode.classList.add('hidden');
});

DOM.tabAge.addEventListener('click', () => {
    DOM.tabAge.classList.add('active');
    DOM.tabWeight.classList.remove('active');
    DOM.ageMode.classList.remove('hidden');
    DOM.weightMode.classList.add('hidden');
});

// پر کردن لیست داروها - وزنی
function loadWeightDrugs(category) {
    DOM.drugSelect.innerHTML = '<option value="">-- لطفاً یک دارو انتخاب کنید --</option>';
    const drugs = DRUGS_DB.weightBased[category] || [];
    drugs.forEach(d => {
        let opt = document.createElement('option');
        opt.value = d.id;
        opt.textContent = d.name;
        DOM.drugSelect.appendChild(opt);
    });
    resetWeightFields();
}

DOM.catBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        DOM.catBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentCategory = e.target.dataset.cat;
        loadWeightDrugs(currentCategory);
    });
});

DOM.drugSelect.addEventListener('change', (e) => {
    resetWeightFields(false);
    const drugId = e.target.value;
    if (!drugId) return;

    currentDrugWeight = DRUGS_DB.weightBased[currentCategory].find(d => d.id === drugId);
    
    DOM.drugNotes.innerHTML = currentDrugWeight.notes;
    DOM.drugNotesWrapper.classList.remove('hidden');

    currentDrugWeight.strengths.forEach(s => {
        let opt = document.createElement('option');
        opt.value = s.id;
        opt.textContent = s.label;
        DOM.strengthSelect.appendChild(opt);
    });
    DOM.strengthWrapper.classList.remove('hidden');

    DOM.diseaseSelect.innerHTML = '<option value="">-- اندیکاسیون را انتخاب کنید --</option>';
    currentDrugWeight.indications.forEach(i => {
        let opt = document.createElement('option');
        opt.value = i.id;
        opt.textContent = i.name;
        DOM.diseaseSelect.appendChild(opt);
    });
    DOM.diseaseWrapper.classList.remove('hidden');
});

DOM.diseaseSelect.addEventListener('change', (e) => {
    const indId = e.target.value;
    if(!indId) {
        DOM.doseInfoWrapper.classList.add('hidden');
        return;
    }
    const ind = currentDrugWeight.indications.find(i => i.id === indId);
    let unitLabel = currentDrugWeight.id === 'nystatin' ? 'Unit/kg/day' : 'mg/kg/day';
    
    DOM.doseInfo.innerHTML = `پایه رفرنس: <span class="ltr-text">${toFaDigits(ind.mgPerKgPerDay)} ${unitLabel}</span> در ${toFaDigits(ind.dosesPerDay)} دوز منقسم.`;
    DOM.doseInfoWrapper.classList.remove('hidden');
});

// محاسبات وزنی
DOM.calcBtnWeight.addEventListener('click', () => {
    const weight = parseFloat(DOM.weightInput.value);
    const strengthId = DOM.strengthSelect.value;
    const indId = DOM.diseaseSelect.value;

    if (!weight || weight <= 0) return alert("لطفاً وزن معتبر وارد کنید.");
    if (!currentDrugWeight || !strengthId || !indId) return alert("تکمیل فیلدهای دارو و غلظت الزامی است.");

    const strength = currentDrugWeight.strengths.find(s => s.id === strengthId);
    const ind = currentDrugWeight.indications.find(i => i.id === indId);

    // محاسبه استثنای آزیترومایسین
    if (ind.isComplexAZI) {
        let doseMgDay1 = weight * 10;
        let doseMgNext = weight * 5;
        
        if(ind.maxDailyMg) {
            doseMgDay1 = Math.min(doseMgDay1, ind.maxDailyMg);
            doseMgNext = Math.min(doseMgNext, ind.maxDailyMg);
        }

        let volDay1 = doseMgDay1 / strength.mgPerMl;
        let volNext = doseMgNext / strength.mgPerMl;

        DOM.resultWeight.innerHTML = `
            <strong>وزن محاسبه‌شده: <span class="ltr-text">${toFaDigits(weight)} kg</span></strong><br><br>
            <i class="fas fa-check-circle" style="color:var(--success-text);"></i> <strong>روز اول:</strong> <span class="highlight-dose ltr-text">${toFaDigits(volDay1.toFixed(1))} mL</span> (معادل ${toFaDigits(doseMgDay1.toFixed(1))} mg)<br>
            <i class="fas fa-check-circle" style="color:var(--success-text);"></i> <strong>روز دوم تا پنجم:</strong> <span class="highlight-dose ltr-text">${toFaDigits(volNext.toFixed(1))} mL</span> (معادل ${toFaDigits(doseMgNext.toFixed(1))} mg)<br>
        `;
        DOM.resultWeight.classList.remove('hidden');
        return;
    }
    
    // استثنای نیستاتین (محاسبه بر اساس دوز ثابت حجمی در اکثر رفرنس‌ها)
    if (currentDrugWeight.id === 'nystatin') {
        let nysVol = weight < 10 ? 2 : 4; 
        DOM.resultWeight.innerHTML = `
            <strong>وزن: <span class="ltr-text">${toFaDigits(weight)} kg</span></strong><br><br>
            • حجم هر نوبت: <span class="highlight-dose ltr-text">${toFaDigits(nysVol)} mL</span> (مجموعاً ${toFaDigits(nysVol*2)} mL در روز)<br>
            • فواصل مصرف: <strong>هر ۶ ساعت</strong> (نیمی در سمت راست و نیمی در سمت چپ دهان)<br>
            • طول درمان: حداقل تا ۴۸ ساعت پس از رفع علائم.
        `;
        DOM.resultWeight.classList.remove('hidden');
        return;
    }

    // محاسبات کلاسیک
    let totalMgDay = weight * ind.mgPerKgPerDay;
    let warningHtml = "";

    if (ind.maxDailyMg && totalMgDay > ind.maxDailyMg) {
        totalMgDay = ind.maxDailyMg;
        warningHtml = `<br><span style="color:var(--warning-text);"><i class="fas fa-shield-halved"></i> <strong>سیستم ایمنی:</strong> سقف دوز مجاز روزانه (${toFaDigits(ind.maxDailyMg)} mg) روی محاسبات اعمال گردید.</span>`;
    }

    let mgPerDose = totalMgDay / ind.dosesPerDay;
    let mlPerDose = mgPerDose / strength.mgPerMl;
    
    // جلوگیری از Trailing Zeros و اعمال Leading Zeros (مانند 0.5)
    let formattedVol = mlPerDose < 1 ? `۰٫${toFaDigits(Math.round(mlPerDose*10))}` : toFaDigits(parseFloat(mlPerDose.toFixed(1)));
    let interval = 24 / ind.dosesPerDay;

    DOM.resultWeight.innerHTML = `
        <strong>وزن: <span class="ltr-text">${toFaDigits(weight)} kg</span></strong><br><br>
        • حجم هر نوبت: <span class="highlight-dose ltr-text">${formattedVol} mL</span><br>
        • فواصل مصرف: <strong>هر <span class="ltr-text">${toFaDigits(interval)}</span> ساعت</strong><br>
        • دوره درمان: <strong><span class="ltr-text">${toFaDigits(ind.duration)}</span> روز</strong><br>
        • معادل ماده موثره: <span class="ltr-text">${toFaDigits(mgPerDose.toFixed(1))} mg</span> در هر دوز
        ${warningHtml}
    `;
    DOM.resultWeight.classList.remove('hidden');
});

function resetWeightFields(full = true) {
    if(full) {
        DOM.drugSelect.value = "";
        DOM.weightInput.value = "";
    }
    DOM.strengthSelect.innerHTML = "";
    DOM.diseaseSelect.innerHTML = "";
    DOM.strengthWrapper.classList.add('hidden');
    DOM.diseaseWrapper.classList.add('hidden');
    DOM.drugNotesWrapper.classList.add('hidden');
    DOM.doseInfoWrapper.classList.add('hidden');
    DOM.resultWeight.classList.add('hidden');
}
DOM.resetBtnWeight.addEventListener('click', () => resetWeightFields(true));

// پر کردن لیست داروها - سنی
function loadAgeDrugs() {
    DRUGS_DB.ageBased.forEach(d => {
        let opt = document.createElement('option');
        opt.value = d.id;
        opt.textContent = d.name;
        DOM.ageDrugSelect.appendChild(opt);
    });
}

DOM.ageDrugSelect.addEventListener('change', (e) => {
    DOM.resultAge.classList.add('hidden');
    DOM.ageStrengthSelect.innerHTML = "";
    const drugId = e.target.value;
    if(!drugId) {
        DOM.ageDrugNotesWrapper.classList.add('hidden');
        DOM.ageStrengthWrapper.classList.add('hidden');
        return;
    }
    
    currentDrugAge = DRUGS_DB.ageBased.find(d => d.id === drugId);
    DOM.ageDrugNotes.innerHTML = currentDrugAge.notes;
    DOM.ageDrugNotesWrapper.classList.remove('hidden');

    currentDrugAge.strengths.forEach(s => {
        let opt = document.createElement('option');
        opt.value = s.id;
        opt.textContent = s.label;
        DOM.ageStrengthSelect.appendChild(opt);
    });
    DOM.ageStrengthWrapper.classList.remove('hidden');
});

// محاسبات سنی
DOM.calcBtnAge.addEventListener('click', () => {
    const age = parseFloat(DOM.ageInput.value);
    const strengthId = DOM.ageStrengthSelect.value;

    if (!age || age < 0) return alert("سن وارد شده نامعتبر است.");
    if (!currentDrugAge || !strengthId) return alert("تمامی فیلدها را تکمیل نمایید.");

    const strength = currentDrugAge.strengths.find(s => s.id === strengthId);
    const band = currentDrugAge.ageBands.find(b => age >= b.minAge && age <= b.maxAge);

    if(!band) {
        DOM.resultAge.innerHTML = `<span style="color:var(--warning-text);"><i class="fas fa-ban"></i> متأسفانه در رفرنس‌های دارویی، دوز استانداردی برای این بازه سنی تعریف نشده است.</span>`;
        DOM.resultAge.classList.remove('hidden');
        return;
    }

    let mgPerDose = band.totalDailyMg / band.doses;
    let mlPerDose = mgPerDose / strength.mgPerMl;
    let formattedVol = mlPerDose < 1 ? `۰٫${toFaDigits(Math.round(mlPerDose*10))}` : toFaDigits(parseFloat(mlPerDose.toFixed(1)));

    DOM.resultAge.innerHTML = `
        <strong>سن کودک: <span class="ltr-text">${toFaDigits(age)} سال</span></strong><br><br>
        • حجم هر نوبت: <span class="highlight-dose ltr-text">${formattedVol} mL</span><br>
        • دستور بالینی: <strong>${band.note}</strong>
    `;
    DOM.resultAge.classList.remove('hidden');
});

DOM.resetBtnAge.addEventListener('click', () => {
    DOM.ageDrugSelect.value = "";
    DOM.ageInput.value = "";
    DOM.ageDrugNotesWrapper.classList.add('hidden');
    DOM.ageStrengthWrapper.classList.add('hidden');
    DOM.resultAge.classList.add('hidden');
});

// بوت‌استرپ اپلیکیشن
window.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadWeightDrugs('antibiotic');
    loadAgeDrugs();
});
