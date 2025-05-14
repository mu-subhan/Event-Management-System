import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Shared/Loader";
import axios from "axios";
// import event from "../../Assessts/event.jpg";
import { toast } from "react-toastify";
import PageNotFound from "../Shared/PageNotFound";
import { motion } from "framer-motion";
// import { FiCalendar, FiClock, FiMapPin, FiUsers, FiEdit2, FiX, FiSave } from "react-icons/fi";
import EditEventCard from "./EditEventCard";

const EditEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchEvent = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/event/${id}`,
        { withCredentials: true }
      );
      setEvent(data.event);
    } catch (error) {
      toast.error("Event not Found!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  if (loading) return <Loader />;
  if (Object.keys(event).length === 0) return <PageNotFound />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <EditEventCard event={event} />
    </motion.div>
  );
};


export default EditEvent;