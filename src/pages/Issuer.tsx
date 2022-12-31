// import * as CredentialHandlerPolyfill from "credential-handler-polyfill";
// import * as WebCredentialHandler from "web-credential-handler";

import { lazy, useState } from "react";
import { useTranslation } from "react-i18next";

import { InputDocumentCard } from "@/components/InputDocumentCard";
import { IssuerPageLauout, CardGridLayout } from "@/components/Layout";
import { InputDocumentCardList, MovieDocument } from "@/domain/constants";
import { InputDocument } from "@/domain/models";
import { useCredentialHandler } from "@/hooks";

const BoundDialog = lazy(() => import("@/features/issue-bound-dialog"));
const UnboundDialog = lazy(() => import("@/features/issue-unbound-dialog"));

export const Issuer = () => {
  useCredentialHandler();

  const { t } = useTranslation();

  const [openBound, setOpenBound] = useState(false);
  const [openUnbound, setOpenUnbound] = useState(false);
  const [inputDoc, setInputDoc] = useState(MovieDocument);

  const issueButtonHandler = async (
    isBound: boolean,
    inputDoc: InputDocument
  ) => {
    setInputDoc(inputDoc);
    if (isBound) {
      setOpenBound(true);
    } else {
      setOpenUnbound(true);
    }
  };

  return (
    <IssuerPageLauout title={t("pages.issuer.title")}>
      <CardGridLayout>
        {InputDocumentCardList.map((card, index) => (
          <InputDocumentCard
            title={t(card.title)}
            image={card.image}
            onIssueClicked={() =>
              issueButtonHandler(card.isBound, card.inputDoc)
            }
            key={index}
          />
        ))}
      </CardGridLayout>
      <BoundDialog
        open={openBound}
        closeHandler={() => setOpenBound(false)}
        inputDocument={inputDoc}
      />
      <UnboundDialog
        open={openUnbound}
        closeHandler={() => setOpenUnbound(false)}
        inputDocument={inputDoc}
      />
    </IssuerPageLauout>
  );
};
