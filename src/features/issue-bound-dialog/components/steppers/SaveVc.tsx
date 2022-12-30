import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { memo } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokaiSublime } from "react-syntax-highlighter/dist/cjs/styles/hljs";

import { VCType } from "@/domain/models";

type Props = {
  title: string;
  contentTextList?: string[];
  vc: VCType;
  btnText: string;
  onClick: () => void;
};

export const SaveVc: React.FC<Props> = memo((props) => {
  const jsonString = JSON.stringify(props.vc, null, 2);

  return (
    <>
      <DialogTitle>
        <Grid container justifyContent="space-between">
          <Typography>{props.title}</Typography>
        </Grid>
      </DialogTitle>
      <DialogContent sx={{ cursor: "none" }}>
        {typeof props.contentTextList !== "undefined" &&
          props.contentTextList.map((text, index) => (
            <DialogContentText key={index}>{text}</DialogContentText>
          ))}
      </DialogContent>
      <DialogContent sx={{ mt: 0, pt: 0 }}>
        <SyntaxHighlighter language="json" style={monokaiSublime}>
          {jsonString}
        </SyntaxHighlighter>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClick} variant="contained">
          {props.btnText}
        </Button>
      </DialogActions>
    </>
  );
});

SaveVc.displayName = "SaveVc";
