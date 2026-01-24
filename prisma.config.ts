import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: "postgresql://postgres:postgres@127.0.0.1:5432/food_rescue?schema=public",
  },
});
