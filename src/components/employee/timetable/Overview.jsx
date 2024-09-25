import { useState } from "react";
import {
    Box,
    Button,
    Divider,
    Typography,
    Autocomplete,
    TextField,
} from "@mui/material";
import Bbox from "../../UiComponents/Bbox";
import RevealCard from "../../AnimationComponents/RevealCard";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ManageApplications() {
    const navigate = useNavigate();

    const columns = [
        { field: 'class', headerName: 'Class', width: 150 },
        {
            field: 'section',
            headerName: 'Section',
            children: [
                {
                    field: 'A',
                    headerName: 'A',
                    children: [
                        {
                            field: 'A_mapped',
                            headerName: 'Mapped',
                            width: 100,
                            renderCell: (params) => params.value ? '✅' : '⚠️'
                        },
                        {
                            field: 'A_published',
                            headerName: 'Published',
                            width: 100,
                            renderCell: (params) => params.value ? '✅' : '⚠️'
                        }
                    ]
                },
                {
                    field: 'B',
                    headerName: 'B',
                    children: [
                        {
                            field: 'B_mapped',
                            headerName: 'Mapped',
                            width: 100,
                            renderCell: (params) => params.value ? '✅' : '⚠️'
                        },
                        {
                            field: 'B_published',
                            headerName: 'Published',
                            width: 100,
                            renderCell: (params) => params.value ? '✅' : '⚠️'
                        }
                    ]
                },
                {
                    field: 'C',
                    headerName: 'C',
                    children: [
                        {
                            field: 'C_mapped',
                            headerName: 'Mapped',
                            width: 100,
                            renderCell: (params) => params.value ? '✅' : '⚠️'
                        },
                        {
                            field: 'C_published',
                            headerName: 'Published',
                            width: 100,
                            renderCell: (params) => params.value ? '✅' : '⚠️'
                        }
                    ]
                },
                {
                    field: 'D',
                    headerName: 'D',
                    children: [
                        {
                            field: 'D_mapped',
                            headerName: 'Mapped',
                            width: 100,
                            renderCell: (params) => params.value ? '✅' : '⚠️'
                        },
                        {
                            field: 'D_published',
                            headerName: 'Published',
                            width: 100,
                            renderCell: (params) => params.value ? '✅' : '⚠️'
                        }
                    ]
                },
                {
                    field: 'E',
                    headerName: 'E',
                    children: [
                        {
                            field: 'E_mapped',
                            headerName: 'Mapped',
                            width: 100,
                            renderCell: (params) => params.value ? '✅' : '⚠️'
                        },
                        {
                            field: 'E_published',
                            headerName: 'Published',
                            width: 100,
                            renderCell: (params) => params.value ? '✅' : '⚠️'
                        }
                    ]
                }
            ]
        }
    ];

    const rows = [
        {
            id: 1,
            class: 'Nursery',
            A_mapped: true, A_published: true,
            B_mapped: true, B_published: true,
            C_mapped: false, C_published: false,
            D_mapped: false, D_published: false,
            E_mapped: false, E_published: false
        },
    ];

    return (
        <RevealCard>
            <Bbox borderRadius={2} overflow={"hidden"} mt={4}>
                <Box
                    bgcolor={"white"}
                    py={1.3}
                    px={3}
                    borderRadius={2}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Typography fontWeight={"700"} borderRadius={1} fontSize={"1.1rem"}>
                        Overview
                    </Typography>

                    <Autocomplete
                        options={["Student 1", "Student 2"]}
                        filterSelectedOptions
                        freeSolo={false}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Academic Year"
                                label="Academic Year"
                            />
                        )}
                        sx={{ width: "20%" }}
                    />
                </Box>

                <Divider />

                <ToastContainer />

                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                </div>
                {/* <NewCandidateInvitation open={inviteNewCandidatePopup} close={() => setInviteNewCandidatePopup(false)} /> */}


            </Bbox>
        </RevealCard>
    )
}
