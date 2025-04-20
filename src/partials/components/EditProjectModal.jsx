import React, { useEffect, useState } from "react";
import image from "../../assets/images/image.svg";
import dollar from "../../assets/images/dollar.svg";
import DatePicker from "./DatePicker";
import { fetchProjectById, updateProject } from "../../api/project.js";
import { fetchClients } from "../../api/client.js";
import { fetchUsers } from "../../api/user.js";
import { fetchStatuses } from "../../api/status.js";

const EditProjectModal = ({ onClose, onProjectsUpdate, projectId }) => {
  const [selectedImage, setSelectedImage] = useState(image);
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [projectStatus, setProjectStatus] = useState([]);

  const [modalData, setModalData] = useState({
    id: "",
    image: "",
    projectName: "",
    description: "",
    startDate: "",
    endDate: "",
    budget: "",
    userId: "",
    clientId: "",
    statusId: "",
  });

  useEffect(() => {
    const fetchProject = async () => {
      const project = await fetchProjectById(projectId);
      if (project) {
        setModalData({
          id: projectId,
          image: project.image,
          projectName: project.projectName,
          description: project.description,
          startDate: project.startDate,
          endDate: project.endDate || "",
          budget: project.budget || "",
          userId: project.user.id,
          clientId: project.client.id,
          statusId: project.status.id,
        });
        if (project.image) setSelectedImage(project.image);
      }
    };
    fetchProject();
  }, [projectId]);

  useEffect(() => {
    const fetchClientsData = async () => {
      const clients = await fetchClients();
      setClients(clients);
    };
    const fetchUsersData = async () => {
      const users = await fetchUsers();
      setUsers(users);
    };
    const fetchProjectStatusData = async () => {
      const projectStatus = await fetchStatuses();
      setProjectStatus(projectStatus);
    };
    fetchClientsData();
    fetchUsersData();
    fetchProjectStatusData();
  }, []);

  const handleInputChange = (e, key) => {
    setModalData((prevData) => ({
      ...prevData,
      [key]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateProject(modalData);
    onProjectsUpdate();
    onClose();
  };

  const renderUserOptions = () => {
    return users.map((user) => (
      <option key={user.id} value={user.id}>
        {user.firstName + " " + user.lastName}
      </option>
    ));
  };

  const renderClientOptions = () => {
    return clients.map((client) => (
      <option key={client.id} value={client.id}>
        {client.clientName}
      </option>
    ));
  };

  const renderStatusOptions = () => {
    return projectStatus.map((status) => (
      <option key={status.id} value={status.id}>
        {status.statusName}
      </option>
    ));
  };

  if (
    !modalData.id ||
    users.length === 0 ||
    clients.length === 0 ||
    projectStatus.length === 0
  ) {
    return null;
  }
  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Edit Project</h2>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <form action="" className="modal-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="image-upload">
                <img
                  src={selectedImage}
                  alt="image input"
                  className="avatar-image"
                />
              </label>
              <input
                type="file"
                accept="image/*"
                id="image-upload"
                name="image-upload"
                className="image-input"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setSelectedImage(reader.result); // This sets the image preview
                      setModalData((prevData) => ({
                        ...prevData,
                        image: reader.result, // Save it to modalData too
                      }));
                    };
                    reader.readAsDataURL(file); // This reads the image file as base64
                  }
                }}
              />
            </div>
            <div className="modal-div">
              <label htmlFor="project-name">Project Name</label>
              <input
                id="project-name"
                type="text"
                placeholder="Enter project name"
                onChange={(e) => handleInputChange(e, "projectName")}
                value={modalData.projectName}
                required
              />
            </div>
            <div className="modal-div">
              <label htmlFor="client-name">Client Name</label>
              <div className="select-wrapper">
                <select
                  name="client-name"
                  id="client-name"
                  className={`custom-select ${
                    modalData.clientId ? "valid" : ""
                  }`}
                  onChange={(e) => handleInputChange(e, "clientId")}
                  value={modalData.clientId}
                >
                  {renderClientOptions()}
                </select>
              </div>
            </div>
            <div className="modal-div">
              <label htmlFor="project-description">Project Description</label>
              <textarea
                id="project-description"
                placeholder="Type something"
                value={modalData.description}
                onChange={(e) => handleInputChange(e, "description")}
                required
              />
            </div>
            <div className="modal-dates">
              <div className="date-container">
                <label htmlFor="project-start-date">Start Date</label>
                <DatePicker
                  dateValue={modalData.startDate}
                  onChange={(e) => handleInputChange(e, "startDate")}
                  id="project-start-date"
                  required={true}
                  placeholder="Select start date"
                  minDate={modalData.startDate || ""}
                />
              </div>
              <div className="date-container">
                <label htmlFor="project-end-date">End Date</label>
                <DatePicker
                  dateValue={modalData.endDate}
                  onChange={(e) => handleInputChange(e, "endDate")}
                  id="project-end-date"
                  required={false}
                  placeholder="Select end date"
                  minDate={modalData.startDate || ""}
                />
              </div>
            </div>
            <div className="modal-div">
              <label htmlFor="project-project-owner">Project Owner</label>
              <div className="select-wrapper">
                <select
                  name="project-owner"
                  id="project-project-owner"
                  className={`custom-select ${modalData.userId ? "valid" : ""}`}
                  onChange={(e) => handleInputChange(e, "userId")}
                  value={modalData.userId}
                >
                  {renderUserOptions()}
                </select>
              </div>
            </div>
            <div className="modal-div">
              <label htmlFor="project-budget">Budget</label>
              <div id="project-budget">
                <img className="dollar-img" src={dollar} alt="" />
                <input
                  type="number"
                  id="project-budget-input"
                  min="0"
                  placeholder="0"
                  onChange={(e) => handleInputChange(e, "budget")}
                  value={modalData.budget}
                />
              </div>
            </div>
            <div className="modal-div">
              <label htmlFor="project-project-status">Project Status</label>
              <div className="select-wrapper">
                <select
                  name="project-status"
                  id="project-project-status"
                  className={`custom-select ${
                    modalData.statusId ? "valid" : ""
                  }`}
                  onChange={(e) => handleInputChange(e, "statusId")}
                  value={modalData.statusId}
                >
                  {renderStatusOptions()}
                </select>
              </div>
            </div>
            <button className="modal-button" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProjectModal;
