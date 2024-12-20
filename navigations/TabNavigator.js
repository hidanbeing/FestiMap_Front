import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/home/HomeScreen";
import MapScreen from "../screens/map/MapScreen";
import MyPageScreen from "../screens/mypage/MyPageScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator({ savedFestivals, setSavedFestivals }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home-outline"; // 집 모양 아이콘
          } else if (route.name === "Map") {
            iconName = "location-outline"; // 지도 핀 모양 아이콘
          } else if (route.name === "MyPage") {
            iconName = "person-outline"; // 사람 모양 아이콘
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" options={{ headerShown: false }}>
        {(props) => (
          <HomeScreen
            {...props}
            savedFestivals={savedFestivals}
            setSavedFestivals={setSavedFestivals}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
