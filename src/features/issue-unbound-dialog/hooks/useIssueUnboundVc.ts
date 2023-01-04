import { Bls12381G2KeyPair } from "@zkp-ld/bls12381-key-pair";
import { BbsTermwiseSignature2021 } from "@zkp-ld/jsonld-signatures-bbs";
import jsigs from "jsonld-signatures";
import { useCallback, useState } from "react";

import { IssuerKeyObj } from "@/domain/constants";
import { InputDocument, VCType } from "@/domain/models";
import { overrideDocumentLoader } from "@/libs/document-loader";

export const useIssueUnboundVc = () => {
  const [vc, setVc] = useState<VCType | null>(null);

  /** @description VC is invalid Json Format */
  const [vcFormatError, setVcFormatError] = useState(false);

  const initializeVc = useCallback(() => setVc(null), []);

  const issueVcHandler = async (inputDocument: InputDocument) => {
    const keyObj = await Bls12381G2KeyPair.fromJwk({
      id: IssuerKeyObj.didkey,
      controller: IssuerKeyObj.controller,
      publicKeyJwk: IssuerKeyObj.public,
      privateKeyJwk: IssuerKeyObj.private,
    });
    const issuedVC: VCType = await jsigs.sign(
      // NOTE: credentialのissuerをdidkeyのcontrollerに変更する
      { ...inputDocument },
      {
        suite: new BbsTermwiseSignature2021({ key: keyObj }),
        purpose: new jsigs.purposes.AssertionProofPurpose(),
        documentLoader: overrideDocumentLoader([]),
        expansionMap: false,
        compactProof: true,
      }
    );
    setVc(issuedVC);
  };

  return {
    vc,
    setVc,
    issueVcHandler,
    initializeVc,
    vcFormatError,
    setVcFormatError,
  };
};
