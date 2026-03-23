import Block from "../block"
import "./main.css"
import Jeanne from "../../assets/jeanne.jpg"
import NyeJeanne from "../../assets/nye-jeanne.jpg"
import NyeAudio from "../../assets/nye.mp3"
import { useState } from "react"

const PROF_STACK_NDPT = import.meta.env.VITE_PROF_STACK_NDPT

function App() { 
  const [playNyeClass, setPlayNyeClass] = useState<string>("")
  const [currentSrc, setCurrentSrc] = useState(Jeanne)
  const [stackIcons, setStackIcons] = useState()

  

  function playNye() {
    if (playNyeClass) return;

    // 1. Запускаем анимацию
    setPlayNyeClass("play-nye-class");

    // 2. Звук
    const audio = new Audio(NyeAudio);
    audio.play();

    // 3. ТАЙМИНГ: Смена спрайта на 510-й миллисекунде (85% от 0.6s)
    setTimeout(() => {
      setCurrentSrc(NyeJeanne);
    }, 1460);

    // 4. Сброс класса после полного завершения (600мс), чтобы можно было кликнуть снова
    setTimeout(() => {
      setPlayNyeClass("");
      setCurrentSrc(Jeanne)
    }, 2000);
  }
  return (
    <Block title="Profile">
      <div className="profile">
        <div className="profile-quick-container">
          <img src={currentSrc} onClick={playNye} className={`profile-avatar ${playNyeClass}`}/>
          <div className="profile-meta-container">
            <p className="profile-meta-title">
              Neverett
            </p>
            <p className="profile-meta-subtitle">
              Fullstack developer from Moscow, Russia
            </p>
          </div>
        </div>
        <p>
  Greetings everyone!!! Im so happy to see anyone on this website!!<br/>
  I wanted to create my own bio for a long time, and now its here!!<br/>
  Im neverett, i like to create QoL things, dreaming to create more
  prettier frontend, and to create the most useful and coolest APIs
  for something.<br/>
  Birthday on february 1, speaks russian as native, english ~b1-b2,
  and learning japanese via duolingo just for fun.<br/>
  Hope that you liked this page, actually it’s my first exp in publishing any for that level of seriously..
  Please leave an rating or something!! You can find button for this in the footer! Thanks! i really appreciate it!!
        </p>
        <div className="profile-stack">
          <p className="profile-stack-title">My Tech Stack:</p>
          <div className="profile-stack-icons">
          </div>
        </div>
      </div>
    </Block>
  )
}

export default App