import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import React, { useState, useEffect, useRef, } from 'react';
import { useTheme } from '@react-navigation/native'
import CardManga from '../../shared/Card'
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    useAnimatedRef,
    Extrapolate,
} from 'react-native-reanimated';

type Props = {
    data: any[];
    autoPlay?: boolean;
    pagination?: boolean;
}
const UpCommingManga: React.FC<Props> = (
    {
        data,
    }
) => {
    // @ts-ignore
    const { colors, fonts } = useTheme();
    const scrollY = new Animated.Value(0);
    const [newData] = useState([
        { key: 'spacer-left' },
        ...data,
        { key: 'spacer-right' },
    ]);
    const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
    const { width } = useWindowDimensions();
    const SIZE = width * 0.9;
    const SPACER = (width - SIZE) / 2 + 2;
    const x = useSharedValue(0);
    const offSet = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler({
        onScroll: event => {
            x.value = event.contentOffset.x;
        },
    });
    return (
        <View style={styles.containter}>
            <View style={styles.title}>
                <Text style={[{ color: colors.text, fontFamily: fonts.fontRegular, fontWeight: '600', fontSize: 18 }]}>Trending Novel </Text>
                {/* <Text style={[{ color: colors.primary, fontFamily: fonts.fontNormal, fontSize: 14 }]}>See more</Text> */}
            </View>

            <View style={styles.content}>
                <Animated.ScrollView
                    ref={scrollViewRef}
                    // onScroll={onScroll}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: true }
                    )}
                    onMomentumScrollEnd={e => {
                        offSet.value = e.nativeEvent.contentOffset.x;

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
                                Extrapolate.CLAMP
                            );
                            return {
                                transform: [{ scale }],
                            };
                        });

                        if (!item.bannerImage && item.key === 'spacer-left' || !item.bannerImage && item.key === 'spacer-right') {
                            return <View style={{ width: SPACER }} key={index} />;
                        }

                        return (
                            <Animated.View
                                style={[

                                    {
                                        width: SIZE / 2.5,
                                        marginRight: 8,

                                    },
                                    style,

                                ]}
                                key={index} >
                                <CardManga
                                    data={{
                                        title: item.title.userPreferred,
                                        image: item.coverImage.large,
                                        avageScore: item.averageScore,
                                        chapter: item.chapters,
                                    }}
                                />
                            </Animated.View>
                        )
                    })}
                </Animated.ScrollView>
            </View>

        </View >
    )
}
const styles = StyleSheet.create({
    containter: {
        marginTop: 10,
        flex: 1,
        flexDirection: "column",
        gap: 10,
    },
    title: {
        flex: 1,
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 16,
        alignItems: 'center',
        flexDirection: 'row',
    },
    content: {
        flex: 1,

    }
})

export default UpCommingManga
