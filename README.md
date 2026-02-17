# Event Management System (EventCraft)

A modern, full-featured Event Management System built with **React** and **Vite**, designed to help users plan events by connecting with premium vendors for catering, florals, decorations, and lighting services.

![EventCraft](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-4.4.0-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [User Roles](#user-roles)
- [Demo Credentials](#demo-credentials)
- [Key Features](#key-features)
- [Screenshots](#screenshots)
- [API Routes](#api-routes)
- [Contributing](#contributing)

## Features

### 🎯 Core Features
- **Multi-role Authentication** - Support for User, Vendor, and Admin roles
- **Vendor Browsing & Filtering** - Browse vendors by category (Catering, Florist, Decoration, Lighting)
- **Shopping Cart & Checkout** - Easy-to-use cart management with multi-step checkout
- **Order Management** - Track orders from received to delivery
- **Guest List Management** - Manage event attendees with RSVP tracking
- **Vendor Dashboard** - Add, edit, and manage products
- **Admin Dashboard** - User and vendor management, membership plans
- **Real-time Toast Notifications** - User feedback on actions
- **Responsive Design** - Mobile-friendly interface with beautiful dark theme

### 💼 Vendor Features
- Product/Service Management (add, edit, delete)
- View transactions and incoming orders
- Track order fulfillment status
- Custom request management

### 👥 User Features
- Browse and filter vendors by category
- Add items to cart and checkout
- Place and track orders
- Manage guest list with RSVP tracking
- Request custom items from vendors

### 🔐 Admin Features
- User account management
- Vendor account management
- Vendor membership plans and pricing
- View all platform orders
- Platform analytics

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18.2** | UI Framework |
| **Vite 4.4** | Build Tool & Dev Server |
| **CSS-in-JS** | Inline styles with design system |
| **React Hooks** | State management (useState, useContext) |
| **ES6+** | Modern JavaScript |

## Project Structure

```
ems-project/
├── src/
│   ├── EventManagementSystem.jsx    # Main App component
│   └── main.jsx                     # React entry point
├── index.html                       # HTML template
├── vite.config.js                   # Vite configuration
├── package.json                     # Project dependencies
└── README.md                        # This file
```

## Installation

### Prerequisites
- Node.js 14+ and npm 6+
- Git

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yogendradayal/Event-Management-System.git
   cd Event-Management-System
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

The app will be available at `http://localhost:5173`

## Usage

### Starting the App
```bash
npm run dev
```

After the development server starts, open your browser and navigate to:
```
http://localhost:5173
```

### Navigation
1. **Home Page** - Overview of the platform
2. **Login/Signup** - Choose role and authenticate
3. **Dashboard** - Access role-specific features
4. **Logout** - Exit your session

## User Roles

### 👤 User (Customer)
- Browse vendors by category
- Add items to cart
- Proceed through multi-step checkout
- Track order status
- Manage guest list with RSVP
- Request custom items

**Demo Credentials:**
- Email: `user@ems.com`
- Password: `user123`

### 🏪 Vendor
- Register and manage business profile
- Add and manage products/services with custom pricing
- View incoming orders and transactions
- Update order fulfillment status
- Respond to custom requests from users

**Demo Credentials:**
- Email: `vendor@ems.com`
- Password: `vendor123`

**Pre-loaded Vendors:**
1. Golden Fork Catering - Catering services
2. Bloom Florists - Floral arrangements
3. Glitter Decorations - Event decorations
4. Luminary Lighting - Professional lighting

### 👨‍💼 Admin
- Manage all user accounts
- Manage vendor accounts
- Create and update membership plans for vendors
- View all orders across the platform
- Monitor platform analytics

**Demo Credentials:**
- Email: `admin@ems.com`
- Password: `admin123`

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| User | `user@ems.com` | `user123` |
| Vendor | `vendor@ems.com` | `vendor123` |
| Admin | `admin@ems.com` | `admin123` |

## Key Features

### 🎨 UI/UX Highlights
- **Dark Theme** - Easy on the eyes with gold, blue, and green accent colors
- **Responsive Grid Layouts** - Auto-fill responsive cards
- **Smooth Animations** - Modal transitions and button hover effects
- **Progress Indicators** - Step-by-step checkout visualization
- **Custom Badges** - Status indicators with color coding
- **Real-time Feedback** - Toast notifications for user actions

### 🛒 Shopping Experience
1. **Browse** - Filter vendors by category
2. **Select** - View vendor details and products
3. **Add to Cart** - Quantity management with +/- buttons
4. **Review** - Multi-step checkout (Details → Review → Confirm)
5. **Pay** - Support for Cash and UPI payment methods
6. **Track** - Real-time order status updates

### 💰 Vendor Management
- Add custom products with emoji icons
- Set flexible pricing
- Track all transacted orders
- Manage order fulfillment workflow
- View customer requests for custom items

### 🎁 Event Planning
- Guest list management with table assignments
- RSVP tracking (Pending, Confirmed, Declined)
- Request custom items from vendors
- Centralized order tracking

## System Architecture

The Event Management System (EventCraft) is built using a client-side React application with state management using React Hooks and Context API.

### Application Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    EventCraft Front-End                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              React Application (App.jsx)             │   │
│  │  - Route Management                                  │   │
│  │  - Provider for Store Context                        │   │
│  │  - Global Toast Notifications                        │   │
│  └──────────────────────────────────────────────────────┘   │
│                          ▲                                    │
│                          │                                    │
│        ┌─────────────────┼─────────────────┐                │
│        │                 │                  │                │
│   ┌────▼────┐      ┌────▼────┐      ┌────▼────┐            │
│   │   User  │      │ Vendor  │      │ Admin   │            │
│   │  Pages  │      │  Pages  │      │  Pages  │            │
│   └────┬────┘      └────┬────┘      └────┬────┘            │
│        │                 │                │                  │
│        └─────────────────┼────────────────┘                 │
│                          │                                    │
│        ┌─────────────────▼────────────────┐                 │
│        │  Shared Components & UI Layer    │                 │
│        │ - Navbar                         │                 │
│        │ - Toast                          │                 │
│        │ - Cards, Forms, Tables           │                 │
│        │ - Buttons, Badges                │                 │
│        └─────────────────┬────────────────┘                 │
│                          │                                    │
│        ┌─────────────────▼────────────────┐                 │
│        │      useStore() Hook             │                 │
│        │  (Context + State Management)    │                 │
│        │ - Authentication                 │                 │
│        │ - Cart Operations                │                 │
│        │ - Order Management               │                 │
│        │ - Vendor Management              │                 │
│        │ - Admin Functions                │                 │
│        └─────────────────┬────────────────┘                 │
│                          │                                    │
│        ┌─────────────────▼────────────────┐                 │
│        │   Global State (INITIAL)         │                 │
│        │ - users[]                        │                 │
│        │ - vendors[]                      │                 │
│        │ - orders[]                       │                 │
│        │ - cart[]                         │                 │
│        │ - session                        │                 │
│        │ - requests[]                     │                 │
│        │ - memberships[]                  │                 │
│        └──────────────────────────────────┘                 │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App
├── Navbar
│   ├── Home (no session)
│   ├── Login Links (no session)
│   └── Authenticated Nav (with session)
│       ├── User Nav
│       ├── Vendor Nav
│       └── Admin Nav
┌──────────────────────────────────────────────────────────┐
│ Page Component (switches based on route)                 │
├──────────────────────────────────────────────────────────┤
│                                                           │
├─ Public Pages                                            │
│  ├── HomePage                                            │
│  ├── AdminLogin                                          │
│  ├── VendorLogin                                         │
│  ├── VendorSignup                                        │
│  ├── UserLogin                                           │
│  └── UserSignup                                          │
│                                                           │
├─ User Pages                                              │
│  ├── UserPortal (dashboard)                              │
│  ├── VendorBrowse (with category filter)                │
│  ├── Products (vendor details + items)                   │
│  ├── Cart (shopping cart overview)                       │
│  ├── Checkout (3-step process)                           │
│  ├── SuccessPage (order confirmation)                    │
│  ├── OrderStatus (order tracking)                        │
│  ├── GuestList (guest management)                        │
│  └── RequestItem (custom requests)                       │
│                                                           │
├─ Vendor Pages                                            │
│  ├── VendorHome (dashboard)                              │
│  ├── YourItems (product listing)                         │
│  ├── AddItem (product creation)                          │
│  ├── Transactions (order history)                        │
│  ├── ProductStatus (order fulfillment)                   │
│  └── RequestItem (view requests)                         │
│                                                           │
└─ Admin Pages                                             │
   ├── AdminDash (dashboard)                               │
   ├── MaintainUser (user management)                      │
   ├── MaintainVendor (vendor management)                  │
   ├── Membership (membership plans)                       │
   └── AllOrders (order overview)                          │
                                                            │
└── Toast (notifications)
```

## State Management Flow

### useStore Hook Structure

```javascript
const store = useStore();

// Returns object with:
{
  // State
  state: {
    users: User[],
    vendors: Vendor[],
    admins: Admin[],
    cart: CartItem[],
    orders: Order[],
    memberships: Membership[],
    requests: Request[],
    session: Session | null
  },

  // Methods
  login(role, email, password): boolean,
  logout(): void,
  signupUser(name, email, password): boolean,
  signupVendor(name, email, password, category): boolean,
  
  // Cart
  addToCart(product, vendorId): void,
  removeFromCart(productId): void,
  updateQty(productId, qty): void,
  clearCart(): void,
  
  // Orders
  placeOrder(details): orderId,
  updateOrderStatus(orderId, status): void,
  
  // Products
  addProduct(vendorId, product): void,
  deleteProduct(vendorId, productId): void,
  updateProduct(vendorId, product): void,
  
  // Admin
  addMembership(membership): void,
  addRequest(request): void,
  deleteUser(id): void,
  deleteVendor(id): void,
  getVendor(id): Vendor | undefined,
  getSession(): Session | null
}
```

## Data Models

### User Model
```javascript
{
  id: number,
  name: string,
  email: string,
  password: string,
  role: "user"
}
```

### Vendor Model
```javascript
{
  id: number,
  name: string,
  email: string,
  password: string,
  role: "vendor",
  category: "Catering" | "Florist" | "Decoration" | "Lighting",
  contact: string,
  desc: string,
  products: Product[]
}
```

### Product Model
```javascript
{
  id: number,
  name: string,
  price: number,
  emoji: string
}
```

### CartItem Model
```javascript
{
  productId: number,
  vendorId: number,
  name: string,
  price: number,
  emoji: string,
  qty: number
}
```

### Order Model
```javascript
{
  id: string, // "ORD-{timestamp}"
  userId: number,
  name: string,
  email: string,
  number: string,
  address: string,
  city: string,
  state: string,
  pinCode: string,
  paymentMethod: "Cash" | "UPI",
  items: CartItem[],
  total: number,
  status: "Received" | "Ready for Shipping" | "Out For Delivery",
  createdAt: string
}
```

### Session Model
```javascript
{
  role: "user" | "vendor" | "admin",
  id: number,
  name: string
}
```

### Membership Model
```javascript
{
  id: number,
  no: string, // "MEM-{timestamp}"
  vendorId: number,
  plan: "6 months" | "1 year" | "2 years",
  price: string
}
```

### Request Model
```javascript
{
  id: number,
  userId: number,
  item: string,
  desc: string,
  date: string
}
```

## Routing

The application uses client-side routing with page state management:

```
Pages and Routes:

1. Public Routes:
   - "home" - Homepage
   - "adminLogin" - Admin login
   - "vendorLogin" - Vendor login
   - "vendorSignup" - Vendor registration
   - "userLogin" - User login
   - "userSignup" - User registration

2. User Routes (requires session.role === "user"):
   - "userPortal" - Dashboard
   - "vendorBrowse" - Browse vendors
   - "products" - View vendor products
   - "cart" - Shopping cart
   - "checkout" - Multi-step checkout
   - "success" - Order confirmation
   - "orderStatus" - Order tracking
   - "guestList" - Guest list management
   - "requestItem" - Request custom items

3. Vendor Routes (requires session.role === "vendor"):
   - "vendorHome" - Dashboard
   - "yourItems" - Product listing
   - "addItem" - Add new product
   - "transactions" - Order history
   - "productStatus" - Order management
   - "requestItem" - View requests

4. Admin Routes (requires session.role === "admin"):
   - "adminDash" - Dashboard
   - "maintainUser" - User management
   - "maintainVendor" - Vendor management
   - "membership" - Membership plans
   - "allOrders" - View all orders
```

## Authentication Flow

```
1. User selects role (User/Vendor/Admin)
2. User navigates to login or signup
3. On login:
   - Validate credentials against state
   - If valid: set session with role, id, name
   - Navigate to role-specific dashboard
4. On signup:
   - Check if email exists
   - Create new user/vendor in state
   - Set session
   - Navigate to dashboard
5. Logout:
   - Clear session
   - Clear cart
   - Navigate to home
```

## Styling Architecture

### Design System Variables
```css
:root {
  --bg: #0a0f1e;              /* Primary background */
  --surface: #111827;          /* Card backgrounds */
  --surface2: #1a2235;         /* Secondary surface */
  --border: #1f2d45;           /* Border color */
  --accent: #e8b86d;           /* Gold accent */
  --accent2: #5b8dee;          /* Blue accent */
  --accent3: #4fd1a5;          /* Green accent */
  --danger: #f87171;           /* Error/danger color */
  --text: #e8edf5;             /* Primary text */
  --muted: #6b7a99;            /* Secondary text */
  --font-display: 'Playfair Display', serif;
  --font-body: 'DM Sans', sans-serif;
  --radius: 14px;              /* Border radius */
  --shadow: 0 8px 32px rgba(0,0,0,.5);
  --transition: .22s cubic-bezier(.4,0,.2,1);
}
```
## Directory Guide

### src/EventManagementSystem.jsx
Contains the entire application including:
- **Styles** - CSS-in-JS with design variables
- **Context & Store** - State management using React Context
- **Components** - Reusable UI components (Toast, Navbar, etc.)
- **Pages** - Role-specific pages and routes
- **App Router** - Client-side routing based on page state

### State Management
The app uses a custom `useStore()` hook for state management:
- `users` - User accounts
- `vendors` - Vendor accounts and products
- `cart` - Shopping cart items
- `orders` - Customer orders
- `session` - Current user session
- `requests` - Custom item requests
- `memberships` - Vendor membership plans

## API Routes (Frontend State)

### Authentication
- `login(role, email, password)` - User login
- `logout()` - User logout
- `signupUser(name, email, password)` - New user registration
- `signupVendor(name, email, password, category)` - New vendor registration

### Shopping
- `addToCart(product, vendorId)` - Add item to cart
- `removeFromCart(productId)` - Remove item
- `updateQty(productId, qty)` - Update quantity
- `clearCart()` - Empty cart
- `placeOrder(details)` - Create new order
- `updateOrderStatus(orderId, status)` - Update order status

### Vendor Management
- `addProduct(vendorId, product)` - Add new product
- `deleteProduct(vendorId, productId)` - Remove product
- `updateProduct(vendorId, product)` - Edit product
- `getVendor(id)` - Fetch vendor details

### Admin Functions
- `deleteUser(id)` - Remove user account
- `deleteVendor(id)` - Remove vendor account
- `addMembership(m)` - Create membership plan
- `addRequest(req)` - Handle custom requests

## Design System

### Colors
- **Primary Accent**: `#e8b86d` (Gold)
- **Secondary Accent**: `#5b8dee` (Blue)
- **Tertiary Accent**: `#4fd1a5` (Green)
- **Danger**: `#f87171` (Red)
- **Background**: `#0a0f1e` (Dark Navy)
- **Surface**: `#111827` (Dark Gray)
- **Text**: `#e8edf5` (Light)
- **Muted**: `#6b7a99` (Gray)

### Typography
- **Display Font**: Playfair Display (serif)
- **Body Font**: DM Sans (sans-serif)

### Spacing & Layout
- **Border Radius**: 14px
- **Max Container Width**: 1100px
- **Grid Gap**: 20px
- **Responsive Breakpoint**: 640px

## Features to Extend

- [ ] Backend API integration (Node.js/Express)
- [ ] Database (MongoDB/PostgreSQL)
- [ ] Email notifications
- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] Image uploads for products
- [ ] Advanced filtering and search
- [ ] Rating and reviews
- [ ] Wishlist functionality
- [ ] Bulk order management
- [ ] Analytics dashboard

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

**Yogendra Dayal**
- GitHub: [@yogendradayal](https://github.com/yogendradayal)

## Support

For support, issues, or suggestions, please open an issue on the GitHub repository.

---

**Built with ❤️ using React & Vite**

*Last Updated: February 17, 2026*
