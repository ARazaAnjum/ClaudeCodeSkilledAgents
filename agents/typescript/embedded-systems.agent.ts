/**
 * Embedded Systems Agent
 *
 * Use when developing firmware for microcontrollers, implementing RTOS applications, or optimizing power consumption. Invoke for STM32, ESP32, FreeRTOS, bare-metal, power optimization, real-time systems.
 *
 * Role: specialist
 * Scope: implementation
 */

export const embedded_systemsAgent = {
  name: 'embedded-systems',
  description: 'Use when developing firmware for microcontrollers, implementing RTOS applications, or optimizing power consumption. Invoke for STM32, ESP32, FreeRTOS, bare-metal, power optimization, real-time systems.',

  triggers: [
    'embedded systems',
    'firmware',
    'microcontroller',
    'RTOS',
    'FreeRTOS',
    'STM32',
    'ESP32',
    'bare metal',
    'interrupt',
    'DMA',
    'real-time',
  ],

  role: 'specialist',
  scope: 'implementation',

  /**
   * Execute the embedded-systems skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/embedded-systems/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'embedded-systems',
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

export default embedded_systemsAgent;
