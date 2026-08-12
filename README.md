# Hotel Booking — Restaurant Table Order Management System

A full-stack restaurant/hotel dining order management application consisting of an **Express + TypeScript backend** and an **Expo React Native mobile app** (Android, iOS, Web).

Despite the repo name, this is not a hotel room booking system. It is a point-of-sale system for managing tables, menus, orders, and transaction history at a restaurant or hotel restaurant.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Mobile App Setup](#mobile-app-setup)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
  - [Backend Scripts](#backend-scripts)
  - [Mobile Scripts](#mobile-scripts)
- [Architecture](#architecture)
  - [Backend Architecture](#backend-architecture)
  - [Mobile Architecture](#mobile-architecture)
- [API Reference](#api-reference)
- [Data Models](#data-models)
- [Features](#features)
- [App Navigation](#app-navigation)
- [Configuration](#configuration)

---

## Project Structure

```
Hotel Booking/
├── backend/                         # Express 5 REST API (TypeScript)
│   ├── src/
│   │   ├── server.ts                # Entry point: connects to DB, starts Express
│   │   ├── server/
│   │   │   ├── index.ts             # ExpressServer singleton
│   │   │   └── express.ts           # Express app config (CORS, JSON, routes, error handler, port 4000)
│   │   ├── router/
│   │   │   └── index.route.ts       # Mounts all sub-routers onto /api
│   │   ├── config/
│   │   │   ├── config/
│   │   │   │   ├── db.config.ts     # MongoDB connection URL
│   │   │   │   └── other.config.ts  # Admin credentials, JWT secret, backend URL
│   │   │   └── DB/
│   │   │       └── mongoose.ts      # Mongoose connection helper
│   │   ├── helper/
│   │   │   ├── Counter.ts           # Auto-increment ID generator
│   │   │   └── DateToNumber.ts      # Date-to-timestamp utility
│   │   ├── Table/                   # Table module (model, controller, service, repo, route)
│   │   ├── Item_Collection/         # Item Collection + nested Item sub-module
│   │   │   └── Item/                # Item CRUD with Vercel Blob image upload
│   │   ├── order/                   # Order module
│   │   ├── history/                 # History module (completed orders)
│   │   └── util/
│   │       ├── validate.ts          # Zod validation helper
│   │       ├── codec.ts             # Base64 encode/decode
│   │       ├── deleteVercelImage.ts # Vercel Blob image deletion
│   │       └── error/               # Custom error classes + global handler
│   ├── .env                         # Environment variables
│   ├── package.json
│   ├── tsconfig.json                # TypeScript config (Node 22 target)
│   ├── eslint.config.mts            # ESLint flat config
│   └── jest.config.mjs              # Jest config with ts-jest
│
├── mobile/                          # Expo React Native app (TypeScript)
│   ├── app/                         # Expo Router file-based routing
│   │   ├── _layout.tsx              # Root layout (Redux Provider + Stack)
│   │   ├── (tabs)/                  # Bottom tab navigator
│   │   │   ├── _layout.tsx          # Tab bar config (Home, Orders, History, More)
│   │   │   ├── index.tsx            # Home screen (table grid + Take Away)
│   │   │   ├── orders.tsx           # Active orders list
│   │   │   ├── history.tsx          # Completed orders history
│   │   │   └── more.tsx             # Management hub
│   │   ├── (add)/                   # Add items to order
│   │   │   └── [type].tsx           # eat-in / take-away item selector
│   │   ├── (order)/                 # Order detail/creation
│   │   │   └── [number].tsx         # Table number or "take-away" or "update"
│   │   └── (more)/                  # Management screens
│   │       ├── item.tsx             # Items & collections management
│   │       └── table.tsx            # Table management
│   ├── components/                  # Reusable UI components
│   │   ├── Button/                  # Button, XButton
│   │   ├── Card/                    # TableCard, ItemCard, OrderCard, HistoryCard
│   │   ├── footer/                  # OrderFooter, ReceiptFooter, ItemCardAddFooter
│   │   ├── Form/                    # ItemForm, ImagePicker, InputField
│   │   ├── layout/                  # SafeAreaView, Container, StackLayout, ItemSection, ItemsTable
│   │   ├── Model/                   # PopUpModal
│   │   └── Selector/                # PaymentMethodSelector
│   ├── redux/
│   │   ├── store.ts                 # Redux store
│   │   ├── api/                     # RTK Query API slices
│   │   │   ├── apiSlice.ts          # Base API with tag types
│   │   │   ├── table.ts, item.ts, item-collection.ts, order.ts, history.ts
│   │   └── features/
│   │       ├── Order.ts             # Order state slice
│   │       └── PaymentMethod.ts     # Payment method slice
│   ├── config/
│   │   └── index.ts                 # BACKEND_URL
│   ├── constants/
│   │   ├── data.ts                  # Tab configs, payment methods
│   │   └── useGetTheme.ts           # Responsive dimensions & screen detection
│   ├── hook/
│   │   ├── GetTotalPrice.ts         # Total price calculator
│   │   └── GetSelectedItem.ts       # Selected items by type
│   ├── interface/                   # TypeScript interfaces
│   │   ├── Item.ts, Table.ts, ItemCollection.ts, Order.ts, History.ts, Response.ts
│   ├── svg/                         # 16 SVG icon components
│   ├── global.css                   # NativeWind / Tailwind CSS
│   ├── app.json                     # Expo configuration
│   ├── metro.config.js              # Metro bundler + NativeWind
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

---

## Tech Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 22 | Runtime |
| TypeScript | 6.x | Language |
| Express | 5.x | HTTP framework |
| Mongoose | 9.x | MongoDB ODM |
| Zod | 4.x | Schema validation |
| Multer | 2.x | File upload handling |
| Vercel Blob | latest | Image storage |
| Jest | 30.x | Testing framework |
| SuperTest | 7.x | HTTP assertion testing |
| ESLint | 10.x | Linting |

### Mobile
| Technology | Version | Purpose |
|------------|---------|---------|
| React Native | 0.81.5 | UI framework |
| Expo SDK | 54 | Build tooling |
| Expo Router | 6.x | File-based navigation |
| TypeScript | 5.9.x | Language |
| Redux Toolkit | 2.x | State management |
| RTK Query | 2.x | API data fetching & caching |
| React Hook Form | 7.x | Form handling |
| NativeWind | 5.x | Tailwind CSS for React Native |
| Tailwind CSS | 4.x | Utility-first CSS |
| React Navigation | 7.x | Bottom tabs navigation |
| React Native Reanimated | 4.x | Animations |

---

## Prerequisites

- **Node.js** v22+
- **npm** v10+
- **MongoDB** running locally on `localhost:27017`
- **Expo Go** app on your phone (optional, for mobile testing)
- **Android Studio** and/or **Xcode** for native builds (optional)

---

## Getting Started

### Backend Setup

```bash
cd backend
npm install
```

Create or verify the `.env` file in `backend/`:

```env
MONGODB_URL=mongodb://localhost:27017
BLOB_STORE_ID=your_vercel_blob_store_id
BLOB_READ_WRITE_TOKEN=your_vercel_blob_read_write_token
SECRET=your_jwt_secret
ADMIN_NAME=admin
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=your_admin_password
```

Start the development server:

```bash
npm run dev
```

The API will be available at `http://localhost:4000`.

### Mobile App Setup

```bash
cd mobile
npm install
```

Update the backend URL in `mobile/config/index.ts` to point to your backend:

```ts
export const BACKEND_URL = "http://<YOUR_BACKEND_IP>:4000";
```

Start the Expo dev server:

```bash
npm start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS), or press `a` for Android emulator, `i` for iOS simulator, or `w` for web.

---

## Environment Variables

### `backend/.env`

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URL` | MongoDB connection string | Yes |
| `BLOB_STORE_ID` | Vercel Blob store identifier | Yes |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob read/write token | Yes |
| `SECRET` | JWT signing secret | Yes |
| `ADMIN_NAME` | Admin account name | No |
| `ADMIN_EMAIL` | Admin account email | No |
| `ADMIN_PASSWORD` | Admin account password | No |

---

## Available Scripts

### Backend Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts TypeScript in watch mode; recompiles & restarts on file changes |
| `npm run build` | Compiles TypeScript to `dist/` |
| `npm start` | Runs the compiled server (`node dist/server.js`) |
| `npm run start-pm2` | Runs with PM2 process manager for production |
| `npm test` | Runs all Jest tests |
| `npm run lint` | Lints the source code with ESLint |

### Mobile Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Starts the Expo development server |
| `npm run android` | Builds and runs on Android emulator/device |
| `npm run ios` | Builds and runs on iOS simulator |
| `npm run web` | Runs in a web browser |
| `npm run lint` | Lints the source code with Expo's ESLint config |

---

## Architecture

### Backend Architecture

The backend follows a **layered architecture pattern** with clear separation of concerns:

```
Route → Controller → Service → Repository → Model (Mongoose)
```

Each module (`Table`, `Item`, `ItemCollection`, `Order`, `History`) is self-contained with its own:

- **Model** — Mongoose schema definition and database connection (each module uses its own database)
- **Repository** — Data access layer; encapsulates all database queries
- **Service** — Business logic layer; processes data before passing to repository
- **Controller** — Handles HTTP request/response; delegates to service
- **Route** — Defines API endpoints and wires them to controllers
- **Interface** — TypeScript interfaces for request/response types
- **Middleware** — Request preprocessing (validation, file uploads)
- **Util** — Module-specific utilities

#### Database Design

Each module uses a **separate MongoDB database** within the same MongoDB instance:

| Database | Purpose |
|----------|---------|
| `Table` | Table records |
| `Item` | Individual menu items |
| `ItemCollection` | Groupings of items |
| `Order` | Active (unpaid) orders |
| `History` | Completed (paid) orders |
| `Counter` | Auto-incrementing ID sequences |

#### Error Handling

Custom error classes in `src/util/error/` provide structured error responses:

- `APIError` — Generic API error (500)
- `ValidationError` — Data validation failure (422)
- `NotFoundError` — Resource not found (404)
- `AuthorizeError` — Authorization failure (401)

All errors are caught by a global Express error handler and returned as JSON:
```json
{
  "message": "Error description",
  "statusCode": 422
}
```

#### Auto-Increment IDs

The `Counter` helper provides auto-incrementing integer IDs for Table (`TableId`), Item (`ItemId`), and Order (`OrderId`) records. Each counter maintains a `sequence_value` that increments with each new document.

### Mobile Architecture

The mobile app uses a **feature-based architecture** with Expo Router for file-based navigation:

#### State Management (Redux Toolkit + RTK Query)

- **RTK Query API slices** — Handle all backend communication with automatic caching, invalidation, and re-fetching
- **Redux state slices** — Manage local UI state:
  - `Order` slice — Current order being created/edited (items, quantities, table, price)
  - `PaymentMethod` slice — Selected payment method for cash-out

#### Navigation (Expo Router)

File-based routing using Expo Router 6.x with groups:

- `(tabs)` — Bottom tab navigator (Home, Orders, History, More)
- `(add)` — Item selection screen for adding to orders
- `(order)` — Order detail/creation screen
- `(more)` — Management screens for items and tables

#### Styling (NativeWind / Tailwind CSS)

NativeWind provides Tailwind CSS utility classes in React Native. Custom theme colors are defined in `global.css`:
- `--color-bg: #ebebed` — Background color
- `--color-bg-sec: #0084bf` — Secondary/primary accent color

The app also adapts to tablet vs phone layouts via the `useGetTheme` hook.

---

## API Reference

Base URL: `http://localhost:4000`

### Tables

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/table?taken=false` | List all tables (optional filter by taken status) |
| `POST` | `/table` | Create a new table |
| `DELETE` | `/table/:id` | Delete a table |

### Item Collections

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/item-collection` | List all item collections (includes nested items) |
| `POST` | `/item-collection` | Create a new item collection |
| `PATCH` | `/item-collection/:id` | Update an item collection |
| `DELETE` | `/item-collection/:id` | Delete an item collection |

### Items

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/items` | List all items |
| `GET` | `/item/:id` | Get a single item by ID |
| `POST` | `/item` | Create a new item (multipart: name, price, collection, photo) |
| `PATCH` | `/item/:id` | Update an item (optional photo upload) |
| `DELETE` | `/item/:id` | Delete an item |

### Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/orders` | List all active orders |
| `GET` | `/order/:id` | Get a single order |
| `POST` | `/order` | Create a new order |
| `PATCH` | `/order/:id` | Update an existing order |
| `DELETE` | `/order/:id` | Delete an order |

### History

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/historys` | List all order history records |
| `GET` | `/history/:id` | Get a single history record |
| `POST` | `/history` | Create a history record (cash out an order) |
| `PATCH` | `/history/:id` | Update a history record |
| `DELETE` | `/history/:id` | Delete a history record |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Returns server health status |

---

## Data Models

### Table

```typescript
{
  _id: ObjectId;
  number: number;       // Auto-incremented integer
  taken: boolean;       // Whether the table is currently occupied
}
```

### Item

```typescript
{
  _id: ObjectId;
  id: number;                    // Auto-incremented integer
  name: string;
  photo_url: string;             // Vercel Blob URL
  price: number;
  item_collection: ObjectId;     // Reference to ItemCollection
}
```

### ItemCollection

```typescript
{
  _id: ObjectId;
  name: string;
  items: ObjectId[];    // Array of Item references
  size: number;
}
```

### Order

```typescript
{
  _id: ObjectId;
  id: number;                    // Auto-incremented integer
  table: string;                 // Table number or "take-away"
  price: number;                 // Total order price
  eatIn: ItemWithCount[];        // Items for dine-in
  takeAway: ItemWithCount[];     // Items for take-away
  createdAt: Date;
  updatedAt: Date;
}

// ItemWithCount:
{
  item: ObjectId;       // Reference to Item
  count: number;        // Quantity
}
```

### History

```typescript
{
  // All Order fields plus:
  paymentMethod: string;         // "Cash" | "SCAN" | "Credit Card"
}
```

### Counter

```typescript
{
  _id: "ItemId" | "OrderId" | "TableId";
  sequence_value: number;
}
```

---

## Features

### Table Management
- Add tables with auto-incrementing numbers
- Remove tables (only the last/most recent table can be deleted)
- View available tables as a responsive grid (2 columns on phone, 3 on tablet)

### Menu Management
- Create, edit, and delete item collections (categories like Appetizers, Drinks, etc.)
- Create, edit, and delete individual items within collections
- Upload item photos (stored on Vercel Blob)
- Set item name and price

### Order Creation
- Select a table or "Take Away" to start a new order
- Add items as **Eat In** (dine-in) or **Take Away** from the menu
- Increase/decrease quantity per item
- Real-time running total price calculation
- Order state persisted in Redux until submitted

### Order Management
- View all active orders on the Orders tab
- Edit existing orders (add/remove items)
- **Cash Out** an order to complete it:
  - Select payment method: Cash, Scan, or Credit Card
  - Order moves from active orders to History
  - Table status updates to available

### Order History
- View all completed/cashed-out orders
- View detailed receipt for each transaction
- Receipt shows itemized breakdown with images, quantities, and prices
- Payment method recorded on each history entry

### Responsive Design
- Adaptive to both tablets and phones
- Different card sizes, column counts, and spacing based on screen width
- Keyboard-aware scrolling on forms
- Safe area insets for notched/rounded-corner devices

---

## App Navigation

```
┌─────────────────────────────────────────────────┐
│  Bottom Tabs                                     │
│                                                  │
│  [Home]    [Orders]   [History]   [More]         │
│    │           │           │          │           │
│    ▼           ▼           ▼          ▼           │
│  Table      Active     Completed  Management     │
│  Grid →     Orders →   History    Menu           │
│    │           │           │          │           │
│    ▼           ▼           ▼          ▼           │
│  Order      Edit /     View       Items /        │
│  Screen     Cash Out   Receipt    Tables         │
│    │                                          │
│    ▼                                          │
│  Add Items Screen                             │
│  (Eat In / Take Away)                         │
└─────────────────────────────────────────────────┘
```

### Screen Flow

1. **Home** → Grid of available tables → Tap a table or "Take Away" → **Order Screen**
2. **Order Screen** → "Add Items" → Item selection screen (pick Eat In or Take Away items) → Back to order → **Create/Update Order**
3. **Orders Tab** → List of active orders → Tap to **Edit** or **Cash Out**
4. **History Tab** → List of completed orders → Tap to view receipt details
5. **More Tab** → Management hub → **Items** (manage menu items & collections) or **Tables** (add/remove tables)

---

## Configuration

### Backend (`backend/src/config/config/`)

| File | Purpose |
|------|---------|
| `db.config.ts` | Exports `MONGODB_URL` from environment |
| `other.config.ts` | Exports `SECRET`, `BACKEND_URL`, `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` |
| `DB/mongoose.ts` | Mongoose connection & disconnect helper functions |

### Mobile (`mobile/config/index.ts`)

```ts
export const BACKEND_URL = "http://192.168.1.71:4000";
```

Change this to your backend's IP address/port before running the mobile app.

### Expo (`mobile/app.json`)

Key configuration:
- **Name:** `mobile`
- **Slug:** `mobile`
- **Scheme:** custom URL scheme
- **Platforms:** Android, iOS, Web
- **New Architecture:** Enabled
- **React Compiler:** Experimental mode
- **Splash Screen:** Custom image, auto-hide

### ESLint

Both projects use **ESLint flat config**. The backend includes TypeScript ESLint and Jest plugins; the mobile uses Expo's default ESLint preset.

### Testing

```bash
cd backend
npm test
```

Uses **Jest** with **ts-jest** preset, **mongodb-memory-server** for in-memory database testing, and **Supertest** for HTTP assertions. Test files follow `__tests__/` directory pattern with a 60-second timeout.
