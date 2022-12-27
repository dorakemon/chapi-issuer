import { useCallback, useState } from "react";

export const useStepper = (totalSteps: number, initStep = 0) => {
  const [activeStep, setActiveStep] = useState(initStep);

  const initializeStep = useCallback(() => {
    setActiveStep(initStep);
  }, [initStep]);

  const nextStep = useCallback(() => {
    if (activeStep < totalSteps - 1) setActiveStep(activeStep + 1);
  }, [totalSteps, activeStep]);

  const prevStep = useCallback(() => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  }, [activeStep]);

  return { activeStep, nextStep, prevStep, initializeStep };
};
