# Claude Code Skills - Agent Commands

This directory contains auto-generated agent command files for all 69 skills in the ClaudeCodeSkills repository. These agents can be used directly in Claude conversations or integrated into the Claude Agent SDK.

## 📁 Directory Structure

```
agents/
├── typescript/           # TypeScript agent implementations
│   ├── *.agent.ts       # Individual agent files
│   └── index.ts         # Barrel export for all agents
├── json/                 # JSON configuration files
│   ├── *.json           # Individual agent configs
│   └── index.json       # Combined agent registry
├── package.json          # Node.js package configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

## 🚀 Quick Start

### Using TypeScript Agents

```typescript
import { react_expertAgent } from './agents/typescript/react-expert.agent';

// Check if agent should trigger
if (react_expertAgent.shouldTrigger('I need to build a React component')) {
  // Execute the agent
  const result = await react_expertAgent.execute({
    userInput: 'Create a responsive navbar component',
    context: { framework: 'React 19' }
  });

  console.log(`Loaded skill: ${result.skill}`);
  console.log(`Status: ${result.status}`);
}
```

### Using JSON Configs

```javascript
const agents = require('./agents/json/index.json');

// Find agent by name
const reactAgent = agents.find(a => a.name === 'react-expert');

// Find agents by trigger
const matchingAgents = agents.filter(a =>
  a.triggers.some(t => t.toLowerCase().includes('react'))
);
```

### Using in Claude Conversations

Simply reference the skill by name in your Claude conversation:

```
@react-expert
Please help me build a data table component with sorting and filtering.
```

## 📚 Available Agents (69 Total)

### Frontend Development
- [react-expert](typescript/react-expert.agent.ts) - React 18+ applications, hooks, Server Components
- [vue-expert](typescript/vue-expert.agent.ts) - Vue 3 Composition API
- [vue-expert-js](typescript/vue-expert-js.agent.ts) - Vue 3 with JavaScript
- [angular-architect](typescript/angular-architect.agent.ts) - Angular applications
- [nextjs-developer](typescript/nextjs-developer.agent.ts) - Next.js App Router
- [react-native-expert](typescript/react-native-expert.agent.ts) - React Native mobile apps
- [flutter-expert](typescript/flutter-expert.agent.ts) - Flutter cross-platform apps
- [frontend-design](typescript/frontend-design.agent.ts) - Creative frontend design
- [typescript-pro](typescript/typescript-pro.agent.ts) - TypeScript development
- [javascript-pro](typescript/javascript-pro.agent.ts) - JavaScript development

### Backend Development
- [python-pro](typescript/python-pro.agent.ts) - Python 3.11+ development
- [fastapi-expert](typescript/fastapi-expert.agent.ts) - FastAPI async APIs
- [django-expert](typescript/django-expert.agent.ts) - Django web framework
- [nestjs-expert](typescript/nestjs-expert.agent.ts) - NestJS TypeScript framework
- [rails-expert](typescript/rails-expert.agent.ts) - Ruby on Rails
- [golang-pro](typescript/golang-pro.agent.ts) - Go backend development
- [java-architect](typescript/java-architect.agent.ts) - Java enterprise applications
- [spring-boot-engineer](typescript/spring-boot-engineer.agent.ts) - Spring Boot
- [php-pro](typescript/php-pro.agent.ts) - PHP development
- [laravel-specialist](typescript/laravel-specialist.agent.ts) - Laravel framework
- [dotnet-core-expert](typescript/dotnet-core-expert.agent.ts) - .NET Core
- [csharp-developer](typescript/csharp-developer.agent.ts) - C# development
- [rust-engineer](typescript/rust-engineer.agent.ts) - Rust systems programming
- [cpp-pro](typescript/cpp-pro.agent.ts) - C++ development
- [kotlin-specialist](typescript/kotlin-specialist.agent.ts) - Kotlin development
- [swift-expert](typescript/swift-expert.agent.ts) - Swift/iOS development
- [backend-patterns](typescript/backend-patterns.agent.ts) - Backend design patterns

### DevOps & Infrastructure
- [devops-engineer](typescript/devops-engineer.agent.ts) - CI/CD, Docker, deployment
- [kubernetes-specialist](typescript/kubernetes-specialist.agent.ts) - K8s orchestration
- [terraform-engineer](typescript/terraform-engineer.agent.ts) - Infrastructure as Code
- [cloud-architect](typescript/cloud-architect.agent.ts) - AWS/GCP/Azure architecture
- [sre-engineer](typescript/sre-engineer.agent.ts) - Site Reliability Engineering
- [monitoring-expert](typescript/monitoring-expert.agent.ts) - Observability & monitoring
- [chaos-engineer](typescript/chaos-engineer.agent.ts) - Chaos engineering

### Database & Data
- [database-optimizer](typescript/database-optimizer.agent.ts) - Database performance
- [postgres-pro](typescript/postgres-pro.agent.ts) - PostgreSQL expertise
- [sql-pro](typescript/sql-pro.agent.ts) - SQL query optimization
- [pandas-pro](typescript/pandas-pro.agent.ts) - Pandas data analysis
- [spark-engineer](typescript/spark-engineer.agent.ts) - Apache Spark

### Testing & Quality
- [test-master](typescript/test-master.agent.ts) - Comprehensive testing strategies
- [tdd-workflow](typescript/tdd-workflow.agent.ts) - Test-driven development
- [playwright-expert](typescript/playwright-expert.agent.ts) - E2E testing
- [code-reviewer](typescript/code-reviewer.agent.ts) - Code review
- [security-reviewer](typescript/security-reviewer.agent.ts) - Security audits
- [secure-code-guardian](typescript/secure-code-guardian.agent.ts) - Secure coding

### Architecture & Design
- [architecture-designer](typescript/architecture-designer.agent.ts) - System architecture
- [api-designer](typescript/api-designer.agent.ts) - API design
- [microservices-architect](typescript/microservices-architect.agent.ts) - Microservices
- [graphql-architect](typescript/graphql-architect.agent.ts) - GraphQL APIs

### AI & Machine Learning
- [prompt-engineer](typescript/prompt-engineer.agent.ts) - LLM prompt engineering
- [fine-tuning-expert](typescript/fine-tuning-expert.agent.ts) - Model fine-tuning
- [ml-pipeline](typescript/ml-pipeline.agent.ts) - ML pipeline development
- [rag-architect](typescript/rag-architect.agent.ts) - RAG system architecture

### Specialized Skills
- [mcp-developer](typescript/mcp-developer.agent.ts) - Model Context Protocol
- [websocket-engineer](typescript/websocket-engineer.agent.ts) - WebSocket implementations
- [cli-developer](typescript/cli-developer.agent.ts) - CLI tool development
- [game-developer](typescript/game-developer.agent.ts) - Game development
- [embedded-systems](typescript/embedded-systems.agent.ts) - Embedded programming
- [shopify-expert](typescript/shopify-expert.agent.ts) - Shopify development
- [wordpress-pro](typescript/wordpress-pro.agent.ts) - WordPress development
- [salesforce-developer](typescript/salesforce-developer.agent.ts) - Salesforce
- [atlassian-mcp](typescript/atlassian-mcp.agent.ts) - Atlassian tools

### Utilities & Process
- [fullstack-guardian](typescript/fullstack-guardian.agent.ts) - Full-stack development
- [feature-forge](typescript/feature-forge.agent.ts) - Feature implementation
- [legacy-modernizer](typescript/legacy-modernizer.agent.ts) - Legacy code modernization
- [debugging-wizard](typescript/debugging-wizard.agent.ts) - Debugging assistance
- [code-documenter](typescript/code-documenter.agent.ts) - Documentation generation
- [spec-miner](typescript/spec-miner.agent.ts) - Requirements gathering
- [coding-standards](typescript/coding-standards.agent.ts) - Code standards enforcement

## 🔧 Agent Structure

Each agent file includes:

### TypeScript Agent (.agent.ts)

```typescript
export const {skillName}Agent = {
  name: string;              // Skill identifier
  description: string;       // What the agent does
  triggers: string[];        // Keywords that activate the agent
  role: string;              // Role type (specialist, architect, etc.)
  scope: string;             // Scope (implementation, design, etc.)

  // Execute the agent with given context
  async execute(context: any): Promise<any>;

  // Check if agent should trigger for input
  shouldTrigger(input: string): boolean;
};
```

### JSON Config (.json)

```json
{
  "name": "skill-name",
  "description": "Agent description",
  "triggers": ["keyword1", "keyword2"],
  "role": "specialist",
  "scope": "implementation",
  "outputFormat": "code",
  "skillPath": "../skills/skill-name/SKILL.md"
}
```

## 🎯 Agent Roles

- **specialist** (42 agents) - Deep expertise in specific technology
- **architect** (7 agents) - System design and architecture
- **expert** (6 agents) - Domain expertise and consulting
- **engineer** (16 agents) - Implementation and operations

## 📦 Agent Scopes

- **implementation** (~45 agents) - Hands-on code development
- **design** (~14 agents) - Architecture and planning
- **testing** (1 agent) - Testing strategies
- **infrastructure** (1-2 agents) - DevOps and deployment
- **document** (several agents) - Documentation and specs

## 🔄 Regenerating Agents

If you modify any SKILL.md files, regenerate the agents:

```bash
node generate-agents.js
```

This will:
1. Parse all SKILL.md files
2. Extract YAML frontmatter
3. Generate TypeScript agent files
4. Generate JSON config files
5. Create index files for easy imports

## 📖 Usage Examples

### Example 1: Building a React Component

```typescript
import { react_expertAgent } from './agents/typescript';

