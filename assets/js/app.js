const appData = loadData();
async function loadComponent(id, file) {

    const response = await fetch(file);

    const data = await response.text();

    document.getElementById(id).innerHTML = data;
}

async function initApp() {

    // Load Components

    await loadComponent(
        "sidebar-container",
        "./components/sidebar.html"
    );

    await loadComponent(
        "navbar-container",
        "./components/navbar.html"
    );

    await loadComponent(
        "dashboard-container",
        "./components/dashboard.html"
    );

    // Initialize Features

    initializeSidebar();

    initializeNotifications();

    initializeTimer();

    initializeXPBar();

    initializeChart();

    renderDashboardData();

    initializeTaskManager();

    initializeAIChat();

}

/* ================= SIDEBAR ================= */

function initializeSidebar() {

    const menuBtn =
        document.getElementById("menuBtn");

    const sidebar =
        document.getElementById("sidebar");

    const overlay =
        document.getElementById("overlay");

    if (!menuBtn || !sidebar || !overlay) return;

    menuBtn.addEventListener("click", () => {

        sidebar.classList.toggle("left-0");

        sidebar.classList.toggle("left-[-100%]");

        overlay.classList.toggle("hidden");
    });

    overlay.addEventListener("click", () => {

        sidebar.classList.add("left-[-100%]");

        sidebar.classList.remove("left-0");

        overlay.classList.add("hidden");
    });
}

/* ================= TIMER ================= */

