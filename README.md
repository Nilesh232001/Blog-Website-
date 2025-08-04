# BlogHub - Full Stack Blog Website

A modern, full-stack blog website built with React, Express.js, and MongoDB. Features user authentication, blog post creation, comments, likes, and a responsive design.

## 🚀 Features

### Frontend (React)
- **Modern UI/UX**: Clean, responsive design with smooth animations
- **User Authentication**: Login, registration, and profile management
- **Blog Management**: Create, edit, and delete blog posts
- **Rich Text Editor**: WYSIWYG editor for creating posts
- **Search Functionality**: Search posts by title, content, or tags
- **Comments System**: Add and view comments on posts
- **Like System**: Like and unlike posts
- **Responsive Design**: Mobile-first approach
- **Real-time Notifications**: Toast notifications for user feedback

### Backend (Express.js)
- **RESTful API**: Clean, well-structured API endpoints
- **User Authentication**: JWT-based authentication with bcrypt
- **File Upload**: Support for featured images
- **Data Validation**: Input validation and sanitization
- **Error Handling**: Comprehensive error handling
- **Pagination**: Efficient data pagination
- **Search**: Full-text search functionality

### Database (MongoDB)
- **User Management**: User profiles and authentication
- **Blog Posts**: Rich post content with metadata
- **Comments**: Nested comment system
- **Likes**: User interaction tracking
- **Tags**: Categorization system

## 🛠️ Tech Stack

### Frontend
- **React 18**: Modern React with hooks
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **React Hook Form**: Form management
- **React Quill**: Rich text editor
- **React Icons**: Icon library
- **React Hot Toast**: Notifications
- **Date-fns**: Date formatting

### Backend
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB ODM
- **JWT**: Authentication tokens
- **Bcryptjs**: Password hashing
- **Express Validator**: Input validation
- **CORS**: Cross-origin resource sharing
- **Dotenv**: Environment variables

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blog-website
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/blog-website
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

4. **Database Setup**
   
   Make sure MongoDB is running on your system or use MongoDB Atlas:
   - For local MongoDB: Start the MongoDB service
   - For MongoDB Atlas: Update the MONGODB_URI in your .env file

5. **Start the application**
   ```bash
   # From the root directory
   npm run dev
   ```
   
   This will start both the backend (port 5000) and frontend (port 3000) concurrently.

## 🚀 Usage

### Development Mode
```bash
# Start both frontend and backend
npm run dev

# Start only backend
npm run server

# Start only frontend
npm run client
```

### Production Build
```bash
# Build frontend for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
blog-website/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Post.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── posts.js
│   │   └── users.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── config.env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── layout/
│   │   │   ├── posts/
│   │   │   ├── ui/
│   │   │   └── routing/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Posts
- `GET /api/posts` - Get all published posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Like/unlike post
- `POST /api/posts/:id/comments` - Add comment
- `GET /api/posts/search` - Search posts

### Users
- `GET /api/users/profile/:id` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/posts` - Get user's posts

## 🎨 Features in Detail

### User Authentication
- Secure registration and login
- JWT token-based authentication
- Password hashing with bcrypt
- Protected routes

### Blog Post Management
- Rich text editor for content creation
- Markdown support
- Image upload for featured images
- Draft and published states
- Tags and categories

### User Experience
- Responsive design for all devices
- Smooth animations and transitions
- Real-time search functionality
- Pagination for better performance
- Loading states and error handling

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- CORS configuration
- Environment variable management
- Protected API endpoints

## 🚀 Deployment

### Backend Deployment (Heroku)
1. Create a Heroku app
2. Set environment variables
3. Deploy using Git or Heroku CLI

### Frontend Deployment (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `build` folder to your hosting service

### Database Deployment (MongoDB Atlas)
1. Create a MongoDB Atlas cluster
2. Update the MONGODB_URI in your environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please:
1. Check the existing issues
2. Create a new issue with detailed information
3. Contact the maintainers

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js community for the robust backend framework
- MongoDB for the flexible database solution
- All the open-source contributors whose packages made this possible 