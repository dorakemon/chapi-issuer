import { Bls12381G2KeyPair } from "@zkp-ld/bls12381-key-pair";
import { useState } from "react";

import { IssuerKeyObj, MovieDocument } from "@/domain/constants";
import { SignatureRequest } from "@/domain/models";
import {
  countMessages,
  verifySignatureRequest,
  VerifySignatureRequetProps,
} from "@/libs/bound-vc-utils";

export const useVerifySignatureRequest = () => {
  const [sigRequest, setSigRequest] = useState<SignatureRequest | null>(null);

  const verifySignatureRequestHandler = async (props: {
    commitment: string;
    proofOfHiddenMessages: string;
    challengeHash: string;
    // publicKey: Bls12381G2KeyPair;
    // nonce: string;
  }) => {
    const messageCount = await countMessages(MovieDocument);
    const issuerPublicKey = await Bls12381G2KeyPair.fromJwk({
      publicKeyJwk: IssuerKeyObj.public,
    });

    const request: VerifySignatureRequetProps = {
      commitment: props.commitment,
      proofOfHiddenMessages: props.proofOfHiddenMessages,
      challengeHash: props.challengeHash,
      messageCount,
      publicKey: issuerPublicKey,
      nonce: "random-nonce",
    };

    const verified = await verifySignatureRequest(request);
    // setSigRequest(signatureRequest);
    console.log(verified);
  };

  return { sigRequest, setSigRequest, verifySignatureRequestHandler };
};
