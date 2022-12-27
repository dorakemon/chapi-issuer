import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { memo } from "react";
import { useTranslation } from "react-i18next";

type Props = { title: string; image: string; onIssueClicked: () => void };

export const InputDocumentCard: React.FC<Props> = memo((props) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ width: 300 }}>
      <CardMedia sx={{ height: 140 }} image={props.image} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={props.onIssueClicked}>
          {t("components.inputDocumentCard.button")}
        </Button>
      </CardActions>
    </Card>
  );
});

InputDocumentCard.displayName = "InputDocumentCard";