function initializeTimer() {

    let timer;

    let timeLeft = 1500;

    const timerDisplay =
        document.getElementById("timer");

    const startBtn =
        document.getElementById("startTimer");

    const resetBtn =
        document.getElementById("resetTimer");

    if (!timerDisplay || !startBtn || !resetBtn) return;

    function updateTimer() {

        const minutes =
            Math.floor(timeLeft / 60);

        const seconds =
            timeLeft % 60;

        timerDisplay.innerHTML =
            `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    startBtn.addEventListener("click", () => {

        clearInterval(timer);

        timer = setInterval(() => {

            if (timeLeft > 0) {

                timeLeft--;

                updateTimer();

            } else {

                clearInterval(timer);

            }

        }, 1000);
    });

    resetBtn.addEventListener("click", () => {

        clearInterval(timer);

        timeLeft = 1500;

        updateTimer();
    });

    updateTimer();
}

/* ================= XP BAR ================= */

function initializeXPBar() {

    const xpBar =
        document.getElementById("xpBar");

    if (!xpBar) return;

    setTimeout(() => {

        xpBar.style.width = "78%";

    }, 500);
}

/* ================= NOTIFICATIONS ================= */

function initializeNotifications() {

    const notificationBtn =
        document.getElementById("notificationBtn");

    const notificationPanel =
        document.getElementById("notificationPanel");

    if (!notificationBtn || !notificationPanel) return;

    notificationBtn.addEventListener("click", () => {

        notificationPanel.classList.toggle("hidden");
    });
}

/* ================= CHART ================= */

function initializeChart() {

    const ctx =
        document.getElementById("studyChart");

    if (!ctx) return;

    new Chart(ctx, {

        type: "line",

        data: {

            labels: [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun"
            ],

            datasets: [{

                label: "Study Hours",

                data: [2, 4, 3, 6, 5, 8, 7],

                borderColor: "#7C3AED",

                backgroundColor:
                    "rgba(124,58,237,0.2)",

                fill: true,

                tension: 0.4
            }]
        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    labels: {

                        color: "white"
                    }
                }
            },

            scales: {

                x: {

                    ticks: {

                        color: "white"
                    },

                    grid: {

                        color:
                            "rgba(255,255,255,0.05)"
                    }
                },

                y: {

                    ticks: {

                        color: "white"
                    },

                    grid: {

                        color:
                            "rgba(255,255,255,0.05)"
                    }
                }
            }
        }
    });
}
/* ================= RENDER DATA ================= */

function renderDashboardData() {

    const xp =
        document.getElementById("xpValue");

    const streak =
        document.getElementById("streakValue");

    const studyHours =
        document.getElementById("studyHoursValue");

    const mockScore =
        document.getElementById("mockScoreValue");

    const levelValue =
        document.getElementById("levelValue");

    // Calculate Level

    const level =
        Math.floor(appData.xp / 1000);

    const xpProgress =
        appData.xp % 1000;

    // Render Values

    if (xp)
        xp.innerText = appData.xp;

    if (streak)
        streak.innerText = appData.streak;

    if (studyHours)
        studyHours.innerText =
            appData.studyHours;

    if (mockScore)
        mockScore.innerText =
            appData.mockScore;

    if (levelValue)
        levelValue.innerText = level;

    // Update XP Bar

    const xpBar =
        document.getElementById("xpBar");

    if (xpBar) {

        xpBar.style.width =
            `${xpProgress / 10}%`;
    }
}
/* ================= TASK MANAGER ================= */

function renderTasks() {

    const taskList =
        document.getElementById("taskList");

    if (!taskList) return;

    taskList.innerHTML = "";

    appData.tasks.forEach((task, index) => {

        taskList.innerHTML += `

        <div
            class="bg-[#111827] border border-white/10 rounded-2xl p-5 flex items-center justify-between">

            <div class="flex items-center gap-4">

                <input
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${index})"
                    class="w-5 h-5 accent-purple-500">

                <h3 class="${task.completed
                ? 'line-through text-gray-500'
                : 'text-white'} text-lg">

                    ${task.title}

                </h3>

            </div>

            <button
                onclick="deleteTask(${index})"
                class="text-red-400 hover:text-red-500 transition-all duration-300">

                <i class="fa-solid fa-trash"></i>

            </button>

        </div>
        `;
    });
}

function addTask() {

    const taskInput =
        document.getElementById("taskInput");

    if (!taskInput.value.trim()) return;

    appData.tasks.push({

        title: taskInput.value,

        completed: false
    });

    saveData(appData);

    renderTasks();

    taskInput.value = "";
}

function toggleTask(index) {

    appData.tasks[index].completed =
        !appData.tasks[index].completed;

    // Reward XP ONLY when completed

    if (appData.tasks[index].completed) {

        appData.xp += 50;

        showXPReward(50);
    }

    saveData(appData);

    renderTasks();

    renderDashboardData();
}

function deleteTask(index) {

    appData.tasks.splice(index, 1);

    saveData(appData);

    renderTasks();
}

function initializeTaskManager() {

    const addTaskBtn =
        document.getElementById("addTaskBtn");

    if (!addTaskBtn) return;

    addTaskBtn.addEventListener("click", addTask);

    renderTasks();
}
/* ================= XP REWARD POPUP ================= */

function showXPReward(amount) {

    const popup =
        document.createElement("div");

    popup.innerText =
        `+${amount} XP`;

    popup.className =
        `
        fixed top-10 right-10
        bg-primary
        text-white
        px-6 py-4
        rounded-2xl
        shadow-glow
        text-xl
        font-bold
        z-[9999]
        animate-bounce
    `;

    document.body.appendChild(popup);

    setTimeout(() => {

        popup.remove();

    }, 2000);
}
/* ================= AI CHAT SYSTEM ================= */

function initializeAIChat() {

    const aiChatBtn =
        document.getElementById("aiChatBtn");

    const chatWindow =
        document.getElementById("chatWindow");

    const closeChatBtn =
        document.getElementById("closeChatBtn");

    const sendChatBtn =
        document.getElementById("sendChatBtn");

    const chatInput =
        document.getElementById("chatInput");

    const chatMessages =
        document.getElementById("chatMessages");

    if (!aiChatBtn) return;

    // Open Chat

    aiChatBtn.addEventListener("click", () => {

        chatWindow.classList.remove("hidden");
    });

    // Close Chat

    closeChatBtn.addEventListener("click", () => {

        chatWindow.classList.add("hidden");
    });

    // Send Message

    sendChatBtn.addEventListener("click", sendMessage);

    chatInput.addEventListener("keypress", (e) => {

        if (e.key === "Enter") {

            sendMessage();
        }
    });

async function sendMessage() {

    const message =
        chatInput.value.trim();

    if (!message) return;

    // USER MESSAGE

    chatMessages.innerHTML += `

    <div class="flex justify-end">

        <div
            class="bg-primary text-white rounded-2xl rounded-br-sm p-4 max-w-[80%]">

            ${message}

        </div>

    </div>
    `;

    chatInput.value = "";

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

    // LOADING MESSAGE

    const loadingId =
        Date.now();

    chatMessages.innerHTML += `

    <div
        id="loading-${loadingId}"
        class="flex items-start gap-3">

        <div
            class="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">

            <i class="fa-solid fa-robot text-primary"></i>

        </div>

        <div
            class="bg-primary/10 border border-primary/20 rounded-2xl rounded-tl-sm p-4 max-w-[80%]">

            Thinking...

        </div>

    </div>
    `;

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

    // GEMINI RESPONSE

    const aiResponse =
        await askGemini(message);

    // REMOVE LOADING

    document
        .getElementById(`loading-${loadingId}`)
        .remove();

    // SHOW AI RESPONSE

    chatMessages.innerHTML += `

    <div class="flex items-start gap-3">

        <div
            class="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">

            <i class="fa-solid fa-robot text-primary"></i>

        </div>

        <div
            class="bg-primary/10 border border-primary/20 rounded-2xl rounded-tl-sm p-4 max-w-[80%] whitespace-pre-wrap">

            ${aiResponse}

        </div>

    </div>
    `;

    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}
}
/* ================= START APP ================= */

initApp();