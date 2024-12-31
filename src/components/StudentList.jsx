import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import API from "../axiox"; // Your Axios instance

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false); // To toggle add student form
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    dob: "",
    gender: "",
    bloodtype: "",
    guardian: "",
    phoneNo: "",
    email: "",
    address: "",
    grade: "",
  });
  const [showViewPopup, setShowViewPopup] = useState(false); // For view popup
  const [selectedStudent, setSelectedStudent] = useState(null); // Store selected student
  const navigate = useNavigate(); // Hook to navigate to other pages

  // Fetch students from the backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await API.get("/students");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students", error);
        setError("Failed to fetch students.");
      }
    };
    fetchStudents();
  }, []);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/students", formData);
      setStudents([...students, response.data]);
      setFormData({
        name: "",
        age: "",
        dob: "",
        gender: "",
        bloodtype: "",
        guardian: "",
        phoneNo: "",
        email: "",
        address: "",
        grade: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding student", error);
      setError("Failed to add student.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await API.delete(`/students/${id}`);
        setStudents(students.filter((student) => student.id !== id));
      } catch (error) {
        console.error("Error deleting student", error);
        setError("Failed to delete student.");
      }
    }
  };

  const handleView = (student) => {
    setSelectedStudent(student);
    setShowViewPopup(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (selectedStudent) {
      try {
        const response = await API.put(`/students/${selectedStudent.id}`, formData);
        setStudents(students.map(student => 
          student.id === selectedStudent.id ? response.data : student
        ));
        setFormData({
          name: "",
          age: "",
          dob: "",
          gender: "",
          bloodtype: "",
          guardian: "",
          phoneNo: "",
          email: "",
          address: "",
          grade: "",
        });
        setShowForm(false);
        setSelectedStudent(null);
      } catch (error) {
        console.error("Error updating student", error);
        setError("Failed to update student.");
      }
    }
  };

  const handleUpdateClick = (student) => {
    setFormData({
      name: student.name,
      age: student.age,
      dob: student.dob,
      gender: student.gender,
      bloodtype: student.bloodtype,
      guardian: student.guardian,
      phoneNo: student.phoneNo,
      email: student.email,
      address: student.address,
      grade: student.grade,
    });
    setShowForm(true);
    setSelectedStudent(student); // Store the selected student for update
  };

  const closeViewPopup = () => {
    setShowViewPopup(false);
    setSelectedStudent(null);
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear all localStorage data
    navigate("/login"); // Redirect to login page after logging out
  };

  return (
    <div style={styles.container}>
      <h1>Student Management System</h1>
      {error && <p style={styles.error}>{error}</p>}
      <button style={styles.addButton} onClick={() => setShowForm(true)}>
        Add Student
      </button>

      <button style={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>

      {showForm && (
        <form style={styles.form} onSubmit={selectedStudent ? handleUpdate : handleAddStudent}>
          <h2>{selectedStudent ? "Update Student" : "Add New Student"}</h2>
          {Object.keys(formData).map((field) => (
            <div key={field} style={styles.formGroup}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
              <input
                type={field === "dob" ? "date" : "text"}
                value={formData[field]}
                onChange={(e) =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
                required
              />
            </div>
          ))}
          <button type="submit" style={styles.submitButton}>
            {selectedStudent ? "Update" : "Submit"}
          </button>
        </form>
      )}

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.gender}</td>
              <td>{student.dob}</td>
              <td>
                <button
                  style={styles.viewButton}
                  onClick={() => handleView(student)}
                >
                  View
                </button>
                <button
                  style={styles.updateButton}
                  onClick={() => handleUpdateClick(student)}
                >
                  Update
                </button>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showViewPopup && selectedStudent && (
        <div style={styles.popup}>
          <div style={styles.popupContent}>
            <h2>Student Details</h2>
            <p><strong>Name:</strong> {selectedStudent.name}</p>
            <p><strong>Age:</strong> {selectedStudent.age}</p>
            <p><strong>Gender:</strong> {selectedStudent.gender}</p>
            <p><strong>Date of Birth:</strong> {selectedStudent.dob}</p>
            <p><strong>Blood Type:</strong> {selectedStudent.bloodtype}</p>
            <p><strong>Guardian:</strong> {selectedStudent.guardian}</p>
            <p><strong>Phone Number:</strong> {selectedStudent.phoneNo}</p>
            <p><strong>Email:</strong> {selectedStudent.email}</p>
            <p><strong>Address:</strong> {selectedStudent.address}</p>
            <p><strong>Grade:</strong> {selectedStudent.grade}</p>
            <button style={styles.closeButton} onClick={closeViewPopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "auto",
    fontFamily: "Arial, sans-serif",
  },
  error: {
    color: "red",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
  },
  tableHeader: {
    backgroundColor: "#f4f4f4",
  },
  form: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    margin: "20px 0",
  },
  formGroup: {
    marginBottom: "10px",
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  updateButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "5px",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  viewButton: {
    backgroundColor: "#17a2b8",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "5px",
  },
  addButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  popup: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popupContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "500px",
    width: "100%",
  },
  closeButton: {
    padding: "10px 20px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default StudentList;
