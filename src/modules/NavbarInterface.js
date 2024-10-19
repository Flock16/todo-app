import ProjectList from "./ProjectList";
import TodosInterface from "./TodosInterface";
import Delete from "../assets/svg/delete_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";

class NavbarInterface {
  displayedProjectIndex = 0;
  constructor() {
    if (localStorage.projectList) {
      const data = JSON.parse(localStorage.getItem("projectList"));
      // console.log(data.projects);
      if (data.projects.length > 0) {
        this.projectList = new ProjectList(
          JSON.parse(localStorage.getItem("projectList"))
        );
      } else {
        this.projectList = new ProjectList();
      }
    } else {
      this.projectList = new ProjectList();
    }
    localStorage.projectList = JSON.stringify(this.projectList);

    this.displayProjectNames();
    this.TodosInterface = new TodosInterface();
    this.TodosInterface.displayTasks(this.projectList.getProjects()[0]);

    this.openInputNewProjectButton = document.querySelector(".navbar button");
    this.closeInputNewProjectButton = document.querySelector(
      ".close-input-project"
    );
    this.formSubmitButton = document.querySelector(".project-submit");
    this.setEventListeners();
  }

  setEventListeners() {
    this.openInputNewProjectButton.addEventListener("click", () =>
      this.openInputNewProject()
    );
    this.closeInputNewProjectButton.addEventListener("click", () =>
      this.closeInputNewProject()
    );
    this.formSubmitButton.addEventListener("click", (event) =>
      this.addNewProject(event)
    );
  }

  displayProjectNames() {
    localStorage.projectList = JSON.stringify(this.projectList);
    const projectDiv = document.querySelector(".projects");
    const projects = this.projectList.getProjects();

    projectDiv.textContent = "";

    projects.forEach((project, index) => {
      const projDiv = document.createElement("div");
      projDiv.classList.add("projDiv");
      const pElement = document.createElement("p");
      pElement.textContent = project.name;
      pElement.addEventListener("click", () => {
        this.displayedProjectIndex = index;
        this.TodosInterface.displayTasks(project);
      });
      const deleteProjButton = document.createElement("button");
      const deleteImage = document.createElement("img");
      deleteImage.src = Delete;
      deleteProjButton.append(deleteImage);
      deleteProjButton.addEventListener("click", () =>
        this.handleDeleteProject(project)
      );
      projDiv.append(pElement, deleteProjButton);
      projectDiv.append(projDiv);
    });
  }

  handleDeleteProject(project) {
    const deleteIndex = this.projectList.getProjectIndex(project);
    this.projectList.deleteProject(project);
    this.displayProjectNames();

    if (this.projectList.getProjects().length === 0) {
      this.TodosInterface.clearScreen();
    } else if (deleteIndex === this.displayedProjectIndex) {
      this.TodosInterface.displayTasks(this.projectList.getProjects()[0]);
    }
  }

  openInputNewProject() {
    const dialog = document.querySelector(".project-dialog");
    dialog.showModal();
  }

  closeInputNewProject() {
    const dialog = document.querySelector(".project-dialog");
    const input = document.querySelector("#project");
    input.value = "";
    dialog.close();
  }

  addNewProject(event) {
    // event.preventDefault();
    const input = document.querySelector("#project");
    if (input.value) {
      const proj = this.projectList.addProject(input.value);
      this.closeInputNewProject();
      this.displayProjectNames();
      this.TodosInterface.displayTasks(proj);
    }
  }
}

export default NavbarInterface;
