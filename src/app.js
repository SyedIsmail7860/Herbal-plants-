/* =====================================================
   HERBAL PLANTS CSP
   INTERACTIVE JAVASCRIPT
===================================================== */


/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("show");
    });
}

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("show");
    });
});


/* ================= DARK / LIGHT MODE ================= */

const themeBtn = document.getElementById("themeBtn");

const savedTheme = localStorage.getItem("herbalTheme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");

    if (themeBtn) {
        themeBtn.textContent = "☀️";
    }
}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.textContent = "☀️";
        localStorage.setItem("herbalTheme", "dark");
    } else {
        themeBtn.textContent = "🌙";
        localStorage.setItem("herbalTheme", "light");
    }

});


/* ================= DATE & TIME ================= */

function updateDateTime() {

    const now = new Date();

    const dateElement = document.getElementById("date");
    const timeElement = document.getElementById("time");

    if (dateElement) {
        dateElement.textContent =
            now.toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            });
    }

    if (timeElement) {
        timeElement.textContent =
            now.toLocaleTimeString("en-IN");
    }
}

updateDateTime();

setInterval(updateDateTime, 1000);


/* ================= YEAR ================= */

document.getElementById("year").textContent =
    "© " + new Date().getFullYear() + " Herbal Plants CSP";


/* =====================================================
   PLANT DATA
===================================================== */

const plantData = {

    tulsi: {
        name: "Tulsi",
        scientific: "Ocimum tenuiflorum",
        icon: "🌿",
        parts: "Leaves and stems",
        benefits: "Traditionally valued for wellness and home remedies.",
        uses: "Herbal drinks and traditional practices.",
        precaution: "Use herbal preparations responsibly and seek professional advice when needed."
    },

    neem: {
        name: "Neem",
        scientific: "Azadirachta indica",
        icon: "🌳",
        parts: "Leaves, bark and seeds",
        benefits: "Traditionally valued for skin and household uses.",
        uses: "Traditional practices and natural products.",
        precaution: "Do not consume neem preparations without appropriate guidance."
    },

    aloe: {
        name: "Aloe Vera",
        scientific: "Aloe barbadensis",
        icon: "🌵",
        parts: "Gel from leaves",
        benefits: "Commonly used in traditional skin-care practices.",
        uses: "Skin-care products and traditional preparations.",
        precaution: "Some people may experience skin irritation or allergies."
    },

    ginger: {
        name: "Ginger",
        scientific: "Zingiber officinale",
        icon: "🫚",
        parts: "Rhizome",
        benefits: "Traditionally used in food and digestive practices.",
        uses: "Tea, cooking and traditional preparations.",
        precaution: "Large amounts may not be suitable for everyone."
    },

    turmeric: {
        name: "Turmeric",
        scientific: "Curcuma longa",
        icon: "🌼",
        parts: "Rhizome",
        benefits: "Commonly used as a spice and in traditional practices.",
        uses: "Cooking, drinks and traditional preparations.",
        precaution: "Normal food use differs from concentrated supplements."
    },

    hibiscus: {
        name: "Hibiscus",
        scientific: "Hibiscus rosa-sinensis",
        icon: "🌺",
        parts: "Flowers and leaves",
        benefits: "Traditionally associated with hair and beauty practices.",
        uses: "Traditional hair-care and decorative purposes.",
        precaution: "Check for allergies before using plant preparations."
    },

    mint: {
        name: "Mint",
        scientific: "Mentha",
        icon: "🌿",
        parts: "Leaves",
        benefits: "Popularly used for flavour, aroma and traditional digestive practices.",
        uses: "Drinks, food and chutneys.",
        precaution: "Strong preparations may not suit everyone."
    },

    lemongrass: {
        name: "Lemongrass",
        scientific: "Cymbopogon",
        icon: "🌾",
        parts: "Leaves and stems",
        benefits: "Known for its fresh aroma and traditional uses.",
        uses: "Tea, cooking and aromatic preparations.",
        precaution: "Avoid concentrated preparations unless appropriately guided."
    }

};


/* =====================================================
   SEARCH + CATEGORY FILTER
===================================================== */

const searchInput = document.getElementById("plantSearch");
const plantCards = document.querySelectorAll(".plant-card");
const filterButtons = document.querySelectorAll(".filter");

let currentFilter = "all";


function filterPlants() {

    const searchText =
        searchInput.value.toLowerCase().trim();

    plantCards.forEach(card => {

        const category =
            card.dataset.category.toLowerCase();

        const searchableText =
            (
                card.dataset.name +
                " " +
                card.dataset.search
            ).toLowerCase();

        const categoryMatch =
            currentFilter === "all" ||
            category.includes(currentFilter);

        const searchMatch =
            searchableText.includes(searchText);

        if (categoryMatch && searchMatch) {
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }

    });

}


searchInput.addEventListener("input", filterPlants);


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        filterPlants();

    });

});


/* =====================================================
   PLANT DETAILS POPUP
===================================================== */

const modal = document.getElementById("plantModal");
const closeModal = document.getElementById("closeModal");

