/**
 * Agent Router
 *
 * Intelligent routing system that automatically selects the best agent
 * based on user input and context.
 */

import * as fs from 'fs';
import * as path from 'path';

export interface Agent {
  name: string;
  description: string;
  triggers: string[];
  role: string;
  scope: string;
  execute(context: any): Promise<any>;
  shouldTrigger(input: string): boolean;
}

export interface AgentMatch {
  agent: Agent;
  score: number;
  matchedTriggers: string[];
}

export class AgentRouter {
  private agents: Map<string, Agent> = new Map();
  private rolesPriority = ['architect', 'expert', 'specialist', 'engineer'];

  constructor() {
    this.loadAgents();
  }

  /**
   * Load all agents from the JSON registry
   */
  private loadAgents(): void {
    const jsonPath = path.join(__dirname, '../json/index.json');
    const agentsData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

    for (const agentData of agentsData) {
      const agentModule = require(`./${agentData.name}.agent`);
      const agent = agentModule.default || agentModule[`${agentData.name.replace(/-/g, '_')}Agent`];

      if (agent) {
        this.agents.set(agentData.name, agent);
      }
    }

    console.log(`Loaded ${this.agents.size} agents`);
  }

  /**
   * Find the best matching agent for the given input
   */
  findBestAgent(userInput: string): Agent | null {
    const matches = this.findMatchingAgents(userInput);

    if (matches.length === 0) {
      return null;
    }

    // Sort by score (descending) and then by role priority
    matches.sort((a, b) => {
      if (a.score !== b.score) {
        return b.score - a.score;
      }

      const aRoleIndex = this.rolesPriority.indexOf(a.agent.role);
      const bRoleIndex = this.rolesPriority.indexOf(b.agent.role);

      return (aRoleIndex === -1 ? 999 : aRoleIndex) - (bRoleIndex === -1 ? 999 : bRoleIndex);
    });

    return matches[0].agent;
  }

  /**
   * Find all agents that match the input
   */
  findMatchingAgents(userInput: string): AgentMatch[] {
    const matches: AgentMatch[] = [];
    const lowerInput = userInput.toLowerCase();

    for (const [name, agent] of this.agents) {
      const matchedTriggers = agent.triggers.filter(trigger =>
        lowerInput.includes(trigger.toLowerCase())
      );

      if (matchedTriggers.length > 0) {
        // Calculate match score based on:
        // 1. Number of matched triggers
        // 2. Length of matched triggers (longer = more specific)
        const score = matchedTriggers.reduce((sum, trigger) => {
          return sum + trigger.length + (matchedTriggers.length * 10);
        }, 0);

        matches.push({
          agent,
          score,
          matchedTriggers
        });
      }
    }

    return matches;
  }

  /**
   * Route the user input to the best agent and execute
   */
  async route(userInput: string, context: any = {}): Promise<any> {
    const agent = this.findBestAgent(userInput);

    if (!agent) {
      throw new Error('No matching agent found for input: ' + userInput);
    }

    console.log(`Routing to agent: ${agent.name}`);
    console.log(`Description: ${agent.description}`);

    return agent.execute({
      userInput,
      ...context
    });
  }

  /**
   * Get all agents of a specific role
   */
  getAgentsByRole(role: string): Agent[] {
    return Array.from(this.agents.values()).filter(agent => agent.role === role);
  }

  /**
   * Get all agents of a specific scope
   */
  getAgentsByScope(scope: string): Agent[] {
    return Array.from(this.agents.values()).filter(agent => agent.scope === scope);
  }

  /**
   * Get agent by name
   */
  getAgent(name: string): Agent | undefined {
    return this.agents.get(name);
  }

  /**
   * List all available agents
   */
  listAgents(): Array<{name: string; description: string; role: string; scope: string}> {
    return Array.from(this.agents.values()).map(agent => ({
      name: agent.name,
      description: agent.description,
      role: agent.role,
      scope: agent.scope
    }));
  }

  /**
   * Search agents by keyword
   */
  searchAgents(keyword: string): Agent[] {
    const lowerKeyword = keyword.toLowerCase();

    return Array.from(this.agents.values()).filter(agent =>
      agent.name.includes(lowerKeyword) ||
      agent.description.toLowerCase().includes(lowerKeyword) ||
      agent.triggers.some(t => t.toLowerCase().includes(lowerKeyword))
    );
  }
}

export default AgentRouter;
