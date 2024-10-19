import Task from "./Task.js";

class Project {
  tasks = [];
  constructor(name, localStorageTaskList) {
    this.name = name;
    if (localStorageTaskList) {
      localStorageTaskList.forEach((task) => {
        const [day, month, year] = task.dueDate.split("/");
        const date = `${year}-${month}-${day}`;
        const newTask = new Task(
          task.title,
          task.description,
          task.priority,
          date
        );
        this.tasks.push(newTask);
      });
    } else {
      const testTask = new Task(
        "Project",
        "local memory save",
        "LOW",
        "2024-10-19"
      );
      this.tasks.push(testTask);
    }
  }

  addTask(title, description, priority, date) {
    const newTask = new Task(title, description, priority, date);
    this.tasks.push(newTask);
  }

  deleteTask(deleteTask) {
    const index = this.tasks.findIndex((task) => {
      return task.title === deleteTask.title;
    });
    this.tasks.splice(index, 1);
  }

  updateTaskStatus(lookupTask, value) {
    const index = this.tasks.findIndex((task) => {
      return task.title === lookupTask.title;
    });
    this.tasks[index].complete = value;
  }

  getNumberOfIncompleteTasks() {
    let count = 0;

    this.tasks.forEach((task) => {
      if (!task.complete) count++;
    });
    return count;
  }
}

export default Project;
