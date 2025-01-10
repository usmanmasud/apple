import { PerspectiveCamera, View } from "@react-three/drei";
import React, { Suspense } from "react";
import Lights from './Light'
import Iphone from "./Iphone";

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
        <View index={index} id={gsapType} className={`border-2 border-red-500 w-full h-full ${index === 2 ? 'right-[-100%]' : ''}`}>
            {/* Ambient light */}
            <ambientLight intensity={0.3} />

            <PerspectiveCamera makeDefault position={[0, 0, 4]} />

            <Lights />

            <Suspense fallback={<div>Loading</div>}>
                <Iphone />
            </Suspense>
        </View>
    )
};
