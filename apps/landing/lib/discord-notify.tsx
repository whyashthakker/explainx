import axios from 'axios';

export async function sendDiscordNotification(content: string, statusUpdate?: boolean) {
    const webhookURL = statusUpdate ? process.env.DISCORD_WEBHOOK_URL_2 : process.env.DISCORD_WEBHOOK_URL;

    if (!webhookURL) {
        console.error('Webhook URL is not defined.');
        throw new Error('Webhook URL is not defined.');
    }

    const finalContent = `${content}`;

    try {
        const response = await axios.post(webhookURL, {
            content: finalContent
        });
        return response;
    } catch (error) {
        console.error('Error sending Discord notification:', error);
        throw error;
    }
}