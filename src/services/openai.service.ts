import OpenAI from 'openai';
import {OPEN_AI_API_KEY} from '@env';

const openai = new OpenAI({
  apiKey: OPEN_AI_API_KEY,
  dangerouslyAllowBrowser: true, // Required for React Native
  baseURL: 'https://api.openai.com/v1', // Explicit base URL without trailing slash
});

export interface MenuItem {
  name: string;
  description?: string;
  price?: string;
}

export interface MenuItemWithImage extends MenuItem {
  imageUrl: string;
}

export const extractMenuItems = async (
  base64Image: string,
): Promise<MenuItem[]> => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Please analyze this menu image and extract all menu items. For each item, provide the name, a brief description if available, and price if visible. Return the response as a JSON array with objects containing "name", "description", and "price" fields. Only return the JSON array, no other text.',
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 4096,
    });

    const content = response.choices[0]?.message?.content || '[]';
    
    // Extract JSON from the response
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    const jsonString = jsonMatch ? jsonMatch[0] : '[]';
    
    const items: MenuItem[] = JSON.parse(jsonString);
    return items;
  } catch (error) {
    console.error('Error extracting menu items:', error);
    throw error;
  }
};

export const searchMenuItemImages = async (
  menuItem: MenuItem,
): Promise<string[]> => {
  try {
    // Use OpenAI to generate a search query for the menu item
    const searchQuery = `${menuItem.name} ${menuItem.description || ''} food dish restaurant meal`;
    
    // Use DALL-E to generate a placeholder or search online
    // For now, we'll use a combination of the Unsplash API (free) as a fallback
    // But let's use OpenAI to help us get better search terms
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `Generate 3-5 optimized search terms for finding high-quality food images of "${menuItem.name}${menuItem.description ? ' - ' + menuItem.description : ''}". Return only the search terms separated by commas, nothing else.`,
        },
      ],
      max_tokens: 100,
    });

    const searchTerms = response.choices[0]?.message?.content || menuItem.name;
    
    // Use Unsplash API (free tier) to get actual images
    // For production, you'd want to use multiple sources including Google Custom Search
    const imageUrls = await searchUnsplashImages(searchTerms.split(',')[0].trim());
    
    return imageUrls;
  } catch (error) {
    console.error('Error searching for menu item images:', error);
    // Return placeholder images on error
    return [
      `https://source.unsplash.com/800x600/?${encodeURIComponent(menuItem.name)},food`,
    ];
  }
};

const searchUnsplashImages = async (query: string): Promise<string[]> => {
  try {
    // Using Unsplash's source API (no API key required for basic use)
    // This is a simple approach - for production, use the full Unsplash API
    const baseUrls = [
      `https://source.unsplash.com/800x600/?${encodeURIComponent(query)},food,dish`,
      `https://source.unsplash.com/800x600/?${encodeURIComponent(query)},restaurant,meal`,
      `https://source.unsplash.com/800x600/?${encodeURIComponent(query)},cuisine`,
    ];
    
    return baseUrls;
  } catch (error) {
    console.error('Error searching Unsplash:', error);
    return [`https://source.unsplash.com/800x600/?${encodeURIComponent(query)},food`];
  }
};

export const getMenuItemsWithImages = async (
  base64Image: string,
): Promise<MenuItemWithImage[]> => {
  try {
    // Step 1: Extract menu items from the image
    const menuItems = await extractMenuItems(base64Image);
    
    // Step 2: Search for images for each menu item
    const itemsWithImages: MenuItemWithImage[] = [];
    
    for (const item of menuItems) {
      const imageUrls = await searchMenuItemImages(item);
      itemsWithImages.push({
        ...item,
        imageUrl: imageUrls[0], // Use the first image
      });
    }
    
    return itemsWithImages;
  } catch (error) {
    console.error('Error getting menu items with images:', error);
    throw error;
  }
};

