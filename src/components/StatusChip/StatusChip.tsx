import { Chip } from "@mui/material";
import { memo } from "react";
import { useTranslation } from "react-i18next";

import { VerifyStatus } from "@/domain/models";

import { VerifyChipStyle } from "./constants.local";

type Props = { status: VerifyStatus };

export const StatusChip: React.FC<Props> = memo((props) => {
  const { t } = useTranslation("translation", {
    keyPrefix: "components.statusChip",
  });

  return (
    <Chip
      label={t(VerifyChipStyle[props.status].text)}
      color={VerifyChipStyle[props.status].color}
      variant={VerifyChipStyle[props.status].variant}
    />
  );
});

StatusChip.displayName = "StatusChip";
