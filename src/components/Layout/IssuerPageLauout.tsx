import { Container, Stack, Typography } from "@mui/material";
import { memo } from "react";

type Props = { title: string; children: React.ReactNode };

export const IssuerPageLauout: React.FC<Props> = memo((props) => (
  <Container>
    <Stack spacing={4} justifyContent="center" alignItems="center">
      <Typography variant="h4" fontWeight="700">
        {props.title}
      </Typography>
      {props.children}
    </Stack>
  </Container>
));

IssuerPageLauout.displayName = "IssuerPageLauout";
