import { UserPlan } from '@prisma/client'

export type PlanFeature = {
  name: string
  free: boolean
  pro: boolean
  enterprise: boolean
}

export const PLAN_FEATURES: Record<string, PlanFeature> = {
  BASIC_PROFILE: {
    name: 'Basic Profile Listing',
    free: true,
    pro: true,
    enterprise: true,
  },
  PORTFOLIO_ITEMS: {
    name: 'Portfolio Items',
    free: true,
    pro: true,
    enterprise: true,
  },
  UNLIMITED_PORTFOLIO: {
    name: 'Unlimited Portfolio Items',
    free: false,
    pro: true,
    enterprise: true,
  },
  FEATURED_LISTING: {
    name: 'Featured Listing Priority',
    free: false,
    pro: true,
    enterprise: true,
  },
  ADVANCED_ANALYTICS: {
    name: 'Advanced Analytics',
    free: false,
    pro: true,
    enterprise: true,
  },
  LEAD_MANAGEMENT: {
    name: 'Lead Management Tools',
    free: false,
    pro: true,
    enterprise: true,
  },
  CUSTOM_BRANDING: {
    name: 'Custom Branding',
    free: false,
    pro: true,
    enterprise: true,
  },
  API_ACCESS: {
    name: 'API Access',
    free: false,
    pro: false,
    enterprise: true,
  },
  WHITE_LABEL: {
    name: 'White-label Options',
    free: false,
    pro: false,
    enterprise: true,
  },
  DEDICATED_SUPPORT: {
    name: 'Dedicated Account Manager',
    free: false,
    pro: false,
    enterprise: true,
  },
}

/**
 * Check if a user has access to a specific feature based on their plan
 */
export function hasFeatureAccess(userPlan: UserPlan, feature: string): boolean {
  const planFeature = PLAN_FEATURES[feature]
  if (!planFeature) {
    console.warn(`Unknown feature: ${feature}`)
    return false
  }

  switch (userPlan) {
    case 'FREE':
      return planFeature.free
    case 'PRO':
      return planFeature.pro
    case 'ENTERPRISE':
      return planFeature.enterprise
    default:
      return false
  }
}

/**
 * Get the maximum number of portfolio items allowed for a plan
 */
export function getMaxPortfolioItems(userPlan: UserPlan): number {
  switch (userPlan) {
    case 'FREE':
      return 3
    case 'PRO':
    case 'ENTERPRISE':
      return -1 // Unlimited
    default:
      return 0
  }
}

/**
 * Check if a user can create more portfolio items
 */
export function canCreatePortfolioItem(userPlan: UserPlan, currentCount: number): boolean {
  const maxItems = getMaxPortfolioItems(userPlan)
  return maxItems === -1 || currentCount < maxItems
}

/**
 * Get plan display name
 */
export function getPlanDisplayName(userPlan: UserPlan): string {
  switch (userPlan) {
    case 'FREE':
      return 'Free'
    case 'PRO':
      return 'Pro'
    case 'ENTERPRISE':
      return 'Enterprise'
    default:
      return 'Unknown'
  }
}

/**
 * Get plan color for UI
 */
export function getPlanColor(userPlan: UserPlan): string {
  switch (userPlan) {
    case 'FREE':
      return 'gray'
    case 'PRO':
      return 'blue'
    case 'ENTERPRISE':
      return 'purple'
    default:
      return 'gray'
  }
}

/**
 * Get upgrade suggestion for a user
 */
export function getUpgradeSuggestion(userPlan: UserPlan): string | null {
  switch (userPlan) {
    case 'FREE':
      return 'Upgrade to Pro for unlimited portfolio items and advanced features'
    case 'PRO':
      return 'Upgrade to Enterprise for API access and white-label options'
    case 'ENTERPRISE':
      return null // Already on highest plan
    default:
      return 'Upgrade to Pro for unlimited portfolio items and advanced features'
  }
}


