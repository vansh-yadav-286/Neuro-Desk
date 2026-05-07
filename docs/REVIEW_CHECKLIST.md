# NeuroLearn 3D Code Review Checklist

When reviewing pull requests, check:

## Code Quality
- [ ] Code is clean and readable
- [ ] No duplicate code
- [ ] Follows project conventions
- [ ] Proper error handling
- [ ] No console logs/debuggers left in

## Functionality
- [ ] Feature works as described
- [ ] Doesn't break existing features
- [ ] Handles edge cases
- [ ] Proper input validation
- [ ] Tests included (if applicable)

## Performance
- [ ] No memory leaks
- [ ] No infinite loops
- [ ] Optimized queries
- [ ] Proper caching

## Security
- [ ] No hardcoded secrets
- [ ] Input sanitization
- [ ] Proper authentication/authorization
- [ ] No XSS vulnerabilities
- [ ] SQL injection prevention

## Documentation
- [ ] Changes documented
- [ ] Comments explain why, not what
- [ ] API docs updated
- [ ] README updated if needed

## Browser Compatibility
- [ ] Tested in Chrome/Firefox/Safari
- [ ] Mobile responsive
- [ ] Fallbacks for older browsers

---

**Review template for GitHub:**

```markdown
### Summary
Brief description of what was changed

### Testing
- [ ] Feature tested locally
- [ ] No regression issues
- [ ] Edge cases handled

### Questions
- Question or concern

### Suggestions
- Suggestion for improvement
```
