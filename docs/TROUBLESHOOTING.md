# Troubleshooting Guide

Common issues and solutions for NeuroLearn 3D

## 🔴 Server Issues

### Server won't start

**Error:** `listen EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Find process on port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or use different port
SERVER_PORT=5001 npm run dev
```

### Database connection failed

**Error:** `Error: connect ECONNREFUSED 127.0.0.1:5432`

**Solution:**
```bash
# Ensure PostgreSQL is running
docker-compose up -d postgres

# Or for local PostgreSQL installation
sudo systemctl start postgresql  # Linux
brew services start postgresql  # Mac
```

### API returns 500 error

**Solution:**
1. Check server logs for error details
2. Verify database connection
3. Check OpenAI API key is valid
4. Review request format

## 🔴 Frontend Issues

### Port 3000 already in use

**Solution:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Module not found errors

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next
npm run dev
```

### Styles not loading

**Solution:**
1. Clear browser cache
2. Rebuild: `npm run build`
3. Check Tailwind configuration
4. Verify CSS imports

## 🔴 Database Issues

### Prisma migration failed

**Solution:**
```bash
# Reset database (development only)
npx prisma migrate reset

# Or manually run migrations
npx prisma migrate dev
```

### Schema sync error

**Solution:**
```bash
# Generate Prisma client
npx prisma generate

# Validate schema
npx prisma validate
```

## 🔴 3D Visualization Issues

### 3D model not rendering

**Check:**
- WebGL is enabled in browser
- Three.js library loaded
- Model path is correct
- Browser console for errors

**Solution:**
```javascript
// Check WebGL support
const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl');
console.log(gl ? 'WebGL supported' : 'WebGL not supported');
```

### Slow performance

**Optimization:**
- Reduce model complexity
- Enable LOD (Level of Detail)
- Use optimized geometries
- Check frame rate with DevTools

## 🔴 Authentication Issues

### JWT token expired

**Solution:**
1. Clear local storage
2. Re-login
3. Request new token

### CORS errors

**Solution:**
1. Verify CORS configuration in server
2. Check allowed origins
3. Include credentials if needed

## 🔴 File Upload Issues

### File too large

**Error:** `Multipart: Unexpected end of form`

**Solution:**
```env
# Increase server limits
UPLOAD_MAX_SIZE=50  # MB
```

### Unsupported format

**Solution:**
- Supported: PDF, JPG, PNG, GIF, TXT
- Convert file to supported format
- Check file extension

## 🔴 Docker Issues

### Container won't start

**Solution:**
```bash
# View logs
docker-compose logs <service-name>

# Rebuild images
docker-compose build --no-cache

# Restart all services
docker-compose down
docker-compose up -d
```

### Port conflicts

**Solution:**
```bash
# Change ports in docker-compose.yml
# Or stop conflicting services
docker ps
docker stop <container-id>
```

## 📊 Debug Mode

### Enable detailed logging

```env
NODE_ENV=development
DEBUG=*
LOG_LEVEL=debug
```

### Check logs

```bash
# Server logs
npm run dev --workspace=server 2>&1 | grep ERROR

# Client logs
# Check browser console (F12)

# Docker logs
docker-compose logs -f service-name
```

## 🔍 Performance Diagnostics

```bash
# Check Node memory usage
node --max-old-space-size=2048 server/app.js

# Monitor with clinic.js
npx clinic doctor -- npm run dev
```

## 🆘 Still Having Issues?

1. **Check Documentation**: Review [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md)
2. **Search Issues**: Look for similar problems
3. **Create Issue**: With:
   - Error message
   - Steps to reproduce
   - Environment info
   - Logs if available
4. **Contact Support**: support@neurolearn.com

## 📋 Debug Checklist

- [ ] Node version >= 16
- [ ] PostgreSQL running
- [ ] Docker running (if using)
- [ ] .env file configured
- [ ] Dependencies installed
- [ ] No port conflicts
- [ ] API responding
- [ ] Database connected
- [ ] OpenAI key valid
- [ ] Logs checked

---

**Can't find the answer?** Create an issue or ask for help!
