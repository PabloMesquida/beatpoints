import React from "react";
import { useAuth } from "../hooks/useAuth.js";
import {
  DashboardContainer,
  UserContainer,
  DataSongContainer,
  DisplayContainer,
} from "./Dashboard.styles.js";

const Dashboard = ({ code }) => {
  const accesToken = useAuth(code);
  return (
    <DashboardContainer>
      <UserContainer></UserContainer>
      <DataSongContainer></DataSongContainer>
      <DisplayContainer></DisplayContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
