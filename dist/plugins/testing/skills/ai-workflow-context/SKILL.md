---
name: ai-workflow-context
description: Background context for AI workflow skill discovery, matching, and usage protocol. Provides skill selection guidance, reference loading instructions, and coding standards enforcement. Always active when this plugin is loaded.
user-invocable: false
---

# AI Workflow Context

This plugin provides specialized AI skills for production-grade development. Follow this protocol when handling user requests.

## Skill Usage Protocol

Each skill in this plugin has:
- `SKILL.md` — role definition, workflow, constraints, output templates
- `references/` — supporting documentation, patterns, and code examples

When you identify a matching skill for the user's request:

1. **Read** the full `SKILL.md` file
2. **Read** relevant files in `references/` for the specific sub-topic
3. **Follow** the skill's Core Workflow steps
4. **Apply** the MUST DO / MUST NOT DO constraints
5. **Use** the output templates for consistent formatting

If the user's task spans multiple domains, use multiple skills. Prioritize the most specific skill first.

## Skill Matching Guide

| User asks about... | Use skill |
|---|---|
| React, hooks, JSX, components | `react-expert` |
| Vue, Composition API, Pinia | `vue-expert` |
| Angular, RxJS, NgRx | `angular-architect` |
| Next.js, App Router, Server Components | `nextjs-developer` |
| React Native, mobile | `react-native-expert` |
| Flutter, Dart, widgets | `flutter-expert` |
| TypeScript, advanced types | `typescript-pro` |
| JavaScript, ES modules | `javascript-pro` |
| Frontend design, CSS, UI/UX | `frontend-design` |
| Python, type hints, async | `python-pro` |
| FastAPI, Pydantic, async API | `fastapi-expert` |
| Django, DRF, ORM | `django-expert` |
| Node.js, Express, NestJS | `nestjs-expert` |
| Ruby on Rails | `rails-expert` |
| Go, Golang | `golang-pro` |
| Java, enterprise | `java-architect` |
| Spring Boot, microservices | `spring-boot-engineer` |
| PHP, modern PHP | `php-pro` |
| Laravel | `laravel-specialist` |
| .NET Core, ASP.NET | `dotnet-core-expert` |
| C#, .NET | `csharp-developer` |
| Rust, systems programming | `rust-engineer` |
| C++, modern C++ | `cpp-pro` |
| Kotlin | `kotlin-specialist` |
| Swift, iOS | `swift-expert` |
| Backend patterns, CQRS | `backend-patterns` |
| Docker, CI/CD, deployment | `devops-engineer` |
| Kubernetes, Helm | `kubernetes-specialist` |
| Terraform, IaC | `terraform-engineer` |
| AWS, GCP, Azure, cloud | `cloud-architect` |
| SRE, reliability | `sre-engineer` |
| Monitoring, observability | `monitoring-expert` |
| Chaos engineering | `chaos-engineer` |
| Database, SQL, queries | `database-optimizer` |
| PostgreSQL | `postgres-pro` |
| SQL optimization | `sql-pro` |
| Pandas, data analysis | `pandas-pro` |
| Apache Spark | `spark-engineer` |
| Testing, TDD, test suites | `test-master` |
| Test-driven development | `tdd-workflow` |
| Playwright, E2E testing | `playwright-expert` |
| Code review, PR review | `code-reviewer` |
| Security, vulnerabilities | `security-reviewer` |
| Secure coding | `secure-code-guardian` |
| Architecture, system design | `architecture-designer` |
| REST API, GraphQL, OpenAPI | `api-designer` |
| Microservices | `microservices-architect` |
| GraphQL schema design | `graphql-architect` |
| Prompt engineering, LLM | `prompt-engineer` |
| Model fine-tuning | `fine-tuning-expert` |
| ML pipelines | `ml-pipeline` |
| RAG systems | `rag-architect` |
| MCP, Model Context Protocol | `mcp-developer` |
| WebSocket, real-time | `websocket-engineer` |
| CLI tools | `cli-developer` |
| Game development | `game-developer` |
| Embedded systems | `embedded-systems` |
| Shopify | `shopify-expert` |
| WordPress | `wordpress-pro` |
| Salesforce | `salesforce-developer` |
| Full-stack features | `fullstack-guardian` |
| Feature implementation | `feature-forge` |
| Legacy modernization | `legacy-modernizer` |
| Debugging, errors, logs | `debugging-wizard` |
| Documentation generation | `code-documenter` |
| Requirements gathering | `spec-miner` |
| Atlassian, Jira, Confluence | `atlassian-mcp` |

## Structured Workflows

Use these slash commands for structured development processes:

- `/ai-workflow-skills:create-prd [feature]` — Generate a Product Requirements Document. Ask clarifying questions first, then save to `/tasks/[feature-name]/prd-[feature-name].md`
- `/ai-workflow-skills:generate-tasks [prd-path]` — Break a PRD into numbered development tasks. Save to `/tasks/[feature-name]/tasks-[feature-name].md`
- `/ai-workflow-skills:process-tasks [task-path]` — Work through a task list step by step. Process one task at a time, verify each before moving on.

## Meta Workflow

When the user asks you to build something:

1. **Identify the tech stack** from the request and existing project files
2. **Read matching skills** — load SKILL.md + relevant references
3. **Follow the process** — for new features, start with PRD; if tasks exist, follow the task list
4. **Write code** following the skill's workflow, constraints, and output templates
5. **Review** against the skill's MUST DO / MUST NOT DO lists
