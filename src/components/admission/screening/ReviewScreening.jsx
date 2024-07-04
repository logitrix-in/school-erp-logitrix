import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import * as React from "react";
import { useEffect, useState } from "react";
import api from "../../../config/api";
import Bbox from "../../UiComponents/Bbox";
import ReviewRightCard from "./component/ReviewRightCard";
import { LoadingButton } from "@mui/lab";
import ReignsSelect from "../../UiComponents/ReignsSelect";
import useClasses from "../../../hooks/useClasses";
import ReignsPopup from "../../UiComponents/ReignsPopup";

function not(a, b) {
  return a.filter((objA) => !b.some((objB) => objB.id === objA.id));
}

function intersection(a, b) {
  return a.filter((objA) => b.some((objB) => objB.id === objA.id));
}

export default function ReviewScreening() {
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { classes } = useClasses();

  const [selectedClass, setSelectedClass] = useState(classes);

  useEffect(() => {
    console.log(selectedClass);
  }, [selectedClass]);

  useEffect(() => {
    api
      .post("/admission/screening/set/", {
        type: "screen",
      })
      .then((res) => {
        setLeft(res.data.not_qualified);
        setRight(res.data.qualified);
      });
  }, []);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const [selected, setSelected] = useState(null);

  function applyScreening() {
    setLoading(true);
    api
      .post("/admission/screening/final/", {
        qualified: getFilteredRightCount(),
        not_qualified: getFilteredLeftCount(),
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));

    console.log({
      qualified: getFilteredRightCount(),
    });
  }

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    console.log("checked left");
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const [filter, setFilter] = useState("");

  const getFilteredLeftCount = () => {
    return left.filter((item) => {
      const data = item.candidate_details;
      const searchString = `${data.first_name} ${data.last_name} ${
        data.email
      } ${(
        new Date().getFullYear() - new Date(data.dob).getFullYear()
      ).toString()}`.toLowerCase();
      return (
        searchString.includes(filter.toLowerCase()) &&
        selectedClass.includes(item.application_details.applying_for)
      );
    });
  };

  const getFilteredRightCount = () => {
    return right.filter((item) => {
      const data = item.candidate_details;
      const searchString = `${data.first_name} ${data.last_name} ${
        data.email
      } ${(
        new Date().getFullYear() - new Date(data.dob).getFullYear()
      ).toString()}`.toLowerCase();
      return (
        searchString.includes(filter.toLowerCase()) &&
        selectedClass.includes(item.application_details.applying_for)
      );
    });
  };

  const customList = (items, dir) => {
    var l = items
      .filter((it) => {
        const data = it.candidate_details;

        const age = (
          new Date().getFullYear() - new Date(data.dob).getFullYear()
        ).toString();

        const searchString =
          `${data.first_name} ${data.last_name} ${data.email} ${age}`.toLowerCase();
        return searchString.includes(filter.toLowerCase());
      })
      .filter((items) => {
        console.log(items.application_details.applying_for);

        const arr = selectedClass.includes(
          items.application_details.applying_for
        );

        return arr;
      });

    return (
      <Paper sx={{ overflow: "auto", height: "60vh" }}>
        {l.length <= 0 && filter.length == 0 ? (
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"100%"}
          >
            <Typography>No Data Found For Selected Classes</Typography>
          </Box>
        ) : (
          <List dense component="div" role="list">
            {l.map((value) => {
              return (
                <ListItem key={value.id} role="listitem">
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    onClick={() => {
                      handleToggle(value);
                    }}
                    tabIndex={-1}
                    disableRipple
                  />
                  <Typography
                    onClick={() => {
                      setSelected(value);
                    }}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        color: "primary.dark",
                        fontWeight: 500,
                      },
                    }}
                  >{`${value.candidate_details.first_name} ${value.candidate_details.last_name} `}</Typography>
                </ListItem>
              );
            })}
          </List>
        )}
      </Paper>
    );
  };
  const [popupopen, setPopupopen] = useState(false);

  return (
    <Box>
      <Box display={"flex"} gap={1} alignItems={"stretch"} overflow={"hidden"}>
        <Box flex={1}>
          <Box display={"flex"} alignItems={"center"} gap={1} mb={1} py={1}>
            <Typography fontSize={17} fontWeight={500}>
              Review Screening
            </Typography>

            <ReignsSelect
              val={selectedClass}
              label="Classes"
              sx={{ ml: "auto", width: "12rem" }}
              items={classes}
              multiple
              onChange={(v) => {
                setSelectedClass(v);
              }}
              size="medium"
            />
            <TextField
              title="search name, title, email, age"
              size="medium"
              placeholder="Search"
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            />
            <LoadingButton
              size="large"
              loading={loading}
              variant="contained"
              onClick={() => setPopupopen(true)}
            >
              Confirm Screening
            </LoadingButton>
          </Box>

          <ReignsPopup
            open={popupopen}
            desc="once confirmed changes can not be reverted back."
            onAccept={() => applyScreening()}
            onCancel={() => setPopupopen(false)}
            close={() => setPopupopen(false)}
          />

          <Box
            borderRadius={1}
            display={"flex"}
            alignItems={"stretch"}
            gap={1}
            p={2}
            bgcolor={"primary.light"}
          >
            <Bbox flex={1} borderRadius={1}>
              <Box display={"flex"}>
                <Typography fontWeight={500} p={2}>
                  Not Qualified candidates ({getFilteredLeftCount().length})
                </Typography>
              </Box>
              <Divider />
              {customList(left, "left")}
            </Bbox>
            <Bbox
              display={"flex"}
              borderRadius={1}
              flexDirection={"column"}
              justifyContent={"center"}
              gap={1}
              alignItems={"center"}
              width={"fit-content"}
              p={2}
              bgcolor={"primary.darker"}
            >
              <Button
                sx={{ my: 0.5 }}
                variant="contained"
                size="small"
                onClick={handleAllRight}
                disabled={left.length === 0}
                aria-label="move all right"
              >
                ≫
              </Button>
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
              >
                &gt;
              </Button>
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
              >
                &lt;
              </Button>
              <Button
                sx={{ my: 0.5 }}
                variant="contained"
                size="small"
                onClick={handleAllLeft}
                disabled={right.length === 0}
                aria-label="move all left"
              >
                ≪
              </Button>
            </Bbox>
            <Bbox flex={1} borderRadius={1}>
              <Typography fontWeight={500} p={2}>
                Qualified candidates ({getFilteredRightCount().length})
              </Typography>
              <Divider />
              {customList(right, "right")}
            </Bbox>
          </Box>
        </Box>

        {/* right */}
        <Bbox
          width={"25rem"}
          p={2}
          overflow={"auto"}
          borderRadius={1}
          bgcolor={"primary.darker"}
          color={"whitesmoke"}
        >
          {selected != null ? (
            <ReviewRightCard selected={selected} />
          ) : (
            <Typography>Select a candidate to view details</Typography>
          )}
        </Bbox>
      </Box>
    </Box>
  );
}
