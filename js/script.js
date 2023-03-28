{
    let tasks = [];

    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const markAllDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;

        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="tasks__item ${task.done && hideDoneTasks ? " tasks__item--hidden" : ""} js-tasks">
                <button class="js-toggleDone tasks__button tasks__button--toggleDone">
                ${task.done ? "✔️" : ""}
                </button>
                    <span class="tasks_content${task.done ? " tasks__content--done" : ""}">
                ${task.content} </span>
                <button class="js-remove tasks_button tasks__button--remove">❌</button>
            </li>
        `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;

    };

    const renderButtons = () => {
        const buttoElement = document.querySelector(".js-buttons");

        if (tasks.lenght) {
            buttoElement.innerHTML = "";
            return;
        }

        buttoElement.innerHTML = `
        <button class="buttons__button js-toggleHideDoneTasks">
                ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button class="buttons__button js-markAllDone" 
            ${tasks.every(({ done }) => done) ? "disabled" : ""}
            >
                Ukończ wszystkie
            </button>
    `;
    };

    const bindButtonsEvents = () => {
        const markAllDoneButton = document.querySelector(".js-markAllDone");
        //jeśli przycisk istnieje//
        if (markAllDoneButton) {
            //dodaję event listenera//
            markAllDoneButton.addEventListener("click", markAllDone);
        }

        const toggleHideDoneButton = document.querySelector(".js-toggleHideDoneTasks");

        if (toggleHideDoneButton) {
            toggleHideDoneButton.addEventListener("click", toggleHideDoneTasks)
        }
    };


    const render = () => {
        renderTasks();
        renderButtons();
        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();
        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);

    };

    init();
}