import { useCallback, useState } from "react";

import { InputDocument, SignatureRequestInput } from "@/domain/models";
import { countMessages } from "@/libs/bound-vc-utils";
import { randomString } from "@/libs/utils";

export const useCreateSignatureRequestInput = () => {
  const [sigRequestInput, setSigRequestInput] =
    useState<SignatureRequestInput | null>(null);

  const initializeSigRequestInput = useCallback(
    () => setSigRequestInput(null),
    []
  );

  const createSignatureRequestInputHandler = async (
    doc: InputDocument,
    issuerDidKey: string
  ) => {
    setSigRequestInput({
      issuerDidKey,
      messageCount: await countMessages(doc),
      nonce: randomString(50),
    });
  };

  return {
    sigRequestInput,
    createSignatureRequestInputHandler,
    initializeSigRequestInput,
  };
};
