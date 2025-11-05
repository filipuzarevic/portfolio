# Expense Tracker Setup Instructions

## Step 1: Set Up the Database Table in Supabase

You need to create the expenses table in your existing Supabase project. Follow these simple steps:

### 1.1 Open Supabase SQL Editor

1. Go to https://supabase.com
2. Sign in to your account
3. Open your project (the one connected to your portfolio - vabhrxwmtokknatwcege)
4. Click on "SQL Editor" in the left sidebar (it has a code icon)

### 1.2 Run the SQL Script

Copy and paste the following SQL code into the SQL Editor and click "RUN":

```sql
-- Create the expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (this ensures users can only see their own data)
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Create security policies
CREATE POLICY "Users can view their own expenses"
ON expenses FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own expenses"
ON expenses FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own expenses"
ON expenses FOR DELETE
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own expenses"
ON expenses FOR UPDATE
USING (auth.uid() = user_id);
```

### 1.3 Verify the Table Was Created

1. Click on "Table Editor" in the left sidebar (it has a table icon)
2. You should now see an "expenses" table in the list
3. If you see it, you're done! ✅

## Step 2: Enable Email Authentication (if not already enabled)

1. In your Supabase dashboard, click on "Authentication" in the left sidebar
2. Click on "Providers"
3. Make sure "Email" is enabled (it should have a green toggle)
4. If it's not enabled, click on "Email" and toggle it on

## Step 3: Test the Application

### 3.1 Build and Deploy Your Portfolio

1. Open Terminal
2. Navigate to your portfolio folder:
   ```bash
   cd /Users/filipuzarevic/portfolio
   ```
3. Build your portfolio:
   ```bash
   npm run build
   ```
4. Deploy to Vercel (if you're using Vercel):
   ```bash
   vercel --prod
   ```
   OR push to GitHub and Vercel will automatically deploy

### 3.2 Access the Expense Tracker

Once deployed, you can access the expense tracker at:
**https://www.simpli-fi.me/expensetracker**

## Step 4: Create Your First Account and Add Expenses

1. Visit https://www.simpli-fi.me/expensetracker
2. Click "Create Account"
3. Enter your email and password
4. Check your email for the confirmation link and click it
5. Go back to https://www.simpli-fi.me/expensetracker
6. Sign in with your email and password
7. Start adding expenses!

## Features You Can Use

Once you're logged in, you can:

✅ **Add Expenses** - Fill in amount, description, category, and date
✅ **View All Expenses** - See a table of all your expenses
✅ **Filter Expenses** - Filter by category, start date, and end date
✅ **Visualize Data** - See pie charts, bar charts, and line charts of your spending
✅ **Export Data** - Download your expenses as CSV or Excel files
✅ **Track Summary** - See total expenses, average, and top spending category

## Troubleshooting

### "Error fetching expenses" message

**Problem:** The expenses table doesn't exist or RLS policies are not set up correctly.

**Solution:** Go back to Step 1 and make sure you ran the entire SQL script.

### Can't sign in after creating account

**Problem:** Email confirmation is required.

**Solution:**
1. Check your email inbox (and spam folder) for the confirmation email from Supabase
2. Click the confirmation link
3. Then try signing in again

### "Missing Supabase environment variables" error

**Problem:** This shouldn't happen since your Supabase is already configured, but if you see this:

**Solution:**
1. Check that `/Users/filipuzarevic/portfolio/src/integrations/supabase/client.ts` exists
2. It should contain your Supabase URL and key (which it does!)

## Local Testing (Optional)

If you want to test locally before deploying:

1. Open Terminal
2. Go to your portfolio folder:
   ```bash
   cd /Users/filipuzarevic/portfolio
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to: http://localhost:3000/expensetracker

## Need Help?

If something doesn't work:
1. Check the browser console (press F12 and look for red errors)
2. Make sure you completed Step 1 (SQL script) completely
3. Make sure email authentication is enabled in Supabase
4. Try signing out and signing in again
