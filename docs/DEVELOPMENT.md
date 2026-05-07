# NeuroLearn 3D - Comprehensive Documentation

## 📚 Table of Contents

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Setup Guide](#setup-guide)
- [API Documentation](#api-documentation)
- [Features](#features)
- [Development](#development)
- [Deployment](#deployment)

## 🚀 Project Overview

NeuroLearn 3D is an innovative interactive 3D learning platform that combines:

- **3D Visualization**: Interactive 3D models for complex topics
- **AI-Powered Learning**: Adaptive quizzes and personalized content
- **Voice Assistance**: Voice-guided learning experiences
- **Document Processing**: Upload and process various file formats
- **Real-time Feedback**: Immediate learning insights

## 🏗️ Architecture

### Technology Stack

#### Frontend
- **Next.js 14** - React framework with TypeScript
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Zustand** - State management

#### Backend
- **Node.js + Express** - Server runtime and framework
- **PostgreSQL** - Primary database
- **Prisma** - ORM for database management
- **OpenAI API** - AI-powered content generation

### Folder Structure

```
NeuroLearn 3D/
├── client/                 # Next.js frontend
│   ├── app/               # App router pages
│   ├── components/        # Reusable React components
│   ├── lib/              # Utility functions and services
│   ├── styles/           # Global styles
│   └── public/           # Static assets
├── server/               # Express backend
│   ├── routes/          # API route handlers
│   ├── controllers/      # Business logic
│   ├── services/        # External service integrations
│   ├── middleware/      # Express middleware
│   └── config/          # Configuration files
├── prisma/              # Database schema
└── docs/               # Documentation
```

## 🛠️ Setup Guide

### Prerequisites

- Node.js 16+ and npm/yarn
- PostgreSQL 13+
- OpenAI API key
- Docker (optional)

### Installation

1. Clone the repository
```bash
cd NeuroLesk
```

2. Install dependencies
```bash
npm install  # Install all workspaces
```

3. Configure environment
```bash
cp .env.example .env
```

4. Set up database
```bash
docker-compose up -d  # Start PostgreSQL
npm run prisma:migrate  # Run migrations
```

5. Run development servers
```bash
npm run dev
```

Access the app at http://localhost:3000

### Environment Variables

See `.env.example` for all available variables:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/neurolearn

# OpenAI
OPENAI_API_KEY=sk_...
NEXT_PUBLIC_OPENAI_API_KEY=sk_...

# Server
SERVER_PORT=5000
NEXT_PUBLIC_SERVER_URL=http://localhost:5000

# Client
NEXT_PUBLIC_CLIENT_URL=http://localhost:3000
```

## 📡 API Documentation

### Upload Content
```bash
POST /api/upload
Content-Type: multipart/form-data

file: <binary>
```

### Generate Quiz
```bash
POST /api/quiz/generate
Content-Type: application/json

{
  "content": "Learning material text",
  "difficulty": "medium"  # easy | medium | hard
}
```

### Check Quiz Answer
```bash
POST /api/quiz/check
Content-Type: application/json

{
  "question": "Question text",
  "userAnswer": "User's answer"
}
```

### Get Sessions
```bash
GET /api/sessions
```

### Get Content
```bash
GET /api/content
GET /api/content/:id
```

## ✨ Features

### 1. 3D Visualization
- Interactive 3D models for various topics
- Model types: Brain, Heart, Solar System
- Smooth camera controls and animations
- Real-time rendering

### 2. AI-Powered Quizzes
- Automatic quiz generation from content
- Adaptive difficulty based on user performance
- Multi-choice and free-form answers
- Instant feedback and explanations

### 3. Voice Assistant
- Speech-to-text for questions
- Text-to-speech for explanations
- Voice-guided learning paths
- Interactive voice commands

### 4. Content Processing
- Upload documents (PDF, DOCX, TXT)
- Upload images (JPG, PNG, GIF)
- OCR for text extraction
- Automatic content analysis

### 5. Progress Tracking
- Track learning sessions
- Monitor quiz performance
- Personalized recommendations
- Learning analytics

## 💻 Development

### Running Development Environment

```bash
# Start all services
npm run dev

# Or individually:
npm run dev --workspace=client
npm run dev --workspace=server
```

### Building for Production

```bash
npm run build
```

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

## 🚀 Deployment

### Deploying to Production

1. **Frontend**: Deploy `client` to Vercel, Netlify, or similar
2. **Backend**: Deploy `server` to Railway, Render, or similar
3. **Database**: Use managed PostgreSQL service

### Using Docker

```bash
# Build images
docker build -f client/Dockerfile -t neurolearn-client .
docker build -f server/Dockerfile -t neurolearn-server .

# Run containers
docker-compose -f docker-compose.prod.yml up
```

### Environment Setup

Ensure production environment variables are configured:
- Use managed PostgreSQL service
- Secure API keys in environment variables
- Enable HTTPS
- Configure CORS properly

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project

## 🤝 Support

For issues and questions, please open an issue on GitHub.

---

Happy Learning! 🧠✨
