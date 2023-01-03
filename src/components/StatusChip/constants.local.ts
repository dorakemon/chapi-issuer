import { VerifyStatus } from "@/domain/models";

export const VerifyChipStyle: Record<
  VerifyStatus,
  {
    text: string;
    color: "success" | "error" | "warning";
    variant: "filled" | "outlined";
  }
> = {
  valid: {
    text: "valid",
    color: "success",
    variant: "filled",
  },
  invalid: {
    text: "invalid",
    color: "error",
    variant: "filled",
  },
  unchecked: {
    text: "unchecked",
    color: "warning",
    variant: "outlined",
  },
};
