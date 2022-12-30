import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { memo } from "react";

import { CustomizedSteppers } from "@/components/Stepper";
import { MovieDocument } from "@/domain/constants";
import { InputDocument } from "@/domain/models";
import { useStepper } from "@/hooks";

import { StepperTitles } from "../constants/stepper";
import { useCreateSignatureRequest } from "../hooks/useCreateSignatureRequest";
import { useIssueBlindUnboundVc } from "../hooks/useIssueBlindBoundVc";
import { useUnblindBoundVc } from "../hooks/useUnblindBoundVc";
import { useVerifyBoundVc } from "../hooks/useVerifyBoundVc";
import { useVerifySignatureRequest } from "../hooks/useVerifySignatureRequest";

type Props = {
  open: boolean;
  closeHandler: () => void;
  inputDocument: InputDocument;
};

export const BoundDialog: React.FC<Props> = memo((props) => {
  const { activeStep, nextStep, initializeStep } = useStepper(
    StepperTitles.length
  );
  const { sigRequest, createSignatureRequestHandler } =
    useCreateSignatureRequest();
  const { blindVc, issueBlindVcHandler } = useIssueBlindUnboundVc();
  const { unblindedVc, unblindVcHandler } = useUnblindBoundVc();
  const { verifyStatus, verifyVcHandler } = useVerifyBoundVc();
  const { verifySignatureRequestHandler } = useVerifySignatureRequest();

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
      <DialogContentText>{verifyStatus}</DialogContentText>
      <DialogActions>
        <Button onClick={async () => await createSignatureRequestHandler()}>
          Sign Requesr
        </Button>
        <Button
          onClick={async () =>
            await verifySignatureRequestHandler({
              commitment: sigRequest?.commitment,
              proofOfHiddenMessages: sigRequest?.proofOfHiddenMessages,
              challengeHash: sigRequest?.challengeHash,
              // nonce: "dummy",
              // publicKey: None,
            })
          }
        >
          Verify Request
        </Button>
        <Button
          onClick={async () =>
            await issueBlindVcHandler(MovieDocument, sigRequest?.commitment)
          }
        >
          Issue VC
        </Button>
        <Button
          onClick={async () =>
            await unblindVcHandler(blindVc!, sigRequest?.blindingFactor)
          }
        >
          Unblind VC
        </Button>
        <Button onClick={async () => await verifyVcHandler(unblindedVc!)}>
          Verify VC
        </Button>
      </DialogActions>
    </Dialog>
  );
});

BoundDialog.displayName = "BoundDialog";
