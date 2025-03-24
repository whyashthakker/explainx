// /app/api/agents/[agentType]/new-task/config/job-finder.ts
import { AgentConfig } from '../../../types';

export const jobFinderConfig: AgentConfig = {
    validateParams: (body) => {
        const { job_title, location, experience_years, job_category } = body;

        if (!job_title || !location || experience_years === undefined || !job_category) {
            return { valid: false, message: 'Missing required fields' };
        }

        const parameters = {
            job_title,
            location,
            experience_years: Number(experience_years),
            skills: body.skills ? (Array.isArray(body.skills) ? body.skills : body.skills.split(',').map((s: string) => s.trim())) : [],
            job_category
        };

        return { valid: true, parameters };
    },

    formatAgentRequest: (parameters) => {
        return {
            agentTypeForAPI: "job-hunting",
            webhookPath: "job-finder",
            message: `Searching for ${parameters.job_title} jobs in ${parameters.location} with ${parameters.experience_years} years experience`,
            parameters
        };
    }
};