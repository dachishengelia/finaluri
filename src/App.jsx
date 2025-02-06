import { useState } from "react";
import "./App.css";
import axios from "axios";
import Header from "./Header";
import { motion } from "framer-motion";

const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en";

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState({});
  const [inputError, setInputError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!search.trim()) {
      setInputError(true);
      return;
    }

    setInputError(false);

    try {
      const res = await axios.get(`${API_URL}/${search}`);
      setData(res.data);
      setError({});
    } catch (e) {
      setData([]);
      setError(
        e.response?.data || {
          title: "No Definitions Found",
          message: "Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at a later time or head to the web instead.",
        }
      );
    }
  };

  const playSound = () => {
    if (data.length && data[0].phonetics?.length) {
      const audioUrl = data[0].phonetics[0].audio;
      if (audioUrl) {
        setIsPlaying(true);
        const audio = new Audio(audioUrl);
        audio.play();
        audio.onended = () => setIsPlaying(false);
      } else {
        alert("No audio available for this word.");
      }
    }
  };

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Header />
      <form className="search-box" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a word..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="search-btn">
          <img src="/assets/search.png" alt="Search" />
        </button>
      </form>

      {inputError && <p className="input-error">Whoops, can’t be empty…</p>}

      {data.length > 0 && (
        <motion.div
          className="result-box"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="word-header">
            <h2 className="word">{data[0].word}</h2>
            <button onClick={playSound} className="play-btn">
              <img 
                src={isPlaying ? "/assets/playAfter.png" : "/assets/play.png"} 
                alt="Play" 
              />
            </button>
          </div>
          <p className="phonetics">{data[0].phonetic || ""}</p>
          {data[0].meanings.map((el, i) => (
            <div key={i} className="meaning-box">
              <h3 className="part-of-speech">
                {el.partOfSpeech} <div className="grey-line"></div>
              </h3>
              <h4>Meaning</h4>
              {el.definitions.map((item, j) => (
                <ul key={j}>
                  <li>{item.definition}</li>
                </ul>
              ))}
            </div>
          ))}
        </motion.div>
      )}

      {error.title && (
        <div className="error-message">
          <p className="error-emoji">😕</p>
          <h2 className="error-title">{error.title}</h2>
          <p className="error-description">{error.message}</p>
        </div>
      )}
    </motion.div>
  );
}

export default App;
