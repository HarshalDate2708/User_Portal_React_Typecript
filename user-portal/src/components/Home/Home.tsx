import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  TextField,
  Table,
  TableSortLabel,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  createTheme,
  InputAdornment,
  IconButton,
  TablePagination
} from "@mui/material";
import { UserContext, UserContextValue } from "../../context/UserContext";
import { User } from "../../interfaces/interface";
import wretch from "wretch";
import "./Home.css";
import { ThemeProvider } from "@emotion/react";
import { FilterList } from "@mui/icons-material";
import { apiUrl } from "../../constants/api-urls";

export default function Home() {
  const { users, setUserList } = useContext<UserContextValue>(UserContext);
  const [filter, setFilter] = React.useState("");
  const [sortColumn, setSortColumn] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const toggleFilter = () => {
    setIsFilterActive(!isFilterActive);
  };

  const filteredUsers = users
    .filter((user: User) =>
      user.name.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a: User, b: User) => {
      const aValue = a[sortColumn as keyof User];
      const bValue = b[sortColumn as keyof User];

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await wretch(apiUrl.getUsersList).get().json();
        setUserList(response as User[]);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [users, setUserList]);

  const theme = createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          head: {
            backgroundColor: "lightgrey",
            color: "black",
            fontWeight: 800,
            alignContent: "center"
          }
        }
      }
    }
  });

  return (
    <div className="container">
      <TextField
        label="Search by Name"
        variant="outlined"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={toggleFilter}>
                <FilterList color={isFilterActive ? "primary" : "inherit"} />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <ThemeProvider theme={theme}>
        <TableContainer className="table">
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>
                  Name
                  <TableSortLabel
                    active={sortColumn === "name"}
                    direction={sortColumn === "name" ? sortOrder : "asc"}
                    onClick={() => handleSort("name")}
                  />
                </TableCell>
                <TableCell>
                  Email
                  <TableSortLabel
                    active={sortColumn === "email"}
                    direction={sortColumn === "email" ? sortOrder : "asc"}
                    onClick={() => handleSort("email")}
                  />
                </TableCell>
                <TableCell>
                  Phone
                  <TableSortLabel
                    active={sortColumn === "phone"}
                    direction={sortColumn === "phone" ? sortOrder : "asc"}
                    onClick={() => handleSort("phone")}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user: User) => (
                  <TableRow key={user.id}>
                    <TableCell component="th" scope="row">
                      <Link to={`/user/${user.id}`}>{user.name}</Link>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[2, 5, 10]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </ThemeProvider>
    </div>
  );
}
