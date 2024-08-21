import { Icon, InlineIcon } from "@iconify/react";
import { InboxRounded, Search } from "@mui/icons-material";
import {
  Box,
  ButtonBase,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { navigations } from "../navigation/navigations";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { config } from "../config";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import useAuth from "../hooks/useAuth";
import { AppContext } from "../context/AppContext";
const Sidebar = () => {
  const theme = useTheme();
  const location = useLocation();
  const user = useAuth();

  const isPathActive = (path) => {
    return location.pathname.startsWith(`/${path}`);
  };

  const [activeTab, setActiveTab] = useState(null);

  function handleDropdown(idx) {
    if (idx != activeTab) {
      setActiveTab(idx);
    } else if (activeTab != null) {
      setActiveTab(null);
    }
  }

  const [routeCounters, setRouteCounters] = useState(
    localStorage.getItem("most-used")
      ? JSON.parse(localStorage.getItem("most-used"))
      : {}
  );

  const handleRouteChange = (route) => {
    if ("/" + route.path == location.pathname) return;

    setRouteCounters((prevCounters) => ({
      ...prevCounters,
      [route.name]: {
        ...prevCounters[route.name],
        count: (prevCounters[route.name]?.count || 0) + 1,
        name: route.name,
        link: route.path,
      },
    }));
  };

  const ctx = useContext(AppContext);
  useEffect(() => {
    const topRoutes = Object.entries(routeCounters)
      .sort(([, countA], [, countB]) => countB.count - countA.count)
      .slice(0, 5)
      .map(([key, value]) => value);

    const tabs = topRoutes.reduce((obj, item) => {
      obj[item.name] = { ...item };
      return obj;
    }, {});

    ctx.setQuickTabs(tabs);
    localStorage.setItem("most-used", JSON.stringify(tabs));
  }, [routeCounters]);

  return (
    <>
      <Box
        px={2}
        width={config.NAVBAR_WIDTH}
        position={"absolute"}
        borderRight={"1px solid black"}
        borderColor={theme.palette.grey[300]}
        bgcolor={"white"}
        height={"100vh"}
        overflow="hidden"
        display="flex"
        flexDirection="column"
        sx={{
          pointerEvents: "auto",
        }}
      >
        <Box height={"5rem"} display={"flex"} alignItems={"center"}>
          <Typography
            fontSize={"1.2rem"}
            color={"primary.main"}
            fontWeight={"500"}
          >
            SociolinQ
          </Typography>
        </Box>
        <Box
          display={"flex"}
          p={2}
          borderRadius={2}
          bgcolor={"#EEF2F6"}
          gap={2}
          alignItems={"center"}
          justifyContent={"flex-start"}
        >
          <Icon
            icon="fluent-mdl2:git-logo"
            color={useTheme().palette.primary.main}
            height={"2rem"}
          />
          <Box>
            <Typography fontSize={"1.05rem"} fontWeight={600}>
              {user.user?.first_name}
            </Typography>
            <Typography
              fontSize={"0.9rem"}
              color={"primary.main"}
              fontWeight={"500"}
            >
              Admin
            </Typography>
          </Box>
        </Box>
        <TextField
          sx={{ my: 2 }}
          size="small"
          label="Search"
          variant="outlined"
          placeholder="Search Modules"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search sx={{ fontSize: "1.3rem" }} />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ overflowY: "scroll" }} pr={2} pb={3} height={"100%"}>
          {navigations.map((nav, idx) => (
            <Box
              component={motion.div}
              mt={1}
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.2 }}
              overflow={"hidden"}
              borderRadius={1}
              onClick={() => {
                if (!nav.dropdown) handleRouteChange(nav);
              }}
            >
              <ButtonBase
                sx={(theme) => ({
                  width: "100%",
                  color: "#00000069",
                })}
              >
                <Box
                  component={Link}
                  to={nav.dropdown ? null : nav?.path}
                  onClick={() => nav.dropdown && handleDropdown(idx)}
                  className={`${isPathActive(nav.path) ? "active" : ""}`}
                  width={"100%"}
                  py={1.2}
                  minHeight={"3rem"}
                  borderRadius={1}
                  px={2}
                  display={"flex"}
                  alignItems={"center"}
                  sx={{
                    cursor: "pointer",
                    "&.active": {
                      bgcolor: "primary.lighter",
                    },
                    "&.active .navs": {
                      fontWeight: "500",
                      color: "primary.main",
                    },
                    "&:hover": { bgcolor: "grey.200" },
                    "&.active:hover": {
                      bgcolor: "primary.light",
                    },
                    "&.active:hover .navs": {
                      color: "primary.main",
                    },
                  }}
                >
                  <Box
                    display={"flex"}
                    width={"100%"}
                    gap={1}
                    alignItems={"center"}
                    className="navs"
                    color={"#4d4d4d"}
                  >
                    <Icon icon={nav.icon} />
                    <Typography
                      textTransform={"capitalize"}
                      lineHeight={"1ch"}
                      mr={"auto"}
                      fontSize={"0.9rem"}
                    >
                      {nav.name}
                    </Typography>
                    {nav.dropdown && (
                      <Box
                        sx={{
                          rotate: activeTab == idx && "-180deg",
                          transition: "0.3s",
                        }}
                      >
                        <Icon icon="mingcute:down-fill" height={15} />
                      </Box>
                    )}
                  </Box>
                </Box>
              </ButtonBase>

              {/* submenu */}
              {
                <Box
                  borderLeft={"1px solid #d6d6d6"}
                  marginLeft={"1rem"}
                  overflow={"hidden"}
                  component={motion.div}
                  animate={{
                    height: activeTab == idx ? "auto" : 0,
                  }}
                >
                  {nav.subMenu?.map((submenu, idx) => (
                    <Link
                      to={submenu.path}
                      key={idx}
                      onClick={() => {
                        handleRouteChange(submenu);
                      }}
                    >
                      <Box
                        p={1}
                        py={1.3}
                        display={"flex"}
                        borderRadius={1}
                        ml={1}
                        alignItems={"center"}
                        gap={1}
                        color={"#4d4d4d"}
                        className={`${
                          isPathActive(submenu.path) ? "active" : ""
                        }`}
                        sx={{
                          cursor: "pointer",
                          "&.active": {
                            color: "primary.main",
                          },
                          "&.active .navs": {
                            fontWeight: "500",
                            color: "primary.main",
                          },
                          "&:hover": { color: "primary.main" },
                          "&:hover .navs": {
                            color: "primary.main",
                          },
                        }}
                      >
                        <Icon icon={submenu.icon} height={13} />
                        <Typography className="navs" fontSize={"0.87rem"}>
                          {submenu.name}
                        </Typography>
                      </Box>
                    </Link>
                  ))}
                </Box>
              }
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
