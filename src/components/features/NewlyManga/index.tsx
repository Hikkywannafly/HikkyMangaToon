import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import React, { useState, useEffect, useRef, } from 'react';
import { useTheme } from '@react-navigation/native'

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

const NewlyManga: React.FC<Props> = (
    {
        data,
    }
) => {
    // @ts-ignore
    const { colors, fonts } = useTheme();

    // const [newData] = useState([
    //     { key: 'spacer-left' },
    //     ...data,
    //     { key: 'spacer-right' },
    // ]);
    const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
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

    return (
        <View style={styles.containter}>
            <View style={styles.title}>
                <Text style={[{ color: colors.text, fontFamily: fonts.fontBold, fontSize: 20 }]}>Newly Manga</Text>
                <Text style={[{ color: colors.primary, fontFamily: fonts.fontNormal, fontSize: 14 }]}>See more</Text>
            </View>
            <View style={styles.content}>
                <Animated.ScrollView
                    ref={scrollViewRef}
                    onScroll={onScroll}
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


                </Animated.ScrollView>

            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    containter: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    title: {
        flex: 1,
        justifyContent: 'space-between',
        width: '90%',
        paddingHorizontal: 16,
        alignItems: 'center',
        flexDirection: 'row',
    },
    content: {

    }
})

export default NewlyManga