const modalIcon = document.getElementById("modalIcon");
const modalName = document.getElementById("modalName");
const modalScientific = document.getElementById("modalScientific");

const modalParts = document.getElementById("modalParts");
const modalBenefits = document.getElementById("modalBenefits");
const modalUses = document.getElementById("modalUses");
const modalPrecaution = document.getElementById("modalPrecaution");

let currentPlantText = "";


document.querySelectorAll(".details-btn").forEach(button => {

    button.addEventListener("click", () => {

        const id = button.dataset.plant;
        const plant = plantData[id];

        if (!plant) return;

        modalIcon.textContent = plant.icon;
        modalName.textContent = plant.name;
        modalScientific.textContent = plant.scientific;

        modalParts.textContent = plant.parts;
        modalBenefits.textContent = plant.benefits;
        modalUses.textContent = plant.uses;
        modalPrecaution.textContent = plant.precaution;

        currentPlantText =
            `${plant.name}. Scientific name ${plant.scientific}. ` +
            `Parts used: ${plant.parts}. ` +
            `Benefits: ${plant.benefits}. ` +
            `Uses: ${plant.uses}. ` +
            `Precaution: ${plant.precaution}.`;

        modal.classList.add("show");

    });

});


closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
});


modal.addEventListener("click", event => {

    if (event.target === modal) {
        modal.classList.remove("show");
    }

});


/* ================= READ PLANT ================= */

document.getElementById("readPlant").addEventListener("click", () => {

    if (!("speechSynthesis" in window)) {
        alert("Read Aloud is not supported on this browser.");
        return;
    }

    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(currentPlantText);

    speech.rate = 0.9;
    speech.pitch = 1;

    speechSynthesis.speak(speech);

});


/* ================= READ INTRODUCTION ================= */

document.getElementById("readHero").addEventListener("click", () => {

    const text =
        "Herbal Plants Community Service Project. " +
        "This project helps us understand herbal plants, " +
        "their benefits, uses, cultivation and importance in our community.";

    if ("speechSynthesis" in window) {

        speechSynthesis.cancel();

        const speech =
            new SpeechSynthesisUtterance(text);

        speech.rate = 0.9;

        speechSynthesis.speak(speech);

    } else {

        alert("Read Aloud is not supported on this browser.");

    }

});


/* =====================================================
   FAVORITE PLANTS
===================================================== */

const favoriteButtons =
    document.querySelectorAll(".favorite-btn");

let favorites =
    JSON.parse(
        localStorage.getItem("herbalFavorites") || "[]"
    );


function updateFavorites() {

    favoriteButtons.forEach(button => {

        const card = button.closest(".plant-card");
        const name = card.dataset.name;

        if (favorites.includes(name)) {
            button.classList.add("active");
            button.textContent = "♥";
        } else {
            button.classList.remove("active");
            button.textContent = "♡";
        }

    });

}


favoriteButtons.forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(".plant-card");
        const name = card.dataset.name;

        if (favorites.includes(name)) {

            favorites =
                favorites.filter(item => item !== name);

        } else {

            favorites.push(name);

        }

        localStorage.setItem(
            "herbalFavorites",
            JSON.stringify(favorites)
        );

        updateFavorites();

    });

});

updateFavorites();


/* =====================================================
   PLANT OF THE DAY
===================================================== */

const dailyPlants = [

    {
        name: "Tulsi",
        scientific: "Ocimum tenuiflorum",
        icon: "🌿",
        description: "A traditional herbal plant commonly grown around homes."
    },

    {
        name: "Neem",
        scientific: "Azadirachta indica",
        icon: "🌳",
        description: "A useful tree with many traditional applications."
    },

    {
        name: "Aloe Vera",
        scientific: "Aloe barbadensis",
        icon: "🌵",
        description: "A succulent plant commonly used in traditional skin-care."
    },

    {
        name: "Ginger",
        scientific: "Zingiber officinale",
        icon: "🫚",
        description: "A popular spice used in cooking and traditional practices."
    },

    {
        name: "Turmeric",
        scientific: "Curcuma longa",
        icon: "🌼",
        description: "A yellow spice widely used in Indian cooking."
    },

    {
        name: "Hibiscus",
        scientific: "Hibiscus rosa-sinensis",
        icon: "🌺",
        description: "A beautiful flowering plant with traditional uses."
    }

];


const dayIndex =
    Math.floor(Date.now() / 86400000) %
    dailyPlants.length;

const daily =
    dailyPlants[dayIndex];

document.getElementById("dailyIcon").textContent =
    daily.icon;

document.getElementById("dailyName").textContent =
    daily.name;

document.getElementById("dailyScientific").textContent =
    daily.scientific;

document.getElementById("dailyDescription").textContent =
    daily.description;


/* =====================================================
   VIRTUAL HERBAL GARDEN
===================================================== */

const gardenButtons =
    document.querySelectorAll(".garden-plant");

const gardenCount =
    document.getElementById("gardenCount");

let gardenPlants = [];


