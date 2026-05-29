import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuthStore } from '../../store/authStore';

export default function Home() {
  const { logout } = useAuthStore();
  return (
    <View>
      <Text>Home</Text>
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity onPress={logout} style={{ backgroundColor: 'red', padding: 10, borderRadius: 5 }}>
          <Text style={{ color: 'white' }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}