import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  IconButton,
  Avatar,
  AvatarGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import RevealCard from "@/components/AnimationComponents/RevealCard";
import ReignsSelect from "@/components/UiComponents/ReignsSelect";
import { DataGrid } from "@mui/x-data-grid";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SVG from './SVG';
import ListOfStudents from "./ListStudents";
import DisplayCardSingle from "./DisplayCardSingle";
import EditAction from './EditAction';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import PageLoader from '../../PageLoader'
import api from "../../../config/api";
import { toast } from "react-toastify";

const ViewEditIncident = () => {
  const statuses = ["Open", "Cancelled", "Closed", "All"];
  const [openId, setOpenId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [libraryCardNumbers, setLibraryCardNumbers] = useState([]);
  const [selectedLibraryCard, setSelectedLibraryCard] = useState('');
  const [userType, setUserType] = useState('')
  const [rows, setRows] = useState([]);

  const [showList, setShowList] = useState(false);
  const components = [1, 2, 3];

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const columns1 = [
    {
      field: "space", headerName: "", flex: 0.2,
    },
    {
      field: "id",
      headerName: "Library Card #", flex: 1
    },
    {
      field: "name",
      headerName: "Name", flex: 1.5
    },
    {
      field: "class",
      headerName: "Class", flex: 0.8
    },
    {
      field: "section",
      headerName: "Section", flex: 0.8
    },
    {
      field: "roll",
      headerName: "Roll #", flex: 0.8
    },
    {
      field: "status",
      headerName: "Library Card Status", flex: 1.5,
      renderCell: (params) => (
        <Box
          style={{
            backgroundColor:
              params.value === "Active"
                ? "#C6F6D5"
                : params.value === "Suspended"
                  ? "#FFCCCC"
                  : "transparent",
            borderRadius: "6px",
            display: "inline-block",
            width:
              params.value === "Active" || params.value === "Suspended"
                ? "auto"
                : "auto",
            paddingLeft:
              params.value === "Active"
                ? "7px"
                : params.value === "Suspended"
                  ? "7px"
                  : "0px",
            paddingRight:
              params.value === "Active"
                ? "7px"
                : params.value === "Suspended"
                  ? "7px"
                  : "0px",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "period",
      headerName: "Last Suspension Period", flex: 1.8
    },
    {
      field: "amount",
      headerName: "Penalty Due Amount", flex: 1.5
    },
    {
      field: "incidentid",
      flex: 1.5,
      headerName: "Open Incidents",
      renderCell: (params) => (
        <Box
          style={{
            backgroundColor: "#e8def8",
            borderRadius: "6px",
            display: "inline-block",
            width: "auto",
            paddingLeft: "7px",
            paddingRight: "7px",
          }}
        >
          {params.value}
        </Box>
      ),
    },
  ];

  const rows1 = [
    {
      id: "AG240001",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      status: "Active",
      period: "N/A",
      amount: "Nil",
      incidentid: "#112233",

    }
  ];


  async function getLibraryCardDetail() {
    try {
      setLoading(true);
      if (!selectedLibraryCard) return;

      const response = await api.get(`/library/library-cards/?card_number=${selectedLibraryCard}`);
      console.log(response.data);

      if (response.data.length > 0) {
        const cardData = response.data[0];
        if (userType === '' && cardData.person_type === 'Employee') {
          setUserType('employee')
        } else if (userType === '' && cardData.person_type === 'Student') {
          setUserType('student')
        }

        let newRow;
        if (cardData.person_type === 'Employee') {
          newRow = {
            id: cardData.id,
            library_card_number: cardData.card_number,
            name: `${cardData.employee.employee_personal_details.first_name} ${cardData.employee.employee_personal_details.last_name}`,
            user_id: cardData.issued_by,
            caution_money: cardData.caution_money,
            type: cardData.employee.employee_type, // Note: 'category' is not directly available, using 'employee_type' instead
            department: cardData.employee.department,
            current_status: cardData.is_active ? 'Active' : 'Inactive',
            current_borrowings: cardData.current_borrowings,
            period: cardData.last_suspension_end_date || 'null',
            amount: cardData.penalty_due,
            open_incidents: cardData.open_incidents.join(', ') || 'None'
          };
        } else if (cardData.person_type === 'Student') {
          newRow = {
            id: cardData.id,
            library_card_number: cardData.card_number,
            name: `${cardData.employee.employee_personal_details.first_name} ${cardData.employee.employee_personal_details.last_name}`,
            user_id: cardData.issued_by,
            caution_money: cardData.caution_money,
            type: cardData.employee.employee_type, // Note: 'category' is not directly available, using 'employee_type' instead
            department: cardData.employee.department,
            current_status: cardData.is_active ? 'Active' : 'Inactive',
            current_borrowings: cardData.current_borrowings,
            period: cardData.last_suspension_end_date || 'null',
            amount: cardData.penalty_due,
            open_incidents: cardData.open_incidents.join(', ') || 'None'
          };
        }
        console.log('New row:', newRow);
        setRows((prevRows) => {
          // Check if a row with the same id already exists
          const rowExists = prevRows.some(row => row.id === newRow.id);

          if (rowExists) {
            // If the row already exists, return the previous rows unchanged
            return prevRows;
          } else {
            // If the row doesn't exist, add it to the array
            return [...prevRows, newRow];
          }
        });
      } else {
        ([]); // Set to empty array if no data returned
      }

    } catch (error) {
      console.log(error);
      toast.error('Error Loading Data.')
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { getLibraryCardDetail() }, [selectedLibraryCard])

  useEffect(() => {
    async function getLibraryCardDetails() {
      try {
        const response = await api.get('/library/library-cards/?display_type=list_view');
        console.log(response.data);

        setLibraryCardNumbers(response.data.library_cards);
      } catch (err) {
        console.log(err);
        toast.error('Error Occured!');
      }
    }
    getLibraryCardDetails();
  }, []);


  if (loading) {
    console.log('loading');
    <PageLoader />
  }
  return (
    <RevealCard>
      <Box ml={2} mr={2}>
        <Box display={"flex"} gap={1} sx={{ width: '25%', marginY: '24px' }}>
          <FormControl fullWidth>
            <InputLabel>Search by Library Card #</InputLabel>
            <Select
              label="Search by Library Card #"
              value={selectedLibraryCard}
              required
              onChange={(e) => setSelectedLibraryCard(e.target.value)}
            >
              {
                libraryCardNumbers?.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Box>


        <Box>
          <DataGrid
            rows={rows1}
            columns={columns1}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </Box>

        <Box mt={4}>
          <Accordion sx={{ marginY: '16px' }}>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              sx={{
                bgcolor: '#ECEDED',
                borderRadius: '8px',
                '&.Mui-expanded': {
                  minHeight: '48px', // Adjust this value as needed
                  margin: '0',
                },
                '& .MuiAccordionSummary-expandIconWrapper': {
                  order: -1, // This moves the icon to the left
                  marginRight: '8px', // Add some space between the icon and the text
                  transform: 'rotate(-90deg)', // Rotate the icon to point right when not expanded
                },
                '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                  transform: 'rotate(0deg)', // Reset the rotation when expanded
                },
              }}
            >
              <Typography>2024-25</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ margin: 0, padding: 0, paddingTop: '16px' }}>
              <DisplayCardSingle setShowList={setShowList} />
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ marginY: '16px' }}>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              sx={{
                bgcolor: '#ECEDED',
                borderRadius: '8px',
                '&.Mui-expanded': {
                  minHeight: '48px', // Adjust this value as needed
                  margin: '0',
                },
                '& .MuiAccordionSummary-expandIconWrapper': {
                  order: -1, // This moves the icon to the left
                  marginRight: '8px', // Add some space between the icon and the text
                  transform: 'rotate(-90deg)', // Rotate the icon to point right when not expanded
                },
                '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                  transform: 'rotate(0deg)', // Reset the rotation when expanded
                },
              }}
            >
              <Typography>2023-24</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ margin: 0, padding: 0, paddingTop: '16px' }}>
              <DisplayCardSingle setShowList={setShowList} />
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ marginY: '16px' }}>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              sx={{
                bgcolor: '#ECEDED',
                borderRadius: '8px',
                '&.Mui-expanded': {
                  minHeight: '48px', // Adjust this value as needed
                  margin: '0',
                },
                '& .MuiAccordionSummary-expandIconWrapper': {
                  order: -1, // This moves the icon to the left
                  marginRight: '8px', // Add some space between the icon and the text
                  transform: 'rotate(-90deg)', // Rotate the icon to point right when not expanded
                },
                '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                  transform: 'rotate(0deg)', // Reset the rotation when expanded
                },
              }}
            >
              <Typography>2022-23</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ margin: 0, padding: 0, paddingTop: '16px' }}>
              <DisplayCardSingle setShowList={setShowList} />
            </AccordionDetails>
          </Accordion>
        </Box>


        <Box
          display="flex"
          flexDirection="row"
          width={"100%"}
          alignItems={"end"}
          marginTop={4}
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
              setShowList={setShowList}
            />
          ))}
        </Box>

        {showList && <ListOfStudents open={showList} close={() => setShowList(false)} />}

        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            zIndex: 1,
            gap: "10px",
            paddingBottom: '16px' // This adds space between the IconButtons
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

const DisplayCard = ({ id, isOpen, onToggle, setShowList }) => {
  const [showEditAction, setShowEditAction] = useState(false);

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
              onClick={() => setShowEditAction(true)}
            >
              <EditOutlinedIcon />
            </button>
          </Box>
          <EditAction open={showEditAction} close={() => setShowEditAction(false)} />
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
            }}
            >
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
            }}
            >

              <GavelOutlinedIcon color="error" sx={{
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

            <Box sx={{ display: "flex", flexDirection: "row" }}
            >
              <IconButton
                onClick={() => {
                  onToggle(id);
                }}
              // sx={{ marginLeft: "20px" }}
              >
                {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </IconButton>
            </Box>
          </Box>
        </Box>

        {isOpen && (
          <Box sx={{
            backgroundColor: "#fff",
            borderRadius: "4px",
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
        )}
      </Box>
    </Box >
  );
};

export default ViewEditIncident;
