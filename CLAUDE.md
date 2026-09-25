# shop-pricing

A small pricing module for a web shop, in TypeScript.

## Build

Run `yarn install` once, then `yarn build`. Every change must build green.

## Rules

- Amounts are always integer öre (`Ore` in `src/domain/money.ts`), never floating point. Round down to whole öre wherever a calculation divides.
- Layering and error handling follow `docs/architecture.md`. Read it before changing anything in `src/`.
