import React, { useState } from "react";
import "./AddProject.css";
import * as actions from "../../store/actions";
import { useDispatch } from "react-redux";
import Switch from "@mui/material/Switch";
import { showAlert } from "../../store/slices/alertSlice";

const label = { slotProps: { input: { "aria-label": "Switch demo" } } };

export default function AddProject({
  selectedProjectObj,
  setSelectedProjectObj,
  isOpen,
  onClose,
  editMode,
  setEditMode,
  setPagination,
}) {
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState("");
  const [projectCode, setProjectCode] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectStatus, setProjectStatus] = useState("");

  const statusOptions = [
    { value: "1", label: "Y" },
    { value: "2", label: "N" },
    { value: "3", label: "Archive" },
  ];

  React.useEffect(() => {
    if (selectedProjectObj && editMode) {
      setProjectName(selectedProjectObj?.projectName);
      setProjectCode(selectedProjectObj?.projectCode);
      setProjectDescription(selectedProjectObj?.projectDescription);
      setProjectStatus(selectedProjectObj?.projectStatus?.code);
    }
  }, [selectedProjectObj]);

  const reset = () => {
    setProjectName("");
    setProjectCode("");
    setProjectDescription("");
    setSelectedProjectObj(null);
    setProjectStatus("");
    setEditMode(false);
  };

  const handleCreateProject = () => {
    let obj = {
      projectName: projectName,
      projectCode: projectCode,
      projectDescription: projectDescription,
    };
    console.log("Creating project:", obj);
    if (editMode) {
      alert(
        "Edit mode is enabled. Update functionality is not implemented yet.",
      );
      let updatedObj = {
        ...obj,
        projectName: projectName,
        projectCode: projectCode,
        projectDescription: projectDescription,
        projectStatus: statusOptions.find(
          (status) => status.label === projectStatus,
        )?.value,
      };
      console.log("Updating project:", updatedObj);
      const validateFunc = validate();
      if (!validateFunc) return;
      // dispatch(actions.updateProject(updatedObj, setPagination));
      dispatch(actions.updateProject(updatedObj, setPagination));
    } else {
      const validateFunc = validate();
      console.log("validator", validateFunc);
      if (!validateFunc) return;
      dispatch(actions.addProject(obj, setPagination));
    }
    reset();
    onClose();
  };

  const validate = () => {
    if (!projectName || projectName.trim() === "") {
      dispatch(
        showAlert({
          type: "error",
          title: "Please enter project name",
        }),
      );
      return false;
    }
    if (!projectCode || projectCode.trim() === "") {
      dispatch(
        showAlert({
          type: "error",
          title: "Please enter project code",
        }),
      );
      return false;
    }
    if (editMode) {
      if (!projectStatus || projectStatus.trim() === "") {
        dispatch(
          showAlert({
            type: "error",
            title: "Please select project status",
          }),
        );
        return false;
      }
    } else {
      return true;
    }

    return true;
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={() => {
        reset();
        onClose();
      }}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="mapping-header">
          <div>
            <div className="config-title">CONFIGURATION UTILITY</div>
            <h1 className="mapping-title">Add New Project</h1>
          </div>

          <button
            className="close-btn"
            onClick={() => {
              reset();
              onClose();
            }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="mapping-body">
          <div className="form-group">
            <label className="form-label">PROJECT NAME</label>

            <input
              type="text"
              className="form-input"
              placeholder="Enter Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">PROJECT CODE</label>

            <input
              type="text"
              className="form-input"
              placeholder="Enter Project Code"
              value={projectCode}
              onChange={(e) => setProjectCode(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">PROJECT DESCRIPTION</label>

            <textarea
              rows={6}
              className="form-textarea"
              placeholder="Describe this project..."
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
            />
          </div>
          {selectedProjectObj && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
              className="form-group"
            >
              <label className="form-label">PROJECT STATUS</label>
              <select
                value={projectStatus}
                onChange={(e) => setProjectStatus(e.target.value)}
                className="form-select"
              >
                <option value="">Select Project Status</option>
                <option value="Y">Y</option>
                <option value="N">N</option>
                <option value="Archive">Archive</option>
              </select>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mapping-footer">
          <button
            className="btn-cancel"
            onClick={() => {
              reset();
              onClose();
            }}
          >
            Cancel
          </button>

          <button className="btn-create" onClick={handleCreateProject}>
            {editMode ? "Update" : "Create"} Project
          </button>
        </div>
      </div>
    </div>
  );
}
