# Contributing to Event Management System

Thank you for your interest in contributing to the Event Management System! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

- Be respectful and inclusive to all contributors
- Provide constructive feedback
- Focus on code quality and maintainability
- Help others learn and grow

## Getting Started

### Prerequisites
- Node.js 14+ and npm 6+
- Git
- Basic understanding of React and JavaScript

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # GitHub UI: Click the "Fork" button
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Event-Management-System.git
   cd Event-Management-System
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/yogendradayal/Event-Management-System.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

## Development Workflow

### Before You Start
- Check existing issues and pull requests
- Discuss major changes by opening an issue first
- Review the [ARCHITECTURE.md](./ARCHITECTURE.md) for codebase structure

### Making Changes

1. **Keep changes focused**
   - One feature per pull request
   - Follow the existing code style
   - Write clear, descriptive commit messages

2. **Code Standards**
   - Use functional components with hooks
   - Follow React best practices
   - Use meaningful variable/function names
   - Add comments for complex logic
   - Keep components small and single-responsibility

3. **Testing Your Changes**
   ```bash
   # Test different user roles
   npm run dev
   # Test as User: user@ems.com / user123
   # Test as Vendor: vendor@ems.com / vendor123
   # Test as Admin: admin@ems.com / admin123
   ```

### Types of Contributions

#### Bug Fixes
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Include a fix when possible

#### Features
- Describe the feature and its benefits
- Consider UI/UX implications
- Check for existing similar features
- Follow the application's design system

#### Documentation
- Update README.md for user-facing changes
- Update ARCHITECTURE.md for code structure changes
- Add inline comments for complex code
- Take screenshots for new features

#### Performance Improvements
- Benchmark before and after
- Explain why the change improves performance
- Ensure no functionality is lost

## Pull Request Process

### Before Submitting

1. **Update your branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Test thoroughly**
   - Test all affected features
   - Test on different screen sizes
   - Test all user roles
   - Check browser console for errors

3. **Clean up commits**
   ```bash
   git rebase -i upstream/main
   ```

### Creating a Pull Request

1. **Push your changes**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create PR on GitHub**
   - Use a clear title: `feat: Add feature name` or `fix: Fix issue name`
   - Reference related issues: `Closes #123`
   - Provide a detailed description
   - Include screenshots for UI changes

3. **PR Description Template**
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation
   - [ ] Performance improvement

   ## Testing
   - [ ] Tested with User role
   - [ ] Tested with Vendor role
   - [ ] Tested with Admin role
   - [ ] No console errors

   ## Screenshots (if applicable)
   - Before: [screenshot]
   - After: [screenshot]

   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review done
   - [ ] Comments added for complex logic
   - [ ] Documentation updated
   - [ ] No new warnings/errors
   ```

### Review Process

- Maintain respectful communication
- Be open to feedback
- Make requested changes promptly
- Re-request review after changes
- Thank reviewers for their time

## Commit Message Guidelines

Follow conventional commit format:

```
type(scope): subject

body

footer
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (no logic)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test-related changes
- `chore`: Build, CI/CD, dependencies

### Examples
```
feat(cart): add quantity controls to cart items

- Add increment/decrement buttons
- Update cart total on quantity change
- Fix quantity validation

Closes #42
```

```
fix(checkout): resolve duplicate order submission

Prevent multiple order submissions on button click
```

## Code Style Guide

### JavaScript/React
```javascript
// Use functional components
function ComponentName({ prop1, prop2 }) {
  const [state, setState] = useState(null);
  
  return (
    <div className="component-class">
      {/* JSX content */}
    </div>
  );
}

// Use const for variables
const variable = value;

// Use arrow functions
const handleClick = () => { /* ... */ };

// Clear function names
const fetchUserData = () => { /* ... */ };
const handleFormSubmit = () => { /* ... */ };
```

### Naming Conventions
- Components: PascalCase (UserPortal, VendorBrowse)
- Functions: camelCase (handleClick, addToCart)
- Constants: UPPER_SNAKE_CASE (MAX_ITEMS, API_URL)
- CSS Classes: kebab-case (product-card, form-field)

### CSS/Styling
- Follow the existing design system
- Use CSS variables for colors
- Keep styles scoped to components
- Follow mobile-first approach

## File Structure

When adding new features:
```
src/
├── EventManagementSystem.jsx  # Main component
├── components/                # (Future) Separate components
│   ├── Navbar.jsx
│   ├── Cards/
│   ├── Forms/
│   └── ...
├── pages/                     # (Future) Page components
├── hooks/                     # (Future) Custom hooks
└── utils/                     # (Future) Utility functions
```

Currently, keep related functionality in `EventManagementSystem.jsx` and follow the existing structure.

## Testing Checklist

Before submitting a PR:
- [ ] No console errors or warnings
- [ ] All interactive elements work correctly
- [ ] Form validation works
- [ ] Navigation functions properly
- [ ] Responsive design works
- [ ] Test with all user roles (if applicable)
- [ ] Test edge cases (empty states, errors, etc.)

### User Role Testing
1. **User Role**
   - Login/Signup works
   - Can browse vendors
   - Can add items to cart
   - Can complete checkout
   - Can view orders
   - Can manage guest list

2. **Vendor Role**
   - Login/Signup works
   - Can add/edit/delete products
   - Can view transactions
   - Can manage order status
   - Can view requests

3. **Admin Role**
   - Login works
   - Can manage users
   - Can manage vendors
   - Can manage memberships
   - Can view all orders

## Documentation Guidelines

### README.md
- Update for new major features
- Include usage examples
- Document new user workflows
- Update feature list

### ARCHITECTURE.md
- Document structural changes
- Update data models if changed
- Update component hierarchy
- Document new hooks/utilities

### Code Comments
- Explain WHY, not WHAT
- Document complex logic
- Add JSDoc comments for functions
- Keep comments updated with code

### SCREENSHOTS.md
- Add new screenshots for UI changes
- Include clear descriptions
- Update the guide with new flows

## Getting Help

- **Questions**: Open a discussion
- **Bugs**: Open an issue with reproduction steps
- **Features**: Open an issue to discuss before implementing
- **Code Review**: Ask for help in comments on your PR

## Recognition

Contributors will be:
- Listed in a CONTRIBUTORS.md file
- Thanked in commit messages
- Recognized in release notes

## Questions?

Don't hesitate to ask! The best way to learn is to contribute. We're here to help.

---

## Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Git Commit Best Practices](https://cbea.ms/git-commit/)
- Project [ARCHITECTURE.md](./ARCHITECTURE.md)
- Project [README.md](./README.md)

Thank you for contributing! 🙏
