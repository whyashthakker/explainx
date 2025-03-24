// /app/api/agents/[agentType]/new-task/config/index.ts
import { AgentConfig } from '../../../types';
import { jobFinderConfig } from './job-finder';
import { realEstateConfig } from './real-estate';

const configMap: Record<string, AgentConfig> = {
    'job-finder': jobFinderConfig,
    'real-estate': realEstateConfig,
    // Add new agents here
};

export function getConfig(agentType: string): AgentConfig | null {
    return configMap[agentType] || null;
}

export function isValidAgentType(agentType: string): boolean {
    return Object.keys(configMap).includes(agentType);
}