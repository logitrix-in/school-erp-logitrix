import RevealCard from "../../../AnimationComponents/RevealCard";
import Bbox from "../../../UiComponents/Bbox";
import {
  Box,
  Button,
  Divider,
  Typography,
  Radio,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Menu
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid } from "@mui/x-data-grid";
import Banner from '../Banner'
import { useState } from 'react'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AssignTeacher from './popup/AssignTeacher'
import EditTeacher from './popup/EditTeacher'
import PublishPopup from './popup/PublishPopup'
import useClasses from '@/hooks/useClasses'
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

const ActionCell = ({ params, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit(params.id);
    handleClose();
  };

  const handleDelete = () => {
    onDelete(params.id);
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};

const Manage = ({ setMapping }) => {
  const { classes, sections, acYear, curYear } = useClasses();

  const [academicYear, setAcademicYear] = useState(curYear);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  const [classWiseRows, setClassWiseRows] = useState([{
    id: 1,
    subject: 'Mathematics',
    assigned_teacher: 'Satish Mehra',
    periods_per_week: 5,
    class_teacher: 'Rajesh Kumar'
  },
  {
    id: 2,
    subject: 'Science',
    assigned_teacher: 'Anita Sharma',
    periods_per_week: 5,
    class_teacher: 'Meena Gupta'
  },
  {
    id: 3,
    subject: 'English',
    assigned_teacher: 'Rajesh Kumar',
    periods_per_week: 5,
    class_teacher: 'Satish Mehra'
  },]);

  const [assignTeacher, setAssignTeacher] = useState(false);
  const [editMapping, setEditMapping] = useState(false);
  const [publishPopup, setPublishPopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState('');

  const classWisecolumns = [
    {
      field: "space", headerName: "", flex: 0.2
    },
    { field: "subject", headerName: "Subject", flex: 1 },
    { field: "assigned_teacher", headerName: "Assigned Teacher", flex: 1 },
    { field: "periods_per_week", headerName: "Periods per Week", flex: 1 },
    {
      field: "class_teacher", headerName: "Class Teacher", flex: 1, renderCell: (params) => (
        <Radio
          checked={params.row.id === selectedRow}
          color="primary"
          sx={{
            transform: "scale(0.6)",
          }}
          inputProps={{ "aria-label": params.row.id }}
          onChange={() => {
            setSelectedRow(params.row.id);
          }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => (
        <ActionCell params={params} onEdit={handleEdit} onDelete={handleDelete} />
      ),
    },
  ];

  // Custom cell renderer
  const SubjectTeacherCell = ({ value }) => (
    <div>
      <Typography variant="body2">{value.subject}</Typography>
      <Typography variant="caption" color="textSecondary" sx={{ bgcolor: value.teacher === 'Satish Mehra' ? '#E8DEF8' : 'inherit', px: 1, py: 0.5, borderRadius: 1 }}>{value.teacher}</Typography>
    </div >
  );

  const columns = [
    { field: 'day', headerName: 'Day', width: 120 },
    {
      field: '10am',
      headerName: '10am - 10:30am',
      width: 150,
      renderCell: (params) => <SubjectTeacherCell value={params.value} />
    },
    {
      field: '1030am',
      headerName: '10:30am - 11am',
      width: 150,
      renderCell: (params) => <SubjectTeacherCell value={params.value} />
    },
    {
      field: '11am',
      headerName: '11am - 11:30am',
      width: 150,
      renderCell: (params) => <SubjectTeacherCell value={params.value} />
    },
    {
      field: '1130am',
      headerName: '11:30am - 12pm',
      width: 150,
      renderCell: (params) => <SubjectTeacherCell value={params.value} />
    },
    {
      field: '12pm',
      headerName: '12pm - 12:30pm',
      width: 150,
      renderCell: (params) => <SubjectTeacherCell value={params.value} />
    },
    {
      field: '1230pm',
      headerName: '12:30pm - 1:00pm',
      width: 150,
      renderCell: (params) => <SubjectTeacherCell value={params.value} />
    },
    {
      field: '1pm',
      headerName: '1:00pm - 1:30pm',
      width: 150,
      renderCell: (params) => <SubjectTeacherCell value={params.value} />
    },
    {
      field: '130pm',
      headerName: '1:30pm - 2:00pm',
      width: 150,
      renderCell: (params) => <SubjectTeacherCell value={params.value} />
    },
  ];

  const rows = [
    {
      id: 1,
      day: 'Monday',
      '10am': {
        subject: 'Hindi',
        teacher: 'Satish Mehra'
      },
      '1030am': {
        subject: 'Math',
        teacher: 'Satish Mehra2'
      },
      '11am': {
        subject: 'English',
        teacher: 'Satish Mehra2'
      },
      '1130am': {
        subject: 'Social Studies',
        teacher: 'Satish Mehra2'
      },
      '12pm': {
        subject: 'Social Studies',
        teacher: 'Satish Mehra2'
      },
      '1230pm': {
        subject: 'Social Studies',
        teacher: 'Satish Mehra2'
      },
      '1pm': {
        subject: 'Social Studies',
        teacher: 'Satish Mehra2'
      },
      '130pm': {
        subject: 'Social Studies',
        teacher: 'Satish Mehra2'
      }
    },
    {
      id: 2,
      day: 'Tuesday',
      '10am': {
        subject: 'Hindi',
        teacher: 'Satish Mehra'
      },
      '1030am': {
        subject: 'Math',
        teacher: 'Satish Mehra2'
      },
      '11am': {
        subject: 'English',
        teacher: 'Satish Mehra2'
      },
      '1130am': {
        subject: 'Social Studies',
        teacher: 'Satish Mehra2'
      },
      '12pm': {
        subject: 'Social Studies',
        teacher: 'Satish Mehra2'
      },
      '1230pm': {
        subject: 'Social Studies',
        teacher: 'Satish Mehra2'
      },
      '1pm': {
        subject: 'Social Studies',
        teacher: 'Satish Mehra2'
      },
      '130pm': {
        subject: 'Social Studies',
        teacher: 'Satish Mehra2'
      }
    },
    {
      id: 3,
      day: 'Wednesday',
      '10am': {
        subject: 'Hindi',
        teacher: 'Satish Mehra'
      },
      '1030am': {
        subject: 'Math',
        teacher: 'Satish Mehra2'
      },
      '11am': {
        subject: 'English',
        teacher: 'Satish Mehra2'
      },
      '1130am': {
        subject: 'Social Studies',
        teacher: 'Satish Mehra2'
      },
      '12pm': {
        subject: 'Social Studies',
        teacher: 'Satish Mehra2'
      },
      '1230pm': {
        subject: 'Social Studies',
        teacher: 'Satish Mehra2'
      },
      '1pm': {
        subject: 'Social Studies',
        teacher: 'Satish Mehra2'
      },
      '130pm': {
        subject: 'Social Studies',
        teacher: 'Satish Mehra2'
      }
    },
    {
      id: 4,
      day: 'Thursday',
      '10am': {
        subject: 'Hindi',
        teacher: 'Satish Mehra'
      },
      '1030am': {
        subject: 'Math',
        teacher: 'Satish Mehra2'
      },
      '11am': {
        subject: 'English',
        teacher: 'Satish Mehra2'
      },
      '1130am': {
        subject: 'Social Studies',
        teacher: 'Satish Mehra2'
      },
      '12pm': {
        subject: 'Social Studies',
        teacher: 'Satish Mehra2'
      },
      '1230pm': {
        subject: 'Social Studies',
        teacher: 'Satish Mehra2'
      },
      '1pm': {
        subject: 'Social Studies',
        teacher: 'Satish Mehra2'
      },
      '130pm': {
        subject: 'Social Studies',
        teacher: 'Satish Mehra2'
      }
    },
    {
      id: 5,
      day: 'Friday',
      '10am': {
        subject: 'Hindi',
        teacher: 'Satish Mehra'
      },
      '1030am': {
        subject: 'Math',
        teacher: 'Satish Mehra2'
      },
      '11am': {
        subject: 'English',
        teacher: 'Satish Mehra2'
      },
      '1130am': {
        subject: 'Social Studies',
        teacher: 'Satish Mehra2'
      },
      '12pm': {
        subject: 'Social Studies',
        teacher: 'Satish Mehra2'
      },
      '1230pm': {
        subject: 'Social Studies',
        teacher: 'Satish Mehra2'
      },
      '1pm': {
        subject: 'Social Studies',
        teacher: 'Satish Mehra2'
      },
      '130pm': {
        subject: 'Social Studies',
        teacher: 'Satish Mehra2'
      }
    }
  ];

  const handleEdit = (id) => {
    console.log(`Edit row with id: ${id}`);
    setEditMapping(true);
  };

  const handleDelete = (id) => {
    setClassWiseRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  return (
    <>

      <RevealCard>
        <Bbox
          mt={3}
          width="100%"
          height="100%"
          borderRadius={2}
          overflow="hidden"
        >
          <Box
            bgcolor="white"
            py={1.3}
            px={3}
            borderRadius={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontWeight={700} fontSize="1.1rem">
              Manage
            </Typography>


            <FormControl sx={{ width: "20%" }}>
              <InputLabel>Academic Year</InputLabel>
              <Select
                label="Academic Year"
                onChange={(e) =>
                  setAcademicYear(e.target.value)
                }
                value={academicYear}
                size="small"
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

          <Box>

            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} p={2}>
              <Banner text={'Class-Wise Mapping'} />

              <Button color="primary" variant="outlined" onClick={() => setMapping('faculty')}>Switch to Faculty wise Mapping</Button>
            </Box>

            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              mt={4}
              p={2}
              height={50}
              gap={4}
            >
              <FormControl sx={{ width: "20%" }}>
                <InputLabel>Class</InputLabel>
                <Select
                  label="Class"
                  onChange={(e) =>
                    setSelectedClass(e.target.value)
                  }
                  value={selectedClass}
                >
                  {classes.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ width: "20%" }}>
                <InputLabel>Section</InputLabel>
                <Select
                  label="Section"
                  onChange={(e) =>
                    setSelectedSection(e.target.value)
                  }
                  value={selectedSection}
                >
                  {sections.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button variant="contained">Submit</Button>
            </Box>


            {/* Table */}
            <Box mt={2} mb={5} px={2} style={{ height: "100%" }}>
              <DataGrid
                rows={classWiseRows}
                columns={classWisecolumns}
              />
            </Box>

            <Box marginY={4} mx={2} display={'flex'} justifyContent={'space-between'}>
              <Button variant="contained" color="primary" width="auto" onClick={() => setAssignTeacher(true)}><AddCircleOutlineOutlinedIcon sx={{ mr: 1 }} />Add New</Button>
              <Button
                color="primary"
                variant="contained"
              >
                Save
              </Button>
            </Box>

            <AssignTeacher open={assignTeacher} close={() => setAssignTeacher(false)} />
            <EditTeacher open={editMapping} close={() => setEditMapping(false)} />
          </Box>

          <Box marginY={4} mx={2}>
            <Banner text={'Timetable'} />

            <Typography fontWeight={'medium'} mt={2}>Published</Typography>

            {/* Table */}
            <Box mt={2} mb={5} style={{ height: "100%" }}>

              <Box sx={{ width: "100%" }}>
                <DataGrid
                  autoHeight
                  experimentalFeatures={{
                    columnGrouping: true,
                  }}
                  rows={rows}
                  columns={columns}
                  columnGroupingModel={[
                    {
                      groupId: "IATimetable",
                      headerName: "Class - I A Timetable",
                      headerAlign: 'center',
                      children: [
                        { field: "10am" },
                        { field: "1030am" },
                        { field: "11am" },
                        { field: "1130am" },
                        { field: "12pm" },
                        { field: "1230pm" },
                        { field: "1pm" },
                        { field: "130pm" },
                      ],
                    },
                  ]}
                  disableRowSelectionOnClick
                />
              </Box>

              <Box marginY={4} display={'flex'} justifyContent={'flex-end'} gap={2}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => setPublishPopup(true)}
                >
                  Publish
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                >
                  Download
                </Button>
              </Box>

              <PublishPopup open={publishPopup} close={() => setPublishPopup(false)} />
            </Box>
          </Box>

        </Bbox>
      </RevealCard>
    </>
  );
};

export default Manage;
