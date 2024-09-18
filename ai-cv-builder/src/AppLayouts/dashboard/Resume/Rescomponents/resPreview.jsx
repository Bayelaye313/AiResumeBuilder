import { InfosContext } from "@/HandleContext/InfosContext";
import React, { useContext } from "react";
import PersoDetails from "./previewCompos/PersoDetails";
import SummeryDetails from "./previewCompos/SummeryDetails";
import ProfExpDetails from "./previewCompos/ProfExpDetails";
import EducationnalDetails from "./previewCompos/EducationnalDetails";
import SkillsDetails from "./previewCompos/SkillsDetails";

function ResPreview() {
  const { resumeInfos, setResumeInfos } = useContext(InfosContext);
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
