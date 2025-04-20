import React, { useEffect, useState } from "react";
import ModalButton from "../partials/components/ModalButton";
import AddProjectModal from "../partials/components/AddProjectModal.jsx";
import image from "../assets/images/image.svg";
import { fetchProjects, deleteProject } from "../api/project.js";
import DropdownModal from "../partials/components/DropdownModal.jsx";
import EditProjectModal from "../partials/components/EditProjectModal.jsx";
import LoadingSpinner from "../partials/components/LoadingSpinner.jsx";

const Projects = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeDropDown, setActiveDropDown] = useState(null);
  const [selectedEditProjectId, setselectedEditProjectId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [projects, setProjects] = useState([]);

  const fetchProjectsData = async () => {
    setIsLoading(true);
    const data = await fetchProjects();
    setProjects(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProjectsData();
  }, []);

  let numberOfProjects = projects.length;

  let numberOfCompletedProjects = 0;
  projects.forEach((project) => {
    if (project.status.statusName === "COMPLETED") {
      numberOfCompletedProjects++;
    }
  });

  const toggleDropdownModalOpen = (projectId) => {
    setActiveDropDown(projectId === activeDropDown ? null : projectId);
  };

  const handleDeleteProject = async (projectId) => {
    await deleteProject(projectId);
    fetchProjectsData();
    setActiveDropDown(null);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
    document.documentElement.classList.add("lock-scroll");
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    document.documentElement.classList.remove("lock-scroll");
  };

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.status.statusName === "COMPLETED");

  return (
    <div id="projects">
      <div className="page-header">
        <h1 className="h2">Projects</h1>
        <ModalButton
          type="add"
          target="#addProjectModal"
          text="Add Project"
          onClick={() => handleModalOpen()}
        />
      </div>
      <div className="projects-list__sorting">
        <button
          className={`sorting-button ${activeFilter === "all" ? "active" : ""}`}
          onClick={() => setActiveFilter("all")}
        >
          All [{numberOfProjects}]
        </button>
        <button
          className={`sorting-button ${
            activeFilter === "completed" ? "active" : ""
          }`}
          onClick={() => setActiveFilter("completed")}
        >
          Completed [{numberOfCompletedProjects}]
        </button>
      </div>
      <div className="projects-list">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className={`project-card ${
              activeDropDown === project.id ? "focused" : ""
            }`}
          >
            <div className="project-card__header-container">
              <img
                className="project-card__image"
                src={project.image || image}
                alt="project image"
              />
              <div className="project-card__header-wrapper">
                <h4 className="project-card__header">{project.projectName}</h4>
                <p className="project-card__client">
                  {project.client.clientName}
                </p>
              </div>
              <button
                className={`project-card__button ${
                  activeDropDown === project.id ? "active" : ""
                }`}
                onClick={() => toggleDropdownModalOpen(project.id)}
              >
                <div className="dot" />
                <div className="dot" />
                <div className="dot" />
              </button>
              <div className="project-actions">
                {activeDropDown === project.id && (
                  <DropdownModal
                    onEditClick={() => {
                      setselectedEditProjectId(project.id);
                      setActiveDropDown(null);
                    }}
                    onDelete={() => {
                      handleDeleteProject(project.id);
                    }}
                    onClose={() => setselectedEditProjectId(null)}
                  />
                )}
              </div>
            </div>
            <p className="project-card__description">{project.description}</p>
          </div>
        ))}
      </div>
      {isLoading && <LoadingSpinner />}

      <AddProjectModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onProjectsUpdate={fetchProjectsData}
      />
      {selectedEditProjectId && (
        <EditProjectModal
          isOpen={isEditModalOpen}
          onClose={() => setselectedEditProjectId(null)}
          projectId={selectedEditProjectId}
          onProjectsUpdate={fetchProjectsData}
        />
      )}
    </div>
  );
};

export default Projects;
