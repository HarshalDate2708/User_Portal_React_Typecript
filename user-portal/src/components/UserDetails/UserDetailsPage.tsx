import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { User } from "../../interfaces/interface";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function UserDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { users } = useContext(UserContext);
  const user = users.find((user: User) => user.id === Number(id));

  if (!user) {
    return <div>User is not found</div>;
  }
  return (
    <div>
      <Card
        className="detailsBox"
        sx={{
          boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.3)",
          width: "60%",
          background: "gainsboro",
          ml: "auto",
          mr: "auto"
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={{
              mb: 2,
              textAlign: "center",
              fontWeight: 800,
              fontSize: "30px",
              fontFamily: "arial"
            }}
          >
            {user.name}
          </Typography>
          <hr />
          <Typography variant="body1" sx={{ mb: 1 }}>
            <b>Username:</b> {user.username}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <b>Email:</b> {user.email}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <b>Phone:</b> {user.phone}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <b>Website:</b> {user.website}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <b>Address:</b> {user.address.street}, {user.address.suite},{" "}
            {user.address.city}, {user.address.zipcode}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <b>Company:</b> {user.company.name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <b>Catch Phrase:</b> {user.company.catchPhrase}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <b>Business:</b> {user.company.bs}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserDetailsPage;
