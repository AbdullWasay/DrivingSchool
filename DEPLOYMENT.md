# Deployment Guide

## Environment Configuration

This project uses different environment variables for development and production environments.

### Frontend Environment Variables

#### Development (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
CLOUDINARY_CLOUD_NAME=dkwzwy17v
CLOUDINARY_API_KEY=934121348486484
CLOUDINARY_API_SECRET=aHT_62k-aPOpDPu6nXVaHI2vIEY
```

#### Production (.env.production)
```
NEXT_PUBLIC_API_URL=https://drivingschoolbackend.onrender.com/api
CLOUDINARY_CLOUD_NAME=dkwzwy17v
CLOUDINARY_API_KEY=934121348486484
CLOUDINARY_API_SECRET=aHT_62k-aPOpDPu6nXVaHI2vIEY
```

### Backend Environment Variables (.env)
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://wasay:mongodb308@cluster0.etvipre.mongodb.net/DrivingSchool
JWT_SECRET=12345678998765432123456789
JWT_EXPIRE=30d
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
EMAIL_FROM=noreply@fahrschulfinder.de
CLOUDINARY_CLOUD_NAME=dkwzwy17v
CLOUDINARY_API_KEY=934121348486484
CLOUDINARY_API_SECRET=aHT_62k-aPOpDPu6nXVaHI2vIEY
```

## Deployment Steps

### Backend Deployment (Render)
1. Backend is already deployed at: https://drivingschoolbackend.onrender.com
2. Make sure all environment variables are set in Render dashboard

### Frontend Deployment (Vercel)

#### Option 1: Using Vercel CLI
1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel --prod`
4. Set environment variables in Vercel dashboard

#### Option 2: Using Vercel Dashboard
1. Connect your GitHub repository to Vercel
2. Set the following environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL` = `https://drivingschoolbackend.onrender.com/api`
   - `CLOUDINARY_CLOUD_NAME` = `dkwzwy17v`
   - `CLOUDINARY_API_KEY` = `934121348486484`
   - `CLOUDINARY_API_SECRET` = `aHT_62k-aPOpDPu6nXVaHI2vIEY`

## Important Notes

- The `NEXT_PUBLIC_` prefix is required for environment variables that need to be accessible in the browser
- Environment variables without this prefix are only available on the server side
- Make sure to set the correct API URL for your deployment environment
- The backend URL should not have a trailing slash
