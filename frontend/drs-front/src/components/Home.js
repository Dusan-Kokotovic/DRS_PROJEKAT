import React from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
const Home = () => {
  const { currentUser } = useSelector((state) => state.auth);
  return <Header currentUser={currentUser} />;
};

export default Home;
