import { View, Text, StyleSheet, Image } from 'react-native'
import { useTheme } from "@react-navigation/native";
import React from 'react'

type Props = {}

const AVATAR_URL = "https://images.spiderum.com/sp-images/6ddf04b0735811eaac4fa9605f4c6d25.png";

const AccountBar = (props: Props) => {
    const { colors } = useTheme();

    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                width: "80%",
                gap: 8,
            }}>
            <Image
                source={{
                    uri: AVATAR_URL,
                }}
                style={{ width: 45, aspectRatio: 1, borderRadius: 45 }}
                resizeMode="cover"
            />
            <View style={{ flex: 1 }}>
                <Text

                    style={{
                        color: colors.text, opacity: 0.75,
                        fontFamily: "Oswald-Light",

                    }}
                    numberOfLines={1}
                >
                    Hello a new day!
                </Text>
                <Text
                    style={{
                        fontFamily: "Oswald-Regular",
                        fontSize: 16,
                        marginBottom: 8,
                        color: colors.text,
                    }}
                    numberOfLines={1}
                >
                    HikkyWaanfly
                </Text>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({

});

export default AccountBar