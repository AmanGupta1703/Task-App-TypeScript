const taskFormEl = document.querySelector<HTMLFormElement>(".form")!;
const formInputEl = document.querySelector<HTMLInputElement>(".form-input")!;
const taskListEl = document.querySelector<HTMLUListElement>(".list")!;

const tasks: Task[] = loadTasks();

tasks.forEach(renderTask);

type Task = {
  description: string;
  isCompleted: boolean;
};

function addTask(task: Task): void {
  tasks.push(task);
}

function renderTask(task: Task): void {
  const taskEl = document.createElement("li");
  taskEl.textContent = task.description;

  // checkbox
  const taskCheckboxEl = document.createElement("input");
  taskCheckboxEl.type = "checkbox";
  taskCheckboxEl.checked = task.isCompleted;

  taskCheckboxEl.addEventListener("change", () => {
    task.isCompleted = !task.isCompleted;
    updateStorage();
  });

  taskEl.appendChild(taskCheckboxEl);

  taskListEl.appendChild(taskEl);
}

function updateStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const storedTasked = localStorage.getItem("tasks");

  return storedTasked ? JSON.parse(storedTasked) : [];
}

taskFormEl.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskDescription = formInputEl.value;

  if (taskDescription) {
    const task: Task = {
      description: taskDescription,
      isCompleted: false,
    };

    addTask(task);

    renderTask(task);

    updateStorage();

    formInputEl.value = "";
    return;
  }

  alert("Please enter a task description.");
});
