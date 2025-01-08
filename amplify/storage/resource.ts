import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "yosse95ai-share",
  isDefault: false,
  access: (allow) => ({
    "share/*": [
      allow.authenticated.to(["read", "write", "delete"]),
    ]
  }),
});
