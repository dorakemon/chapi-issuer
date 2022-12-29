import { Bls12381G2KeyPair } from "@zkp-ld/bls12381-key-pair";
import { useState } from "react";

import { IssuerKeyObj, MovieDocument } from "@/domain/constants";
import { SignatureRequest } from "@/domain/models";
import { countMessages, createSignatureRequest } from "@/libs/bound-vc-utils";

import { HolderKeyObj } from "../../../../test/fixtures";

export const useCreateSignatureRequest = () => {
  const [sigRequest, setSigRequest] = useState<SignatureRequest | null>(null);

  const createSignatureRequestHandler = async () => {
    const messageCount = await countMessages(MovieDocument);

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
      messageCount,
      nonce: "random-nonce",
    });
    setSigRequest(signatureRequest);
  };

  return { sigRequest, setSigRequest, createSignatureRequestHandler };
};
