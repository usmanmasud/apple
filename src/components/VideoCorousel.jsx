import React, { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";

export const VideoCorousel = () => {
    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);

    const [video, setvideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,
    });

    const [loadedData, setloadedData] = useState([]);

    const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

    useGSAP(() => {
        gsap.to('#slider', {
            transform: `translateX(${-100 * videoId}%)`,
            duration: 2,
            ease: 'power2.inOut'
        })
        gsap.to("#video", {
            scrollTrigger: {
                trigger: "#video",
                toggleActions: "restart none none none",
            },
            onComplete: () => {
                setvideo((pre) => ({
                    ...pre,
                    startPlay: true,
                    isPlaying: true,
                }));
            },
        });
    }, [isEnd, videoId]);


    const handleLoadedMetaData = (index, event) =>
        setloadedData((pre) => [...pre, event]);

    useEffect(() => {
        let currentProgress = 0;
        let span = videoSpanRef.current;

        if (span[videoId]) {
            // animate the progress of the video

            let ainme = gsap.to(span[videoId], {
                onUpdate: () => {
                    const progress = Math.ceil(ainme.progress() * 100);

                    if (progress != currentProgress) {
                        currentProgress = progress;

                        gsap.to(videoDivRef.current[videoId], {
                            width:
                                window.innerWidth < 760
                                    ? "10vw"
                                    : window.innerWidth < 1200
                                        ? "10vw"
                                        : "4vw",
                        });

                        gsap.to(span[videoId], {
                            width: `${currentProgress}%`,
                            backgroundColor: 'white'
                        })
                    }
                },
                onComplete: () => {
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[videoId], {
                            width: '12px',
                        })
                        gsap.to(span[videoId], {
                            backgroundColor: '#afafaf'
                        })
                    }
                },
            });

            if (videoId == 0) {
                ainme.restart();
            }

            const animeUpdate = () => {
                ainme.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration)
            }
            if (isPlaying) {
                gsap.ticker.add(animeUpdate)
            } else {
                gsap.ticker.remove(animeUpdate)
            }
        }


    }, [videoId, startPlay]);

    useEffect(() => {
        if (loadedData.length > 3) {
            if (!isPlaying) {
                videoRef.current[videoId].pause();
            } else {
                startPlay && videoRef.current[videoId].play();
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData]);




    const hanldeProcess = (type, index) => {
        switch (type) {
            case "video-end":
                setvideo((prevVideo) => ({
                    ...prevVideo,
                    isEnd: true,
                    videoId: index + 1,
                }));
                break;

            case "video-last":
                setvideo((prevVideo) => ({ ...prevVideo, isLastVideo: true }));
                break;

            case "video-reset":
                setvideo((prevVideo) => ({
                    ...prevVideo,
                    isLastVideo: false,
                    videoId: 0,
                }));
                break;

            case "paly":
                setvideo((prevVideo) => ({
                    ...prevVideo,
                    isPlaying: !prevVideo.isPlaying,
                }));
                break;

            default:
                return video;
        }
    };

    return (
        <>
            <div className="flex items-center">
                {hightlightsSlides.map((list, index) => (
                    <div key={list.id} id="slider" className="sm:pr-20 pr-10">
                        <div className="video-carousel_container">
                            <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                                <video
                                    id="video"
                                    playsInline={true}
                                    preload="auto"
                                    muted
                                    ref={(el) => (videoRef.current[index] = el)}
                                    onEnded={() =>
                                        index !== 3
                                            ? hanldeProcess('video-end', index)
                                            : hanldeProcess('video-last')
                                    }
                                    onPlay={() =>
                                        setvideo((prevVideo) => ({
                                            ...prevVideo,
                                            isPlaying: true,
                                        }))
                                    }
                                    onLoadedMetadata={(e) => handleLoadedMetaData(index, e)}
                                >
                                    <source src={list.video} type="video/mp4" />
                                </video>
                            </div>

                            <div className="absolute top-12 left-[5%] z-10">
                                {list.textLists.map((text) => (
                                    <p key={text} className="md:text-2xl text-xl font-medium">
                                        {text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="relative flex-center mt-10">
                <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
                    {videoRef.current.map((_, index) => (
                        <span
                            key={index}
                            ref={(el) => (videoDivRef.current[index] = el)}
                            className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
                        >
                            <span
                                className="h-full absolute w-full rounded-full"
                                ref={(el) => (videoSpanRef.current[index] = el)}
                            />
                        </span>
                    ))}
                </div>

                <button className="control-btn">
                    <img
                        src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
                        alt={isLastVideo ? "replay" : !isPlaying ? "paly" : "pause"}
                        onClick={
                            isLastVideo
                                ? () => hanldeProcess("video-reset")
                                : !isPlaying
                                    ? () => hanldeProcess("play")
                                    : () => hanldeProcess("pause")
                        }
                    />
                </button>
            </div>
        </>
    );
};
