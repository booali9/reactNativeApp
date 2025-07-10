import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

const Profile = () => {
  // Mock user data - replace with your actual user data
  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    joinedDate: "Joined October 2023",
    stats: {
      moviesWatched: 42,
      watchlist: 18,
      reviews: 7
    }
  };

  return (
    <LinearGradient
      colors={['#0F0F1A', '#1E1E3A', '#2D2D5A']}
      className="flex-1"
    >
      {/* Background Elements */}
      <Image
        source={images.bg}
        className="absolute w-full h-full opacity-20"
        resizeMode="cover"
        blurRadius={10}
      />
      
      <SafeAreaView className="flex-1">
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Profile Header */}
          <View className="items-center mt-8 mb-6 px-6">
            <View className="bg-white/10 p-4 rounded-full mb-4">
              <Image 
                source={icons.person} 
                className="w-20 h-20" 
                tintColor="#6366F1"
              />
            </View>
            <Text className="text-white text-2xl font-bold">{user.name}</Text>
            <Text className="text-gray-400 mt-1">{user.email}</Text>
            <Text className="text-gray-500 mt-1">{user.joinedDate}</Text>
          </View>

          {/* Stats Cards */}
          <View className="flex-row justify-between px-6 mb-8">
            <View className="bg-white/5 p-4 rounded-xl items-center flex-1 mx-1">
              <Text className="text-white text-xl font-bold">{user.stats.moviesWatched}</Text>
              <Text className="text-gray-400 text-sm">Watched</Text>
            </View>
            <View className="bg-white/5 p-4 rounded-xl items-center flex-1 mx-1">
              <Text className="text-white text-xl font-bold">{user.stats.watchlist}</Text>
              <Text className="text-gray-400 text-sm">Watchlist</Text>
            </View>
            <View className="bg-white/5 p-4 rounded-xl items-center flex-1 mx-1">
              <Text className="text-white text-xl font-bold">{user.stats.reviews}</Text>
              <Text className="text-gray-400 text-sm">Reviews</Text>
            </View>
          </View>

          {/* Settings Section */}
          <View className="bg-white/5 mx-6 rounded-xl p-4 mb-6">
            <Text className="text-white text-lg font-bold mb-4">Settings</Text>
            
            <TouchableOpacity className="flex-row items-center py-3">
              <Ionicons name="notifications" size={20} color="#6366F1" />
              <Text className="text-white ml-3 flex-1">Notifications</Text>
              <Feather name="chevron-right" size={20} color="#6B7280" />
            </TouchableOpacity>
            
            <View className="h-px bg-white/10 my-1" />
            
            <TouchableOpacity className="flex-row items-center py-3">
              <Ionicons name="lock-closed" size={20} color="#6366F1" />
              <Text className="text-white ml-3 flex-1">Privacy</Text>
              <Feather name="chevron-right" size={20} color="#6B7280" />
            </TouchableOpacity>
            
            <View className="h-px bg-white/10 my-1" />
            
            <TouchableOpacity className="flex-row items-center py-3">
              <Ionicons name="help-circle" size={20} color="#6366F1" />
              <Text className="text-white ml-3 flex-1">Help & Support</Text>
              <Feather name="chevron-right" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Account Actions */}
          <View className="mx-6">
            <TouchableOpacity className="bg-indigo-500/20 border border-indigo-500 rounded-xl p-4 items-center mb-3">
              <Text className="text-indigo-300 font-bold">Upgrade to Premium</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="bg-white/5 rounded-xl p-4 items-center">
              <Text className="text-red-400 font-bold">Sign Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Profile;