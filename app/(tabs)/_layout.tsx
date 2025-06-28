import { Tabs } from "expo-router";
import { ImageBackground, Image, Text, View } from "react-native";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

function TabIcon({ focused, icon, title }: { focused: boolean; icon: any; title: string }) {
  return (
    <View className={`items-center justify-center ${focused ? 'mt-2' : 'mt-4'}`}>
      {focused ? (
        <ImageBackground
          source={images.highlight}
          className="flex-row items-center justify-center px-4 py-2 rounded-full"
          imageStyle={{ borderRadius: 20 }}
        >
          <Image 
            source={icon} 
            tintColor="#151312" 
            className="w-5 h-5" 
          />
          <Text className="text-white text-sm font-semibold ml-2">
            {title}
          </Text>
        </ImageBackground>
      ) : (
        <View className="p-2">
          <Image 
            source={icon} 
            tintColor="#A8B5DB" 
            className="w-6 h-6" 
          />
        </View>
      )}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          height: "100%",
          justifyContent: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0F0D23",
          borderRadius: 25,
          marginHorizontal: 20,
          marginBottom: 20,
          height: 60,
          position: "absolute",
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 10,
          elevation: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} title="Home" />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} title="Search" />
          ),
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.save} title="Saved" />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.person} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
}