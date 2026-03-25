# Anonymous Random Text Chat System

## Live URLs
- **Frontend (Vercel):** https://anonymous-chat-frontend-alpha.vercel.app
- **Backend (Render):**[ https://anonymous-chat-backend.onrender.com](https://anonymous-chat-backend-4i9p.onrender.com](https://anonymous-chat-backend-4i9p.onrender.com)

## Architecture Overview
- **Frontend:** React, deployed on Vercel
- **Backend:** Node.js + Socket.IO, deployed on Render
- **Communication:** Real-time chat via WebSockets
- **Anonymous Users:** Temporary session IDs, no login required

## Matchmaking & Chat Flow
1. User clicks **Start Chat**.
2. Backend pairs the user with another available user.
3. Messages are sent via Socket.IO in real-time.
4. Users can **Skip / End Chat**, which disconnects and allows rematching.
5. Backend handles **partner disconnected** notifications.
6. Message limits: rate and length limits are implemented for reliability.

## Deployment Approach
- **Frontend:** Deployed on Vercel using drag-and-drop / CLI
- **Backend:** Hosted on GitHub + Render automatic deployment
- Frontend connects to backend using the live Render URL

## Known Limitations
- No user authentication or accounts
- Single server only; not fully scalable
- No database persistence (SQL not used)
- Minimal styling (functionality prioritized)

## How to Run Locally (Optional)
1. Clone the repository
2. Backend:
   ```bash
   cd backend
   npm install
   node server.js
