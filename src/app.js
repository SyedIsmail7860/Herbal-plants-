/* =========================================
   HERBAL PLANTS WEBSITE
   src/app.js
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       LOADER
    ===================================== */

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.classList.add("hide");
        }, 700);
    });


    /* =====================================
       MOBILE MENU
    ===================================== */

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", () => {

            navMenu.classList.toggle("show");

            const icon = menuBtn.querySelector("i");

            if (navMenu.classList.contains("show")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });


        navMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("show");

                const icon = menuBtn.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            });

        });

    }


    /* =====================================
       DARK / LIGHT MODE
    ===================================== */

    const themeBtn = document.getElementById("themeBtn");

    const savedTheme = localStorage.getItem("herbalTheme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }

    function updateThemeIcon() {

        const icon = themeBtn.querySelector("i");

        if (document.body.classList.contains("dark")) {

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

        } else {

            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");

        }

    }

    updateThemeIcon();


    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const isDark = document.body.classList.contains("dark");

        localStorage.setItem(
            "herbalTheme",
            isDark ? "dark" : "light"
        );

        updateThemeIcon();

    });


    /* =====================================
       DATE & TIME
    ===================================== */

    const dateTime = document.getElementById("dateTime");

    function updateDateTime() {

        const now = new Date();

        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        };

        const date = now.toLocaleDateString(
            "en-IN",
            options
        );

        const time = now.toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        );

        dateTime.textContent = `${date} • ${time}`;

    }

    updateDateTime();

    setInterval(updateDateTime, 1000);


    /* =====================================
       YEAR
    ===================================== */

    document.getElementById("year").textContent =
        new Date().getFullYear();


    /* =====================================
       PLANT SEARCH
    ===================================== */

    const searchInput =
        document.getElementById("plantSearch");

    const clearSearch =
        document.getElementById("clearSearch");

    const plantCards =
        [...document.querySelectorAll(".plant-card")];

    const noPlants =
        document.getElementById("noPlants");


    function filterPlants() {

        const searchValue =
            searchInput.value.toLowerCase().trim();

        let visibleCount = 0;

        plantCards.forEach(card => {

            const name =
                card.dataset.name.toLowerCase();

            const isVisible =
                name.includes(searchValue);

            if (isVisible) {

                card.style.display = "";

                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });


        noPlants.style.display =
            visibleCount === 0 ? "block" : "none";

    }


    searchInput.addEventListener(
        "input",
        filterPlants
    );


    clearSearch.addEventListener("click", () => {

        searchInput.value = "";

        plantCards.forEach(card => {
            card.style.display = "";
        });

        noPlants.style.display = "none";

        document.querySelectorAll(".filter-btn")
            .forEach(btn => btn.classList.remove("active"));

        document
            .querySelector('[data-filter="all"]')
            .classList.add("active");

    });


    /* =====================================
       PLANT CATEGORY FILTER
    ===================================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const filter =
                button.dataset.filter;

            let count = 0;

            plantCards.forEach(card => {

                if (
                    filter === "all" ||
                    card.dataset.type === filter
                ) {

                    card.style.display = "";

                    count++;

                } else {

                    card.style.display = "none";

                }

            });

            noPlants.style.display =
                count === 0 ? "block" : "none";

        });

    });


    /* =====================================
       PLANT DETAILS
    ===================================== */

    const plantData = {

        "Tulsi": {

            icon: "🌿",

            scientific: "Ocimum tenuiflorum",

            about:
                "Tulsi, also called Holy Basil, is a commonly grown herbal plant.",

            uses:
                "It has a long history of traditional use and is commonly valued in household practices.",

            care:
                "Tulsi generally needs sunlight, suitable soil and regular but controlled watering."

        },


        "Neem": {

            icon: "🌳",

            scientific: "Azadirachta indica",

            about:
                "Neem is a well-known tree found in many parts of India.",

            uses:
                "Neem has many traditional household and plant-care uses.",

            care:
                "Neem grows well in warm conditions and needs adequate sunlight."

        },


        "Aloe Vera": {

            icon: "🪴",

            scientific: "Aloe vera",

            about:
                "Aloe Vera is a succulent plant that stores water in its leaves.",

            uses:
                "The plant is traditionally used for skin-care and household purposes.",

            care:
                "Aloe Vera needs good sunlight and well-drained soil. Avoid excessive watering."

        },


        "Ginger": {

            icon: "🌱",

            scientific: "Zingiber officinale",

            about:
                "Ginger is a plant whose underground rhizome is widely used as a food ingredient.",

            uses:
                "Ginger is commonly used in cooking and traditional practices.",

            care:
                "Ginger grows well in warm conditions with moist, well-drained soil."

        },


        "Turmeric": {

            icon: "🌱",

            scientific: "Curcuma longa",

            about:
                "Turmeric is a plant known for its underground rhizome and bright yellow color.",

            uses:
                "It is widely used in cooking and traditional cultural practices.",

            care:
                "Turmeric grows well in warm conditions with suitable soil and regular moisture."

        },


        "Hibiscus": {

            icon: "🌺",

            scientific: "Hibiscus rosa-sinensis",

            about:
                "Hibiscus is a popular flowering plant commonly grown in gardens.",

            uses:
                "It has ornamental value and is also associated with traditional practices.",

            care:
                "Hibiscus generally benefits from sunlight, suitable soil and regular watering."

        }

    };


    const plantModal =
        document.getElementById("plantModal");

    const closeModal =
        document.getElementById("closeModal");

    const modalIcon =
        document.getElementById("modalIcon");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalScientific =
        document.getElementById("modalScientific");

    const modalAbout =
        document.getElementById("modalAbout");

    const modalUses =
        document.getElementById("modalUses");

    const modalCare =
        document.getElementById("modalCare");


    document.querySelectorAll(".plant-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                const plantName =
                    button.dataset.plant;

                const plant =
                    plantData[plantName];

                if (!plant) return;

                modalIcon.textContent =
                    plant.icon;

                modalTitle.textContent =
                    plantName;

                modalScientific.textContent =
                    plant.scientific;

                modalAbout.textContent =
                    plant.about;

                modalUses.textContent =
                    plant.uses;

                modalCare.textContent =
                    plant.care;

                plantModal.classList.add("show");

                document.body.style.overflow =
                    "hidden";

            });

        });


    function closePlantModal() {

        plantModal.classList.remove("show");

        document.body.style.overflow =
            "";

    }


    closeModal.addEventListener(
        "click",
        closePlantModal
    );


    plantModal.addEventListener("click", event => {

        if (event.target === plantModal) {
            closePlantModal();
        }

    });


    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            plantModal.classList.contains("show")
        ) {
            closePlantModal();
        }

    });


    /* =====================================
       QUIZ
    ===================================== */

    const quizQuestions = [

        {
            question:
                "Which plant is commonly known as Holy Basil?",

            answers: [
                "Tulsi",
                "Neem",
                "Ginger",
                "Hibiscus"
            ],

            correct: 0
        },


        {
            question:
                "Which part of ginger is commonly used?",

            answers: [
                "Flower",
                "Rhizome",
                "Leaf",
                "Fruit"
            ],

            correct: 1
        },


        {
            question:
                "Which plant is a succulent?",

            answers: [
                "Aloe Vera",
                "Neem",
                "Turmeric",
                "Hibiscus"
            ],

            correct: 0
        },


        {
            question:
                "What is an important reason to conserve herbal plants?",

            answers: [
                "To reduce biodiversity",
                "To protect useful plant knowledge",
                "To increase chemical use",
                "To remove traditional knowledge"
            ],

            correct: 1
        },


        {
            question:
                "What should be encouraged instead of excessive chemical pesticides?",

            answers: [
                "Natural methods",
                "More chemicals",
                "No cultivation",
                "Burning plants"
            ],

            correct: 0
        }

    ];


    let currentQuestion = 0;
    let score = 0;
    let answered = false;


    const questionElement =
        document.getElementById("question");

    const answersElement =
        document.getElementById("answers");

    const nextButton =
        document.getElementById("nextQuestion");

    const questionNumber =
        document.getElementById("questionNumber");

    const scoreText =
        document.getElementById("scoreText");

    const quizProgress =
        document.getElementById("quizProgress");

    const quizResult =
        document.getElementById("quizResult");


    function loadQuestion() {

        answered = false;

        const question =
            quizQuestions[currentQuestion];

        questionElement.textContent =
            question.question;

        questionNumber.textContent =
            `Question ${currentQuestion + 1} of ${quizQuestions.length}`;

        scoreText.textContent =
            `Score: ${score}`;

        quizProgress.style.width =
            `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;

        answersElement.innerHTML = "";

        question.answers.forEach(
            (answer, index) => {

                const button =
                    document.createElement("button");

                button.className =
                    "answer-btn";

                button.textContent =
                    answer;

                button.addEventListener(
                    "click",
                    () => selectAnswer(button, index)
                );

                answersElement.appendChild(button);

            }
        );

        nextButton.disabled = true;

        nextButton.style.opacity = "0.5";

        nextButton.textContent =
            currentQuestion === quizQuestions.length - 1
                ? "Finish Quiz"
                : "Next Question";

    }


    function selectAnswer(button, selectedIndex) {

        if (answered) return;

        answered = true;

        const question =
            quizQuestions[currentQuestion];

        const allButtons =
            document.querySelectorAll(".answer-btn");


        allButtons.forEach(
            (btn, index) => {

                btn.disabled = true;

                if (index === question.correct) {
                    btn.classList.add("correct");
                }

            }
        );


        if (selectedIndex === question.correct) {

            button.classList.add("correct");

            score++;

            scoreText.textContent =
                `Score: ${score}`;

        } else {

            button.classList.add("wrong");

        }


        nextButton.disabled = false;

        nextButton.style.opacity = "1";

    }


    nextButton.addEventListener("click", () => {

        if (!answered) return;

        currentQuestion++;

        if (
            currentQuestion >=
            quizQuestions.length
        ) {

            showQuizResult();

        } else {

            loadQuestion();

        }

    });


    function showQuizResult() {

        questionElement.textContent =
            "🎉 Quiz Completed!";

        answersElement.innerHTML = "";

        questionNumber.textContent =
            "Completed";

        quizProgress.style.width =
            "100%";

        nextButton.textContent =
            "Restart Quiz";

        nextButton.disabled = false;

        nextButton.style.opacity = "1";


        const percentage =
            Math.round(
                (score / quizQuestions.length) * 100
            );


        if (percentage >= 80) {

            quizResult.textContent =
                `Excellent! You scored ${score}/${quizQuestions.length} (${percentage}%). 🌿`;

        } else if (percentage >= 50) {

            quizResult.textContent =
                `Good job! You scored ${score}/${quizQuestions.length} (${percentage}%). 🌱`;

        } else {

            quizResult.textContent =
                `Keep learning! You scored ${score}/${quizQuestions.length} (${percentage}%). 📚`;

        }


        nextButton.onclick = restartQuiz;

    }


    function restartQuiz() {

        currentQuestion = 0;

        score = 0;

        quizResult.textContent = "";

        nextButton.onclick = null;

        loadQuestion();

    }


    loadQuestion();


    /* =====================================
       MUSIC PLAYER
    ===================================== */

    const music =
        document.getElementById("backgroundMusic");

    const musicBtn =
        document.getElementById("musicBtn");

    let musicPlaying = false;


    musicBtn.addEventListener("click", async () => {

        try {

            if (!musicPlaying) {

                await music.play();

                musicPlaying = true;

                musicBtn.textContent = "⏸️";

                musicBtn.classList.add("playing");

                musicBtn.title = "Pause music";

            } else {

                music.pause();

                musicPlaying = false;

                musicBtn.textContent = "🎵";

                musicBtn.classList.remove("playing");

                musicBtn.title = "Play music";

            }

        } catch (error) {

            alert(
                "Please make sure music.mp3 is in the main project folder."
            );

        }

    });


    /* =====================================
       READ ALOUD
    ===================================== */

    const readBtn =
        document.getElementById("readBtn");

    let speaking = false;


    readBtn.addEventListener("click", () => {

        if (!("speechSynthesis" in window)) {

            alert(
                "Text-to-speech is not supported in this browser."
            );

            return;

        }


        if (speaking) {

            speechSynthesis.cancel();

            speaking = false;

            readBtn.innerHTML =
                '<i class="fa-solid fa-volume-high"></i>';

            return;

        }


        const main =
            document.querySelector("main");

        const text =
            main.innerText.substring(0, 7000);


        const speech =
            new SpeechSynthesisUtterance(text);

        speech.rate = 0.95;

        speech.pitch = 1;

        speech.lang = "en-IN";


        speech.onend = () => {

            speaking = false;

            readBtn.innerHTML =
                '<i class="fa-solid fa-volume-high"></i>';

        };


        speechSynthesis.speak(speech);

        speaking = true;

        readBtn.innerHTML =
            '<i class="fa-solid fa-stop"></i>';

    });


    /* =====================================
       BACK TO TOP
    ===================================== */

    const backTop =
        document.getElementById("backTop");


    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            backTop.classList.add("show");

        } else {

            backTop.classList.remove("show");

        }

    });


    backTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =====================================
       REVEAL ON SCROLL
    ===================================== */

    const revealElements =
        document.querySelectorAll(
            ".about-card, .plant-card, .benefit-card, .problem-card, .suggestion-i
