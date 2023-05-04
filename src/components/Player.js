import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";


const Player = ({ currentSong, setCurrentSong, isPlaying, setIsPlaying, songs, setSongs }) => {

    // this useEffect is written for changing the active field of every song in data.js so as to change the background color of song in songList 
    //when we push the skip buttons
    useEffect(() => {
        const newSong = songs.map(item => {
            if (item.id === currentSong.id) {
                return {
                    ...item,
                    active: true
                }
            }
            else {
                return {
                    ...item,
                    active: false
                }
            }
        })
        setSongs(newSong);
    }, [currentSong])


    const audioRef = useRef(null);

    const playSong = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }

    const timeUpdateHandler = (e) => {
        const currentTime = e.target.currentTime
        const duration = e.target.duration
        //calculate the percentage of song progress:
        const animationPercentage = (currentTime / duration) * 100;
        setSongInfo({
            currentTime,
            duration,
            animationPercentage
        })

        //  console.log(animationTime);
    }

    const [songInfo, setSongInfo] = useState({
        currentTime: 0,  // currently playing time of a song
        duration: 0,   // the whole duration of a song
        animationPercentage: 0   // the percentage of song progress which is used for progress of bar animation
    })

    const convertToTime = (num) => {
        const hours = Math.floor(num / 3600);
        const minutes = Math.floor((num % 3600) / 60);
        const seconds = num % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value })
    }

    const skipSong = (dir) => {
        const currentIndex = songs.findIndex((item) => item.id === currentSong.id);
        if (dir === "forward") {
            if (currentIndex == songs.length - 1) {
                setCurrentSong(songs[0])

            }
            else {
                setCurrentSong(songs[currentIndex + 1])
            }
        }
        if (dir === "back") {
            if (currentIndex === 0) {
                setCurrentSong(songs[songs.length - 1])
            }
            else {
                setCurrentSong(songs[currentIndex - 1])
            }
        }
    }

    // this variable is used for sneding percentage of animation to css by style
    const trackAnimation = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{convertToTime(parseInt(songInfo.currentTime))}</p>

                <div style={{ background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})` }}
                    className="track">   {/* this div is supposed to make the time bar */}
                    {/* This is an controlled <input> because it depends on a state named songInfo: */}
                    {/* in maximum range we have to put (or) operator with max.duration because when the song has not been loaded it shows 0 and doesn't display error */}
                    <input type="range" onChange={dragHandler} min={0} max={songInfo.duration || 0} value={songInfo.currentTime} />

                    <div style={trackAnimation} className="animate-track"> {/* and this div is supposed to change according to progress of the song time */}

                    </div>
                </div>

                <p> {convertToTime(parseInt(songInfo.duration))}</p>
            </div>
            <div className="play-control"> {/* control buttons */}
                <FontAwesomeIcon onClick={() => skipSong("back")} className="skip-back" size='2x' icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSong} className="play" size='2x' icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon onClick={() => skipSong("forward")} className="skip-forward" size='2x' icon={faAngleRight} />
            </div>
            {/* onLoadedMetadata helps initaiate song's info before playing */}
            <audio onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>

        </div>
    );
}

export default Player;