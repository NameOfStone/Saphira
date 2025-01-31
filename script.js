// Function to toggle between light and dark mode
function toggleMode() {
    let body = document.body;
    let button = document.getElementById("toggleMode");

    // Toggle dark mode class
    body.classList.toggle("dark-mode");

    // Save user preference
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        button.innerText = "☀️ Light Mode";
    } else {
        localStorage.setItem("theme", "light");
        button.innerText = "🌙 Dark Mode";
    }
}

// Load saved theme from localStorage
window.onload = function () {
    let savedTheme = localStorage.getItem("theme");
    let button = document.getElementById("toggleMode");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        button.innerText = "☀️ Light Mode";
    } else {
        button.innerText = "🌙 Dark Mode";
    }
};

// Medicine dosage factors
const dosageFactors = {
    metronidazole: {
        Anaerobic_infections: { factor: 0.54, message: "3 times a day for 7- 10 days; used dose 40 mg/kg/day" },
        Giardiasis: { factor: 0.4, message: "3 times a day for 5- 7 days; used dose 30 mg/kg/day" },
        Amebiasis: { factor: 0.54, message: "3 times a day for 7- 10 days; used dose 40 mg/kg/day" },
        Trichomoniasis_single_dose: { factor: 0.6, message: "just once; used dose 15 mg/kg/day" },
        Trichomoniasis: { factor: 0.2, message: "3 times a day for 7 days; used dose 15 mg/kg/day" },
        Clostridium_difficile_infection: { factor: 0.075, message: "4 times a day for 10 days; used dose 7.5 mg/kg/day" }
    },
    penicillin_V: {
        Streptococcal_pharyngitis: { factor: 0.34, message: "3 times a day for 10 days; used dose 50 mg/kg/day" },
        Scarletfever: { factor: 0.27, message: "3 times a day for 10 days; used dose 40 mg/kg/day" },
        Mild_skin_infections: { factor: 0.34, message: "3 times a day for 7- 10 days; used dose 50 mg/kg/day" }
    },
    amoxicillin_125: {
        Otitis_media: { factor: 1.2, message: "3 times a day for 7- 10 days; used dose 90 mg/kg/day" },
        Pneumonia: { factor: 1.07, message: "3 times a day for 7- 10 days; used dose 80 mg/kg/day" },
        Tonsillitis_or_pharyngitis: { factor: 0.67, message: "3 times a day for 10 days; used dose 50 mg/kg/day" },
        Sinusitis: { factor: 1.07, message: "3 times a day for 10 days; used dose 80 mg/kg/day" },
        Urinary_tract_infections: { factor: 0.67, message: "3 times a day for 7 days; used dose 50 mg/kg/day" }
    },
    amoxicillin_250: {
        Otitis_media: { factor: 0.6, message: "3 times a day for 7- 10 days; used dose 90 mg/kg/day" },
        Pneumonia: { factor: 0.53, message: "3 times a day for 7- 10 days; used dose 80 mg/kg/day" },
        Tonsillitis_or_pharyngitis: { factor: 0.33, message: "3 times a day for 10 days; used dose 50 mg/kg/day" },
        Sinusitis: { factor: 0.53, message: "3 times a day for 10 days; used dose 80 mg/kg/day" },
        Urinary_tract_infections: { factor: 0.33, message: "3 times a day for 7 days; used dose 50 mg/kg/day" }
    },
    amoxicillin_200: {
        Otitis_media: { factor: 1.125, message: "2 times a day for 7- 10 days; used dose 90 mg/kg/day" },
        Pneumonia: { factor: 1, message: "2 times a day for 7- 10 days; used dose 80 mg/kg/day" },
        Tonsillitis_or_pharyngitis: { factor: 0.625, message: "2 times a day for 10 days; used dose 50 mg/kg/day" },
        Sinusitis: { factor: 1, message: "2 times a day for 10 days; used dose 80 mg/kg/day" },
        Urinary_tract_infections: { factor: 0.625, message: "2 times a day for 7 days; used dose 50 mg/kg/day" }
    },
    amoxicillin_400: {
        Otitis_media: { factor: 0.56, message: "2 times a day for 7- 10 days; used dose 90 mg/kg/day" },
        Pneumonia: { factor: 0.5, message: "2 times a day for 7- 10 days; used dose 80 mg/kg/day" },
        Tonsillitis_or_pharyngitis: { factor: 0.31, message: "2 times a day for 10 days; used dose 50 mg/kg/day" },
        Sinusitis: { factor: 0.5, message: "2 times a day for 10 days; used dose 80 mg/kg/day" },
        Urinary_tract_infections: { factor: 0.31, message: "2 times a day for 7 days; used dose 50 mg/kg/day" }
    },
    azithromycin_100: {
        Strep_throat: { factor: 0.6, message: "once a day for 5 days; used dose 12 mg/kg/day" },
        Otitis_media: { factor: 0.5, message: "once a day for 5 days, day 2- 5 half of the calculated dose; used dose for first day 10 mg/kg/day" },
        Community_acquired_pneumonia: { factor: 0.5, message: "once a day for 5 days, day 2- 5 half of the calculated dose; used dose for first day 10 mg/kg/day" },
        Sinusitis: { factor: 0.5, message: "once a day for 3 days; used dose 10 mg/kg/day" }
    },
    azithromycin_200: {
        Strep_throat: { factor: 0.3, message: "once a day for 5 days; used dose 12 mg/kg/day." },
        Otitis_media: { factor: 0.25, message: "once a day for 5 days, day 2- 5 half of the calculated dose; used dose for first day 10 mg/kg/day" },
        Community_acquired_pneumonia: { factor: 0.25, message: "once a day for 5 days, day 2- 5 half of the calculated dose; used dose for first day 10 mg/kg/day" },
        Sinusitis: { factor: 0.25, message: "once a day for 3 days; used dose 10 mg/kg/day" }
    },
    cefixime: {
        Otitis_media: { factor: 0.2, message: "2 times a day for 5- 10 days; used dose 8 mg/kg/day" },
        Urinary_tract_infections: { factor: 0.4, message: "once a day for 7- 10 days; used dose 8 mg/kg/day" },
        Pharyngitis: { factor: 0.2, message: "2 times a day for 5- 10 days; used dose 8 mg/kg/day" },
        Typhoid_fever: { factor: 0.375, message: "2 times a day for 10- 14 days; used dose 15 mg/kg/day" }
    },
    cephalexin_125: {
        Skin_infections: { factor: 0.5, message: "4 times a day for 7- 10 days; used dose 50 mg/kg/day" },
        Pharyngitis: { factor: 0.8, message: "2 times a day for 10 days; used dose 40 mg/kg/day" },
        Urinary_tract_infections: { factor: 0.5, message: "4 times a day for 7- 14 days; used dose 50 mg/kg/day" }
    },
    cephalexin_250: {
        Skin_infections: { factor: 0.25, message: "4 times a day for 7- 10 days; used dose 50 mg/kg/day" },
        Pharyngitis: { factor: 0.4, message: "2 times a day for 10 days; used dose 40 mg/kg/day" },
        Urinary_tract_infections: { factor: 0.25, message: "4 times a day for 7- 14 days; used dose 50 mg/kg/day" }
    },
    clarithromycin_125: {
        Strep_throat: { factor: 0.3, message: "2 times a day for 10 days; used dose 15 mg/kg/day" },
        Pneumonia: { factor: 0.3, message: "2 times a day for 7- 10 days; used dose 15 mg/kg/day" },
        Otitis_media: { factor: 0.3, message: "2 times a day for 7- 10 days; used dose 15 mg/kg/day" },
        Helicobacter_pylori_infection: { factor: 0.3, message: "2 times a day for 14 days; used dose 15 mg/kg/day" }
    },
    clarithromycin_250: {
        Strep_throat: { factor: 0.15, message: "2 times a day for 10 days; used dose 15 mg/kg/day" },
        Pneumonia: { factor: 0.15, message: "2 times a day for 7- 10 days; used dose 15 mg/kg/day" },
        Otitis_media: { factor: 0.15, message: "2 times a day for 7- 10 days; used dose 15 mg/kg/day" },
        Helicobacter_pylori_infection: { factor: 0.15, message: "2 times a day for 14 days; used dose 15 mg/kg/day" }
    },
    co_amoxiclave_156: {
        Otitis_media: { factor: 0.54, message: "3 times a day for 7- 10 days; used dose 40 mg/kg/day" },
        Pneumonia: { factor: 0.54, message: "3 times a day for 7- 14 days; used dose 40 mg/kg/day" },
        Sinusitis: { factor: 0.54, message: "3 times a day for 10 days; used dose 40 mg/kg/day" },
        Skin_infections: { factor: 0.4, message: "3 times a day for 7- 10 days; used dose 30 mg/kg/day" },
        Urinary_tract_infections: { factor: 0.4, message: "3 times a day for 7 days; used dose 30 mg/kg/day" }
    },
    co_amoxiclave_312: {
        Otitis_media: { factor: 0.27, message: "3 times a day for 7- 10 days; used dose 40 mg/kg/day" },
        Pneumonia: { factor: 0.27, message: "3 times a day for 7- 14 days; used dose 40 mg/kg/day" },
        Sinusitis: { factor: 0.27, message: "3 times a day for 10 days; used dose 40 mg/kg/day" },
        Skin_infections: { factor: 0.2, message: "3 times a day for 7- 10 days; used dose 30 mg/kg/day" },
        Urinary_tract_infections: { factor: 0.2, message: "3 times a day for 7 days; used dose 30 mg/kg/day" }
    },
    co_amoxiclave_228: {
        Otitis_media: { factor: 0.5, message: "2 times a day for 7- 10 days; used dose 40 mg/kg/day" },
        Pneumonia: { factor: 0.5, message: "2 times a day for 7- 14 days; used dose 40 mg/kg/day" },
        Sinusitis: { factor: 0.5, message: "2 times a day for 10 days; used dose 40 mg/kg/day" },
        Skin_infections: { factor: 0.375, message: "2 times a day for 7- 10 days; used dose 30 mg/kg/day" },
        Urinary_tract_infections: { factor: 0.375, message: "2 times a day for 7 days; used dose 30 mg/kg/day" }
    },
    co_amoxiclave_457: {
        Otitis_media: { factor: 0.25, message: "2 times a day for 7- 10 days; used dose 40 mg/kg/day" },
        Pneumonia: { factor: 0.25, message: "2 times a day for 7- 14 days; used dose 40 mg/kg/day" },
        Sinusitis: { factor: 0.25, message: "2 times a day for 10 days; used dose 40 mg/kg/day" },
        Skin_infections: { factor: 0.19, message: "2 times a day for 7- 10 days; used dose 30 mg/kg/day" },
        Urinary_tract_infections: { factor: 0.19, message: "2 times a day for 7 days; used dose 30 mg/kg/day" }
    },
    co_amoxiclave_643: {
        Otitis_media: { factor: 0.17, message: "2 times a day for 7- 10 days; used dose 40 mg/kg/day" },
        Pneumonia: { factor: 0.17, message: "2 times a day for 7- 14 days; used dose 40 mg/kg/day" },
        Sinusitis: { factor: 0.17, message: "2 times a day for 10 days; used dose 40 mg/kg/day" },
        Skin_infections: { factor: 0.125, message: "2 times a day for 7- 10 days; used dose 30 mg/kg/day" },
        Urinary_tract_infections: { factor: 0.125, message: "2 times a day for 7 days; used dose 30 mg/kg/day" }
    },
    co_trimoxazole: {
        Urinary_tract_infections: { factor: 0.375, message: "2 times a day for 7- 10 days; used dose 6 mg/kg/day trimethoprim" },
        Otitis_media: { factor: 0.5, message: "2 times a day for 10 days; used dose 8 mg/kg/day trimethoprim" },
        Pneumocystis_pneumonia_prophylaxis: { factor: 0.625, message: "once a day for a long time; used dose 5 mg/kg/day trimethoprim" }
    },
    erythromycin: {
        Strep_throat: { factor: 0.4, message: "4 times a day for 10 days; used dose 40 mg/kg/day" },
        Pneumonia: { factor: 0.4, message: "4 times a day for 7- 10 days; used dose 40 mg/kg/day" },
        Pertussis: { factor: 0.5, message: "4 times a day for 14 days; used dose 50 mg/kg/day" }
    }
};

// Update disease dropdown based on selected medicine
function updateDiseases() {
    let medicine = document.getElementById("medicine").value;
    let diseaseSelect = document.getElementById("disease");

    // Clear previous options
    diseaseSelect.innerHTML = '<option value="">-- Select Disease --</option>';

    if (dosageFactors[medicine]) {
        for (let disease in dosageFactors[medicine]) {
            let option = document.createElement("option");
            option.value = disease;
            option.textContent = disease;
            diseaseSelect.appendChild(option);
        }
    }
}

// Calculate dosage and show custom message
function calculateDosage() {
    let weight = parseFloat(document.getElementById("weight").value);
    let medicine = document.getElementById("medicine").value;
    let disease = document.getElementById("disease").value;
    let resultDiv = document.getElementById("result");

    if (!weight || !medicine || !disease) {
        resultDiv.innerHTML = "<p style='color:red;'>Please fill all fields!</p>";
        return;
    }

    let { factor, message } = dosageFactors[medicine][disease];
    let dosage = factor * weight;

    resultDiv.innerHTML = `
        <p>Recommended Dosage: <strong>${dosage.toFixed(2)}</strong> ml</p>
        <p style="color:blue;"><strong></strong> ${message}</p>
    `;
}
