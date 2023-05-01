import React from "react";
import SongListItem from "./SongListItem";

const SongList = ({ songs, displayListSong }) => {
    return (
        <div className={`song-list ${displayListSong ? "displayList" : ""}`}>
            <h2>List of Songs</h2>
            <div className="song-list-items">
                {songs.map(song => (
                    <SongListItem key={song.id} className="" song={song} />

                )
                )}
            </div>
        </div>
    );
}

export default SongList;