import { customLoader } from './customDocumentLoader';

import { overrideDocumentLoader } from '.';

jest.mock('./customDocumentLoader', () => {
  const originalModule = jest.requireActual('./customDocumentLoader');
  return {
    __esModule: true,
    ...originalModule,
    customLoader: jest.fn((args) => args),
  };
});

describe('documentLoader', () => {
  it('args of overrideDocumentLoader id equal to diddoc', () => {
    // customLoaderはoverrideDocumentLoaderの中で呼ばれる
    const mockModule = customLoader as jest.Mocked<typeof customLoader>;

    const did = 'did:example:issuer1#bbs-bls-key1';
    const diddoc = {
      '@context': 'https://w3id.org/security/v2',
      id: 'did:example:issuer1#bbs-bls-key1',
      type: 'Bls12381G2Key2020',
      controller: 'did:example:issuer1',
      publicKeyBase58: '123',
    };

    const validatedDocs = overrideDocumentLoader([[did, diddoc]]);

    // MOCKした関数が1回呼ばれる
    expect(mockModule).toBeCalledTimes(1);
    // MOCKした関数の引数のvalidatedDocsが正常に上書きされている
    expect(validatedDocs.get('did:example:issuer1#bbs-bls-key1')).toBe(diddoc);
  });
});
