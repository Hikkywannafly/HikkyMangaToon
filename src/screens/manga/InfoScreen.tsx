import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable, ScrollView } from 'react-native'
import React from 'react'
import Icons from "@expo/vector-icons/MaterialIcons";
import { useTheme, useNavigation, } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import useMediaDetail from "../../hooks/useMediaDetail";
import { MediaFormat, MediaSort, MediaType } from "../../types/anilist";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const SAPCING = 20;
import useChapters from '../../hooks/useChapter';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import Character from "../../components/shared/Character"
type Props = {
    item: any
    isLoading: boolean,
    data: any
}

const InfoScreen: React.FC<Props> = ({
    item,
    isLoading,
    data
}) => {
    const { width } = useWindowDimensions();
    const nativation = useNavigation();
    const { data: MangaDetail, isLoading: isLoadingMangaDetail } = useMediaDetail({
        id: item.id,
        type: MediaType.Manga,
    });
    const source = {
        html: `
      <p style='text-align:center;'>
        Hello World!
      </p>`
    };

    // console.log(JSON.stringify(MangaDetail))
    return (
        <ScrollView>
            <View style={styles.container}>

                <TouchableOpacity
                    style={{
                        position: "absolute",
                        top: SAPCING * 2,
                        right: SAPCING - 5,
                        backgroundColor: "#000000",
                        borderRadius: 100,
                        alignItems: "center",
                        justifyContent: "center",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 10,
                            height: 10,
                        },
                        shadowOpacity: .3,
                        shadowRadius: 20,
                        zIndex: 100,


                    }}

                    onPress={() => nativation.goBack()}>

                    <Icons
                        style={{
                            aspectRatio: 1,
                            padding: 2,
                        }}
                        name="close" size={24} color={"white"} />

                </TouchableOpacity>
                <View style={
                    {
                        // position: "relative",
                        height: 350,

                    }
                }>
                    <Image
                        source={{ uri: item?.bannerImage ?? item?.coverImage?.large }}
                        style={{
                            width: "100%",
                            height: 350,
                            position: "absolute",
                            top: 0,
                            left: 0,
                            opacity: .7,
                        }}
                    />
                    <LinearGradient
                        colors={[
                            'rgba(0,0,0,.999)',
                            'rgba(0,0,0,.953)',
                            'rgba(0,0,0,.852)',
                            'rgba(0,0,0,.611)',
                            'rgba(0,0,0,.527)',
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
                        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, height: 350, }}
                    >
                    </LinearGradient>

                    <View style={{
                        position: 'absolute',
                        top: 140,
                        zIndex: 100,
                        flexDirection: "row",
                        paddingHorizontal: 30,
                        gap: 20,
                        width: '90%',
                    }}>
                        <View style={{
                            flexDirection: "column",
                            gap: 8,
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}>
                            <Image style={styles.mangaCover} source={{ uri: item.coverImage.large }}
                            />

                        </View>

                        <View style={{
                            flexDirection: "column",
                            gap: 2,
                            maxWidth: 300,
                            justifyContent: "flex-end",

                        }}>
                            <Text style={[styles.mangaTitle, { color: item.coverImage.color ?? '#ffffff' }]}>{item.title.userPreferred} </Text>
                            <View style={
                                {
                                    flexDirection: "row",
                                }
                            }>
                                <Text style={{ color: '#b0c1ff', fontSize: 18, alignItems: 'center' }}>
                                    {
                                        Math.max(...item.counter.map((item: any) => item.quantity)) > 0 ? Math.max(...item.counter.map((item: any) => item.quantity)) : ' ?? '
                                    }
                                </Text>
                                <Text style={{ color: '#d4d4d4', fontSize: 18, alignItems: 'center' }}>  Chapters </Text>
                            </View>

                            <Text style={{
                                marginTop: 5,
                                color: '#e06ead',
                                fontSize: 14,
                                fontWeight: '800',
                            }}>{item.status} </Text>
                        </View>

                    </View>
                    <View style={{
                        position: 'absolute',
                        top: 300,
                        zIndex: 100,
                        width: '100%',
                        height: 40,
                        paddingHorizontal: 30,
                        flexDirection: "row",
                        gap: 10,

                    }} >
                        <Pressable style={[styles.button, {
                            borderColor: item.coverImage.color ?? '#ffffff',
                            borderWidth: .5,
                            width: '85%',

                        }]} >
                            <Text style={[styles.text, {
                                color: item.coverImage.color ?? '#ffffff',
                            }]}> ADD TO LIST </Text>
                        </Pressable>
                        <Pressable style={[styles.button, {
                            borderColor: item.coverImage.color ?? '#ffffff',
                            borderWidth: .5,
                            width: 50,
                        }]} >
                            <Icons
                                style={{
                                    aspectRatio: 1,
                                    padding: 2,
                                }}
                                name="share" size={20} color={item.coverImage.color ?? '#ffffff'} />
                        </Pressable>
                    </View>
                </View>
                {
                    isLoadingMangaDetail ? <Text>Loading</Text> : (
                        <View style={{
                            // backgroundColor: '#ffffff',
                            paddingHorizontal: 30,
                        }}>
                            {/* manga decription */}
                            <View style={{
                                width: '100%',
                            }}>

                                <RenderHtml
                                    contentWidth={width}
                                    source={{ html: `<div style="color: white; font-size: 16px" >${MangaDetail?.description} </div>` ?? '' }}
                                />
                            </View>
                            {/* all title */}
                            <Text style={{
                                color: '#ffffff',
                                fontSize: 16,
                                fontWeight: 'bold',
                                marginTop: 20,
                            }} > All Tittle</Text>



                        </View>
                    )
                }
                {
                    isLoadingMangaDetail ? <Text>Loading</Text> : (
                        <ScrollView
                            horizontal={true}
                        >

                            <View style={{
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                gap: 10,
                                marginTop: 10,
                            }}>
                                {
                                    MangaDetail?.title?.english ? (
                                        <View style={{
                                            backgroundColor: '#171616',
                                            padding: 10,
                                            borderRadius: 5,
                                        }}>
                                            <Text style={{
                                                color: '#ffffff',
                                                fontSize: 16,
                                                fontWeight: 'bold',
                                            }}>English: {MangaDetail?.title?.english}</Text>
                                        </View>
                                    ) : null

                                }
                                {
                                    MangaDetail?.title?.native ? (
                                        <View style={{
                                            backgroundColor: '#171616',
                                            padding: 10,
                                            borderRadius: 5,
                                        }}>
                                            <Text style={{
                                                color: '#ffffff',
                                                fontSize: 16,
                                                fontWeight: 'bold',
                                            }}>Native: {MangaDetail?.title?.native}</Text>
                                        </View>
                                    ) : null

                                }
                                {
                                    MangaDetail?.title?.romaji ? (
                                        <View style={{
                                            backgroundColor: '#171616',
                                            padding: 10,
                                            borderRadius: 5,
                                        }}>
                                            <Text style={{
                                                color: '#ffffff',
                                                fontSize: 16,
                                                fontWeight: 'bold',
                                            }}>Romaji: {MangaDetail?.title?.romaji}</Text>
                                        </View>
                                    ) : null
                                }
                            </View>
                        </ScrollView>
                    )
                }
                {
                    isLoadingMangaDetail ? <Text>Loading</Text> : (
                        <View>
                            <Text style={{
                                color: '#ffffff',
                                fontSize: 16,
                                fontWeight: 'bold',
                                marginTop: 20,
                                paddingHorizontal: 30,
                            }} > Character</Text>
                            <Character data={MangaDetail?.characters.edges} />

                        </View>
                    )
                }
            </View >
        </ScrollView >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        blackgroundColor: '#000000'
    },
    mangaCover: {
        height: 150,
        width: 100,
        margin: 'auto',
        borderRadius: 7,
        resizeMode: 'contain',
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: .3,
        shadowRadius: 20,

    },
    mangaTitle: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        shadowColor: '#000',
        fontSize: 20,
        paddingRight: 50,
    },
    genres: {
        color: '#8c8484',
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'normal',
    },
    button: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,

    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },
})



export default InfoScreen