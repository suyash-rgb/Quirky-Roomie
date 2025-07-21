# Quirky Roomie

A collaborative platform for flatmates to log household complaints, vote on issues, resolve them, and earn karma points—all wrapped in a fun, gamified experience.

---

## Project Overview

Quirky Roomie lets flatmates:

- Sign up and log in via JWT-secured endpoints  
- File, view, and vote on complaints (Noise, Cleanliness, Bills, Pets, etc.)  
- Automatically highlight the “Problem of the Week”  
- Earn karma for resolving issues and getting upvotes  
- View a Top-10 leaderboard and detailed flat stats  
- Receive playful punishment suggestions for high-vote complaints  

---

## Prerequisites

- Node.js (v16+)  
- npm or yarn  
- MongoDB (Atlas or local instance)  
- Git  

---

## Features
👥 **User Auth & Management**
Users log in, join flat groups via unique flat codes, and JWT keeps everything secure.

📝 **Complaint Logging**
Flatmates file complaints with titles, descriptions, types like Noise or Bills, and even severity levels — from “mild” to “nuclear”. Yep, household diplomacy in JSON.

📊 **Voting System**
Roommates upvote or downvote complaints. The complaint with most upvotes becomes “Flatmate Problem of the Week” — because drama loves spotlight.

🕒 **Auto-Archiving & Resolution**
Downvoted complaints disappear after 3 days, resolved ones earn you karma — and the monthly leaderboard crowns your “Best Flatmate”.

🎯 **Punishment Generator**
This one's fun — once a complaint crosses 10 upvotes, Gemini API steps in to suggest quirky punishments like: <br><br>
“You owe everyone samosas” 🍽️  
or  
“You’re on chai duty for a week” ☕

📈 **Leaderboard & Stats**
Track who causes the most chaos, top complaint categories, and bragging rights for karma points.

---

## Installation & Setup

### 1. Backend Setup Guide (Node.js + Express + Gemini API)

```bash
# Clone and enter backend directory
git clone https://github.com/suyash-rgb/Quirky-Roomie.git
cd quirkyroomie/backend

# Install dependencies
npm install

# Create .env file
cat > .env <<EOF
MONGO_URI=<your-mongo-uri>
JWT_SECRET=<your-jwt-secret>
PORT=5000
GEMINI_API_KEY=<your-gemini-api-key>
EOF

# Start server
npm run dev
```

The API will now run at `http://localhost:5000/api`.

---

### 2. Frontend

```bash
# Navigate to frontend directory
cd ../quirky-tailwind-test

# Install dependencies
npm install

# Start development server
npm run dev
```

The React + Vite app will now run at `http://localhost:5173`.



## API Endpoints

### Authentication  
- `POST /api/auth/register` – Register a new flatmate  
- `POST /api/auth/login` – Login and receive JWT  

### Complaints  
- `POST /api/complaints` – File a complaint (protected)  
- `GET /api/complaints` – List active complaints  
- `PUT /api/complaints/:id/resolve` – Mark as resolved (protected)  

### Voting  
- `PUT /api/complaints/:id/vote` – Upvote/downvote a complaint  

### Trending  
- `GET /api/complaints/trending` – Get top upvoted complaints  

### Leaderboard & Stats  
- `GET /api/leaderboard` – Top 10 users by karma  
- `GET /api/flat/stats?flatCode=<code>` – Flat-wide complaint stats  

---

## Usage

1. **Register** a new user and note your Flat Code.  
2. **Log in** with email & password.  
3. **File complaints** and watch your flat’s dashboard update.  
4. **Upvote** issues you care about.  
5. **Resolve** complaints to earn karma.  
6. **Check** the Leaderboard and Flat Stats for real-time insights.

---

## Contributing

1. Fork this repository  
2. Create a feature branch (`git checkout -b feature/foo`)  
3. Commit your changes (`git commit -m "feat: add foo"`)  
4. Push to the branch (`git push origin feature/foo`)  
5. Open a Pull Request  

---

