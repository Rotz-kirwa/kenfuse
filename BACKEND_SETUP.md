# Backend Database Setup Issue

## Problem
The backend is returning 500 errors because the PostgreSQL database is not properly configured.

## Solution

### Option 1: Setup PostgreSQL (Recommended)

```bash
# 1. Set PostgreSQL password for your user
sudo -u postgres psql -c "ALTER USER $USER WITH PASSWORD 'your_password';"

# 2. Create database
sudo -u postgres createdb -O $USER kenfuse_db

# 3. Update backend/.env
DATABASE_URL="postgresql://user:your_password@localhost:5432/kenfuse_db?schema=public"

# 4. Run migrations
cd backend
npx prisma migrate dev --name init
npx prisma generate

# 5. Start backend
npm run dev
```

### Option 2: Use Docker PostgreSQL (Easier)

```bash
# 1. Start PostgreSQL in Docker
docker run --name kenfuse-postgres -e POSTGRES_PASSWORD=password123 -e POSTGRES_DB=kenfuse_db -p 5432:5432 -d postgres:14

# 2. Update backend/.env
DATABASE_URL="postgresql://postgres:password123@localhost:5432/kenfuse_db?schema=public"

# 3. Run migrations
cd backend
npx prisma migrate dev --name init
npx prisma generate

# 4. Start backend
npm run dev
```

### Option 3: Quick Test (No Auth)

```bash
# 1. Allow local connections without password
sudo nano /etc/postgresql/*/main/pg_hba.conf
# Change: local all all peer
# To: local all all trust

# 2. Restart PostgreSQL
sudo service postgresql restart

# 3. Create database
createdb kenfuse_db

# 4. Update backend/.env
DATABASE_URL="postgresql://user:@localhost:5432/kenfuse_db?schema=public"

# 5. Run migrations
cd backend
npx prisma migrate dev --name init
npx prisma generate

# 6. Start backend
npm run dev
```

## Current Status
- ✅ Backend code is correct
- ✅ TypeScript compiles successfully
- ❌ Database not configured
- ❌ Migrations not run

## Next Steps
1. Choose one of the options above
2. Run the commands
3. Test registration at http://localhost:5173/register
