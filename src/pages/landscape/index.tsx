import Header from "../../components/header"

import ListeningActivityBlock from "../../components/listeningActivity"
import ProfileBlock from "../../components/profile"

import "./landscape.css"


function App() {
  return (
    <>
      <div className="header">
        <Header/>
      </div>

      <div className="body">
        <div className="banner-container">
          <p className="banner-title">
            Neverett
          </p>
          <p className="banner-description">
            Fullstack developer
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