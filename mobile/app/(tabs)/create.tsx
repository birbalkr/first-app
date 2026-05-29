import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native'
import { useState } from 'react'
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '@/constants/color';
import styles from '../../assets/styles/create.styles';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useAuthStore } from '@/store/authStore';


export default function Create() {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [rating, setRating] = useState(3);
  const [image, setImage] = useState(""); // to display the selected image
  const [imageBase64, setImageBase64] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const {token}=useAuthStore();

  const pickImage = async () => {
    try {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        console.log(status);

        if (status !== "granted") {
          Alert.alert('Sorry, we need camera roll permissions to make this work!');
          return;
        }
      }

      // launch the image library to pick an image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images", "livePhotos"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5, //lower quality to reduce file size
        base64: true,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);

        // store the base64 string for later upload
        if (result.assets[0].base64) {
          setImageBase64(result.assets[0].base64);
        }
        else {
          const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri,
            { encoding: FileSystem.EncodingType.Base64, });
          setImageBase64(base64);
        }
      }

    } catch (error) {
      console.log("Error picking image: ", error);
      Alert.alert("Error picking image. Please try again.");
    }
  }

  const handleSubmit = async () => {}

  const renderRatingStars = async () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)} style={styles.starButton}>
          <Ionicons
            name={i <= rating ? "star" : "star-outline"}
            size={32}
            color={i <= rating ? "#f4b400" : COLORS.textSecondary} />
        </TouchableOpacity>
      );
    }
    return <View style={styles.ratingContainer}>{stars}</View>
  }



  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.container} style={styles.scrollViewStyle} >
        <View style={styles.card}>
          {/* Header  */}
          <View style={styles.header}>
            <Text style={styles.title}>Add Book Recommendation</Text>
            <Text style={styles.subtitle}>Share your favorite reads with others</Text>
          </View>


          <View style={styles.form}>
            {/* Form Book  */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Book Title</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="book-outline" size={20} color={COLORS.textSecondary}
                  style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter book title"
                  placeholderTextColor={COLORS.placeholderText}
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
            </View>

            {/* Rating  */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Your Rating</Text>
              {renderRatingStars()}
            </View>

            {/* image */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Book Image</Text>
              <TouchableOpacity
                style={styles.imagePicker}
                onPress={pickImage}>
                {!image ? (
                  <View style={styles.placeholderContainer}>
                    <Ionicons name="image-outline" size={40} color={COLORS.textSecondary} />
                    <Text style={styles.placeholderText}>Tap to select image</Text>
                  </View>
                ) : (
                  <Image source={{ uri: image }} style={styles.imagePicker} />
                )}

              </TouchableOpacity>
            </View>

              {/* caption  */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Caption</Text>
                <TextInput 
                style={styles.textArea}
                placeholder="Write a short review or comment about the book"
                placeholderTextColor={COLORS.placeholderText}
                value={caption}
                onChangeText={setCaption}
                multiline
                />
              </View>

              <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={loading}>
                {
                  loading ? (
                    <ActivityIndicator color={COLORS.white} />
                  ):(
                    <>
                    <Ionicons name="cloud-upload-outline"
                    size={20}
                    color={COLORS.white}
                    style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>Share</Text>
                    </>
                  )
                }
              </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}