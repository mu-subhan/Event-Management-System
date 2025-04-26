import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllEvents, getEventsBYId } from "../redux/actions/events";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../Components/Shared/Layout";
import Navbar from "../Components/Shared/Navbar";
import axios from "axios";
import EditEvent from "../Components/Admin/EditEvent";
import { Loader } from "lucide-react";

export default function EventDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log("id is: ", id);
  const { allEvents } = useSelector((state) => state.events);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (allEvents) {
      const foundEvent = allEvents.find((eve) => eve.id === id);
      setEvent(foundEvent || null);
    }
  }, [allEvents, id]);
  return (
    <div className=" ml-12">
      {event ? <EditEvent event={event} /> : <Loader />}
    </div>
  );
}
