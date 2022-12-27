// import * as CredentialHandlerPolyfill from "credential-handler-polyfill";
// import * as WebCredentialHandler from "web-credential-handler";

import { useState } from "react";
import { useTranslation } from "react-i18next";

import { InputDocumentCard } from "@/components/InputDocumentCard";
import { IssuerPageLauout, CardGridLayout } from "@/components/Layout";
import { InputDocumentCardList, MovieDocument } from "@/domain/constants";
import { BoundDialog } from "@/features/issue-bound-dialog";
import { UnboundDialog } from "@/features/issue-unbound-dialog";
import { useCredentialHandler } from "@/hooks";

export const Issuer = () => {
  useCredentialHandler();

  const { t } = useTranslation();

  const [openBound, setOpenBound] = useState(false);
  const [openUnbound, setOpenUnbound] = useState(false);

  const issueButtonHandler = async (isBound: boolean) => {
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
            onIssueClicked={() => issueButtonHandler(card.isBound)}
            key={index}
          />
        ))}
      </CardGridLayout>
      <BoundDialog
        open={openBound}
        closeHandler={() => setOpenBound(false)}
        inputDocument={MovieDocument}
      />
      <UnboundDialog
        open={openUnbound}
        closeHandler={() => setOpenUnbound(false)}
        inputDocument={MovieDocument}
      />
    </IssuerPageLauout>
  );
};
