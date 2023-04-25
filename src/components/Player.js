import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core";


const Player = ({ currentSong, isPlaying, setIsPlaying }) => {

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
        setSongInfo({
            currentTime: e.target.currentTime,
            duration: e.target.duration
        })
    }

    const [songInfo, setSongInfo] = useState({
        currentTime: null,  // currently playing time of a song
        duration: null   // the whole duration of a song
    })

    const convertToTime = (num) => {
        const hours = Math.floor(num / 3600);
        const minutes = Math.floor((num % 3600) / 60);
        const seconds = num % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value})
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>Start Time {convertToTime(parseInt(songInfo.currentTime))}</p>
                {/* This is an controlled <input> because it depends on a state named songInfo: */}
                <input type="range" onChange={dragHandler} min={0} max={songInfo.duration} value={songInfo.currentTime} />
                <p>End Time {convertToTime(parseInt(songInfo.duration))}</p>
            </div>
            <div className="play-control"> {/* control buttons */}
                <FontAwesomeIcon className="skip-back" size='2x' icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSong} className="play" size='2x' icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon className="skip-forward" size='2x' icon={faAngleRight} />
            </div>
            {/* onLoadedMetadata helps initaiate song's info before playing */}
            <audio onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>

        </div>
    );
}

export default Player;