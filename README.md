# MenuImage

Transform any menu into a visual gallery! MenuImage uses AI to analyze menu photos and automatically finds beautiful images of each dish.

## Features

- 📸 **Take or Upload Menu Photos** - Capture menus using your camera or select from your photo library
- 🤖 **AI-Powered Menu Analysis** - Uses OpenAI's GPT-4 Vision to extract menu items, descriptions, and prices
- 🖼️ **Automatic Image Search** - Finds high-quality food images for each menu item
- 📱 **Beautiful Gallery View** - Browse menu items in an elegant, Instagram-style grid
- ⚡ **One-Page Experience** - Simple, intuitive flow from capture to gallery

## Screenshots

[Add screenshots here]

## Prerequisites

- Node.js >= 20
- React Native development environment set up
- iOS: Xcode and CocoaPods
- Android: Android Studio and SDK
- OpenAI API Key

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/menuimage.git
   cd menuimage
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the example env file and add your OpenAI API key:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your OpenAI API key:
   ```
   OPEN_AI_API_KEY=your_openai_api_key_here
   ```

4. **Install iOS dependencies**
   ```bash
   cd ios
   bundle install
   export LANG=en_US.UTF-8
   bundle exec pod install
   cd ..
   ```

## Running the App

### iOS
```bash
npm run ios
```

Or open `ios/MenuImageApp.xcworkspace` in Xcode and run.

### Android
```bash
npm run android
```

## How It Works

1. **Capture**: Take a photo of a menu or select one from your library
2. **Analyze**: The app sends the image to OpenAI's GPT-4 Vision API to extract menu items
3. **Search**: For each menu item, the app searches for high-quality food images
4. **Display**: Browse the menu items in a beautiful gallery with item names, descriptions, and prices

## Project Structure

```
menuimage/
├── src/
│   ├── components/
│   │   ├── ImageCapture.tsx    # Camera/photo picker component
│   │   └── MenuGallery.tsx     # Gallery display component
│   └── services/
│       └── openai.service.ts   # OpenAI API integration
├── types/
│   └── env.d.ts                # TypeScript definitions for env variables
├── App.tsx                      # Main app component
└── .env                         # Environment variables (not in git)
```

## Technologies Used

- **React Native** - Cross-platform mobile framework
- **TypeScript** - Type-safe JavaScript
- **OpenAI GPT-4 Vision** - Menu analysis and text extraction
- **React Native Image Picker** - Camera and photo library access
- **React Native Permissions** - Permission handling
- **React Native Safe Area Context** - Safe area handling

## API Keys

This app requires an OpenAI API key. Get one at [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)

⚠️ **Important**: Never commit your `.env` file with API keys to version control. The `.env` file is already in `.gitignore`.

## Development

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

### Type Checking
```bash
npx tsc --noEmit
```

## Permissions

The app requires the following permissions:

### iOS
- Camera access
- Photo library access

### Android
- Camera access
- Read external storage
- Read media images

## Troubleshooting

### iOS Build Issues
- Make sure CocoaPods are installed: `bundle exec pod install`
- Clean build folder: `cd ios && xcodebuild clean`
- Reset Metro cache: `npm start -- --reset-cache`

### Android Build Issues
- Clean gradle: `cd android && ./gradlew clean`
- Reset Metro cache: `npm start -- --reset-cache`

### API Issues
- Verify your OpenAI API key is correct in `.env`
- Check that you have sufficient credits in your OpenAI account
- Ensure `.env` file is in the project root

## Future Enhancements

- [ ] Add favorites/bookmarking
- [ ] Save menu history
- [ ] Share menu galleries
- [ ] Multiple image sources (Google Images, Yelp, etc.)
- [ ] Dietary filters (vegetarian, vegan, gluten-free)
- [ ] Price range filters
- [ ] Restaurant information integration

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please open an issue on GitHub.
