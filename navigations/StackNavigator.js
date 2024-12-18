import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import SplashScreen from "../screens/splash/SplashScreen";
import LoginScreen from "../screens/login/LoginScreen";

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
