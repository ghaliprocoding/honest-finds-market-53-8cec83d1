
# Product Review Platform - Backend API

A Node.js + Express backend server with MongoDB Atlas integration for a product review platform.

## Features

- **Authentication**: JWT-based auth with bcrypt password hashing
- **User Roles**: Support for `user` and `seller` roles
- **Products**: CRUD operations for products (sellers only can create)
- **Reviews**: Users can review products with ratings and comments
- **MongoDB Atlas**: Cloud database integration
- **Security**: CORS enabled, protected routes, role-based access

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user/seller
- `POST /api/auth/login` - Login and get JWT token

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details with reviews
- `POST /api/products` - Create product (seller only)

### Reviews
- `POST /api/reviews` - Submit review (user only)
- `GET /api/reviews/:productId` - Get all reviews for a product

### Health Check
- `GET /api/health` - Server health check

## Setup & Installation

1. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file from `.env.example` and update the values:
   ```bash
   cp .env.example .env
   ```

3. **Start the server**:
   ```bash
   # Development mode with nodemon
   npm run dev
   
   # Production mode
   npm start
   ```

4. **Server will run on**: `http://localhost:5000`

## Database Models

### User
- name, email, password (hashed), role (user/seller), createdAt

### Product
- title, description, imageURL, category, sellerId, averageRating, createdAt

### Review
- userId, productId, rating (1-5), comment, createdAt

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Role-Based Access

- **Users**: Can create reviews
- **Sellers**: Can create products
- **Public**: Can view products and reviews

## CORS Configuration

The server is configured to accept requests from `http://localhost:5173` (default Vite frontend URL). Update `FRONTEND_URL` in `.env` to match your frontend URL.
