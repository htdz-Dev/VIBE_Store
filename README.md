# VIBE - E-commerce Store

A modern e-commerce platform for a streetwear clothing brand, built with **Nuxt 3** (frontend) and **Laravel** (backend API).

## Project Structure

```
store/
├── backend/       # Laravel API
└── frontend/      # Nuxt 3 Application
```

## Features

### Customer Features
- Browse products by category
- Product search
- Product details with size/color variants
- Shopping cart (persistent)
- Guest or authenticated checkout
- Order history (for registered users)
- Cash on Delivery (COD) payment

### Admin Features (Filament)
- Product management (CRUD)
- Category management
- Order management with status updates
- Dashboard

## Tech Stack

- **Frontend**: Nuxt 3, TailwindCSS, Pinia
- **Backend**: Laravel 11, Sanctum (Auth), Filament (Admin)
- **Database**: MySQL

## Getting Started

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL

### Backend Setup

```bash
cd backend

# Install dependencies
composer install

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Generate app key
php artisan key:generate

# Run migrations and seed
php artisan migrate --seed

# Create storage link
php artisan storage:link

# Start server
php artisan serve
```

**Admin login**: admin@vibe.com / password

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure API URL (optional)
# Edit nuxt.config.ts -> runtimeConfig.public.apiBase

# Start dev server
npm run dev
```

## API Endpoints

### Public
- `GET /api/v1/products` - List products
- `GET /api/v1/products/featured` - Featured products
- `GET /api/v1/products/{slug}` - Product detail
- `GET /api/v1/categories` - List categories
- `POST /api/v1/register` - Register
- `POST /api/v1/login` - Login
- `POST /api/v1/checkout/guest` - Guest checkout

### Authenticated
- `GET /api/v1/user` - Get current user
- `PUT /api/v1/user/profile` - Update profile
- `GET /api/v1/orders` - User orders
- `POST /api/v1/checkout` - Authenticated checkout
- `POST /api/v1/logout` - Logout

## Deployment

### Backend (VPS)
1. Configure Nginx with PHP-FPM
2. Set up MySQL database
3. Configure `.env` for production
4. Run `composer install --optimize-autoloader --no-dev`
5. Run migrations

### Frontend (Vercel/Netlify)
1. Connect repository
2. Set build command: `npm run build`
3. Set output directory: `.output/public`
4. Configure environment variable: `NUXT_PUBLIC_API_BASE`

## License

Proprietary - All rights reserved.
