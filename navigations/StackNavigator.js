import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import SplashScreen from "../screens/splash/SplashScreen";
import LoginScreen from "../screens/login/LoginScreen";
import SavedFestivalListScreen from "../screens/home/sub/SavedFestivalListScreen";
import FestivalListScreen from "../screens/home/sub/FestivalListScreen";
import CommunityScreen from "../screens/home/community/CommunityScreen";
import FireworksCommunityScreen from "../screens/community/FireworksCommunityScreen";
import FireworksPostDetailScreen from "../screens/community/FireworksPostDetailScreen";
import FreeDiscussionCommunityScreen from "../screens/community/FreeDiscussionCommunityScreen";
import CongestionCommunityScreen from "../screens/community/CongestionCommunityScreen";
import WritePostScreen from "../screens/community/WritePostScreen";
import DetailInfoScreen from "../screens/map/DetailInfoScreen";
import EscapeScreen from "../screens/route/EscapeRoute";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const [savedFestivals, setSavedFestivals] = useState([]); // 저장된 축제 상태 관리
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Main" options={{ headerShown: false }}>
          {(props) => (
            <TabNavigator
              {...props}
              savedFestivals={savedFestivals}
              setSavedFestivals={setSavedFestivals}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="FestivalList" options={{ headerShown: false }}>
          {(props) => (
            <FestivalListScreen
              {...props}
              savedFestivals={savedFestivals}
              setSavedFestivals={setSavedFestivals}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="SavedFestivals" options={{ headerShown: false }}>
          {(props) => (
            <SavedFestivalListScreen
              {...props}
              savedFestivals={savedFestivals}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Community"
          component={CommunityScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FireworksCommunity"
          component={FireworksCommunityScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FireworksPostDetail"
          component={FireworksPostDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CongestionCommunity"
          component={CongestionCommunityScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FreeDiscussionCommunity"
          component={FreeDiscussionCommunityScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WritePost"
          component={WritePostScreen}
          options={{ title: "글쓰기" }}
        />
        <Stack.Screen
          name="DetailInfo"
          component={DetailInfoScreen}
          options={{ title: "세부 정보", headerShown: false }}
        />
        <Stack.Screen
          name="Escape"
          component={EscapeScreen}
          options={{ title: "세부 정보", headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
