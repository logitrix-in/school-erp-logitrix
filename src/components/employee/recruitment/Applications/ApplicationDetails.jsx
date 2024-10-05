import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
} from "@mui/material";

const InfoItem = ({ label, value }) => (
    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mr={4}>
        <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>{label}:</Typography>
        <Typography variant="body1">{value}</Typography>
    </Box>
);

const ApplicationDetails = () => {
    const [basicInfo, setBasicInfo] = useState({
        applicantName: "Suren Patra",
        contactNumber: "9674965842",
        emailId: "Sneha0046@gmail.com",
        nationality: "Indian",
        religion: "Hinduism",
        category: "General",
        maritalStatus: "Unmarried",
        dateOfBirth: "15 Jun 1990",
        gender: "Female",
        criticalMedicalAilment: "No"
    });

    const [appliedFor, setAppliedFor] = useState({
        jobId: "CNTY0956",
        employeeType: "Teaching Staff",
        department: "Science",
        role: "Teaching",
        classScope: "High School",
        preferredWorkLocation: "Kolkata"
    });

    const [qualification, setQualification] = useState({
        degrees: [
            { degree: "B.Sc", specialization: "Chemistry", university: "Calcutta University", percentageOrCGPA: "8" },
            { degree: "M.Sc", specialization: "Chemistry", university: "Calcutta University", percentageOrCGPA: "8" },
            { degree: "B.Ed", specialization: "Chemistry", university: "Calcutta University", percentageOrCGPA: "8" },
        ],
        languageProficiency: "English - Advanced (Read, Write, Speak)\nHindi - Basic (Speak)\nBengali - Native (Read, Write, Speak)",
        computerProficiency: "Microsoft Suite"
    });

    const [address, setAddress] = useState({
        permanent: {
            address: "95, Mahavir Park, Kapur Chowk, Ward No. 91, Khosla, Shimla, Himachal Pradesh",
            country: "India",
            state: "West Bengal",
            city: "Kolkata",
            district: "Kolkata",
            pincode: "700137"
        },
        current: {
            address: "95, Mahavir Park, Kapur Chowk, Ward No. 91, Khosla, Shimla, Himachal Pradesh",
            country: "India",
            state: "West Bengal",
            city: "Kolkata",
            district: "Kolkata",
            pincode: "700137"
        }
    });

    const [additionalInfo, setAdditionalInfo] = useState({
        relativeStudying: {
            hasRelative: "Yes",
            name: "Bina Dutta",
            studentId: "STU056743",
            relationshipType: "Niece"
        },
        relativeWorking: {
            hasRelative: "Yes",
            name: "Tina Dutta",
            employeeId: "EMP056743",
            relationshipType: "Aunt"
        },
        hearAboutUs: "From Relative",
        referrer: {
            name: "Tina Dutta",
            employeeId: "EMP056743",
            relationshipType: "Aunt"
        },
        employmentHistory: {
            relevantExperience: "7",
            totalExperience: "10",
            previousEmployment: {
                employerName: "ABC Demo School",
                positionTitle: "Teacher",
                medium: "Lorem Ipsum",
                subjectsTaught: "Chemistry",
                board: "CBSE",
                employmentPeriod: "10 Jun 2024 - 20 Aug 2024"
            }
        }
    });

    return (
        <Box sx={{ m: 2 }}>
            <Paper elevation={3} >
                <Box sx={{ p: 2, mb: 2 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            bgcolor: "#E3E0E0",
                            p: 1,
                            mb: 2,
                            fontWeight: 600,
                            borderRadius: 1,
                        }}
                    >
                        Basic Information
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <InfoItem label="Applicant Name" value={basicInfo.applicantName} />
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="Contact Number" value={basicInfo.contactNumber} />
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="Email ID" value={basicInfo.emailId} />
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="Nationality" value={basicInfo.nationality} />
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="Religion" value={basicInfo.religion} />
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="Category" value={basicInfo.category} />
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="Marital Status" value={basicInfo.maritalStatus} />
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="Date of Birth" value={basicInfo.dateOfBirth} />
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="Gender" value={basicInfo.gender} />
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="Critical Medical Ailment" value={basicInfo.criticalMedicalAilment} />
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ p: 2, mb: 2 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            bgcolor: "#E3E0E0",
                            p: 1,
                            mb: 2,
                            fontWeight: 600,
                            borderRadius: 1,
                        }}
                    >
                        Applied For
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <InfoItem label="Job ID" value={appliedFor.jobId} />
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="Employee Type" value={appliedFor.employeeType} />
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="Department" value={appliedFor.department} />
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="Role" value={appliedFor.role} />
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="Class Scope" value={appliedFor.classScope} />
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="Preferred Work Location" value={appliedFor.preferredWorkLocation} />
                        </Grid>
                    </Grid>
                </Box>


                <Box sx={{ p: 2, mb: 2 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            bgcolor: "#E3E0E0",
                            p: 1,
                            mb: 2,
                            fontWeight: 600,
                            borderRadius: 1,
                        }}
                    >
                        Qualification
                    </Typography>
                    <Grid container spacing={3}>
                        {qualification.degrees.map((deg, index) => (
                            <React.Fragment key={index}>
                                <Grid item xs={3}>
                                    <InfoItem label="Degree" value={deg.degree} />
                                </Grid>
                                <Grid item xs={3}>
                                    <InfoItem label="Specialization" value={deg.specialization} />
                                </Grid>
                                <Grid item xs={3}>
                                    <InfoItem label="University" value={deg.university} />
                                </Grid>
                                <Grid item xs={3}>
                                    <InfoItem label="Percentage Secured/CGPA" value={deg.percentageOrCGPA} />
                                </Grid>
                            </React.Fragment>
                        ))}
                        <Grid item xs={6}>
                            <InfoItem
                                label="Language Proficiency"
                                value={
                                    <Typography style={{ whiteSpace: 'pre-wrap' }}>
                                        {qualification.languageProficiency}
                                    </Typography>
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InfoItem label="Basic Computer Proficiency" value={qualification.computerProficiency} />
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ p: 2, mb: 2 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            bgcolor: "#E3E0E0",
                            p: 1,
                            mb: 2,
                            fontWeight: 600,
                            borderRadius: 1,
                        }}
                    >
                        Permanent Address
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={8}>
                            <InfoItem label="Address" value={address.permanent.address} />
                        </Grid>
                        <Grid item xs={4}>
                            <InfoItem label="Country" value={address.permanent.country} />
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="State" value={address.permanent.state} />
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="City" value={address.permanent.city} />
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="District" value={address.permanent.district} />
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="Pincode" value={address.permanent.pincode} />
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ p: 2, mb: 2 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            bgcolor: "#E3E0E0",
                            p: 1,
                            mb: 2,
                            fontWeight: 600,
                            borderRadius: 1,
                        }}
                    >
                        Current Address
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={8}>
                            <InfoItem label="Address" value={address.permanent.address} />
                        </Grid>
                        <Grid item xs={4}>
                            <InfoItem label="Country" value={address.permanent.country} />
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="State" value={address.permanent.state} />
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="City" value={address.permanent.city} />
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="District" value={address.permanent.district} />
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="Pincode" value={address.permanent.pincode} />
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ p: 2, mb: 2 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            bgcolor: "#E3E0E0",
                            p: 1,
                            mb: 2,
                            fontWeight: 600,
                            borderRadius: 1,
                        }}
                    >
                        Additional Information
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <InfoItem
                                label="Has any of your relative(s) studied/currently been studying in Demo School?"
                                value={additionalInfo.relativeStudying.hasRelative}
                            />
                        </Grid>
                        <Grid item xs={6}>
                        </Grid>

                        <Grid item xs={3}>
                            <InfoItem label="Name" value={additionalInfo.relativeStudying.name} />
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="Student ID" value={additionalInfo.relativeStudying.studentId} />
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="Relationship Type" value={additionalInfo.relativeStudying.relationshipType} />
                        </Grid>

                        <Grid item xs={6}>
                            <InfoItem
                                label="Has any of your relative(s) worked/currently been working in Demo School?"
                                value={additionalInfo.relativeWorking.hasRelative}
                            />
                        </Grid>
                        <Grid item xs={6}>
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="Name" value={additionalInfo.relativeWorking.name} />
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="Employee ID" value={additionalInfo.relativeWorking.employeeId} />
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="Relationship Type" value={additionalInfo.relativeWorking.relationshipType} />
                        </Grid>

                        <Grid item xs={4}>
                            <InfoItem label="Where did you hear about us?" value={additionalInfo.hearAboutUs} />
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ p: 2, mb: 2 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            bgcolor: "#E3E0E0",
                            p: 1,
                            mb: 2,
                            fontWeight: 600,
                            borderRadius: 1,
                        }}
                    >
                        Referrer Name
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <InfoItem label="Name" value={additionalInfo.referrer.name} />
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="Employee ID" value={additionalInfo.referrer.employeeId} />
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="Relationship Type" value={additionalInfo.referrer.relationshipType} />
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ p: 2, mb: 2 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            bgcolor: "#E3E0E0",
                            p: 1,
                            mb: 2,
                            fontWeight: 600,
                            borderRadius: 1,
                        }}
                    >
                        Employment History
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Experience</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <InfoItem label="Year(s) of Relevant Experience" value={additionalInfo.employmentHistory.relevantExperience} />
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="Year(s) of Total Experience" value={additionalInfo.employmentHistory.totalExperience} />
                        </Grid>
                    </Grid>
                    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Previous Employment</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <InfoItem label="Employer Name" value={additionalInfo.employmentHistory.previousEmployment.employerName} />
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="Position Title" value={additionalInfo.employmentHistory.previousEmployment.positionTitle} />
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="Medium" value={additionalInfo.employmentHistory.previousEmployment.medium} />
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="Subject(s) Taught" value={additionalInfo.employmentHistory.previousEmployment.subjectsTaught} />
                        </Grid>
                        <Grid item xs={3}>
                            <InfoItem label="Board" value={additionalInfo.employmentHistory.previousEmployment.board} />
                        </Grid>
                        <Grid item xs={6}>
                            <InfoItem label="Employment Period" value={additionalInfo.employmentHistory.previousEmployment.employmentPeriod} />
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
};

export default ApplicationDetails;