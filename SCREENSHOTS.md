# Screenshots Guide

This guide explains where to add screenshots for the Event Management System documentation.

## Adding Screenshots

### Steps to Capture Screenshots:

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Navigate through different pages** and take screenshots of each:

### Screenshots to Capture:

#### 1. **Home Page** (`src/screenshots/01-home.png`)
- Navigate to `http://localhost:5173`
- Capture the hero section with "Craft Extraordinary Events" heading
- Include the feature cards below

#### 2. **User Login** (`src/screenshots/02-login.png`)
- Click "Sign In" or navigate to login page
- Show the login form with email and password fields
- **Credentials:** user@ems.com / user123

#### 3. **Admin/Vendor Login** (`src/screenshots/02b-admin-login.png`)
- Show the admin login form
- **Credentials:** admin@ems.com / admin123

#### 4. **Vendor Browse** (`src/screenshots/03-vendors.png`)
- After user login, navigate to "Vendors"
- Show the category tabs (All, Catering, Florist, Decoration, Lighting)
- Capture vendor cards with names and descriptions

#### 5. **Product Listing** (`src/screenshots/04-products.png`)
- Click on a vendor (e.g., Golden Fork Catering)
- Show product cards with emoji, name, price, and "Add to Cart" button

#### 6. **Shopping Cart** (`src/screenshots/05-cart.png`)
- Add items to cart (click "Add to Cart" on products)
- Navigate to Cart
- Show cart items, quantities, and order summary

#### 7. **Checkout Step 1** (`src/screenshots/06-checkout-1.png`)
- Click "Proceed to Checkout"
- Show the form with delivery details (Name, Phone, Email, Address, City, State, Pin Code, Payment Method)
- Include the step indicator at the top

#### 8. **Checkout Step 2** (`src/screenshots/07-checkout-2.png`)
- Click "Review" button
- Show order review with items and delivery address

#### 9. **Checkout Step 3** (`src/screenshots/08-checkout-3.png`)
- Click "Confirm" button
- Show the confirmation step with order total

#### 10. **Order Success** (`src/screenshots/09-success.png`)
- After placing order, show the success page
- Capture the confirmation details with Order ID

#### 11. **Order Tracking** (`src/screenshots/10-orders.png`)
- Navigate to "Orders" in user dashboard
- Show the orders table with Order ID, Date, Items, Total, Payment, and Status

#### 12. **Guest List** (`src/screenshots/11-guests.png`)
- Navigate to "Guests"
- Show the guest list table with Name, Email, RSVP, and Table
- Show the "Add Guest" form on the right

#### 13. **Vendor Dashboard** (`src/screenshots/12-vendor-home.png`)
- Logout as user, login as vendor (vendor@ems.com / vendor123)
- Show the vendor home page with stats cards (Products, Orders, Requests)
- Include the dashboard cards

#### 14. **Vendor Products** (`src/screenshots/13-vendor-items.png`)
- Navigate to "My Items"
- Show the products table with Edit and Delete buttons

#### 15. **Add Product** (`src/screenshots/14-add-item.png`)
- Navigate to "Add Item"
- Show the form with Product Name, Price, and Emoji Icon selector

#### 16. **Transactions** (`src/screenshots/15-transactions.png`)
- Navigate to "Transactions"
- Show the orders table specific to vendor

#### 17. **Admin Dashboard** (`src/screenshots/16-admin-home.png`)
- Logout, login as admin (admin@ems.com / admin123)
- Show the admin dashboard with management cards

#### 18. **User Management** (`src/screenshots/17-admin-users.png`)
- Navigate to "Users"
- Show the users table with Delete button and Add User form

#### 19. **Vendor Management** (`src/screenshots/18-admin-vendors.png`)
- Navigate to "Vendors"
- Show the vendors table with vendor information

#### 20. **Membership Management** (`src/screenshots/19-memberships.png`)
- Navigate to "Memberships"
- Show the Add Membership tab and active memberships list

#### 21. **All Orders** (`src/screenshots/20-all-orders.png`)
- Navigate to "All Orders"
- Show the complete orders table

## Screenshot Requirements

- **Format:** PNG
- **Resolution:** 1280x720 (minimum)
- **Tools:** 
  - Windows: Snipping Tool, ShareX, or browser dev tools
  - Mac: Built-in Screenshot tool
  - Cross-platform: Greenshot, LightShot

## Directory Structure

```
ems-project/
├── screenshots/
│   ├── 01-home.png
│   ├── 02-login.png
│   ├── 03-vendors.png
│   ├── 04-products.png
│   ├── 05-cart.png
│   ├── 06-checkout-1.png
│   ├── 07-checkout-2.png
│   ├── 08-checkout-3.png
│   ├── 09-success.png
│   ├── 10-orders.png
│   ├── 11-guests.png
│   ├── 12-vendor-home.png
│   ├── 13-vendor-items.png
│   ├── 14-add-item.png
│   ├── 15-transactions.png
│   ├── 16-admin-home.png
│   ├── 17-admin-users.png
│   ├── 18-admin-vendors.png
│   ├── 19-memberships.png
│   └── 20-all-orders.png
```

## After Adding Screenshots

1. Save all screenshots to the `screenshots/` folder
2. Update image paths in `README.md` if they're stored in a different location
3. Commit and push:
   ```bash
   git add screenshots/
   git commit -m "Add application screenshots"
   git push origin main
   ```

## Tips for Better Screenshots

- Ensure the app is running smoothly (no loading spinners)
- Use consistent browser zoom (100%)
- Include the full UI without extra browser chrome
- For forms, show them filled with sample data
- Highlight key interactive elements if possible
- Use a consistent color theme throughout

---

For more help with taking screenshots, see the README.md file.
