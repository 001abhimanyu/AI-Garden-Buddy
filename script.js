/*
    AI Garden Buddy
    Frontend JavaScript

    This version uses a lightweight local recommendation
    engine so the project works immediately on GitHub Pages.

    The AI integration can later be connected to a browser-based
    open-weight model such as Transformers.js.
*/


// ===============================
// PLANT DATABASE
// ===============================

const plants = {

    spring: {
        full: [
            "Tomato",
            "Cucumber",
            "Basil",
            "Marigold"
        ],

        partial: [
            "Spinach",
            "Coriander",
            "Mint",
            "Lettuce"
        ],

        shade: [
            "Mint",
            "Coriander",
            "Lettuce"
        ]
    },


    summer: {
        full: [
            "Tomato",
            "Chili",
            "Basil",
            "Okra"
        ],

        partial: [
            "Mint",
            "Coriander",
            "Spinach"
        ],

        shade: [
            "Mint",
            "Coriander",
            "Lettuce"
        ]
    },


    monsoon: {
        full: [
            "Okra",
            "Tomato",
            "Chili",
            "Basil"
        ],

        partial: [
            "Coriander",
            "Mint",
            "Spinach"
        ],

        shade: [
            "Mint",
            "Coriander",
            "Ginger"
        ]
    },


    autumn: {
        full: [
            "Carrot",
            "Radish",
            "Peas",
            "Coriander"
        ],

        partial: [
            "Spinach",
            "Lettuce",
            "Coriander"
        ],

        shade: [
            "Mint",
            "Coriander",
            "Lettuce"
        ]
    },


    winter: {
        full: [
            "Spinach",
            "Carrot",
            "Radish",
            "Peas"
        ],

        partial: [
            "Spinach",
            "Coriander",
            "Lettuce"
        ],

        shade: [
            "Mint",
            "Coriander",
            "Lettuce"
        ]
    }

};


// ===============================
// GARDEN FORM
// ===============================

const gardenForm =
    document.getElementById("gardenForm");


gardenForm.addEventListener("submit", function (event) {

    event.preventDefault();

    generateGardenPlan();

});


// ===============================
// GENERATE PLAN
// ===============================

function generateGardenPlan() {

    const location =
        document.getElementById("location").value.trim();

    const season =
        document.getElementById("season").value;

    const sunlight =
        document.getElementById("sunlight").value;

    const space =
        document.getElementById("space").value;

    const experience =
        document.getElementById("experience").value;

    const interest =
        document.getElementById("interest").value.trim();


    if (!location) {

        alert("Please enter your location.");

        return;

    }


    // Get plants based on season and sunlight

    let recommendedPlants =
        plants[season][sunlight];


    // Customize based on user interest

    if (interest.length > 0) {

        const keywords =
            interest.toLowerCase();

        const allPlants = [

            "Tomato",
            "Cucumber",
            "Basil",
            "Marigold",
            "Spinach",
            "Coriander",
            "Mint",
            "Lettuce",
            "Chili",
            "Okra",
            "Carrot",
            "Radish",
            "Peas",
            "Ginger"

        ];


        const matchingPlants =
            allPlants.filter(function (plant) {

                return keywords.includes(
                    plant.toLowerCase()
                );

            });


        if (matchingPlants.length > 0) {

            recommendedPlants = [
                ...matchingPlants,
                ...recommendedPlants
            ];

        }

    }


    // Remove duplicate plants

    recommendedPlants =
        [...new Set(recommendedPlants)];


    // Limit recommendations

    recommendedPlants =
        recommendedPlants.slice(0, 5);


    // Display result

    displayGardenPlan(
        location,
        season,
        sunlight,
        space,
        experience,
        recommendedPlants
    );

}


// ===============================
// DISPLAY PLAN
// ===============================

