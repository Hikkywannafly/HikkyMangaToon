import { StyleSheet, View, Image, useWindowDimensions, Text, ImageBackground, Pressable } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useTheme, useNavigation, } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { AccountBar, NotificationBar } from '../../index'

import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    useAnimatedRef,
} from 'react-native-reanimated';

type Props = {
    data: any[];
    autoPlay?: boolean;
    pagination?: boolean;

}
const ImageCarousalSquare: React.FC<Props> = ({
    data,
    autoPlay = true,
}) => {
    // @ts-ignore
    const { colors, fonts } = useTheme();
    const nativation = useNavigation();
    const [newData] = useState([
        { key: 'spacer-left' },
        ...data,
        { key: 'spacer-right' },
    ]);
    const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
    const interval = useRef() as any;
    const [isAutoPlay, setIsAutoPlay] = useState(autoPlay);
    const { width } = useWindowDimensions();
    const SIZE = width * 1;
    const SPACER = (width - SIZE) / 2;
    const x = useSharedValue(0);
    const offSet = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler({
        onScroll: event => {
            x.value = event.contentOffset.x;
        },
    });
    useEffect(() => {
        if (isAutoPlay === true) {
            let _offSet = offSet.value;
            interval.current = setInterval(() => {
                if (_offSet >= Math.floor(SIZE * (10 - 1) - 10)) {
                    _offSet = 0;
                } else {
                    _offSet = Math.floor(_offSet + SIZE);
                }
                scrollViewRef.current.scrollTo({ x: _offSet, y: 0 });

            }, 4000);


        } else {
            clearInterval(interval.current);
        }
    }, [SIZE, SPACER, isAutoPlay, offSet.value, scrollViewRef]);

    return (
        <View>
            <View style={styles.header}>
                <AccountBar />
                <NotificationBar />
            </View>

            <Animated.ScrollView
                ref={scrollViewRef}
                onScroll={onScroll}
                onScrollBeginDrag={() => {
                    setIsAutoPlay(false);
                }}
                onMomentumScrollEnd={e => {
                    offSet.value = e.nativeEvent.contentOffset.x;
                    setIsAutoPlay(autoPlay);
                }}
                scrollEventThrottle={16}
                decelerationRate="normal"
                snapToInterval={SIZE}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
            >


                {newData.map((item, index) => {
                    const style = useAnimatedStyle(() => {
                        const scale = interpolate(
                            x.value,
                            [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
                            [1, 1, 1],
                        );
                        return {
                            transform: [{ scale }],
                        };
                    });

                    if (!item.bannerImage && item.key === 'spacer-left' || !item.bannerImage && item.key === 'spacer-right') {
                        return <View style={{ width: SPACER }} key={index} />;
                    }
                    return (
                        <View style={{ width: SIZE, }} key={index}>
                            <Animated.View style={[styles.imageContainer, style, { height: 320 }]}
                            >
                                <ImageBackground source={{
                                    uri: item?.bannerImage ?? item?.coverImage?.large
                                }}
                                    // blurRadius={7}
                                    resizeMode="cover"
                                    imageStyle={{ width: '100%', height: 320, opacity: 0.4, }}
                                    style={[styles.image,]}>
                                    <LinearGradient
                                        colors={[
                                            '#000000e6',
                                            'rgba(0,0,0,.993)',
                                            'rgba(0,0,0,.852)',
                                            'rgba(0,0,0,.711)',
                                            'rgba(0,0,0,.627)',
                                            'rgba(0,0,0,.423)',
                                            'rgba(0,0,0,.316)',
                                            'rgba(0,0,0,.211)',
                                            'rgba(0,0,0,.113)',
                                            'rgba(0,0,0,.028)',
                                            '#0000000f',
                                            'rgba(0,0,0,.016)',
                                            '#0000',
                                        ]}
                                        start={{ x: 1.5, y: 1 }}
                                        end={{ x: 1.5, y: 0 }}
                                        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, height: 400 }}
                                    >
                                    </LinearGradient>

                                    <View style={styles.magaContainer}>
                                        <View style={styles.infoManga}>
                                            <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.mangaTitle, { color: item.coverImage.color ?? '#ffffff' }]}>{item.title.userPreferred}</Text>
                                            <Text style={styles.genres} numberOfLines={1} ellipsizeMode="tail" >{
                                                item.genres.map((genre: any, index: any) => {
                                                    return `${genre} ${index < item.genres.length - 1 ? '• ' : ''}`
                                                }
                                                )
                                            }</Text>
                                            <Text numberOfLines={3} ellipsizeMode="tail" style={styles.mangaDescription}>{item.description}</Text>
                                            {/* rating */}
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                gap: 10,
                                            }}>


                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                <Text style={{ color: '#b0c1ff', fontSize: 18, fontFamily: fonts.fontRegular, marginTop: 5, alignItems: 'center' }}>
                                                    {

                                                        Math.max(...item.counter.map((item: any) => item.quantity)) > 0 ? Math.max(...item.counter.map((item: any) => item.quantity)) : '??'

                                                    }

                                                </Text>
                                                <Text style={{ color: '#d4d4d4', fontSize: 18, fontFamily: fonts.fontLight, alignItems: 'center' }}>  |  </Text>
                                                <Text style={{ color: '#d4d4d4', fontSize: 16, fontFamily: fonts.fontLight, alignItems: 'center' }}>Chapters </Text>
                                            </View>

                                        </View>
                                        <View style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                            <View>

                                                <Pressable onPress={() =>
                                                    // @ts-ignore
                                                    nativation.navigate("MangaDetail", { item })}>

                                                    <Image style={styles.mangaCover} source={{ uri: item.coverImage.large }}

                                                    />
                                                </Pressable>

                                                <View style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: 'rgba(249, 105, 180, 0.8)', borderTopLeftRadius: 20, borderTopRightRadius: 1, borderBottomRightRadius: 7, paddingLeft: 4, paddingBottom: 2, paddingTop: 0.5 }}>
                                                    <Text style={{ color: '#fff', fontSize: 12, fontFamily: fonts.fontBold, justifyContent: 'center' }}>  {item.averageScore / 10} ⭐ </Text>
                                                </View>
                                            </View>

                                        </View>
                                    </View>
                                </ImageBackground>
                            </Animated.View>

                        </View>
                    );
                })}
            </Animated.ScrollView >
        </View >

    );

};


