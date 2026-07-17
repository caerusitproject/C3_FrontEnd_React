import React, { useState } from "react";
import Select from "react-select";
import "./AddMappingModal.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import { Button } from "../../Components/ui";
import { showAlert } from "../../store/slices/alertSlice";

// const softwareOptions = [
//   { value: "kubernetes", label: "KUBERNETES" },
//   { value: "redis-cluster", label: "REDIS CLUSTER" },
//   { value: "postgresql", label: "POSTGRESQL" },
//   { value: "aws-s3", label: "AWS S3" },
//   { value: "docker", label: "DOCKER" },
//   { value: "nginx", label: "NGINX" },
//   { value: "terraform", label: "TERRAFORM" },
//   { value: "node-js", label: "NODE.JS" },
//   { value: "mysql", label: "MYSQL" },
//   { value: "mongodb", label: "MONGODB" },
// ];

const popularTech = ["AWS S3", "Docker", "Nginx", "Terraform"];

const AddMappingModal = ({
  isOpen,
  onClose,
  editMode,
  setEditMode,
  selectedMappingObj,
  setSelectedMappingObj,
  setPagination,
}) => {
  const dispatch = useDispatch();
  const allProjects = useSelector((state) => state.projectMapping.allProjects);
  const allEnv = useSelector((state) => state.projectMapping.allEnv);
  const allProjectStatus = useSelector(
    (state) => state.projectMapping.allProjectStatus,
  );
  const allSoftwares = useSelector(
    (state) => state.projectMapping.allSoftwares,
  );

  const modifiedSoftwareOptions = allSoftwares.map((software) => ({
    value: software.softwareVersion,
    label: software.softwareName,
  }));

  const [selectedProject, setSelectedProject] = useState("");
  const [projectCode, setProjectCode] = useState("");
  const [selectedEnv, setSelectedEnv] = useState("");
  const [projectId, setProjectId] = useState(null);
  const [projectStatus, setProjectStatus] = useState("");
  const [selectedSoftware, setSelectedSoftware] = useState([]);
  const [description, setDescription] = useState("");

  React.useEffect(() => {
    if (selectedMappingObj) {
      console.log("mapping object___", selectedMappingObj);
      setSelectedProject(selectedMappingObj?.projectName);
      setProjectStatus(selectedMappingObj?.projectStatus?.dispalyName);
      setDescription(selectedMappingObj?.projectDesc);
      setProjectId(selectedMappingObj?.projectMappingId);
      const selectedOptions =
        selectedMappingObj.softwareList
          ?.map((software) =>
            modifiedSoftwareOptions.find(
              (option) => option.label === software.softwareName,
            ),
          )
          .filter(Boolean) || [];

      setSelectedSoftware(selectedOptions);
      setSelectedEnv(selectedMappingObj?.projectEnv?.code);
    }
  }, [selectedMappingObj]);

  React.useEffect(() => {
    dispatch(actions.showAllProjects("", ""));
    dispatch(actions.showAllSoftware("", ""));
    dispatch(actions.fetchAllEnv());
    dispatch(actions.fetchAllProjectStatus());
  }, []);

  console.log("all projects____", allProjects);

  console.log("all softwares____", selectedSoftware);

  const handleEnvChange = (env) => setSelectedEnv(env?.code);

  const handleCreate = () => {
    const selectedProjectObj = allProjects.find(
      (project) => project.projectName === selectedProject,
    );

    const environmentObj = allEnv.find((env) => env.code === selectedEnv);

    const softwareDetails = selectedSoftware.map((software) => {
      const softwareObj = allSoftwares.find(
        (s) => s.softwareName === software.label,
      );

      return {
        softwareName: softwareObj.softwareName,
        softwareVersion: softwareObj.softwareVersion,
        softwareStatus: softwareObj.softwareStatus,
        softwareType: softwareObj.softwareType,
        softwareId: softwareObj.softwareId,
      };
    });

    const payload = {
      projectCode: selectedProjectObj?.projectCode,
      projectName: selectedProjectObj?.projectName,
      projectMappingId: selectedMappingObj?.projectMappingId,
      projetStatus: allProjectStatus.find(
        (item) => item.dispalyName == projectStatus,
      ),
      mappingDesc: description || "",
      environment: environmentObj,
      softwares: softwareDetails,
    };

    // If editing, include the mapping id
    if (editMode) {
      payload.mappingId = selectedMappingObj.mappingId; // change to your id field
    }

    console.log(payload);

    const validateFunc = validate();
    if (editMode) {
      console.log("validator", validateFunc);
      if (!validateFunc) return;
      alert("Mapping updated successfully!");
      dispatch(actions.updateProjectMapping(payload, setPagination));
      console.log("ProjectMapping update___", payload);
    } else {
      console.log("validator", validateFunc);
      if (!validateFunc) return;
      alert("Mapping created successfully!");
      dispatch(actions.addProjectMapping(payload, setPagination));
      console.log("Project Mapping create____", payload);
    }

    onClose();
    reset();
  };

  const reset = () => {
    setSelectedProject("");
    setProjectCode("");
    setSelectedEnv("");
    setProjectId("");
    setProjectStatus("");
    setSelectedSoftware([]);
    setDescription("");
  };

  // const handleCreate = () => {
  //   let selectedProjects = allProjects.find(
  //     (project) => project.projectName === selectedProject,
  //   );

  //   let envi = allEnv.find((item) => item.code == selectedEnv);
  //   let obj = {
  //     projectCode: selectedProjects?.projectCode,
  //     projectName: selectedProjects?.projectName,
  //     mappingDesc: description ? description : "",
  //     environment: envi,
  //   };
  //   let softwareType = selectedSoftware.map((software) => {
  //     let softwareDetails = allSoftwares.find(
  //       (s) => s.softwareName === software.label,
  //     );
  //     return { softwareType: softwareDetails?.softwareType };
  //   });

  //   let softwareDetails = selectedSoftware.map((software) => ({
  //     softwareName: software.label,
  //     softwareVersion: software.value,
  //     softwareStatus: allSoftwares.find(
  //       (s) => s.softwareName === software.label,
  //     )?.softwareStatus,
  //     softwareType: allSoftwares.find((s) => s.softwareName === software.label)
  //       ?.softwareType,
  //   }));

  //   let obj1 = {
  //     ...obj,
  //     softwares: softwareDetails,
  //   };

  //   // let obj1 = {
  //   //   softwareName: selectedSoftwareDetails?.label,
  //   //   softwareVersion: selectedSoftwareDetails?.value,
  //   //   softwareType: selectedSoftwareDetails?.softwareType,
  //   // };
  //   dispatch(actions.addProjectMapping(obj1));
  //   console.log("Mapping Details:", obj1);

  //   alert("Mapping created successfully!");

  //   if (editMode) {
  //     console.log("Mapping Details EDITION:", obj1);
  //   }
  //   onClose(); // Close modal after creation
  // };

  const handleCancel = () => {
    // Reset form
    setSelectedProject("");
    setSelectedEnv("Production");
    setSelectedSoftware([]);
    setDescription("");
    onClose();
  };

  if (!isOpen) return null;

  const validate = () => {
    if (!selectedProject || selectedProject.trim() == "") {
      dispatch(
        showAlert({
          type: "error",
          title: "Please select project name",
        }),
      );
      return false;
    }
    if (!selectedEnv || selectedEnv.trim() == "") {
      dispatch(
        showAlert({
          type: "error",
          title: "Please select environment",
        }),
      );
      return false;
    }
    console.log("software array", selectedSoftware);
    if (!selectedSoftware || selectedSoftware.length == 0) {
      dispatch(
        showAlert({
          type: "error",
          title: "Please select softwares",
        }),
      );
      return false;
    }
    if (!description || description.trim() == "") {
      dispatch(
        showAlert({
          type: "error",
          title: "Please enter description",
        }),
      );
      return false;
    }

    return true;
  };

  return (
    <div
      className="modal-overlay"
      onClick={() => {
        onClose();
        setSelectedMappingObj(null);
        setEditMode(false);
        reset();
      }}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="mapping-header">
          <div>
            <div className="config-title">CONFIGURATION UTILITY</div>
            <h1 className="mapping-title">Add New Mapping</h1>
          </div>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="mapping-body">
          {/* Project & Environment */}
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">PROJECT NAME</label>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="form-select"
              >
                <option value="">Select Project</option>
                {allProjects &&
                  allProjects.length > 0 &&
                  allProjects.map((project) => (
                    <option
                      key={project.projectCode}
                      value={project.projectName}
                    >
                      {project.projectName}
                    </option>
                  ))}
              </select>
            </div>

            {/* <div className="form-group">
              <label className="form-label">Project Code</label>

              <input
                type="text"
                className="form-input"
                placeholder="Enter Project Code"
                value={projectCode}
                onChange={(e) => setProjectCode(e.target.value)}
              />
            </div> */}

            <div className="form-group">
              <label className="form-label">ENVIRONMENT</label>
              <div className="env-buttons">
                {allEnv &&
                  allEnv.length > 0 &&
                  allEnv.map((env) => (
                    <button
                      key={env?.codeValueId}
                      onClick={() => handleEnvChange(env)}
                      className={`env-btn ${selectedEnv === env?.code ? "active" : ""}`}
                    >
                      {env?.code}
                    </button>
                  ))}
              </div>
            </div>
          </div>

          {/* Software Stack */}
          <div className="form-group">
            <label className="form-label">SOFTWARE STACK</label>

            {/* <div className="selected-tags">
              {selectedSoftware.map((tech, index) => (
                <div key={index} className="tag">
                  {tech.label}
                  <button
                    onClick={() =>
                      setSelectedSoftware(
                        selectedSoftware.filter((_, i) => i !== index),
                      )
                    }
                    className="tag-remove"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div> */}

            <Select
              isMulti
              options={modifiedSoftwareOptions}
              value={selectedSoftware}
              onChange={setSelectedSoftware}
              placeholder="Search and add technologies..."
              className="react-select-container"
              classNamePrefix="react-select"
            />

            <div className="popular-section">
              <p className="popular-label">Popular:</p>
              <div className="popular-tags">
                {popularTech.map((tech, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const option = modifiedSoftwareOptions.find(
                        (opt) => opt.label === tech,
                      );
                      if (
                        option &&
                        !selectedSoftware.some((s) => s.value === option.value)
                      ) {
                        setSelectedSoftware([...selectedSoftware, option]);
                      }
                    }}
                    className="popular-tag"
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {editMode && (
            <div className="form-group">
              <label className="form-label">PROJECT STATUS</label>
              <select
                value={projectStatus}
                onChange={(e) => setProjectStatus(e.target.value)}
                className="form-select"
              >
                <option value="">Select Project</option>
                {allProjectStatus &&
                  allProjectStatus.length > 0 &&
                  allProjectStatus.map((project) => (
                    <option
                      key={project.codeValueId}
                      value={project.dispalyName}
                    >
                      {project.dispalyName}
                    </option>
                  ))}
              </select>
            </div>
          )}

          {/* Description */}
          <div className="form-group">
            <label className="form-label">MAPPING DESCRIPTION</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide architectural context for this mapping instance..."
              rows={6}
              className="form-textarea"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mapping-footer">
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleCreate}>
            {" "}
            {editMode ? "Update" : "Create"} Mapping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddMappingModal;
