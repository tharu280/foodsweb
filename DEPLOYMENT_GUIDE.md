# Deployment Guide for Vercel + Vercel Postgres

## Step 1: Push to GitHub
1. Make sure your code is pushed to your GitHub repository.
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

## Step 2: Create Project on Vercel
1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **"Add New..."** -> **"Project"**.
3. Import your `foodsweb` repository.
4. **Do NOT** click "Deploy" yet.

## Step 3: Configure Database (The most important part)
1. On the project import screen (or in the Project Settings if you already created it):
   - Locate the **Storage** tab (usually visible after creation).
   - If setting up during import, just deploy first (it might fail, that's okay), then go to the project dashboard.
2. Go to the **Storage** tab in your Vercel Project Dashboard.
3. Click **"Create Database"**.
4. Select **Postgres**.
5. Choose a region (e.g., Washington D.C or closest to your customers).
6. Click **Create**.

## Step 4: Connect Database
1. Once created, scroll down to the **"Quickstart"** section.
2. Connect it to your Vercel Project.
3. Vercel will automatically add the environment variables (`POSTGRES_PRISMA_URL`, etc.) to your project.
4. Go to **Settings** -> **Environment Variables** to verify they are there.

## Step 5: Add Admin Credentials
1. In **Settings** -> **Environment Variables**, add these two variables:
   - `ADMIN_USER` = (e.g. `admin`)
   - `ADMIN_PASS` = (e.g. `securepassword123`)

## Step 6: Redeploy
1. Go to the **Deployments** tab.
2. Click the three dots on the latest deployment -> **Redeploy**.
3. It should now build successfully!

## Step 7: Seed the Database
Currently, your live database is empty. You need to run the seed script locally but pointing to the production database, OR use the Vercel console.

**Easiest way:**
1. On your local machine, install the Vercel CLI: `npm i -g vercel`
2. Link your local project: `vercel link`
3. Pull the environment variables: `vercel env pull .env.production`
4. Now, run the push command using that local .env file:
   ```bash
   npx dotenv -e .env.production -- npx prisma db push
   npx dotenv -e .env.production -- npx prisma db seed
   ```
   *(Note: You might need to install `dotenv-cli` for the above command to work: `npm i -g dotenv-cli`)*

## Alternate "Quick Fix" for local development
If you want to keep working locally, you can pull the production credentials into your local `.env` file.
1. Copy the `POSTGRES_PRISMA_URL` and `POSTGRES_URL_NON_POOLING` from Vercel.
2. Paste them into your local `.env` file, replacing the `DATABASE_URL`.
