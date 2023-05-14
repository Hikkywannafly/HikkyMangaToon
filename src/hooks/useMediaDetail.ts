import { getMediaDetails } from "../services/anilist";
import { Media, MediaArgs, PageArgs } from "../types/anilist";
import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

const useMediaDetail = (
    args: MediaArgs & PageArgs,
    options?: Omit<
        UseQueryOptions<Media[], AxiosError, Media[]>,
        "queryKey" | "queryFn"
    >
) => {
    return useQuery<Media[]>(["media", { args }], () => getMediaDetails(args), options);
};

export default useMediaDetail;
