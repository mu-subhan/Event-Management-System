import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateEventPage = () => {
  const [eventData, setEventData] = useState({
    title: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/create-event`,
        eventData
      );
      if (res.data.success) {
        toast.success("Event created successfully!");
        setEventData({ title: "", startTime: "", endTime: "" });
      } else {
        toast.error("Failed to create event.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={eventData.title}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="datetime-local"
          name="startTime"
          value={eventData.startTime}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="datetime-local"
          name="endTime"
          value={eventData.endTime}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Create</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateEventPage;
