import { useCallback, useState } from "react";

import { VCType } from "@/domain/models";

export const useStoreUnboundVc = () => {
  const [storeResult, setStoreResult] = useState<Credential | null>(null);

  const initializeResult = useCallback(() => setStoreResult(null), []);

  const storeHandler = async (vc: VCType) => {
    const webCredentialWrapper = new window.WebCredential(
      // "VerifiableCredential",
      "VerifiablePresentation",
      {
        // type: "VerifiableCredential",
        type: "VerifiablePresentation",
        verifiableCredential: [vc],
      },
      {
        recommendedHandlerOrigins: ["https://chapi-wallet.web.app"],
      }
    );

    // Use Credential Handler API to store
    const result = await navigator.credentials.store(
      webCredentialWrapper as any
    );

    console.log("Result of receiving via store() request:", result);
    setStoreResult(result);
  };
  return { storeResult, storeHandler, initializeResult };
};
