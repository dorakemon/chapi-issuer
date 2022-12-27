import { Box, Grid } from "@mui/material";
import { memo } from "react";

type Props = { children: React.ReactNode[] };

export const CardGridLayout: React.FC<Props> = memo((props) => (
  <Grid
    container
    spacing={4}
    alignItems="center"
    justifyContent="center"
    maxWidth={700}
  >
    {props.children.map((child, index) => (
      <Grid item key={index} md={6}>
        <Box display="flex" justifyContent="center">
          {child}
        </Box>
      </Grid>
    ))}
  </Grid>
));

CardGridLayout.displayName = "CardGridLayout";
