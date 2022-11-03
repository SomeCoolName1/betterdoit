export default class Storage {
  static getProjects() {
    return JSON.parse(localStorage.getItem("projectList"))
      ? JSON.parse(localStorage.getItem("projectList"))
      : [];
  }
  static addProject(project) {
    let projectList = Storage.getProjects();
    projectList.push(project);

    localStorage.setItem("projectList", JSON.stringify(projectList));
  }

  static removeProject(projectName) {
    let projectList = Storage.getProjects().filter(
      (key) => key.name !== projectName
    );

    localStorage.setItem("projectList", JSON.stringify(projectList));
  }

  static addTask(project, newTask) {
    let projectList = Storage.getProjects();

    let taskList = projectList.find((key) => key.name === project).tasks;

    taskList.push(newTask);
    localStorage.setItem("projectList", JSON.stringify(projectList));
  }

  static editTask(project, task, newTask) {
    let projectList = Storage.getProjects();
    let taskList = projectList.find((key) => key.name === project).tasks;

    let index = taskList.findIndex((key) => key.title === task.title);

    taskList[index] = newTask;

    localStorage.setItem("projectList", JSON.stringify(projectList));
  }

  static getTask(project) {
    let projectList = Storage.getProjects();

    let taskList = projectList.find((key) => key.name === project).tasks;

    return taskList;
  }

  static removeTask(project, taskName) {
    let projectList = Storage.getProjects();

    let taskList = projectList.find((key) => key.name === project).tasks;

    let index = taskList.findIndex((task) => task.title === taskName.title);

    taskList.splice(index, 1);

    localStorage.setItem("projectList", JSON.stringify(projectList));
  }

  static sortTask(project, sortedTasks) {
    let projectList = Storage.getProjects();

    let taskList = projectList.find((key) => key.name === project).tasks;
    console.log(taskList);

    console.log(projectList);

    localStorage.setItem("projectList", JSON.stringify(projectList));
  }
}
