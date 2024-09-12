import { InfosContext } from "@/HandleContext/InfosContext";
import React, { useState, useContext } from "react";

function ExperienceDetails() {
  const [experinceList, setExperinceList] = useState([]);
  // const [resumeInfos, setResumeInfos] = useContext(InfosContext);
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Experiences</h2>
      <p>Add experience</p>
    </div>
  );
}

export default ExperienceDetails;
