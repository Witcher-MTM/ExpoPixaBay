import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';
import PixaBay from './PixaBay';

export default function App() {
  const [images, setImages] = React.useState([]);

  React.useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await PixaBay.get_images();
        setImages(response.hits);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, []);

  const saveImage = async (uri) => {
    try {
      const permissionResult = await FileSystem.requestPermissionsAsync();
      if (permissionResult.granted === false) {
        alert('Нет доступа к файловой системе');
        return;
      }

      const fileName = uri.split('/').pop();
      const fileUri = FileSystem.documentDirectory + fileName;

      const downloadResult = await FileSystem.downloadAsync(uri, fileUri);
      if (downloadResult.status !== 200) {
        alert('Не удалось сохранить изображение');
        return;
      }

      alert('Изображение сохранено');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {images.map((image) => (
        <View key={image.id}>
          <Image
            source={{ uri: image.webformatURL }}
            style={{ width: 200, height: 200 }}
          />
          <TouchableOpacity onPress={() => saveImage(image.webformatURL)}>
            <Text>Сохранить</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
