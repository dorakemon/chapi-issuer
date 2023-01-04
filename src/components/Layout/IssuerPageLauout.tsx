import { Container, Stack, Typography } from "@mui/material";
import { memo } from "react";

type Props = { title: string; subtitle: string; children: React.ReactNode };

export const IssuerPageLauout: React.FC<Props> = memo((props) => (
  <Container>
    <Stack spacing={2} justifyContent="center" alignItems="center">
      <Typography variant="h4" fontWeight="700">
        {props.title}
      </Typography>
      <Typography
        variant="h6"
        fontWeight="400"
        fontStyle={{ color: "#666666" }}
      >
        {props.subtitle}
      </Typography>
      {props.children}
    </Stack>
  </Container>
));

IssuerPageLauout.displayName = "IssuerPageLauout";
