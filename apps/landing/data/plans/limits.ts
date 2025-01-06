// constants/plans.ts

// Stripe Price IDs
export const STRIPE_PRICE_IDS = {
    STARTER: 'price_starter_xxxxx',
    GROWTH: 'price_growth_xxxxx',
    PROFESSIONAL: 'price_professional_xxxxx'
} as const;

// Plan names
export const PLAN_NAMES = {
    FREE: 'free',
    STARTER: 'starter',
    GROWTH: 'growth',
    PROFESSIONAL: 'professional'
} as const;

export type PlanName = typeof PLAN_NAMES[keyof typeof PLAN_NAMES];

// Campaign Types
export const CAMPAIGN_TYPES = {
    SPONSORED_POST: 'sponsored_post',
    PRODUCT_REVIEW: 'product_review',
    BRAND_AMBASSADOR: 'brand_ambassador',
    AFFILIATE_MARKETING: 'affiliate_marketing',
    UGC_CONTENT: 'ugc_content',
    PLATFORM_TAKEOVER: 'platform_takeover'
} as const;

export type CampaignType = typeof CAMPAIGN_TYPES[keyof typeof CAMPAIGN_TYPES];

// Platform Types
export const PLATFORM_TYPES = {
    INSTAGRAM: 'instagram',
    LINKEDIN: 'linkedin',
    TWITTER: 'twitter',
    FACEBOOK: 'facebook',
    TIKTOK: 'tiktok',
    YOUTUBE: 'youtube',
    TWITCH: 'twitch',
    PINTEREST: 'pinterest'
} as const;

export type PlatformType = typeof PLATFORM_TYPES[keyof typeof PLATFORM_TYPES];

// Feature type
export type Features = {
    platforms: PlatformType[];
    campaignTypes: CampaignType[];
    aiMatching: boolean;
    advancedAnalytics: boolean;
    customBranding: boolean;
    prioritySupport: boolean;
    bulkOperations: boolean;
    apiAccess: boolean;
    whiteLabel: boolean;
    automatedPayments: boolean;
    customWorkflows: boolean;
    exportData: boolean;
};

// Plan type
export type PlanFeature = {
    stripeId: string | null;
    maxCampaigns: number;
    maxApplications: number;
    maxTeamMembers: number;
    maxInfluencersPerCampaign: number;
    analyticsRetentionDays: number;
    creditPrice: number;
    minimumCredits: number;
    features: Features;
};

export const PLAN_FEATURES: Record<PlanName, PlanFeature> = {
    [PLAN_NAMES.FREE]: {
        stripeId: null,
        maxCampaigns: 1,
        maxApplications: 5,
        maxTeamMembers: 1,
        maxInfluencersPerCampaign: 5,
        analyticsRetentionDays: 30,
        creditPrice: 0.10,
        minimumCredits: 100,
        features: {
            platforms: [PLATFORM_TYPES.INSTAGRAM],
            campaignTypes: [CAMPAIGN_TYPES.SPONSORED_POST],
            aiMatching: false,
            advancedAnalytics: false,
            customBranding: false,
            prioritySupport: false,
            bulkOperations: false,
            apiAccess: false,
            whiteLabel: false,
            automatedPayments: false,
            customWorkflows: false,
            exportData: false
        }
    },
    [PLAN_NAMES.STARTER]: {
        stripeId: STRIPE_PRICE_IDS.STARTER,
        maxCampaigns: 5,
        maxApplications: 20,
        maxTeamMembers: 2,
        maxInfluencersPerCampaign: 10,
        analyticsRetentionDays: 90,
        creditPrice: 0.09,
        minimumCredits: 200,
        features: {
            platforms: [
                PLATFORM_TYPES.INSTAGRAM,
                PLATFORM_TYPES.LINKEDIN
            ],
            campaignTypes: [
                CAMPAIGN_TYPES.SPONSORED_POST,
                CAMPAIGN_TYPES.PRODUCT_REVIEW
            ],
            aiMatching: true,
            advancedAnalytics: false,
            customBranding: false,
            prioritySupport: false,
            bulkOperations: false,
            apiAccess: false,
            whiteLabel: false,
            automatedPayments: true,
            customWorkflows: false,
            exportData: true
        }
    },
    [PLAN_NAMES.GROWTH]: {
        stripeId: STRIPE_PRICE_IDS.GROWTH,
        maxCampaigns: 20,
        maxApplications: 100,
        maxTeamMembers: 5,
        maxInfluencersPerCampaign: 50,
        analyticsRetentionDays: 180,
        creditPrice: 0.08,
        minimumCredits: 500,
        features: {
            platforms: [
                PLATFORM_TYPES.INSTAGRAM,
                PLATFORM_TYPES.LINKEDIN,
                PLATFORM_TYPES.TWITTER,
                PLATFORM_TYPES.FACEBOOK,
                PLATFORM_TYPES.TIKTOK,
                PLATFORM_TYPES.YOUTUBE
            ],
            campaignTypes: [
                CAMPAIGN_TYPES.SPONSORED_POST,
                CAMPAIGN_TYPES.PRODUCT_REVIEW,
                CAMPAIGN_TYPES.BRAND_AMBASSADOR,
                CAMPAIGN_TYPES.AFFILIATE_MARKETING,
                CAMPAIGN_TYPES.UGC_CONTENT
            ],
            aiMatching: true,
            advancedAnalytics: true,
            customBranding: true,
            prioritySupport: false,
            bulkOperations: true,
            apiAccess: true,
            whiteLabel: false,
            automatedPayments: true,
            customWorkflows: true,
            exportData: true
        }
    },
    [PLAN_NAMES.PROFESSIONAL]: {
        stripeId: STRIPE_PRICE_IDS.PROFESSIONAL,
        maxCampaigns: -1,
        maxApplications: -1,
        maxTeamMembers: 15,
        maxInfluencersPerCampaign: -1,
        analyticsRetentionDays: 365,
        creditPrice: 0.07,
        minimumCredits: 1000,
        features: {
            platforms: Object.values(PLATFORM_TYPES) as PlatformType[],
            campaignTypes: Object.values(CAMPAIGN_TYPES) as CampaignType[],
            aiMatching: true,
            advancedAnalytics: true,
            customBranding: true,
            prioritySupport: true,
            bulkOperations: true,
            apiAccess: true,
            whiteLabel: true,
            automatedPayments: true,
            customWorkflows: true,
            exportData: true
        }
    }
};

export type PlanTier = keyof typeof PLAN_FEATURES;

// Helper functions
export function canUserAccessFeature<K extends keyof Features>(
    planName: PlanName, 
    feature: K
): Features[K] extends boolean ? boolean : boolean {
    const featureValue = PLAN_FEATURES[planName].features[feature];
    if (Array.isArray(featureValue)) {
        return featureValue.length > 0;
    }
    return featureValue as boolean;
}

export function canUserAccessPlatform(planName: PlanName, platform: PlatformType): boolean {
    return PLAN_FEATURES[planName].features.platforms.includes(platform);
}

export function canUserAccessCampaignType(planName: PlanName, campaignType: CampaignType): boolean {
    return PLAN_FEATURES[planName].features.campaignTypes.includes(campaignType);
}

export function getUserCampaignLimit(planName: PlanName): number {
    return PLAN_FEATURES[planName].maxCampaigns;
}

export function getCreditPrice(planName: PlanName): number {
    return PLAN_FEATURES[planName].creditPrice;
}

export function isUnlimited(value: number): boolean {
    return value === -1;
}