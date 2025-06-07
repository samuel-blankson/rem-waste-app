import { createContext, useState, useContext } from "react";
import { STAGE_KEYS } from "../constants/stageKeys";

export const SkipContext = createContext();

export const SkipProvider = ({ children }) => {
  const [selectedStageId, setSelectedStageId] = useState(STAGE_KEYS.SKIP);

  return (
    <SkipContext.Provider
      value={{
        selectedStageId,
        setSelectedStageId,
      }}
    >
      {children}
    </SkipContext.Provider>
  );
};

export const useSkip = () => useContext(SkipContext);
