import {
  ImageSourcePropType,
  View,
  StyleSheet,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

import { useRef, useState } from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';
import IconButton from '@/components/IconButton';
import CircleButton from '@/components/CircleButton';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiList from '@/components/EmojiList';
import EmojiSticker from '@/components/EmojiSticker';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<
    string | undefined
  >(undefined);

  const [showAppOptions, setShowAppOptions] = useState<boolean>(
    false
  );

  const [isModalVisible, setIsModalVisible] = useState<boolean>(
    false
  );

  const [pickedEmoji, setPickedEmoji] = useState<
    ImageSourcePropType | undefined
  >(undefined);

  const [permissionResponse, requestPermission] =
    ImagePicker.useMediaLibraryPermissions();

  const imageRef = useRef<View>(null);

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
    setSelectedImage(undefined);
    setPickedEmoji(undefined);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    try {
      if (!permissionResponse?.granted) {
        const permission = await requestPermission();

        if (!permission.granted) {
          alert('Permission to access media library is required.');
          return;
        }
      }

      alert('Screenshot feature is temporarily disabled.');
    } catch (error) {
      console.log(error);
      alert('Failed to save screenshot.');
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View
        ref={imageRef}
        collapsable={false}
        style={styles.imageContainer}
      >
        <ImageViewer
          imgSource={PlaceholderImage}
          selectedImage={selectedImage}
        />

        {pickedEmoji && (
          <EmojiSticker
            imageSize={40}
            stickerSource={pickedEmoji}
          />
        )}
      </View>

      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton
              icon="refresh"
              label="Reset"
              onPress={onReset}
            />

            <CircleButton onPress={onAddSticker} />

            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            theme="primary"
            label="Choose a photo"
            onPress={pickImageAsync}
          />

          <Button
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}

      <EmojiPicker
        isVisible={isModalVisible}
        onClose={onModalClose}
      >
        <EmojiList
          onSelect={setPickedEmoji}
          onCloseModal={onModalClose}
        />
      </EmojiPicker>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },

  imageContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingBottom: 20,
  },

  footerContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
    paddingBottom: 40,
  },

  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },

  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
