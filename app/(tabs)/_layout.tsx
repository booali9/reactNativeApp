import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { icons } from "@/constants/icons";
import { LinearGradient } from "expo-linear-gradient";

function TabIcon({ focused, icon, title }: { focused: boolean; icon: any; title: string }) {
  return (
    <View className={`items-center justify-center gap-1 ${focused ? 'mt-1' : 'mt-2'}`}>
      <Image 
        source={icon} 
        tintColor={focused ? "#FFFFFF" : "#A8B5DB"} 
        className={`${focused ? "w-6 h-6" : "w-5 h-5"}`} 
      />
      {focused && (
        <Text className="text-white text-xs font-medium">
          {title}
        </Text>
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
          backgroundColor: "#1A1A2E",
          borderRadius: 20,
          marginHorizontal: 20,
          marginBottom: 20,
          height: 70,
          position: "absolute",
          borderTopWidth: 0,
          shadowColor: "#6C63FF",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 10,
          elevation: 10,
          borderWidth: 1,
          borderColor: "rgba(108, 99, 255, 0.2)",
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