# Using Your Custom Skills in Claude Code

Your 69 custom skills are now available as tools through the MCP server!

## ✅ Setup Complete

1. **MCP Server**: Built and ready at [mcp-server/dist/index.js](mcp-server/dist/index.js)
2. **Configuration**: Enabled in [.mcp.json](.mcp.json) and [.claude/settings.local.json](.claude/settings.local.json)
3. **Skills Available**: All 69 skills from your agents folder

## 🚀 How to Use Your Skills

### Method 1: Let Claude Auto-Detect (Recommended)

Just describe what you want in natural language, and I'll automatically use the appropriate skill:

```
Help me build a React component with TypeScript
→ I'll automatically use the react-expert skill

Create a FastAPI endpoint with async support
→ I'll automatically use the fastapi-expert skill

Set up a Kubernetes deployment
→ I'll automatically use the kubernetes-specialist skill
```

### Method 2: Explicitly Request a Skill

You can explicitly mention the skill name:

```
Use the python-pro skill to help me create a type-safe async API client

Can you use the devops-engineer skill to set up CI/CD with GitHub Actions?

Apply the database-optimizer skill to optimize these PostgreSQL queries
```

### Method 3: Direct Tool Call (Advanced)

In conversations, you can reference skills by name and I'll use the appropriate tool:

```
@react-expert: Build a sortable data table component
@postgres-pro: Optimize this query for better performance
@security-reviewer: Audit this authentication code
```

## 📚 Available Skills (69 Total)

### Frontend (10 skills)
- `react-expert` - React 18+ with hooks and Server Components
- `vue-expert` - Vue 3 Composition API (TypeScript)
- `vue-expert-js` - Vue 3 Composition API (JavaScript)
- `angular-architect` - Angular with RxJS
- `nextjs-developer` - Next.js App Router
- `react-native-expert` - React Native mobile
- `flutter-expert` - Flutter cross-platform
- `frontend-design` - Creative frontend design
- `typescript-pro` - Advanced TypeScript
- `javascript-pro` - Modern JavaScript

### Backend (17 skills)
- `python-pro` - Python 3.11+ with type safety
- `fastapi-expert` - FastAPI async APIs
- `django-expert` - Django framework
- `nestjs-expert` - NestJS TypeScript framework
- `rails-expert` - Ruby on Rails
- `golang-pro` - Go backend development
- `java-architect` - Java enterprise apps
- `spring-boot-engineer` - Spring Boot
- `php-pro` - Modern PHP
- `laravel-specialist` - Laravel framework
- `dotnet-core-expert` - .NET Core
- `csharp-developer` - C# development
- `rust-engineer` - Rust systems programming
- `cpp-pro` - Modern C++
- `kotlin-specialist` - Kotlin development
- `swift-expert` - Swift/iOS development
- `backend-patterns` - Backend design patterns

### DevOps & Infrastructure (7 skills)
- `devops-engineer` - CI/CD, Docker, deployment
- `kubernetes-specialist` - K8s orchestration
- `terraform-engineer` - Infrastructure as Code
- `cloud-architect` - AWS/GCP/Azure
- `sre-engineer` - Site Reliability Engineering
- `monitoring-expert` - Observability
- `chaos-engineer` - Chaos engineering

### Database & Data (5 skills)
- `database-optimizer` - Database performance
- `postgres-pro` - PostgreSQL expertise
- `sql-pro` - SQL optimization
- `pandas-pro` - Pandas data analysis
- `spark-engineer` - Apache Spark

### Testing & Quality (6 skills)
- `test-master` - Comprehensive testing
- `tdd-workflow` - Test-driven development
- `playwright-expert` - E2E testing
- `code-reviewer` - Code review
- `security-reviewer` - Security audits
- `secure-code-guardian` - Secure coding

### Architecture & Design (4 skills)
- `architecture-designer` - System architecture
- `api-designer` - API design
- `microservices-architect` - Microservices
- `graphql-architect` - GraphQL APIs