function displayGardenPlan(
    location,
    season,
    sunlight,
    space,
    experience,
    recommendedPlants
) {

    const emptyResult =
        document.getElementById("emptyResult");

    const gardenResult =
        document.getElementById("gardenResult");


    emptyResult.classList.add("hidden");

    gardenResult.classList.remove("hidden");


    // Title

    document.getElementById(
        "resultTitle"
    ).textContent =
        `Garden Plan for ${location}`;


    // Plants

    const plantList =
        document.getElementById("plantList");

    plantList.innerHTML = "";


    recommendedPlants.forEach(function (plant) {

        const plantElement =
            document.createElement("span");

        plantElement.className = "plant";

        plantElement.textContent =
            plant;

        plantList.appendChild(
            plantElement
        );

    });


    // Advice

    const advice =
        createGardenAdvice(
            season,
            sunlight,
            space,
            experience
        );


    document.getElementById(
        "gardenAdvice"
    ).textContent = advice;


    // Mission

    const mission =
        createMission(
            space,
            experience
        );


    document.getElementById(
        "missionText"
    ).textContent = mission;

    document.getElementById(
        "outdoorMission"
    ).textContent = mission;


    // Save plan locally

    const gardenData = {

        location,
        season,
        sunlight,
        space,
        experience,
        plants: recommendedPlants,
        mission

    };


    localStorage.setItem(
        "gardenPlan",
        JSON.stringify(gardenData)
    );


    // Scroll to result

    gardenResult.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


// ===============================
// GARDEN ADVICE
// ===============================

function createGardenAdvice(
    season,
    sunlight,
    space,
    experience
) {

    let advice =
        "Start small and focus on healthy soil and consistent care. ";


    if (sunlight === "full") {

        advice +=
            "Your garden receives plenty of sunlight, so choose plants that enjoy direct sun. ";

    }

    else if (sunlight === "partial") {

        advice +=
            "Your partial sunlight is suitable for herbs and leafy vegetables. ";

    }

    else {

        advice +=
            "Since your garden receives less sunlight, focus on shade-tolerant herbs and leafy plants. ";

    }


    if (space === "small") {

        advice +=
            "Use containers or vertical gardening to make the most of your available space. ";

    }

    else if (space === "large") {

        advice +=
            "You have enough space to experiment with multiple plant varieties. ";

    }


    if (experience === "beginner") {

        advice +=
            "As a beginner, start with a few easy plants and learn through observation.";

    }

    else if (experience === "advanced") {

        advice +=
            "You can experiment with companion planting and more advanced garden planning.";

    }

    else {

        advice +=
            "Keep building your routine by observing your plants regularly.";

    }


    return advice;

}


// ===============================
// OUTDOOR MISSION
// ===============================

function createMission(
    space,
    experience
) {

    if (experience === "beginner") {

        return "Spend 20 minutes outside preparing a small planting area and plant one easy-to-grow seed.";

    }


    if (space === "small") {

        return "Spend 20 minutes outside caring for your container plants. Remove dead leaves and check the soil.";

    }


    if (space === "large") {

        return "Spend 20 minutes outside checking your garden. Remove weeds and inspect your plants for pests.";

    }


    return "Spend 20 minutes outside watering your plants, checking the soil and removing unhealthy leaves.";

}


// ===============================
// SCROLL TO MISSION
// ===============================

function scrollToMission() {

    document
        .getElementById("mission")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ===============================
// COMPLETE MISSION
// ===============================

const completeMission =
    document.getElementById(
        "completeMission"
    );


completeMission.addEventListener(
    "click",
    function () {

        const completionMessage =
            document.getElementById(
                "missionComplete"
            );


        completionMessage.classList.remove(
            "hidden"
        );


        completeMission.textContent =
            "Mission Completed";


        completeMission.disabled =
            true;


        localStorage.setItem(
            "gardenMissionCompleted",
            new Date().toISOString()
        );

    }
);


// ===============================
// LOAD SAVED PLAN
// ===============================

window.addEventListener(
    "DOMContentLoaded",
    function () {

        const savedPlan =
            localStorage.getItem(
                "gardenPlan"
            );


        if (!savedPlan) {

            return;

        }


        try {

            const data =
                JSON.parse(savedPlan);


            document.getElementById(
                "location"
            ).value =
                data.location || "";


            document.getElementById(
                "season"
            ).value =
                data.season || "spring";


            document.getElementById(
                "sunlight"
            ).value =
                data.sunlight || "full";


            document.getElementById(
                "space"
            ).value =
                data.space || "small";


            document.getElementById(
                "experience"
            ).value =
                data.experience || "beginner";


        }

        catch (error) {

            console.log(
                "Could not load saved garden plan."
            );

        }

    }
);