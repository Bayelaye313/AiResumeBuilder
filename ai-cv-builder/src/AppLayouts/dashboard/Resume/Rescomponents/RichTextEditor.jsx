import React, { useContext, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  Separator,
  Toolbar,
  Editor,
  EditorProvider,
  BtnUnderline,
} from "react-simple-wysiwyg";
import { AiChatSession } from "./../../../../../services/geminiModal";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Zap } from "lucide-react";
import { InfosContext } from "@/HandleContext/InfosContext";
import { toast } from "sonner";

const PROMPT = `
position title: {positionTitle}, 
Depends on position title give me 5-7 bullet points for my experience in resume 
(Please do not add experience level and No JSON array), 
give me result in HTML tags
`;

function RichTextEditor({ EditOnChange, index, defaultValue }) {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfos, setResumeInfos } = useContext(InfosContext);
  const [loading, setLoading] = useState(false);

  const cleanHtmlResponse = (response) => {
    // Suppression des caractères de début et fin {"experience": [...]}
    let cleanedResponse = response
      .replace(/^\{"experience":\s*\[?/, "") // Enlève '{"experience": ['
      .replace(/\]?\s*}\s*$/, "") // Enlève ']}'
      .replace(/\n\s*"\s*,\s*"\s*/g, "\n") // Supprime les guillemets et les virgules entre les éléments
      .replace(/\\"/g, '"') // Remplace les guillemets échappés
      .replace(/",\s*"/g, "\n"); // Supprime les guillemets et les virgules restantes

    // Enlève les guillemets autour des éléments et nettoie les espaces
    cleanedResponse = cleanedResponse
      .replace(/^"\s*|\s*"$/g, "") // Enlève les guillemets en début et fin de chaîne
      .replace(/\s+/g, " "); // Nettoie les espaces multiples

    return cleanedResponse;
  };
  const GenerateSummeryFromAI = async () => {
    if (!resumeInfos?.experience?.[index]) {
      toast("Experience entry does not exist for the provided index.");
      return;
    }
    if (!resumeInfos.experience[index]?.title) {
      toast("Please Add Position Title");
      return;
    }
    setLoading(true);
    try {
      const prompt = PROMPT.replace(
        "{positionTitle}",
        resumeInfos.experience[index].title
      );

      const result = await AiChatSession.sendMessage(prompt);
      const responseText = await result.response.text();

      // Nettoyer et formater la réponse
      const cleanedResponse = cleanHtmlResponse(responseText);

      setValue(cleanedResponse);
      EditOnChange(cleanedResponse);

      // Optionnellement mettre à jour resumeInfos si nécessaire
      const updatedExperience = [...resumeInfos.experience];
      updatedExperience[index].workSummery = cleanedResponse;
      setResumeInfos({
        ...resumeInfos,
        experience: updatedExperience,
      });
    } catch (error) {
      console.error("Error generating summary:", error);
      toast.error("Failed to generate summary from AI");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummeryFromAI}
          disabled={loading}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Zap className="h-4 w-4" /> Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          className="editor-container"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
