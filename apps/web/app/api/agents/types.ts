// /app/api/agents/types.ts
export interface AgentConfig {
    validateParams: (body: any) => { valid: boolean; message?: string; parameters?: any };
    formatAgentRequest: (parameters: any) => {
        agentTypeForAPI: string;
        webhookPath: string;
        message: string;
        parameters: any;
    };
}