import { Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { AccountBar, NotificationBar, ImageCarousalSquare } from "../../components";
import { ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { MediaSort, MediaType } from "../../types/anilist";
import { LinearGradient } from 'expo-linear-gradient';
import useMedia from "../../hooks/useMedia";


type Props = {

};


const Home: React.FC<Props> = () => {

    const { data: trendingManga, isLoading: trendingLoading } = useMedia({
        type: MediaType.Manga,
        sort: [MediaSort.Trending_desc, MediaSort.Popularity_desc],
        perPage: 10,
    });

    return (
        <React.Fragment>

            <View style={styles.container}>
                <ScrollView >
                    <View style={styles.header}>
                        <AccountBar />
                        <NotificationBar />
                    </View>
                    {
                        trendingLoading ? <Text>Loading...</Text> : <ImageCarousalSquare data={trendingManga} />
                    }
                    

                </ScrollView>
            </View>

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
    shadow: {
        position: 'absolute',
        width: '100%',
        height: 300,
        opacity: 0.5,
    },
    cover: {
        position: 'absolute',
        width: '100%',
        height: 300,

    },
    text: {
        color: '#b5234c',
    },
    blackgroundColors: {
        width: '100%',
        height: 250,
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.9)',
    },


})

export default Home;