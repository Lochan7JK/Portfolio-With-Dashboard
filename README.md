# 🚀 Dynamic Developer Portfolio & Admin Dashboard

A modern **full-stack MERN portfolio platform** with a fully dynamic admin dashboard, visitor analytics, contact management system, Google OAuth authentication, and responsive cyberpunk-inspired UI.

Built to showcase projects, skills, and creativity while also functioning as a complete content management system for the portfolio owner.

---

# ✨ Features

## 🌐 Frontend Features

* Modern cyberpunk-inspired UI/UX
* Fully responsive design
* Animated hero section with particles
* Dynamic typewriter role animation
* Interactive navbar with active section tracking
* Floating social media panel
* Animated footer section
* Smooth scrolling navigation
* Dynamic project showcase
* Practice projects carousel/cards
* Contact form with persistence
* Toast notifications
* Loading states and transitions

---

## 🔐 Authentication Features

* Manual admin login
* Google OAuth login
* JWT authentication
* Protected dashboard routes
* Persistent login sessions
* Secure token verification
* Logout functionality

---

# 🛠️ Admin Dashboard Features

A fully custom admin panel built from scratch.

## 📌 Dynamic Sections

* Hero Section Management
* About Section Management
* Major Projects Management
* Practice Projects Management
* Contact Inbox System
* Social Links Management

---

## 📩 Contact Management System

* Stores messages in database
* Email delivery using Resend
* Inbox-style dashboard UI
* Mark as read/unread
* Star important messages
* Delete messages
* Reply directly from dashboard
* Real-time unread counter
* Notification badges
* Relative timestamps

---

## 📊 Analytics System

* Visitor tracking
* Unique visitors count
* Contact statistics
* Device/browser tracking
* Analytics dashboard cards
* Interactive charts using Recharts

---

# ⚡ Tech Stack

## Frontend

* React.js
* Tailwind CSS
* Framer Motion
* Axios
* React Router DOM
* React Toastify
* React Icons
* Recharts
* React Type Animation
* tsParticles
* Day.js

---

## Backend

* Node.js
* Express.js
* PostgreSQL
* JWT Authentication
* bcrypt
* Google OAuth
* Resend API
* REST APIs

---

# 🗄️ Database

Hosted on:

* Neon PostgreSQL

Tables used:

* users
* projects
* minor_projects
* contacts
* hero
* about
* socials
* visitors

---

# ☁️ Deployment

## Planned Deployment

| Service  | Platform |
| -------- | -------- |
| Frontend | Render   |
| Backend  | Render   |
| Database | Neon     |

---

# 📱 Responsive Design

The application is optimized for:

* Desktop
* Tablet
* Mobile Devices

Includes:

* Mobile sidebar toggle
* Responsive dashboard layout
* Responsive project cards
* Adaptive typography
* Mobile-friendly navigation

---

# 📂 Project Structure

```bash
client/
 ├── src/
 │   ├── components/
 │   ├── pages/
 │   ├── context/
 │   ├── assets/
 │   └── App.jsx
 │
server/
 ├── routes/
 ├── middleware/
 ├── utils/
 ├── db.js
 └── index.js
```

---

# 🔥 Major Functionalities

## Dynamic Portfolio Management

Every important section of the portfolio can be updated directly from the admin dashboard without touching the codebase.

---

## Secure Authentication System

Supports:

* Email/password login
* Google OAuth login
* JWT-based authorization
* Protected admin routes

---

## Visitor Tracking System

Tracks:

* Total visitors
* Unique visitors
* Browser/device information
* Daily traffic statistics

---

## Contact Persistence + Email Notifications

When someone submits the contact form:

1. Message is stored in PostgreSQL
2. Email notification is sent using Resend
3. Dashboard inbox gets updated

---

# 🎨 UI Inspiration

Designed with inspiration from:

* Cyberpunk aesthetics
* Glassmorphism
* Modern SaaS dashboards
* Interactive developer portfolios

---

# 📸 Screenshots

> Add screenshots/gifs of your portfolio and dashboard here.

Suggested sections:

* Hero Section
* Dashboard UI
* Projects Section
* Contact Inbox
* Analytics Dashboard
* Mobile Responsive View

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
```

---

## 2️⃣ Install Frontend Dependencies

```bash
cd client
npm install
```

---

## 3️⃣ Install Backend Dependencies

```bash
cd server
npm install
```

---

# 🔑 Environment Variables

## Frontend `.env`

```env
VITE_API_URL=
VITE_GOOGLE_CLIENT_ID=
```

---

## Backend `.env`

```env
PORT=
DATABASE_URL=
JWT_SECRET=
GOOGLE_CLIENT_ID=
RESEND_API_KEY=
```

---

# ▶️ Run Locally

## Frontend

```bash
npm run dev
```

## Backend

```bash
nodemon index.js
```

---

# 🧠 Learning Outcomes

This project helped strengthen understanding of:

* Full-stack development
* REST APIs
* PostgreSQL integration
* Authentication systems
* Google OAuth
* Responsive UI design
* State management
* Dynamic dashboards
* Visitor analytics
* Real-world deployment workflows

---

# 🚀 Future Improvements

Planned upgrades:

* Cloudinary image uploads
* Blog management system
* Rich text editor
* Dark/light themes
* Real-time notifications
* Admin profile management
* Advanced analytics
* Project filtering system
* Redis caching
* CI/CD pipeline

---

# 👨‍💻 Author

## Lochan Singoria

Aspiring Full Stack Developer passionate about building modern web experiences, solving problems, and continuously learning new technologies.

---

# 📬 Contact

* LinkedIn
* GitHub
* Email
* Twitter/X

(Add your links here)

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.

---

# 🪄 Final Note

This portfolio is more than just a showcase website — it evolved into a complete full-stack management platform with real-world features like authentication, analytics, messaging systems, and dynamic content management.

Built with consistency, curiosity, and countless debugging sessions ☕
