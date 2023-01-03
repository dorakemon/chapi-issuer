import Editor, { useMonaco } from "@monaco-editor/react";
import "monaco-themes/themes/Monokai.json";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { memo, useEffect } from "react";

import { StatusChip } from "@/components/StatusChip";
import { VCType, VerifyStatus } from "@/domain/models";

type Props = {
  title: string;
  contentTextList?: string[];
  verifyStatus: VerifyStatus;
  vc: VCType;
  setVc: (vc: VCType) => void;
  setVcFormatError: (b: boolean) => void;
  btnText: string;
  btnDisabled: boolean;
  onClick: () => void;
  verifyBtnText: string;
  onVerifyClick: () => void;
};

export const SaveVc: React.FC<Props> = memo((props) => {
  const jsonString = JSON.stringify(props.vc, null, 2);

  const monaco = useMonaco();
  useEffect(() => {
    if (monaco) {
      console.log("here is the monaco isntance:", monaco);
      import("monaco-themes/themes/Monokai.json")
        .then((data) => {
          monaco.editor.defineTheme("monokai", data);
        })
        .then(() => monaco.editor.setTheme("monokai"));
    }
  }, [monaco]);

  const editorHandler = (data: string) => {
    try {
      const vc: VCType = JSON.parse(data);
      props.setVc(vc);
    } catch {
      props.setVcFormatError(true);
    }
  };

  return (
    <>
      <DialogTitle>
        <Grid container justifyContent="space-between">
          <Typography>{props.title}</Typography>
          <StatusChip status={props.verifyStatus} />
        </Grid>
      </DialogTitle>
      <DialogContent sx={{ cursor: "none" }}>
        {typeof props.contentTextList !== "undefined" &&
          props.contentTextList.map((text, index) => (
            <DialogContentText key={index}>{text}</DialogContentText>
          ))}
      </DialogContent>
      <DialogContent sx={{ mt: 0, pt: 0 }}>
        <Editor
          height="400px"
          defaultLanguage="json"
          value={jsonString ?? ""}
          onChange={(data) => editorHandler(data as string)}
          options={{
            lineNumbers: "off",
            minimap: {
              enabled: false,
            },
            contextmenu: false,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onVerifyClick} variant="outlined">
          {props.verifyBtnText}
        </Button>
        <Button
          onClick={props.onClick}
          variant="contained"
          disabled={props.btnDisabled}
        >
          {props.btnText}
        </Button>
      </DialogActions>
    </>
  );
});

SaveVc.displayName = "SaveVc";
