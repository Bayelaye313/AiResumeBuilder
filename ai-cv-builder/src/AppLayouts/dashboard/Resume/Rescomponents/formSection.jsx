import React, { useState } from "react";
import PersonalDetails from "./formComponents/PersonalDetails";
import SummeryDetails from "./formComponents/SummeryDetails";
import Education from "./formComponents/Education";
import Skills from "./formComponents/Skills";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navigate } from "react-router-dom";
import ProgressTracker from "@/components/customs/ProgressTracker";
import Experience from "./formComponents/ExperienceDetails";
function FormSection() {
  const [step, setStep] = useState(1);
  const [ActiveNext, setActiveNext] = useState(false);

  const steps = [
    "Contact",
    "Summary",
    "Experience",
    "Education",
    "Skills",
    "Preview",
  ];

  return (
    <div>
      {/* Progress Tracker */}
      <ProgressTracker steps={steps} currentStep={step} />

      <div className="flex justify-end gap-2 mb-4 my-4">
        {/* Previous Button */}
        {step > 1 && (
          <Button
            className="flex gap-2"
            size="sm"
            onClick={() => setStep(step - 1)}
          >
            <ArrowLeft /> Prev
          </Button>
        )}
        {/* Next Button */}
        <Button
          disabled={!ActiveNext}
          size="sm"
          onClick={() => setStep(step + 1)}
        >
          Next <ArrowRight />
        </Button>
      </div>

      {/* Form Sections */}
      {step === 1 ? (
        <PersonalDetails ActiveNext={(e) => setActiveNext(e)} />
      ) : step === 2 ? (
        <SummeryDetails ActiveNext={(e) => setActiveNext(e)} />
      ) : step === 3 ? (
        <Experience ActiveNext={(e) => setActiveNext(e)} />
      ) : step === 4 ? (
        <Education ActiveNext={(e) => setActiveNext(e)} />
      ) : step === 5 ? (
        <Skills ActiveNext={(e) => setActiveNext(e)} />
      ) : step === 6 ? (
        <Navigate to={`/my-resume/${resumeId}/view`} />
      ) : null}
    </div>
  );
}

export default FormSection;
