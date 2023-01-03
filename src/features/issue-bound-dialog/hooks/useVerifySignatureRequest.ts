import { Bls12381G2KeyPair } from "@zkp-ld/bls12381-key-pair";
import { useCallback, useState } from "react";

import { VerifyStatus } from "@/domain/models";
import {
  verifySignatureRequest,
  VerifySignatureRequetProps,
} from "@/libs/bound-vc-utils";

export const useVerifySignatureRequest = () => {
  const [sigRequestStatus, setSigRequestStatus] =
    useState<VerifyStatus>("unchecked");

  const initializeSigRequestStatus = useCallback(
    () => setSigRequestStatus("unchecked"),
    []
  );

  const verifySignatureRequestHandler = async (props: {
    commitment: string;
    proofOfHiddenMessages: string;
    challengeHash: string;
    publicKey: Bls12381G2KeyPair;
    nonce: string;
    messageCount: number;
  }) => {
    const request: VerifySignatureRequetProps = {
      commitment: props.commitment,
      proofOfHiddenMessages: props.proofOfHiddenMessages,
      challengeHash: props.challengeHash,
      messageCount: props.messageCount,
      publicKey: props.publicKey,
      nonce: props.nonce,
    };

    const verified = await verifySignatureRequest(request);
    setSigRequestStatus(verified ? "valid" : "invalid");
  };

  return {
    sigRequestStatus,
    verifySignatureRequestHandler,
    initializeSigRequestStatus,
  };
};
