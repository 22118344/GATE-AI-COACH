/* ================= DEFAULT DATA ================= */

const defaultData = {

    xp: 8450,

    streak: 18,

    studyHours: 126,

    mockScore: 74,

    tasks: [

        {
            title: "Revise DBMS",
            completed: false
        },

        {
            title: "Solve PYQs",
            completed: true
        }
    ]
};

/* ================= SAVE DATA ================= */

function saveData(data) {

    localStorage.setItem(
        "gateAIData",
        JSON.stringify(data)
    );
}

/* ================= LOAD DATA ================= */

function loadData() {

    const savedData =
        localStorage.getItem("gateAIData");

    if (savedData) {

        return JSON.parse(savedData);

    } else {

        saveData(defaultData);

        return defaultData;
    }
}