-- Clean up all test users and consultants
-- This will delete all users and their associated consultant profiles

-- Delete all consultants (this will cascade and delete related data)
DELETE FROM consultants;

-- Delete all users
DELETE FROM users;

-- Verify everything is clean
SELECT 'Users count:' as info, COUNT(*) as count FROM users
UNION ALL
SELECT 'Consultants count:' as info, COUNT(*) as count FROM consultants;

