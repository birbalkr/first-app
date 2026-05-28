import { ActivityIndicator, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import styles from '../../assets/styles/signup.styles'
import COLORS from '../../constants/color'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isloading, setIsloading] = useState(false)

  const router = useRouter();

  const handleSignup = () => { }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          {/* Header  */}
          <View style={styles.header}>
            <Text style={styles.title}>BookWorm</Text>
            <Text style={styles.subtitle}>Share your favorite reads</Text>
          </View>
          <View style={styles.formContainer}>
            {/* username */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
                <TextInput style={styles.input}
                  placeholder="Enter your username"
                  placeholderTextColor={COLORS.textPrimary}
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
                <TextInput style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor={COLORS.textPrimary}
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"

                />
              </View>
            </View>

            {/* password */}
            <View syle={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder=""
                  placeholderTextColor={COLORS.placeholderText}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Signup button  */}
            <TouchableOpacity style={styles.button} onPress={handleSignup} disable={isloading}>
              {
                isloading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Login</Text>
                )
              }
            </TouchableOpacity>

            {/* footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?`</Text>
                <TouchableOpacity onPress={() => router.back()}>
                  <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>

          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}