import React, { useState } from "react";
import {
  Dialog,
  IconButton,
  Typography,
  TextField,
  Box,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PlusImage from "../../../assets/icons/plus.png";
import MinusImage from "../../../assets/icons/minus.png";
import { Icon } from "@mdi/react";
import { mdiAccountGroup } from "@mdi/js";

const sectionsList = [
  "Nursery",
  "PP1",
  "PP2",
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI Science",
  "XI Commerce",
  "XI Humanities",
  "XII Science",
  "XII Commerce",
  "XII Humanities",
];

const StrengthAllocationPage = ({ open, handleClose }) => {
  const [sections, setSections] = useState(
    sectionsList.map((section, index) => ({
      id: index + 1,
      label: section,
      values: Array.from({ length: 3 }, (_, valueIndex) => ({
        id: valueIndex + 1,
        value: 0,
      })), // Each section starts with three input areas
    }))
  );

  // handle add section
  const handleAddSection = (sectionIndex) => {
    const newValues = [
      ...sections[sectionIndex].values,
      { id: Date.now(), value: 0 },
    ];
    const updatedSections = [...sections];
    updatedSections[sectionIndex].values = newValues;
    setSections(updatedSections);
  };

  // handle section remove
  const handleRemoveSection = (sectionIndex) => {
    if (sections[sectionIndex].values.length > 1) {
      const updatedValues = [...sections[sectionIndex].values];
      updatedValues.pop(); // Remove the last value
      const updatedSections = [...sections];
      updatedSections[sectionIndex].values = updatedValues;
      setSections(updatedSections);
    }
  };

  // handle input change
  const handleInputChange = (sectionIndex, valueIndex, value) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].values[valueIndex].value =
      parseInt(value) || 0;
    setSections(updatedSections);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      {/* top title */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#2F7DA1",
          padding: "20px",
          maxWidth: "110%",
          marginBottom: "40px",
        }}
      >
        <Typography
          fontSize={16}
          component="div"
          sx={{ color: "white", fontWeight: "bold" }}
        >
          Manage Strength Allocation
        </Typography>
        <IconButton
          onClick={handleClose}
          sx={{ color: "white", position: "absolute", marginLeft: "90%" }}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {sections.map((section, sectionIndex) => (
        <BoxContainer
          key={section.id}
          section={section}
          sectionIndex={sectionIndex}
          handleAddSection={handleAddSection}
          handleRemoveSection={handleRemoveSection}
          handleInputChange={handleInputChange}
        />
      ))}
    </Dialog>
  );
};

const BoxContainer = ({
  section,
  sectionIndex,
  handleAddSection,
  handleRemoveSection,
  handleInputChange,
}) => {
  const totalValue = section.values.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        padding: "20px",
        backgroundColor: "#FEF7FF",
        borderRadius: "15px",
        margin: "10px 50px 0 50px",
        border: "1px solid #B2AFAF",
        alignItems: "center",
        overflowY: "hidden",
        overflowX: "auto",
        maxWidth: "calc(100vw - 10px)",
        padding: "45px 45px 45px 20px",
      }}
    >
      {/* class name */}
      <Typography
        style={{
          width: "100px",
          fontSize: "16px",
          fontWeight: "700",
          color: "#585657",
        }}
      >
        {section.label}
      </Typography>

      {/* Section inputs */}
      {section.values.map((value, valueIndex) => (
        <div
          key={value.id}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "auto",
          }}
        >
          <TextField
            variant="outlined"
            size="small"
            placeholder={`${section.label} ${valueIndex + 1}`}
            style={{ width: "80px", height: "40px", marginRight: "5px" }}
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              value: value.value,
              onChange: (e) =>
                handleInputChange(sectionIndex, valueIndex, e.target.value),
            }}
          />

          {/* remove button */}
          {valueIndex === section.values.length - 1 && (
            <Button
              onClick={() => handleRemoveSection(sectionIndex)}
              disabled={section.values.length === 1}
            >
              <img
                src={MinusImage}
                alt="minus"
                style={{ width: "15px", height: "15px" }}
              />
            </Button>
          )}
        </div>
      ))}

      {/* add button */}
      <Button
        variant="contained"
        style={{
          width: "95px",
          height: "30px",
          backgroundColor: "#2F7DA1",
          margin: "10px 0",
        }}
        onClick={() => handleAddSection(sectionIndex)}
      >
        <img
          src={PlusImage}
          alt="plus"
          style={{ width: "15px", height: "15px", marginRight: "5px" }}
        />
        <Typography style={{ fontSize: 10, paddingTop: 2 }}>Add New</Typography>
      </Button>

      {/* group icon and total value */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "auto",
        }}
      >
        {/* group icon */}
        <Icon
          path={mdiAccountGroup}
          size={1}
          style={{ marginLeft: "30px", marginRight: "5px", color: "#585657" }}
        />

        {/* total value */}
        <Typography style={{ marginTop: "3px", color: "#585657" }}>
          {totalValue}
        </Typography>
      </div>
    </div>
  );
};

export default StrengthAllocationPage;
