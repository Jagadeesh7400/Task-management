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
- Socket.IO for WebRTC signaling

### **Deployment:**
- Backend: **Heroku**
- Frontend: **Firebase Hosting**
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

## ⚙️ Configuration
### **🔹 Environment Variables**
Create a `.env` file in the **backend** folder and add:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

JWT_SECRET=4167c08dd10f9b1769dcca4c860899523eabf7fbf3695871291087ee265acc496986b0cb209a5a8648a84063183421ff23c9623c6f8eda1b708862569b01342a68682243da8f8690104b157d77cf76fa8a871d7e1ccc9e3c56de656116ec740cbf15ad80472d3f3a581e0bb19c2f5b718071f6e9f4be3dead9baaa9e0d96a031d42d3efea384eb0b9c5a86ef1dfe5a2413128fc8380c28f3605c7602bd61cfcb66bb0121409bbc6253ed594fe1b7879fe0e2b482a8ddf053063c88d78a7166b5b9eb79a1a2adb330e30586da1e34b91c92d523ae26f1f0b00850042e14ea8d885f77f3d6784c4f09cf6f16aa31c0834632688e4845cc1187abb033a1572090c1

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

## 🚀 Deployment
### **🔹 Backend (Heroku)**
1.  **Create a Heroku Account:**
    Sign up at [Heroku](https://www.heroku.com/).
2.  **Install the Heroku CLI:**
    Follow instructions at [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line).
3.  **Login to Heroku:**
    ```sh
    heroku login
    ```
4.  **Create a Heroku App:**
    ```sh
    heroku create <your-app-name>
    ```
5.  **Deploy the Backend:**
    ```sh
    git add .
    git commit -am "Deploy to Heroku"
    git push heroku main
    ```
6.  **Set Environment Variables in Heroku:**
    ```sh
    heroku config:set PORT=$PORT  # Important for Heroku
    heroku config:set MONGO_URI=<your_mongodb_connection_string>
    heroku config:set JWT_SECRET=<your_jwt_secret>
    heroku config:set EMAIL_SERVICE=<your_email_service>
    heroku config:set EMAIL_USER=<your_email_address>
    heroku config:set EMAIL_PASS=<your_email_password>
    ```
7.  **Verify Deployment:**
    ```sh
    heroku open
    ```

### **🔹 Frontend (Firebase Hosting)**
1.  **Create a Firebase Project:**
    Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
2.  **Install Firebase CLI:**
    ```sh
    npm install -g firebase-tools
    ```
3.  **Login to Firebase:**
    ```sh
    firebase login
    ```
4.  **Initialize Firebase Project:**
    ```sh
    firebase init hosting
    ```
    - Choose your Firebase project.
    - Specify `build` as your public directory.
    - Configure as a single-page app (yes).
    - Don't set up automatic builds and deploys with GitHub (no, unless you want that).
5.  **Build Your React App:**
    ```sh
    cd frontend
    npm run build
    ```
6.  **Deploy to Firebase:**
    ```sh
    firebase deploy --only hosting
    ```
7.  **Access Your App:**
    Firebase will provide a hosting URL.

### **🔹 WebRTC Signaling Server**
The project employs Socket.IO for WebRTC signaling within the meeting feature. To ensure stable real-time communication:

1. **Host the Backend:** As the signaling server is integrated into the Node.js backend, confirm that the backend is hosted on a reliable platform such as Heroku.
2. **Configure CORS:** To prevent cross-origin issues, ensure CORS is correctly configured on the server to allow connections from your frontend domain.

## 🤝 Contribution Guidelines
1️⃣ **Fork** the repository  
2️⃣ **Create a new branch** (`feature-xyz`)  
3️⃣ **Commit changes** with meaningful messages  
4️⃣ **Push to your branch** and open a PR  
