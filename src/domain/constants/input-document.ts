import { InputDocument } from "../models";

export const StudentCard: InputDocument = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://zkp-ld.org/bound-bbs-termwise-2022.jsonld",
    "https://schema.org",
  ],
  id: "http://example.org/credentials/4/1",
  type: ["VerifiableCredential", "StudentCard"],
  issuer:
    "did:key:z5TcF6FsaqqPiMfaPGFp5AArBhzTMmzEauNo2gGtnyHhNBpRpXcsuXqhVDLoR3LedGWQSuq4S4Gxr6A72kruEuGszgfkFwBxazMySkzU2ezKGNdeLmSRsmRhvXU3LTpfsuVCW9yQGoeZMNUaBeQJpLHEyV1zktiewNc1HiyDQyyH5j9ZSVpaY2HZnP5YHKJBeiUwd1pij#zUC7G3FC9wBGPyYnJLpqAQ3Vkr5hMoNBhuqokmWNsuuR3mARviEjnMZ2qwAErDSV6kMonh4Pu5pxmGwaJsESZPLbnUnqh4aRoT5kxYg34xTSnPbUjLrmoxiRbjhWsCNYvUFSPu9",
  issuanceDate: "2021-07-01T00:00:00Z",
  expirationDate: "2022-07-01T00:00:00Z",
  credentialSubject: {
    id: "did:example:b34AA2I0ZdwAACBDu",
    type: "Person",
    givenName: "Jane",
    familyName: "Doe",
    birthDate: "1990-12-31",
  },
};

export const DriverCard: InputDocument = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://zkp-ld.org/bound-bbs-termwise-2022.jsonld",
    "https://schema.org",
  ],
  id: "http://example.org/credentials/4/1",
  type: ["VerifiableCredential", "DriverLicense"],
  issuer:
    "did:key:z5TcF6FsaqqPiMfaPGFp5AArBhzTMmzEauNo2gGtnyHhNBpRpXcsuXqhVDLoR3LedGWQSuq4S4Gxr6A72kruEuGszgfkFwBxazMySkzU2ezKGNdeLmSRsmRhvXU3LTpfsuVCW9yQGoeZMNUaBeQJpLHEyV1zktiewNc1HiyDQyyH5j9ZSVpaY2HZnP5YHKJBeiUwd1pij#zUC7G3FC9wBGPyYnJLpqAQ3Vkr5hMoNBhuqokmWNsuuR3mARviEjnMZ2qwAErDSV6kMonh4Pu5pxmGwaJsESZPLbnUnqh4aRoT5kxYg34xTSnPbUjLrmoxiRbjhWsCNYvUFSPu9",
  issuanceDate: "2021-07-01T00:00:00Z",
  expirationDate: "2022-07-01T00:00:00Z",
  credentialSubject: {
    id: "did:example:b34AA2I0ZdwAACBDu",
    type: "Person",
    givenName: "Jane",
    familyName: "Doe",
    birthDate: "1990-12-31",
  },
};

export const MovieDocument: InputDocument = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://zkp-ld.org/bbs-termwise-2021.jsonld",
    "https://schema.org",
  ],
  id: "http://example.org/credentials/4/1",
  type: ["VerifiableCredential", "MovieTicket"],
  issuer:
    "did:key:z5TcF6FsaqqPiMfaPGFp5AArBhzTMmzEauNo2gGtnyHhNBpRpXcsuXqhVDLoR3LedGWQSuq4S4Gxr6A72kruEuGszgfkFwBxazMySkzU2ezKGNdeLmSRsmRhvXU3LTpfsuVCW9yQGoeZMNUaBeQJpLHEyV1zktiewNc1HiyDQyyH5j9ZSVpaY2HZnP5YHKJBeiUwd1pij#zUC7G3FC9wBGPyYnJLpqAQ3Vkr5hMoNBhuqokmWNsuuR3mARviEjnMZ2qwAErDSV6kMonh4Pu5pxmGwaJsESZPLbnUnqh4aRoT5kxYg34xTSnPbUjLrmoxiRbjhWsCNYvUFSPu9",
  issuanceDate: "2021-07-01T00:00:00Z",
  expirationDate: "2022-07-01T00:00:00Z",
  credentialSubject: {
    id: "did:example:b34AA2I0ZdwAACBDu",
    type: "Ticket",
    givenName: "Jane",
    familyName: "Doe",
    birthDate: "1990-12-31",
  },
};

export const VoucherDocument: InputDocument = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://zkp-ld.org/bbs-termwise-2021.jsonld",
    "https://schema.org",
  ],
  id: "http://example.org/credentials/4/1",
  type: ["VerifiableCredential", "Voucher"],
  issuer:
    "did:key:z5TcF6FsaqqPiMfaPGFp5AArBhzTMmzEauNo2gGtnyHhNBpRpXcsuXqhVDLoR3LedGWQSuq4S4Gxr6A72kruEuGszgfkFwBxazMySkzU2ezKGNdeLmSRsmRhvXU3LTpfsuVCW9yQGoeZMNUaBeQJpLHEyV1zktiewNc1HiyDQyyH5j9ZSVpaY2HZnP5YHKJBeiUwd1pij#zUC7G3FC9wBGPyYnJLpqAQ3Vkr5hMoNBhuqokmWNsuuR3mARviEjnMZ2qwAErDSV6kMonh4Pu5pxmGwaJsESZPLbnUnqh4aRoT5kxYg34xTSnPbUjLrmoxiRbjhWsCNYvUFSPu9",
  issuanceDate: "2021-07-01T00:00:00Z",
  expirationDate: "2022-07-01T00:00:00Z",
  credentialSubject: {
    id: "did:example:b34AA2I0ZdwAACBDu",
    type: "Voucher",
    discount: "30%",
  },
};
