// /app/api/agents/[agentType]/new-task/config/real-estate.ts
import { AgentConfig } from '../../../types';

export const realEstateConfig: AgentConfig = {
    validateParams: (body) => {
        const { city, maxPrice, propertyCategory, propertyType } = body;

        if (!city || !maxPrice || !propertyCategory || !propertyType) {
            return { valid: false, message: 'Missing required fields' };
        }

        const parameters = {
            city,
            maxPrice: parseFloat(maxPrice),
            propertyCategory,
            propertyType
        };

        return { valid: true, parameters };
    },

    formatAgentRequest: (parameters) => {
        return {
            agentTypeForAPI: "real-estate",
            webhookPath: "real-estate",
            message: `Searching for ${parameters.propertyType} in ${parameters.city} under ${parameters.maxPrice}`,
            parameters
        };
    }
};