gardenButtons.forEach(button => {

    button.addEventListener("click", () => {

        const plant =
            button.dataset.garden;

        if (gardenPlants.includes(plant)) {

            gardenPlants =
                gardenPlants.filter(
                    item => item !== plant
                );

            button.classList.remove("selected");

        } else {

            gardenPlants.push(plant);

            button.classList.add("selected");

        }

        gardenCount.textContent =
            gardenPlants.length;

    });

});


/* =====================================================
   QUIZ
===================================================== */

const quizQuestions = [

    {
        question: "Which plant is commonly known as a traditional home herbal plant?",
        answers: ["Tulsi", "Rose", "Mango", "Coconut"],
        correct: "Tulsi"
    },

    {
        question: "Which plant is commonly used as a yellow spice?",
        answers: ["Mint", "Turmeric", "Hibiscus", "Neem"],
        correct: "Turmeric"
    },

    {
        question: "Which plant contains a commonly used gel?",
        answers: ["Aloe Vera", "Ginger", "Tulsi", "Lemongrass"],
        correct: "Aloe Vera"
    },

    {
        question: "Which plant is commonly used as a spice and in tea?",
        answers: ["Ginger", "Hibiscus", "Neem", "Aloe Vera"],
        correct: "Ginger"
    },

    {
        question: "Which plant is commonly associated with traditional hair-care practices?",
        answers: ["Hibiscus", "Ginger", "Turmeric", "Lemongrass"],
        correct: "Hibiscus"
    }

];


let quizIndex = 0;
let quizScore = 0;
let selectedAnswer = false;

let highScore =
    Number(localStorage.getItem("herbalQuizHighScore") || 0);

document.getElementById("highScore").textContent =
    highScore;


function loadQuestion() {

    const question =
        quizQuestions[quizIndex];

    document.getElementById("questionNumber").textContent =
        `Question ${quizIndex + 1} of ${quizQuestions.length}`;

    document.getElementById("question").textContent =
        question.question;

    document.getElementById("quizProgress").style.width =
        `${((quizIndex + 1) / quizQuestions.length) * 100}%`;

    const answers =
        document.getElementById("answers");

    answers.innerHTML = "";

    selectedAnswer = false;

    question.answers.forEach(answer => {

        const button =
            document.createElement("button");

        button.className = "answer-btn";
        button.textContent = answer;

        button.addEventListener("click", () => {

            if (selectedAnswer) return;

            selectedAnswer = true;

            const allButtons =
                document.querySelectorAll(".answer-btn");

            allButtons.forEach(btn => {

                if (btn.textContent === question.correct) {
                    btn.classList.add("correct");
                }

            });

            if (answer === question.correct) {

                button.classList.add("correct");
                quizScore++;

            } else {

                button.classList.add("wrong");

            }

        });

        answers.appendChild(button);

    });

}


document.getElementById("nextQuestion")
    .addEventListener("click", () => {

        if (!selectedAnswer) {
            alert("Please select an answer first.");
            return;
        }

        quizIndex++;

        if (quizIndex >= quizQuestions.length) {

            showQuizResult();

        } else {

            loadQuestion();

        }

    });


function showQuizResult() {

    const percentage =
        Math.round(
            (quizScore / quizQuestions.length) * 100
        );

    document.getElementById("question").textContent =
        "🎉 Quiz Completed!";

    document.getElementById("questionNumber").textContent =
        "Your Result";

    document.getElementById("answers").innerHTML = "";

    document.getElementById("quizResult").textContent =
        `You scored ${quizScore}/${quizQuestions.length} (${percentage}%).`;

    document.getElementById("nextQuestion").textContent =
        "Restart Quiz ↻";

    if (quizScore > highScore) {

        highScore = quizScore;

        localStorage.setItem(
            "herbalQuizHighScore",
            highScore
        );

        document.getElementById("highScore").textContent =
            highScore;

    }

    document.getElementById("nextQuestion").onclick =
        restartQuiz;

}


function restartQuiz() {

    quizIndex = 0;
    quizScore = 0;

    document.getElementById("quizResult").textContent = "";

    document.getElementById("nextQuestion").textContent =
        "Next Question →";

    document.getElementById("nextQuestion").onclick = null;

    loadQuestion();

}


loadQuestion();


/* =====================================================
   MUSIC BUTTON
===================================================== */

const musicBtn =
    document.getElementById("musicBtn");

const music =
    document.getElementById("backgroundMusic");

let musicPlaying = false;


musicBtn.addEventListener("click", () => {

    if (!musicPlaying) {

        music.play()
            .then(() => {

                musicPlaying = true;
                musicBtn.textContent = "⏸️";

            })
            .catch(() => {

                alert("Tap again to start the music.");

            });

    } else {

        music.pause();

        musicPlaying = false;

        musicBtn.textContent = "🎵";

    }

});


/* =====================================================
   BACK TO TOP
===================================================== */

const topBtn =
    document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }

});


topBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


topBtn.style.display = "none";


/* =====================================================
   KEYBOARD SEARCH
===================================================== */

document.addEventListener("keydown", event => {

    if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
    ) {

        event.preventDefault();

        searchInput.focus();

    }

});


/* =====================================================
   SMOOTH NAVIGATION
===================================================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

        const target =
            document.querySelector(link.getAttribute("href"));

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth"
        });

    });

});
