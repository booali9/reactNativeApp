import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import useFetch from "@/Services/usefetch";
import { fetchMovies } from "@/Services/api";
import { getTrendingMovies } from "@/Services/appwrite";

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

import SearchBar from "@/components/Searchbar";
import MovieCard from "@/components/MovieCard";
import TrendingCard from "@/components/TrendingCard";

const { width } = Dimensions.get('window');

const Index = () => {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  // Calculate width for 3-column grid with proper spacing
  const cardWidth = (width - 40) / 3 - 10; // 40 = total horizontal padding (20 each side), 10 = gap

  return (
    <LinearGradient
      colors={['#0F0F1A', '#1E1E3A', '#2D2D5A']}
      className="flex-1"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Header */}
        <View className="pt-16 pb-6 px-5 flex-row justify-between items-center">
          <Image source={icons.logo} className="w-12 h-10" />
          <TouchableOpacity 
            className="bg-white/10 p-2 rounded-full"
          
          >
            <Image 
              
              className="w-5 h-5"
              style={{ tintColor: 'white' }}
            />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="px-5 mb-8">
          <SearchBar
            onPress={() => router.push("/search")}
            placeholder="Search for a movie"
          />
        </View>

        {/* Loading State */}
        {(moviesLoading || trendingLoading) && (
          <View className="flex-1 justify-center items-center py-20">
            <ActivityIndicator size="large" color="#6366F1" />
            <Text className="text-white mt-4">Loading movies...</Text>
          </View>
        )}

        {/* Error State */}
        {(moviesError || trendingError) && (
          <View className="flex-1 justify-center items-center py-20 px-10">
            <Text className="text-white text-center text-lg mb-4">
              Error loading content
            </Text>
            <Text className="text-gray-400 text-center mb-6">
              {moviesError?.message || trendingError?.message}
            </Text>
          </View>
        )}

        {/* Content */}
        {!(moviesLoading || trendingLoading || moviesError || trendingError) && (
          <View className="px-5">
            {/* Trending Section */}
            {trendingMovies && (
              <View className="mb-12">
                <Text className="text-white text-xl font-bold mb-4">
                  Trending Movies ({trendingMovies.length})
                </Text>
                 <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mb-4 mt-3"
                  data={trendingMovies}
                  contentContainerStyle={{
                    gap: 26,
                  }}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                />
              </View>
            )}

            {/* Latest Movies Section */}
            <View className="mb-12">
              <Text className="text-white text-xl font-bold mb-4">
                Latest Movies 
              </Text>
             
              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

export default Index;