let tasks = localStorage.getItem("tasks")
   ? JSON.parse(localStorage.getItem("tasks"))
   : [];

const setWarningDisplayValue = (value) => {
   const warning = document.querySelector(".warning");
   warning.style.display = value;
};

const refreshTasks = () => {
   const tasksContainer = document.getElementById("tasks-list");
   tasksContainer.innerHTML = "";
   if (tasks.length > 0) {
      tasks.forEach((task) => {
         const taskElement = document.createElement("div");
         const removeButton = document.createElement("button");

         removeButton.innerText = "X";
         removeButton.className = "remove-button";
         removeButton.dataset.taskId = task.id;
         removeButton.addEventListener("click", removeTask);

         taskElement.className = "task";
         taskElement.innerText = task.value;
         taskElement.appendChild(removeButton);
         tasksContainer.appendChild(taskElement);
      });
   }
};

const addTask = () => {
   const input = document.getElementById("task-input");
   setWarningDisplayValue("none");

   if (input.value.trim()) {
      const taskItem = {};
      const ids = tasks.map((task) => task.id);

      taskItem.id = ids.length > 0 ? ids[ids.length - 1] + 1 : 1;
      taskItem.value = input.value;
      input.value = "";

      tasks.push(taskItem);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      refreshTasks();
   } else {
      setWarningDisplayValue("block");
   }
};

const removeTask = (event) => {
   const taskId = event.target.dataset.taskId;
   tasks = tasks.filter((task) => task.id !== parseInt(taskId));
   localStorage.setItem("tasks", JSON.stringify(tasks));
   refreshTasks();
};

refreshTasks();
