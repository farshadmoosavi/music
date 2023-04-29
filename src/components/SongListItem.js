import React, { useContext,createContext } from "react";
import SongContext from "./SongContext";

const SongListItem = ({ song }) => {
    const {setCurrentSong} = useContext(SongContext)
    
    return (
        <div onClick={()=>setCurrentSong(song)} className="song-item">
            <img src={song.cover}></img>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
}

export default SongListItem;