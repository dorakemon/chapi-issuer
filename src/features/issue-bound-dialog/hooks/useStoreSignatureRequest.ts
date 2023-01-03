import { useCallback, useState } from "react";

import { SignatureRequest, SignatureRequestInput } from "@/domain/models";

export const useStoreSignatureRequest = () => {
  const [storeSigReqResult, setStoreSigReqResult] =
    useState<SignatureRequest | null>(null);

  const initSigReqResult = useCallback(() => setStoreSigReqResult(null), []);

  const storeSigReqHandler = async (sigRequestInput: SignatureRequestInput) => {
    const webCredentialWrapper = new window.WebCredential(
      "CreateCommitmentRequest",
      sigRequestInput,
      {
        recommendedHandlerOrigins: ["https://chapi-wallet.web.app"],
      }
    );

    // Use Credential Handler API to store
    const result = await navigator.credentials.store(
      webCredentialWrapper as any
    );

    console.log("Result of receiving via store() request:", result);
    setStoreSigReqResult((result as any).data as SignatureRequest);
    return (result as any).data as SignatureRequest;
  };
  return { storeSigReqResult, storeSigReqHandler, initSigReqResult };
};
