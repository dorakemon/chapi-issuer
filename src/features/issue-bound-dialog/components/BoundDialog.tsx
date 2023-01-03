import { Dialog, DialogTitle } from "@mui/material";
import { Bls12381G2KeyPair } from "@zkp-ld/bls12381-key-pair";
import { memo } from "react";
import { useTranslation } from "react-i18next";

import { CustomizedSteppers } from "@/components/Stepper";
import { IssuerKeyObj } from "@/domain/constants";
import { InputDocument } from "@/domain/models";
import { useStepper } from "@/hooks";

import { StepperInfo, StepperList, StepperTitles } from "../constants/stepper";
import { useCreateSignatureRequestInput } from "../hooks/useCreateSignatureRequestInput";
import { useIssueBlindUnboundVc } from "../hooks/useIssueBlindBoundVc";
import { useStoreBoundVc } from "../hooks/useStoreBoundVc";
import { useStoreSignatureRequest } from "../hooks/useStoreSignatureRequest";
import { useVerifySignatureRequest } from "../hooks/useVerifySignatureRequest";

import { AgreeCredential } from "./steppers/AgreeCredential";
import { CreateCommitment } from "./steppers/CreateCommitment";
import { ReceiveCommitment } from "./steppers/ReceiveCommitment";
import { SaveVc } from "./steppers/SaveVc";
import { ViewFinal } from "./steppers/ViewFinal";

const issuerKey = await Bls12381G2KeyPair.fromJwk({
  id: IssuerKeyObj.didkey,
  controller: IssuerKeyObj.controller,
  publicKeyJwk: IssuerKeyObj.public,
  privateKeyJwk: IssuerKeyObj.private,
});

type Props = {
  open: boolean;
  closeHandler: () => void;
  inputDocument: InputDocument;
};

export const BoundDialog: React.FC<Props> = memo((props) => {
  const { t } = useTranslation("translation", {
    keyPrefix: "features.issueBound",
  });

  const { activeStep, activeStepIndex, nextStep, initializeStep } =
    useStepper(StepperList);

  const {
    sigRequestInput,
    createSignatureRequestInputHandler,
    initializeSigRequestInput,
  } = useCreateSignatureRequestInput();
  const { storeSigReqResult, storeSigReqHandler, initSigReqResult } =
    useStoreSignatureRequest();
  const { blindVc, issueBlindVcHandler } = useIssueBlindUnboundVc();
  const { sigRequestStatus, verifySignatureRequestHandler } =
    useVerifySignatureRequest();
  const { storeVcHandler } = useStoreBoundVc();

  const closeHandler = () => {
    props.closeHandler();
    /** @description wait till dialog is closed */
    setTimeout(() => {
      initializeSigRequestInput();
      initSigReqResult();
      initializeStep();
    }, 500);
  };

  const buttonHandler = async () => {
    if (activeStep === "AgreeCred") {
      await createSignatureRequestInputHandler(
        props.inputDocument,
        IssuerKeyObj.didkey
      );
      nextStep();
    } else if (activeStep === "CreateCommitment") {
      if (!sigRequestInput) return;
      const _sigReqest = await storeSigReqHandler(sigRequestInput);
      await verifySignatureRequestHandler({
        ..._sigReqest,
        publicKey: issuerKey,
        nonce: sigRequestInput.nonce,
        messageCount: sigRequestInput.messageCount,
      });
      nextStep();
    } else if (activeStep === "ReceiveCommitment") {
      if (!sigRequestInput) return;
      if (!storeSigReqResult) return;
      await issueBlindVcHandler(
        props.inputDocument,
        storeSigReqResult.commitment
      );
      nextStep();
    } else if (activeStep === "SaveVc") {
      if (!sigRequestInput) return;
      if (!blindVc) return;
      await storeVcHandler(blindVc, sigRequestInput.nonce);
      nextStep();
    } else {
      closeHandler();
    }
  };

  return (
    <Dialog
      open={props.open}
      onClose={closeHandler}
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle>
        <CustomizedSteppers
          steps={StepperTitles.map((e) => t(e))}
          activeStep={activeStepIndex}
        />
      </DialogTitle>
      {activeStep === "AgreeCred" ? (
        <AgreeCredential
          title={t(StepperInfo[activeStep].title)}
          contentTextList={StepperInfo[activeStep].contentTextList?.map((e) =>
            t(e)
          )}
          inputDocument={props.inputDocument}
          btnText={t(StepperInfo[activeStep].btnText)}
          onClick={buttonHandler}
        />
      ) : null}
      {activeStep === "CreateCommitment" && sigRequestInput ? (
        <CreateCommitment
          title={t(StepperInfo[activeStep].title)}
          contentTextList={StepperInfo[activeStep].contentTextList?.map((e) =>
            t(e)
          )}
          signatureRequestInput={sigRequestInput}
          btnText={t(StepperInfo[activeStep].btnText)}
          onClick={buttonHandler}
        />
      ) : null}
      {activeStep === "ReceiveCommitment" && storeSigReqResult ? (
        <ReceiveCommitment
          title={t(StepperInfo[activeStep].title)}
          contentTextList={StepperInfo[activeStep].contentTextList?.map((e) =>
            t(e)
          )}
          signatureRequest={storeSigReqResult}
          verifyStatus={sigRequestStatus}
          btnText={t(StepperInfo[activeStep].btnText)}
          onClick={buttonHandler}
        />
      ) : null}
      {activeStep === "SaveVc" && blindVc ? (
        <SaveVc
          title={t(StepperInfo[activeStep].title)}
          contentTextList={StepperInfo[activeStep].contentTextList?.map((e) =>
            t(e)
          )}
          vc={blindVc}
          btnText={t(StepperInfo[activeStep].btnText)}
          onClick={buttonHandler}
        />
      ) : null}
      {activeStep === "ViewFinal" ? (
        <ViewFinal
          title={
            "仮"
            // storeResult !== null ? t("viewFinal.success") : t("viewFinal.fail")
          }
          btnText={t(StepperInfo[activeStep].btnText)}
          onClick={buttonHandler}
        />
      ) : null}
    </Dialog>
  );
});

BoundDialog.displayName = "BoundDialog";
