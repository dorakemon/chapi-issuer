import { unblindBoundedBlsSignature } from "@zkp-ld/bbs-signatures";

import { base64ToUint8Array, uint8ArrayToBase64 } from "../utils/uint8-base64";

type UnblindProps = { signature: string; blindingFactorStr: string };

/**
 * Unblind blinded signature
 * @param param0
 * @returns
 */
export const unblindSignature = async ({
  signature,
  blindingFactorStr,
}: UnblindProps) => {
  const unblindedSignature = await unblindBoundedBlsSignature({
    signature: base64ToUint8Array(signature),
    blindingFactor: base64ToUint8Array(blindingFactorStr),
  });
  return uint8ArrayToBase64(unblindedSignature);
};
