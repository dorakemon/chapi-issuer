import * as CredentialHandlerPolyfill from "credential-handler-polyfill";
import { useEffect } from "react";

import { MEDIATOR } from "@/config";

export const useCredentialHandler = () => {
  useEffect(() => {
    CredentialHandlerPolyfill.loadOnce(MEDIATOR)
      .then(console.log("Polyfill loaded."))
      .catch((e: Error) => console.error("Error loading polyfill:", e));
  }, []);
};
