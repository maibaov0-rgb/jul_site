# System Architecture & Development Prompt
**Role:** You are a Senior Full-Stack Developer and DevOps Engineer. 
**Task:** Build and deploy a production-ready modern e-commerce website for hair care cosmetics. You have terminal access to the VPS and must handle both coding and deployment.

## 1. Project Overview
An online store for hair care products. 
**Main expert:** Yulia Danilchenko (Юлія Данільченко) - cosmetologist.
**Design vibe:** Modern, clean, minimalist, premium, mobile-first.

**CRITICAL REQUIREMENT:** The default and ONLY language of the user interface (all buttons, forms, placeholders, messages) MUST be Ukrainian. 

## 2. Tech Stack (STRICT)
**Frontend:**
- Next.js (latest, App Router)
- TypeScript, Tailwind CSS, Framer Motion
- Zustand (for cart state management)

**Backend:**
- NestJS (Node.js)
- PostgreSQL
- Prisma ORM

**Integrations & Storage:**
- Native Telegram Bot API (integrated directly into NestJS via `telegraf` or native HTTP requests. No external automation tools).
- Nova Poshta delivery (MVP: manual text input for city/branch).
- Cloudinary (for product image uploads).

## 3. Core Features
**3.1. Frontend (UI/UX)**
- **Homepage:** Hero section, Yulia Danilchenko expert block (photo + bio + "Отримати консультацію" button linked to messengers), Featured products grid.
- **Catalog:** Categories (Шампуні, Маски, Гелі, Інше). Product cards (Image, Name, Price, "В кошик" button).
- **Product Page:** Image gallery, detailed description, add to cart.
- **Cart & Checkout:** Zustand cart. Form: ПІБ (Name), Телефон (Phone), Відділення Нової Пошти (Branch). 
- **Payment Flow:** After submission, save order and display a "Thank You" page with the Master's IBAN details for manual payment.

**3.2. Backend (NestJS)**
- REST API for products and orders.
- **Telegram Notification Service:** Upon successful order creation, immediately send a message to the admin's Telegram containing: Order ID, Customer info, Delivery details, Products list, and Total price.
- **Admin Endpoints:** Secured endpoints to upload images to Cloudinary, create/edit products, and view orders.

**3.3. Database Models (Prisma)**
- `Product`: id, name, description, price, category, imageUrls[]
- `Order`: id, products (JSON or relation), totalPrice, customerName, phone, deliveryInfo, status, createdAt

## 4. DevOps & Deployment Strategy
You have terminal access to the production VPS. Use the following deployment strategy:
1. **Database:** Deploy PostgreSQL using a manual `docker run` command with persistent volumes (avoid docker-compose).
2. **Backend:** Build the NestJS app and manage the process using `pm2`.
3. **Frontend:** Build the Next.js app and run it via `pm2` or custom node server.
4. **Reverse Proxy:** Configure `Nginx` to route traffic (e.g., `/api` to NestJS, `/` to Next.js).
5. **Environment:** Create `.env` files for both frontend and backend securely.

## 5. Execution Plan (Build it Step-by-Step)
**DO NOT generate all code at once.** Wait for my confirmation after each step.

* **Step 1: Frontend Setup & UI Core:** Scaffold Next.js, set up Tailwind, layout, and fonts. Build the Homepage and configure routing.
* **Step 2: Frontend Pages & Mock Data:** Build the Catalog, Product Page, Cart (with Zustand), and Checkout UI. **Use hardcoded/mock data** for products at this stage so I can review the design, animations, and flow immediately without needing a database.
* **Step 3: VPS Setup & Database:** Shift to the server infrastructure. Install necessary packages (Node, Docker). Run the PostgreSQL docker container and initialize Prisma.
* **Step 4: Backend Core (NestJS):** Scaffold NestJS, create Prisma schema, generate client, and build CRUD API for Products. Implement the Telegram order notification service.
* **Step 5: Integration:** Connect the beautiful Frontend UI to the real NestJS API. Replace the mock data with database calls.
* **Step 6: Production Deployment & Nginx:** Build both apps, configure PM2 ecosystem, write Nginx config, and start the live system.

**Acknowledge this file and ask me if I am ready to begin Step 1.**