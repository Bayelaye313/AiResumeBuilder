import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../../services/GlobalApi";
import { toast } from "sonner";
import { InfosContext } from "@/HandleContext/InfosContext";

function Education() {
  const [loading, setLoading] = useState(false);
  const { resumeInfos, setResumeInfos } = useContext(InfosContext);
  const params = useParams();
  const [educationalList, setEducationalList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  // Charger les informations du localStorage
  useEffect(() => {
    const savedInfos = localStorage.getItem("resumeInfos");
    console.log("Chargement depuis localStorage", savedInfos); // Vérifier les données chargées
    if (savedInfos) {
      const parsedInfos = JSON.parse(savedInfos);
      setResumeInfos(parsedInfos);
      setEducationalList(parsedInfos?.education || []);
    }
  }, [setResumeInfos]);

  // Mettre à jour `educationalList` à partir de `resumeInfos`
  useEffect(() => {
    if (resumeInfos?.education) {
      console.log("Mise à jour à partir de resumeInfos", resumeInfos.education);
      setEducationalList(resumeInfos.education);
    }
  }, [resumeInfos]);

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const newEntries = [...educationalList];
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  };

  const AddNewEducation = () => {
    setEducationalList((prev) => [
      ...prev,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const RemoveEducation = () => {
    setEducationalList((prev) => prev.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        education: educationalList.map(({ id, ...rest }) => rest),
      },
    };

    GlobalApi.UpdateResumeDetail(params.resumeId, data)
      .then((resp) => {
        console.log("Réponse de l'API", resp);
        setLoading(false);
        toast("Details updated!");

        // Mettre à jour `resumeInfos` et sauvegarder dans `localStorage`
        setResumeInfos((prev) => {
          const updatedInfos = { ...prev, education: educationalList };
          console.log("Sauvegarde dans localStorage", updatedInfos); // Vérifier les données avant la sauvegarde
          localStorage.setItem("resumeInfos", JSON.stringify(updatedInfos)); // Sauvegarde dans localStorage
          return updatedInfos;
        });
      })
      .catch((error) => {
        setLoading(false);
        toast("Server Error, Please try again!");
      });
  };

  // Sauvegarder automatiquement chaque changement de `educationalList`
  useEffect(() => {
    console.log("educationalList updated", educationalList);

    if (resumeInfos && educationalList.length > 0) {
      const updatedInfos = { ...resumeInfos, education: educationalList };
      console.log("Sauvegarde automatique dans localStorage", updatedInfos); // Vérifier les données sauvegardées
      localStorage.setItem("resumeInfos", JSON.stringify(updatedInfos));
    }
  }, [educationalList, resumeInfos]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education</h2>
      <p>Add Your educational details</p>
      <div>
        {educationalList?.length > 0 ? (
          educationalList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div className="col-span-2">
                  <label>University Name</label>
                  <Input
                    name="universityName"
                    onChange={(e) => handleChange(e, index)}
                    value={item?.universityName}
                  />
                </div>
                <div>
                  <label>Degree</label>
                  <Input
                    name="degree"
                    onChange={(e) => handleChange(e, index)}
                    value={item?.degree}
                  />
                </div>
                <div>
                  <label>Major</label>
                  <Input
                    name="major"
                    onChange={(e) => handleChange(e, index)}
                    value={item?.major}
                  />
                </div>
                <div>
                  <label>Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    onChange={(e) => handleChange(e, index)}
                    value={item?.startDate}
                  />
                </div>
                <div>
                  <label>End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    onChange={(e) => handleChange(e, index)}
                    value={item?.endDate}
                  />
                </div>
                <div className="col-span-2">
                  <label>Description</label>
                  <Textarea
                    name="description"
                    onChange={(e) => handleChange(e, index)}
                    value={item?.description}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No educational details available</p>
        )}
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewEducation}
            className="text-primary"
          >
            + Add More Education
          </Button>
          <Button
            variant="outline"
            onClick={RemoveEducation}
            className="text-primary"
          >
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Education;
