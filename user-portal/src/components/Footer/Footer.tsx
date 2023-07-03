import React from "react";
import { Box, Typography } from "@mui/material";
import { MDBBtn } from "mdb-react-ui-kit";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f5f5f5",
        padding: "16px",
        marginTop: "auto"
      }}
    >
      <MDBBtn
        floating
        className="m-1"
        style={{ backgroundColor: "#55acee" }}
        href="#!"
        role="button"
      >
        {/* <MDBIcon fab icon='twitter' /> */}
      </MDBBtn>
      <Typography variant="body2" align="center" color="textSecondary">
        © {new Date().getFullYear()} User Management Portal. All rights
        reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
