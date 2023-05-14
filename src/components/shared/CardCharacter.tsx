import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native'
import { Card } from 'react-native-paper';
import { useTheme } from '@react-navigation/native'
import React from 'react'
import Icons from "@expo/vector-icons/MaterialIcons";
interface MangaCardProps {

    name?: string;
    image?: string;
    color?: string;
    role?: string;
}
type Props = {
    data: MangaCardProps;
}

const CardCharacter: React.FC<Props> = (
    {
        data
    }
) => {
    // @ts-ignore
    const { colors, fonts } = useTheme();
    return (
        <View style={styles.container}>
            <ImageBackground
                source={{ uri: data.image }}
                style={{ width: 120, height: 150, borderRadius: 14, overflow: 'hidden' }}
            >

            </ImageBackground>
            {/* title */}
            <View style={{ width: 100, height: 40, alignItems: 'center', marginTop: 2, }}>
                <Text numberOfLines={2} ellipsizeMode="tail"
                    style={{ color: colors.text, fontSize: 16, fontFamily: fonts.fontRegular, justifyContent: 'center', }}>
                    {data.name}
                </Text>
            </View>
            <View style={{ width: 100, height: 30, alignItems: 'center', marginTop: 0, }}>
                {/* chapter */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        <Text style={{ color: '#b0c1ff', fontSize: 14, justifyContent: 'center', fontStyle: 'italic' }}>  {data.role} </Text>

                    </View>
                </View>
            </View>

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        height: 220,
    }

})

export default CardCharacter