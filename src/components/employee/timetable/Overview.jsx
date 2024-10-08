import {
    Box,
    Divider,
    Typography,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import Bbox from "../../UiComponents/Bbox";
import RevealCard from "../../AnimationComponents/RevealCard";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer } from "react-toastify";
import { useState } from 'react';
import useClasses from '@/hooks/useClasses'

export default function ManageApplications() {
    const { curYear, acYear } = useClasses();
    const [academicYear, setAcademicYear] = useState(curYear);

    const columns = [
        { field: 'space', headerName: '', flex: 0.2 },
        {
            field: 'class', headerName: 'Class',
            width: 100,
        },
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
        },
        { field: 'space', headerName: '', width: 10 },
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
        },
        { field: 'space', headerName: '', width: 10 },
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
        },
        { field: 'space', headerName: '', width: 10 },
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
        },
        { field: 'space', headerName: '', width: 10 },
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
        },
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
        {
            id: 2,
            class: 'LKG',
            A_mapped: true, A_published: true,
            B_mapped: true, B_published: true,
            C_mapped: false, C_published: false,
            D_mapped: false, D_published: false,
            E_mapped: false, E_published: false
        },
        {
            id: 3,
            class: 'UKG',
            A_mapped: true, A_published: true,
            B_mapped: true, B_published: true,
            C_mapped: false, C_published: false,
            D_mapped: false, D_published: false,
            E_mapped: false, E_published: false
        },
        {
            id: 4,
            class: '1',
            A_mapped: true, A_published: true,
            B_mapped: true, B_published: true,
            C_mapped: false, C_published: false,
            D_mapped: false, D_published: false,
            E_mapped: false, E_published: false
        },
        {
            id: 5,
            class: '2',
            A_mapped: true, A_published: true,
            B_mapped: true, B_published: true,
            C_mapped: false, C_published: false,
            D_mapped: false, D_published: false,
            E_mapped: false, E_published: false
        },
        {
            id: 6,
            class: '3',
            A_mapped: true, A_published: true,
            B_mapped: true, B_published: true,
            C_mapped: false, C_published: false,
            D_mapped: false, D_published: false,
            E_mapped: false, E_published: false
        },
        {
            id: 7,
            class: '4',
            A_mapped: true, A_published: true,
            B_mapped: true, B_published: true,
            C_mapped: false, C_published: false,
            D_mapped: false, D_published: false,
            E_mapped: false, E_published: false
        },
        {
            id: 8,
            class: '5',
            A_mapped: true, A_published: true,
            B_mapped: true, B_published: true,
            C_mapped: false, C_published: false,
            D_mapped: false, D_published: false,
            E_mapped: false, E_published: false
        },
        {
            id: 9,
            class: '6',
            A_mapped: true, A_published: true,
            B_mapped: true, B_published: true,
            C_mapped: false, C_published: false,
            D_mapped: false, D_published: false,
            E_mapped: false, E_published: false
        },
        {
            id: 10,
            class: '7',
            A_mapped: true, A_published: true,
            B_mapped: true, B_published: true,
            C_mapped: false, C_published: false,
            D_mapped: false, D_published: false,
            E_mapped: false, E_published: false
        },
        {
            id: 11,
            class: '8',
            A_mapped: true, A_published: true,
            B_mapped: true, B_published: true,
            C_mapped: false, C_published: false,
            D_mapped: false, D_published: false,
            E_mapped: false, E_published: false
        },
        {
            id: 12,
            class: '9',
            A_mapped: true, A_published: true,
            B_mapped: true, B_published: true,
            C_mapped: false, C_published: false,
            D_mapped: false, D_published: false,
            E_mapped: false, E_published: false
        }
    ]

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



                    <FormControl sx={{ width: "20%" }}>
                        <InputLabel>Academic Year</InputLabel>
                        <Select
                            label="Academic Year"
                            onChange={(e) =>
                                setAcademicYear(e.target.value)
                            }
                            size="small"
                            value={academicYear}
                        >
                            {acYear.map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Divider />

                <ToastContainer />

                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                        experimentalFeatures={{ columnGrouping: true }}
                        columnGroupingModel={[
                            {
                                groupId: "sectionA",
                                headerName: "Section A",
                                headerAlign: 'center',
                                children: [
                                    { field: "A_mapped" },
                                    { field: "A_published" },
                                ],
                            },
                            {
                                groupId: "sectionB",
                                headerName: "Section B",
                                headerAlign: 'center',
                                children: [
                                    { field: "B_mapped" },
                                    { field: "B_published" },
                                ],
                            },
                            {
                                groupId: "sectionC",
                                headerName: "Section C",
                                headerAlign: 'center',
                                children: [
                                    { field: "C_mapped" },
                                    { field: "C_published" },
                                ],
                            },
                            {
                                groupId: "sectionD",
                                headerName: "Section D",
                                headerAlign: 'center',
                                children: [
                                    { field: "D_mapped" },
                                    { field: "D_published" },
                                ],
                            },
                            {
                                groupId: "sectionE",
                                headerName: "Section E",
                                headerAlign: 'center',
                                children: [
                                    { field: "E_mapped" },
                                    { field: "E_published" },
                                ],
                            },
                        ]}
                    />
                </div>

            </Bbox>
        </RevealCard>
    )
}
