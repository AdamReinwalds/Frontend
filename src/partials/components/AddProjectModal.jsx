import React, { useState, useEffect } from "react";
import avatar from "../../assets/images/avatar.svg";
import dollar from "../../assets/images/dollar.svg";
import DatePicker from "./DatePicker.jsx";
import { addProject } from "../../api/project.js";
import { fetchClients } from "../../api/client.js";
import { fetchUsers } from "../../api/user.js";

const Modal = ({ isOpen, onClose, onProjectsUpdate }) => {
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(avatar);
  const [initialModalData, setInitialModalData] = useState({
    Image: "",
    ProjectName: "",
    Description: "",
    StartDate: "",
    EndDate: "",
    Budget: "",
    UserId: "",
    ClientId: "",
  });
  const [modalData, setModalData] = useState(initialModalData);

  const handleInputChange = (e, key) => {
    setModalData((prevData) => ({
      ...prevData,
      [key]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProject(modalData); // Call the addProject function from UseProjects
    onProjectsUpdate();
    onClose(); // Close the modal after submission
  };
  useEffect(() => {
    if (!isOpen) {
      setModalData(initialModalData); // Reset modal data when modal is closed
      setSelectedImage(avatar); // Reset image to default avatar
    }
  }, [isOpen, initialModalData]);

  useEffect(() => {
    const fetchClientsData = async () => {
      const clients = await fetchClients();
      setClients(clients);
    };
    const fetchUsersData = async () => {
      const users = await fetchUsers();
      setUsers(users);
    };

    fetchClientsData();
    fetchUsersData();
  }, []);

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
  if (!isOpen) return null;

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Add Project</h2>
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
                        Image: reader.result, // Save it to modalData too
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
                onChange={(e) => handleInputChange(e, "ProjectName")}
                value={modalData.ProjectName}
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
                    modalData.ClientId ? "valid" : ""
                  }`}
                  onChange={(e) => handleInputChange(e, "ClientId")}
                  value={modalData.ClientId}
                >
                  <option value="" disabled>
                    Select client
                  </option>
                  {renderClientOptions()}
                </select>
              </div>
            </div>
            <div className="modal-div">
              <label htmlFor="project-description">Project Description</label>
              <textarea
                id="project-description"
                placeholder="Type something"
                value={modalData.Description}
                onChange={(e) => handleInputChange(e, "Description")}
                required
              />
            </div>
            <div className="modal-dates">
              <div className="date-container">
                <label htmlFor="project-start-date">Start Date</label>
                <DatePicker
                  dateValue={modalData.StartDate}
                  onChange={(e) => handleInputChange(e, "StartDate")}
                  id="project-start-date"
                  required={true}
                  placeholder="Select start date"
                  minDate={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="date-container">
                <label htmlFor="project-end-date">End Date</label>
                <DatePicker
                  dateValue={modalData.EndDate}
                  onChange={(e) => handleInputChange(e, "EndDate")}
                  id="project-end-date"
                  required={false}
                  placeholder="Select end date"
                  minDate={modalData.StartDate || ""}
                />
              </div>
            </div>
            <div className="modal-div">
              <label htmlFor="project-project-owner">Project Owner</label>
              <div className="select-wrapper">
                <select
                  name="project-owner"
                  id="project-project-owner"
                  className={`custom-select ${modalData.UserId ? "valid" : ""}`}
                  onChange={(e) => handleInputChange(e, "UserId")}
                  value={modalData.UserId}
                >
                  <option value="" disabled>
                    Select project owner
                  </option>
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
                  onChange={(e) => handleInputChange(e, "Budget")}
                  value={modalData.Budget}
                />
              </div>
            </div>
            <button className="modal-button" type="submit">
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
