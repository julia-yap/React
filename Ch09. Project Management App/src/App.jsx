import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProject from "./components/NoProject";
import Sidebar from "./components/Sidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectID: undefined,
    projects: [],
  });

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectID: id,
      };
    });
  }

  function handleAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectID: null,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectID: undefined,
      };
    });
  }

  function handleSaveProject(projectData) {
    setProjectsState((prevState) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      };

      return {
        ...prevState,
        selectedProjectID: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectID,
  );

  let content = <SelectedProject project={selectedProject} />;

  if (projectsState.selectedProjectID === null) {
    content = (
      <NewProject
        onSaveProject={handleSaveProject}
        onCancel={handleCancelAddProject}
      />
    );
  } else if (projectsState.selectedProjectID === undefined) {
    content = <NoProject onAddProject={handleAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar
        onAddProject={handleAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
      />
      {content}
    </main>
  );
}

export default App;
