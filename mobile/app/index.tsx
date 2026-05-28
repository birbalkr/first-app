import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 2,
        justifyContent: "center", 
        // alignItems: "center",
      }}
    >
      <Link href="/(auth)">Login</Link>
      <Link href="/(auth)/signup">Signup</Link>
    </View>
  );
}
