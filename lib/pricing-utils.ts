// Utility functions for handling pricing display

export function formatPrice(priceInPence: number): string {
  const pounds = priceInPence / 100
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(pounds)
}

export function formatHourlyRate(hourlyRateInPence: number): string {
  return `${formatPrice(hourlyRateInPence)}/hr`
}

export function formatProjectRange(minInPence: number, maxInPence?: number): string {
  if (!maxInPence) {
    return `From ${formatPrice(minInPence)}`
  }
  return `${formatPrice(minInPence)} - ${formatPrice(maxInPence)}`
}

export function getPricingDisplay(consultant: {
  hourlyRate?: number | null
  projectRateMin?: number | null
  projectRateMax?: number | null
  showRates: boolean
}) {
  if (!consultant.showRates) {
    return 'Contact for rates'
  }

  const pricing = []
  
  if (consultant.hourlyRate) {
    pricing.push(formatHourlyRate(consultant.hourlyRate))
  }
  
  if (consultant.projectRateMin) {
    pricing.push(`Projects ${formatProjectRange(consultant.projectRateMin, consultant.projectRateMax || undefined)}`)
  }
  
  return pricing.length > 0 ? pricing.join(' • ') : 'Contact for rates'
}


