import React, { useState } from "react";
import Avatar from "../../assets/images/Avatar.svg";
import dollar from "../../assets/images/dollar.svg";
import DatePicker from "./DatePicker";
import { UseProjects } from "../../api/projects/UseProjects";

const Modal = ({ isOpen, onClose, addProject }) => {
  const [selectedImage, setSelectedImage] = useState(Avatar);
  const [modalData, setModalData] = useState({
    projectName: "",
    clientName: "",
    projectDescription: "",
    projectStartDate: "",
    projectEndDate: "",
    projectOwner: "",
    budget: "",
  });

  const handleInputChange = (e, key) => {
    setModalData((prevData) => ({
      ...prevData,
      [key]: e.target.value,
    }));
  };

  const [selected, setSelected] = useState("");
  const handleSelectChange = (e) => {
    setSelected(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const projectData = {
      Image: "",
      ProjectName: modalData.projectName,
      Description: modalData.projectDescription,
      StartDate: modalData.projectStartDate,
      EndDate: modalData.projectEndDate,
      Budget: modalData.budget,
      UserId: "8b3ca3a9-6cc7-4be7-a1fe-f1ab470ebbac",
      ClientId: "423b8e58-f690-41ee-80ae-4b4d5f12bdf8",
    };
    console.log("Project data:", projectData);
    addProject(projectData); // Call the addProject function from UseProjects

    onClose(); // Close the modal after submission
  };

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setSelectedImage(URL.createObjectURL(file));
  //   }
  // };
  if (!isOpen) return null;

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Add project</h2>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <form action="" className="modal-form" onSubmit={handleSubmit}>
            <div>
              <img
                src={selectedImage}
                alt="image input"
                className="avatar-image"
              />
            </div>
            <div className="modal-div">
              <label htmlFor="project-name">Project Name</label>
              <input
                id="project-name"
                type="text"
                placeholder="Enter project name"
                onChange={(e) => handleInputChange(e, "projectName")}
                required
              />
            </div>
            <div className="modal-div">
              <label htmlFor="client-name">Client Name</label>
              <div className="select-wrapper">
                <select
                  name="client-name"
                  id="client-name"
                  className={`custom-select ${selected ? "valid" : ""}`}
                  onChange={(e) => handleInputChange(e, "clientName")}
                  onClick={handleSelectChange}
                  value={modalData.clientName}
                >
                  <option value="" disabled>
                    Select client
                  </option>
                  <option value="client1">Client 1</option>
                  <option value="client2">Client 2</option>
                  <option value="client3">Client 3</option>
                </select>
              </div>
            </div>
            <div className="modal-div">
              <label htmlFor="project-description">Project Description</label>
              <textarea
                id="project-description"
                placeholder="Type something"
                value={modalData.projectDescription}
                onChange={(e) => handleInputChange(e, "projectDescription")}
                required
              />
            </div>
            <div className="modal-dates">
              <div className="date-container">
                <label htmlFor="project-start-date">Start Date</label>
                <DatePicker
                  dateValue={modalData.projectStartDate}
                  onChange={(e) => handleInputChange(e, "projectStartDate")}
                  id="project-start-date"
                  required={true}
                  placeholder="Select start date"
                />
              </div>
              <div className="date-container">
                <label htmlFor="project-end-date">End Date</label>
                <DatePicker
                  dateValue={modalData.projectEndDate}
                  onChange={(e) => handleInputChange(e, "projectEndDate")}
                  id="project-end-date"
                  required={false}
                  placeholder="Select end date"
                />
              </div>
            </div>
            <div className="modal-div">
              <label htmlFor="project-project-owner">Project Owner</label>
              <div className="select-wrapper">
                <select
                  name="project-owner"
                  id="project-project-owner"
                  className={`custom-select ${selected ? "valid" : ""}`}
                  onChange={(e) => handleInputChange(e, "projectOwner")}
                  onClick={handleSelectChange}
                  value={modalData.projectOwner}
                >
                  <option value="" disabled>
                    Select project owner
                  </option>
                  <option value="owner1">Owner 1</option>
                  <option value="owner2">Owner 2</option>
                  <option value="owner3">Owner 3</option>
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
            <button type="submit">Create</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
