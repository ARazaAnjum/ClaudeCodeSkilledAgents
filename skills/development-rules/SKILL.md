---
name: development-rules
description: Base development philosophy, code style, naming conventions, and engineering standards. Apply these rules when writing any code.
user-invocable: false
---

# Development Rules

Apply these conventions and standards when writing code.

## Development Philosophy

- Write clean, maintainable, and scalable code
- Follow SOLID principles
- Prefer functional and declarative programming patterns over imperative
- Emphasize type safety and static analysis
- Practice component-driven development
- Focus on readability over premature performance optimization
- Fully implement all requested functionality — leave NO todos, placeholders, or missing pieces
- Include all required imports and ensure proper naming of key components

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

## Documentation

- Use JSDoc for documentation
- Document all public functions, classes, methods, and interfaces
- Add examples when appropriate
- Use complete sentences with proper punctuation

## Security

- Implement input sanitization to prevent XSS attacks
- Use DOMPurify for sanitizing HTML content
- Use proper authentication methods
- Never commit secrets or API keys to version control
