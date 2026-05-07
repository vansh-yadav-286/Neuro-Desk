# NeuroLearn 3D - README

Transform education with interactive 3D visualization, AI-powered learning, and voice assistance.

![NeuroLearn 3D](https://img.shields.io/badge/status-active-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)

## 🌟 Features

✨ **Interactive 3D Models** - Explore complex topics in immersive 3D environments
🤖 **AI-Powered Learning** - Adaptive quizzes and personalized content generation
🎤 **Voice Assistant** - Voice-guided lessons and interactive Q&A
📚 **Content Upload** - Support for PDF, images, and text documents
📊 **Progress Tracking** - Monitor learning journey and performance
🎨 **Beautiful UI** - Modern, responsive design with smooth animations

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- PostgreSQL 13+
- OpenAI API key
- 2GB RAM minimum

### Installation

```bash
# Clone repository
git clone <repository-url>
cd NeuroDesk

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your configuration

# Setup database
docker-compose up -d
npm run prisma:migrate

# Run development server
npm run dev
```

Visit `http://localhost:3000` to start learning!

## 📁 Project Structure

```
NeuroLearn 3D/
├── client/                    # Next.js frontend application
│   ├── app/                  # App router pages
│   │   ├── page.tsx         # Home page
│   │   ├── dashboard/       # Learning dashboard
│   │   ├── world/           # 3D visualization world
│   │   ├── upload/          # Content upload page
│   │   └── api/             # API routes
│   ├── components/          # React components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── UploadBox.tsx
│   │   ├── ThreeScene.tsx
│   │   ├── QuizCard.tsx
│   │   ├── VoiceAssistant.tsx
│   │   └── Loader.tsx
│   ├── lib/                 # Utility functions
│   │   ├── openai.ts       # OpenAI integration
│   │   ├── sceneMapper.ts  # 3D scene configuration
│   │   └── quizGenerator.ts # Quiz utilities
│   └── styles/             # CSS & Tailwind
├── server/                  # Express backend application
│   ├── routes/             # API routes
│   │   ├── uploadRoutes.js
│   │   ├── quizRoutes.js
│   │   ├── contentRoutes.js
│   │   └── sessionRoutes.js
│   ├── controllers/        # Route handlers
│   ├── services/          # Business logic
│   │   ├── aiService.js   # OpenAI integration
│   │   ├── ocrService.js  # Document processing
│   │   └── ttsService.js  # Text-to-speech
│   ├── middleware/        # Express middleware
│   ├── config/           # Configuration
│   └── app.js           # Main Express app
├── prisma/              # Database
│   └── schema.prisma   # Data models
├── docs/               # Documentation
├── package.json        # Root package file
├── .env.example       # Environment template
└── docker-compose.yml # Docker services
```

## 🔧 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Three.js & React Three Fiber** - 3D graphics
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Advanced animations
- **Zustand** - Lightweight state management
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **Prisma** - Type-safe ORM
- **OpenAI API** - AI models
- **Multer** - File upload handling

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **GitHub Actions** - CI/CD (optional)

## 📖 API Endpoints

### Content Management
- `POST /api/upload` - Upload learning material
- `GET /api/content` - List all content
- `GET /api/content/:id` - Get specific content

### Quiz
- `POST /api/quiz/generate` - Generate quiz from content
- `POST /api/quiz/check` - Validate quiz answer

### Sessions
- `GET /api/sessions` - Get user sessions
- `GET /api/sessions/:id` - Get session details

### Health
- `GET /health` - Server health check

## 🎯 Usage Examples

### Upload Content
```javascript
const formData = new FormData()
formData.append('file', selectedFile)
const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
})
```

### Generate Quiz
```javascript
const quiz = await fetch('/api/quiz/generate', {
  method: 'POST',
  body: JSON.stringify({
    content: 'Your learning material',
    difficulty: 'medium'
  })
})
```

### Check Answer
```javascript
const result = await fetch('/api/quiz/check', {
  method: 'POST',
  body: JSON.stringify({
    question: 'What is X?',
    userAnswer: 'Y'
  })
})
```

## 🌍 Deployment

### Vercel (Frontend)
```bash
npm run build
vercel deploy
```

### Railway/Render (Backend)
```bash
# Configure PostgreSQL connection
# Deploy with environment variables
```

### Docker
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 📚 Documentation

- [Development Guide](./docs/DEVELOPMENT.md)
- [API Documentation](./docs/API.md)
- [Contributing Guidelines](./docs/CONTRIBUTING.md)

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT License - see LICENSE file for details

## 🙋 Support

- 📧 Email: support@neurolearn.com
- 💬 Discord: [Join our community](https://discord.gg/neurolearn)
- 🐛 Issues: [GitHub Issues](https://github.com/neurolearn/3d/issues)

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Three.js Guide](https://threejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)

## ⭐ Star us on GitHub!

If you found this project helpful, please give it a star! It helps others discover the project.

---

**Built with ❤️ for education**

Last Updated: 2026-05-07
