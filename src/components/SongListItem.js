import React from "react";

const SongListItem = ({ song }) => {
    return (
        <div className="song-item">
            <img src={song.cover}></img>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
}

export default SongListItem;