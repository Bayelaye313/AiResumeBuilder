import React, { useState } from "react";
import PersonalDetails from "./formComponents/PersonalDetails";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import SummeryDetails from "./formComponents/SummeryDetails";
function FormSection() {
  const [step, setStep] = useState(1);
  const [ActiveNext, setActiveNext] = useState(false);
  return (
    <div>
      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" className="flex gap-2">
          {" "}
          <LayoutGrid /> Theme
        </Button>
        <div className="flex justify-end gap-2">
          {step > 1 && (
            <Button
              className="flex gap-2"
              size="sm"
              onClick={() => setStep(step - 1)}
            >
              {" "}
              <ArrowLeft /> Prev{" "}
            </Button>
          )}
          <Button
            disabled={!ActiveNext}
            size="sm"
            onClick={() => setStep(step + 1)}
          >
            {" "}
            Next
            <ArrowRight />{" "}
          </Button>
        </div>
      </div>
      {step == 1 ? (
        <PersonalDetails ActiveNext={(e) => setActiveNext(e)} />
      ) : step == 2 ? (
        <SummeryDetails ActiveNext={(e) => setActiveNext(e)} />
      ) : null}
    </div>
  );
}

export default FormSection;
