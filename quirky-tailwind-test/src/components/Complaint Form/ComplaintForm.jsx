// src/components/ComplaintForm.jsx
import { useState } from "react";
import ComplaintTypeSelector from "./ComplaintTypeSelector";
import SeverityPicker from "./SeverityPicker";
import ComplaintList from "./ComplaintList";
import { useAuth } from "../../context/useAuth";
import { logComplaint } from "../../services/api";


const ComplaintForm = () => {
  const { authToken } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [severity, setSeverity] = useState("");
  const [complaints, setComplaints] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !type || !severity) return alert("Please fill all fields");

    try{

      const response = await logComplaint(
       { title, description, type, severity },
       authToken
      );

    // Append new complaint to list
    setComplaints([response.data, ...complaints]);

    // Clear form
    setTitle("");
    setDescription("");
    setType("");
    setSeverity("");
 
   } catch (err) {
     console.error("Error filing complaint:", err.response?.data || err.message);
     alert("Failed to file complaint");
   }
  };

  return (
    <section className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Log a Complaint</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Complaint Title"
          className="w-full p-2 border rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 border rounded h-24"
        />
        <ComplaintTypeSelector selectedType={type} setSelectedType={setType} />
        <SeverityPicker severity={severity} setSeverity={setSeverity} />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mt-4"
        >
          Submit
        </button>
      </form>

      <ComplaintList complaints={complaints} />
    </section>
  );
};

export default ComplaintForm;