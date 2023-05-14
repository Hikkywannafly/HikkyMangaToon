
import { View, Text, StyleSheet, FlatList, ScrollView, Animated } from 'react-native'
import React, { useState, useRef } from 'react'
import { useTheme } from "@react-navigation/native";
import DropDownPicker from 'react-native-dropdown-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { set } from 'react-native-reanimated';

type Props = {
    data: any
    isLoading: boolean
}

const ReadScreen: React.FC<Props> = ({
    data,
    isLoading
}) => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const { colors } = useTheme();
    const chapter = data
    const [listSourceId, listSourceIdSet] = useState([])
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [dataChapters, setDataChapters] = useState([]);
    Animated.createAnimatedComponent(FlatList);

    const getListSourceId = (chapter: any) => {
        const listSourceId = chapter.map((item: any) => item.sourceId)
        // remove duplicate
        const uniqueListSourceId = [...new Set(listSourceId)]
        listSourceIdSet(uniqueListSourceId)
        return uniqueListSourceId
    }

    React.useEffect(() => {
        getListSourceId(chapter);

    }, [chapter])

    React.useEffect(() => {
        if (listSourceId.length > 0) {
            getChapters(listSourceId[0])
        }

    }, [listSourceId])

    React.useEffect(() => {
        if (value) {
            getChapters(value)
        }
    }, [value])

    const getChapters = (sourceId: string) => {
        const chapters = chapter.filter((item: any) => item.sourceId === sourceId)
        setDataChapters(chapters)
        setValue(sourceId)
    }

    return (
        <View
            style={{
                width: '100%',
                height: '100%',
            }}
        >
            {
                isLoading ? <Text>Loading...</Text> : (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 50 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', zIndex: 500 }}>
                            <Text style={{ marginRight: 5, color: colors.text, fontSize: 18, fontWeight: '900' }}>Source </Text>
                            <View style={{ borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5, zIndex: 1000 }}>
                                <DropDownPicker
                                    open={open}
                                    value={value}

                                    items={listSourceId.map((item: any) => {

                                        if (item === 'lh') {
                                            return {
                                                label: 'TruyenTranhLH',
                                                value: 'lh',
                                            }
                                        }
                                        if (item === 'nt') {
                                            return {
                                                label: 'NetTruyen',
                                                value: 'nt',
                                            }
                                        }
                                    }
                                    )}
                                    setOpen={setOpen}
                                    setValue={setValue}
                                    style={{ backgroundColor: colors.background, borderColor: 'grey', }}
                                    textStyle={{ color: colors.text }}
                                    listMode="SCROLLVIEW"
                                    placeholder="Select source"
                                    placeholderStyle={{ color: colors.text }}
                                    dropDownContainerStyle={{
                                        backgroundColor: '#171616', borderColor: '#171616', zIndex: 1000,
                                    }}
                                    zIndex={3000}
                                    zIndexInverse={1000}
                                    containerStyle={{ height: 50, width: 150, borderColor: '#ff008c', }}
                                    theme="DARK"
                                />
                            </View>
                        </View>
                    </View>

                )
            }
            {
                isLoading ? <Text>Loading...</Text> : (
                    <View style={{ zIndex: -1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ marginRight: 5, color: colors.text, fontSize: 18, fontWeight: '900' }}>Chapters </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialIcons name="filter-list" size={24} color="white" />
                            </View>

                        </View>
                        <Animated.FlatList
                            data={dataChapters}
                            nestedScrollEnabled={true}
                            contentContainerStyle={{ margin: 20 }}
                            onScroll={
                                Animated.event(
                                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                                    { useNativeDriver: true }
                                )
                            }
                            keyExtractor={(item) => item.sourceChapterId}
                            // contentContainerStyle={{ margin: SPACING }}


                            renderItem={({ item, index }) => {
                                const inputRange = [
                                    -1,
                                    0,
                                    80 * index,
                                    80 * (index + 2),
                                ];

                                const opacityInputRange = [
                                    -1,
                                    0,
                                    80 * index,
                                    80 * (index + 2),
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
                                    <Animated.View
                                        key={index}
                                        style={{
                                            width: '100%',
                                            height: 80,
                                            transform: [{ scale }],
                                            opacity: opacity,

                                            justifyContent: 'center',
                                        }}
                                    >

                                        <View style={{
                                            flexDirection: 'column', justifyContent: 'space-between',
                                            backgroundColor: '#2b2b2b', width: '100%', padding: 10, borderRadius: 10, gap: 5,
                                        }}>
                                            <Text style={{ color: colors.text, fontSize: 18, fontWeight: '900' }}>
                                                {item.name}
                                            </Text>
                                            <Text style={{ color: colors.text, fontSize: 16, fontWeight: '400' }}>
                                                {item.time ?? item.name}
                                            </Text>
                                        </View>
                                    </Animated.View>

                                )
                            }

                            }
                        />
                    </View>
                )
            }

        </View >
    )
}

const styles = StyleSheet.create({


})

export default ReadScreen
