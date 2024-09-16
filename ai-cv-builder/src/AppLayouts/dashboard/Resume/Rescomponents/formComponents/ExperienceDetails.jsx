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

function ExperienceDetails() {
  const [experinceList, setExperinceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const { resumeInfos, setResumeInfos } = useContext(InfosContext);

  const handleChange = (index, event) => {
    const newEntries = experinceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    console.log(newEntries);
    setExperinceList(newEntries);
  };
  const AddNewExperience = () => {
    setExperinceList([...experinceList, formData]);
  };
  const RemoveExperience = () => {
    setExperinceList((experinceList) => experinceList.slice(0, -1));
  };
  const handleRichTextEditor = (e, name, index) => {
    const newEntries = experinceList.slice();
    newEntries[index][name] = e.target.value;

    setExperinceList(newEntries);
  };
  useEffect(() => {
    resumeInfos?.Experience.length > 0 &&
      setExperinceList(resumeInfos?.Experience);
  }, []);
  useEffect(() => {
    setResumeInfos({
      ...resumeInfos,
      Experience: experinceList,
    });
  }, [experinceList]);
  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        Experience: experinceList.map(({ id, ...rest }) => rest),
      },
    };

    console.log(experinceList);

    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (res) => {
        console.log(res);
        setLoading(false);
        toast("Details updated !");
      },
      (error) => {
        setLoading(false);
      }
    );
  };
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Experiences</h2>
      <p>Add experience</p>
      <div>
        {experinceList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div>
                <label className="text-xs font-semibold uppercase">
                  What was your role at the company?
                </label>
                <Input
                  placeholder="Frontend Developper"
                  name="title"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.title}
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase">
                  For which company did you work? *
                </label>
                <Input
                  placeholder="Paps"
                  name="companyName"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.companyName}
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase ">
                  Where was the company located?
                </label>
                <Input
                  placeholder="Dakar"
                  name="city"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.city}
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase ">
                  State
                </label>
                <Input
                  placeholder="Senegal"
                  name="state"
                  onChange={(event) => handleChange(index, event)}
                  defaultValue={item?.state}
                />
              </div>
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
              <div className="col-span">
                {/* Work Summery  */}
                <RichTextEditor
                  index={index}
                  defaultValue={item?.workSummery}
                  EditOnChange={(event) =>
                    handleRichTextEditor(event, "workSummery", index)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewExperience}
            className="text-primary"
          >
            {" "}
            <PlusCircle height={16} /> Add More Experience
          </Button>
          <Button
            variant="outline"
            onClick={RemoveExperience}
            className="text-primary"
          >
            {" "}
            <MinusCircle height={16} /> Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default ExperienceDetails;
