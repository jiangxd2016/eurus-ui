

  "build:compts": "pnpm run gen:version &&  pnpm run stylelint:fix && esno scripts/build.ts compts",
  "build": "pnpm run clean && pnpm run gen:version &&  pnpm run stylelint:fix && esno scripts/build.ts all",
