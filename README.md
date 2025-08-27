# 🏦 Wallet System (User & Merchant) [MVP Articture click to see](https://ambiguous-modem-7dd.notion.site/IPAY-Paytm-Like-Wallet-AWelcome-to-the-first-React-Native-Mastery-Project-158d7abb0e8181118729d8d8ac5dbf7f)

Paytm-like wallet application built with **Next.js**, **Prisma**, **Turborepo**, and **Docker**.
Supports both **User** and **Merchant** applications, along with a shared database and packages. where both **User** and **Merchant** have wallets to **send**, **receive**, **request**, and **refund** money. All transactions are **wallet-to-wallet**, with funds **loaded/unloaded** via a dummy bank integration.

---

## 🚀 Quick Start

Follow these steps to run **IPAY** locally:

```bash
# 1️⃣ Clone the repository
git clone https://github.com/10xdevian/IPAY.git

# 2️⃣ Navigate into the project
cd IPAY

# 3️⃣ Install dependencies
npm install

# 4️⃣ Start PostgreSQL with Docker (if Docker Installed)
docker compose up -d

# 5️⃣ Create environment file (IN root)
cp .env.example.txt .env

# Edit `.env` and update your DATABASE_URL

# 6️⃣ (from the root) Run database migrations & generate Prisma Client

npx prisma migrate dev --schema=packages/db/prisma/schema.prisma
npx prisma generate --schema=packages/db/prisma/schema.prisma
npx prisma studio --schema=packages/db/prisma/schema.prisma

# 7️⃣ Start the development server
npm run dev

```

---

# 🚀 Features Overview

- ###### 👤 User

  - Can register and complete KYC (Know Your Customer).

  - Creates a 4-digit transaction PIN during KYC.

  - Required for payments above ₹500.

  - For payments ≤ ₹500, PIN is optional.

  - Can add money to their wallet via dummy bank.
  - **Can** **send** **money**:

    - To merchants (for purchases).

    - To other users (via username, wallet ID, or public link).

  - Can request payments from other users via a public payment link.

  - Can receive money from merchants as refunds.

  - Can view complete transaction history.

- ###### 🛒 Merchant

  - Merchants also have a wallet linked to their account.

  - Can accept payments from users.

  - Can refund money back to the user’s wallet.

  - Can generate payment requests via public links.

- ###### 💳 Wallet

  - Every user/merchant has only one wallet.

  - Wallet balance is updated in real time after every transaction.

  - **Supports:**

    - Credits (Add money, receive from user/merchant).

    - Debits (Send money, refund, withdrawal).

- ###### 🔐 KYC + Security

  - Each user must complete KYC verification (basic details + 4-digit PIN).

  - PIN adds transaction-level security like UPI.

  - Transactions above ₹500 require PIN; small transfers do not.

- ###### 💸 Transactions

  - All payments are wallet-to-wallet transfers.

  - Transactions are recorded in the WalletTransaction model with:

  - **amount**

    - type (credit/debit)

    - status (pending, success, failed, refunded, disputed)

    - sender + receiver

    - transactionId

    - timestamps

- ###### 🔗 Public Payment Links

  - Users/Merchants can create payment links with:

  - **amount**

    - reason (description for payment)

  - These links can be shared with multiple users for easy payment collection.

  - **Example:**

    - Merchant creates a link for ₹999 "Concert Ticket".

    - Users open the link and pay directly via their wallet.

- ###### 🛡️ Refunds & Disputes

  - Merchants can initiate refunds for users.

  - Users can raise disputes if a transaction is incorrect.

```
Refunds and disputes are tracked under the WalletTransaction model.
```

---

# 📡 REST API Endpoints

#### 🔑 Auth

```
POST /auth/register      → Register new user/merchant
POST /auth/login         → Login
```

#### 👤 User / Merchant

```
GET  /users/:id          → Get user details
POST /users/:id/kyc      → Submit KYC + 4-digit PIN
GET  /merchants/:id      → Get merchant details
```

#### 💳 Wallet

```
GET  /wallet/:id         → Get wallet balance
POST /wallet/add-money   → Add funds (via dummy bank)
POST /wallet/withdraw    → Withdraw funds (to dummy bank)
```

#### 🔄 Transactions

```
POST /transactions/send   → Send money (user→user or user→merchant)
GET  /transactions/:id    → Get transaction details
POST /transactions/refund → Refund a transaction (merchant→user)
```

#### 🔗 Payment Links

```
POST /payment-links       → Create a payment link
GET  /payment-links/:id   → Get link details
POST /payment-links/pay   → Pay using a payment link
```

#### 🚨 Disputes

```
POST /disputes            → Raise a dispute
GET  /disputes/:id        → Check dispute status
PUT  /disputes/:id/resolve → Resolve or reject dispute
```

---

# ER Diagram

![ER Diagram](./assets/wallet-erd.png)

---

## 🎥 Project Demo

![Quick Preview](assets/demo.gif)

🎥 **Full Demo Video:** [Watch on YouTube](https://youtu.be/your_video_id)

---

## 🛠 Tech Stack

**Frontend:**  
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white)

**Backend:**  
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)  
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white)

**DevOps & Tools:**  
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)  
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=github-actions&logoColor=white)

---

**Repo setup:** [Paytm 1](https://projects.100xdevs.com/tracks/Paytm/paytm17-1)

**Adding WebHooks:** [Paytm 2](https://projects.100xdevs.com/tracks/PayTM2/paytm2-1)
