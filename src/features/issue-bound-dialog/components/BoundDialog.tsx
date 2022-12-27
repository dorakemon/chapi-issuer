import { Dialog, DialogTitle } from "@mui/material";
import { memo } from "react";

import { CustomizedSteppers } from "@/components/Stepper";
import { InputDocument } from "@/domain/models";
import { useStepper } from "@/hooks";

import { StepperTitles } from "../constants/stepper";

type Props = {
  open: boolean;
  closeHandler: () => void;
  inputDocument: InputDocument;
};

export const BoundDialog: React.FC<Props> = memo((props) => {
  const { activeStep, nextStep, initializeStep } = useStepper(
    StepperTitles.length
  );

  const closeHandler = () => {
    props.closeHandler();
  };

  return (
    <Dialog
      open={props.open}
      onClose={closeHandler}
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle>
        <CustomizedSteppers steps={StepperTitles} activeStep={activeStep} />
      </DialogTitle>
    </Dialog>
  );
});

BoundDialog.displayName = "BoundDialog";
