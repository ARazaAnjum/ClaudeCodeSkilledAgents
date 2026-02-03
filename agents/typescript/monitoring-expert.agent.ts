/**
 * Monitoring Expert Agent
 *
 * Use when setting up monitoring systems, logging, metrics, tracing, or alerting. Invoke for dashboards, Prometheus/Grafana, load testing, profiling, capacity planning.
 *
 * Role: specialist
 * Scope: implementation
 */

export const monitoring_expertAgent = {
  name: 'monitoring-expert',
  description: 'Use when setting up monitoring systems, logging, metrics, tracing, or alerting. Invoke for dashboards, Prometheus/Grafana, load testing, profiling, capacity planning.',

  triggers: [
    'monitoring',
    'observability',
    'logging',
    'metrics',
    'tracing',
    'alerting',
    'Prometheus',
    'Grafana',
    'DataDog',
    'APM',
    'performance testing',
    'load testing',
    'profiling',
    'capacity planning',
    'bottleneck',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the monitoring-expert skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/monitoring-expert/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'monitoring-expert',
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

export default monitoring_expertAgent;
