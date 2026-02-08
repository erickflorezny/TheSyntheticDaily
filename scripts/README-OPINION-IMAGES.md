# Generating Images for Opinion Pieces

## Overview
This project now includes image support for opinion pieces. The opinion pieces have been updated to include image fields, and the UI has been modified to display these images.

## Image Style
The opinion piece images use a specific style as requested:
- **Photojournalism style** - Documentary, candid feel
- **Grainy texture** - Adds character and authenticity
- **Slight motion blur** - Creates a sense of immediacy
- **"Shitty local news photography"** - Intentionally imperfect, realistic look

## Files Updated

### 1. Data Structure (`src/lib/data/opinion-pieces.ts`)
- Added `image?: string` field to `OpinionPiece` interface
- Added image paths to all 5 opinion pieces:
  - `opinion-1.png` - "I, For One, Welcome Our AI Overlords..."
  - `opinion-2.png` - "My Therapist Is a Chatbot..."
  - `opinion-3.png` - "Stop Calling It 'Artificial' Intelligence..."
  - `opinion-4.png` - "I Automated My Entire Job..."
  - `opinion-5.png` - "The Real AI Risk Isn't Terminator..."

### 2. UI Components
- **Individual opinion pages** (`src/app/opinion/[slug]/page.tsx`):
  - Added Image import
  - Added hero image display above article content
- **Main opinion page** (`src/app/opinion/page.tsx`):
  - Added Image import
  - Added thumbnail images to opinion piece listings
- **Category page** (`src/app/(sections)/[category]/page.tsx`):
  - Added thumbnail images to opinion piece listings in the opinion category

### 3. Image Generation Script
Created `scripts/generate-opinion-images-simple.ts` to generate images with the specified style.

## How to Generate Images

### Prerequisites
1. Ensure `OPENROUTER_API_KEY` is set in `.env.local`
2. Install dependencies: `npm install`

### Generate Images
Run the opinion image generation script:
```bash
npx tsx scripts/generate-opinion-images-simple.ts
```

### What the Script Does
1. Creates images with the specified photojournalism style
2. Saves images to `public/images/` as:
   - `opinion-1.png`
   - `opinion-2.png`
   - `opinion-3.png`
   - `opinion-4.png`
   - `opinion-5.png`
3. The image paths are already configured in the opinion pieces data

## Image Prompts
Each opinion piece gets a custom prompt based on:
- The article title
- The author's perspective
- Key themes extracted from the content
- The specified visual style (grainy, motion blur, etc.)

## Testing
1. Build the project to ensure no TypeScript errors:
   ```bash
   npm run build
   ```
2. Run the development server to see the images in context:
   ```bash
   npm run dev
   ```
3. Visit `/opinion` to see all opinion pieces with images
4. Click on any opinion piece to see the full article with hero image

## Notes
- The images will be generated at runtime when the script is executed
- Image paths are hardcoded in the data file for consistency
- The style is different from regular story images to distinguish opinion content
- Images follow the same pattern as existing story images but with the requested stylistic differences