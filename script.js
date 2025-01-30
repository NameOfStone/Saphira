function calculateDosage() {
    var medicine = document.getElementById("medicine").value;
    var weight = document.getElementById("weight").value;
    var resultElement = document.getElementById("result");

    if (!weight || isNaN(weight)) {
        alert("Please enter a valid weight.");
        return;
    }

    var dosage;
    var dosageInfo;

    switch (medicine) {
    case "metronidazole":
        dosage = 1.6 * weight / 3;
        dosageInfo = "Every 8 hours for 7 to 10 days";
        break;
    case "penicillin_V":
        dosage = 0.7 * weight / 4;
        dosageInfo = "Every 6 hours for 5 to 10 days";
        break;
    case "amoxicillin_125":
        dosage = 2.8 * weight / 3;
        dosageInfo = "Every 8 hours for 10 to 14 days";
        break;
    case "amoxicillin_250":
        dosage = 1.4 * weight / 3;
        dosageInfo = "Every 8 hours for 10 to 14 days";
        break;
    case "amoxicillin_200":
        dosage = 1.75 * weight / 2;
        dosageInfo = "Every 12 hours for 10 to 14 days";
        break;
    case "amoxicillin_400":
        dosage = 0.875 * weight / 2;
        dosageInfo = "Every 12 hours for 10 to 14 days";
        break;
    case "azithromycin_100":
        dosage = 0.25 * weight / 1;
        dosageInfo = "On the first day, twice of the calculated amount, then the calculated amount until the fifth day";
        break;
    case "azithromycin_200":
        dosage = 0.125 * weight / 1;
        dosageInfo = "On the first day, twice of the calculated amount, then the calculated amount until the fifth day";
        break;
    case "cefixime":
        dosage = 0.4 * weight / 2;
        dosageInfo = "Every 12 hours for 5 to 7 days";
        break;
    case "cephalexin_125":
        dosage = 1.6 * weight / 4;
        dosageInfo = "Every 6 hours for 7 to 14 days";
        break;
    case "cephalexin_250":
        dosage = 0.8 * weight / 4;
        dosageInfo = "Every 6 hours for 7 to 14 days";
        break;
    case "clarithromycin_125":
        dosage = 0.6 * weight / 2;
        dosageInfo = "Every 12 hours for 7 to 14 days";
        break;
    case "clarithromycin_250":
        dosage = 0.3 * weight / 2;
        dosageInfo = "Every 12 hours for 7 to 14 days";
        break;
    case "co-amoxiclave_156":
        dosage = 3.2 * weight / 3;
        dosageInfo = "Every 8 hours for 5 to 14 days";
        break;
    case "co-amoxiclave_312":
        dosage = 1.6 * weight / 3;
        dosageInfo = "Every 8 hours for 5 to 14 days";
        break;
    case "co-amoxiclave_228":
        dosage = 2 * weight / 2;
        dosageInfo = "Every 12 hours for 5 to 14 days";
        break;
    case "co-amoxiclave_457":
        dosage = 1 * weight / 2;
        dosageInfo = "Every 12 hours for 5 to 14 days";
        break;
    case "co-amoxiclave_643":
        dosage = 0.6667 * weight / 2;
        dosageInfo = "Every 12 hours for 5 to 14 days";
        break;
    case "co-trimoxazole":
        dosage = 1.125 * weight / 2;
        dosageInfo = "Every 12 hours for 3 to 7 days";
        break;
    case "erythromycin":
        dosage = 1.25 * weight / 4;
        dosageInfo = "Every 6 hours for 6 to 14 days";
        break;
    default:
        alert("Invalid medicine selection");
        return;
}

    resultElement.innerText = "Recommended Dosage: " + dosage.toFixed(2) + " ml\n" + dosageInfo;
}

function manualDosageCalculation() {
    var patientWeight = document.getElementById("patientWeight").value;
    var medicineMg = document.getElementById("medicineMg").value;
    var medicineIn5Ml = document.getElementById("medicineIn5Ml").value;
    var timesPerDay = document.getElementById("timesPerDay").value;
    var manualResultElement = document.getElementById("manualResult");

    if (!patientWeight || !medicineMg || !medicineIn5Ml || !timesPerDay) {
        alert("Please enter valid values for all fields.");
        return;
    }

    var manualDosage = ((patientWeight * medicineMg * 5) / medicineIn5Ml) / timesPerDay;
    manualResultElement.innerText = "Manual Dosage: " + manualDosage.toFixed(2) + " ml";
}
// Toggle Between Dark and Light Mode
function toggleMode() {
    let body = document.body;
    let button = document.getElementById("toggleMode");
    
    if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        localStorage.setItem("mode", "light"); // Save mode preference
        button.innerText = "Day"; // Change button text to "Day"
    } else {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
        localStorage.setItem("mode", "dark");
        button.innerText = "Night"; // Change button text to "Night"
    }
}

// Load Preferred Mode on Page Load
window.onload = function () {
    let savedMode = localStorage.getItem("mode");
    let button = document.getElementById("toggleMode");
    
    if (savedMode === "dark") {
        document.body.classList.add("dark-mode");
        button.innerText = "Night"; // Set button text to "Night" for dark mode
    } else {
        document.body.classList.add("light-mode");
        button.innerText = "Day"; // Set button text to "Day" for light mode
    }
};

// Add Toggle Button to the Page
document.addEventListener("DOMContentLoaded", function () {
    let button = document.createElement("button");
    button.id = "toggleMode";
    button.innerText = "Toggle Mode";
    button.onclick = toggleMode;
    document.body.appendChild(button);
});
