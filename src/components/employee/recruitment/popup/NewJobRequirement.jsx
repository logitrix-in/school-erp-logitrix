import React from 'react';
import {
    Box,
    Button,
    Dialog,
    TextField,
    IconButton,
    Typography,
    Autocomplete,
    Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify'

const NewJobRequirement = ({ open, close }) => {
    return (
        <Dialog
            fullWidth
            maxWidth="lg"
            open={open}
            onClose={close}
            PaperProps={{
                sx: {
                    maxHeight: "90vh",
                    width: "80%",
                },
            }}
        >
            <Box overflow="auto">
                <Box
                    p={2}
                    bgcolor="primary.main"
                    color="white"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="h6">New Job Requirement</Typography>
                    <IconButton color="inherit" onClick={close} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box p={3} px={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ mr: 1 }}>Job ID:</Typography><Typography variant="subtitle1"> 324456BB</Typography>
                    </Box>

                    <Box sx={{ mt: 6, mb: 4, px: 2 }}>
                        <Typography variant="h6" sx={{ mb: 4 }}>Job Specific Requirement</Typography>
                        <Grid container spacing={2}>
                            <Box gap={4} display={'flex'} sx={{ width: '100%' }}>
                                <Box sx={{ width: '50%' }}>
                                    <Autocomplete
                                        sx={{ mb: 2 }}
                                        options={[]}
                                        renderInput={(params) => <TextField {...params} label="Employee Type" />}
                                    />
                                    <Box sx={{ display: 'flex', width: '100%' }} gap={4}>
                                        <Autocomplete
                                            sx={{ width: '100%', mb: 2 }}
                                            options={[]}
                                            renderInput={(params) => <TextField {...params} label="Grade" />}
                                        />
                                        <Autocomplete
                                            sx={{ width: '100%', mb: 2 }}
                                            options={[]}
                                            renderInput={(params) => <TextField {...params} label="Role" />}
                                        />
                                    </Box>
                                    <Autocomplete
                                        options={[]}
                                        renderInput={(params) => <TextField {...params} label="Work Location" />}
                                    />
                                </Box>
                                <Box sx={{ width: '50%' }}>
                                    <Autocomplete
                                        sx={{ mb: 2 }}
                                        options={[]}
                                        renderInput={(params) => <TextField {...params} label="Department" />}
                                    />
                                    <Autocomplete
                                        sx={{ mb: 2 }}
                                        options={[]}
                                        renderInput={(params) => <TextField {...params} label="Class Scope" />}
                                    />
                                    <TextField label="Number of Open Position(s)" fullWidth />
                                </Box>
                            </Box>
                        </Grid>
                    </Box>

                    <ToastContainer />
                    <Box sx={{ mt: 6, mb: 4 }}>
                        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Candidate Specific Requirement</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={3}>
                                <Autocomplete
                                    options={[]}
                                    renderInput={(params) => <TextField {...params} label="Medium" fullWidth />}
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Autocomplete
                                    options={[]}
                                    renderInput={(params) => <TextField {...params} label="Board" fullWidth />}
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Autocomplete
                                    options={[]}
                                    renderInput={(params) => <TextField {...params} label="Subject(s) Taught" fullWidth />}
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Autocomplete
                                    options={[]}
                                    renderInput={(params) => <TextField {...params} label="Category" fullWidth />}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box display={'flex'} gap={2}>
                                    <TextField label="Minimum Age" fullWidth />
                                    <TextField label="Maximum Age" fullWidth />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box display={'flex'} gap={2}>
                                    <TextField label="Minimum Year(s) of Relevant Experience" fullWidth />
                                    <TextField label="Minimum Year(s) of Total Experience" fullWidth />
                                </Box>

                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Autocomplete
                                    options={[]}
                                    renderInput={(params) => <TextField {...params} label="Degree" fullWidth />}
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Autocomplete
                                    options={[]}
                                    renderInput={(params) => <TextField {...params} label="Specialisation" fullWidth />}
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Autocomplete
                                    options={[]}
                                    renderInput={(params) => <TextField {...params} label="University" fullWidth />}
                                />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField label="Marks Secured/CGPA in Percentage" fullWidth />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box mt={2} display={'flex'} alignItems={'center'}>
                        <Typography sx={{ mr: 2 }}>Job Description: </Typography>
                        <Button variant="contained" color="primary">
                            Upload Job Description
                        </Button>
                    </Box>

                    <Box mt={2}>
                        <TextField
                            label="Comments"
                            multiline
                            rows={4}
                            fullWidth
                            placeholder="Use this field to add any comments relevant to this job requirement."
                        />
                    </Box>

                    <Box mt={3}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => {
                                toast.success("Job Requirement Submitted Successfully");
                                close();
                            }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Box >
        </Dialog >
    );
};

export default NewJobRequirement;