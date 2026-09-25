# Architecture

The code has two layers.

## `src/domain/`

Pricing logic. Domain functions never throw. A function that can fail returns `Result<T>` from `src/domain/result.ts`. A function that can't fail returns its value directly.

Domain functions trust their arguments and don't validate them. Every value that reaches the domain has already passed the api layer.

## `src/api/`

The boundary. Every value from outside, such as a request or a stored discount code, is validated here, once. Invalid input becomes an `err` result. Api functions return `Result<T>` and never throw.
