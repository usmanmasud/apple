import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import React, { Suspense } from "react";
import Lights from './Light'
import Iphone from "./Iphone";
import * as THREE from 'three'
import { Loader } from "./Loader";

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
        <View index={index} id={gsapType} className={`absolute w-full h-full ${index === 2 ? 'right-[-100%]' : ''}`}>
            {/* Ambient light */}
            <ambientLight intensity={0.3} />

            <PerspectiveCamera makeDefault position={[0, 0, 4]} />

            <Lights />

            <OrbitControls
                makeDefault
                ref={controlRef}
                enableZoom={false}
                enablePan={false}
                rotateSpeed={0.4}
                target={new THREE.Vector3(0, 0, 0)}
                onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
            />

            <group ref={groupRef} name={`${index === 1 ? 'small' : 'large'}`} position={[0, 0, 0]}>
                <Suspense fallback={<Loader />}>
                    <Iphone
                        scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
                        item={item}
                        size={size}
                    />
                </Suspense>
            </group>
        </View>
    )
};
