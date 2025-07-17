# 🛒 Grocery Shop

A complete and visually appealing **MERN Stack Grocery Shop App** with login/signup, cart functionality, and grocery listing. It uses modern design, Bootstrap styling, reusable components, and local grocery image support.

---

## 📁 Project Structure

```

grocery-shop/
│
├── client/                         # React Frontend
│   ├── public/
│   └── src/
│       ├── assets/                # Grocery images (milk.jpg, bread.jpg, etc.)
│       ├── components/            # Reusable components
│       │   ├── CartItem.jsx
│       │   ├── GroceryCard.jsx
│       │   ├── GroceryList.jsx
│       │   ├── LoginForm.jsx
│       │   ├── Navbar.jsx
│       │   └── SignupForm.jsx
│       ├── context/               # Cart Context API
│       │   └── CartContext.jsx
│       ├── pages/                 # Page-level components
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   └── Signup.jsx
        |   |___Cart.jsx
|       |   |___Orderlist.jsx
│       ├── styles/                # CSS files
│       │   └── authpages.css
│       ├── App.jsx                # Main app component
│       └── main.jsx               # React entry point
│
├── server/                        # Node + Express Backend
│   ├── config/
│   │   └── db.js                  # MongoDB connection setup
│   ├── controllers/
│   │   ├── authController.js      # Login & signup logic
│   │   ├── cartController.js      # Cart add/remove
│   │   └── groceryController.js   # Grocery CRUD
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT verification
│   ├── models/
│   │   ├── CartItem.js
│   │   ├── GroceryItem.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   └── groceryRoutes.js
│   └── index.js                  # Entry point for backend server
│
├── .env                          # Environment variables (manually created)
├── package.json                  # Backend dependencies
├── client/package.json           # Frontend dependencies
└── README.md                     # Project documentation

````

---

## 🚀 Features

- 🔐 User Signup/Login with JWT
- 🛒 Add to Cart / Remove from Cart
- 🧾 View Grocery List (with image fallback to `/assets`)
- 💅 Styled with Bootstrap 5 + Custom CSS
- ⚡ Fast and optimized with Vite + React
- 🌗 Auth pages include animated backgrounds and framer motion

---

## 🛠️ Tech Stack

**Frontend:**  
- React + Vite  
- Bootstrap 5  
- React Router  
- Axios  
- Framer Motion  
- Context API

**Backend:**  
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT Authentication  
- Dotenv

---

## ⚙️ Local Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/arpan-lab/grocery-shop.git
cd grocery-shop
````

---

### 2. Backend Setup (`server/`)

```bash
cd server
npm install
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm start
```

---

### 3. Frontend Setup (`client/`)

```bash
cd client
npm install
npm run dev
```

---

## 🔐 Authentication

* JWT is used for securing API requests
* Protected routes redirect unauthenticated users to login

---

## 🛍️ Grocery Items

* Grocery images like `milk.jpg`, `bread.jpg`, etc., are stored in `/assets`
* If no custom image is provided, fallback uses static images

---

## ✨ UI Highlights

* Full-page animated background for login/signup
* Reusable card-based layout for groceries
* Modern typography and layout using Bootstrap grid system

---

## 📧 Contact

Built by **Arpan Chakrabarty**
Email: [chakrabartyarpan8@gmail.com](mailto:chakrabartyarpan8@gmail.com)

---
