import { Textarea } from "@/components/ui/textarea";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { InfosContext } from "@/HandleContext/InfosContext";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../services/GlobalApi";
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { AiChatSession } from "../../../../../../services/geminiModal";

const summeryPrompt =
  "Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format";
function SummeryDetails({ ActiveNext }) {
  const { resumeInfos, setResumeInfos } = useContext(InfosContext);
  const [summeryData, setSummeryData] = useState(resumeInfos.summery || "");
  const [AiSummeryList, setAiSummeryList] = useState();
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

  const GenerateSummeryFromAI = async () => {
    ActiveNext(false);
    const PROMPT = summeryPrompt.replace("{jobTitle}", resumeInfos?.jobTitle);
    console.log(PROMPT);
    const result = await AiChatSession.sendMessage(PROMPT);
    console.log(JSON.parse(result.response.text()));

    setAiSummeryList(JSON.parse(result.response.text()));
    setLoading(false);
  };

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
        <form className="mt-8" onSubmit={onSave}>
          <div className="flex justify-between sums-end">
            <label className="font-bold text-xs">Add summery</label>
            <Button
              flex
              gap-2
              variant="outline"
              size="sm"
              className=" border-primary"
              onClick={() => GenerateSummeryFromAI()}
            >
              <Brain className="w-4 h-4" />
              Ai generate summery
            </Button>
          </div>
          <Textarea
            className="mt-6"
            value={summeryData}
            onChange={(e) => setSummeryData(e.target.value)}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
      {AiSummeryList && (
        <div className="my-5">
          <h2 className="font-bold text-lg">Ai Suggestions</h2>
          {AiSummeryList?.map((sum, index) => (
            <div
              key={index}
              onClick={() => setSummeryData(sum?.summary)}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
            >
              <h2 className="font-bold my-1 text-primary">
                Level: {sum?.experience_level}
              </h2>
              <p>{sum?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SummeryDetails;
