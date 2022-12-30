import { Button, DialogActions, DialogTitle } from "@mui/material";
import { memo } from "react";

type Props = {
  title: string;
  btnText: string;
  onClick: () => void;
};

export const ViewFinal: React.FC<Props> = memo((props) => {
  return (
    <>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogActions>
        <Button onClick={props.onClick} variant="contained">
          {props.btnText}
        </Button>
      </DialogActions>
    </>
  );
});

ViewFinal.displayName = "ViewFinal";
