# 🎮 LoL Champions Explorer

A modern React application for exploring League of Legends champions with detailed stats, abilities, and lore.

## 🚀 Live Demo

[**View Live Application**](https://LonesoMage.github.io/lol-champions/)

## ✨ Features

- 🎯 **Browse All Champions** - Complete roster with filtering and search
- 🔍 **Multi-Role Filtering** - Filter by multiple roles simultaneously (AND logic)
- 📊 **Detailed Statistics** - Comprehensive champion stats and abilities
- 📖 **Champion Lore** - Rich backstories and descriptions
- 🎨 **Modern UI** - Beautiful League of Legends themed interface
- 📱 **Responsive Design** - Works perfectly on all devices
- ⚡ **Fast Performance** - Built with Vite and optimized for speed

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Styled Components
- **Routing**: React Router
- **API**: Riot Games Data Dragon API
- **Build Tool**: Vite
- **Testing**: Vitest + Cypress
- **Deployment**: GitHub Pages

## 🔧 Installation & Development

```bash
# Clone the repository
git clone https://github.com/LonesoMage/lol-champions.git
cd lol-champions

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Run E2E tests
npm run e2e

# Build for production
npm run build
```

## 🧪 Testing

- **Unit Tests**: Vitest with React Testing Library
- **E2E Tests**: Cypress with comprehensive test coverage
- **Linting**: ESLint with TypeScript support

```bash
# Run all tests
npm run test:run

# Run E2E tests
npm run e2e

# Open Cypress Test Runner
npm run cypress:open
```

## 📦 Deployment

The application is automatically deployed to GitHub Pages when code is pushed to the main branch.

### Manual Deployment

```bash
npm run deploy
```

## 🌟 Key Features Explained

### Multi-Role Filtering
Unlike traditional OR filtering, this app uses AND logic - selecting "Tank" and "Support" shows only champions that have BOTH roles.

### Real-Time Data
All champion data is fetched from the official Riot Games Data Dragon API, ensuring accuracy and up-to-date information.

### Performance Optimized
- Lazy loading of champion images
- Efficient Redux state management
- Optimized bundle size with Vite

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is for educational purposes. League of Legends and Riot Games are trademarks of Riot Games, Inc.

## 🙏 Acknowledgments

- Riot Games for the Data Dragon API
- League of Legends community
- React and TypeScript communities
EOF
