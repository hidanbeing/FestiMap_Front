import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/home/HomeScreen";
import MapScreen from "../screens/map/MapScreen";
import MyPageScreen from "../screens/mypage/MyPageScreen";
import RouteScreen from "../screens/route/RouteScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator({ savedFestivals, setSavedFestivals }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "Map") {
            iconName = "map-outline";
          } else if (route.name === "MyPage") {
            iconName = "person-outline";
          } else if (route.name === "Route") {
            iconName = "navigate-outline";
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
        name="Route"
        component={RouteScreen}
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
