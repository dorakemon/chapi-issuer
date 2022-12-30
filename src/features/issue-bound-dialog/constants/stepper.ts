export type StepperType =
  | "AgreeCred"
  | "CreateCommitment"
  | "ReceiveCommitment"
  | "SaveVc"
  | "ViewFinal";

export const StepperList: StepperType[] = [
  "AgreeCred",
  "CreateCommitment",
  "ReceiveCommitment",
  "SaveVc",
  "ViewFinal",
];

export const StepperTitles = [
  "step.agreeCred",
  "step.createCommitment",
  "step.receiveCommitment",
  "step.saveVc",
  "step.viewFinal",
];

export const StepperInfo: Record<
  StepperType,
  {
    title: string;
    btnText: string;
    contentTextList?: string[];
  }
> = {
  AgreeCred: {
    title: "agreeCred.title",
    btnText: "agreeCred.btn",
    contentTextList: ["agreeCred.cont1", "agreeCred.cont2"],
  },
  CreateCommitment: {
    title: "createCommitment.title",
    btnText: "createCommitment.btn",
    contentTextList: ["createCommitment.cont1", "createCommitment.cont2"],
  },
  ReceiveCommitment: {
    title: "receiveCommitment.title",
    btnText: "receiveCommitment.btn",
    contentTextList: ["receiveCommitment.cont1", "receiveCommitment.cont2"],
  },
  SaveVc: {
    title: "saveVc.title",
    btnText: "saveVc.btn",
    contentTextList: ["saveVc.cont1", "saveVc.cont2"],
  },
  ViewFinal: {
    title: "viewFinal.title",
    btnText: "viewFinal.btn",
  },
};
