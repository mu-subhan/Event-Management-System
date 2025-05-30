import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Components/Shared/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../redux/actions/events";

const DUMMY_IMAGE = "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop";

const EventDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { allEvents } = useSelector((state) => state.events);

  const [event, setEvent] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (!allEvents) {
      dispatch(getAllEvents());
    }
  }, [allEvents]);

  useEffect(() => {
    if (allEvents) {
      const foundEvent = allEvents.find((eve) => eve.id === id);
      if (foundEvent) {
        const eventCopy = { ...foundEvent };
        const sortedImages = [...(eventCopy.images || [])]
          .filter((img) => img.url?.trim())
          .sort((a, b) => a.order - b.order);

        eventCopy.images = sortedImages.length
          ? sortedImages
          : [{ url: DUMMY_IMAGE, id: "dummy" }];
        setEvent(eventCopy);
        setSelectedImageIndex(0);
      }
    }
  }, [allEvents, id]);

  return (
    <Layout loading={!event}>
      <div className="min-h-screen w-full flex font-sans bg-gray-50">
        {/* Left Side - Image Display */}
        <div className="w-1/2 h-full flex flex-col items-center justify-center p-6 gap-4">
          {/* Main Image Preview */}
          <div className="w-full h-[80%] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={event?.images?.[selectedImageIndex]?.url || DUMMY_IMAGE}
              alt={`Image ${selectedImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 justify-center mt-2 overflow-x-auto max-w-full">
            {event?.images?.map((img, index) => (
              <img
                key={img.id}
                src={img.url || DUMMY_IMAGE}
                alt={`Thumb ${index + 1}`}
                onClick={() => setSelectedImageIndex(index)}
                className={`h-16 w-24 object-cover rounded-lg cursor-pointer border-2 transition-all duration-200 ${
                  selectedImageIndex === index
                    ? "border-indigo-500 scale-105"
                    : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Side - Event Details */}
        <div className="w-1/2 h-screen flex items-center">
          <div className="px-12 space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">{event?.title}</h1>
            <p className="text-lg text-gray-600">{event?.description}</p>

            <div className="space-y-3 text-base text-gray-700">
              <div>
                <span className="font-medium">Start Time:</span>{" "}
                {new Date(event?.startTime).toLocaleString()}
              </div>
              <div>
                <span className="font-medium">End Time:</span>{" "}
                {new Date(event?.endTime).toLocaleString()}
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
