import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar";
import Layout from "../Components/Shared/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../redux/actions/events";

// Sample data
const sampleEvents = [
  {
    id: "1",
    title: "Tech Conference 2025",
    description:
      "Join the largest gathering of developers and tech enthusiasts.",
    startDate: "April 25, 2025",
    endDate: "April 27, 2025",
    status: "Active",
    image: "https://source.unsplash.com/800x800/?conference,event",
  },
  {
    id: "2",
    title: "Startup Expo 2025",
    description: "Explore the future of innovation and startup growth.",
    startDate: "May 10, 2025",
    endDate: "May 12, 2025",
    status: "Inactive",
    image: "https://source.unsplash.com/800x800/?startup,expo",
  },
];

const EventDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  //   const event = sampleEvents[0];

  const { allEvents } = useSelector((state) => state.events);
  const [event, setEvent] = useState(null);
  //   const event = sampleEvents.find((e) => e.id === id);

  //   if (!event) {
  //     return (
  //       <div className="h-screen flex items-center justify-center text-red-600 text-xl font-semibold">
  //         Event not found.
  //       </div>
  //     );
  //   }

  useEffect(() => {
    if (!allEvents) {
      dispatch(getAllEvents());
    }
  }, [allEvents]);
  useEffect(() => {
    if (allEvents) {
      const foundEvent = allEvents.find((eve) => eve.id === id);
      setEvent(foundEvent || null);
    }
  }, [allEvents, id]);

  //   if (allEvents) setEvent(allEvents.find((eve) => eve.id == id));
  return (
    <Layout loading={event ? false : true}>
      {/* <Navbar scroll={false} /> */}
      <div className="h-screen w-full flex font-sans bg-gradient-to-r bg-gray-50">
        {/* Left Side - Image */}
        <div className="w-1/2 h-full flex items-center justify-center p-6">
          <div className="w-full h-[90%] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s"
              }
              alt={"event?.title"}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side - Details */}
        <div className="w-1/2 h-full flex items-center">
          <div className="px-12 space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">{event?.title}</h1>
            <p className="text-lg text-gray-600">{event?.description}</p>

            <div className="space-y-3 text-base text-gray-700">
              <div>
                <span className="font-medium">Start Date:</span>{" "}
                {event?.startTime}
              </div>
              <div>
                <span className="font-medium">End Date:</span> {event?.endTime}
              </div>
              <div>
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    event?.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {event?.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetails;
