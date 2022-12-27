export const StepperTitles = [
  "受け取るクレデンシャルの同意",
  "コミットメントの作成",
  "クレデンシャルの作成",
  "アンブラインド",
];

export const StepperList: {
  title: string;
  btnText: string;
  contentTextList?: string[];
}[] = [
  {
    title: "受け取るクレデンシャル",
    btnText: "同意",
    contentTextList: [
      "Issuerにより提示されたVCの中身です",
      "発行に同意をしますか?",
    ],
  },
  {
    title: "保存するVC",
    btnText: "VCの保存",
    contentTextList: [
      "Issuerにより作成されたVCを検証します",
      "VCをWalletに保存しますか?",
    ],
  },
  {
    title: "レスポンス",
    btnText: "閉じる",
  },
  {
    title: "レスポンス",
    btnText: "閉じる",
  },
];
