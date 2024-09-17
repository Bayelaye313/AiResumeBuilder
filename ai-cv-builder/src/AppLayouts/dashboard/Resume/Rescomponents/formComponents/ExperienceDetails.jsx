import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InfosContext } from "@/HandleContext/InfosContext";
import { LoaderCircle, MinusCircle, PlusCircle } from "lucide-react";
import React, { useEffect, useState, useContext } from "react";
import RichTextEditor from "../RichTextEditor";
import GlobalApi from "../../../../../../services/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const formData = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};

function Experience() {
  const [experienceList, setExperienceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const { resumeInfos, setResumeInfos } = useContext(InfosContext);

  const handleChange = (index, event) => {
    const newEntries = experienceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  const AddNewExperience = () => {
    setExperienceList([...experienceList, formData]);
  };

  const RemoveExperience = () => {
    setExperienceList((experienceList) => experienceList.slice(0, -1));
  };

  const handleRichTextEditor = (value, name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  useEffect(() => {
    if (resumeInfos?.experience?.length > 0) {
      setExperienceList(resumeInfos.experience);
    }
  }, [resumeInfos]);

  useEffect(() => {
    setResumeInfos({
      ...resumeInfos,
      experience: experienceList,
    });
  }, [experienceList]);

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        experience: experienceList.map(({ id, ...rest }) => rest),
      },
    };

    GlobalApi.UpdateResumeDetail(params.resumeId, data).then(
      (res) => {
        setLoading(false);
        toast("Details updated!");
      },
      (error) => {
        setLoading(false);
        toast.error("Failed to update experience details");
      }
    );
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Professional Experiences</h2>
      <p>Add your experience details</p>
      <div>
        {experienceList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              {/* Title Input */}
              <div>
                <label className="text-xs font-semibold uppercase">
                  Position Title
                </label>
                <Input
                  placeholder="Frontend Developer"
                  name="title"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.title}
                />
              </div>

              {/* Company Name Input */}
              <div>
                <label className="text-xs font-semibold uppercase">
                  Company Name
                </label>
                <Input
                  placeholder="Company Name"
                  name="companyName"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.companyName}
                />
              </div>

              {/* City Input */}
              <div>
                <label className="text-xs font-semibold uppercase">City</label>
                <Input
                  placeholder="City"
                  name="city"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.city}
                />
              </div>

              {/* State Input */}
              <div>
                <label className="text-xs font-semibold uppercase">State</label>
                <Input
                  placeholder="State"
                  name="state"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.state}
                />
              </div>

              {/* Start Date Input */}
              <div>
                <label className="text-xs font-semibold uppercase">
                  Start Date
                </label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.startDate}
                />
              </div>

              {/* End Date Input */}
              <div>
                <label className="text-xs font-semibold uppercase">
                  End Date
                </label>
                <Input
                  type="date"
                  name="endDate"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.endDate}
                />
              </div>

              {/* Work Summary with Rich Text Editor */}
              <div className="col-span-2">
                <RichTextEditor
                  defaultValue={item?.workSummery}
                  EditOnChange={(value) =>
                    handleRichTextEditor(value, "workSummery", index)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Remove Experience Buttons */}
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewExperience}
            className="text-primary"
          >
            <PlusCircle height={16} /> Add More Experience
          </Button>
          <Button
            variant="outline"
            onClick={RemoveExperience}
            className="text-primary"
          >
            <MinusCircle height={16} /> Remove
          </Button>
        </div>

        {/* Save Button */}
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Experience;
