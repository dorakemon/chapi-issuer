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

import { SignatureRequestInput } from "@/domain/models";

type Props = {
  title: string;
  contentTextList?: string[];
  signatureRequestInput: SignatureRequestInput;
  btnText: string;
  onClick: () => void;
};

export const CreateCommitment: React.FC<Props> = memo((props) => {
  const jsonString = JSON.stringify(props.signatureRequestInput, null, 2);

  return (
    <>
      <DialogTitle>
        <Grid container justifyContent="space-between">
          <Typography>{props.title}</Typography>
        </Grid>
      </DialogTitle>
      <DialogContent sx={{ height: "65px" }}>
        {typeof props.contentTextList !== "undefined" &&
          props.contentTextList.map((text, index) => (
            <DialogContentText key={index}>{text}</DialogContentText>
          ))}
      </DialogContent>
      <DialogContent>
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

CreateCommitment.displayName = "CreateCommitment";
