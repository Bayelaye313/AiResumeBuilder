import { Textarea } from "@/components/ui/textarea";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { InfosContext } from "@/HandleContext/InfosContext";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../services/GlobalApi";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

function SummeryDetails({ ActiveNext }) {
  const { resumeInfos, setResumeInfos } = useContext(InfosContext);
  const [summeryData, setSummeryData] = useState(resumeInfos.summery || "");
  const [loading, setLoading] = useState(false);
  const params = useParams();
  useEffect(() => {
    if (summeryData !== undefined) {
      setResumeInfos((prevInfos) => ({
        ...prevInfos,
        summery: summeryData,
      }));
    }
  }, [summeryData]);

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        summery: summeryData,
      },
    };
    console.log("data", data);
    GlobalApi.UpdateResumeDetail(params?.resumeId, data)
      .then((resp) => {
        console.log(resp);
        ActiveNext(true);
        setLoading(false);
        toast("Details updated");
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">summery</h2>
        <p>Add summmery for your resume</p>
      </div>
      <form className="mt-8" onSubmit={onSave}>
        <div className="flex justify-between items-end">
          <label className="font-bold text-xs">Add summery</label>
          <Button
            flex
            gap-2
            variant="outline"
            size="sm"
            className=" border-primary"
          >
            Ai generate summery
          </Button>
        </div>
        <Textarea
          className="mt-6"
          onChange={(e) => setSummeryData(e.target.value)}
        />
        <div className="mt-2 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SummeryDetails;
