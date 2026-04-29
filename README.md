# 🛍️ My Girl — Angular E-Commerce App

<p align="center">
  <img src="https://img.shields.io/badge/Angular-19-DD0031?style=for-the-badge&logo=angular&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/SCSS-Styled-CC6699?style=for-the-badge&logo=sass&logoColor=white" />
  <img src="https://img.shields.io/badge/JSON_Server-REST_API-lightgrey?style=for-the-badge" />
</p>

<p align="center">
  A fully functional e-commerce web application built with Angular — featuring authentication, product browsing, cart management, and order tracking.
</p>

---

## ✨ Features

- 🔐 **Authentication** — Login & Register with route guards and HTTP interceptors
- 🏠 **Landing Page** — Welcoming homepage to showcase the store
- 🗂️ **Categories** — Browse products by category
- 📦 **Products** — Full product listing with search/filter support
- 🔍 **Product Detail** — Detailed view for each product
- 🛒 **Cart** — Add, update, and remove items
- 📋 **Orders** — View order history
- 👤 **Profile** — Manage user account info
- 🚧 **404 Not Found** — Custom fallback page
- 🔒 **Auth Guard** — Protect private routes
- 🌐 **HTTP Interceptor** — Auto-attach auth tokens to API requests

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── cart/
│   │   ├── categories/
│   │   ├── landing/
│   │   ├── login/
│   │   ├── navbar/
│   │   ├── not-found/
│   │   ├── orders/
│   │   ├── product-detail/
│   │   ├── products/
│   │   ├── profile/
│   │   └── register/
│   ├── guards/
│   │   └── auth.guard.ts
│   ├── interceptors/
│   │   └── auth.interceptor.ts
│   ├── models/
│   │   ├── cart.model.ts
│   │   ├── order.model.ts
│   │   ├── product.model.ts
│   │   └── user.model.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── cart.service.ts
│   │   ├── order.service.ts
│   │   └── product.service.ts
│   ├── app.config.ts
│   ├── app.routes.ts
│   └── app.ts
├── index.html
├── main.ts
└── styles.scss
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>=18`
- Angular CLI `>=17`

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/my-girl.git

# Navigate to project directory
cd my-girl

# Install dependencies
npm install
```

### Run the App

```bash
# Start JSON Server (mock backend)
npx json-server --watch db.json --port 3000

# Start Angular dev server
ng serve
```

Then open your browser at `http://localhost:4200`

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Angular 19 | Frontend framework |
| TypeScript | Type-safe development |
| SCSS | Styling |
| RxJS | Reactive state & HTTP |
| JSON Server | Mock REST API backend |
| Angular Router | Client-side routing |
| HTTP Interceptors | Token injection |

---

## 📸 Pages Overview

| Page | Route | Access |
|---|---|---|
| Landing | `/` | Public |
| Login | `/login` | Public |
| Register | `/register` | Public |
| Categories | `/categories` | Protected |
| Products | `/products` | Protected |
| Product Detail | `/products/:id` | Protected |
| Cart | `/cart` | Protected |
| Orders | `/orders` | Protected |
| Profile | `/profile` | Protected |

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

This project is licensed under the terms in the [LICENSE](./LICENSE) file.

---

<p align="center">Made with ❤️ using Angular</p>
