# Client Handoff & Maintenance Plan: Kitchen Lanka

## 1. The Business Model: "Managed Service"
**Proposal:** "I will handle all the technical details (hosting, database, domain, updates) for a monthly fee. You just run your business."

### Pricing Structure
*   **Setup Fee:** One-time cost (e.g., $300 - $800) to customize and launch the site.
*   **Monthly Maintenance:** Recurring fee (e.g., $30 - $50/mo).
    *   *Includes:* Hosting costs, Database uptime, Periodic menu updates (if they can't do it themselves), Domain renewal management.

---

## 2. Technical Setup (The "Agency" approach)
Since you are managing it, you keep the accounts under your control but **isolated** to keep things clean.

### A. Hosting (Vercel)
*   Deploy the project on **your** Vercel Pro account (or create a separate "Agency" Team if you have multiple clients).
*   **Why:** You get better analytics and support, and you can manage all your clients from one dashboard.
*   **Action:**
    1.  Deploy `foodsweb` to Vercel.
    2.  Buy the domain (e.g., `kitchenlanka.com`) through Vercel or Namecheap and connect it.

### B. Database (Vercel Postgres)
*   **Simple & Integrated:** We are using Vercel's built-in Postgres database.
*   **Action:**
    1.  Deploy the project to Vercel.
    2.  Go to your Project Dashboard -> Storage tab.
    3.  Click **"Connect Store"** -> **"Postgres"**.
    4.  Click **"Create New"**.
    5.  It will automatically generate the `POSTGRES_PRISMA_URL` environment variables for you!

### C. Admin Access
*   They need to change prices and mark items "Sold Out" themselves.
*   **Action:**
    1.  Ensure the `/admin` URL is easy to find.
    2.  Give them a simple login (e.g., User: `kitchenmanager`, Pass: `[SecurePassword]`).
    3.  **Crucial:** Add a "Change Password" feature or promise to change it for them if asked, as currently it is an Environment Variable.

---

## 3. Maintenance Contracts (Protect Yourself)
You are selling a service, not just code. You need simple boundaries.

### What IS Included:
*   ✅ Hosting the website 24/7.
*   ✅ Fixing "bugs" (e.g., the site crashes).
*   ✅ Small text changes (e.g., "Change our phone number").

### What is NOT Included (Billable Extras):
*   ❌ "Can you add a Blog?" (New feature = New quote).
*   ❌ "Can you redesign the home page?" (Redesign = New quote).
*   ❌ "I want to accept credit cards now." (payment integration is a big task).

---

## 4. The "Bus Factor" (Emergency Handoff)
Even if you manage it, good ethics means they aren't trapped.
*   **Promise:** "If you ever want to move to another developer, I will export your data and give you the code."
*   **How:** You can download the SQL dump from Turso and zip up the GitHub repo.

---

## 5. Immediate Next Steps for You
1.  **Refactor Config:** Move hardcoded values (Phone, Name) to a config file so deploying a valid version is fast.
2.  **Secure Admin:** finalize how they log in. (Environment variable is fine for now if YOU manage the deployment).
3.  **Deploy to Vercel:** Get a live URL to show them.
4.  **Buy Domain:** Ask them if they have a domain name, or buy it for them and bill them.

---
**Summary:**
You are essentially becoming their IT department. They pay you specifically so they *don't* have to create accounts or learn what "Turso" is.
