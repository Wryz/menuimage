import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Text,
  Alert,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ImageCapture} from './src/components/ImageCapture';
import {MenuGallery} from './src/components/MenuGallery';
import {
  getMenuItemsWithImages,
  type MenuItemWithImage,
} from './src/services/openai.service';
import {colors, typography, spacing} from './src/theme/colors';
import {TopographyBackground} from './src/components/TopographyBackground';
import {SparklesIcon} from './src/components/icons/SparklesIcon';

type AppState = 'capture' | 'processing' | 'gallery';

function App() {
  const [appState, setAppState] = useState<AppState>('capture');
  const [menuItems, setMenuItems] = useState<MenuItemWithImage[]>([]);

  const handleImageSelected = async (base64Image: string) => {
    setAppState('processing');

    try {
      const items = await getMenuItemsWithImages(base64Image);
      
      if (items.length === 0) {
        Alert.alert(
          'No Items Found',
          'Could not detect any menu items in the image. Please try again with a clearer photo.',
        );
        setAppState('capture');
        return;
      }

      setMenuItems(items);
      setAppState('gallery');
    } catch (error) {
      console.error('Error processing menu image:', error);
      Alert.alert(
        'Error',
        'Failed to process the menu image. Please check your internet connection and try again.',
      );
      setAppState('capture');
    }
  };

  const handleReset = () => {
    setMenuItems([]);
    setAppState('capture');
  };

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background}
      />
      <View style={styles.container}>
        {appState === 'capture' && (
          <ImageCapture onImageSelected={handleImageSelected} />
        )}

        {appState === 'processing' && (
          <View style={styles.processingContainer}>
            <TopographyBackground opacity={0.05} color={colors.primary} />
            <View style={styles.loadingCard}>
              <View style={styles.iconWrapper}>
                <SparklesIcon size={48} color={colors.primary} />
              </View>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.processingText}>
                Analyzing your menu...
              </Text>
              <Text style={styles.processingSubtext}>
                Finding beautiful images for each dish
              </Text>
              <View style={styles.dotsContainer}>
                <View style={styles.dot} />
                <View style={[styles.dot, styles.dotDelay1]} />
                <View style={[styles.dot, styles.dotDelay2]} />
              </View>
            </View>
          </View>
        )}

        {appState === 'gallery' && (
          <MenuGallery menuItems={menuItems} onReset={handleReset} />
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  processingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  loadingCard: {
    backgroundColor: colors.white,
    padding: spacing.xxl,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    minWidth: 280,
  },
  iconWrapper: {
    marginBottom: spacing.md,
  },
  processingText: {
    marginTop: spacing.lg,
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.semibold,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  processingSubtext: {
    marginTop: spacing.sm,
    fontSize: typography.fontSizes.base,
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: 240,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  dotDelay1: {
    opacity: 0.6,
  },
  dotDelay2: {
    opacity: 0.3,
  },
});

export default App;
