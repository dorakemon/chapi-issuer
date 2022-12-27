import Editor, { useMonaco } from "@monaco-editor/react";
import "monaco-themes/themes/Monokai.json";
import {
  Button,
  Chip,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { memo, useEffect } from "react";

import { VCType } from "@/domain/models";

type Props = {
  title: string;
  contentTextList?: string[];
  chipText: string;
  chipColor: "info" | "success" | "warning" | "error";
  chipVariant: "filled" | "outlined";
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
          <Chip
            label={props.chipText}
            color={props.chipColor}
            variant={props.chipVariant}
          />
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
