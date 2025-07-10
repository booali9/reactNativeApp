import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Feather, Ionicons } from "@expo/vector-icons";

import { icons } from "@/constants/icons";
import useFetch from "@/Services/usefetch";
import { fetchMovieDetails } from "@/Services/api";

const { width } = Dimensions.get('window');

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
  icon?: React.ReactNode;
}

const MovieInfo = ({ label, value, icon }: MovieInfoProps) => (
  <View className="mb-6">
    <View className="flex-row items-center mb-2">
      {icon}
      <Text className="text-gray-300 font-medium text-sm ml-2">{label}</Text>
    </View>
    <Text className="text-white font-medium text-base">
      {value || "N/A"}
    </Text>
  </View>
);

const Details = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  if (loading) {
    return (
      <LinearGradient colors={['#0F0F1A', '#1E1E3A']} className="flex-1">
        <SafeAreaView className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#6366F1" />
          <Text className="text-white mt-4">Loading movie magic...</Text>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#0F0F1A', '#1E1E3A', '#2D2D5A']} className="flex-1">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Movie Poster with Gradient Overlay */}
        <View className="relative">
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[500px]"
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(15, 15, 26, 0.7)', '#0F0F1A']}
            className="absolute bottom-0 left-0 right-0 h-64"
          />
          
          {/* Back Button */}
          <TouchableOpacity 
            className="absolute top-14 left-5 bg-white/10 p-2 rounded-full"
            onPress={router.back}
          >
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          
          {/* Play Button */}
          <TouchableOpacity 
            className="absolute bottom-10 right-5 rounded-full p-4 bg-indigo-500 flex-row items-center"
            style={{ elevation: 10 }}
          >
            <Ionicons name="play" size={24} color="white" />
            <Text className="text-white font-bold ml-2">Trailer</Text>
          </TouchableOpacity>
        </View>

        {/* Movie Content */}
        <View className="px-6 mt-6">
          {/* Title and Basic Info */}
          <View className="mb-6">
            <Text className="text-white font-bold text-3xl mb-2">
              {movie?.title}
            </Text>
            
            <View className="flex-row items-center flex-wrap">
              <Text className="text-gray-300 text-base mr-3">
                {movie?.release_date?.split("-")[0]}
              </Text>
              <Text className="text-gray-300 text-base mr-3">•</Text>
              <Text className="text-gray-300 text-base mr-3">
                {movie?.runtime} min
              </Text>
              <Text className="text-gray-300 text-base mr-3">•</Text>
              <Text className="text-gray-300 text-base">
                {movie?.genres?.map(g => g.name).join(", ")}
              </Text>
            </View>
            
            {/* Rating */}
            <View className="flex-row items-center mt-3">
              <View className="flex-row items-center bg-indigo-500/20 px-3 py-1 rounded-full mr-3">
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text className="text-white font-bold text-sm ml-1">
                  {Math.round(movie?.vote_average ?? 0 * 10) / 10}
                </Text>
              </View>
              <Text className="text-gray-300 text-sm">
                {movie?.vote_count} votes
              </Text>
            </View>
          </View>

          {/* Overview */}
          <MovieInfo 
            label="Storyline" 
            value={movie?.overview}
            icon={<Ionicons name="document-text" size={18} color="#6366F1" />}
          />

          {/* Stats Row */}
          <View className="flex-row justify-between mb-6">
            <View className="w-[48%]">
              <MovieInfo 
                label="Budget" 
                value={`$${(movie?.budget ?? 0).toLocaleString()}`}
                icon={<Ionicons name="wallet" size={18} color="#6366F1" />}
              />
            </View>
            <View className="w-[48%]">
              <MovieInfo 
                label="Revenue" 
                value={`$${(movie?.revenue ?? 0).toLocaleString()}`}
                icon={<Ionicons name="cash" size={18} color="#6366F1" />}
              />
            </View>
          </View>

          {/* Production Companies */}
          <MovieInfo 
            label="Production" 
            value={movie?.production_companies?.map(c => c.name).join(", ")}
            icon={<Ionicons name="business" size={18} color="#6366F1" />}
          />

          {/* Status */}
          <MovieInfo 
            label="Status" 
            value={movie?.status}
            icon={<Ionicons name="information-circle" size={18} color="#6366F1" />}
          />
        </View>
      </ScrollView>

      {/* Floating Back Button */}
      <BlurView intensity={30} className="absolute bottom-5 left-0 right-0 mx-6 overflow-hidden rounded-xl">
        <TouchableOpacity
          className="py-4 flex-row items-center justify-center"
          onPress={router.back}
        >
          <Feather name="arrow-left" size={20} color="white" />
          <Text className="text-white font-semibold text-base ml-2">Back to Movies</Text>
        </TouchableOpacity>
      </BlurView>
    </LinearGradient>
  );
};

export default Details;