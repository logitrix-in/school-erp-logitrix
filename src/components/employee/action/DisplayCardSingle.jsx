import {
    Box,
    TextField,
    Typography,
    Avatar,
    AvatarGroup,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined';
import RequestPageOutlinedIcon from '@mui/icons-material/RequestPageOutlined';
import SVG from './SVG';

export default function DisplayCardSingle({ setShowList }) {
    return (
        <Box
            sx={{
                padding: "5px",
                width: "380px",
                display: "flex",
                flexDirection: "column",
                height: "300px",
                zIndex: 2,
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
                        // paddingX: "10px",
                        paddingTop: "12px",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        position: 'relative',
                    }}
                >
                    <SVG />
                    <Box
                        sx={{
                            display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-evenly", width: "100%", paddingTop: '4px'
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "10px",
                                // paddingY: "2px",
                                paddingX: "6px",
                                backgroundColor: "#fed7d7",
                                borderRadius: "4px",
                                color: "#822727",
                            }}
                        >
                            Cancelled
                        </Typography>
                        <button
                            style={{
                                padding: "0",
                                margin: "0",
                                backgroundColor: "#fff",
                                border: "none",
                                cursor: "pointer",
                            }}
                        >
                            <MoreVertIcon />
                        </button>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        paddingX: "4px",
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
                            width: "100%",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box sx={{
                            display: "flex", flexDirection: "row", alignItems: 'center',
                        }}>
                            <NotInterestedOutlinedIcon color="error" sx={{
                                width: '16px',
                                height: '16px',
                                marginRight: '4px'
                            }} />
                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    fontWeight: "700",
                                    paddingRight: "20px",
                                }}
                            >
                                11 Jan 2024 - 20 Jan 2024
                            </Typography>
                        </Box>

                        <Box sx={{
                            display: "flex", flexDirection: "row", alignItems: 'center',
                        }}>

                            <RequestPageOutlinedIcon color="error" sx={{
                                width: '18px',
                                height: '18px',
                                marginRight: '4px'
                            }} />
                            <Typography sx={{
                                fontSize: "12px", fontWeight: "700",
                            }}>
                                ₹ 1500.00
                            </Typography>
                        </Box>
                        <Box sx={{
                            flex: 1
                        }}>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{
                    backgroundColor: "#fff",
                    borderRadius: "4px",
                    mt: 1
                }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            paddingX: "8px",
                        }}
                    >
                        <Typography sx={{
                            fontSize: '12px', color: '#7c7c81', width: "35%"
                        }}>
                            Non-Compliance type
                        </Typography>

                        <Typography sx={{
                            fontSize: '11px', fontWeight: '700', width: "65%", marginLeft: '8px'
                        }}>
                            Loss or Damage of Property
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            paddingX: "8px",
                            marginTop: '12px'
                        }}
                    >

                        <Typography
                            sx={{
                                fontSize: "12px",
                                paddingRight: "20px",
                                color: "#7c7c81",
                                width: "35%"
                            }}
                        >
                            Last Actioned By
                        </Typography>

                        <Box sx={{ width: "65%", marginLeft: '8px', display: 'flex' }}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    marginLeft: "10px",
                                }}
                            >
                                <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>Rohit Saha</Typography>
                                <Typography sx={{ fontSize: "11px" }}>
                                    EMP0021
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            paddingX: "8px",
                            marginTop: '12px'
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "12px",
                                paddingRight: "20px",
                                color: "#7c7c81",
                                width: "35%"
                            }}
                        >
                            Comments
                        </Typography>

                        <TextField
                            variant="outlined"
                            multiline
                            rows={3}
                            sx={{
                                width: "65%",
                                marginLeft: '8px',
                                '& .MuiOutlinedInput-root': {
                                    fontSize: '12px',
                                    padding: 1,
                                },
                                '& .MuiOutlinedInput-input': {
                                    padding: 0,
                                },
                            }}
                            disabled
                            value={'Lorem ipsum dolor sit amet consectetur. Non bibendum nulla risus mauris pharetra ut at augue. Mattis quis netus scelerisque a congue.'}
                        />
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

                        <AvatarGroup
                            max={4}
                            sx={{
                                '& .MuiAvatar-root': { width: 30, height: 30 },
                                '& .MuiAvatarGroup-avatar': {
                                    width: 30,
                                    height: 30,
                                    fontSize: '0.75rem', // Smaller font size for the +2
                                },
                                cursor: "pointer"
                            }}
                            onClick={() => setShowList(true)}
                        >
                            <Avatar
                                alt="Remy Sharp"
                                src="/small/1.png"
                                sx={{ width: "30px", height: "30px" }}
                            />
                            <Avatar
                                alt="Travis Howard"
                                src="/small/2.png"
                                sx={{ width: "30px", height: "30px" }}
                            />
                            <Avatar
                                alt="Cindy Baker"
                                src="/small/3.png"
                                sx={{ width: "30px", height: "30px" }}
                            />
                            <Avatar
                                alt="Agnes Walker"
                                src="/small/4.png"
                                sx={{ width: "30px", height: "30px" }}
                            />
                            <Avatar
                                alt="Trevor Henderson"
                                src="/small/5.png"
                                sx={{ width: "30px", height: "30px" }}
                            />
                        </AvatarGroup>
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}