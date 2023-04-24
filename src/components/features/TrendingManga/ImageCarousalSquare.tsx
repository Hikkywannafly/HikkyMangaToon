import { StyleSheet, View, Image, useWindowDimensions, Text, ImageBackground, Button, TouchableHighlight, } from 'react-native';

import React, { useState, useEffect, useRef, useContext } from 'react';
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { useHeaderBackground } from '../../../contexts/HeaderBackgroundContext'
import Icons from "@expo/vector-icons/MaterialIcons";


import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    useAnimatedRef,
    color,
} from 'react-native-reanimated';


type Props = {
    data: any[];
    autoPlay?: boolean;
    pagination?: boolean;

}

const ImageCarousalSquare: React.FC<Props> = ({
    data,
    autoPlay = true,
    pagination,
}) => {
    const { backgroundColor, setBackgroundColor } = useHeaderBackground()
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
    console.log(`data`, JSON.stringify(data));


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
                        <View style={{ width: SIZE, marginTop: 10 }} key={index}>
                            <Animated.View style={[styles.imageContainer, style]}
                            >
                                <ImageBackground source={{
                                    uri: item?.bannerImage ?? item?.coverImage?.large
                                }}
                                    blurRadius={7}
                                    resizeMode="cover"
                                    style={styles.image}>
                                    <LinearGradient
                                        colors={[
                                            '#000000e6',
                                            'rgba(0,0,0,.863)',
                                            'rgba(0,0,0,.802)',
                                            'rgba(0,0,0,.721)',
                                            'rgba(0,0,0,.627)',
                                            'rgba(0,0,0,.523)',
                                            'rgba(0,0,0,.416)',
                                            'rgba(0,0,0,.311)',
                                            'rgba(0,0,0,.213)',
                                            'rgba(0,0,0,.128)',
                                            '#0000000f',
                                            'rgba(0,0,0,.016)',
                                            '#0000',
                                        ]}
                                        start={{ x: 0, y: 1.5 }}
                                        end={{ x: 1.5, y: 0 }}
                                        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                                    >
                                    </LinearGradient>

                                    <View style={styles.magaContainer}>
                                        <View style={styles.infoManga}>
                                            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.mangaTitle}>{item.title.userPreferred}</Text>
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
                                                <Text style={{
                                                    color: '#FFFFFF'
                                                }}>🌟 {item.averageScore}</Text>
                                                <Text style={{
                                                    color: '#FFFFFF'
                                                }}>💕 {item.trending}</Text>

                                            </View>

                                            <Text style={{
                                                marginTop: 5,
                                                color: '#e06ead',
                                                fontSize: 18,
                                                fontFamily: 'Oswald-Bold'

                                            }}>{item.status}</Text>


                                        </View>
                                        <View style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                            <Image style={styles.mangaCover} source={{ uri: item.coverImage.large }} />



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
        fontFamily: "Oswald-Light",
        color: '#FFFFFF',
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'normal',
    },
    genres: {
        fontFamily: "Oswald-Regular",
        color: '#FFFFFF',
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
        // marginTop: 20,
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



});
export default ImageCarousalSquare;