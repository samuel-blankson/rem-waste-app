import { useContext } from "react";
import { SkipContext } from "../context/SkipContext";
import { STAGE_KEYS } from "../constants/stageKeys";

const stages = Object.values(STAGE_KEYS);

const useStageNavigation = (onClose) => {
  const { selectedStageId, setSelectedStageId } = useContext(SkipContext);

  const currentIndex = stages.findIndex(
    (stageKey) => stageKey === selectedStageId
  );

  const goToPreviousStage = () => {
    if (currentIndex > 0) {
      setSelectedStageId(stages[currentIndex - 1]);
      if (onClose) onClose();
    }
  };

  const goToNextStage = () => {
    if (currentIndex < stages.length - 1) {
      setSelectedStageId(stages[currentIndex + 1]);
      if (onClose) onClose();
    }
  };

  return {
    currentStage: selectedStageId,
    currentIndex,
    goToPreviousStage,
    goToNextStage,
  };
};

export default useStageNavigation;
