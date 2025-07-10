import { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  ActivityIndicator, 
  FlatList, 
  Image,
  TouchableOpacity,
  Dimensions 
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";

import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

import useFetch from "@/Services/usefetch";
import { fetchMovies } from "@/Services/api";
import { updateSearchCount } from "@/Services/appwrite";

import SearchBar from "@/components/Searchbar";
import MovieCard from "@/components/MovieCard";
import MovieDisplayCard from "@/components/MovieCard";

const { width } = Dimensions.get('window');

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const cardWidth = (width - 48) / 3; // 3 columns with padding

  const {
    data: movies = [],
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
        if (movies?.length! > 0 && movies?.[0]) {
          await updateSearchCount(searchQuery, movies[0]);
        }
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <LinearGradient
      colors={['#0F0F1A', '#1E1E3A', '#2D2D5A']}
      className="flex-1"
    >
      {/* Background Elements */}
     

      <FlatList
        className="px-5"
        data={movies as Movie[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieDisplayCard {...item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
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

            <View className="my-5">
              <SearchBar
                placeholder="Search for a movie"
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}

            {!loading &&
              !error &&
              searchQuery.trim() &&
              movies?.length! > 0 && (
                <Text className="text-xl text-white font-bold">
                  Search Results for{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim()
                  ? "No movies found"
                  : "Start typing to search for movies"}
              </Text>
            </View>
          ) : null
        }
      />
    
    </LinearGradient>
  );
};

export default Search;