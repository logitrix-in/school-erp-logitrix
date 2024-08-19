import React from "react";
import {
    Box,
    Dialog,
    Divider,
    IconButton,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Approve = ({ open, close }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Dialog
            fullWidth
            PaperProps={{
                sx: {
                    maxHeight: "100%",
                },
            }}
            maxWidth="lg"
            open={open}
            onClose={() => close()}
            disableEnforceFocus={true}
        >
            <Box overflow={"hidden"}>
                <Box
                    p={1}
                    py={1}
                    bgcolor={"primary.main"}
                    color={"white"}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Box />
                    <Typography fontSize={"1.1rem"} textAlign={"center"}>
                        Approve Claim
                    </Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={close}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                <div className="modal-body">
                    <div className="employee-info">
                        <div className="info-row">
                            <div className="info-item">
                                <span className="label">Employee Name:</span>
                                <span className="value">Priya Naskar</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Employee ID:</span>
                                <span className="value">AUG202456</span>
                            </div>
                        </div>
                        <div className="info-row">
                            <div className="info-item">
                                <span className="label">Department:</span>
                                <span className="value">Physics</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Grade:</span>
                                <span className="value">B2</span>
                            </div>
                        </div>
                        <div className="info-row">
                            <div className="info-item">
                                <span className="label">Claim Request Type:</span>
                                <span className="value">Travel Expense</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Claim Amount:</span>
                                <span className="value">₹10,000</span>
                            </div>
                        </div>
                    </div>
                    <p>Are you sure you want to approve the claim(s)?</p>
                    <div className="comments-section">
                        <label htmlFor="comments">Reason / Comments</label>
                        <textarea
                            id="comments"
                            // value={comments}
                            // onChange={(e) => setComments(e.target.value)}
                            placeholder="Use this field to record any additional information which could be considered for the subsequent steps."
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="submit-button">Submit</button>
                </div>

                <Box>

                </Box>
            </Box>
        </Dialog>
    );
};

export default Approve;
