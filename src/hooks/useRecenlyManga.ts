import supabaseClient from "../lib/supabase";
import { getPageMedia } from "../services/anilist";

import {
    MediaFormat,
    MediaSort,
    MediaStatus,
    MediaType,
} from "../types/anilist";
import { useInfiniteQuery } from "@tanstack/react-query";


export interface UseBrowseOptions {
    keyword?: string;
    genres?: string[];
    format?: MediaFormat;
    limit?: number;
    tags?: string[];
    sort?: MediaSort;
    country?: string;
    status?: MediaStatus;
    isAdult?: boolean;
}

const useRecentlyManga = (options: UseBrowseOptions) => {

    const {
        format,
        genres,
        keyword,
        sort,
        limit = 30,
        tags,
        country,
        status,
        isAdult,
    } = options;


    return useInfiniteQuery(
        ["browse", options],
        async ({ pageParam = 1 }) => {
            const { data: mediaRecentlyChapter, error } = await supabaseClient
                .from("kaguya_chapters")
                .select("*")
                .eq("sourceId", 'lh')
                .order("created_at", { ascending: false })
                .limit(10)

            return mediaRecentlyChapter;

        },
    );

}

export default useRecentlyManga;



