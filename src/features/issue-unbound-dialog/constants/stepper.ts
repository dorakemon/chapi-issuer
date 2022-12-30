export type StepperType = "AgreeCred" | "SaveVc" | "ViewFinal";

export const StepperList: StepperType[] = ["AgreeCred", "SaveVc", "ViewFinal"];

export const StepperTitles = [
  "step.agreeCred",
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
