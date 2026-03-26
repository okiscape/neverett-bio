import Header from "../../components/header"

import ListeningActivityBlock from "../../components/listeningActivity"
import ProfileBlock from "../../components/profile"
import GitHubBlock from "../../components/github"
import BannerBlock from "../../components/top-banner"
import FooterBlock from "../../components/footer"

import "./landscape.css"

import Masonry from 'react-masonry-css';

const breakpoints = {
  default: 2,  // 3 колонки по умолчанию
  1024: 2,     // 2 колонки при ширине < 1024px
  640: 1       // 1 колонка при ширине < 640px
};

function App() {
  return (
    <>
      <div className="header">
        <Header/>
      </div>

      <div className="body">
        <BannerBlock/>
        <div className="about-container">
          <div className="about-content">
            <div className="about-title">
              About me
            </div>
            <Masonry
              breakpointCols={breakpoints}
              className="masonry-grid"
              columnClassName="masonry-column"
            >
              <ListeningActivityBlock/>
              <ProfileBlock/>
              <GitHubBlock/>
            </Masonry>
          </div>
        </div>
      </div>
      
      <div className="footer">
        <FooterBlock/>
      </div>
    </>
  )
}

export default App