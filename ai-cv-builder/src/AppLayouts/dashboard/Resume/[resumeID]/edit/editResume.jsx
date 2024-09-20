import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../Rescomponents/formSection";
import ResPreview from "../../Rescomponents/resPreview";
import { InfosContext } from "@/HandleContext/InfosContext";
import dumping from "@/data/dumping";
import GlobalApi from "./../../../../../../services/GlobalApi";

function EditResume() {
  const { resumeId } = useParams();
  const [resumeInfos, setResumeInfos] = useState();
  useEffect(() => {
    GetResumeInfos();
  }, []);

  const GetResumeInfos = () => {
    GlobalApi.GetResumeById(resumeId).then((resp) => {
      console.log(resp.data.data);
      setResumeInfos(resp.data.data);
    });
  };
  return (
    <InfosContext.Provider value={{ resumeInfos, setResumeInfos }}>
      <div className="grid grid-cols-2 md:grid-cols-2 p-10 gap-10 ">
        <FormSection />
        <ResPreview />
      </div>
    </InfosContext.Provider>
  );
}

export default EditResume;
