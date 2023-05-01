import React, { useState, createContext, useContext } from "react";
import './styles/app.scss';
import Song from "./components/Song";
import Player from "./components/Player";
import data from "./data"
import SongList from "./components/SongList";
import SongContext from "./components/SongContext";
import ToggleList from "./components/ToggleList";

function App() {
  const [songs, setSongs] = useState(data());  //songs list
  const [currentSong, setCurrentSong] = useState(songs[0]);  // the song which is currently playing
  const [isPlaying, setIsPlaying] = useState(false);  // we should pass this state into the player to find out playing or not
  const[displayListSong, setDisplayListSong] = useState(true);

  return (
    <div className="App">
      <ToggleList displayListSong={displayListSong} setDisplayListSong={setDisplayListSong}/>
      <SongContext.Provider value={{ songs, setCurrentSong, setSongs }}>  {/* Notice: double brace is necessary here for passing setStates */}
        <Song currentSong={currentSong} />   {/* pass the props into song.js */}
        <Player currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />  {/* pass the props into player.js */}
        <SongList songs={songs} displayListSong={displayListSong} />
      </SongContext.Provider>
    </div >
  );
}

export default App;
