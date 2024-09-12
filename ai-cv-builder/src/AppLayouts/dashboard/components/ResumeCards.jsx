import { EditIcon, Notebook } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function ResumeCards({ resume }) {
  const resumeId = resume?.id;
  const title = resume?.attributes?.title || "No Title Available";

  if (!resumeId) {
    console.warn("Resume ID is missing or undefined", resume);
  }

  return (
    <Link to={resumeId ? `/dashboard/resume/${resumeId}/edit` : "#"}>
      <div
        className="p-14 bg-secondary flex items-center 
       justify-center h-[300px] w-[250px] border border-blue-700 rounded-lg
       hover:scale-105 transition-all hover:shadow-md to-gray-700 "
      >
        <EditIcon />
      </div>
      <h2 className="text-center text-xs my-1 font-semibold ">{title}</h2>
    </Link>
  );
}

export default ResumeCards;
