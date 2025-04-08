import React, { useEffect, useState, useRef } from "react";
import ModalButton from "../partials/components/ModalButton";
import Modal from "../partials/components/Modal";
import image from "../assets/images/image.svg";
import UseProjects from "../api/UseProjects.jsx";
import DropDownModal from "../partials/components/DropDownModal.jsx";

const Projects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropDownModalOpen, setIsDropDownModalOpen] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const { projects } = UseProjects();
  console.log(projects);

  let numberOfProjects = projects.length;

  let numberOfCompletedProjects = 0;
  projects.forEach((project) => {
    if (project.status === "COMPLETED") {
      numberOfCompletedProjects++;
    }
  });

  const handleDropDownModalOpen = (projectId) => {
    if (isDropDownModalOpen === projectId) {
      setIsDropDownModalOpen(null);
      setSelectedProject(null);
      return;
    }
    setSelectedProject(projectId);
    setIsDropDownModalOpen(projectId);
  };

  const handleDropDownModalClose = () => {
    setIsDropDownModalOpen(!isDropDownModalOpen);
    setSelectedProject(null);
  };

  const handleModalOpen = () => {
    setIsDropDownModalOpen(null);
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
          <div key={project.id} className="project-card">
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
                className="project-card__button"
                onClick={() => handleDropDownModalOpen(project.id)}
              >
                <div className="dot" />
                <div className="dot" />
                <div className="dot" />
              </button>
              <div className="project-actions">
                {isDropDownModalOpen === project.id && (
                  <DropDownModal
                    onEdit={() => {}}
                    onDelete={() => {}}
                    onClose={handleDropDownModalClose}
                    isOpen={true}
                  />
                )}
              </div>
            </div>
            <p className="project-card__description">{project.description}</p>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => handleModalClose()} />
    </div>
  );
};

export default Projects;
