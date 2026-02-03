/**
 * Rag Architect Agent
 *
 * Use when building RAG systems, vector databases, or knowledge-grounded AI applications requiring semantic search, document retrieval, or context augmentation.
 *
 * Role: architect
 * Scope: system-design
 */

export const rag_architectAgent = {
  name: 'rag-architect',
  description: 'Use when building RAG systems, vector databases, or knowledge-grounded AI applications requiring semantic search, document retrieval, or context augmentation.',

  triggers: [
    'RAG',
    'retrieval-augmented generation',
    'vector search',
    'embeddings',
    'semantic search',
    'vector database',
    'document retrieval',
    'knowledge base',
    'context retrieval',
    'similarity search',
  ],

  role: 'architect',
  scope: 'system-design',

  /**
   * Execute the rag-architect skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/rag-architect/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'rag-architect',
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

export default rag_architectAgent;
