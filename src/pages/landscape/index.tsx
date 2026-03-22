import { useState, useEffect } from 'react';

import ListeningActivityBlock from "../../components/listeningActivity"
import ProfileBlock from "../../components/profile"

import "./landscape.css"
const RealTimeClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className='header-time'>
      {time.toLocaleTimeString('ru-RU', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
  timeZone: 'Europe/Moscow',
  timeZoneName: 'short'
})}
    </div>
  );
};


function App() {
  return (
    <>
      <div className="header">
        <div className="header-main-container">
          <div className="header-title">
            <span className="header-name" key="static-name">Neverett</span>
          </div>

          <div className="header-items-container">
            <div className="header-item"><RealTimeClock/></div>
          </div>
        </div>
      </div>

      <div className="body">
        <div className="banner-container">
          <p className="banner-title">
            Neverett
          </p>
          <p className="banner-description">
            Backend developer
          </p>
          
          <p className="banner-hint">
            <i>Scroll down to learn more!</i>
          </p>
        </div>
        <div className="about-container" id="about">
          <div className="about-content">
            <div className="about-title">
              About me
            </div>
            <div className="about-blocks-container">
              <div className="about-blockrow">

                <ListeningActivityBlock/>
                <ProfileBlock/>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-container">
          <div className="footer-content">
            <p>Neverett</p>
            <div className="footer-links">
              <a href="https://github.com/okiscape" target="_blank">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App