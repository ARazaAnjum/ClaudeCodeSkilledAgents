# ClaudeCodeSkills

> **69 specialized AI skills for software development with auto-generated agent commands**

A comprehensive collection of production-grade AI skills covering frontend, backend, DevOps, database, testing, architecture, AI/ML, and specialized domains. Each skill includes detailed documentation, best practices, and can be invoked directly in Claude or integrated via the Claude Agent SDK.

[![Skills](https://img.shields.io/badge/Skills-69-blue)](skills/)
[![Agents](https://img.shields.io/badge/Agents-138-green)](agents/)
[![References](https://img.shields.io/badge/References-356-orange)](skills/)

## 🚀 Quick Start

### Using Skills in Claude

Reference any skill directly in your Claude conversation:

```
@react-expert
Help me build a data table component with sorting and filtering

@python-pro
Create a type-safe async API client

@devops-engineer
Set up a CI/CD pipeline with GitHub Actions
```

### Using Agent CLI

```bash
# List all agents
node agents/cli.js list

# Search for agents
node agents/cli.js search react

# Get agent info
node agents/cli.js info react-expert

# Show statistics
node agents/cli.js stats

# Get recommendations
node agents/cli.js recommend web-app
```

### Using TypeScript Agents

```typescript
import { react_expertAgent } from './agents/typescript/react-expert.agent';

// Check if agent matches
if (react_expertAgent.shouldTrigger('build a React component')) {
  // Execute the agent
  const result = await react_expertAgent.execute({
    task: 'Create sortable data table',
    requirements: ['TypeScript', 'Responsive']
  });
}
```

### Using Agent Router

```typescript
import AgentRouter from './agents/typescript/agent-router';

const router = new AgentRouter();

// Automatically find and execute the best agent
await router.route('Help me optimize my PostgreSQL queries');
// → Routes to: postgres-pro
```

## 📁 Repository Structure

```
ClaudeCodeSkills/
├── skills/                 # 69 skill definitions
│   ├── react-expert/
│   │   ├── SKILL.md        # Main skill definition
│   │   └── references/     # Supporting documentation
│   ├── python-pro/
│   ├── devops-engineer/
│   └── ...
│
├── agents/                 # Generated agent files
│   ├── typescript/         # TypeScript agents (69 files)
│   ├── json/               # JSON configs (69 files)
│   ├── cli.js              # Command-line interface
│   ├── package.json        # NPM configuration
│   └── README.md           # Agent documentation
│
├── generate-agents.js      # Agent generator script
├── PROJECT_SUMMARY.md      # Detailed project summary
└── README.md               # This file
```

## 🎯 Available Skills

### Frontend Development (10)
| Skill | Description |
|-------|-------------|
| [react-expert](skills/react-expert/) | React 18+ applications, hooks, Server Components, React 19 |
| [vue-expert](skills/vue-expert/) | Vue 3 Composition API with TypeScript |
| [vue-expert-js](skills/vue-expert-js/) | Vue 3 Composition API with JavaScript |
| [angular-architect](skills/angular-architect/) | Angular applications with RxJS and NgRx |
| [nextjs-developer](skills/nextjs-developer/) | Next.js App Router with Server Components |
| [react-native-expert](skills/react-native-expert/) | React Native mobile development |
| [flutter-expert](skills/flutter-expert/) | Flutter cross-platform apps |
| [frontend-design](skills/frontend-design/) | Creative frontend design with bold aesthetics |
| [typescript-pro](skills/typescript-pro/) | TypeScript with advanced typing |
| [javascript-pro](skills/javascript-pro/) | Modern JavaScript development |

### Backend Development (17)
| Skill | Description |
|-------|-------------|
| [python-pro](skills/python-pro/) | Python 3.11+ with type safety and async |
| [fastapi-expert](skills/fastapi-expert/) | FastAPI async APIs |
| [django-expert](skills/django-expert/) | Django web framework |
| [nestjs-expert](skills/nestjs-expert/) | NestJS TypeScript framework |
| [rails-expert](skills/rails-expert/) | Ruby on Rails |
| [golang-pro](skills/golang-pro/) | Go backend development |
| [java-architect](skills/java-architect/) | Java enterprise applications |
| [spring-boot-engineer](skills/spring-boot-engineer/) | Spring Boot microservices |
| [php-pro](skills/php-pro/) | Modern PHP development |
| [laravel-specialist](skills/laravel-specialist/) | Laravel framework |
| [dotnet-core-expert](skills/dotnet-core-expert/) | .NET Core applications |
| [csharp-developer](skills/csharp-developer/) | C# development |
| [rust-engineer](skills/rust-engineer/) | Rust systems programming |
| [cpp-pro](skills/cpp-pro/) | Modern C++ development |
| [kotlin-specialist](skills/kotlin-specialist/) | Kotlin development |
| [swift-expert](skills/swift-expert/) | Swift and iOS development |
| [backend-patterns](skills/backend-patterns/) | Backend design patterns |

### DevOps & Infrastructure (7)
| Skill | Description |
|-------|-------------|
| [devops-engineer](skills/devops-engineer/) | CI/CD, Docker, deployment automation |
| [kubernetes-specialist](skills/kubernetes-specialist/) | Kubernetes orchestration |
| [terraform-engineer](skills/terraform-engineer/) | Infrastructure as Code |
| [cloud-architect](skills/cloud-architect/) | AWS/GCP/Azure architecture |
| [sre-engineer](skills/sre-engineer/) | Site Reliability Engineering |
| [monitoring-expert](skills/monitoring-expert/) | Observability and monitoring |
| [chaos-engineer](skills/chaos-engineer/) | Chaos engineering practices |

### Database & Data (5)
| Skill | Description |
|-------|-------------|
| [database-optimizer](skills/database-optimizer/) | Database performance tuning |
| [postgres-pro](skills/postgres-pro/) | PostgreSQL expertise |
| [sql-pro](skills/sql-pro/) | SQL query optimization |
| [pandas-pro](skills/pandas-pro/) | Pandas data analysis |
| [spark-engineer](skills/spark-engineer/) | Apache Spark data processing |

### Testing & Quality (6)
| Skill | Description |
|-------|-------------|
| [test-master](skills/test-master/) | Comprehensive testing strategies |
| [tdd-workflow](skills/tdd-workflow/) | Test-driven development |
| [playwright-expert](skills/playwright-expert/) | E2E testing with Playwright |
| [code-reviewer](skills/code-reviewer/) | Code review and quality audits |
| [security-reviewer](skills/security-reviewer/) | Security audits and vulnerability assessment |
| [secure-code-guardian](skills/secure-code-guardian/) | Secure coding practices |

### Architecture & Design (4)
| Skill | Description |
|-------|-------------|
| [architecture-designer](skills/architecture-designer/) | System architecture and design |
| [api-designer](skills/api-designer/) | RESTful and GraphQL API design |
| [microservices-architect](skills/microservices-architect/) | Microservices patterns |
| [graphql-architect](skills/graphql-architect/) | GraphQL schema design |

### AI & Machine Learning (4)
| Skill | Description |
|-------|-------------|
| [prompt-engineer](skills/prompt-engineer/) | LLM prompt engineering |
| [fine-tuning-expert](skills/fine-tuning-expert/) | Model fine-tuning |
| [ml-pipeline](skills/ml-pipeline/) | ML pipeline development |
| [rag-architect](skills/rag-architect/) | RAG system architecture |

### Specialized (8)
| Skill | Description |
|-------|-------------|
| [mcp-developer](skills/mcp-developer/) | Model Context Protocol development |
| [websocket-engineer](skills/websocket-engineer/) | Real-time WebSocket applications |
| [cli-developer](skills/cli-developer/) | CLI tool development |
| [game-developer](skills/game-developer/) | Game development |
| [embedded-systems](skills/embedded-systems/) | Embedded systems programming |
| [shopify-expert](skills/shopify-expert/) | Shopify development |
| [wordpress-pro](skills/wordpress-pro/) | WordPress development |
| [salesforce-developer](skills/salesforce-developer/) | Salesforce development |

### Utilities & Process (8)
| Skill | Description |
|-------|-------------|
| [fullstack-guardian](skills/fullstack-guardian/) | Full-stack feature development |
| [feature-forge](skills/feature-forge/) | Feature implementation workflow |
| [legacy-modernizer](skills/legacy-modernizer/) | Legacy code modernization |
| [debugging-wizard](skills/debugging-wizard/) | Debugging assistance |
| [code-documenter](skills/code-documenter/) | Documentation generation |
| [spec-miner](skills/spec-miner/) | Requirements gathering |
| [coding-standards](skills/coding-standards/) | Code standards enforcement |
| [atlassian-mcp](skills/atlassian-mcp/) | Atlassian tools integration |

## 🔧 Features

### ✅ Consistent Structure
Every skill follows a proven format:
- YAML frontmatter with metadata
- Role definition with expertise level
- Clear use cases and triggers
- 5-step core workflow
- Reference guide with supporting docs
- MUST DO / MUST NOT DO constraints
- Output templates
- Related skills cross-references

### 📚 Rich Documentation
- 69 comprehensive SKILL.md files
- 356 reference documents
- Production-grade code examples
- Best practices and anti-patterns
- Architectural patterns
- Testing strategies

### 🤖 Auto-Generated Agents
- 69 TypeScript agent files
- 69 JSON configuration files
- Intelligent auto-triggering
- Smart routing system
- Multi-format support

### 🎯 Smart Routing
- Automatic agent selection
- Multi-trigger matching with scoring
- Priority-based routing by role
- Search and filter capabilities
- Category-based discovery

### 🛠️ Developer Tools
- CLI for easy agent interaction
- TypeScript Agent Router
- JSON registry for all agents
- Example usage patterns
- Regeneration script

## 📊 Statistics

- **Total Skills**: 69
- **Total Agents**: 138 (TypeScript + JSON)
- **Reference Files**: 356
- **Total Documentation**: 425+ markdown files
- **Agent Roles**: 4 (specialist, architect, expert, engineer)
- **Agent Scopes**: 10+ (implementation, design, testing, etc.)
- **Output Formats**: 10+ (code, document, report, etc.)

## 🎨 Agent Roles

### Specialist (48 agents)
Deep expertise in specific technologies and frameworks.

### Architect (6 agents)
System design, architecture patterns, and technical decision-making.

### Expert (11 agents)
Domain expertise, consulting, and advanced techniques.

### Engineer (4 agents)
Implementation, operations, and platform engineering.

## 🔄 Regenerating Agents

After modifying any SKILL.md files:

```bash
node generate-agents.js
```

This will:
1. Parse all SKILL.md files
2. Extract YAML frontmatter
3. Generate TypeScript agent files
4. Generate JSON config files
5. Create index files for imports
6. Report any errors

## 💡 Usage Examples

### Example 1: Building a Web Application

```typescript
import AgentRouter from './agents/typescript/agent-router';

const router = new AgentRouter();

// Architecture phase
await router.route('Design architecture for e-commerce platform');

// API design phase
await router.route('Design REST API for products and orders');

// Implementation phase
await router.route('Build FastAPI application with async endpoints');

// Testing phase
await router.route('Create comprehensive test suite with pytest');

// Deployment phase
await router.route('Set up CI/CD pipeline with Docker and Kubernetes');
```

### Example 2: Finding the Right Agent

```typescript
// Search by technology
router.searchAgents('react');
router.searchAgents('kubernetes');
router.searchAgents('database');

// Filter by role
router.getAgentsByRole('architect');

// Filter by scope
router.getAgentsByScope('implementation');

// Get specific agent
const agent = router.getAgent('react-expert');
```

### Example 3: Using CLI

```bash
# List all frontend agents
node agents/cli.js list --search=frontend

# Get recommendations for web app
node agents/cli.js recommend web-app

# Show agent details
node agents/cli.js info react-expert

# View statistics
node agents/cli.js stats
```

## 🚀 Common Workflows

### Web Application Development
1. **architecture-designer** - Design system architecture
2. **api-designer** - Design API endpoints
3. **react-expert** - Build frontend
4. **fastapi-expert** - Build backend
5. **postgres-pro** - Design database
6. **test-master** - Create test suite
7. **devops-engineer** - Set up deployment

### API Development
1. **api-designer** - Design API contract
2. **fastapi-expert** / **nestjs-expert** - Implement API
3. **database-optimizer** - Optimize queries
4. **test-master** - Add integration tests
5. **security-reviewer** - Security audit
6. **code-documenter** - Generate API docs

### Performance Optimization
1. **debugging-wizard** - Identify bottlenecks
2. **database-optimizer** - Optimize queries
3. **monitoring-expert** - Set up observability
4. **chaos-engineer** - Test resilience
5. **code-reviewer** - Review optimizations

## 📖 Documentation

- **[Project Summary](PROJECT_SUMMARY.md)** - Comprehensive project overview
- **[Agent Documentation](agents/README.md)** - How to use agents
- **[Skills Directory](skills/)** - Individual skill documentation
- **[Example Usage](agents/typescript/example-usage.ts)** - TypeScript examples

## 🤝 Contributing

To add a new skill:

1. Create directory: `skills/your-skill-name/`
2. Create `SKILL.md` with proper YAML frontmatter
3. Add reference files in `references/` subdirectory
4. Regenerate agents: `node generate-agents.js`
5. Test with CLI: `node agents/cli.js info your-skill-name`

### Skill Template

```yaml
---
name: your-skill-name
description: Brief description of what this skill does
triggers:
  - keyword1
  - keyword2
  - keyword3
role: specialist|architect|expert|engineer
scope: implementation|design|testing|infrastructure
output-format: code|document|report
---

# Your Skill Name

Brief introduction...

## Role Definition
...

## When to Use This Skill
...

## Core Workflow
...

## Reference Guide
...

## Constraints
...

## Output Templates
...

## Knowledge Reference
...

## Related Skills
...
```

## 🔍 Finding Skills

### By Technology
```bash
node agents/cli.js search react
node agents/cli.js search python
node agents/cli.js search kubernetes
```

### By Role
```bash
node agents/cli.js list --role=architect
node agents/cli.js list --role=specialist
```

### By Scenario
```bash
node agents/cli.js recommend web-app
node agents/cli.js recommend devops
node agents/cli.js recommend api
```

## 📝 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

Built with inspiration from production-grade software engineering practices and the Claude Agent SDK.

## 📧 Support

- **Issues**: Create an issue in the repository
- **Discussions**: Start a discussion for questions
- **CLI Help**: `node agents/cli.js help`

---

**🚀 Ready to use?** Start with `@react-expert` or run `node agents/cli.js recommend web-app`

**📊 Stats**: 69 skills | 138 agents | 356 references | 425+ docs

**🔄 Last Updated**: 2026-02-03
