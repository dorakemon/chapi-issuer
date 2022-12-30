import { Bls12381G2KeyPair } from "@zkp-ld/bls12381-key-pair";
import { useCallback, useState } from "react";

import { IssuerKeyObj } from "@/domain/constants";
import { SignatureRequest, SignatureRequestInput } from "@/domain/models";
import { createSignatureRequest } from "@/libs/bound-vc-utils";

import { HolderKeyObj } from "../../../../test/fixtures";

export const useCreateSignatureRequest = () => {
  const [sigRequest, setSigRequest] = useState<SignatureRequest | null>(null);

  const initializeSigRequest = useCallback(() => setSigRequest(null), []);

  const createSignatureRequestHandler = async (
    props: SignatureRequestInput
  ) => {
    // TODO: resolve didkey
    const issuerPublicKey = await Bls12381G2KeyPair.fromJwk({
      publicKeyJwk: IssuerKeyObj.public,
    });
    const proverSecretKey = await Bls12381G2KeyPair.fromJwk({
      publicKeyJwk: HolderKeyObj.public,
      privateKeyJwk: HolderKeyObj.private,
    });
    const signatureRequest = await createSignatureRequest({
      issuerPublicKey,
      proverSecretKey,
      messageCount: props.messageCount,
      nonce: props.nonce,
    });
    setSigRequest(signatureRequest);
  };

  return {
    sigRequest,
    setSigRequest,
    createSignatureRequestHandler,
    initializeSigRequest,
  };
};
