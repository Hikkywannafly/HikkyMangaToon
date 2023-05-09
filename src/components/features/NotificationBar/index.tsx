import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react';
import { useTheme } from "@react-navigation/native";
import Icons from "@expo/vector-icons/MaterialIcons";
type Props = {}

const NotificationBar = (props: Props) => {

    const { colors } = useTheme();
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            <Icons
                style={{
                    width: 30,
                    aspectRatio: 1,
                    alignItems: "center",
                    justifyContent: "center",

                }}
                name="search" size={24} color={colors.text} />


        </View>
    )
}

export default NotificationBar