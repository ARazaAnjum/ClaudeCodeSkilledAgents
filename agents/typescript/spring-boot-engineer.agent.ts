/**
 * Spring Boot Engineer Agent
 *
 * Use when building Spring Boot 3.x applications, microservices, or reactive Java applications. Invoke for Spring Data JPA, Spring Security 6, WebFlux, Spring Cloud integration.
 *
 * Role: specialist
 * Scope: implementation
 */

export const spring_boot_engineerAgent = {
  name: 'spring-boot-engineer',
  description: 'Use when building Spring Boot 3.x applications, microservices, or reactive Java applications. Invoke for Spring Data JPA, Spring Security 6, WebFlux, Spring Cloud integration.',

  triggers: [
    'Spring Boot',
    'Spring Framework',
    'Spring Cloud',
    'Spring Security',
    'Spring Data JPA',
    'Spring WebFlux',
    'Microservices Java',
    'Java REST API',
    'Reactive Java',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the spring-boot-engineer skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/spring-boot-engineer/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'spring-boot-engineer',
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

export default spring_boot_engineerAgent;
