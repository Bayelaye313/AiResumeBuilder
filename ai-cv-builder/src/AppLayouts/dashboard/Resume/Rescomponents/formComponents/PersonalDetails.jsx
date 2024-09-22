import React, { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import GlobalApi from "../../../../../../services/GlobalApi";
import { toast } from "sonner";
import { InfosContext } from "@/HandleContext/InfosContext";

function PersonalDetails({ ActiveNext }) {
  const params = useParams();
  const { resumeInfos, setResumeInfos } = useContext(InfosContext);

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      // console.log("Loaded data from localStorage:", parsedData);
      if (parsedData) {
        setFormData(parsedData);
        setResumeInfos(parsedData);
      }
    }
  }, []); // Ce useEffect ne se déclenche qu'une seule fois au montage du composant

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const updatedData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedData);
    setResumeInfos(updatedData);

    localStorage.setItem("formData", JSON.stringify(updatedData));
    ActiveNext(true);
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { data: formData };

    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        ActiveNext(true);
        setLoading(false);
        toast("Details updated");
      },
      (error) => {
        setLoading(false);
        console.error("Failed to update details", error);
      }
    );
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get Started with the basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input
              name="firstName"
              value={formData?.firstName || ""}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input
              name="lastName"
              value={formData?.lastName || ""}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input
              name="jobTitle"
              value={formData?.jobTitle || ""}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input
              name="address"
              value={formData?.address || ""}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input
              name="phone"
              value={formData?.phone || ""}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input
              name="email"
              value={formData?.email || ""}
              required
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetails;
