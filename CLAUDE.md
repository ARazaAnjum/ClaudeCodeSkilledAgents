# Project Intelligence

This project uses **AI Workflow Skills** — a curated set of specialized AI skill definitions and process files to guide Claude in writing production-grade code.

## How Skills Work

The `skills/` directory contains skill folders. Each skill has:
- `SKILL.md` — the main skill definition (role, triggers, workflow, constraints, output templates)
- `references/` — supporting documentation, patterns, and code examples

Before working on a task, **always check `skills/` for a matching skill**. Read the full `SKILL.md` and relevant references before writing any code.

### Skill Matching

Each `SKILL.md` has YAML frontmatter with `triggers` — keywords that indicate when to use that skill. Match the user's request against these triggers:

| User asks about... | Use skill |
|---|---|
| React, hooks, JSX, components | `skills/react-expert/` |
| Vue, Composition API, Pinia | `skills/vue-expert/` |
| Next.js, App Router, Server Components | `skills/nextjs-developer/` |
| Python, type hints, async | `skills/python-pro/` |
| FastAPI, Pydantic, async API | `skills/fastapi-expert/` |
| Django, DRF, ORM | `skills/django-expert/` |
| Node.js, Express, NestJS | `skills/nestjs-expert/` |
| TypeScript, advanced types | `skills/typescript-pro/` |
| Testing, TDD, test suites | `skills/test-master/` |
| Database, SQL, queries | `skills/database-optimizer/` |
| PostgreSQL | `skills/postgres-pro/` |
| Docker, CI/CD, deployment | `skills/devops-engineer/` |
| Kubernetes, Helm | `skills/kubernetes-specialist/` |
| AWS, GCP, Azure, cloud | `skills/cloud-architect/` |
| REST API, GraphQL, OpenAPI | `skills/api-designer/` |
| Architecture, system design | `skills/architecture-designer/` |
| Code review, PR review | `skills/code-reviewer/` |
| Security, vulnerabilities | `skills/security-reviewer/` |
| Debugging, errors, logs | `skills/debugging-wizard/` |

If the user's task spans multiple domains, read multiple skills. Prioritize the most specific skill first.

### Using a Skill

When you identify a matching skill:

1. **Read** the full `SKILL.md` file
2. **Read** relevant files in `references/` for the specific sub-topic
3. **Follow** the skill's Core Workflow steps
4. **Apply** the MUST DO / MUST NOT DO constraints
5. **Use** the output templates for consistent formatting

## Process Files

The `ai-workflow/process/` directory contains workflow templates:

- **`create-prd.md`** — How to create a Product Requirements Document. Use when the user wants to plan a new feature. Ask clarifying questions, then generate a structured PRD and save it to `/tasks/[feature-name]/prd-[feature-name].md`.
- **`generate-tasks.md`** — How to break a PRD into development tasks. Use after a PRD is created. Generate a numbered task list and save to `/tasks/[feature-name]/tasks-[feature-name].md`.
- **`process-task-list.md`** — How to work through a task list. Use when implementing tasks from a generated list. Process tasks one at a time, verify each before moving on.

## Cursor Rules

The `ai-workflow/rules/` directory contains coding standards:

- **`common-rules/`** — Universal standards that apply to all code (development practices, cursor usage standards)
- **`framework-specific-rules/`** — Rules for specific frameworks (React, Vue, Laravel, Flutter, Node.js, React Native, Next.js + Supabase)

Always check for applicable rules before writing code. If a framework-specific rule exists for the current tech stack, follow it.

## Workflow

When the user asks you to build something:

1. **Identify the tech stack** from the request and existing project files
2. **Read matching skills** from `skills/` (check SKILL.md + references)
3. **Read applicable rules** from `ai-workflow/rules/`
4. **Follow the process** — if it's a new feature, start with the PRD process; if tasks exist, follow the task list process
5. **Write code** following the skill's workflow, constraints, and output templates
6. **Review** against the skill's MUST DO / MUST NOT DO lists

## Directory Structure

```
your-project/
├── ai-workflow/
│   ├── process/          # Workflow templates (PRD, tasks, implementation)
│   └── rules/            # Coding standards and framework rules
├── skills/               # AI skill definitions
│   ├── react-expert/
│   │   ├── SKILL.md      # Skill definition
│   │   └── references/   # Supporting docs
│   ├── python-pro/
│   └── ...
├── tasks/                # Generated PRDs and task lists (created during workflow)
└── CLAUDE.md             # This file
```
