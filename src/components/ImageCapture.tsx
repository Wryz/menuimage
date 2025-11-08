import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  type ImagePickerResponse,
} from 'react-native-image-picker';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {colors, typography, spacing, borderRadius, shadows} from '../theme/colors';
import {TopographyBackground} from './TopographyBackground';
import {CameraIcon} from './icons/CameraIcon';
import {GalleryIcon} from './icons/GalleryIcon';
import {SparklesIcon} from './icons/SparklesIcon';
import {MenuIcon} from './icons/MenuIcon';

interface ImageCaptureProps {
  onImageSelected: (base64Image: string) => void;
}

export const ImageCapture: React.FC<ImageCaptureProps> = ({
  onImageSelected,
}) => {
  const requestCameraPermission = async (): Promise<boolean> => {
    try {
      const permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA;

      const result = await request(permission);

      if (result === RESULTS.GRANTED) {
        return true;
      } else if (result === RESULTS.DENIED) {
        Alert.alert(
          'Camera Permission Required',
          'Please allow camera access to take photos of menus.',
          [{text: 'OK'}],
        );
        return false;
      } else if (result === RESULTS.BLOCKED) {
        Alert.alert(
          'Camera Permission Blocked',
          'Please enable camera access in your device settings to take photos.',
          [{text: 'OK'}],
        );
        return false;
      }
      return false;
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      return false;
    }
  };

  const handleCameraPress = async () => {
    // Request permission when user clicks camera button
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      return;
    }

    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxWidth: 1024,
        maxHeight: 1024,
        quality: 0.8,
      },
      handleImageResponse,
    );
  };

  const handleLibraryPress = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxWidth: 1024,
        maxHeight: 1024,
        quality: 0.8,
      },
      handleImageResponse,
    );
  };

  const handleImageResponse = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      Alert.alert('Error', response.errorMessage || 'Failed to pick image');
    } else if (response.assets && response.assets[0]?.base64) {
      onImageSelected(response.assets[0].base64);
    }
  };

  return (
    <View style={styles.container}>
      <TopographyBackground opacity={0.05} color={colors.primary} />
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>MenuImage</Text>
          <View style={styles.badge}>
            <SparklesIcon size={12} color={colors.white} />
            <Text style={styles.badgeText}>AI Powered</Text>
          </View>
        </View>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Capture any menu and discover beautiful images of each dish
        </Text>

        {/* Illustration */}
        <View style={styles.illustration}>
          <View style={styles.iconCircle}>
            <CameraIcon size={40} color={colors.primary} />
          </View>
          <View style={styles.iconCircle}>
            <MenuIcon size={40} color={colors.primary} />
          </View>
          <View style={styles.iconCircle}>
            <GalleryIcon size={40} color={colors.primary} />
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={handleCameraPress}
            activeOpacity={0.8}>
            <CameraIcon size={24} color={colors.white} />
            <Text style={styles.primaryButtonText}>Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={handleLibraryPress}
            activeOpacity={0.8}>
            <GalleryIcon size={24} color={colors.textPrimary} />
            <Text style={styles.secondaryButtonText}>Choose from Library</Text>
          </TouchableOpacity>
        </View>

        {/* Info text */}
        <Text style={styles.infoText}>
          Camera permission will be requested when you tap "Take Photo"
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSizes.huge,
    fontWeight: typography.fontWeights.bold,
    color: colors.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    gap: 4,
  },
  badgeText: {
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.semibold,
    color: colors.white,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: typography.fontSizes.lg,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: spacing.xl,
    maxWidth: 300,
  },
  illustration: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
    marginBottom: spacing.xxl,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.medium,
  },
  buttonContainer: {
    width: '100%',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  button: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    ...shadows.medium,
  },
  secondaryButton: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.gray300,
    ...shadows.small,
  },
  primaryButtonText: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    color: colors.white,
  },
  secondaryButtonText: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    color: colors.textPrimary,
  },
  infoText: {
    fontSize: typography.fontSizes.sm,
    color: colors.textLight,
    textAlign: 'center',
    maxWidth: 280,
  },
});
