import { Stack, Redirect, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "@/store/authStore";

export default function RootLayout() {
  const segments = useSegments();

  const {
    checkAuth,
    user,
    token,
    isCheckingAuth,
  } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  // Wait until auth state is restored
  if (isCheckingAuth) {
    return null;
  }

  const inAuthGroup = segments[0] === "(auth)";
  const isSignedIn = !!user && !!token;

  // Redirect logic
  if (!isSignedIn && !inAuthGroup) {
    return <Redirect href="/(auth)" />;
  }

  if (isSignedIn && inAuthGroup) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SafeScreen>

      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}