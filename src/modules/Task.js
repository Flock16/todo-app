import { format } from "date-fns";

class Task {
  constructor(title, description, priority, dueDate) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    const [year, month, day] = dueDate.split("-");
    this.dueDate = format(new Date(year, month - 1, day), "dd/MM/yyyy");

    this.complete = false;
  }

  editTask(title, description, priority, dueDate) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    // console.log(dueDate);
    const [year, month, day] = dueDate.split("-");
    this.dueDate = format(new Date(year, month - 1, day), "dd/MM/yyyy");
  }
}

export default Task;
