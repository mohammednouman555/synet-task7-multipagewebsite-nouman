const taskInput =
    document.getElementById("taskInput");

const taskList =
    document.getElementById("taskList");

const totalTasks =
    document.getElementById("totalTasks");

const completedTasks =
    document.getElementById("completedTasks");

// LOAD TASKS

let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

// ADD TASK

function addTask() {

    const taskText =
        taskInput.value.trim();

    if (taskText === "") {

        alert("Please enter a task.");
        return;
    }

    const task = {

        text: taskText,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    renderTasks();

    taskInput.value = "";
}

// RENDER TASKS

function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li =
            document.createElement("li");

        li.classList.add("task-item");

        li.innerHTML = `

            <span class="task-text
                ${task.completed ? "completed" : ""}">
                ${task.text}
            </span>

            <div class="task-buttons">

                <button class="complete-btn"
                    onclick="toggleTask(${index})">

                    <i class="fas fa-check"></i>

                </button>

                <button class="delete-btn"
                    onclick="deleteTask(${index})">

                    <i class="fas fa-trash"></i>

                </button>

            </div>
        `;

        taskList.appendChild(li);
    });

    updateStats();
}

// TOGGLE COMPLETE

function toggleTask(index) {

    tasks[index].completed =
        !tasks[index].completed;

    saveTasks();

    renderTasks();
}

// DELETE TASK

function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();

    renderTasks();
}

// CLEAR ALL

function clearAllTasks() {

    tasks = [];

    saveTasks();

    renderTasks();
}

// SAVE TASKS

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

// UPDATE STATS

function updateStats() {

    totalTasks.textContent =
        tasks.length;

    completedTasks.textContent =
        tasks.filter(task =>
            task.completed).length;
}

// ENTER KEY SUPPORT

taskInput.addEventListener("keypress",
function(event) {

    if (event.key === "Enter") {

        addTask();
    }
});