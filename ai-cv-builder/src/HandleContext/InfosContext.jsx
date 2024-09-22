import React, { createContext, useState } from "react";

export const InfosContext = createContext(null);

export const InfosProvider = ({ children }) => {
  const [resumeInfos, setResumeInfos] = useState({}); // État par défaut

  return (
    <InfosContext.Provider value={{ resumeInfos, setResumeInfos }}>
      {children}
    </InfosContext.Provider>
  );
};
