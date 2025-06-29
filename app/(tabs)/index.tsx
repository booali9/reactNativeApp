import {ActivityIndicator,FlatList, Image, ScrollView, Text, View } from "react-native";
import {Link} from "expo-router"
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/Searchbar";
import { useRouter } from "expo-router";
import useFetch from "@/Services/usefetch";
import { fetchMovies } from "@/Services/api";

export default function HomeScreen() {

const router=useRouter()

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
       <View className="flex-1 bg-primary">

        <Image source={images.bg} className="absolute w-full z-0"  />
    <ScrollView className=" flex-1 p-5" showsVerticalScrollIndicator={false} contentContainerStyle={{
      minHeight:"100%",paddingBottom:10}} >

       
       <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"   />


       {moviesLoading?(
        <ActivityIndicator
           size="large"
           color="#0000ff"
           className="mt-10 self-center"
           
           />
       ): moviesError || trendingError ? (
          <Text>Error: {moviesError?.message || trendingError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => {
                router.push("/search");
              }}
              placeholder="Search for a movie"
            />

            <>
            <Text className="text-lg text-white font-bold mt-5 mb-3">
              Latest movies
            </Text>
            <FlatList 
            data={movies}
            
            />

            
            </>
             </View>
            
            )}

       <View className="flex-1 mt-5">

        <SearchBar  onPress={()=>router.push("/search")}  placeholder="Search for a Movie" />


       </View>
       
    </ScrollView>
      
    </View>
  );
}

