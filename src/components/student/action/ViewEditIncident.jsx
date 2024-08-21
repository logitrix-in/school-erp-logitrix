import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Typography,
  IconButton,
  Avatar,
  AvatarGroup,
} from "@mui/material";
import RevealCard from "@/components/AnimationComponents/RevealCard";
import { Search } from "@mui/icons-material";
import { useMediaQuery } from "@material-ui/core";
import ReignsSelect from "@/components/UiComponents/ReignsSelect";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const ViewEditIncident = () => {
  const isSmall = useMediaQuery("(max-width: 1364px)");
  const isTablet = useMediaQuery("(min-width: 1365px) and (max-width: 1535px)");
  const isLaptop = useMediaQuery("(min-width: 1536px) and (max-width: 1706px)");
  const isDesktop = useMediaQuery(
    "(min-width: 1707px) and (max-width: 1919px)"
  );
  const isLarge = useMediaQuery("(min-width: 1920px)");
  const isXlarge = useMediaQuery("(min-width: 2560px)");

  const statuses = ["Open", "Cancelled", "Closed", "All"];

  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const components = [1, 2, 3];

  return (
    <RevealCard>
      <Box ml={2} mr={2}>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          mt={1}
          height={70}
          width={"100%"}
        >
          <Box mt={4} ml={3} mb={4}>
            <TextField
              variant="outlined"
              placeholder="Search by Student ID / Student Name"
              sx={{ width: isLaptop ? 400 : 500 }}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search sx={{ fontSize: "1.3rem", cursor: "pointer" }} />
                  </InputAdornment>
                ),
              }}
            />

            <Button variant="contained" style={{ marginLeft: "30px" }}>
              Search
            </Button>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          width={"100%"}
          alignItems={"end"}
        >
          <Typography
            sx={{ fontSize: "18px", fontWeight: "700", paddingLeft: "10px" }}
          >
            Recent Incidents
          </Typography>
          <Box flexGrow={1} />
          <ReignsSelect
            items={statuses}
            label="Status"
            sx={{ width: "200px", right: "20px" }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: "20px",
          }}
        >
          {components.map((id) => (
            <DisplayCard
              key={id}
              id={id}
              isOpen={openId === id}
              onToggle={handleToggle}
            />
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            paddingTop: "20px",
            paddingRight: "20px",
            paddingBottom: "20px",
          }}
        >
          <IconButton sx={{ border: "0.5px solid black" }}>
            <ArrowRightIcon />
          </IconButton>
          <IconButton sx={{ border: "0.5px solid black" }}>
            <ArrowLeftIcon />
          </IconButton>
        </Box>
      </Box>
    </RevealCard>
  );
};

const DisplayCard = ({ id, isOpen, onToggle }) => {
  return (
    <Box
      sx={{
        padding: "5px",
        width: "380px",
        display: "flex",
        flexDirection: "column",
        height: "300px",
      }}
    >
      <Box
        sx={{
          border: "0.5px solid",
          borderColor: "#e12222",
          borderRadius: "5px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            paddingX: "10px",
            paddingY: "1px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Typography sx={{ fontSize: "12px", paddingRight: "20px" }}>
              Incident # : <span style={{ fontWeight: "700" }}>#112233</span>
            </Typography>
            <Typography sx={{ fontSize: "11px" }}>10 Jan 2024</Typography>
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                padding: "5px",
                backgroundColor: "#fed7d7",
                borderRadius: "6px",
              }}
            >
              Cancelled
            </Typography>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            paddingX: "10px",
            paddingY: "5px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "700",
                  paddingRight: "20px",
                }}
              >
                11 Jan 2024 - 20 Jan 2024
              </Typography>
              <Typography sx={{ fontSize: "11px" }}>10 Jan 2024</Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <IconButton
                onClick={() => {
                  onToggle(id);
                }}
                sx={{ marginLeft: "30px" }}
              >
                {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </IconButton>
            </Box>
          </Box>
        </Box>

        {isOpen && (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                paddingX: "10px",
                paddingY: "5px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography
                  sx={{
                    fontSize: "12px",
                    paddingRight: "20px",
                    color: "#7c7c81",
                  }}
                >
                  Non-Compliance type
                </Typography>
                <Typography sx={{ fontSize: "11px", fontWeight: "700" }}>
                  Loss or Damage of Property
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                paddingX: "10px",
                paddingY: "5px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    paddingRight: "20px",
                    color: "#7c7c81",
                  }}
                >
                  Last Actioned By
                </Typography>

                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "10px",
                  }}
                >
                  <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>
                    EMP0021
                  </Typography>
                  <Typography sx={{ fontSize: "11px" }}>Rohit Saha</Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                paddingX: "10px",
                paddingY: "5px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography
                  sx={{
                    fontSize: "12px",
                    paddingRight: "20px",
                    color: "#7c7c81",
                  }}
                >
                  Comments
                </Typography>

                <TextField variant="outlined" size="small" />
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                paddingX: "10px",
                paddingY: "5px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box flexGrow={1} />

              <AvatarGroup max={4}>
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: "30px", height: "30px" }}
                />
                <Avatar
                  alt="Travis Howard"
                  src="/static/images/avatar/2.jpg"
                  sx={{ width: "30px", height: "30px" }}
                />
                <Avatar
                  alt="Cindy Baker"
                  src="/static/images/avatar/3.jpg"
                  sx={{ width: "30px", height: "30px" }}
                />
                <Avatar
                  alt="Agnes Walker"
                  src="/static/images/avatar/4.jpg"
                  sx={{ width: "30px", height: "30px" }}
                />
                <Avatar
                  alt="Trevor Henderson"
                  src="/static/images/avatar/5.jpg"
                  sx={{ width: "30px", height: "30px" }}
                />
              </AvatarGroup>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ViewEditIncident;
