import React, { useContext } from "react";
import SongContext from "./SongContext";

const SongListItem = ({ song }) => {
    const { setCurrentSong } = useContext(SongContext);
    const {songs} = useContext(SongContext);
    const {setSongs} = useContext(SongContext);

    const clickSong = () => {
        setCurrentSong(song); // to play the song
        const newSong = songs.map(item => {
            if(item.id === song.id){
                return {
                    ...item,
                    active : true
                }
            }
            else{
                return {
                    ...item,
                    active: false
                }
            }
        })
        setSongs(newSong);
    }
    return (
        <div onClick={clickSong} className={`song-item ${song.active ? "selected" : ""}`}>
            <img src={song.cover}></img>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
}

export default SongListItem;