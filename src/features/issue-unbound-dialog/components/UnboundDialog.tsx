import { Dialog, DialogTitle } from "@mui/material";
import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { CustomizedSteppers } from "@/components/Stepper";
import { InputDocument } from "@/domain/models";
import { useStepper } from "@/hooks";

import { StepperList, StepperTitles } from "../constants/stepper";
import { VerifyChipStyle } from "../constants/verify-status";
import { useIssueUnboundVc } from "../hooks/useIssueUnboundVc";
import { useStoreUnboundVc } from "../hooks/useStoreUnboundVc";
import { useVerifyUnboundVc } from "../hooks/useVerifyUnboundVc";

import { AgreeCredential } from "./steppers/AgreeCredential";
import { SaveVc } from "./steppers/SaveVc";
import { ViewFinal } from "./steppers/ViewFinal";

type Props = {
  open: boolean;
  closeHandler: () => void;
  inputDocument: InputDocument;
};

export const UnboundDialog: React.FC<Props> = memo((props) => {
  const { t } = useTranslation("translation", {
    keyPrefix: "features.issueUnbound",
  });

  const { activeStep, nextStep, initializeStep } = useStepper(
    StepperTitles.length
  );
  const {
    vc,
    setVc,
    vcFormatError,
    setVcFormatError,
    issueVcHandler,
    initializeVc,
  } = useIssueUnboundVc();
  const { verifyStatus, verifyVcHandler, initializeStatus } =
    useVerifyUnboundVc();
  const { storeResult, storeHandler, initializeResult } = useStoreUnboundVc();

  /** @description when vc is changed, verify status is unchecked  */
  useEffect(() => {
    initializeStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vc, setVcFormatError]);

  const closeHandler = () => {
    props.closeHandler();
    /** @description wait till dialog is closed */
    setTimeout(() => {
      initializeVc();
      initializeStatus();
      initializeResult();
      initializeStep();
    }, 500);
  };

  const buttonHandler = async () => {
    if (activeStep === 0) {
      await issueVcHandler(props.inputDocument);
      nextStep();
    } else if (activeStep === 1) {
      if (!vc) return;
      if (vcFormatError) return;
      await verifyVcHandler(vc);
      if (verifyStatus === "valid") {
        await storeHandler(vc);
        nextStep();
      }
    } else {
      closeHandler();
    }
  };

  return (
    <Dialog
      open={props.open}
      onClose={closeHandler}
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle>
        <CustomizedSteppers
          steps={StepperTitles.map((e) => t(e))}
          activeStep={activeStep}
        />
      </DialogTitle>
      {activeStep === 0 ? (
        <AgreeCredential
          title={t(StepperList[0].title)}
          contentTextList={StepperList[0].contentTextList?.map((e) => t(e))}
          inputDocument={props.inputDocument}
          btnText={t(StepperList[0].btnText)}
          onClick={buttonHandler}
        />
      ) : null}
      {activeStep === 1 && vc ? (
        <SaveVc
          title={t(StepperList[1].title)}
          contentTextList={StepperList[1].contentTextList?.map((e) => t(e))}
          vc={vc}
          setVc={setVc}
          setVcFormatError={setVcFormatError}
          chipText={t(VerifyChipStyle[verifyStatus].text)}
          chipColor={VerifyChipStyle[verifyStatus].color}
          chipVariant={VerifyChipStyle[verifyStatus].variant}
          btnText={t(StepperList[1].btnText)}
          btnDisabled={verifyStatus !== "valid"}
          onClick={buttonHandler}
          verifyBtnText={t("saveVc.verifyBtn")}
          onVerifyClick={() => verifyVcHandler(vc)}
        />
      ) : null}
      {activeStep === 2 ? (
        <ViewFinal
          title={
            storeResult !== null ? t("viewFinal.success") : t("viewFinal.fail")
          }
          btnText={t(StepperList[2].btnText)}
          onClick={buttonHandler}
        />
      ) : null}
    </Dialog>
  );
});

UnboundDialog.displayName = "UnboundDialog";
