import { Bls12381G2KeyPair } from "@zkp-ld/bls12381-key-pair";
import { describe, expect, it } from "vitest";

import { IssuerKeyObj } from "@/domain/constants";

import { HolderKeyObj } from "../../../test/fixtures";

import {
  createSignatureRequest,
  verifySignatureRequest,
} from "./signature-request";

describe("bound-vc-utils/signature-request", () => {
  it("create signature request", async () => {
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
      messageCount: 3,
      nonce: "random-nonce",
    });
    expect(signatureRequest).toBeDefined();
  });

  it("verify signature request", async () => {
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
      messageCount: 3,
      nonce: "random-nonce",
    });
    expect(signatureRequest).toBeDefined();
    const verified = await verifySignatureRequest({
      commitment: signatureRequest.commitment,
      proofOfHiddenMessages: signatureRequest.proofOfHiddenMessages,
      challengeHash: signatureRequest.challengeHash,
      messageCount: 3,
      publicKey: issuerPublicKey,
      nonce: "random-nonce",
    });
    expect(verified).toBeTruthy();
  });
});
