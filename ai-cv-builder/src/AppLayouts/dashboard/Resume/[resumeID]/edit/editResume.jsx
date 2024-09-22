import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../Rescomponents/formSection";
import ResPreview from "../../Rescomponents/resPreview";
import GlobalApi from "./../../../../../../services/GlobalApi";
import { InfosProvider } from "@/HandleContext/InfosContext";

function EditResume() {
  const { resumeId } = useParams();
  const [resumeInfos, setResumeInfos] = useState(null);

  useEffect(() => {
    const storedResumeInfos = JSON.parse(localStorage.getItem("resumeInfos"));
    if (storedResumeInfos) {
      setResumeInfos(storedResumeInfos);
    } else {
      GetResumeInfos();
    }
  }, []);

  const GetResumeInfos = () => {
    GlobalApi.GetResumeById(resumeId).then((resp) => {
      const fetchedData = resp.data.data;
      setResumeInfos(fetchedData);
      localStorage.setItem("resumeInfos", JSON.stringify(fetchedData)); // Stockage dans localStorage
    });
  };

  return (
    <InfosProvider value={{ resumeInfos, setResumeInfos }}>
      {" "}
      <div className="grid grid-cols-2 md:grid-cols-2 p-10 gap-10 ">
        <FormSection />
        <ResPreview />
      </div>
    </InfosProvider>
  );
}

export default EditResume;
