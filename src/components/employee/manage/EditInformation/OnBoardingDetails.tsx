import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, ChangeEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../../../config/api";
import { useForm } from "react-hook-form";
// import { candidateType } from "../utils/candidateType";
import dayjs from "dayjs";
import { Icon } from "@iconify/react";
import { candidateType } from "../../../../utils/candidateType";
import { Info } from "@material-ui/icons";
import profile from "../../../../assets/icons/profile.png";

const OnboardingDetails = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [candidate, setCandidate] = useState<candidateType | null>(null);
  const [image, setImage] = useState<string | null>(null);

  // handle image change
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Form Handling using react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      blood_group: "",
      physician_number: "",
      migration_certificate: "",
      activity: "",
      payment_type: "Challan No",
    },
  });

  const err = (name) => {
    return {
      error: !!errors[name],
      helperText: errors[name]?.message,
    };
  };

  const submit = (e) => {
    console.log(e);
  };

  const navigate = useNavigate();

  return (
    <Box>
      {/* Top text and close icon */}
      <Box
        bgcolor={"primary.main"}
        p={2}
        display={"flex"}
        justifyContent={"space-between"}
        gap={2}
        alignItems={"center"}
      >
        {/* Edit Information text */}
        <Typography fontSize={"1.2rem"} color={"white"}>
          View Employee Information
        </Typography>

        {/* {searchParams.get("admin") == "true" && ( */}

        {/* close icon */}
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          gap={2}
          alignItems={"center"}
          sx={{
            cursor: "pointer",
            color: "white",
            ":hover": {
              color: "#2b2b2b !important",
            },
          }}
        >
          <Icon
            onClick={() => navigate("/employee/manage/edit-information")}
            icon="fa:close"
            fontSize={"1.2rem"}
            color="inherit"
          />
        </Box>
      </Box>

      <Box p={2}>
        <Box display={"flex"} justifyContent={"flex-end"}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => navigate("/employee/manage/OnBoardingEdit")}
          >
            Edit
          </Button>
        </Box>
        <form onSubmit={handleSubmit(submit)}>
          <Stack alignItems={"center"} p={3} position="relative">
            {/* profile image */}
            <img
              src={profile}
              height={"130px"}
              style={{
                objectFit: "cover",
              }}
            />

            <Box display={"flex"}>
              {/* student id */}
              <Box>
                <Typography mt={2} fontWeight={600} fontSize={"1rem"}>
                  Employee ID
                </Typography>
                <Typography mt={2} fontWeight={600} fontSize={"1rem"}>
                  Date of Joining
                </Typography>
              </Box>
              <Box ml={2}>
                <Typography mt={2} fontWeight={600} fontSize={"1rem"}>
                  : ACS23010001
                </Typography>
                <Typography mt={2} fontWeight={600} fontSize={"1rem"}>
                  : 1 Jan 2023
                </Typography>
              </Box>
            </Box>
          </Stack>
          <Stack spacing={2}>
            <Stack direction={"row"} spacing={2}>
              <Stack flex={1} spacing={2}>
                <PersonalDetails
                  candidate={candidate}
                  register={register}
                  err={err}
                  control={control}
                  watch={watch}
                />
                <ApplicationDetails
                  candidate={candidate}
                  register={register}
                  err={err}
                />
              </Stack>
              <Stack flex={1} spacing={2}>
                <EmploymentHistoryDetails
                  candidate={candidate}
                  register={register}
                  err={err}
                />
                <AddressDetails
                  candidate={candidate}
                  register={register}
                  err={err}
                />
              </Stack>
            </Stack>

            <AcademicDetails
              candidate={candidate}
              register={register}
              err={err}
            />
          </Stack>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => navigate("/employee/manage/OnBoardingEdit")}
          >
            Edit Details
          </Button>
        </form>
      </Box>
    </Box>
  );
};

