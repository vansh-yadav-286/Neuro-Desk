# API Documentation

## Base URL

```
Development: http://localhost:5000/api
Production: https://api.neurolearn.com/api
```

## Endpoints

### 1. Content Upload

**POST** `/upload`

Upload learning material (PDF, images, documents)

**Request:**
```bash
curl -X POST http://localhost:5000/api/upload \
  -F "file=@document.pdf"
```

**Response:**
```json
{
  "success": true,
  "contentId": "uuid-here",
  "message": "File uploaded successfully"
}
```

---

### 2. Quiz Generation

**POST** `/quiz/generate`

Generate quiz questions from content

**Request:**
```json
{
  "content": "The human brain contains approximately 86 billion neurons...",
  "difficulty": "medium"
}
```

**Response:**
```json
{
  "id": "quiz-uuid",
  "title": "Brain Anatomy Quiz",
  "questions": [
    {
      "id": "q1",
      "question": "How many neurons are in the human brain?",
      "options": ["86 billion", "100 billion", "50 billion", "200 billion"],
      "correctAnswer": 0,
      "explanation": "The human brain contains approximately 86 billion neurons."
    }
  ]
}
```

---

### 3. Quiz Answer Validation

**POST** `/quiz/check`

Check if the user's answer is correct

**Request:**
```json
{
  "question": "What is the primary function of mitochondria?",
  "userAnswer": "Energy production"
}
```

**Response:**
```json
{
  "correct": true,
  "hint": "Think about cellular energy",
  "explanation": "Mitochondria are the powerhouses of the cell, responsible for ATP production"
}
```

---

### 4. Get Content

**GET** `/content`

Get all uploaded content

**Response:**
```json
[
  {
    "id": "content-uuid",
    "title": "Brain Anatomy",
    "topic": "Neuroscience",
    "modelType": "brain",
    "description": "Complete overview of brain structure",
    "createdAt": "2026-05-07T10:00:00Z"
  }
]
```

**GET** `/content/:id`

Get specific content details

---

### 5. Sessions

**GET** `/sessions`

Get all user learning sessions

**Response:**
```json
[
  {
    "id": "session-uuid",
    "title": "Brain Anatomy Basics",
    "topic": "Neuroscience",
    "progress": 45,
    "lastAccessed": "2026-05-07T10:00:00Z"
  }
]
```

**GET** `/sessions/:id`

Get specific session details

---

### 6. Health Check

**GET** `/health`

Check server status

**Response:**
```json
{
  "status": "Server is running",
  "timestamp": "2026-05-07T10:00:00Z"
}
```

---

## Error Handling

All errors follow this format:

```json
{
  "error": "Error message",
  "status": 400
}
```

### Common Error Codes

| Code | Message | Solution |
|------|---------|----------|
| 400 | Bad Request | Check request parameters |
| 401 | Unauthorized | Provide valid authentication |
| 404 | Not Found | Check resource ID |
| 500 | Internal Server Error | Contact support |

---

## Authentication

*(Optional - Add if implementing user auth)*

Include JWT token in Authorization header:

```
Authorization: Bearer your_jwt_token_here
```

---

## Rate Limiting

- Standard: 100 requests per minute
- Premium: 1000 requests per minute

---

## Example Usage

### Complete Workflow

```javascript
// 1. Upload content
const uploadRes = await fetch('/api/upload', {
  method: 'POST',
  body: formData
})
const { contentId } = await uploadRes.json()

// 2. Generate quiz
const quizRes = await fetch('/api/quiz/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    content: extractedText,
    difficulty: 'medium'
  })
})
const quiz = await quizRes.json()

// 3. Check answers
const checkRes = await fetch('/api/quiz/check', {
  method: 'POST',
  body: JSON.stringify({
    question: quiz.questions[0].question,
    userAnswer: userResponse
  })
})
const result = await checkRes.json()
```

---

## Support

For API issues:
- 📧 api-support@neurolearn.com
- 📖 [Full Documentation](https://docs.neurolearn.com)
- 🐛 [Report Bug](https://github.com/neurolearn/3d/issues)
