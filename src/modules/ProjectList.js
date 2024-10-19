import Project from "./Project.js";

class ProjectList {
  projects = [];
  constructor(localStorageProjectList) {
    if (localStorageProjectList) {
      localStorageProjectList.projects.forEach((project) => {
        // console.log(project);
        const newProject = new Project(project.name, project.tasks);
        this.projects.push(newProject);
      });
    } else {
      const defaultProject = new Project("Default");
      this.projects.push(defaultProject);
    }
  }

  getProjects() {
    return this.projects;
  }

  getProjectIndex(lookupProject) {
    return this.projects.findIndex((project) => {
      return project.name === lookupProject.name;
    });
  }

  addProject(name) {
    const newProject = new Project(name);
    this.projects.push(newProject);
    return newProject;
  }

  deleteProject(deleteProject) {
    const index = this.projects.findIndex((project) => {
      return project.name === deleteProject.name;
    });
    // console.log(index);
    this.projects.splice(index, 1);
  }
}

export default ProjectList;
