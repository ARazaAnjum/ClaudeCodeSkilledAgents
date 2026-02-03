/**
 * Java Architect Agent
 *
 * Use when building enterprise Java applications with Spring Boot 3.x, microservices, or reactive programming. Invoke for WebFlux, JPA optimization, Spring Security, cloud-native patterns.
 *
 * Role: architect
 * Scope: implementation
 */

export const java_architectAgent = {
  name: 'java-architect',
  description: 'Use when building enterprise Java applications with Spring Boot 3.x, microservices, or reactive programming. Invoke for WebFlux, JPA optimization, Spring Security, cloud-native patterns.',

  triggers: [
    'Spring Boot',
    'Java',
    'microservices',
    'Spring Cloud',
    'JPA',
    'Hibernate',
    'WebFlux',
    'reactive',
    'Java Enterprise',
  ],

  role: 'architect',
  scope: 'implementation',

  /**
   * Execute the java-architect skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/java-architect/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'java-architect',
      content: skillContent,
      context,
      status: 'loaded'
    };
  },

  /**
   * Check if this agent should be triggered for the given input
   * @param input - User input or context
   * @returns boolean indicating if agent should activate
   */
  shouldTrigger(input: string): boolean {
    const lowerInput = input.toLowerCase();
    return this.triggers.some(trigger =>
      lowerInput.includes(trigger.toLowerCase())
    );
  }
};

export default java_architectAgent;
