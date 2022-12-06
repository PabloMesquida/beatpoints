import React from "react";
import { useAuth } from "./useAuth";

const Dashboard = ({ code }) => {
  const accesToken = useAuth(code);
  return <div>{code}</div>;
};

export default Dashboard;
