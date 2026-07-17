import React, { useState } from "react";
import "./AddSoftware.css";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Switch from "@mui/material/Switch";
import { showAlert } from "../../store/slices/alertSlice";

const label = { slotProps: { input: { "aria-label": "Switch demo" } } };

export default function AddSoftware({
  isOpen,
  onClose,
  editMode,
  setEditMode,
  selectedSoftwareObj,
  setSelectedSoftwareObj,
  setPagination,
}) {
  const allSoftwareTypes = useSelector(
    (state) => state.projectMapping.allSoftwareTypes,
  );
  const dispatch = useDispatch();
  const [softwareName, setSoftwareName] = useState("");
  const [softwareVersion, setSoftwareVersion] = useState("");
  const [softwareType, setSoftwareType] = useState("");
  const [softwareStatus, setSoftwareStatus] = useState("");

  const statusOptions = [
    { value: "1", label: "Y" },
    { value: "2", label: "N" },
    { value: "3", label: "Archive" },
  ];

  React.useEffect(() => {
    dispatch(actions.allSoftwareTypes());
  }, []);

  React.useEffect(() => {
    if (selectedSoftwareObj && editMode) {
      setSoftwareName(selectedSoftwareObj?.softwareName || "");
      setSoftwareVersion(selectedSoftwareObj?.softwareVersion || "");
      setSoftwareType(selectedSoftwareObj?.softwareType?.code || "");
      setSoftwareStatus(selectedSoftwareObj?.softwareStatus || "");
    }
  }, [selectedSoftwareObj]);

  console.log("selectedSoftwareObj", selectedSoftwareObj);

  const reset = () => {
    setSoftwareName("");
    setSoftwareVersion("");
    setSelectedSoftwareObj(null);
    setSoftwareType("");
    setSoftwareStatus("");
    setEditMode(false);
  };

  const handleCreateProject = () => {
    let obj = {
      softwareName: softwareName,
      softwareVersion: softwareVersion,
      softwareType: allSoftwareTypes.find((type) => type.code === softwareType),
    };
    console.log("Creating software:", obj);
    if (editMode) {
      alert(
        "Edit mode is enabled. Update functionality is not implemented yet.",
      );
      let updatedObj = {
        ...obj,
        softwareName: softwareName,
        softwareVersion: softwareVersion,
        softwareType: allSoftwareTypes.find(
          (type) => type.code === softwareType,
        ),
        softwareStatus: statusOptions.find(
          (status) => status.label === softwareStatus,
        )?.value,
      };
      console.log("Updating software:", updatedObj);
      const validateFunc = validate();
      if (!validateFunc) return;
      dispatch(actions.updateSoftware(updatedObj, setPagination));
    } else {
      const validateFunc = validate();
      if (!validateFunc) return;
      dispatch(actions.addSoftware(obj, setPagination));
    }
    reset();
    onClose();
  };

  const validate = () => {
    if (!softwareName || softwareName.trim() === "") {
      dispatch(
        showAlert({
          type: "error",
          title: "Please enter software name",
        }),
      );
      return false;
    }
    if (!softwareVersion || softwareVersion.trim() === "") {
      dispatch(
        showAlert({
          type: "error",
          title: "Please enter software version",
        }),
      );
      return false;
    }
    if (editMode) {
      if (!softwareType || softwareType.trim() === "") {
        dispatch(
          showAlert({
            type: "error",
            title: "Please select software type",
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
            <h1 className="mapping-title">Add New Software</h1>
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
            <label className="form-label">SOFTWARE NAME</label>

            <input
              type="text"
              className="form-input"
              placeholder="Enter Software Name"
              value={softwareName}
              disabled={editMode} // Disable input in edit mode
              onChange={(e) => setSoftwareName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">SOFTWARE VERSION</label>

            <input
              type="text"
              className="form-input"
              placeholder="Enter Software Version"
              value={softwareVersion}
              onChange={(e) => setSoftwareVersion(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">SOFTWARE TYPE</label>
            <select
              value={softwareType}
              onChange={(e) => setSoftwareType(e.target.value)}
              className="form-select"
            >
              <option value="">Select Software Type</option>
              {allSoftwareTypes &&
                allSoftwareTypes.length > 0 &&
                allSoftwareTypes.map((type) => (
                  <option key={type.codeValueId} value={type.code}>
                    {type?.code}
                  </option>
                ))}
            </select>
          </div>

          {selectedSoftwareObj && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
              className="form-group"
            >
              <label className="form-label">SOFTWARE STATUS</label>
              <select
                value={softwareStatus}
                onChange={(e) => setSoftwareStatus(e.target.value)}
                className="form-select"
              >
                <option value="">Select Software Status</option>
                <option value="Y">Y</option>
                <option value="N">N</option>
                <option value="Archive">Archive</option>
              </select>
            </div>
          )}

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
              {editMode ? "Update" : "Create"} Software
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
}
