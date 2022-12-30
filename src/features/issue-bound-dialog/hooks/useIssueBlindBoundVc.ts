import { Bls12381G2KeyPair } from "@zkp-ld/bls12381-key-pair";
import { BoundBbsTermwiseSignature2022 } from "@zkp-ld/jsonld-signatures-bbs";
import jsigs from "jsonld-signatures";
import { useCallback, useState } from "react";

import { IssuerKeyObj } from "@/domain/constants";
import { InputDocument, VCType } from "@/domain/models";
import { overrideDocumentLoader } from "@/libs/document-loader";
import { base64ToUint8Array } from "@/libs/utils/uint8-base64";

export const useIssueBlindUnboundVc = () => {
  const [blindVc, setBlindVc] = useState<VCType | null>(null);

  const initializeBlindVc = useCallback(() => setBlindVc(null), []);

  const issueBlindVcHandler = async (
    inputDocument: InputDocument,
    commitmentStr: string
  ) => {
    const keyObj = await Bls12381G2KeyPair.fromJwk({
      id: IssuerKeyObj.didkey,
      controller: IssuerKeyObj.controller,
      publicKeyJwk: IssuerKeyObj.public,
      privateKeyJwk: IssuerKeyObj.private,
    });
    const commitment = base64ToUint8Array(commitmentStr);
    const issuedVC: VCType = await jsigs.sign(
      // NOTE: credentialのissuerをdidkeyのcontrollerに変更する
      { ...inputDocument, issuer: keyObj.controller },
      {
        suite: new BoundBbsTermwiseSignature2022({
          key: keyObj,
          holderSecretCommitment: commitment,
        }),
        purpose: new jsigs.purposes.AssertionProofPurpose(),
        documentLoader: overrideDocumentLoader([]),
        expansionMap: undefined,
        compactProof: false,
      }
    );
    setBlindVc(issuedVC);
  };

  return {
    blindVc,
    setBlindVc,
    issueBlindVcHandler,
    initializeBlindVc,
  };
};
