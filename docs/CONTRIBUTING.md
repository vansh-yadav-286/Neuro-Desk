# Contributing to NeuroLearn 3D

Thank you for your interest in contributing! We welcome all contributions.

## 🎯 Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help each other learn and grow

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make your changes** with clear commit messages
5. **Push to your fork** and **open a Pull Request**

## 📝 Development Setup

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Start development
npm run dev
```

## ✅ Before Submitting a PR

- [ ] Code follows project style
- [ ] No console errors/warnings
- [ ] Tests pass (if applicable)
- [ ] Documentation updated
- [ ] Commit messages are clear

## 📋 PR Checklist

- [ ] Title clearly describes changes
- [ ] Description explains what and why
- [ ] Related issues are linked
- [ ] Screenshots included (for UI changes)
- [ ] No breaking changes (or documented)

## 🐛 Reporting Bugs

Use the GitHub issue tracker:

1. **Check existing issues** first
2. **Create a new issue** with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots/logs if applicable
   - Environment info

## 💡 Feature Requests

Have an idea? Open a discussion:

1. Describe the feature
2. Explain use case
3. Provide examples
4. Discuss implementation

## 📚 Coding Standards

### Frontend (React/TypeScript)
```typescript
// Use functional components
const MyComponent = ({ prop }: Props) => {
  return <div>{prop}</div>
}

// Use TypeScript for type safety
interface Props {
  prop: string
}

// Use hooks
const [state, setState] = useState<Type>()
```

### Backend (Node/Express)
```javascript
// Use async/await
const handler = async (req, res) => {
  try {
    // Your code
  } catch (error) {
    // Error handling
  }
}

// Use meaningful variable names
// Add comments for complex logic
```

## 🔄 Commit Message Format

```
type: short description

Longer explanation if needed
- More details
- More details

Fixes #issue-number
```

**Types:** feat, fix, docs, style, refactor, perf, test, chore

## 📦 PR Review Process

1. At least one reviewer approval
2. All checks must pass
3. Conflicts resolved
4. Squash and merge

## 🎓 Learning Resources

- [Git Workflow](https://docs.github.com/en/github/collaborating-with-pull-requests)
- [Next.js Best Practices](https://nextjs.org/docs/basic-features/best-practices)
- [Express.js Guide](https://expressjs.com/)

## 🤝 Questions?

- Create a discussion
- Join our Discord community
- Email: contribute@neurolearn.com

---

**Happy Contributing!** 🎉
