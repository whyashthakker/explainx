const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1377959625042952242/o35L9YSlot01WVRUE37Y1T-QGKEkkHEndPhQFRvOHo_REHqwrIiUNJi9DLPq4b24Aqoq';

export async function sendDiscordNotification(email: string) {
  const message = {
    embeds: [{
      title: '🎉 New Newsletter Subscription',
      description: `New subscriber: ${email}`,
      color: 0x00ff00, // Green color
      timestamp: new Date().toISOString(),
      fields: [
        {
          name: 'Source',
          value: 'AI Agents Resources Page',
          inline: true
        }
      ]
    }]
  };

  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error('Failed to send Discord notification');
    }
  } catch (error) {
    console.error('Discord notification error:', error);
  }
} 