const styles = StyleSheet.create({
    imageContainer: {
        borderRadius: 7,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 16 / 10,
    },
    text: {
        marginLeft: 40,
        marginBottom: 10,
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    magaContainer: {
        marginTop: 100,
        position: 'absolute',
        padding: 10,
        flexDirection: 'row',
    },
    infoManga: {
        padding: 10,
        width: '70%',
        flexDirection: 'column',
    },
    mangaTitle: {
        fontFamily: "Oswald-Regular",
        color: '#FFFFFF',
        shadowColor: '#000',
        fontSize: 24,
    },
    mangaDescription: {
        fontFamily: "Oswald-Regular",
        color: '#FFFFFF',
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'normal',
        height: 60,
    },
    genres: {
        fontFamily: "Oswald-Regular",
        color: '#8c8484',
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'normal',
    },
    title: {
        fontFamily: "Oswald-Bold",
        color: '#FFFFFF',
        marginBottom: 10,
        fontSize: 20,
    },
    mangaCover: {
        height: 150,
        width: 100,
        margin: 'auto',
        borderRadius: 7,
    },
    button: {
        marginTop: 10,
        backgroundColor: '#FFFFFF',
        color: '#000000',
        borderRadius: 7,
        padding: 10,
        width: 100,
    },

    header: {
        justifyContent: "space-between",
        flexDirection: "row",
        zIndex: 100,
        marginTop: 40,
        marginHorizontal: 16,
        position: 'absolute',
        // paddingBottom: 1,
    },

});
export default ImageCarousalSquare;