import React, {useState, useEffect} from 'react';
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
  type ImagePickerResponse,
} from 'react-native-image-picker';
import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {colors, typography, spacing, borderRadius} from '../theme/colors';
import {CameraIcon} from './icons/CameraIcon';

interface ImageCaptureProps {
  onImageSelected: (base64Image: string) => void;
}

export const ImageCapture: React.FC<ImageCaptureProps> = ({
  onImageSelected,
}) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const checkCameraPermission = async () => {
    try {
      const permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA;

      const result = await check(permission);
      setHasPermission(result === RESULTS.GRANTED);
    } catch (error) {
      console.error('Error checking camera permission:', error);
      setHasPermission(false);
    }
  };

  const requestCameraPermission = async (): Promise<boolean> => {
    try {
      const permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA;

      const result = await request(permission);

      if (result === RESULTS.GRANTED) {
        setHasPermission(true);
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

  const handleTakePhoto = async () => {
    // Request permission if not granted
    if (!hasPermission) {
      const granted = await requestCameraPermission();
      if (!granted) {
        return;
      }
    }

    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxWidth: 1024,
        maxHeight: 1024,
        quality: 0.8,
        cameraType: 'back',
      },
      handleImageResponse,
    );
  };

  const handleImageResponse = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('User cancelled camera');
    } else if (response.errorCode) {
      Alert.alert('Error', response.errorMessage || 'Failed to capture image');
    } else if (response.assets && response.assets[0]?.base64) {
      onImageSelected(response.assets[0].base64);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Instruction */}
        <Text style={styles.instruction}>
          Take a photo of a menu to get started
        </Text>

        {/* Camera preview area */}
        <View style={styles.cameraPreview}>
          {hasPermission === false && (
            <View style={styles.permissionPrompt}>
              <CameraIcon size={64} color={colors.gray400} />
              <Text style={styles.permissionText}>
                Camera access is required
              </Text>
              <Text style={styles.permissionSubtext}>
                Tap the button below to grant permission
              </Text>
            </View>
          )}
          {hasPermission === true && (
            <View style={styles.cameraReady}>
              <CameraIcon size={64} color={colors.primary} />
              <Text style={styles.cameraReadyText}>
                Camera Ready
              </Text>
            </View>
          )}
          {hasPermission === null && (
            <View style={styles.cameraReady}>
              <CameraIcon size={64} color={colors.gray400} />
            </View>
          )}
        </View>

        {/* Capture button */}
        <TouchableOpacity
          style={styles.captureButton}
          onPress={handleTakePhoto}
          activeOpacity={0.8}>
          <View style={styles.captureButtonInner}>
            <CameraIcon size={32} color={colors.white} />
          </View>
        </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.xl,
  },
  instruction: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.semibold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  cameraPreview: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.gray300,
    borderStyle: 'dashed',
    borderRadius: borderRadius.xl,
    backgroundColor: colors.white,
    marginVertical: spacing.xxl,
  },
  permissionPrompt: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  permissionText: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    color: colors.textPrimary,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  permissionSubtext: {
    fontSize: typography.fontSizes.base,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  cameraReady: {
    alignItems: 'center',
  },
  cameraReadyText: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.medium,
    color: colors.primary,
    marginTop: spacing.md,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  captureButtonInner: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.white,
  },
});
