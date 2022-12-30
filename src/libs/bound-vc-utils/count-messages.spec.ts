import { describe, expect, it } from "vitest";

import { MovieDocument } from "@/domain/constants";

import { countMessages } from "./count-messages";

describe("bound-vc-utils/count-messages", () => {
  it("Movie Input Document", async () => {
    const count = await countMessages(MovieDocument);
    expect(count).toEqual(56);
  });
});
