import React from "react";
import editIcon from "../../assets/images/edit.svg";
import deleteIcon from "../../assets/images/delete.svg";

const DropdownModal = ({ onEditClick, onDelete }) => {
  return (
    <div className="dropdown-modal">
      <button className="dropdown-item" onClick={onEditClick}>
        <img src={editIcon} alt="" />
        Edit
      </button>
      <button className="dropdown-item delete" onClick={onDelete}>
        <img src={deleteIcon} alt="" />
        Delete Project
      </button>
    </div>
  );
};

export default DropdownModal;
