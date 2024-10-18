import {
    Box,
    Button,
    Dialog,
    TextField,
    IconButton,
    Typography,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import useEmployees from '@/hooks/useEmployees'
import useClasses from '@/hooks/useClasses'
import { useState } from "react";
import Bbox from "../../../../components/UiComponents/Bbox";
import RevealCard from "../../../../components/AnimationComponents/RevealCard";

const NewJobRequirement = ({ open, close }) => {
    const { employeeType, employeeManagementDepartment, employeeTeachingDepartment, employeeSupportStaffDepartment, employeeGrade, employeeRole, employeeClassScope, employeeCasteCategory, employeeBoard, employeeMedium, employeeDegree, employeeSpecialisation, employeeUniversity } = useEmployees();

    const { subjects } = useClasses();

    const [selectedEmployeeType, setSelectedEmployeeType] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedClassScope, setSelectedClassScope] = useState('');
    const [selectedCasteCategory, setSelectedCasteCategory] = useState('');
    const [selectedBoard, setSelectedBoard] = useState('');
    const [selectedMedium, setSelectedMedium] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedDegree, setSelectedDegree] = useState('');
    const [selectedSpecialisation, setSelectedSpecialisation] = useState('');
    const [selectedUniversity, setSelectedUniversity] = useState('');

    const [employeeDepartment, setEmployeeDepartment] = useState([...employeeManagementDepartment, ...employeeTeachingDepartment, ...employeeSupportStaffDepartment]);

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
                    <Typography variant="h6">Edit Open Position(s)</Typography>
                    <IconButton color="inherit" onClick={close} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box p={3} px={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ mr: 1 }}>Job ID:</Typography><Typography variant="subtitle1"> 324456BB</Typography>
                    </Box>

                    <RevealCard>
                        <Bbox borderRadius={2} px={2} sx={{ my: 2 }}>
                            <Box sx={{ px: 2, py: 2 }}>
                                <Typography variant="h6" sx={{ mb: 4 }}>Job Specific Requirement</Typography>
                                <Grid container spacing={2}>
                                    <Box gap={4} display={'flex'} sx={{ width: '100%' }}>
                                        <Box sx={{ width: '50%' }}>
                                            <FormControl sx={{ width: "100%", mb: 2 }}>
                                                <InputLabel>Employee Type</InputLabel>
                                                <Select
                                                    label="Employee Type"
                                                    onChange={(e) =>
                                                        setSelectedEmployeeType(e.target.value)
                                                    }
                                                    value={selectedEmployeeType}
                                                >
                                                    {employeeType.map((year) => (
                                                        <MenuItem key={year} value={year}>
                                                            {year}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>

                                            <Box sx={{ display: 'flex', width: '100%', mb: 2 }} gap={2} >
                                                <FormControl sx={{ width: "100%" }}>
                                                    <InputLabel>Grade</InputLabel>
                                                    <Select
                                                        label="Grade"
                                                        onChange={(e) =>
                                                            setSelectedGrade(e.target.value)
                                                        }
                                                        value={selectedGrade}
                                                    >
                                                        {employeeGrade.map((year) => (
                                                            <MenuItem key={year} value={year}>
                                                                {year}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>

                                                <FormControl sx={{ width: "100%" }}>
                                                    <InputLabel>Role</InputLabel>
                                                    <Select
                                                        label="Role"
                                                        onChange={(e) =>
                                                            setSelectedRole(e.target.value)
                                                        }
                                                        value={selectedRole}
                                                    >
                                                        {employeeRole.map((year) => (
                                                            <MenuItem key={year} value={year}>
                                                                {year}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>

                                            </Box>
                                            <FormControl sx={{ width: "100%", mb: 2 }}>
                                                <InputLabel>Work Location</InputLabel>
                                                <Select
                                                    label="Work Location"
                                                    onChange={(e) =>
                                                        setSelectedRole(e.target.value)
                                                    }
                                                    value={selectedRole}
                                                >
                                                    {[].map((year) => (
                                                        <MenuItem key={year} value={year}>
                                                            {year}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Box>

                                        <Box sx={{ width: '50%' }}>
                                            <FormControl sx={{ width: "100%", mb: 2 }}>
                                                <InputLabel>Department</InputLabel>
                                                <Select
                                                    label="Department"
                                                    onChange={(e) =>
                                                        setSelectedDepartment(e.target.value)
                                                    }
                                                    value={selectedDepartment}
                                                >
                                                    {employeeDepartment.map((year) => (
                                                        <MenuItem key={year} value={year}>
                                                            {year}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>

                                            <FormControl sx={{ width: "100%", mb: 2 }}>
                                                <InputLabel>Class Scope</InputLabel>
                                                <Select
                                                    label="Class Scope"
                                                    onChange={(e) =>
                                                        setSelectedClassScope(e.target.value)
                                                    }
                                                    value={selectedClassScope}
                                                >
                                                    {employeeClassScope.map((year) => (
                                                        <MenuItem key={year} value={year}>
                                                            {year}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>

                                            <TextField label="Number of Open Position(s)" fullWidth sx={{ mb: 2 }} type="number" />
                                        </Box>
                                    </Box>
                                </Grid>
                            </Box>
                        </Bbox>
                    </RevealCard>

                    <RevealCard>
                        <Bbox borderRadius={2} px={2} sx={{ my: 2 }}>
                            <Box sx={{ px: 2, py: 2 }}>
                                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Candidate Specific Requirement</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <FormControl sx={{ width: "100%", mb: 2 }}>
                                            <InputLabel>Medium</InputLabel>
                                            <Select
                                                label="Medium"
                                                onChange={(e) =>
                                                    setSelectedMedium(e.target.value)
                                                }
                                                value={selectedMedium}
                                            >
                                                {employeeMedium.map((year) => (
                                                    <MenuItem key={year} value={year}>
                                                        {year}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <FormControl sx={{ width: "100%", mb: 2 }}>
                                            <InputLabel>Board</InputLabel>
                                            <Select
                                                label="Board"
                                                onChange={(e) =>
                                                    setSelectedBoard(e.target.value)
                                                }
                                                value={selectedBoard}
                                            >
                                                {employeeBoard.map((year) => (
                                                    <MenuItem key={year} value={year}>
                                                        {year}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <FormControl sx={{ width: "100%", mb: 2 }}>
                                            <InputLabel>Subject(s) Taught</InputLabel>
                                            <Select
                                                label="Subject(s) Taught"
                                                onChange={(e) =>
                                                    setSelectedSubject(e.target.value)
                                                }
                                                value={selectedSubject}
                                            >
                                                {subjects.map((year) => (
                                                    <MenuItem key={year} value={year}>
                                                        {year}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <FormControl sx={{ width: "100%", mb: 2 }}>
                                            <InputLabel>Category</InputLabel>
                                            <Select
                                                label="Category"
                                                onChange={(e) =>
                                                    setSelectedCasteCategory(e.target.value)
                                                }
                                                value={selectedCasteCategory}
                                            >
                                                {employeeCasteCategory.map((year) => (
                                                    <MenuItem key={year} value={year}>
                                                        {year}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box display={'flex'} gap={2}>
                                            <TextField label="Minimum Age" fullWidth type="number" />
                                            <TextField label="Maximum Age" fullWidth type="number" />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box display={'flex'} gap={2}>
                                            <TextField label="Minimum Year(s) of Relevant Experience" fullWidth type="number" />
                                            <TextField label="Minimum Year(s) of Total Experience" fullWidth type="number" />
                                        </Box>

                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <FormControl sx={{ width: "100%", mb: 2 }}>
                                            <InputLabel>Degree</InputLabel>
                                            <Select
                                                label="Degree"
                                                onChange={(e) =>
                                                    setSelectedDegree(e.target.value)
                                                }
                                                value={selectedDegree}
                                            >
                                                {employeeDegree.map((year) => (
                                                    <MenuItem key={year} value={year}>
                                                        {year}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <FormControl sx={{ width: "100%", mb: 2 }}>
                                            <InputLabel>Specialisation</InputLabel>
                                            <Select
                                                label="Specialisation"
                                                onChange={(e) =>
                                                    setSelectedSpecialisation(e.target.value)
                                                }
                                                value={selectedSpecialisation}
                                            >
                                                {employeeSpecialisation.map((year) => (
                                                    <MenuItem key={year} value={year}>
                                                        {year}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <FormControl sx={{ width: "100%", mb: 2 }}>
                                            <InputLabel>University</InputLabel>
                                            <Select
                                                label="University"
                                                onChange={(e) =>
                                                    setSelectedUniversity(e.target.value)
                                                }
                                                value={selectedUniversity}
                                            >
                                                {employeeUniversity.map((year) => (
                                                    <MenuItem key={year} value={year}>
                                                        {year}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <TextField label="Marks Secured/CGPA in Percentage" fullWidth />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Bbox>
                    </RevealCard>

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