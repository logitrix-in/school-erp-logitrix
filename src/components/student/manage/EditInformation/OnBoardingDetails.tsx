import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, ChangeEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../../../config/api";
import { Controller, RegisterOptions, useForm } from "react-hook-form";
// import { candidateType } from "../utils/candidateType";
import dayjs from "dayjs";
import ReignsSelect from "../../../UiComponents/ReignsSelect";
import { Icon } from "@iconify/react";
import { candidateType } from "../../../../utils/candidateType";
import { Info } from "@material-ui/icons";

const OnboardingDetails = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [candidate, setCandidate] = useState<candidateType | null>(null);
  const [image, setImage] = useState<string | null>(null);

  // api call
  useEffect(() => {
    api
      .get("/admission/application/search-by-id/", {
        params: {
          id: searchParams.get("appid"),
        },
      })
      .then((res) => {
        setCandidate(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err.response.data));
  }, []);

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
          Student Information
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
          <Button
            variant="contained"
            onClick={() => navigate("/student/manage/OnBoardingEdit")}
            sx={{
              cursor: "pointer",
              color: "#3B98C4",
              fontWeight: "bold",

              backgroundColor: "white",
            }}
          >
            Edit
          </Button>
          <Icon
            onClick={() => navigate("/student/manage/edit-information")}
            icon="fa:close"
            fontSize={"1.2rem"}
            color="inherit"
          />
        </Box>
      </Box>

      <Box p={2}>
        <form onSubmit={handleSubmit(submit)}>
          <Stack alignItems={"center"} p={3} position="relative">
            {/* profile image */}
            <img
              src={image || candidate?.candidate_details.profile_photo}
              height={"130px"}
              style={{
                objectFit: "cover",
              }}
            />

            {/* student id */}
            <Typography mt={2} fontWeight={600} fontSize={"1rem"}>
              Student ID : {candidate?.application_id}
            </Typography>
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <Stack flex={1} spacing={2}>
              <PersonalDetails
                candidate={candidate}
                register={register}
                err={err}
                control={control}
                watch={watch}
              />
              <ExtraCurricularActivities
                watch={watch}
                candidate={candidate}
                register={register}
                err={err}
                control={control}
              />
              <ApplicationDetails
                candidate={candidate}
                register={register}
                err={err}
              />
              <AdditionalDetails
                candidate={candidate}
                register={register}
                err={err}
              />
            </Stack>
            <Stack flex={1} spacing={2}>
              <ParentGuardianDetails
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
          <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
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
        <Grid item xs={12}>
          {show(
            "Candidate's Name",
            `${p?.first_name} ${p?.middle_name ?? ""} ${p?.last_name}`
          )}
        </Grid>
        <Grid item sm={12} lg={6}>
          {show("Contact Number", p?.contact_number)}
        </Grid>
        <Grid item sm={12} lg={6}>
          {show("Email ID", p?.email, undefined, false)}
        </Grid>
        <Grid item sm={12} lg={6}>
          {show("Nationility", p?.nationality)}
        </Grid>

        <Grid item sm={12} lg={6}>
          {show("Religion", p?.religion)}
        </Grid>

        <Grid item sm={12} lg={6}>
          {show("Date of Birth", dayjs(p?.dob).format("DD MMM YYYY"))}
        </Grid>

        <Grid
          item
          sm={12}
          lg={6}
          display={"flex"}
          gap={2}
          alignItems={"center"}
        >
          {show("Category", p?.category)}
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

        <Grid item sm={12} lg={6}>
          {show("Gender", p?.gender)}
        </Grid>

        <Grid item sm={12} lg={6}>
          {show("Blood Group", "O+ve")}
        </Grid>

        <Grid item sm={12} lg={6}>
          {show(
            "Critical Medical Ailment(s)",
            p?.is_critical_ailment ? p?.critical_ailment : "No"
          )}
        </Grid>

        {p?.is_critical_ailment && (
          <Grid item sm={12} lg={6}>
            <TextField
              label="Physician's Contact Number"
              fullWidth
              type="number"
              {...err("physician_number")}
              {...register("physician_number", {
                maxLength: {
                  value: 10,
                  message: "Phone number must be 10 digits",
                },
                minLength: {
                  value: 10,
                  message: "Phone number must be 10 digits",
                },
              })}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <Stack direction={"row"} spacing={2} alignItems={"flex-start"}>
            <Typography>Transfer / Migration Documents : </Typography>
            <Stack direction={"row"} spacing={1}>
              <IconButton>
                <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
              </IconButton>
              <Tooltip title="Download Migration Certificate">
                <Typography color={"error"} variant="caption" mt={0.3}>
                  {err("transfer_certificate")?.helperText}
                </Typography>
              </Tooltip>

              {/* download icon */}
              {/* <IconButton>
                  <Icon icon={"ic:round-download"} fontSize={"1.4rem"} style={{position: "absolute"}}/>
                </IconButton> */}
            </Stack>
            <Tooltip title="Download Transfer Certificate">
              <IconButton>
                <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
              </IconButton>
            </Tooltip>
            {/* download icon */}
          </Stack>
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
        <Grid item xs={4}>
          {show("Applying For", candidate?.application_details.applying_for)}
        </Grid>
        <Grid item xs={4}>
          {show("Current Class", candidate?.application_details.current_class)}
        </Grid>
        <Grid item xs={4}>
          {show(
            "Admission Year",
            candidate?.application_details.admission_year
          )}
        </Grid>
        <Grid item xs={12}>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            {show(
              "Marks secured in the final examination of previous class (%)",
              candidate?.application_details?.percentage_secured + "%"
            )}

            <Stack>
              {/* upload marksheet button */}
              <Typography color={"error"} variant="caption" mt={0.3}>
                {err("marks_sheet")?.helperText}
              </Typography>
            </Stack>

            {/* download icon */}
            <Tooltip title="Download Marksheets">
              <IconButton>
                <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
              </IconButton>
            </Tooltip>

            {/* info icon */}
            <Tooltip title="Upload all the marksheets / report cards / progress reports of the previous class in a single file">
              <IconButton>
                <Info />
              </IconButton>
            </Tooltip>
          </Stack>
        </Grid>

        <Grid item sm={12} lg={6} component={Stack} gap={1.5}>
          {show("School Name", "ABC School")}
        </Grid>

        <Grid item sm={12} lg={6} component={Stack} gap={1.5}>
          {show("School Address", "XYZ Nagar")}
        </Grid>

        <Grid item xs={12}>
          {show("Board Name", "CBSE")}
        </Grid>

        <Grid item xs={12}>
          {show("Medium", "English")}
        </Grid>
      </Grid>
    </Box>
  );
};

const AdditionalDetails = ({ candidate, register, err }: sectionProp) => {
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
      <Grid
        container
        rowSpacing={3}
        columnSpacing={2}
        mt={1}
        alignItems={"flex-start"}
      >
        <Grid item xs={12}>
          <Typography width={"100%"} fontWeight={600} fontSize={"1rem"}>
            Relatives studied/ currently studying in Demo School:
          </Typography>
        </Grid>
        {candidate?.additional_details.q1_name != "" && (
          <>
            <Grid item xs={4}>
              {show("Relative's Name", candidate?.additional_details.q1_name)}
            </Grid>
            <Grid item xs={4}>
              {show("Passing Year", candidate?.additional_details.q1_year)}
            </Grid>
            <Grid item xs={4}>
              {show(
                "Relationship Type",
                candidate?.additional_details.q1_relationship
              )}
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Typography width={"100%"} fontWeight={600} fontSize={"1rem"}>
            Relatives worked/ currently working in Demo School:
          </Typography>
        </Grid>

        {candidate?.additional_details.q2_name != "" && (
          <>
            <Grid item xs={4}>
              {show("Relative's Name", candidate?.additional_details.q2_name)}
            </Grid>
            <Grid item xs={4}>
              {show("Department", candidate?.additional_details.q2_department)}
            </Grid>
            <Grid item xs={4}>
              {show(
                "Relationship Type",
                candidate?.additional_details.q2_relationship
              )}
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

// Right side forms

const ParentGuardianDetails = ({ candidate, register, err }: sectionProp) => {
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
        Parent/Guardian Details
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
          Father's Details
        </Box>
        {candidate?.primary_contact == "Father" && (
          <Box
            borderRadius={0.4}
            bgcolor={"red"}
            px={0.8}
            color={"white"}
            fontSize={"0.8rem"}
          >
            Primary Contact
          </Box>
        )}
      </Stack>
      <Grid
        container
        rowSpacing={3}
        columnSpacing={2}
        mt={1}
        alignItems={"flex-start"}
      >
        <Grid item xs={4}>
          {show("Father's Name", candidate?.parent_details.father_name)}
        </Grid>
        <Grid item xs={4}>
          {show("Occupation", candidate?.parent_details.father_occupation)}
        </Grid>
        <Grid item xs={4}>
          {show(
            "Annual Income",
            candidate?.parent_details.father_annual_income
          )}
        </Grid>
        <Grid item xs={4}>
          {show(
            "Contact Number",
            candidate?.parent_details.father_contact_number
          )}
        </Grid>
        <Grid item xs={4}>
          {show(
            "Email ID",
            candidate?.parent_details.father_email,
            undefined,
            false
          )}
        </Grid>

        <Grid item xs={12}>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Typography>ID Proof : </Typography>

            <Stack direction="row" spacing={1} alignItems="center">
              <Tooltip title="Download Father's ID Proof">
                <IconButton>
                  <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
                </IconButton>
              </Tooltip>
              <Typography color={"error"} variant="caption" mt={0.3}>
                {err("father_id_proof")?.helperText}
              </Typography>

              {/* download icon */}
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      <Stack mt={4} direction={"row"} alignItems={"center"} gap={2}>
        <Box
          p={1}
          bgcolor={"primary.light"}
          width={"14rem"}
          fontWeight={600}
          sx={{
            clipPath: "polygon(0% 0%, 90% 0, 100% 50%, 90% 100%, 0% 100%)",
          }}
        >
          Mother's Details
        </Box>
        {candidate?.primary_contact == "Mother" && (
          <Box
            borderRadius={0.4}
            bgcolor={"red"}
            px={0.8}
            color={"white"}
            fontSize={"0.8rem"}
          >
            Primary Contact
          </Box>
        )}
      </Stack>
      <Grid
        container
        rowSpacing={3}
        columnSpacing={2}
        mt={1}
        alignItems={"flex-start"}
      >
        <Grid item xs={4}>
          {show("Father's Name", candidate?.parent_details.mother_name)}
        </Grid>
        <Grid item xs={4}>
          {show("Occupation", candidate?.parent_details.mother_occupation)}
        </Grid>
        <Grid item xs={4}>
          {show(
            "Annual Income",
            candidate?.parent_details.mother_annual_income
          )}
        </Grid>
        <Grid item xs={4}>
          {show(
            "Contact Number",
            candidate?.parent_details.mother_contact_number
          )}
        </Grid>
        <Grid item xs={4}>
          {show(
            "Email ID",
            candidate?.parent_details.mother_email,
            undefined,
            false
          )}
        </Grid>

        <Grid item xs={12}>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Typography>ID Proof : </Typography>

            <Stack direction="row" spacing={1} alignItems="center">
              <Tooltip title="Download Mother's ID Proof">
                <IconButton>
                  <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
                </IconButton>
              </Tooltip>
              <Typography color={"error"} variant="caption" mt={0.3}>
                {err("mother_id_proof")?.helperText}
              </Typography>

              {/* download icon */}
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      <Stack mt={4} direction={"row"} alignItems={"center"} gap={2}>
        <Box
          p={1}
          bgcolor={"primary.light"}
          width={"14rem"}
          fontWeight={600}
          sx={{
            clipPath: "polygon(0% 0%, 90% 0, 100% 50%, 90% 100%, 0% 100%)",
          }}
        >
          Guardian's Details
        </Box>
        {candidate?.primary_contact == "Guardian" && (
          <Box
            borderRadius={0.4}
            bgcolor={"red"}
            px={0.8}
            color={"white"}
            fontSize={"0.8rem"}
          >
            Primary Contact
          </Box>
        )}
      </Stack>
      <Grid
        container
        rowSpacing={3}
        columnSpacing={2}
        mt={1}
        alignItems={"flex-start"}
      >
        <Grid item xs={4}>
          {show(
            "Guardian's Name",
            candidate?.parent_details.guardian_name ?? "N / A"
          )}
        </Grid>
        <Grid item xs={4}>
          {show(
            "Occupation",
            candidate?.parent_details.guardian_occupation ?? "N / A"
          )}
        </Grid>
        <Grid item xs={4}>
          {show(
            "Annual Income",
            candidate?.parent_details.guardian_annual_income ?? "N / A"
          )}
        </Grid>
        <Grid item xs={4}>
          {show(
            "Contact Number",
            candidate?.parent_details.guardian_contact_number ?? "N / A"
          )}
        </Grid>
        <Grid item xs={4}>
          {show(
            "Email ID",
            candidate?.parent_details.guardian_email ?? "N / A",
            undefined,
            false
          )}
        </Grid>
        <Grid item xs={4}>
          {show(
            "Relationship Type",
            candidate?.parent_details.guardian_relation ?? "N / A"
          )}
        </Grid>

        <Grid item xs={12}>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Typography>ID Proof : </Typography>

            <Tooltip
              placement="right"
              title={
                candidate?.parent_details.guardian_relation == "N / A"
                  ? "No supporting document(s) required."
                  : null
              }
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Tooltip title="Download Guardian's ID Proof">
                  <IconButton>
                    <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
                  </IconButton>
                </Tooltip>
                <Typography color={"error"} variant="caption" mt={0.3}>
                  {err("guardian_id_proof")?.helperText}
                </Typography>

                {/* download icon */}
              </Stack>
            </Tooltip>
          </Stack>
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
        <Grid item xs={12}>
          {show(
            "Address line 1",
            candidate?.address_details.permanent_address.permanent_address
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          {show(
            "Country",
            candidate?.address_details.permanent_address.country
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          {show("State", candidate?.address_details.permanent_address.states)}
        </Grid>
        <Grid item xs={12} md={4}>
          {show("City", candidate?.address_details.permanent_address.cities)}
        </Grid>
        <Grid item xs={12} md={4}>
          {show(
            "District",
            candidate?.address_details.permanent_address.district
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          {show(
            "Pin Code",
            candidate?.address_details.permanent_address.pin_code
          )}
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
            candidate?.address_details.current_address.current_address
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          {show("Country", candidate?.address_details.current_address.country)}
        </Grid>
        <Grid item xs={12} md={6}>
          {show("State", candidate?.address_details.current_address.states)}
        </Grid>
        <Grid item xs={12} md={4}>
          {show("City", candidate?.address_details.current_address.cities)}
        </Grid>
        <Grid item xs={12} md={4}>
          {show(
            "District",
            candidate?.address_details.current_address.district
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          {show(
            "Pin Code",
            candidate?.address_details.current_address.pin_code
          )}
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
