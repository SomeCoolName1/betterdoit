import React, { useState } from "react";
import Storage from "./storage/LocalStorage";
import Project from "./storage/ProjectCreator";
import "./Projects.scss";
const Projects = ({
  projectsList,
  setProjectsList,
  currentProject,
  setCurrentProject,
}) => {
  const [showForm, setShowForm] = useState(false);

  const showProjectForm = () => {
    setShowForm(!showForm);
  };

  const addProject = (e) => {
    e.preventDefault();
    showProjectForm();
    let projectName = e.target.Title.value;
    if (projectsList.find((key) => key.name === projectName)) {
      alert("This category name already exists. Please choose a different one");
      return;
    }

    let newProject = new Project(projectName);
    Storage.addProject(newProject);
    setProjectsList((projects) => [...projects, newProject]);
  };

  const selectProject = (e) => {
    let project = e.target.textContent;
    setCurrentProject(project);
  };

  const removeProject = () => {
    setShowForm(false);
    setProjectsList((projects) =>
      projects.filter((key) => key.name !== currentProject)
    );
    Storage.removeProject(currentProject);
    setCurrentProject(false);
  };

  return (
    <div className="nav_container">
      <div className="nav_projects_list">
        {projectsList.map((key) => {
          return (
            <button
              className="nav_category"
              id="nav_category"
              onClick={(e) => selectProject(e)}
              onDoubleClick={showProjectForm}
              style={
                key.name === currentProject
                  ? { backgroundColor: "rgba(250, 109, 89, 0.5)" }
                  : {}
              }
            >
              {key.name}
            </button>
          );
        })}
      </div>
      <div className="lineSeperator" />
      <div className="nav_project">
        {!showForm ? (
          <button onClick={() => showProjectForm()}>Add Project</button>
        ) : (
          <form onSubmit={(e) => addProject(e)}>
            <input type="text" name="Title" maxlength="10" required />
            <div className="category_button_container">
              <input type="submit" value="Submit" />
              <input
                type="button"
                value="Cancel"
                onClick={() => showProjectForm()}
                formNoValidate
              />
            </div>
          </form>
        )}
      </div>
      <div className="nav_remove_button_container">
        {projectsList.length !== 0 ? (
          <div className="nav_remove_button">
            <div className="lineSeperator" />
            <button onClick={() => removeProject()}>Remove Project</button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Projects;
