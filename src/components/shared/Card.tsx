import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native'
import { Card } from 'react-native-paper';
import { useTheme } from '@react-navigation/native'
import React from 'react'
import Icons from "@expo/vector-icons/MaterialIcons";
interface MangaCardProps {

    title?: string;
    image?: string;
    color?: string;
    mediaId?: number;
    chapter?: string;
    avageScore?: number;

}
type Props = {
    data: MangaCardProps;
}

const CardManga: React.FC<Props> = (
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
                <View style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: 'rgba(249, 105, 180, 0.8)', borderTopLeftRadius: 20, borderTopRightRadius: 1, paddingLeft: 4, paddingBottom: 2, paddingTop: 0.5 }}>
                    <Text style={{ color: '#fff', fontSize: 12, fontFamily: fonts.fontBold, justifyContent: 'center' }}>  {data.avageScore / 10} ⭐ </Text>
                </View>
            </ImageBackground>
            {/* title */}
            <View style={{ width: 100, height: 30, alignItems: 'center', marginTop: 2, }}>
                <Text numberOfLines={2} ellipsizeMode="tail"
                    style={{ color: colors.text, fontSize: 14, fontFamily: fonts.fontRegular, justifyContent: 'center', }}>
                    {data.title}
                </Text>
            </View>
            <View style={{ width: 100, height: 30, alignItems: 'center', marginTop: 2, }}>
                {/* chapter */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#b0c1ff', fontSize: 20, fontFamily: fonts.fontBold, justifyContent: 'center' }}>  ~ </Text>
                        <Text style={{ color: 'grey', fontSize: 16, fontFamily: fonts.fontBold, justifyContent: 'center' }}> | </Text>
                        <Text style={{ color: 'grey', fontSize: 16, fontFamily: fonts.fontLight, justifyContent: 'center' }}>  {data.chapter === null ? '~' : data.chapter} </Text>
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

export default CardManga