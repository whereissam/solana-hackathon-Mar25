
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "../schema/graphql/*.graphql",
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        maybeValue: 'T | undefined | null',
        inputMaybeValue: 'T | undefined'
      }
    },
  }
};

export default config;
