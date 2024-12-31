import React from "react";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentList from "./components/StudentList";


const App = () => {
  return (
    
      <Router>
        <Routes>
        
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={
            <ProtectedRoute><StudentList/></ProtectedRoute>} />
          </Routes>
      </Router>
    
  );
};

export default App;
