import React, { useEffect, useState } from "react";
import Projects from "./Projects";
import "./Main.scss";
import TaskList from "./Task";
import Storage from "./storage/LocalStorage";
import image from "../assets/projects.png";

const Main = () => {
  const [projectsList, setProjectsList] = useState([]);
  const [currentProject, setCurrentProject] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [showProjects, setShowProjects] = useState(true);

  //On load, obtain projects list from local storage
  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem("projectList")) || [];
    setProjectsList(savedProjects);

    //Default to first project on reload
    if (savedProjects.length > 0) {
      setCurrentProject(savedProjects[0].name);
      setTaskList(savedProjects[0].tasks);
    }
  }, []);

  //Update task list from localstorage once category is changed
  useEffect(() => {
    if (!currentProject) {
      return;
    }
    let taskList = Storage.getTask(currentProject);
    setTaskList(taskList);
  }, [currentProject]);

  const displayProjects = () => {
    setShowProjects(!showProjects);
  };

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 640) {
        setShowProjects(true);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <div className="main_container">
      <button className="header_projects_button">
        <img
          src={image}
          onClick={() => displayProjects()}
          width="30"
          height="30"
          alt="project_button"
        />
      </button>
      {showProjects && (
        <Projects
          projectsList={projectsList}
          setProjectsList={setProjectsList}
          setCurrentProject={setCurrentProject}
          currentProject={currentProject}
        />
      )}
      <TaskList
        taskList={taskList}
        setTaskList={setTaskList}
        currentProject={currentProject}
      />
    </div>
  );
};

export default Main;