const buildComponent = async () => {
  if (react_expertAgent.shouldTrigger('build a React data table')) {
    const result = await react_expertAgent.execute({
      task: 'Create a sortable data table with pagination',
      requirements: ['TypeScript', 'Responsive', 'Accessible']
    });

    // Skill content is loaded and ready to use
    console.log(result.skill); // 'react-expert'
  }
};
```

### Example 2: Finding Agents by Category

```javascript
const agents = require('./agents/json/index.json');

// Find all frontend agents
const frontendAgents = agents.filter(a =>
  a.triggers.some(t => ['react', 'vue', 'frontend'].includes(t.toLowerCase()))
);

// Find all architects
const architects = agents.filter(a => a.role === 'architect');

// Find implementation-focused agents
const implementers = agents.filter(a => a.scope === 'implementation');
```

### Example 3: Agent Router

```typescript
import allAgents from './agents/typescript';

class AgentRouter {
  private agents: any[];

  constructor() {
    this.agents = Object.values(allAgents);
  }

  findBestAgent(userInput: string) {
    // Find all matching agents
    const matches = this.agents.filter(agent =>
      agent.shouldTrigger(userInput)
    );

    if (matches.length === 0) return null;
    if (matches.length === 1) return matches[0];

    // If multiple matches, prioritize by role
    const priorityOrder = ['architect', 'expert', 'specialist', 'engineer'];

    return matches.sort((a, b) => {
      const aIndex = priorityOrder.indexOf(a.role);
      const bIndex = priorityOrder.indexOf(b.role);
      return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
    })[0];
  }

