import React, { useEffect, useState } from "react";
import ModalButton from "../partials/components/ModalButton";
import Modal from "../partials/components/Modal";
import image from "../assets/images/image.svg";
import useProjects from "../api/useProjects";

// const projects = [
//   {
//     id: 1,
//     projectName: "Project 1",
//     description: "Description of Project 1",
//     client: { clientName: "Client 1" },
//     status: {
//       statusName: "STARTED",
//     },
//     projectStartDate: "2023-01-01",
//     projectEndDate: "2023-12-31",
//   },
//   {
//     id: 2,
//     projectName: "Project 2",
//     description: "Description of Project 2",
//     client: { clientName: "Client 2" },
//     status: {
//       statusName: "IN_PROGRESS",
//     },
//     projectStartDate: "2023-02-01",
//     projectEndDate: "2023-11-30",
//   },
//   {
//     id: 3,
//     projectName: "Project 3",
//     description: "Description of Project 3",
//     client: { clientName: "Client 3" },
//     status: {
//       statusName: "COMPLETED",
//     },
//     projectStartDate: "2023-03-01",
//     projectEndDate: "2023-10-31",
//   },
//   {
//     id: 4,
//     projectName: "Project 4",
//     description: "Description of Project 4",
//     client: { clientName: "Client 4" },
//     status: {
//       statusName: "CANCELLED",
//     },
//     projectStartDate: "2023-04-01",
//     projectEndDate: "2023-09-30",
//   },
// ];
// let numberOfProjects = projects.length;

// let numberOfCompletedProjects = 0;
// projects.forEach((project) => {
//   if (project.status.statusName === "COMPLETED") {
//     numberOfCompletedProjects++;
//   }
// });

const Projects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const { projects } = useProjects();
  console.log(projects);

  let numberOfProjects = projects.length;

  let numberOfCompletedProjects = 0;
  projects.forEach((project) => {
    if (project.status === "COMPLETED") {
      numberOfCompletedProjects++;
    }
  });

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
              <div className="project-card__dots">
                {/* <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4.2 12C4.08954 12 4 12.0895 4 12.2C4 12.3105 4.08954 12.4 4.2 12.4C4.31046 12.4 4.4 12.3105 4.4 12.2C4.4 12.0895 4.31046 12 4.2 12ZM2 12.2C2 10.985 2.98497 10 4.2 10C5.41503 10 6.4 10.985 6.4 12.2C6.4 13.415 5.41503 14.4 4.2 14.4C2.98497 14.4 2 13.415 2 12.2ZM12.6 12C12.4895 12 12.4 12.0895 12.4 12.2C12.4 12.3105 12.4895 12.4 12.6 12.4C12.7105 12.4 12.8 12.3105 12.8 12.2C12.8 12.0895 12.7105 12 12.6 12ZM10.4 12.2C10.4 10.985 11.385 10 12.6 10C13.815 10 14.8 10.985 14.8 12.2C14.8 13.415 13.815 14.4 12.6 14.4C11.385 14.4 10.4 13.415 10.4 12.2ZM21.3999 12.2C21.3999 12.0895 21.4894 12 21.5999 12C21.7104 12 21.7999 12.0895 21.7999 12.2C21.7999 12.3105 21.7104 12.4 21.5999 12.4C21.4894 12.4 21.3999 12.3105 21.3999 12.2ZM21.5999 10C20.3849 10 19.3999 10.985 19.3999 12.2C19.3999 13.415 20.3849 14.4 21.5999 14.4C22.8149 14.4 23.7999 13.415 23.7999 12.2C23.7999 10.985 22.8149 10 21.5999 10Z"
                    fill="#637085"
                  />
                </svg> */}
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
