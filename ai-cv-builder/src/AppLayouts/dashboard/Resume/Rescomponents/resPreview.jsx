import React, { useContext, useEffect } from "react";
import PersoDetails from "./previewCompos/PersoDetails";
import SummeryDetails from "./previewCompos/SummeryDetails";
import ProfExpDetails from "./previewCompos/ProfExpDetails";
import EducationnalDetails from "./previewCompos/EducationnalDetails";
import SkillsDetails from "./previewCompos/SkillsDetails";
import { InfosContext } from "@/HandleContext/InfosContext";

function ResPreview() {
  const { resumeInfos, setResumeInfos } = useContext(InfosContext);
  console.log("resumeInfosprev:", resumeInfos);

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setResumeInfos(parsedData);
    }
  }, [setResumeInfos]);

  if (!Object.keys(resumeInfos).length) {
    // Vérifiez si l'objet est vide
    return <div>Loading data...</div>;
  }
  return (
    <div
      className="shadow-lg h-full mt-20 p-14 border-t-[20px]"
      style={{
        borderColor: resumeInfos?.themeColor,
      }}
    >
      <PersoDetails resumeInfos={resumeInfos} />
      <SummeryDetails resumeInfos={resumeInfos} />
      <ProfExpDetails resumeInfos={resumeInfos} />
      <EducationnalDetails resumeInfos={resumeInfos} />
      <SkillsDetails resumeInfos={resumeInfos} />
    </div>
  );
}

export default ResPreview;
