## 🛒 Grocery App — React Frontend

This is a fully functional **Grocery Shopping Web App (Frontend)** built using **React + Vite**, featuring:

* 🔐 Login & Signup authentication pages
* 🛍️ Grocery list with images and prices
* 💡 Beautiful animated UI with framer-motion & Bootstrap
* 🌙 Dark mode support
* ✅ Reusable components & route protection

---

### 📁 Project Structure

```
grocery-app/
├── public/
│   └── index.html
├── src/
│   ├── assets/             # Local images (milk.jpeg, bread.jpeg, etc.)
│   ├── components/         # Reusable components (LoginForm, SignupForm, Navbar, etc.)
│   ├── pages/              # Main pages (Login.jsx, Signup.jsx, GroceryList.jsx)
│   ├── context/            # Auth and Cart context
│   ├── styles/             # Global & Auth CSS (authpages.css)
│   ├── App.jsx             # App routing
│   ├── main.jsx            # Entry point
│   └── ...
├── package.json
└── README.md
```

---

### ⚙️ Tech Stack

* **React** (with Vite)
* **Bootstrap** (UI components)
* **Framer Motion** (animations)
* **React Router** (navigation)
* **React Context API** (cart & auth state)
* **Local assets/images** (for grocery items)

---

### 🚀 Features

* 🔐 **Login & Signup Pages**

  * Grocery-styled header cards
  * Auth form animations with input validations

* 🛍️ **Grocery List Page**

  * Displays items with image, name, price
  * Add/remove from cart
  * Persistent across login

* 🎨 **UI Design Highlights**

  * Auth pages have animated glowing backgrounds, rounded cards, CTA headers
  * Grocery cards have subtle hover effects, shadows, and dynamic layout

* 📦 **Cart System**

  * Add/remove items
  * Cart state saved using Context API

---

### 🧑‍💻 Setup Instructions

#### 1. Clone the repository

```bash
git clone https://github.com/yourusername/grocery-app.git
cd grocery-app
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

---

### 📁 Assets Used

Add your grocery item images (like `milk.jpeg`, `bread.jpeg`, `onion.jpeg`) inside the `src/assets/` folder and map them via item name.

---

### 📌 Notes

* No backend or deployment included in this version.
* Ensure consistent file names for grocery images.
* Cart and auth logic use Context API with localStorage fallback.

---

### 📬 Contact

For help or suggestions, contact:
**Arpan Chakrabarty**
📧 [chakrabartyarpan8@gmail.com](mailto:chakrabartyarpan8@gmail.com)

---

