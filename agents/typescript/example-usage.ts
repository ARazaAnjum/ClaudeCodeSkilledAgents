/**
 * Example Usage of ClaudeCodeSkills Agents
 *
 * This file demonstrates various ways to use the generated agents.
 */

import AgentRouter from './agent-router';
import { react_expertAgent } from './react-expert.agent';
import { python_proAgent } from './python-pro.agent';
import { devops_engineerAgent } from './devops-engineer.agent';

// ============================================================================
// Example 1: Direct Agent Usage
// ============================================================================

async function example1_DirectUsage() {
  console.log('Example 1: Direct Agent Usage\n');

  // Check if agent should be triggered
  const userInput = 'I need to build a React component with hooks';

  if (react_expertAgent.shouldTrigger(userInput)) {
    console.log('✓ React Expert agent matched!');

    // Execute the agent
    const result = await react_expertAgent.execute({
      userInput,
      requirements: ['TypeScript', 'Hooks', 'Testing']
    });

    console.log(`Skill: ${result.skill}`);
    console.log(`Status: ${result.status}`);
    console.log('');
  }
}

// ============================================================================
// Example 2: Using the Agent Router
// ============================================================================

async function example2_RouterUsage() {
  console.log('Example 2: Agent Router Usage\n');

  const router = new AgentRouter();

  // Route automatically to the best agent
  const inputs = [
    'Help me optimize my PostgreSQL database queries',
    'I need to set up a CI/CD pipeline with GitHub Actions',
    'Build a FastAPI application with async endpoints',
    'Design a microservices architecture for my application'
  ];

  for (const input of inputs) {
    console.log(`Input: "${input}"`);

    try {
      const result = await router.route(input);
      console.log(`→ Routed to: ${result.skill}`);
    } catch (error: any) {
      console.log(`→ Error: ${error.message}`);
    }

    console.log('');
  }
}

// ============================================================================
// Example 3: Finding Agents by Category
// ============================================================================

function example3_FindByCategory() {
  console.log('Example 3: Finding Agents by Category\n');

  const router = new AgentRouter();

  // Find all architect agents
  const architects = router.getAgentsByRole('architect');
  console.log(`Architect Agents (${architects.length}):`);
  architects.forEach(agent => console.log(`  - ${agent.name}`));
  console.log('');

  // Find all implementation-focused agents
  const implementers = router.getAgentsByScope('implementation');
  console.log(`Implementation Agents (${implementers.length}):`);
  implementers.slice(0, 5).forEach(agent => console.log(`  - ${agent.name}`));
  console.log('  ...\n');

  // Search for specific technology
  const pythonAgents = router.searchAgents('python');
  console.log(`Python-related Agents (${pythonAgents.length}):`);
  pythonAgents.forEach(agent => console.log(`  - ${agent.name}`));
  console.log('');
}

// ============================================================================
// Example 4: Multiple Agent Matching
// ============================================================================

function example4_MultipleMatches() {
  console.log('Example 4: Finding Multiple Matching Agents\n');

  const router = new AgentRouter();

  const input = 'I want to build a React application with TypeScript';

  const matches = router.findMatchingAgents(input);

  console.log(`Input: "${input}"`);
  console.log(`Found ${matches.length} matching agents:\n`);

  matches.forEach((match, index) => {
    console.log(`${index + 1}. ${match.agent.name} (score: ${match.score})`);
    console.log(`   Role: ${match.agent.role}`);
    console.log(`   Matched triggers: ${match.matchedTriggers.join(', ')}`);
    console.log('');
  });

  const bestAgent = router.findBestAgent(input);
  console.log(`Best match: ${bestAgent?.name}\n`);
}

// ============================================================================
// Example 5: Sequential Agent Pipeline
// ============================================================================

async function example5_AgentPipeline() {
  console.log('Example 5: Sequential Agent Pipeline\n');

  const router = new AgentRouter();

  // Step 1: Architecture design
  console.log('Step 1: Architecture Design');
  const architectAgent = router.getAgent('architecture-designer');
  if (architectAgent) {
    const result = await architectAgent.execute({
      task: 'Design a scalable e-commerce system'
    });
    console.log(`→ ${result.skill} completed\n`);
  }

  // Step 2: API design
  console.log('Step 2: API Design');
  const apiAgent = router.getAgent('api-designer');
  if (apiAgent) {
    const result = await apiAgent.execute({
      task: 'Design REST API endpoints for e-commerce'
    });
    console.log(`→ ${result.skill} completed\n`);
  }

  // Step 3: Implementation
  console.log('Step 3: Implementation');
  const fastApiAgent = router.getAgent('fastapi-expert');
  if (fastApiAgent) {
    const result = await fastApiAgent.execute({
      task: 'Implement the API with FastAPI'
    });
    console.log(`→ ${result.skill} completed\n`);
  }

  // Step 4: Testing
  console.log('Step 4: Testing');
  const testAgent = router.getAgent('test-master');
  if (testAgent) {
    const result = await testAgent.execute({
      task: 'Create comprehensive test suite'
    });
    console.log(`→ ${result.skill} completed\n`);
  }

  console.log('Pipeline complete!\n');
}

// ============================================================================
// Example 6: Agent Recommendations
// ============================================================================

function example6_AgentRecommendations() {
  console.log('Example 6: Agent Recommendations\n');

  const router = new AgentRouter();

  const recommendations = [
    {
      scenario: 'Building a new web application',
      agents: ['fullstack-guardian', 'architecture-designer', 'tdd-workflow']
    },
    {
      scenario: 'Optimizing performance',
      agents: ['database-optimizer', 'monitoring-expert', 'chaos-engineer']
    },
    {
      scenario: 'Security review',
      agents: ['security-reviewer', 'secure-code-guardian', 'code-reviewer']
    },
    {
      scenario: 'Cloud deployment',
      agents: ['devops-engineer', 'kubernetes-specialist', 'cloud-architect']
    }
  ];

  recommendations.forEach(rec => {
    console.log(`Scenario: ${rec.scenario}`);
    console.log('Recommended agents:');
    rec.agents.forEach(agentName => {
      const agent = router.getAgent(agentName);
      if (agent) {
        console.log(`  - ${agent.name}: ${agent.description.substring(0, 60)}...`);
      }
    });
    console.log('');
  });
}

// ============================================================================
// Run all examples
// ============================================================================

async function runAllExamples() {
  console.log('='.repeat(80));
  console.log('ClaudeCodeSkills Agents - Usage Examples');
  console.log('='.repeat(80));
  console.log('');

  await example1_DirectUsage();
  await example2_RouterUsage();
  example3_FindByCategory();
  example4_MultipleMatches();
  await example5_AgentPipeline();
  example6_AgentRecommendations();

  console.log('='.repeat(80));
  console.log('All examples completed!');
  console.log('='.repeat(80));
}

// Run if executed directly
if (require.main === module) {
  runAllExamples().catch(console.error);
}

export {
  example1_DirectUsage,
  example2_RouterUsage,
  example3_FindByCategory,
  example4_MultipleMatches,
  example5_AgentPipeline,
  example6_AgentRecommendations
};