### AI & Machine Learning (4 skills)
- `prompt-engineer` - LLM prompt engineering
- `fine-tuning-expert` - Model fine-tuning
- `ml-pipeline` - ML pipelines
- `rag-architect` - RAG systems

### Specialized (8 skills)
- `mcp-developer` - Model Context Protocol
- `websocket-engineer` - WebSocket apps
- `cli-developer` - CLI tools
- `game-developer` - Game development
- `embedded-systems` - Embedded programming
- `shopify-expert` - Shopify development
- `wordpress-pro` - WordPress development
- `salesforce-developer` - Salesforce development

### Utilities & Process (8 skills)
- `fullstack-guardian` - Full-stack development
- `feature-forge` - Feature implementation
- `legacy-modernizer` - Legacy code modernization
- `debugging-wizard` - Debugging assistance
- `code-documenter` - Documentation generation
- `spec-miner` - Requirements gathering
- `coding-standards` - Code standards
- `atlassian-mcp` - Atlassian tools

## 🔄 How It Works

1. **You ask a question** or describe a task
2. **Claude detects** which skill(s) are relevant based on triggers
3. **MCP server loads** the corresponding SKILL.md file
4. **Claude applies** the skill's instructions, best practices, and workflow
5. **You get expert guidance** tailored to that specific technology/domain

## 🛠️ Maintenance

### Rebuild Skills After Changes

If you modify any SKILL.md files:

```bash
# Regenerate agent files
node generate-agents.js

# Rebuild MCP server (only if you changed the server code)
cd mcp-server
npm run build
```

### Restart Claude Code

After configuration changes or rebuilding, restart Claude Code to reload the MCP server.

## 🐛 Troubleshooting

### Skills Not Appearing

1. Check that MCP server built successfully: `ls mcp-server/dist/index.js`
2. Verify `.mcp.json` exists with correct path
3. Check `settings.local.json` includes `"enabledMcpjsonServers": ["claudecode-skills"]`
4. Restart Claude Code completely

### Specific Skill Not Working

1. Verify the skill exists: `ls skills/[skill-name]/SKILL.md`
2. Check agent config: `cat agents/json/[skill-name].json`
3. Regenerate agents: `node generate-agents.js`
4. Rebuild MCP server: `cd mcp-server && npm run build`

### Server Errors

Check Claude Code debug logs:
- Windows: `%USERPROFILE%\.claude\debug\`
- Look for MCP server error messages

## 💡 Tips

1. **Be Specific**: The more context you provide, the better the skill can help
2. **Chain Skills**: Use multiple skills in sequence for complex workflows
3. **Provide Context**: Include relevant code, error messages, or requirements
4. **Ask Questions**: Skills can clarify requirements before implementing

## 📝 Example Workflows

### Building a Web Application

```
1. "Use architecture-designer to plan a microservices architecture for an e-commerce platform"
2. "Use api-designer to create the REST API specification"
3. "Use react-expert to build the frontend with TypeScript"
4. "Use fastapi-expert to implement the backend API"
5. "Use postgres-pro to design the database schema"
6. "Use test-master to create a comprehensive test strategy"
7. "Use devops-engineer to set up CI/CD pipeline"
```

### Performance Optimization

```
1. "Use debugging-wizard to identify performance bottlenecks"
2. "Use database-optimizer to optimize slow queries"
3. "Use monitoring-expert to set up observability"
4. "Use code-reviewer to review optimizations"
```

### Security Audit

```
1. "Use security-reviewer to audit this authentication system"
2. "Use secure-code-guardian to implement security best practices"
3. "Use code-reviewer to review security changes"
```

## 🎯 Next Steps

Start using your skills! Try:

```
Help me build a responsive navbar component with React and TypeScript
```

Claude will automatically detect and use the `react-expert` and `typescript-pro` skills to provide expert guidance!

---

**Need Help?** Check the [MCP Server README](mcp-server/README.md) or [Main README](README.md)
