# Zidio Task Management System

## 📌 Overview
Zidio is a **modern task management system** designed to streamline workflows, enhance team productivity, and provide a seamless user experience. It includes **role-based access control (RBAC), advanced analytics, notifications, and a responsive UI**, making it ideal for businesses and individuals.

## 🚀 Features
### **🔹 User & Role Management**
- Admin can **create, edit, delete users**
- **Role-based access control (RBAC)** for Admin & Users
- User authentication (**Signup, Login, Forgot Password**)

### **🔹 Task Management**
- **Create, edit, delete, and track tasks**
- Task **priority levels & deadlines**
- **Task countdown timer & completion alerts**


### **🔹 Admin Panel**
- **User & Task Monitoring Dashboard**
- **Advanced Analytics** (User performance tracking)
- **Task completion rate insights**
- Export reports in **CSV/PDF**

### **🔹 Notifications System**
- Real-time **task updates & reminders**
- **Email & in-app notifications** for deadlines

### **🔹 UI/UX Design**
- **Dark Mode & Light Mode**
- Fully **responsive UI (Mobile & Desktop)**
- **Material UI & Tailwind CSS**

### **🔹 API Integration & Optimization**
- **RESTful APIs** for dynamic data fetching
- **MongoDB indexing** for performance boost
- **WebSocket (Socket.io) for real-time updates**

## 🏗️ Tech Stack
### **Frontend:**
- React + Vite + Tailwind CSS
- React Router for navigation
- Axios for API calls

### **Backend:**
- Node.js + Express.js
- MongoDB + Mongoose (Database)
- JSON Web Tokens (JWT) for authentication

### **Deployment:**
- Frontend: **Vercel / Netlify**
- Backend: **Heroku / Render / AWS**
- Database: **MongoDB Atlas**

## 🛠️ Installation & Setup
### **1️⃣ Clone the Repository**
```sh
git clone #https://github.com/yourusername/task-management.git
cd zidio-task-management
```

### **2️⃣ Setup Backend**
```sh
cd backend
npm install  # Install dependencies
npm start    # Start backend server
```

### **3️⃣ Setup Frontend**
```sh
cd ../frontend
npm install  # Install dependencies
npm run dev  # Start frontend development server
```

## 📂 Project Structure
```plaintext
zidio-task-management/
 ├── backend/               # Node.js & Express backend
 │   ├── controllers/       # API logic
 │   ├── models/            # Mongoose schemas
 │   ├── routes/            # Express routes
 │   ├── middleware/        # Authentication & security
 │   ├── config/            # Database & environment configs
 │   ├── server.js          # Main backend entry point
 │
 ├── frontend/              # React + Vite frontend
 │   ├── src/
 │   │   ├── components/    # Reusable UI components
 │   │   ├── pages/         # Main pages (Home, Dashboard, etc.)
 │   │   ├── store/         # State management (Redux/Context API)
 │   │   ├── App.jsx        # Root React component
 │   │   ├── main.jsx       # Entry point
 │
 ├── README.md              # Documentation
 ├── package.json           # Project dependencies
 ├── .gitignore             # Git ignored files
```

## 🌍 Environment Variables
Create a `.env` file in the **backend** folder and add:
```env
PORT=5000
MONGO_URI=mongodb+srv://jagadeeshk261203:ppZIWzxQpMfatb6C@cluster0.3fzdn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

JWT_SECRET=4167c08dd10f9b1769dcca4c860899523eabf7fbf3695871291087ee265acc496986b0cb209a5a8648a84063183421ff23c9623c6f8eda1b708862569b01342a68682243da8f8690104b157d77cf76fa8a871d7e1ccc9e3c56de656116ec740cbf15ad80472d3f3a581e0bb19c2f5b718071f6e9f4be3dead9baaa9e0d96a031d42d3efea384eb0b9c5a86ef1dfe5a2413128fc8380c28f3605c7602bd61cfcb66bb0121409bbc6253ed594fe1b7879fe0e2b482a8ddf053063c88d78a7166b5b9eb79a1a2adb330e30586da1e34b91c92d523ae26f1f0b00850042e14ea8d885f77f3d6784c4f09cf6f16aa31c0834632688e4845cc1187abb033a1572090c7

EMAIL_SERVICE=gmail
```

## 🔹 API Endpoints
### **Authentication APIs**
| Method | Endpoint          | Description           |
|--------|------------------|----------------------|
| POST   | `/api/auth/signup`  | User Registration  |
| POST   | `/api/auth/login`   | User Login         |
| POST   | `/api/auth/logout`  | User Logout        |

### **Task APIs**
| Method | Endpoint         | Description         |
|--------|-----------------|---------------------|
| GET    | `/api/tasks`     | Get all tasks      |
| POST   | `/api/tasks`     | Create a task      |
| PUT    | `/api/tasks/:id` | Update a task      |
| DELETE | `/api/tasks/:id` | Delete a task      |

## 🔥 Future Enhancements
✅ AI-powered **task priority suggestions**  
✅ **Team collaboration** (assign multiple users)  
✅ **Task dependencies** (block a task until another is done)  
✅ **Mobile App (React Native)** support  

## 🤝 Contribution Guidelines
1️⃣ **Fork** the repository  
2️⃣ **Create a new branch** (`feature-xyz`)  
3️⃣ **Commit changes** with meaningful messages  
4️⃣ **Push to your branch** and open a PR  
