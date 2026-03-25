import { useEffect, useState } from "react"
import type { NowPlayingItem, SpotifyNowPlayingResponse } from "./types"
import Block from "../block/index"
import "./main.css"
import placeholderCover from "../../assets/coverplaceholder.png"

const API_URL = import.meta.env.VITE_API_URL;
const SPTF_NOWPLAY_NDPT = import.meta.env.VITE_SPTF_NOWPLAY_NDPT;
const LTFM_NOWPLAY_NDPT = import.meta.env.VITE_LTFM_NOWPLAY_NDPT;
const LTFM_RECENTS_NDPT = import.meta.env.VITE_LTFM_RECENTS_NDPT;

function App() {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingItem>()
  const [recentlyPlayed, setRecentlyPlayed] = useState<{name: string, cover: string, url: string; artistName: string; lastPlayed: string}[]>()
  const [techStack, setTechStack] = useState<{name: string, icon: string, aboutUrl: string, tags: string}[]>()

  function formatTimeAgo(seconds: number) {
    if (seconds < 60) return 'just now';

    const intervals = [
      { label: 'y', seconds: 31536000 },
      { label: 'mo', seconds: 2592000 },
      { label: 'd', seconds: 86400 },
      { label: 'h', seconds: 3600 },
      { label: 'm', seconds: 60 },
    ];

    for (let i = 0; i < intervals.length; i++) {
      const interval = intervals[i];
      const count = Math.floor(seconds / interval.seconds);
      
      if (count >= 1) {
        return `${count}${interval.label} ago`;
      }
    }
  }


  async function updateNowPlayingState() {
    let spotifyRequest = await fetch(`${API_URL}${SPTF_NOWPLAY_NDPT}`)

    if (!spotifyRequest.ok) return

    let resp = (await spotifyRequest.json()) as SpotifyNowPlayingResponse;
    
    let toSet = {} as NowPlayingItem
    if (resp.item && resp.is_playing) {
      toSet = {
        title: resp.item.name,
        artistName: resp.item.artists[0],
        coverUrl: resp.item.cover,
        openUrl: resp.item.url,
        isLocal: resp.item.is_local,
        lastPlayed: formatTimeAgo(10),
        source: "Spotify"
      };
    } else {
      const lastfmRequest = await fetch(`${API_URL}${LTFM_NOWPLAY_NDPT}`)
      const lfmresp = (await lastfmRequest.json());

      toSet = {
        title: lfmresp.track.name,
        artistName: lfmresp.track.artist.name,
        coverUrl: lfmresp.track.image || lfmresp.track.artist.image,
        openUrl: lfmresp.track.url,
        lastPlayed: formatTimeAgo(
          lfmresp.track.date ? (Math.floor((new Date().getTime()/1000) - lfmresp.track.date)) : 0
        ),
        source: "Last.fm"
      };
    }
    console.log(toSet)
    setNowPlaying(toSet)
  }

  async function updateRecentlyPlayedState(){ 
    const recentlyPlayedReq = await fetch(`${API_URL}${LTFM_RECENTS_NDPT}`)
    
    const recPld = await recentlyPlayedReq.json()
    if (recPld.ok && recPld.tracks) {
      let toCutStart = 1
      let toCutEnd = 3
      console.log(nowPlaying)
      if (nowPlaying?.source === "lastfm" && nowPlaying.openUrl !== recPld.tracks[0].url) {
        toCutStart--;
        toCutEnd--
      }
      const firsts = recPld.tracks.slice(toCutStart, toCutEnd)
      setRecentlyPlayed(firsts.map((item)=>({
        name: item.name,
        artistName: item.artist.name,
        cover: item.image || item.artist.image,
        url: item.url,
        lastPlayed: formatTimeAgo((Math.floor((new Date().getTime()/1000) - item.listenedAt)))
      })))
    }
  }

  useEffect(()=> {
    updateNowPlayingState();
    updateRecentlyPlayedState();
    const npinterval = setInterval(updateNowPlayingState, 10000)
    const rpinterval = setInterval(updateRecentlyPlayedState, 20000)
    return () => {clearInterval(npinterval); clearInterval(rpinterval)}
  }, [])

  return (
    <Block title="Music" className="music-block">
      <div className="track-main-info cursor-pointer" onClick={()=>{window.open(nowPlaying?.openUrl)}}>
        <img src={nowPlaying?.coverUrl || placeholderCover} className="track-main-cover"/>
        <div className="track-main-meta">
          <div className="track-main-status">
            <svg 
              className={`track-main-status-svg ${nowPlaying?.lastPlayed === "just now" ? 'online' : 'offline'}`} 
              width="25" 
              height="25" 
              viewBox="0 0 10 10" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle 
                className="track-main-status-svg blur" 
                cx="5" 
                cy="5" 
                r="3" 
              />
                <circle 
                className="status-dot" 
                cx="5" 
                cy="5" 
                r="2" 
              />
            </svg>
            <div>{nowPlaying?.lastPlayed}</div>
          </div>
          <div className="track-main-artist">By {nowPlaying?.artistName || "..."}</div>
          <div className="track-main-title-container">
            <div className="track-main-title" title={nowPlaying?.title}>{nowPlaying?.title || "Loading..."}</div>
          </div>
          
          <div className="track-main-badge-container">
            <div className={`track-main-badge ${nowPlaying?.source.split(".")[0]}`}>{nowPlaying?.source}</div>
            {nowPlaying?.isLocal && <p className={`track-main-badge is-local`}>Local</p>}
          </div>
        </div>
      </div>
      <p className="subtitle">Last listened</p>
      <div className="recpld-container">
        {!recentlyPlayed && <i className="recpld-loading">Loading...</i>}
        {recentlyPlayed?.map((item) => (
          <div className="recpld-item-container cursor-pointer" onClick={()=>{window.open(item.url)}}>
            <img src={item.cover || placeholderCover} className="recpld-item-cover"/>
            <div className="recpld-item-meta-container">
              <p className="recpld-item-title">{item.name}</p>
              <div className="recpld-item-stepdata">
                <p className="recpld-item-artist">{item.artistName}</p>
                <p className="recpld-item-lastpld">{item.lastPlayed}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Block>
  )
}

export default App