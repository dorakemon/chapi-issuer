import {
  Bls12381G2KeyPair,
  BoundBbsTermwiseSignature2022,
} from "@zkp-ld/jsonld-signatures-bbs";
import jsigs from "jsonld-signatures";

import { IssuerKeyObj, MovieDocument } from "@/domain/constants";
import { VCType } from "@/domain/models";
import {
  didkeyDocuments,
  overrideDocumentLoader,
} from "@/libs/document-loader";
import { base64ToUint8Array } from "@/libs/utils";

import { HolderKeyObj } from "../../../../test/fixtures";
import { countMessages } from "../count-messages";
import { createSignatureRequest } from "../signature-request";
import { unblindSignature } from "../unblind-signature";
import { bufferToTypedBytes } from "../utilities";

const issuerKey = await Bls12381G2KeyPair.fromJwk({
  id: IssuerKeyObj.didkey,
  controller: IssuerKeyObj.controller,
  publicKeyJwk: IssuerKeyObj.public,
  privateKeyJwk: IssuerKeyObj.private,
});
const proverKey = await Bls12381G2KeyPair.fromJwk({
  publicKeyJwk: HolderKeyObj.public,
  privateKeyJwk: HolderKeyObj.private,
});

export const SampleIssueVerifyBoundVc = async () => {
  const messageCount = await countMessages(MovieDocument);

  const sreqRes = await createSignatureRequest({
    issuerPublicKey: issuerKey,
    messageCount,
    proverSecretKey: proverKey,
    nonce: "nonce",
  });

  const issuedVC: VCType = await jsigs.sign(
    // NOTE: credentialのissuerをdidkeyのcontrollerに変更する
    // { ...MovieDocument, issuer: IssuerKeyObj.controller },
    { ...MovieDocument },
    {
      suite: new BoundBbsTermwiseSignature2022({
        key: issuerKey,
        holderSecretCommitment: base64ToUint8Array(sreqRes.commitment),
      }),
      purpose: new jsigs.purposes.AssertionProofPurpose(),
      documentLoader: overrideDocumentLoader([]),
      expansionMap: false,
      compactProof: false,
    }
  );
  const newSig = await unblindSignature({
    signature: issuedVC.proof.proofValue,
    blindingFactorStr: sreqRes.blindingFactor,
  });

  const overrideDocument = await didkeyDocuments([issuedVC]);
  const documentLoader = overrideDocumentLoader(overrideDocument);

  const result = await jsigs.verify(
    { ...issuedVC, proof: { ...issuedVC.proof, proofValue: newSig } },
    {
      suite: new BoundBbsTermwiseSignature2022({
        holderSecretKey: bufferToTypedBytes(
          new Uint8Array(proverKey.privateKeyBuffer as Uint8Array)
        ),
      }),
      purpose: new jsigs.purposes.AssertionProofPurpose(),
      documentLoader,
      expansionMap: false,
      compactProof: true,
    }
  );

  return result;
};