  async route(userInput: string) {
    const agent = this.findBestAgent(userInput);

    if (!agent) {
      throw new Error('No matching agent found');
    }

    console.log(`Routing to: ${agent.name}`);
    return agent.execute({ userInput });
  }
}

// Usage
const router = new AgentRouter();
await router.route('Help me optimize my PostgreSQL queries');
// Routes to: postgres-pro
```

## 🔍 Searching for Agents

### By Technology
```bash
grep -r "React" agents/json/*.json
grep -r "Python" agents/json/*.json
```

### By Role
```bash
grep "\"role\": \"architect\"" agents/json/*.json
```

### By Scope
```bash
grep "\"scope\": \"implementation\"" agents/json/*.json
```

## 📝 Contributing

When adding new skills:

1. Create a new skill directory under `skills/`
2. Add a `SKILL.md` file with proper YAML frontmatter
3. Run `node generate-agents.js` to generate agent files
4. Commit both the skill and generated agent files

## 📄 License

These agents are generated from the ClaudeCodeSkills repository. See the main repository for license information.

## 🤝 Related Resources

- [Skills Directory](../skills/) - All skill definitions
- [Claude Agent SDK](https://github.com/anthropics/claude-agent-sdk) - Official SDK
- [Claude Code](https://github.com/anthropics/claude-code) - Claude CLI tool

---

**Generated from 69 skills** | Last updated: 2026-02-03
