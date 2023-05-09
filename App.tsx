import React, { useMemo } from 'react';
import { HomeScreen } from './src/screens';
import { StyleSheet, View, useColorScheme, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  Theme,
} from "@react-navigation/native";
import * as SplashScreen from 'expo-splash-screen';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { HeaderBackgroundProvider, useHeaderBackground } from './src/contexts/HeaderBackgroundContext'
export default function App() {

  const queryClient = new QueryClient();

  const [loaded] = useFonts({
    "Dongle-Regular": require("./assets/fonts/Dongle-Regular.ttf"),
    "Dongle-Bold": require("./assets/fonts/Dongle-Bold.ttf"),
    "Dongle-Light": require("./assets/fonts/Dongle-Light.ttf"),
    "Oswald-Regular": require("./assets/fonts/Oswald-Regular.ttf"),
    "Oswald-Light": require("./assets/fonts/Oswald-Light.ttf"),
    "Oswald-ExtraLight": require("./assets/fonts/Oswald-ExtraLight.ttf"),
    "Oswald-Bold": require("./assets/fonts/Oswald-Bold.ttf"),
  });
  const fonts = {
    fontNormal: 'Oswald-Regular',
    fontBold: 'Oswald-Bold',
    fontLight: 'Oswald-Light',
    fontExtraLight: 'Oswald-ExtraLight',
  }


  const colorScheme = useColorScheme();
  // domantion of the theme
  const theme: Theme = useMemo(
    () =>
      colorScheme === "dark"
        ?
        {
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: "#f5f5f5",
            text: "#191919",
            border: "#D9D9D9",
            primary: "#191919",
          },
          fonts: {
            ...fonts
          }
        }
        :
        {
          ...DarkTheme,
          colors: {
            ...DarkTheme.colors,
            primary: "#ff6ebe",
            text: "#fff",
          },
          fonts: {
            ...fonts
          }
        },
    [colorScheme]
  );

  React.useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  if (!loaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }


  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={theme}>
        <StatusBar style="light" />
        <View style={styles.container}>
          <HeaderBackgroundProvider>
            <HomeScreen />
          </HeaderBackgroundProvider>
        </View>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  }
})
