import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import CreateTask from "./pages/CreateTask";
import Home from "./pages/Home";
import UpdateTask from "./pages/UpdateTask";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createTask" element={<CreateTask />} />
        <Route path="/updateTask/:taskId" element={<UpdateTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
