import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { HomeScreen, MangaDetail } from './src/screens'
const Stack = createNativeStackNavigator();

const StackNavigator = () => {

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Group>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen name="MangaDetail" component={MangaDetail} />

            </Stack.Group>

        </Stack.Navigator>
    );
};

export default StackNavigator;

const styles = StyleSheet.create({});