import { Text, View } from "react-native";
import {Link} from "expo-router"

export default function HomeScreen() {
  return (
       <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl justify-center text-dark-200 items-center font-bold ">
        Welcome to Nativewind!
      </Text>
      
    </View>
  );
}

