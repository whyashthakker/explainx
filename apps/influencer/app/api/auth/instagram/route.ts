// app/api/auth/instagram/route.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET() {
  try {
    // Generate a secure state parameter
    const state = crypto.randomBytes(16).toString('hex');

    // New scopes for Instagram Business API (valid until Jan 27, 2025)
    const scopes = [
      'instagram_business_basic',         // Required base permission
      'instagram_business_content_publish', // For publishing content
      'instagram_business_manage_comments', // For comment moderation
      'instagram_business_manage_messages'  // For messaging
    ];

    // Construct Instagram OAuth URL
    const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?${new URLSearchParams({
      client_id: process.env.INSTAGRAM_CLIENT_ID!,
      redirect_uri: process.env.INSTAGRAM_REDIRECT_URI!,
      scope: scopes.join(','),
      response_type: 'code',
      state: state,
      // Force Instagram business account login
      force_authentication: '1',
      enable_fb_login: '0'
    }).toString()}`;

    console.log('Generated Instagram Auth URL:', instagramAuthUrl); // For debugging

    return NextResponse.json({ 
      url: instagramAuthUrl,
      state: state
    });
  } catch (error) {
    console.error('Error generating Instagram auth URL:', error);
    return NextResponse.json(
      { error: 'Failed to initialize Instagram authorization' },
      { status: 500 }
    );
  }
}