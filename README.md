# Project 01 - Modern Web Application

A modern web application built with React, TypeScript, Vite, and Tailwind CSS. This project provides a solid foundation for building scalable web applications with best practices and modern tooling.

## 🚀 Features

- **React 18** with TypeScript for type safety
- **Vite** for lightning-fast development and building
- **Tailwind CSS** for utility-first styling
- **React Router DOM** for client-side routing
- **ESLint & Prettier** for code quality and formatting
- **Responsive Design** with mobile-first approach
- **Accessibility** features built-in
- **Component Architecture** with reusable UI components

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   └── Card.tsx
├── layouts/            # Layout components
│   └── MainLayout.tsx
├── pages/              # Page-level components
│   └── HomePage.tsx
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── assets/             # Static assets
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Package Manager**: npm
- **Linting**: ESLint
- **Formatting**: Prettier
- **Version Control**: Git

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd project-01
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically

## 🎨 Styling Guidelines

This project uses Tailwind CSS for styling. Here are some guidelines:

### Component Styling

- Use Tailwind utility classes for styling
- Create reusable component classes in `src/index.css` using `@layer components`
- Follow mobile-first responsive design principles

### Custom Classes

```css
@layer components {
}
```

## 🧩 Component Development

### Creating New Components

1. Create a new file in the appropriate directory
2. Use TypeScript interfaces for props
3. Implement accessibility features
4. Add proper event handlers with "handle" prefix
5. Use early returns for better readability

## 🛣️ Routing

This project uses React Router DOM for client-side routing. The routing structure is:

- `/` - Home page
- `/about` - About page
- `/contact` - Contact page
- `*` - 404 Not Found page

### Adding New Routes

1. Create a new page component in `src/pages/`
2. Add the route to `src/App.tsx`
3. Update the navigation in `src/layouts/MainLayout.tsx`

### Example Component Structure

```typescript
import React from 'react';

interface ComponentProps {
  // Define your props here
}

const Component: React.FC<ComponentProps> = ({ /* props */ }) => {
  const handleClick = () => {
    // Handle click event
  };

  return (
    // JSX with Tailwind classes
  );
};

export default Component;
```

## 🔧 Development Tools

### VS Code Extensions

The project includes recommended VS Code extensions:

- Prettier - Code formatter
- ESLint - Linting
- Tailwind CSS IntelliSense - Tailwind class suggestions
- TypeScript support

### Configuration Files

- `.prettierrc` - Code formatting rules
- `.vscode/settings.json` - VS Code workspace settings
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration

## 📱 Responsive Design

The application is built with a mobile-first approach:

- Use responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`)
- Test on various screen sizes
- Ensure touch-friendly interactions on mobile

## ♿ Accessibility

- All interactive elements have proper keyboard navigation
- Use semantic HTML elements
- Include proper ARIA labels
- Ensure sufficient color contrast
- Test with screen readers

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy with zero configuration

### Other Platforms

The built application can be deployed to any static hosting service:

- Netlify
- GitHub Pages
- AWS S3
- Firebase Hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Include steps to reproduce the problem

---

**Happy Coding! 🎉**
