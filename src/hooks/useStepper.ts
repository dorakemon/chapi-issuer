import { useCallback, useState } from "react";

export const useStepper = <T>(stepList: Array<T>, initStep = 0) => {
  const [activeStepIndex, setActiveStepIndex] = useState(initStep);

  const initializeStep = useCallback(() => {
    setActiveStepIndex(initStep);
  }, [initStep]);

  const nextStep = useCallback(() => {
    if (activeStepIndex < stepList.length - 1)
      setActiveStepIndex(activeStepIndex + 1);
  }, [stepList, activeStepIndex]);

  const prevStep = useCallback(() => {
    if (activeStepIndex > 0) setActiveStepIndex(activeStepIndex - 1);
  }, [activeStepIndex]);

  return {
    activeStep: stepList[activeStepIndex],
    activeStepIndex,
    nextStep,
    prevStep,
    initializeStep,
  };
};
