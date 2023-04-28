import React, { useState } from "react";
import './styles/app.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Song from "./components/Song";
import Player from "./components/Player";
import data from "./data"
import SongList from "./components/SongList";

function App() {
  const [songs, setSongs] = useState(data());  //songs list
  const [currentSong, setCurrentSong] = useState(songs[0]);  // the song which is currently playing
  const [isPlaying, setIsPlaying] = useState(false);  // we should pass this state into the player to find out playing or not
  return (
    <div className="App">
      {/* <h1>Music player</h1> */}
      <Song currentSong={currentSong} />   {/* pass the props into song.js */}
      <Player currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>  {/* pass the props into player.js */}
      <SongList songs={songs}/>

    </div>
  );
}

export default App;
