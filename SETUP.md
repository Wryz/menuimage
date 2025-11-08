# MenuImage Setup Guide

## Quick Start

Your MenuImage app is ready to go! Here's how to run it:

### 1. Start Metro Bundler
```bash
npm start
```

### 2. Run on iOS
In a new terminal:
```bash
npm run ios
```

### 3. Run on Android
In a new terminal:
```bash
npm run android
```

## What Was Built

### ✅ Complete Features
1. **Image Capture Screen** - Users can take photos or select from library
2. **AI Menu Analysis** - OpenAI GPT-4 Vision extracts menu items
3. **Automatic Image Search** - Finds food images for each item
4. **Gallery Display** - Beautiful 2-column grid showing all items
5. **Full Permissions** - Camera and photo library access properly configured

### 📁 Project Structure

```
menuimage/
├── src/
│   ├── components/
│   │   ├── ImageCapture.tsx     # Main capture screen
│   │   └── MenuGallery.tsx      # Results gallery
│   └── services/
│       └── openai.service.ts    # AI integration
├── App.tsx                       # Main app logic
├── .env                          # Your API keys (DO NOT COMMIT)
└── types/env.d.ts               # TypeScript definitions
```

### 🔑 Environment Variables

Your OpenAI API key is configured in:
- `.env` (default/development)
- `.env.local` (local development)
- `.env.production` (production builds)

**Important**: These files are in `.gitignore` to protect your API key!

## How to Use the App

1. **Launch** - App opens to the capture screen
2. **Take/Select Photo** - Choose "Take Photo" or "Choose from Library"
3. **Wait** - AI analyzes the menu (this takes 15-30 seconds)
4. **Browse** - Scroll through the gallery of menu items
5. **Scan Again** - Tap "Scan New Menu" to start over

## Permissions Explained

### iOS (Info.plist)
- ✅ Camera permission with user-friendly message
- ✅ Photo library read permission
- ✅ Photo library add permission (if needed for saving)
- ❌ Local network permission (removed per your request)
- ❌ Location permission (removed)

### Android (AndroidManifest.xml)
- ✅ Camera permission
- ✅ Internet permission (for API calls)
- ✅ Read external storage
- ✅ Read media images (Android 13+)

## Troubleshooting

### "No items found" error
- Try a clearer photo with better lighting
- Make sure the menu text is readable
- Take the photo straight-on, not at an angle

### API errors
- Check your OpenAI API key in `.env`
- Ensure you have API credits available
- Check your internet connection

### Build errors
```bash
# Clean everything
npm run clean

# Reinstall pods (iOS only)
npm run pods

# Reset Metro cache
npm run clean:metro
```

### iOS specific
```bash
cd ios
rm -rf Pods Podfile.lock
export LANG=en_US.UTF-8
bundle exec pod install
cd ..
```

## Development Tips

### Testing with sample menus
1. Search Google Images for "restaurant menu"
2. Download a few clear menu images
3. Use "Choose from Library" to test

### Improving results
- The AI works best with:
  - Clear, well-lit photos
  - Straight-on angles
  - Readable text
  - Standard menu formats

### Cost considerations
- OpenAI GPT-4 Vision costs ~$0.01-0.03 per menu analysis
- Image searches use free Unsplash source
- Monitor your OpenAI usage dashboard

## Next Steps

### Recommended improvements:
1. **Add loading progress** - Show which items are being processed
2. **Cache results** - Save analyzed menus locally
3. **Better image sources** - Integrate Google Custom Search, Yelp API
4. **Favorites** - Let users save favorite items
5. **Share** - Export gallery as image or PDF
6. **Dietary tags** - Detect vegetarian, vegan, gluten-free items
7. **Price sorting** - Sort by price range
8. **Restaurant info** - Add restaurant name and location

### Optional enhancements:
- Offline mode with cached results
- Multiple menu page support
- Ingredient detection
- Nutrition information lookup
- User reviews integration

## Support

Having issues? Check:
1. README.md for full documentation
2. TypeScript errors in your IDE
3. Metro bundler console
4. Device logs (iOS: Console.app, Android: `adb logcat`)

## Security Notes

⚠️ **NEVER commit your `.env` file!**

The API key in `.env` gives full access to your OpenAI account. Keep it secret!

If you accidentally commit it:
1. Revoke the key immediately at platform.openai.com
2. Generate a new key
3. Update your `.env` file
4. Git history cleanup:
   ```bash
   git filter-branch --force --index-filter \
   "git rm --cached --ignore-unmatch .env" \
   --prune-empty --tag-name-filter cat -- --all
   ```

## Ready to Go! 🚀

Your MenuImage app is fully configured and ready to use. Just run:
```bash
npm start
```

Then in another terminal:
```bash
npm run ios  # or npm run android
```

Enjoy transforming menus into visual galleries!

