# Second Brain App 

A modern knowledge management application built with Next.js, TypeScript, and Prisma. Store, organize, and retrieve your thoughts, notes, and ideas seamlessly.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://second-brain-app-inky-seven.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-99%25-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)

##  Live Demo

Check out the deployed application: [second-brain-app-inky-seven.vercel.app](https://second-brain-app-inky-seven.vercel.app)

##  Features

- **Smart Note Management** - Create, edit, and organize your notes efficiently
- **TypeScript First** - Type-safe development for robust code
- **Modern UI** - Built with Tailwind CSS for a clean, responsive interface
- **Database Integration** - Prisma ORM for seamless data management
- **Fast & Responsive** - Optimized with Next.js 14 for excellent performance
- **Cloud Deployed** - Hosted on Vercel for reliable access anywhere

##  Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, PostCSS
- **Database**: Prisma ORM
- **Deployment**: Vercel
- **Development**: TypeScript, ESLint

##  Prerequisites

Before you begin, ensure you have installed:
- Node.js (v18 or higher)
- npm or yarn
- Git

##  Installation

1. **Clone the repository**
```bash
git clone https://github.com/jonnarishika/second-brain-app.git
cd second-brain-app
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
# Create a .env file in the root directory
touch .env
```

Add the following variables:
```env
DATABASE_URL="your_database_connection_string"
```

4. **Initialize Prisma**
```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

##  Project Structure

```
second-brain-app/
├── src/                    # Source files
│   ├── app/               # Next.js app directory
│   ├── components/        # React components
│   └── lib/               # Utility functions
├── prisma/                # Prisma schema and migrations
├── public/                # Static assets
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── postcss.config.js      # PostCSS configuration
```

##  Deployment

This application is deployed on Vercel. To deploy your own instance:

1. **Push your code to GitHub**
2. **Import project to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
3. **Configure environment variables**
   - Add `DATABASE_URL` in Vercel project settings
4. **Deploy**
   - Vercel will automatically build and deploy your application

##  Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx prisma studio    # Open Prisma Studio (database GUI)
```

##  Use Cases

- **Personal Knowledge Base** - Store notes, ideas, and learnings
- **Study Notes** - Organize academic materials and research
- **Project Documentation** - Keep track of project ideas and documentation
- **Daily Journaling** - Maintain a digital journal
- **Quick Reference** - Save code snippets, links, and resources

##  Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

##  License

This project is open source and available under the [MIT License](LICENSE).

##  Author

**Rishika Jonna**

- GitHub: [@jonnarishika](https://github.com/jonnarishika)
- LinkedIn: [linkedin.com/in/rishikajonna](https://linkedin.com/in/rishikajonna)

##  Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database management with [Prisma](https://www.prisma.io/)
- Deployed on [Vercel](https://vercel.com/)


