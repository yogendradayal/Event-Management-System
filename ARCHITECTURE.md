# Architecture Documentation

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

### CSS Classes
- Cards: `.card`, `.card-grid`, `.card-grid-2`, `.card-grid-3`, `.card-grid-4`
- Forms: `.form-card`, `.field`, `.form-row`, `.error-msg`
- Tables: `.table-wrap`, `table`, `thead`, `th`, `td`
- Buttons: `.btn`, `.btn-gold`, `.btn-blue`, `.btn-green`, `.btn-danger`, `.btn-outline`
- Badges: `.badge`, `.badge-green`, `.badge-blue`, `.badge-amber`, `.badge-red`
- Layout: `.page`, `.container`, `.navbar`, `.hero`

## Performance Considerations

1. **State Updates**: Uses functional updates with `setState(s => ...)` for efficient batching
2. **Component Re-renders**: Props are passed to avoid unnecessary re-renders
3. **Memoization**: Could be added for heavy components with `React.memo()`
4. **Context Splitting**: Could split AppCtx into smaller contexts if needed

## Future Architecture Improvements

1. **Backend Integration**
   - Connect to Node.js/Express API
   - Replace localStorage-based state with API calls
   - Add WebSocket for real-time updates

2. **State Management**
   - Migrate to Redux or Zustand for better scalability
   - Implement middleware for side effects

3. **Code Splitting**
   - Split into separate component files
   - Use React lazy loading for route-based code splitting
   - Implement dynamic imports

4. **Testing**
   - Add Jest and React Testing Library
   - Write unit tests for components
   - Add integration tests for workflows

5. **Documentation**
   - Component storybook
   - API documentation (future)
   - Deployment guides

---

For more information, see:
- [README.md](./README.md) - General project information
- [SCREENSHOTS.md](./SCREENSHOTS.md) - Screenshot guide
