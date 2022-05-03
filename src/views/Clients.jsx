import axios from "axios";
import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  TextField,
} from "@mui/material";
import CreateClientDialog from "../components/content/CreateClientDialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import CustomtToaster from "../components/content/CustomtToaster";
import { useDispatch } from "react-redux";
import { toggleLoader } from "../redux/reducers/commonSlice";

const Clients = () => {
  const dispatch = useDispatch();

  // State variables
  const [search, setSearch] = useState("");
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [client, setClient] = useState({});
  const [open, setOpen] = useState(false);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Balance",
      selector: (row) => row.balance,
      sortable: true,
    },
    {
      name: "Profile",
      selector: (row) => <img width={50} height={50} src={row.profileURL} />,
    },
    {
      name: "Actions",
      selector: (row) => (
        <>
          <IconButton
            color="primary"
            variant="contained"
            onClick={() => editClient(row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            variant="contained"
            style={{ marginLeft: "10px" }}
            onClick={() => deleteClient(row)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const editClient = async (row) => {
    setClient(row);
    setOpen(true);
  };

  const manipulateLocalRecord = (arr, finder, type, updatedClient) => {
    const index = arr.findIndex((item) => item._id === finder);

    const copy = [...arr];
    if (type === "delete") copy.splice(index, 1);
    if (type === "update") copy[index] = updatedClient;
    if (type === "insert") copy.unshift(finder);

    return copy;
  };

  // Delete client after getting confirmation from user
  const deleteClient = async (row) => {
    if (window.confirm("Are you sure you want to delete?")) {
      if (row.isAdmin) {
        toast.error(`Can't delete admin account`);
        return;
      }
      dispatch(toggleLoader(true));
      const response = axios.delete(`/client/${row._id}`);

      if (response) {
        dispatch(toggleLoader(false));
        const copy = manipulateLocalRecord(clients, row._id, "delete", null);
        setClients(copy);
        setFilteredClients(copy);
        toast.success("User deleted successfully!");
      }
    }
  };

  /**
   * get all client information and render in table
   */
  const getAllClients = async () => {
    try {
      dispatch(toggleLoader(true));
      const response = await axios.get("/client");
      setClients(response.data);
      setFilteredClients(response.data);
      dispatch(toggleLoader(false));
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(toggleLoader(false));
    }
  };

  const onCloseHandler = (updatedClient, newClient) => {
    if (updatedClient) {
      const copy = manipulateLocalRecord(
        clients,
        updatedClient._id,
        "update",
        updatedClient
      );
      setClients(copy);
      setFilteredClients(copy);
      toast.success("Client updated successfully");
    }

    if (newClient) {
      const copy = manipulateLocalRecord(clients, newClient, "insert", null);
      setClients(copy);
      setFilteredClients(copy);
      toast.success("Client created successfully");
    }
    setClient({});
    setOpen(false);
  };

  useEffect(() => {
    const result = clients.filter(
      (item) =>
        item.name.toLowerCase().match(search.toLowerCase()) ||
        item.email.toLowerCase().match(search.toLowerCase()) ||
        item.address.toLowerCase().match(search.toLowerCase())
    );

    setFilteredClients(result);
  }, [search]);

  useEffect(() => {
    getAllClients();
  }, []);

  const SearchBar = (
    <TextField
      size="small"
      type="text"
      placeholder="Search here"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );

  return (
    <Card>
      <CardHeader
        title={<Typography variant="h5">Clients</Typography>}
        action={
          <Button variant="contained" onClick={() => setOpen(true)}>
            Create Client
          </Button>
        }
      ></CardHeader>
      <CardContent>
        <DataTable
          subHeader
          subHeaderAlign="left"
          responsive
          columns={columns}
          data={filteredClients}
          subHeaderComponent={SearchBar}
          pagination
        />
        <CreateClientDialog
          open={open}
          client={client}
          onClose={onCloseHandler}
        />

        {/* Toaster component */}
        <CustomtToaster />
      </CardContent>
    </Card>
  );
};

export default Clients;
