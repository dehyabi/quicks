# Quicks - Modern Chat Interface

A sleek, responsive chat interface built with Next.js, TypeScript, and Tailwind CSS. This project features a floating action button that expands to reveal additional actions, including an inbox modal with message previews.

## ✨ Features

- Modern, clean UI with smooth animations
- Responsive design that works on all screen sizes
- Floating action button with expandable menu
- Inbox modal with message previews
- Loading states and transitions
- Built with TypeScript for type safety
- Styled with Tailwind CSS

## 🚀 Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/dehyabi/quicks.git
   cd quicks
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Build & Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

### Export Static Site

```bash
npm run export
# or
yarn export
```

This will create a `dist` folder with the static export of your app.

### Deploy to Netlify

This project is configured for deployment to Netlify with the following settings:
- Build command: `next build && next export -o dist`
- Publish directory: `dist`

## 🧩 Project Structure

- `/src/app` - Next.js app directory with page components
- `/src/components` - Reusable UI components
- `/src/components/ui` - Base UI components
- `/public` - Static assets

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
