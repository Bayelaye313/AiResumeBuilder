import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../../services/GlobalApi";
import { toast } from "sonner";
import { InfosContext } from "@/HandleContext/InfosContext";

function Education({ ActiveNext }) {
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

  useEffect(() => {
    if (resumeInfos?.education) {
      setEducationalList(resumeInfos.education);
    }
  }, [resumeInfos]);

  const handleChange = (event, index) => {
    const newEntries = [...educationalList];
    const { name, value } = event.target;
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

  // Fonction de validation pour éviter de sauvegarder les entrées vides
  const validateEducation = () => {
    return educationalList.filter(
      (edu) => edu.universityName.trim() !== "" && edu.degree.trim() !== ""
    );
  };

  const onSave = () => {
    setLoading(true);
    const validEducationalList = validateEducation();

    const data = {
      data: {
        education: validEducationalList.map(({ id, ...rest }) => rest),
      },
    };

    GlobalApi.UpdateResumeDetail(params.resumeId, data)
      .then((resp) => {
        setLoading(false);
        ActiveNext(true);
        toast("Details updated!");

        // Met à jour resumeInfos et localStorage avec les entrées valides
        setResumeInfos((prev) => {
          const updatedInfos = { ...prev, education: validEducationalList };
          localStorage.setItem("resumeInfos", JSON.stringify(updatedInfos)); // Sauvegarder dans localStorage
          return updatedInfos;
        });
      })
      .catch((error) => {
        setLoading(false);
        toast("Server Error, Please try again!");
      });
  };

  // Charger les données depuis localStorage au chargement initial
  useEffect(() => {
    const savedInfos = localStorage.getItem("resumeInfos");
    if (savedInfos) {
      setResumeInfos(JSON.parse(savedInfos));
    }
  }, []);

  // Met à jour le localStorage chaque fois que educationalList change, en filtrant les entrées vides
  useEffect(() => {
    const validEducationalList = validateEducation();

    setResumeInfos((prev) => {
      if (
        JSON.stringify(prev.education) !== JSON.stringify(validEducationalList)
      ) {
        const updatedInfos = { ...prev, education: validEducationalList };
        localStorage.setItem("resumeInfos", JSON.stringify(updatedInfos)); // Sauvegarder dans localStorage
        return updatedInfos;
      }
      return prev;
    });
  }, [educationalList]);

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
