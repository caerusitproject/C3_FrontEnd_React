import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProfileView.css";
import { Card } from "../../Components/ui/Card/Card";
import { Text } from "../../Components/ui";
import { Button } from "../../Components/ui/Button/Button";
import { Input } from "../../Components/ui/Input/Input";
import { useTheme } from "../../context/ThemeContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import * as actions from "../../store/actions";

export default function ProfileView({ onClose }) {
  const dispatch = useDispatch();
  const theme = useTheme();

  // const [isEditing, setIsEditing] = React.useState(false);
  const { loggedInUser } = useSelector((state) => state.login);
  const { employeeProfile } = useSelector((state) => state.employee);
  const [isEditing, setIsEditing] = React.useState(false);
  const [edit, setEdit] = React.useState(false);

  useEffect(() => {
    dispatch(
      actions.fetchEmployeeProfile(loggedInUser?.empCode, loggedInUser?.role),
    );
  }, []);

  const [personalInfo, setPersonalInfo] = React.useState({
    fullName: "",
    dob: "",
    gender: "",
    contactNumber: "",
    personalEmail: "",
    homeAddress: "",
  });

  useEffect(() => {
    if (employeeProfile) {
      setPersonalInfo({
        fullName: employeeProfile?.fullName,
        dob: employeeProfile?.dateOfBirth,
        gender: employeeProfile?.gender,
        contactNumber: employeeProfile?.contactNumber,
        personalEmail: employeeProfile?.officialEmail,
        homeAddress: employeeProfile?.homeAddress,
      });
    }
  }, [employeeProfile]);

  console.log("loggedInUser__", employeeProfile);

  const [professionalData, setProfessionalData] = React.useState({
    left: [
      { designation: "Employee ID", value: "" },
      { designation: "Designation", value: "" },
      { designation: "Department", value: "" },
    ],
    right: [
      {
        designation: "Reporting Manager",
        value: "",
      },
      { designation: "Date Of Joining", value: "" },
      { designation: "Work Location", value: "" },
    ],
  });

  useEffect(() => {
    if (!employeeProfile) return;

    setProfessionalData({
      left: [
        {
          designation: "Employee ID",
          value: employeeProfile.employeeId || "",
        },
        {
          designation: "Designation",
          value: employeeProfile.designation || "",
        },
        {
          designation: "Department",
          value: employeeProfile.department || "",
        },
      ],
      right: [
        {
          designation: "Reporting Manager",
          value: employeeProfile.reportingManager || "",
        },
        {
          designation: "Date Of Joining",
          value: employeeProfile.dateOfJoining || "",
        },
        {
          designation: "Work Location",
          value: employeeProfile.workLocation || "",
        },
      ],
    });
  }, [employeeProfile]);

  const handleFieldChange = (side, index, value) => {
    setProfessionalData((prev) => ({
      ...prev,
      [side]: prev[side].map((item, i) =>
        i === index ? { ...item, value } : item,
      ),
    }));
  };

  const handleFieldChangeStatic = (field, value) => {
    setPersonalInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validate = () => {
    let valid = false;
    let errors = {};
    if (personalInfo?.fullName?.length == 0 || personalInfo?.fullName == "") {
      valid = true;
      errors.fullName = "Full Name cannot be empty !";
    }

    if (
      personalInfo?.contactNumber?.length == 0 ||
      personalInfo?.contactNumber == ""
    ) {
      valid = true;
      errors.contactNumber = "Contact Number cannot be empty !";
    }

    if (personalInfo?.gender?.length == 0 || personalInfo?.gender == "") {
      valid = true;
      errors.gender = "Gender cannot be empty !";
    }

    if (personalInfo?.dob?.length == 0 || personalInfo?.dob == "") {
      valid = true;
      errors.dob = "DOB cannot be empty !";
    }

    if (
      personalInfo?.personalEmail?.length == 0 ||
      !personalInfo?.personalEmail?.includes("@") ||
      personalInfo?.personalEmail == ""
    ) {
      valid = true;
      errors.personalEmail = "Email cannot be empty !";
    }

    if (
      personalInfo?.homeAddress?.length == 0 ||
      personalInfo?.homeAddress == ""
    ) {
      valid = true;
      errors.homeAddress = "Address cannot be empty !";
    }

    return { valid: valid, errors };
  };

  const errors = validate();

  const isFormValid = Object.keys(errors.errors).length === 0;

  const validateProfessionalData = () => {
    const errors = {};

    professionalData.left.forEach((item, index) => {
      if (!item.value?.trim()) {
        errors[`left_${index}`] = `${item.designation} cannot be empty`;
      }
    });

    professionalData.right.forEach((item, index) => {
      if (!item.value?.trim()) {
        errors[`right_${index}`] = `${item.designation} cannot be empty`;
      }
    });

    return errors;
  };

  const professionalErrors = validateProfessionalData();

  const isFormValidLeftRight =
    // Object.keys(errors.errors).length === 0 &&
    Object.keys(professionalErrors).length === 0;

  console.log("fullname", personalInfo.fullName);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: theme.foundation.base,
        // overflow: "auto",
        zIndex: 100,
        padding: "24px",
      }}
    >
      <Text
        variant="primary"
        onClick={onClose}
        style={{
          cursor: "pointer",
          display: "inline-block",
          marginBottom: "20px",
          width: "fit-content",
        }}
      >
        <ArrowBackIcon />
      </Text>

      <Card>
        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: theme.foundation.primaryColor,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: "700",
            }}
          >
            {loggedInUser?.employeeName?.[0]}
          </div>

          <div>
            <Text variant="h3">{loggedInUser?.employeeName}</Text>

            <Text variant="bodySmall">{loggedInUser?.designation}</Text>

            <Text variant="helper">{loggedInUser?.email}</Text>
          </div>
        </div>
      </Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ marginTop: "30px" }} primary variant="h3">
          <AccountCircleIcon /> Personal Details
        </Text>
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "30px",
            justifyContent: "flex-end",
          }}
        >
          {edit && <Button onClick={() => setEdit(false)}>Cancel</Button>}
          <Button
            disabled={edit && !isFormValid}
            onClick={() => {
              if (edit) {
                if (!isFormValid) return;

                // call save API here
                let updatedProfile = {
                  fullName: personalInfo.fullName,
                  dateOfBirth: personalInfo.dob,
                  gender: personalInfo.gender,
                  contactNumber: personalInfo.contactNumber,
                  officialEmail: personalInfo.personalEmail,
                  homeAddress: personalInfo.homeAddress,
                };
                dispatch(
                  actions.updateEmployeeProfile(
                    loggedInUser?.empCode,
                    loggedInUser?.role,
                    updatedProfile,
                  ),
                );
                console.log("Saving...");
              }

              setEdit(!edit);
            }}
          >
            {edit ? "Save" : "Edit"}
          </Button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Card style={{ marginTop: "24px", width: "430px" }}>
          <Text variant="h4">Full Name</Text>
          {edit ? (
            <Input
              type="text"
              variant="filled"
              value={personalInfo.fullName}
              state={validate()?.valid ? "error" : "default"}
              onChange={(e) =>
                handleFieldChangeStatic("fullName", e.target.value)
              }
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #D1D5DB",
                borderRadius: "8px",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
          ) : (
            <Text variant="body">{personalInfo.fullName}</Text>
          )}

          {errors?.errors?.fullName && (
            <div className="login-error">{errors?.errors?.fullName}</div>
          )}
        </Card>

        <Card style={{ marginTop: "24px", width: "430px" }}>
          <Text variant="h4">Date of Birth</Text>
          {edit ? (
            <Input
              type="text"
              value={personalInfo.dob}
              state={validate()?.valid ? "error" : "default"}
              onChange={(e) => handleFieldChangeStatic("dob", e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #D1D5DB",
                borderRadius: "8px",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
          ) : (
            <Text variant="body">{personalInfo.dob}</Text>
          )}
          {errors?.errors?.dob && (
            <div className="login-error">{errors?.errors?.dob}</div>
          )}
        </Card>
        <Card style={{ marginTop: "24px", width: "430px" }}>
          <Text variant="h4">Gender</Text>
          {edit ? (
            <Input
              type="text"
              value={personalInfo.gender}
              state={validate()?.valid ? "error" : "default"}
              onChange={(e) =>
                handleFieldChangeStatic("gender", e.target.value)
              }
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #D1D5DB",
                borderRadius: "8px",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
          ) : (
            <Text variant="body">{personalInfo.gender}</Text>
          )}
          {errors?.errors?.gender && (
            <div className="login-error">{errors?.errors?.gender}</div>
          )}
        </Card>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Card style={{ marginTop: "24px", width: "430px" }}>
          <Text variant="h4">Contact Number</Text>
          {edit ? (
            <Input
              type="text"
              value={personalInfo.contactNumber}
              state={validate()?.valid ? "error" : "default"}
              onChange={(e) =>
                handleFieldChangeStatic("contactNumber", e.target.value)
              }
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #D1D5DB",
                borderRadius: "8px",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
          ) : (
            <Text variant="body">{personalInfo.contactNumber}</Text>
          )}
          {errors?.errors?.contactNumber && (
            <div className="login-error">{errors?.errors?.contactNumber}</div>
          )}
        </Card>

        <Card style={{ marginTop: "24px", width: "430px" }}>
          <Text variant="h4">Personal Email</Text>
          {edit ? (
            <Input
              type="text"
              value={personalInfo.personalEmail}
              state={validate()?.valid ? "error" : "default"}
              onChange={(e) =>
                handleFieldChangeStatic("personalEmail", e.target.value)
              }
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #D1D5DB",
                borderRadius: "8px",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
          ) : (
            <Text variant="body">{personalInfo.personalEmail}</Text>
          )}
          {errors?.errors?.personalEmail && (
            <div className="login-error">{errors?.errors?.personalEmail}</div>
          )}
        </Card>
        <Card style={{ marginTop: "24px", width: "430px" }}>
          <Text variant="h4">Home Address</Text>
          {edit ? (
            <Input
              type="text"
              value={personalInfo.homeAddress}
              state={validate()?.valid ? "error" : "default"}
              onChange={(e) =>
                handleFieldChangeStatic("homeAddress", e.target.value)
              }
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #D1D5DB",
                borderRadius: "8px",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
          ) : (
            <Text variant="body">{personalInfo.homeAddress}</Text>
          )}
          {errors?.errors?.homeAddress && (
            <div className="login-error">{errors?.errors?.homeAddress}</div>
          )}
        </Card>
      </div>

      <section>
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text primary variant="h3">
            <AccountCircleIcon /> Professional Details
          </Text>

          <div
            style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
          >
            {isEditing && (
              <Button onClick={() => setIsEditing(false)}>Cancel</Button>
            )}

            <Button
              disabled={isEditing && !isFormValidLeftRight}
              onClick={() => {
                if (isEditing) {
                  if (!isFormValidLeftRight) return;

                  // Call Save API here
                  console.log("Saving profile...");
                }

                setIsEditing(!isEditing);
              }}
            >
              {isEditing ? "Save" : "Edit"}
            </Button>
          </div>
        </div>

        <Card
          style={{
            marginTop: "20px",
            border: "1px solid #E5E7EB",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            {/* LEFT COLUMN */}
            <div
              style={{
                padding: "24px",
                borderRight: "1px solid #E5E7EB",
              }}
            >
              {professionalData.left.map((element, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: "28px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "11px",
                      color: "#94A3B8",
                      fontWeight: 700,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    {element.designation}
                  </Text>

                  {isEditing ? (
                    <>
                      <Input
                        type="text"
                        value={element.value}
                        onChange={(e) =>
                          handleFieldChange("left", index, e.target.value)
                        }
                        state={
                          professionalErrors[`left_${index}`]
                            ? "error"
                            : "default"
                        }
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          border: "1px solid #D1D5DB",
                          borderRadius: "8px",
                          fontSize: "14px",
                          boxSizing: "border-box",
                        }}
                      />
                      {professionalErrors[`left_${index}`] && (
                        <div className="login-error">
                          {professionalErrors[`left_${index}`]}
                        </div>
                      )}
                    </>
                  ) : (
                    <Text variant="body">{element.value}</Text>
                  )}
                </div>
              ))}
            </div>

            {/* RIGHT COLUMN */}
            <div
              style={{
                padding: "24px",
              }}
            >
              {professionalData.right.map((element, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: "28px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "11px",
                      color: "#94A3B8",
                      fontWeight: 700,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    {element.designation}
                  </Text>

                  {isEditing ? (
                    <>
                      <Input
                        type="text"
                        value={element.value}
                        state={
                          professionalErrors[`right_${index}`]
                            ? "error"
                            : "default"
                        }
                        onChange={(e) =>
                          handleFieldChange("right", index, e.target.value)
                        }
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          border: "1px solid #D1D5DB",
                          borderRadius: "8px",
                          fontSize: "14px",
                          boxSizing: "border-box",
                        }}
                      />

                      {professionalErrors[`right_${index}`] && (
                        <div className="login-error">
                          {professionalErrors[`right_${index}`]}
                        </div>
                      )}
                    </>
                  ) : (
                    <Text variant="body">{element.value}</Text>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
