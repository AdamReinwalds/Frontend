import React, { useState } from "react";
import ModalButton from "../partials/components/ModalButton";
import Modal from "../partials/components/Modal";
import image from "../assets/images/image.svg";
import { UseProjects } from "../api/projects/UseProjects.jsx";
import DropdownModal from "../partials/components/DropdownModal.jsx";

const Projects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownModalOpen, setIsDropdownModalOpen] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const { projects, addProject, fetchProjects } = UseProjects();

  let numberOfProjects = projects.length;

  let numberOfCompletedProjects = 0;
  projects.forEach((project) => {
    if (project.status === "COMPLETED") {
      numberOfCompletedProjects++;
    }
  });

  const handleDropdownModalOpen = (projectId) => {
    if (isDropdownModalOpen === projectId) {
      setIsDropdownModalOpen(null);
      setSelectedProject(null);

      return;
    }
    setSelectedProject(projectId);
    setIsDropdownModalOpen(projectId);
  };

  const handleDropdownModalClose = () => {
    setIsDropdownModalOpen(!isDropdownModalOpen);
    setSelectedProject(null);
  };

  const handleModalOpen = () => {
    setIsDropdownModalOpen(null);
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
      : projects.filter((project) => project.status === "COMPLETED");

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
              isDropdownModalOpen === project.id ? "focused" : ""
            }`}
          >
            <div className="project-card__header-container">
              <img
                className="project-card__image"
                src={image}
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
                  isDropdownModalOpen === project.id ? "active" : ""
                }`}
                onClick={() => handleDropdownModalOpen(project.id)}
              >
                <div className="dot" />
                <div className="dot" />
                <div className="dot" />
              </button>
              <div className="project-actions">
                {isDropdownModalOpen === project.id && (
                  <DropdownModal
                    onEdit={() => {}}
                    onDelete={() => {}}
                    onClose={handleDropdownModalClose}
                    isOpen={true}
                  />
                )}
              </div>
            </div>
            <p className="project-card__description">{project.description}</p>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => handleModalClose()}
        addProject={addProject}
      />
    </div>
  );
};

export default Projects;
