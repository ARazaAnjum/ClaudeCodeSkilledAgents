/**
 * Kubernetes Specialist Agent
 *
 * Use when deploying or managing Kubernetes workloads requiring cluster configuration, security hardening, or troubleshooting. Invoke for Helm charts, RBAC policies, NetworkPolicies, storage configuration, performance optimization.
 *
 * Role: specialist
 * Scope: infrastructure
 */

export const kubernetes_specialistAgent = {
  name: 'kubernetes-specialist',
  description: 'Use when deploying or managing Kubernetes workloads requiring cluster configuration, security hardening, or troubleshooting. Invoke for Helm charts, RBAC policies, NetworkPolicies, storage configuration, performance optimization.',

  triggers: [
    'Kubernetes',
    'K8s',
    'kubectl',
    'Helm',
    'container orchestration',
    'pod deployment',
    'RBAC',
    'NetworkPolicy',
    'Ingress',
    'StatefulSet',
    'Operator',
    'CRD',
    'CustomResourceDefinition',
    'ArgoCD',
    'Flux',
    'GitOps',
    'Istio',
    'Linkerd',
    'service mesh',
    'multi-cluster',
    'cost optimization',
    'VPA',
    'spot instances',
  ],

  role: 'specialist',
  scope: 'infrastructure',

  /**
   * Execute the kubernetes-specialist skill
   * @param context - The execution context
   * @returns Promise with execution result
   */
  async execute(context: any): Promise<any> {
    // Load the skill from the skills directory
    const skillPath = require.resolve('../skills/kubernetes-specialist/SKILL.md');
    const skillContent = require('fs').readFileSync(skillPath, 'utf-8');

    // Return execution context with skill loaded
    return {
      skill: 'kubernetes-specialist',
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

export default kubernetes_specialistAgent;
