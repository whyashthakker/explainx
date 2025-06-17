# Beehiiv Integration Setup

This application now uses Beehiiv for newsletter subscriptions instead of Discord notifications.

## Environment Variables Required

Add these to your `.env.local` file:

```env
# Beehiiv API Configuration
BEEHIIV_API_KEY="your-beehiiv-api-key"
BEEHIIV_PUBLICATION_ID="pub_your-publication-id"
```

## How to Get Your Beehiiv Credentials

1. **API Key**: 
   - Go to your Beehiiv dashboard
   - Navigate to Settings > API
   - Create a new API key with subscription permissions

2. **Publication ID**: 
   - In your Beehiiv dashboard
   - Go to your publication settings
   - The publication ID starts with `pub_` and can be found in the URL or API documentation

## Features Implemented

- ✅ Newsletter subscriptions sent to Beehiiv
- ✅ Referral URL tracking from query parameters (`?ref=` or `?referral_url=`)
- ✅ UTM parameter tracking (`utm_source`, `utm_medium`, `utm_campaign`)
- ✅ Referral code support (`?referral_code=` or `?ref_code=`)
- ✅ Custom fields for subscriber type (DEVELOPER, BUSINESS, ENTHUSIAST, RESOURCES)
- ✅ Automatic welcome email from Beehiiv
- ✅ Fallback error handling

## Referral URL Examples

Users can be referred with these URL formats:

```
https://yourdomain.com/newsletter?ref=https://referrer.com
https://yourdomain.com/newsletter?referral_url=https://referrer.com
https://yourdomain.com/newsletter?referral_code=FRIEND123
https://yourdomain.com/newsletter?utm_source=twitter&utm_medium=social&utm_campaign=launch
```

## API Endpoints Updated

- `/api/newsletter` - Main newsletter subscription
- `/api/resources/subscribe` - Resources page subscription

Both endpoints now:
- Send data to Beehiiv instead of Discord
- Accept referral tracking parameters
- Include proper error handling
- Store subscriber info in your database AND Beehiiv 