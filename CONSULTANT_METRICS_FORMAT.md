# Consultant Performance Metrics Format

## Overview
This document records the format and implementation for consultant performance metrics that were removed from hardcoded values and can be added back when real data becomes available from consultants.

## Database Schema Fields Needed

Add these fields to the `Consultant` model in `prisma/schema.prisma`:

```prisma
model Consultant {
  // ... existing fields ...
  responseRate     Int?     // Percentage (e.g., 95 for 95%)
  responseTime     Int?     // Hours (e.g., 2 for 2 hours)
  projectsCompleted Int?    // Count (e.g., 45 for 45 projects)
  clientRating     Float?   // Decimal (e.g., 4.9 for 4.9/5 stars)
  // ... rest of fields ...
}
```

## Data Fetching Implementation

In `src/app/consultant/[id]/page.tsx`, update the `getConsultant` function around lines 113-116:

```typescript
// Replace the current null assignments with:
responseRate: consultant.responseRate || null,
responseTime: consultant.responseTime || null,
projectsCompleted: consultant.projectsCompleted || null,
clientRating: consultant.clientRating || null,
```

## Display Format in ConsultantProfile.tsx

### 1. Response Rate
```typescript
<div className="flex justify-between items-center">
  <span className="text-gray-600 font-medium">Response Rate</span>
  {consultant.responseRate ? (
    <span className="font-bold text-green-600 text-lg">{consultant.responseRate}%</span>
  ) : (
    <span className="text-gray-400 text-sm">Not yet rated</span>
  )}
</div>
```

### 2. Response Time
```typescript
<div className="flex justify-between items-center">
  <span className="text-gray-600 font-medium">Response Time</span>
  {consultant.responseTime ? (
    <span className="font-bold text-gray-900">{consultant.responseTime} hours</span>
  ) : (
    <span className="text-gray-400 text-sm">Not yet rated</span>
  )}
</div>
```

### 3. Projects Completed
```typescript
<div className="flex justify-between items-center">
  <span className="text-gray-600 font-medium">Projects</span>
  {consultant.projectsCompleted ? (
    <span className="font-bold text-gray-900">{consultant.projectsCompleted}+</span>
  ) : (
    <span className="text-gray-400 text-sm">Not yet rated</span>
  )}
</div>
```

### 4. Client Rating (with stars)
```typescript
<div className="flex justify-between items-center">
  <span className="text-gray-600 font-medium">Client Rating</span>
  {consultant.clientRating ? (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1,2,3,4,5].map((star) => (
          <Star key={star} className={`h-4 w-4 ${star <= Math.round(consultant.clientRating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
        ))}
      </div>
      <span className="font-bold text-gray-900">{consultant.clientRating}</span>
    </div>
  ) : (
    <span className="text-gray-400 text-sm">Not yet rated</span>
  )}
</div>
```

## Implementation Steps

1. **Add database fields** to Prisma schema
2. **Run migration**: `npx prisma migrate dev --name add-performance-metrics`
3. **Update data fetching** in consultant page
4. **Metrics will automatically display** when consultants provide real data
5. **Admin can input metrics** via admin dashboard (needs to be built)

## Current Status
- ✅ Conditional rendering implemented
- ✅ "Not yet rated" fallback working
- ✅ TypeScript types properly defined
- ❌ Database fields not yet added (waiting for consultant data)
- ❌ Admin input interface not yet built

## Notes
- All metrics are optional and display "Not yet rated" when null
- Star rating uses Math.round() for proper star fill calculation
- Green color for response rate (positive metric)
- Gray colors for neutral metrics
- Consistent styling across both "Performance Stats" and "Achievements & Stats" sections
