import { View } from "@react-three/drei";
import React from "react";

export const ModelView = ({
    index,
    groupRef,
    gsapType,
    controlRef,
    setRotationState,
    item,
    size,
}) => {
    return (
        <View index={index} id={gsapType} className="border-2 border-red-500 w-full h-full">

        </View>
    )
};
