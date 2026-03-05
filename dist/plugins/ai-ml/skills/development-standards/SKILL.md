---
name: development-standards
description: Universal development philosophy, code style, naming conventions, engineering standards, and coding best practices. Background context applied automatically to all code generation tasks.
user-invocable: false
---

# Development Standards

Apply these conventions and standards when writing any code.

## Development Philosophy

- Write clean, maintainable, and scalable code
- Follow SOLID principles
- Prefer functional and declarative programming patterns over imperative
- Emphasize type safety and static analysis
- Practice component-driven development
- Focus on readability over premature performance optimization
- Fully implement all requested functionality — leave NO todos, placeholders, or missing pieces
- Include all required imports and ensure proper naming of key components

## Code Quality Principles

- **Readability First** — Code is read more than written. Self-documenting code preferred over comments.
- **KISS** — Simplest solution that works. Avoid over-engineering.
- **DRY** — Extract common logic into functions. Create reusable components.
- **YAGNI** — Don't build features before they're needed. Start simple, refactor when needed.

## Code Style

- Use tabs for indentation
- Use single quotes for strings (except to avoid escaping)
- Omit semicolons (unless required for disambiguation)
- Eliminate unused variables
- Add space after keywords and before function declaration parentheses
- Always use strict equality (`===`) instead of loose equality (`==`)
- Space infix operators, add space after commas
- Keep else statements on the same line as closing curly braces
- Use curly braces for multi-line if statements
- Always handle error parameters in callbacks
- Limit line length to 80 characters
- Use trailing commas in multiline object/array literals

## Naming Conventions

- **PascalCase** for: Components, Type definitions, Interfaces
- **kebab-case** for: Directory names (e.g., `components/auth-wizard`), File names (e.g., `user-profile.tsx`)
- **camelCase** for: Variables, Functions, Methods, Hooks, Properties, Props
- **UPPERCASE** for: Environment variables, Constants, Global configurations
- Prefix event handlers with `handle`: `handleClick`, `handleSubmit`
- Prefix boolean variables with verbs: `isLoading`, `hasError`, `canSubmit`
- Prefix custom hooks with `use`: `useAuth`, `useForm`
- Use complete words over abbreviations except for: `err`, `req`, `res`, `props`, `ref`

## Immutability Pattern

- Always use spread operator for updates: `{ ...obj, key: value }`, `[...arr, item]`
- Never mutate objects or arrays directly

## Error Handling

- Use comprehensive try/catch with meaningful error messages
- Include HTTP status codes in error responses
- Don't wrap everything in try-catch without thought — handle errors where they matter
- Don't create side effects without mentioning them

## Async/Await Best Practices

- Use `Promise.all()` for parallel execution when possible
- Avoid sequential awaits when operations are independent

## Type Safety

- Define proper interfaces and types — avoid `any`
- Use union types for constrained values: `'active' | 'resolved' | 'closed'`
- Type function parameters and return values

## Documentation

- Use JSDoc for public functions, classes, methods, and interfaces
- Add examples when appropriate
- Comment WHY, not WHAT — explain reasoning, not obvious behavior

## Code Smell Detection

- **Long functions** — Split functions > 50 lines into smaller ones
- **Deep nesting** — Use early returns instead of 5+ levels of nesting
- **Magic numbers** — Use named constants (`MAX_RETRIES`, `DEBOUNCE_DELAY_MS`)
- **Files over 1600 lines** — Flag and split

## Engineering Standards

### Testing
- Follow AAA pattern: Arrange, Act, Assert
- Use descriptive test names: `'returns empty array when no markets match query'`
- Never use vague names: `'works'`, `'test search'`

### Security
- Implement input sanitization to prevent XSS attacks
- Use DOMPurify for sanitizing HTML content
- Use proper authentication methods
- Never commit secrets or API keys to version control

### Linting & Formatting
- Enforce formatting with Prettier and Stylelint
- Require zero lint errors before merge
- Use pre-commit hooks for auto-lint/format

### CI/CD
- All PRs must pass CI (type-check, lint, build, test)
- Require descriptive PR titles, summaries, and linked issues

### Dependencies
- Evaluate new dependencies for bundle size and security
- Run `npm audit`/`yarn audit` as part of CI
- Remove deprecated or vulnerable packages

### Work Process
- Understand the system before writing code — list files, detect patterns
- Challenge vague requests — identify inputs, outputs, constraints
- Bullet your plan before execution: what, why, expected changes
- Think about maintainability, usability, scalability
- Your work isn't done until the system is stable
