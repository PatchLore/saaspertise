// Utility functions to handle database differences between SQLite and PostgreSQL

export function parseArrayField(field: string | string[] | null | undefined): string[] {
  if (!field) return []
  
  // If it's already an array (PostgreSQL), return as is
  if (Array.isArray(field)) {
    return field
  }
  
  // If it's a string (SQLite JSON), parse it
  if (typeof field === 'string') {
    try {
      return JSON.parse(field)
    } catch {
      return []
    }
  }
  
  return []
}

export function normalizeConsultant(consultant: { services: string | string[], industries: string | string[], [key: string]: unknown }) {
  return {
    ...consultant,
    services: parseArrayField(consultant.services),
    industries: parseArrayField(consultant.industries)
  }
}

export function normalizeConsultants(consultants: { services: string | string[], industries: string | string[], [key: string]: unknown }[]) {
  return consultants.map(normalizeConsultant)
}
