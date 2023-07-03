import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import UserDeatilsPage from "./components/UserDetails/UserDetailsPage";
import { Box } from "@mui/material";
import UserProvider from "./context/UserContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div className="App">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh"
                  }}
                >
                  <Header />
                  <Box sx={{ mt: "15vh" }}>
                    <Home />
                  </Box>
                  <Footer />
                </Box>
              </div>
            }
          />
          <Route
            path="/user/:id"
            element={
              <div className="App">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh"
                  }}
                >
                  <Header />
                  <Box sx={{ mt: "15vh" }}>
                    <UserDeatilsPage />
                  </Box>
                  <Footer />
                </Box>
              </div>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
