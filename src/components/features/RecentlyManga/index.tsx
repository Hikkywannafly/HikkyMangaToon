import { View, Text, StyleSheet, ImageBackground, Image, FlatList, ScrollView, Animated, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { useTheme, useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
    data: any[];
    autoPlay?: boolean;
    pagination?: boolean;
}


const RecentlyManga: React.FC<Props> = ({
    data
}) => {
    const nativation = useNavigation();
    // @ts-ignore
    const { colors, fonts } = useTheme();
    const SPACING = 20;
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const SIZE = 150 + SPACING * 2 + 10;



    return (
        <View style={styles.containter}>
            <View style={styles.title}>
                <Text style={[{ color: colors.text, fontFamily: fonts.fontRegular, fontWeight: '600', fontSize: 18 }]}>Popular All The Time </Text>

            </View>
            <Animated.FlatList
                data={data}
                nestedScrollEnabled={true}
                onScroll={
                    Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: true }
                    )
                }
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ margin: SPACING }}


                renderItem={({ item, index }) => {
                    const inputRange = [
                        -1,
                        0,
                        SIZE * index,
                        SIZE * (index + 2),
                    ];

                    const opacityInputRange = [
                        -1,
                        0,
                        SIZE * index,
                        SIZE * (index + 2),
                    ];


                    const scale = scrollY.interpolate({
                        inputRange,
                        outputRange: [1, 1, 1, 0],
                    })

                    const opacity = scrollY.interpolate({
                        inputRange: opacityInputRange,
                        outputRange: [1, 1, 1, 0],
                    })

                    return (
                        <Pressable onPress={() =>
                            // @ts-ignore
                            nativation.navigate("MangaDetail", { item })}>


                            <Animated.View

                                key={index}
                                style={{
                                    marginBottom: SPACING,
                                    transform: [{ scale }],
                                    opacity: opacity,
                                }}
                            >
                                <Image
                                    source={{ uri: item?.bannerImage ?? item?.coverImage?.large }}
                                    style={{
                                        width: '100%', height: 180,
                                        padding: SPACING,
                                        borderRadius: SPACING,
                                        position: 'relative',
                                    }}
                                    blurRadius={2}

                                />
                                <LinearGradient
                                    colors={[
                                        '#0000',
                                        'rgba(0,0,0,.663)',
                                        'rgba(0,0,0,.302)',
                                        'rgba(0,0,0,.521)',
                                        'rgba(0,0,0,.527)',
                                        'rgba(0,0,0,.523)',
                                        'rgba(0,0,0,.616)',
                                        'rgba(0,0,0,.611)',
                                        'rgba(0,0,0,.713)',
                                        'rgba(0,0,0,.928)',
                                        '#0000000f',
                                        'rgba(0,0,0,.916)',
                                        '#000000e6',
                                    ]}
                                    start={{ x: 0, y: 1.5 }}
                                    end={{ x: 1.5, y: 0 }}
                                    style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                                >
                                </LinearGradient>

                                <View style={styles.magaContainer}>
                                    <View style={{
                                        marginTop: 5,
                                    }}>
                                        <Image style={styles.mangaCover} source={{ uri: item.coverImage.large }} />
                                        <View style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: 'rgba(249, 105, 180, 0.8)', borderTopLeftRadius: 20, borderTopRightRadius: 1, borderBottomRightRadius: 7, paddingLeft: 4, paddingBottom: 2, paddingTop: 0.5 }}>
                                            <Text style={{ color: '#fff', fontSize: 12, fontFamily: fonts.fontBold, justifyContent: 'center' }}>  {item.averageScore / 10} ⭐ </Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '60%' }}>
                                        <Text
                                            style={{
                                                fontSize: 18, fontFamily: fonts.fontBold, justifyContent: 'center', color: item.coverImage.color ?? '#ffffff'
                                            }}

                                            numberOfLines={2} ellipsizeMode="tail"
                                        >{item.title.userPreferred}</Text>

                                        <Text style={styles.genres} numberOfLines={1} ellipsizeMode="tail" >{
                                            item.genres.map((genre: any, index: any) => {
                                                return `${genre} ${index < item.genres.length - 1 ? '• ' : ''}`
                                            }
                                            )
                                        }</Text>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                <Text style={{ color: '#b0c1ff', fontSize: 18, fontFamily: fonts.fontNormal, }}>
                                                    {

                                                        Math.max(...item.counter.map((item: any) => item.quantity)) > 0 ? Math.max(...item.counter.map((item: any) => item.quantity)) : '~'
                                                    }
                                                </Text>
                                                {/* <Text style={{ color: '#d4d4d4', fontSize: 18, fontFamily: fonts.fontLight, }}>  |  </Text> */}
                                                <Text style={{ color: '#d4d4d4', fontSize: 18, fontFamily: fonts.fontLight, }}> Chapters </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </Animated.View>
                        </Pressable>
                    )
                }}
            />
        </View >

    )
}

const styles = StyleSheet.create({
    containter: {
        flex: 1,

    },
    title: {
        flex: 1,
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 16,
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
    },
    content: {
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,

    },
    mangaCover: {
        height: 150,
        width: 100,
        marginLeft: 8,
        borderRadius: 7,
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: .3,
        shadowRadius: 20,
    },
    magaContainer: {
        position: 'absolute',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    genres: {
        fontFamily: "Oswald-Regular",
        color: '#d4d4d4',
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'normal',

    },

})
export default RecentlyManga



