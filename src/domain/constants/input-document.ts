import { InputDocument } from "../models";

export const MovieDocument: InputDocument = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://zkp-ld.org/bbs-termwise-2021.jsonld",
    "https://schema.org",
  ],
  id: "http://example.org/credentials/4/1",
  type: "VerifiableCredential",
  issuer: "did:example:issuer4",
  issuanceDate: "2021-07-01T00:00:00Z",
  expirationDate: "2022-07-01T00:00:00Z",
  credentialSubject: {
    id: "did:example:holder2",
    type: "Person",
    givenName: "Jane",
    familyName: "Doe",
    birthDate: "1990-12-31",
    knows: {
      id: "did:example:holder1",
    },
  },
};
