# Environment Setup Guide

This guide will help you set up the environment variables for the CampusByte project.

## Quick Setup

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Generate a secure JWT secret:**
   ```bash
   npm run env:generate-jwt
   ```

3. **Update your `.env` file with the generated JWT secret**

4. **Run the complete setup:**
   ```bash
   npm run setup
   ```

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | SQLite database file path | `file:./dev.db` |
| `JWT_SECRET` | Secret key for JWT token signing | Generated 64-char hex string |

### Optional Variables

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `NODE_ENV` | Environment mode | `development` | `production` |
| `PORT` | Server port | `3000` | `3000` |
| `NEXTAUTH_URL` | NextAuth base URL | `http://localhost:3000` | `https://yourapp.com` |
| `NEXTAUTH_SECRET` | NextAuth secret key | - | Random string |

### Feature Flags

| Variable | Description | Default |
|----------|-------------|---------|
| `ENABLE_REGISTRATION` | Allow new user registration | `true` |
| `ENABLE_BLOG_COMMENTS` | Enable blog comments | `false` |
| `ENABLE_JOB_ALERTS` | Enable job alert emails | `false` |

### Future Integrations (Optional)

These are prepared for future features:

#### Email Service
```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

#### OAuth Providers
```env
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

#### File Upload (Cloudinary)
```env
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

#### Analytics
```env
GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"
MIXPANEL_TOKEN="your-mixpanel-token"
```

#### AI Features
```env
OPENAI_API_KEY="sk-..."
```

## Security Notes

1. **Never commit `.env` files** - They're already in `.gitignore`
2. **Use strong JWT secrets** - Use the provided generator script
3. **Rotate secrets regularly** in production
4. **Use different secrets** for different environments
5. **Store production secrets securely** (use services like Vercel Environment Variables, AWS Secrets Manager, etc.)

## Development vs Production

### Development
- Use SQLite database (`file:./dev.db`)
- Enable debug features
- Use localhost URLs

### Production
- Use PostgreSQL or other production database
- Disable debug features
- Use HTTPS URLs
- Use secure secret management

## Troubleshooting

### Common Issues

1. **JWT Secret too short**
   - Solution: Use the generator script `npm run env:generate-jwt`

2. **Database connection issues**
   - Solution: Ensure `DATABASE_URL` points to correct file path
   - Run `npx prisma db push` to create database

3. **Authentication not working**
   - Solution: Check JWT_SECRET is set and matches between requests

4. **Environment variables not loading**
   - Solution: Restart the development server after changing `.env`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run env:generate-jwt` | Generate secure JWT secret |
| `npm run setup` | Complete project setup |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:seed` | Seed database with sample data |

## Example Production Setup

For production deployment (e.g., Vercel):

1. Set environment variables in your hosting platform
2. Use a production database (PostgreSQL recommended)
3. Generate new JWT secrets for production
4. Enable HTTPS and update URLs accordingly

```env
# Production example
DATABASE_URL="postgresql://user:pass@host:5432/campusbyte"
JWT_SECRET="production-jwt-secret-64-chars-long"
NEXTAUTH_URL="https://campusbyte.com"
NODE_ENV="production"
```