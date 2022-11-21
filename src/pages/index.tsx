import { Typography } from "@mui/material";
import { MainLayout } from "../layouts/Main";

const Home = () => {
  return (
    <MainLayout>
      <Typography variant="h4" fontWeight="bold">Welcome</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ marginTop: 2 }}>
        This is a simple CRUD web interface for the CSCI341 Assignment 2.
        <br />
        You can add, edit, and delete items from the database.
        <br />
        Choose a category from the sidebar to get started.
      </Typography>
    </MainLayout>
  )
}

export default Home;