const show = (label, value, size = "0", cap = true) => {
  return (
    <Stack direction={"row"} spacing={1}>
      <Typography minWidth={size + "px"}>{label} :</Typography>
      <Typography
        textTransform={cap ? "capitalize" : "initial"}
        flex={1}
        sx={{
          wordBreak: "break-all",
        }}
        fontWeight={600}
      >
        {value}
      </Typography>
    </Stack>
  );
};

// Left side forms

const PersonalDetails = ({ candidate, register, err, control, watch }) => {
  const c: candidateType = candidate;
  const p = c?.candidate_details;

  const elem = watch("blood_group");

  return (
    <Box>
      <Typography
        width={"100%"}
        p={1}
        px={2}
        bgcolor={"#E3E0E0"}
        fontWeight={600}
        fontSize={"1rem"}
      >
        Personal Details
      </Typography>

      <Grid
        container
        rowSpacing={3}
        columnSpacing={2}
        mt={1}
        alignItems={"center"}
      >
        <Grid item sm={12} lg={6}>
          {show(
            "Candidate's Name",
            // `${p?.first_name} ${p?.middle_name ?? ""} ${p?.last_name}`
            "Ramki Kumar Reddy"
          )}
        </Grid>
        <Grid item sm={12} lg={6}>
          {show(
            "Email ID",
            // p?.email
            "ramki.kumar@example.com",
            undefined,
            false
          )}
        </Grid>
        <Grid item sm={12} lg={6}>
          {show(
            "Contact Number",
            //  p?.contact_number
            "+913265789645"
          )}
        </Grid>
        <Grid item sm={12} lg={6}>
          {show(
            "Nationality",
            // p?.nationality
            "Indian"
          )}
        </Grid>
        <Grid item xs={12}>
          {show(
            "Religion",
            // p?.religion
            "Hindu"
          )}
        </Grid>

        <Grid item sm={12} lg={6}>
          {show(
            "Date of Birth",
            // dayjs(p?.dob).format("DD MMM YYYY")
            "15 Aug 1990"
          )}
        </Grid>

        <Grid
          item
          sm={12}
          lg={6}
          display={"flex"}
          gap={2}
          alignItems={"center"}
        >
          {show(
            "Category",
            // p?.category
            "OBC"
          )}
          {p?.category != "Unreserved" && (
            <Stack direction="row" spacing={1} alignItems="center">
              {/* Upload Category Certificate button */}
              <IconButton>
                <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
              </IconButton>

              <Typography color={"error"} variant="caption" mt={0.3}>
                {err("category_certificate")?.helperText}
              </Typography>
            </Stack>
          )}
        </Grid>

        <Grid item xs={12}>
          {show(
            "Gender",
            // p?.gender
            "Male"
          )}
        </Grid>

        <Grid item sm={12} lg={6}>
          {show(
            "Father's Name",
            // p?.father_name
            "Venkata Reddy"
          )}
        </Grid>

        <Grid item sm={12} lg={6}>
          {show(
            "Father's Occupation",
            // p?.father_occupation
            "Software Engineer"
          )}
        </Grid>

        <Grid item sm={12} lg={6}>
          {show(
            "Mother's Name",
            // p?.mother_name
            "Lakshmi Devi"
          )}
        </Grid>

        <Grid item sm={12} lg={6}>
          {show(
            "Mother's Occupation",
            // p?.mother_occupation
            "Teacher"
          )}
        </Grid>

        <Grid item xs={12}>
          {show(
            "Marital Status",
            // p?.marital_status
            "Married"
          )}
        </Grid>

        <Grid item sm={12} lg={6}>
          {show(
            "Spouse Name",
            // p?.spouse_name
            "Priya Reddy"
          )}
        </Grid>

        <Grid item sm={12} lg={6}>
          {show(
            "Spouse Occupation",
            // p?.spouse_occupation
            "Doctor"
          )}
        </Grid>

        <Grid item xs={12}>
          {show("Blood Group", "O+ve")}
        </Grid>

        <Grid item sm={12} lg={6}>
          {show(
            "Critical Medical Ailment(s)",
            "Yes (Chronic Anaemia)"
            // p?.is_critical_ailment ? p?.critical_ailment : "No"
          )}
        </Grid>

        {
          // p?.is_critical_ailment
          true && (
            <Grid item sm={12} lg={6}>
              {show(
                "Physician Contact Number",
                // p?.physician_contact_number
                "+911234567890"
              )}
            </Grid>
            // <Grid item sm={12} lg={6}>
            //   <TextField
            //     label="Physician's Contact Number"
            //     fullWidth
            //     type="number"
            //     {...err("physician_number")}
            //     {...register("physician_number", {
            //       maxLength: {
            //         value: 10,
            //         message: "Phone number must be 10 digits",
            //       },
            //       minLength: {
            //         value: 10,
            //         message: "Phone number must be 10 digits",
            //       },
            //     })}
            //   />
            // </Grid>
          )
        }

        <Grid item sm={12} lg={6}>
          {show(
            "Emergency Contact Number",
            // p?.emergency_contact_number
            "+919876543210"
          )}
        </Grid>

        <Grid item sm={12} lg={6}>
          {show(
            "Emergency Contact Name",
            // p?.emergency_contact_name
            "Suresh Kumar"
          )}
        </Grid>

        <Grid item sm={12} lg={6}>
          {show(
            "Emergency Contact Relationship",
            // p?.emergency_contact_relationship
            "Brother"
          )}
        </Grid>

        <Grid
          item
          sm={12}
          lg={6}
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Box>
            {show(
              "ID Proof",
              // p?.id_proof
              "Voter Card"
            )}
          </Box>
          <IconButton>
            <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};
const ExtraCurricularActivities = ({
  candidate,
  register,
  err,
  control,
  watch,
}) => {
  const ncc = watch("ncc");

  return (
    <Box>
      <Typography
        width={"100%"}
        p={1}
        px={2}
        bgcolor={"#E3E0E0"}
        fontWeight={600}
        fontSize={"1rem"}
      >
        Extra Curricular Activities
      </Typography>

      <Grid
        container
        rowSpacing={3}
        columnSpacing={2}
        mt={1}
        alignItems={"center"}
      >
        <Grid item sm={12} lg={6} component={Stack} gap={1.5}>
          {show("Activities/ Sports:", "none")}
        </Grid>

        <Grid item sm={12} lg={6} component={Stack} gap={1.5}>
          {show("Activities/ Sports:", "none")}
        </Grid>

        <Grid item xs={12}>
          {show("Enrolled in National Cadet Corps(NCC)?", "No")}
        </Grid>

        <Grid item sm={12} lg={6} component={Stack} gap={1.5}>
          {show("Hobbies/Interest", "None")}
        </Grid>
      </Grid>
    </Box>
  );
};

interface sectionProp {
  candidate: candidateType | null;
  register: any;
  err: (a: string) => {
    error: boolean;
    helperText: string;
  };
  control?: any;
  watch?: any;
}

const ApplicationDetails = ({ candidate, register, err }: sectionProp) => {
  return (
    <Box>
      <Typography
        width={"100%"}
        p={1}
        px={2}
        bgcolor={"#E3E0E0"}
        fontWeight={600}
        fontSize={"1rem"}
      >
        Application Details
      </Typography>

      <Grid
        container
        rowSpacing={3}
        columnSpacing={2}
        mt={1}
        alignItems={"flex-start"}
      >
        {/* <Grid item xs={4}>
          {show("Applying For", candidate?.application_details.applying_for)}
        </Grid> */}
        <Grid item sm={12} lg={6}>
          {show(
            "Application Date",
            // dayjs(p?.application_date).format("DD MMMM YYYY")
            "25 November 2023"
          )}
        </Grid>

        <Grid item sm={12} lg={6}>
          {show(
            "Job ID",
            // p?.job_id
            "CHN2401"
          )}
        </Grid>

        <Grid item sm={12} lg={6}>
          {show(
            "Employee Type",
            // p?.employee_type
            "Teaching Staff"
          )}
        </Grid>

        <Grid item sm={12} lg={6}>
          {show(
            "Department",
            // p?.department
            "Science"
          )}
        </Grid>

        <Grid item sm={12} lg={6}>
          {show(
            "Grade",
            // p?.grade
            "B2"
          )}
        </Grid>

        <Grid item sm={12} lg={6}>
          {show(
            "Role",
            // p?.role
            "Teaching Staff"
          )}
        </Grid>

        <Grid item sm={12} lg={6}>
          {show(
            "Class Scope",
            // p?.class_scope
            "High School"
          )}
        </Grid>

        <Grid item sm={12} lg={6}>
          {show(
            "Work Location",
            // p?.work_location
            "Kolkata"
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

const AcademicDetails = ({ candidate, register, err }: sectionProp) => {
  return (
    <Box>
      <Typography
        width={"100%"}
        p={1}
        px={2}
        bgcolor={"#E3E0E0"}
        fontWeight={600}
        fontSize={"1rem"}
      >
        Additional Details
      </Typography>

      <Stack mt={2} direction={"row"} alignItems={"center"} gap={2}>
        <Box
          p={1}
          bgcolor={"primary.light"}
          width={"14rem"}
          fontWeight={600}
          sx={{
            clipPath: "polygon(0% 0%, 90% 0, 100% 50%, 90% 100%, 0% 100%)",
          }}
        >
          Qualification
        </Box>
      </Stack>
      <Grid
        container
        rowSpacing={3}
        columnSpacing={2}
        mt={1}
        alignItems={"flex-start"}
      >
        {/* <Grid item xs={4}>
          {show("Father's Name", candidate?.parent_details.father_name)}
        </Grid> */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            {show(
              "Degree",
              // p?.degree
              "Bachelor of Science"
            )}
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            {show(
              "Specialization",
              // p?.specialization
              "Physics"
            )}
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            {show(
              "University",
              // p?.university
              "Calcutta University"
            )}
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            {show(
              "Percentage Secured /CGPA",
              // p?.percentage_or_cgpa
              "84"
            )}
          </Grid>
        </Grid>

        <Grid
          item
          sm={12}
          lg={3}
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Box>
            {show(
              "Degree Certificate",
              // `${p?.employer_name} (${dayjs(p?.employment_start_date).format('D MMM YYYY')} to ${dayjs(p?.employment_end_date).format('D MMM YYYY')})`
              ""
            )}
          </Box>
          <IconButton>
            <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
          </IconButton>
        </Grid>

        <Grid
          item
          sm={12}
          lg={3}
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Box>
            {show(
              "Marksheet",
              // `${p?.employer_name} (${dayjs(p?.employment_start_date).format('D MMM YYYY')} to ${dayjs(p?.employment_end_date).format('D MMM YYYY')})`
              ""
            )}
          </Box>
          <IconButton>
            <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
          </IconButton>
        </Grid>

        <Grid item xs={12}>
          {show(
            "Basic Computer Proficiency",
            // p?.computer_proficiency
            "Programming Language - C"
          )}
        </Grid>

        <Grid item sm={6} lg={12} display="flex" justifyContent="flex-start">
          <Box>
            {show(
              "Marksheet",
              // `${p?.employer_name} (${dayjs(p?.employment_start_date).format('D MMM YYYY')} to ${dayjs(p?.employment_end_date).format('D MMM YYYY')})`
              ""
            )}
          </Box>
          <Grid container spacing={1}>
            <Grid>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
              >
                <Typography>
                  <strong>: English:</strong> Read, Write, Speak
                </Typography>
                <IconButton>
                  <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <strong>Hindi:</strong> Speak
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <strong>Bengali:</strong> Read, Write, Speak
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

// Right side forms

const EmploymentHistoryDetails = ({
  candidate,
  register,
  err,
}: sectionProp) => {
  return (
    <Box>
      <Typography
        width={"100%"}
        p={1}
        px={2}
        bgcolor={"#E3E0E0"}
        fontWeight={600}
        fontSize={"1rem"}
      >
        Employment History
      </Typography>

      <Stack mt={2} direction={"row"} alignItems={"center"} gap={2}>
        <Box
          p={1}
          bgcolor={"primary.light"}
          width={"14rem"}
          fontWeight={600}
          sx={{
            clipPath: "polygon(0% 0%, 90% 0, 100% 50%, 90% 100%, 0% 100%)",
          }}
        >
          Previous Employment
        </Box>
      </Stack>
      <Grid
        container
        rowSpacing={3}
        columnSpacing={2}
        mt={1}
        alignItems={"flex-start"}
      >
        {/* <Grid item xs={4}>
          {show("Father's Name", candidate?.parent_details.father_name)}
        </Grid> */}

        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Box>
            {show(
              "Employer's Name",
              // `${p?.employer_name} (${dayjs(p?.employment_start_date).format('D MMM YYYY')} to ${dayjs(p?.employment_end_date).format('D MMM YYYY')})`
              "Accenture (5 Jan 2022 to 20 Mar 2024)"
            )}
          </Box>
          <IconButton>
            <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
          </IconButton>
        </Grid>

        <Grid
          item
          sm={12}
          lg={6}
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Box>
            {show(
              "Last three Payslips",
              // p?.payslips_uploaded ? "Uploaded" : "Not uploaded"
              ""
            )}
          </Box>
          <Stack direction="row" spacing={1}>
            <IconButton>
              <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
            </IconButton>
          </Stack>
        </Grid>

        <Grid
          item
          sm={12}
          lg={6}
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Box>
            {show(
              "Annual Compensation Letter",
              // p?.compensation_letter_uploaded ? "Uploaded" : "Not uploaded"
              ""
            )}
          </Box>
          <IconButton>
            <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};
const AddressDetails = ({ candidate, register, err }: sectionProp) => {
  return (
    <Box>
      <Typography
        width={"100%"}
        p={1}
        px={2}
        bgcolor={"#E3E0E0"}
        fontWeight={600}
        fontSize={"1rem"}
      >
        Address Details
      </Typography>

      <Box
        p={1}
        mt={2}
        bgcolor={"primary.light"}
        width={"14rem"}
        fontWeight={600}
        sx={{
          clipPath: "polygon(0% 0%, 90% 0, 100% 50%, 90% 100%, 0% 100%)",
        }}
      >
        Permanent Address
      </Box>

      <Grid
        container
        mt={2}
        rowSpacing={3}
        columnSpacing={2}
        alignItems={"flex-start"}
      >
        {/* <Grid item xs={12}>
          {show(
            "Address line 1",
            candidate?.address_details.permanent_address.permanent_address
          )}
        </Grid> */}
        <Grid item xs={12}>
          {show(
            "Address line 1",
            // p?.address_line_1
            "2972 Westheimer Rd. Santa Ana, Illinois 85486"
          )}
        </Grid>

        <Grid item sm={12} lg={6}>
          {show(
            "Country",
            // p?.country
            "India"
          )}
        </Grid>

        <Grid item sm={12} lg={6}>
          {show(
            "State",
            // p?.state
            "West Bengal"
          )}
        </Grid>

        <Grid item sm={12} lg={6}>
          {show(
            "City",
            // p?.city
            "Kolkata"
          )}
        </Grid>

        <Grid item sm={12} lg={6}>
          {show(
            "District",
            // p?.district
            "Hooghly"
          )}
        </Grid>

        <Grid item sm={12} lg={6}>
          {show(
            "Pin Code",
            // p?.pin_code
            "889092"
          )}
        </Grid>

        <Grid
          item
          sm={12}
          lg={6}
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Box>
            {show(
              "Address Proof",
              // p?.address_proof_type
              "Utility Bill"
            )}
          </Box>
          <IconButton>
            <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
          </IconButton>
        </Grid>
      </Grid>
      <Box
        p={1}
        mt={2}
        bgcolor={"primary.light"}
        width={"14rem"}
        fontWeight={600}
        sx={{
          clipPath: "polygon(0% 0%, 90% 0, 100% 50%, 90% 100%, 0% 100%)",
        }}
      >
        Current Address
      </Box>
      <Grid
        container
        mt={2}
        rowSpacing={3}
        columnSpacing={2}
        alignItems={"flex-start"}
      >
        <Grid item xs={12}>
          {show(
            "Address line 1",
            // p?.address_line_1
            "2972 Westheimer Rd. Santa Ana, Illinois 85486"
          )}
        </Grid>

        <Grid item sm={12} lg={6}>
          {show(
            "Country",
            // p?.country
            "India"
          )}
        </Grid>

        <Grid item sm={12} lg={6}>
          {show(
            "State",
            // p?.state
            "West Bengal"
          )}
        </Grid>

        <Grid item sm={12} lg={6}>
          {show(
            "City",
            // p?.city
            "Kolkata"
          )}
        </Grid>

        <Grid item sm={12} lg={6}>
          {show(
            "District",
            // p?.district
            "Hooghly"
          )}
        </Grid>

        <Grid item sm={12} lg={6}>
          {show(
            "Pin Code",
            // p?.pin_code
            "889092"
          )}
        </Grid>

        <Grid
          item
          sm={12}
          lg={6}
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Box>
            {show(
              "Address Proof",
              // p?.address_proof_type
              "Utility Bill"
            )}
          </Box>
          <IconButton>
            <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};
// const FeeDetails = ({
//   candidate,
//   register,
//   err,
//   control,
//   watch,
// }: sectionProp) => {
//   const type = watch("payment_type");

//   useEffect(() => {
//     console.log(type);
//   }, [type]);
//   return (
//     <Box>
//       <Typography
//         width={"100%"}
//         p={1}
//         px={2}
//         bgcolor={"#E3E0E0"}
//         fontWeight={600}
//         fontSize={"1rem"}
//       >
//         Fee Payment Details
//       </Typography>

//       <Grid
//         container
//         mt={1}
//         rowSpacing={2}
//         columnSpacing={2}
//         alignItems={"flex-start"}
//       >
//         <Grid item xs={12}>
//           {show("Amount to be paid", "20,000")}
//         </Grid>

//         <Grid item xs={4}>
//           <Controller
//             control={control}
//             name="payment_mode"
//             rules={{
//               required: "payment mode is required!",
//             }}
//             render={({ field }) => (
//               <ReignsSelect
//                 items={["Online", "Offline"]}
//                 label="Payment Mode"
//                 onChange={field.onChange}
//                 full
//                 {...err("payment_mode")}
//               />
//             )}
//           />
//         </Grid>
//         <Grid item xs={4}>
//           <Controller
//             control={control}
//             name="payment_type"
//             rules={{
//               required: "Payment Type is required",
//             }}
//             render={({ field }) => (
//               <TextField
//                 select
//                 fullWidth
//                 label="Payment Type"
//                 {...err("payment_type")}
//                 {...field}
//               >
//                 {["Challan No", "Reciept No", "Cheque No", "Demand Draft"].map(
//                   (name, idx) => (
//                     <MenuItem key={idx} value={name}>
//                       {name}
//                     </MenuItem>
//                   )
//                 )}
//               </TextField>
//             )}
//           />
//         </Grid>
//         <Grid item xs={4}>
//           <TextField label={type ?? "Challan No"} />
//         </Grid>

//         <Grid item xs={12}>
//           <Stack direction={"row"} spacing={2} alignItems={"center"}>
//             <Typography>Payment Proof</Typography>
//             <Stack>
//               <Button variant="contained" size="small" component="label">
//                 Upload Payment Proof
//                 <input
//                   type="file"
//                   multiple={false}
//                   hidden
//                   {...register("payment_proof", {
//                     required: "Payment Proof is required",
//                   })}
//                 />
//               </Button>
//               <Typography color={"error"} variant="caption" mt={0.3}>
//                 {err("payment_proof")?.helperText}
//               </Typography>
//             </Stack>
//           </Stack>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

export default OnboardingDetails;
