import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

export default function Index() {

  const {token,user, checkAuth} = useAuthStore();
  console.log(token, user, checkAuth);
  
  useEffect(()=>{
    checkAuth();
  },[])

  return (
    <View style={style.container}>
      <Link href="/(auth)">Login</Link>
      <Link href="/(auth)/signup">Signup</Link>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})