import { useUser } from "@clerk/clerk-react";
import AddResume from "./components/addResume";
import { useEffect, useState } from "react";
import GlobalApi from "../../../services/GlobalApi";
import ResumeCards from "./components/ResumeCards";

function DashboardPage() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  useEffect(() => {
    user && GetResumesList();
  }, [user]);
  const GetResumesList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then(
      (resp) => {
        //console.log(resp.data.data);
        setResumeList(resp.data.data);
      }
    );
  };
  return (
    <div className="p-8 md:px-20 lg:px-32">
      <h1 className="font-bold text-lg">Your Resumes</h1>
      <p>
        Make your resume stand out by quickly customizing it to each application
        and applying to more jobs.
      </p>
      <div
        className="grid grid-cols-1 
                      md:grid-cols-2 
                      lg:grid-cols-3 
                      mt-10 gap-2"
      >
        <AddResume />
        {resumeList.length > 0 &&
          resumeList.map((resume, index) => (
            <ResumeCards resume={resume} key={index} />
          ))}
      </div>
    </div>
  );
}

export default DashboardPage;
