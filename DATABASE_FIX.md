# FINAL DATABASE SETUP

## The Issue
Database `kenfuse_db` exists but user doesn't have permissions to create tables.

## SOLUTION - Run these commands:

```bash
# Option 1: Give current user ownership
sudo -u postgres psql -c "ALTER DATABASE kenfuse_db OWNER TO user;"

# Then run migrations
cd /home/user/Public/KENFUSE/backend
npx prisma db push
npx prisma generate
npm run dev
```

## OR Use the simpler /register page
The `/register` page at http://localhost:5173/register is already working and beautiful!
Just use that instead of `/create-account`.

## Test Registration
1. Go to: http://localhost:5173/register
2. Fill in: Name, Email, 4-digit PIN
3. Click "Create Account"
4. Should work once database permissions are fixed!

## Quick Database Fix Command:
```bash
sudo -u postgres psql -d kenfuse_db -c "GRANT ALL PRIVILEGES ON SCHEMA public TO \"user\"; GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO \"user\"; GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO \"user\";"
```

Then restart backend: `npm run dev`
