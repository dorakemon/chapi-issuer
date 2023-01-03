import { useCallback, useState } from "react";

import { VCType } from "@/domain/models";

export const useStoreBoundVc = () => {
  const [storeVcResult, setStoreVcResult] = useState<Credential | null>(null);

  const initStoreVcResult = useCallback(() => setStoreVcResult(null), []);

  const storeVcHandler = async (vc: VCType, nonce: string) => {
    const webCredentialWrapper = new window.WebCredential(
      "BoundVerifiableCredential",
      { vc, nonce },
      {
        recommendedHandlerOrigins: ["https://chapi-wallet.web.app"],
      }
    );

    // Use Credential Handler API to store
    const result = await navigator.credentials.store(
      webCredentialWrapper as any
    );

    console.log("Result of receiving via store() request:", result);
    setStoreVcResult(result);
  };
  return { storeVcResult, storeVcHandler, initStoreVcResult };
};
