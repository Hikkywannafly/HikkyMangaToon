import { Text, View, Image, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { AccountBar, NotificationBar, ImageCarousalSquare, UpCommingManga, RecentlyManga } from "../../components";
import { MediaFormat, MediaSort, MediaType } from "../../types/anilist";
import useMedia from "../../hooks/useMedia";
import { useTheme } from "@react-navigation/native";
import useRecenlyManga from "../../hooks/useRecenlyManga";
type Props = {

};


const Home: React.FC<Props> = () => {
    const { colors } = useTheme();
    const { data: trendingManga, isLoading: trendingLoading } = useMedia({
        type: MediaType.Manga,
        sort: [MediaSort.Trending_desc, MediaSort.Popularity_desc],
        perPage: 10,
    });
    const { data: popularManga, isLoading: popularMangaLoading } = useMedia({
        type: MediaType.Manga,
        sort: [MediaSort.Popularity_desc],
        format_in: [MediaFormat.Novel],
        perPage: 10,
    });

    const { data: recentlyManga, isLoading: recentlyMangaLoading } = useMedia({
        type: MediaType.Manga,
        sort: [MediaSort.Popularity_desc,],
        isAdult: false,
        perPage: 20,
    });


    console.log(`tes23232t`, JSON.stringify(recentlyManga));


    return (
        <React.Fragment>
            <SafeAreaView style={styles.container}>
                <ScrollView >
                    {/* <View style={styles.header}>
                        <AccountBar />
                        <NotificationBar />
                    </View> */}
                    {
                        trendingLoading ? <Text>Loading...</Text> : <ImageCarousalSquare data={trendingManga} />
                    }
                    {
                        popularMangaLoading ? <Text>Loading...</Text> :
                            <View style={[styles.bodyContainer]}>
                                <UpCommingManga data={popularManga} />
                            </View>
                    }
                    {
                        recentlyMangaLoading ? <Text>Loading...</Text> :
                            <View style={[styles.mangaContainer]}>
                                <RecentlyManga data={recentlyManga} />
                            </View>

                    }

                </ScrollView>
            </SafeAreaView>
        </React.Fragment>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    header: {
        justifyContent: "space-between",
        flexDirection: "row",
        zIndex: 100,
        marginTop: 40,
        marginHorizontal: 16,
        paddingBottom: 1,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#b5234c',
    },
    bodyContainer: {
        flex: 1,
    },
    mangaContainer: {
        flex: 1,
    }
})

export default Home;

