import { InfosContext } from "@/HandleContext/InfosContext";
import { toast } from "sonner";
import React, { useContext, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GlobalApi from "../../../../../../services/GlobalApi";
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

function PersonalDetails({ ActiveNext }) {
  const params = useParams();
  const { resumeInfos, setResumeInfos } = useContext(InfosContext);

  const [formData, setFormData] = useState(resumeInfos || {});
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setFormData(resumeInfos);
  }, [resumeInfos]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setIsDirty(true);
    setFormData((prev) => ({ ...prev, [name]: value }));
    setResumeInfos((prev) => ({ ...prev, [name]: value }));

    ActiveNext(false);
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await GlobalApi.UpdateResumeDetail(params?.resumeId, { data: formData });
      ActiveNext(true);
      toast.success("Personal details updated successfully!");
    } catch (error) {
      toast.error("An error occurred while saving. Please try again.");
    } finally {
      setLoading(false);
      setIsDirty(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Details</h2>
      <p className="text-sm text-muted-foreground">
        Provide your basic information below.
      </p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm font-bold">First Name</label>
            <Input
              name="firstName"
              placeholder="e.g., John"
              defaultValue={resumeInfos?.firstName || ""}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm font-bold">Last Name</label>
            <Input
              name="lastName"
              placeholder="e.g., Doe"
              defaultValue={resumeInfos?.lastName || ""}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm font-bold">Job Title</label>
            <Input
              name="jobTitle"
              placeholder="e.g., Software Engineer"
              defaultValue={resumeInfos?.jobTitle || ""}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm font-bold">Address</label>
            <Input
              name="address"
              placeholder="e.g., 1234 Main St, City, Country"
              defaultValue={resumeInfos?.address || ""}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm font-bold">Phone</label>
            <Input
              name="phone"
              placeholder="e.g., +1234567890"
              defaultValue={resumeInfos?.phone || ""}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm font-bold">Email</label>
            <Input
              name="email"
              type="email"
              placeholder="e.g., johndoe@example.com"
              defaultValue={resumeInfos?.email || ""}
              required
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button type="submit" disabled={loading || !isDirty}>
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Save Basic Info"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetails;
