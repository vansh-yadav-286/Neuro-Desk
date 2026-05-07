# Getting Started with NeuroLearn 3D

Quick guide to get up and running with NeuroLearn 3D in 5 minutes!

## ⚡ Quick Start

### 1️⃣ Prerequisites
- Node.js 16+ ([Download](https://nodejs.org))
- PostgreSQL 13+ ([Download](https://www.postgresql.org))
- Git ([Download](https://git-scm.com))

### 2️⃣ Clone & Setup
```bash
# Clone the repository
git clone https://github.com/neurolearn/3d.git
cd NeuroDesk

# Run setup script
chmod +x dev-setup.sh
./dev-setup.sh

# Or manual setup:
npm install
cp .env.example .env
docker-compose up -d
npm run prisma:migrate
npm run dev
```

### 3️⃣ Access the App
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Database Admin**: http://localhost:5432

## 🗂️ Project Structure

```
client/          → Next.js React app (port 3000)
server/          → Express API (port 5000)
prisma/          → Database schema
```

## 🚀 First Steps

### 📝 Create Your First Learning Session

1. Open http://localhost:3000
2. Click "Upload Content"
3. Upload a document (PDF, image, or text)
4. Explore your 3D model in the "World" page
5. Take the AI-generated quiz!

### 🔧 Development Commands

```bash
# Start everything
npm run dev

# Start individual services
npm run dev --workspace=client  # Frontend only
npm run dev --workspace=server  # Backend only

# Build for production
npm run build

# Run database migrations
npm run prisma:migrate

# View database
npx prisma studio
```

## 🎨 Understanding the Code

### Frontend Structure
```
client/app/
├── page.tsx          → Home page
├── dashboard/        → Learning progress
├── world/           → 3D visualization
└── upload/          → File upload

client/components/
├── ThreeScene.tsx   → 3D model display
├── QuizCard.tsx     → Quiz questions
└── VoiceAssistant.tsx → Voice features
```

### Backend Structure
```
server/
├── routes/          → API endpoints
├── services/        → Business logic
│   ├── aiService.js      → OpenAI integration
│   ├── ocrService.js     → Document processing
│   └── ttsService.js     → Text-to-speech
└── controllers/     → Route handlers
```

## 🔐 Configuration

Edit `.env` file:

```env
# Required
OPENAI_API_KEY=sk_your_key

# Database
DATABASE_URL=postgresql://user:password@localhost/neurolearn

# URLs
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
NEXT_PUBLIC_CLIENT_URL=http://localhost:3000
```

## 🐛 Common Issues

### "PORT 3000 already in use"
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### "PostgreSQL connection failed"
```bash
# Ensure Docker services are running
docker-compose ps
docker-compose up -d postgres
```

### "Module not found" errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📚 Next Steps

- [ ] Read [API Documentation](./docs/API.md)
- [ ] Explore [Development Guide](./docs/DEVELOPMENT.md)
- [ ] Check [Contributing Guidelines](./docs/CONTRIBUTING.md)
- [ ] Join our community on Discord

## 🎓 Learning Resources

- **Next.js**: https://nextjs.org/learn
- **Three.js**: https://threejs.org/docs
- **Express**: https://expressjs.com/
- **Prisma**: https://www.prisma.io/docs/

## 💬 Need Help?

- 📖 Check [Documentation](./docs)
- 🔍 Search [Issues](https://github.com/neurolearn/3d/issues)
- 💬 Ask in [Discussions](https://github.com/neurolearn/3d/discussions)
- 📧 Email: support@neurolearn.com

## ✅ Verification

To verify everything is working:

1. Open http://localhost:3000
2. See the home page with hero section
3. Click "Start Now" → Upload page
4. Go to Dashboard → See mock sessions
5. Check API health: http://localhost:5000/health

Great! You're all set! 🎉

---

**Happy Learning!** 🧠✨
