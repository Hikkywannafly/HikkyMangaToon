import ImageColors from "react-native-image-colors";
import React from "react";

type ColorUri = {
    image: string
}
const colorDominant = async (
    colors: ColorUri[]
) => {
    const colorArary = await Promise.all(
        colors.map(async (color) => {
            return await ImageColors.getColors(color.image, {
                fallback: "#000000",
            });
        }
        )
    );

}