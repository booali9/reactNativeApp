import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Image, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useState } from "react";

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard"; // Assuming you have this component

const Save = () => {
  const [savedMovies, setSavedMovies] = useState([]); // Replace with your actual saved movies data

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
        {/* Header */}
        <View className="flex-row justify-between items-center mt-4 mb-4 px-6">
          <Text className="text-white text-2xl font-bold">Saved Movies</Text>
          <TouchableOpacity className="bg-white/10 p-2 rounded-full">
            <Feather name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {savedMovies.length > 0 ? (
          <FlatList
            data={savedMovies}
            renderItem={({ item }) => (
              <View className="px-6 mb-4">
               
                <TouchableOpacity 
                  className="absolute top-2 right-2 bg-white/20 p-2 rounded-full"
                  onPress={() => {/* Handle unsave */}}
                >
                  <Ionicons name="bookmark" size={20} color="#6366F1" />
                </TouchableOpacity>
              </View>
            )}
           
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Empty State */}
            <View className="flex-1 justify-center items-center py-20 px-6">
              <View className="bg-white/10 p-6 rounded-full mb-6">
                <Image 
                  source={icons.save} 
                  className="w-16 h-16" 
                  tintColor="#6366F1"
                />
              </View>
              
              <Text className="text-white text-xl font-bold mb-2 text-center">
                Your Watchlist is Empty
              </Text>
              <Text className="text-gray-400 text-center text-base mb-8 max-w-[300px]">
                Save movies you want to watch later by tapping the bookmark icon
              </Text>
              
              <TouchableOpacity 
                className="bg-indigo-500 px-6 py-3 rounded-full"
                onPress={() => {/* Navigate to home or search */}}
              >
                <Text className="text-white font-bold">Browse Movies</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Save;