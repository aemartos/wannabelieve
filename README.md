# wannabelieve APP

Wannabelieve is a web app to discover amazing paranormal and supernatural phenomena and creating routes for visiting them and report new sightings.

- **Technologies**: MongoDB, Express, Node.js, JavaScript, ES6, HTML5, CSS3 and SASS.
- **Status**: ✅ Updated and ready for deployment

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 8+
- MongoDB database (local or cloud)

### Local Development
1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file (see Environment Variables below)
4. Start development server: `npm run dev` or `pm2 start ecosystem.config.cjs`

## 🚀 Deployment

### Deploy to Vercel (Recommended)

#### Prerequisites
1. Install Vercel CLI: `npm i -g vercel`
2. Have a Vercel account ([sign up here](https://vercel.com))

#### Initial Setup
1. **Login to Vercel:**
   ```bash
   vercel login
   ```

2. **Initialize Vercel project:**
   ```bash
   vercel
   ```
   Follow the prompts to set up your project.

3. **Get your project details** (needed for GitHub Actions):
   - **Vercel Token**: Found in your Vercel account settings
   - **Org ID**: Found in your Vercel account settings  
   - **Project ID**: Found in your project settings

#### Automated Deployment with GitHub Actions

1. **Add GitHub Secrets:**
   Go to your GitHub repository → Settings → Secrets and variables → Actions, and add:
   - `VERCEL_TOKEN`: Your Vercel authentication token
   - `VERCEL_ORG_ID`: Your Vercel organization ID
   - `VERCEL_PROJECT_ID`: Your Vercel project ID

2. **Deploy automatically:**
   ```bash
   # Create and push a version tag
   git tag v1.0.0
   git push origin v1.0.0
   ```
   GitHub Actions will automatically deploy to Vercel!

3. **Alternative: Create a GitHub Release:**
   - Go to your repository → Releases → Create a new release
   - Choose a tag or create a new one
   - Publish the release
   - Automatic deployment to Vercel

#### Manual Deployment
```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

#### Environment Variables in Vercel
Set these in your Vercel project settings:
- `DBURL`: Your MongoDB connection string
- `NODE_ENV`: Set to `production`
- `GOOGLE_MAPS_API_KEY`: Your Google Maps API Key
- Any other environment variables your app needs

## 🔧 Environment Variables

Create a `.env` file in your project root duplicating the `.example.env` file.

### Required for Production:
- `DBURL` - MongoDB connection string
- `SECRET` - Random string for session encryption
- `GOOGLE_MAPS_API_KEY` - Google Maps API key

### Optional (app will work without these):
- OAuth credentials for social login
- Cloudinary for image uploads

## 📁 Project Structure

```
wannabelieve/
├── api/                 # Vercel API handlers
├── bin/                 # Server startup files
├── config/              # Configuration files
├── middlewares/         # Express middlewares
├── models/              # MongoDB models
├── passport/            # Authentication strategies
├── public/              # Static assets
├── routes/              # Express routes
├── views/               # Handlebars templates
├── app.js               # Main Express app
├── vercel.json          # Vercel configuration
└── package.json         # Dependencies and scripts
```

## ✨ Features

### Profile
- User profile management
- Edit details, username, email, profile picture
- Add caption and description

### Phenomena
- View latest phenomena
- Add to favorites
- Register visits with geolocation
- Leave community comments

### Map
- View phenomena worldwide
- Filter by type
- Post new phenomena
- Upload up to 4 images

### Routes
- View latest routes
- Create new routes
- Community comments

## 🔌 API Endpoints

**Get all phenomena**
> `GET /api/getAllPhenomena`

**Get phenomena by type**
> 🦄 `GET /api/getFantasticAnimals`
> 🦑 `GET /api/getSeaCreatures`
> 👾 `GET /api/getExtraterrestrials`
> 👽 `GET /api/getUfos`
> 👻 `GET /api/getGhosts`
> 💩 `GET /api/getWeirdStuff`
> 👂🏻 `GET /api/getPsychophonies`
> 🧠 `GET /api/getParanormal`
> 🌾 `GET /api/getSignals`
> 🧟‍♂️ `GET /api/getHalfHuman`
> ⛪️ `GET /api/getReligiousApparitions`
> 🌈 `GET /api/getNaturalPhenomena`
> 🙈 `GET /api/getUnclassified`

## 🚨 Troubleshooting

### Common Issues

1. **SASS Compilation Errors**
   - Ensure all SASS files use tabs (not spaces) for indentation
   - Check for deprecated SASS functions

2. **MongoDB Connection Issues**
   - Verify your connection string
   - Check if MongoDB is running (for local development)
   - Ensure network access (for cloud databases)

3. **OAuth Errors**
   - Verify OAuth credentials in environment variables
   - Check callback URLs in OAuth provider settings

## 📝 License

MIT License - see LICENSE file for details

## 👥 Contributors

Coded with love ♥️ and unicorn magic ✨ by:
- 🦄 [anæstrada](https://www.linkedin.com/in/aemartos/)
- 🧝 [Teresa Romero](https://www.linkedin.com/in/tromerolozano/)

