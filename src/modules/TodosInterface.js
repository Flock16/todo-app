import Plus from "../assets/svg/add_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";

class TodosInterface {
  project;
  constructor() {
    this.contentDiv = document.querySelector(".content");
    this.contentGrid = document.createElement("div");
    this.contentGrid.classList.add("contentGrid");
    this.closeInputNewTaskButton = document.querySelector(".close-input-task");
    this.closeInputNewTaskButton.addEventListener("click", () =>
      this.closeInputNewTask()
    );

    this.addNewTaskButtonToDOM();

    this.formSubmitButton = document.querySelector(".task-submit");
    this.formSubmitButton.addEventListener("click", (event) => {
      this.addNewTask(event);
    });
  }

  displayTasks(project) {
    this.contentDiv.textContent = "";
    this.contentGrid.textContent = "";
    this.addNewTaskButtonToDOM();
    this.project = project;
    this.updateLocalStorage(project);

    const header = document.createElement("h1");
    header.textContent = `${
      project.name
    } (${project.getNumberOfIncompleteTasks()})`;

    this.displayTaskListHeaders();
    this.contentDiv.append(header);

    project.tasks.forEach((task) => {
      for (const property in task)
        if (property !== "complete") {
          const taskPara = document.createElement("p");
          taskPara.textContent = task[property];
          taskPara.classList.add("contentTasks");
          taskPara.addEventListener("click", () => this.editTask(task));
          if (task.complete) {
            taskPara.classList.add("taskComplete");
          } else taskPara.classList.remove("taskComplete");
          this.contentGrid.append(taskPara);
        } else {
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.checked = task[property];
          checkbox.addEventListener("click", (event) => {
            project.updateTaskStatus(task, event.target.checked);
            this.displayTasks(project);
          });
          this.contentGrid.append(checkbox);
        }
      this.contentDiv.append(this.contentGrid);
    });
  }

  displayTaskListHeaders() {
    const taskTitle = document.createElement("p");
    const taskDescription = document.createElement("p");
    const taskPriority = document.createElement("p");
    const taskDueDate = document.createElement("p");
    const taskComplete = document.createElement("p");

    taskTitle.textContent = "Title";
    taskDescription.textContent = "Description";
    taskPriority.textContent = "Priority";
    taskDueDate.textContent = "Due Date";
    taskComplete.textContent = "Complete";

    this.contentGrid.append(
      taskTitle,
      taskDescription,
      taskPriority,
      taskDueDate,
      taskComplete
    );
  }

  editTask(task) {
    this.task = task;
    const dialog = document.querySelector(".edit-task-dialog");
    const closeDialogButton = document.querySelector(".close-edit-task");
    const saveEditTaskButton = document.querySelector(".edit-task-submit");
    const deleteTaskButton = document.querySelector(".delete-task");
    dialog.showModal();
    const taskName = document.querySelector("#editTaskName");
    const taskDescription = document.querySelector("#editTaskDescription");
    const taskPriority = document.querySelector("#editTaskPriority");
    const taskDate = document.querySelector("#editTaskDate");

    taskName.value = task.title;
    taskDescription.value = task.description;
    taskPriority.value = task.priority;

    const [day, month, year] = task.dueDate.split("/");
    taskDate.value = `${year}-${month}-${day}`;
    closeDialogButton.addEventListener("click", () => {
      dialog.close();
    });

    saveEditTaskButton.addEventListener(
      "click",
      () => {
        console.log("GO");
        task.editTask(
          taskName.value,
          taskDescription.value,
          taskPriority.value,
          taskDate.value
        );
        dialog.close();
        this.displayTasks(this.project);
      },
      { once: true }
    );

    deleteTaskButton.addEventListener(
      "click",
      () => {
        console.log("Deleted");
        console.log("");
        this.project.deleteTask(task);
        this.displayTasks(this.project);
        dialog.close();
      },
      { once: true }
    );
  }

  addNewTask(event) {
    const taskName = document.querySelector("#taskName");
    const taskDescription = document.querySelector("#taskDescription");
    const taskPriority = document.querySelector("#taskPriority");
    const taskDate = document.querySelector("#taskDate");

    if (
      taskName.value &&
      //   taskDescription.value &&
      taskPriority.value &&
      taskDate.value
    ) {
      this.project.addTask(
        taskName.value,
        taskDescription.value,
        taskPriority.value,
        taskDate.value
      );
      this.displayTasks(this.project);

      taskName.value = "";
      taskDescription.value = "";
      taskPriority.value = "LOW";
      taskDate.value = "";

      this.closeInputNewTask();
    }
  }

  addNewTaskButtonToDOM() {
    const addTaskButton = document.createElement("button");
    addTaskButton.classList.add("addTaskButton");
    const plusImage = document.createElement("img");
    plusImage.src = Plus;
    addTaskButton.addEventListener("click", () => this.openInputAddTask());

    addTaskButton.append(plusImage);
    this.contentDiv.append(addTaskButton);
  }

  openInputAddTask() {
    const dialog = document.querySelector(".task-dialog");

    dialog.showModal();
  }

  closeInputNewTask() {
    const dialog = document.querySelector(".task-dialog");
    dialog.close();
  }

  clearScreen() {
    this.contentDiv.textContent = "";
    this.contentGrid.textContent = "";
  }

  updateLocalStorage(project) {
    const data = JSON.parse(localStorage.getItem("projectList"));
    const index = data.projects.findIndex((lookupProject) => {
      return project.name === lookupProject.name;
    });
    data.projects[index] = project;
    localStorage.projectList = JSON.stringify(data);
  }
}

export default TodosInterface;
