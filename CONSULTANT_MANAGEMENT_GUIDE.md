# Consultant Management Guide

## 🚨 IMPORTANT: Database Integration Status

**CRITICAL**: This app has been updated to use **REAL DATABASE DATA** instead of mock data. All consultant-related pages now fetch from the database.

### ✅ **Pages Updated to Use Database:**
- ✅ **Homepage** (`/src/app/page.tsx`) - Featured consultants from database
- ✅ **Consultant Profile** (`/src/app/consultant/[id]/page.tsx`) - Real consultant data
- ❌ **Directory Page** (`/src/app/directory/page.tsx`) - Still uses mock data (needs update)

---

## 📋 **Adding New Consultants - Step by Step**

### **Method 1: Using Script (Recommended)**

```bash
# Navigate to project directory
cd /Users/allendunn/Documents/ASDIR/consultants-directory

# Run the consultant creation script
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addConsultant() {
  try {
    // 1. Create user first
    const user = await prisma.user.create({
      data: {
        email: 'consultant@example.com',
        name: 'Consultant Name',
        password: 'temp_password_123', // CHANGE THIS
        role: 'CONSULTANT'
      }
    });
    
    // 2. Create consultant
    const consultant = await prisma.consultant.create({
      data: {
        userId: user.id,
        name: 'Consultant Name',
        description: 'Full description here...',
        shortDescription: 'Short description for cards',
        region: 'Location',
        services: ['Service 1', 'Service 2'],
        industries: ['Industry 1', 'Industry 2'],
        website: 'https://website.com',
        email: 'consultant@example.com',
        phone: '+1234567890',
        isPremium: true,        // Set to true for premium badge
        isApproved: true,       // Set to true to show in directory
        isFeatured: true        // Set to true to show on homepage
      }
    });
    
    console.log('✅ Consultant added:', consultant.name);
    console.log('ID:', consultant.id);
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.\$disconnect();
  }
}

addConsultant();
"
```

### **Method 2: Manual Database Entry**

1. **Connect to your Supabase database**
2. **Go to Table Editor → consultants**
3. **Add new row with these required fields:**
   - `name` (string)
   - `description` (text)
   - `region` (string)
   - `services` (JSON array: `["Service 1", "Service 2"]`)
   - `industries` (JSON array: `["Industry 1", "Industry 2"]`)
   - `email` (string)
   - `isPremium` (boolean)
   - `isApproved` (boolean)
   - `isFeatured` (boolean)

---

## 🔧 **Required Settings for New Consultants**

### **To Show on Homepage (Featured Section):**
```javascript
isFeatured: true,
isApproved: true
```

### **To Show Premium Badge:**
```javascript
isPremium: true
```

### **To Show in Directory:**
```javascript
isApproved: true
```

### **Performance Metrics (Optional):**
```javascript
responseRate: 95,        // Percentage (0-100)
responseTime: 2,         // Hours
projectsCompleted: 25,   // Number of completed projects
clientRating: 4.8        // Rating out of 5.0
```

**Note**: Metrics are currently hardcoded for "This AI Now" as realistic estimates. For other consultants, metrics will show default values (95%, 2h, 25+, 4.8) until real data is available.

---

## 🚨 **Common Issues & Solutions**

### **Issue: 404 Error on Consultant Profile**
**Cause**: Consultant profile page was using mock data instead of database
**Solution**: ✅ **FIXED** - Profile page now uses database

### **Issue: Consultant Not Showing on Homepage**
**Cause**: Homepage was using mock data instead of database
**Solution**: ✅ **FIXED** - Homepage now uses database

### **Issue: Consultant Not in Directory**
**Cause**: Directory page still uses mock data
**Status**: ❌ **NEEDS FIXING** - Directory page needs database integration

---

## 📝 **Data Structure Requirements**

### **Services Array Example:**
```json
["AI Implementation", "Process Automation", "AI Workflow Development"]
```

### **Industries Array Example:**
```json
["Small Business", "E-commerce", "Professional Services"]
```

### **Contact Information:**
- `email` (required)
- `phone` (optional)
- `website` (optional)

---

## 🔄 **Testing Checklist**

After adding a new consultant:

1. ✅ **Check Homepage** - Should appear in Featured Premium Consultants if `isFeatured: true`
2. ✅ **Check Profile Page** - Click "View Profile" should work (no 404)
3. ❌ **Check Directory** - Should appear in directory if `isApproved: true` (currently uses mock data)
4. ✅ **Check Premium Badge** - Should show crown icon if `isPremium: true`

---

## 🚀 **Future Improvements Needed**

### **High Priority:**
- [ ] **Update Directory Page** to use database instead of mock data
- [ ] **Add logo upload functionality** for consultants
- [ ] **Add testimonial management** for consultants

### **Medium Priority:**
- [ ] **Add portfolio item management** for consultants
- [ ] **Add case study management** for consultants
- [ ] **Add rate display options** for consultants

---

## 📞 **Quick Reference**

### **Database Connection:**
- **Local**: Uses `.env` file with `DATABASE_URL`
- **Production**: Uses production database URL

### **Key Files:**
- **Homepage**: `/src/app/page.tsx` ✅ Updated
- **Profile**: `/src/app/consultant/[id]/page.tsx` ✅ Updated
- **Directory**: `/src/app/directory/page.tsx` ❌ Needs update

### **Mock Data Files (DO NOT USE):**
- `/src/data/mockConsultants.ts` - Only for development/testing

---

## ⚠️ **IMPORTANT REMINDERS**

1. **ALWAYS use database data** - Never rely on mock data for production
2. **Test locally first** - Use `http://localhost:3000` to test new consultants
3. **Check all flags** - Ensure `isFeatured`, `isApproved`, `isPremium` are set correctly
4. **Update passwords** - Change temporary passwords for consultant users
5. **Add logos** - Consider adding logo URLs for better visual presentation

---

## 🎯 **Success Criteria**

A consultant is properly added when:
- ✅ Appears on homepage featured section (if `isFeatured: true`)
- ✅ Profile page loads without 404 error
- ✅ Shows premium badge (if `isPremium: true`)
- ✅ Appears in directory (when directory is updated to use database)
- ✅ All contact information displays correctly

---

*Last Updated: [Current Date]*
*Status: Homepage & Profile ✅ | Directory ❌*
