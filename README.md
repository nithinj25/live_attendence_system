# Live Attendance System - Backend

A real-time attendance tracking system built with Node.js, Express, TypeScript, and WebSocket support. This backend provides REST APIs and WebSocket connections for managing classes, students, and live attendance sessions.

## Features

- 🔐 JWT-based authentication
- 👥 User management (Teachers and Students)
- 📚 Class management with student enrollment
- ⚡ Real-time attendance tracking via WebSocket
- 🎯 Role-based access control
- 📊 MongoDB database integration

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JWT (JSON Web Tokens)
- **Real-time:** WebSocket (ws)
- **Validation:** Zod
- **Dev Tools:** ts-node-dev

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/nithinj25/live_attendence_system.git
cd live_attendence_system
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:

Create a `.env` file in `src/config/` directory with the following:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

The server will start on `http://localhost:3000` (or your configured PORT).

## API Endpoints

### Authentication Routes (`/auth`)
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

### Class Routes (`/class`)
- `POST /class` - Create a new class (Teacher only)
- `GET /class/:id` - Get class details
- `POST /class/:id/add-student` - Add student to class (Teacher only)
- `GET /class/students/all` - Get all students (Teacher only)

### Attendance Routes (`/attendance`)
- `POST /attendance/start` - Start an attendance session (Teacher only)

### WebSocket Connection
- **URL:** `ws://localhost:3000/ws`
- Used for real-time attendance tracking

## Project Structure

```
live_attendence_backend/
├── src/
│   ├── config/
│   │   ├── db.ts           # Database configuration
│   │   ├── env.ts          # Environment variables
│   │   └── .env            # Environment file (not tracked)
│   ├── middlewares/
│   │   ├── auth.ts         # JWT authentication middleware
│   │   ├── ownsClass.ts    # Class ownership verification
│   │   └── teacherOnly.ts  # Teacher role verification
│   ├── models/
│   │   ├── Attendance.ts   # Attendance model
│   │   ├── Class.ts        # Class model
│   │   └── User.ts         # User model
│   ├── routes/
│   │   ├── attendance.routes.ts
│   │   ├── auth.routes.ts
│   │   └── class.routes.ts
│   ├── types/
│   │   └── express.d.ts    # Express type extensions
│   ├── untils/
│   │   └── jwt.ts          # JWT utility functions
│   ├── ws/
│   │   └── socket.ts       # WebSocket configuration
│   ├── app.ts              # Express app configuration
│   └── server.ts           # Server entry point
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Database Models

### User
- `name`: String
- `email`: String (unique)
- `password`: String (hashed)
- `role`: 'teacher' | 'student'

### Class
- `className`: String
- `teacherId`: ObjectId (ref: User)
- `studentId`: Array of ObjectId (ref: User)

### Attendance
- TBD (To be defined based on requirements)

## Authentication

The API uses JWT for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

**Nithin J**
- GitHub: [@nithinj25](https://github.com/nithinj25)

## Acknowledgments

- Express.js community
- MongoDB team
- TypeScript team
