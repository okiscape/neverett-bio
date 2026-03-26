import Block from "../block"
import "./main.css"
import Jeanne from "../../assets/jeanne.jpg"
import NyeJeanne from "../../assets/nye-jeanne.png"
import NyeAudio from "../../assets/nye.mp3"
import { useEffect, useRef, useState } from "react"
import { preload } from "react-dom"

const PROF_STACK_NDPT = import.meta.env.VITE_PROF_STACK_NDPT
const API_URL = import.meta.env.VITE_API_URL

interface ApiSkills {
  skills: {
    skillId: number,
    name: string,
    icon: string,
    aboutUrl: string,
    accentColor: string,
    secondaryColor: string,
    tags: string[]
  }[],
  ok: boolean
}

interface Skill {
  name: string,
  icon: string,
  aboutUrl: string,
  accentColor: string,
  secondaryColor: string,
  tags: string[]
}

preload(NyeAudio, {as:"image"});
preload(NyeJeanne, {as: "image"}); 
function App() { 
  const [playNyeClass, setPlayNyeClass] = useState<string>("")
  const [currentImageSrc, setCurrentImageSrc] = useState(Jeanne)

  const [stackIcons, setStackIcons] = useState<Skill[]>()
  const [stackCategories, setStackCategories] = useState<string[]>()
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) 
        ? prev.filter((t) => t !== tag) 
        : [...prev, tag] 
    );
  };

  async function updateStack() {
    const stackFetch = await fetch(`${API_URL}${PROF_STACK_NDPT}`)
    const _stack = await stackFetch.json() as ApiSkills
    const stack = _stack.skills.map((skill) => ({
      name: skill.name,
      icon: skill.icon,
      aboutUrl: skill.aboutUrl,
      accentColor: skill.accentColor,
      secondaryColor: skill.secondaryColor,
      tags: skill.tags
    }));
    setStackIcons(stack);
    const allTags = Array.from(
      new Set(_stack.skills.flatMap(skill => skill.tags || []))
    );

    setStackCategories(allTags);
  }

  function playNye() {
    if (playNyeClass) return;

    setPlayNyeClass("play-nye-class");

    const _nyeaudio = new Audio(NyeAudio)

    _nyeaudio.play();

    setTimeout(() => {
      setCurrentImageSrc(NyeJeanne);
    }, 1460);


    setTimeout(() => {
      setPlayNyeClass("");
      setCurrentImageSrc(Jeanne)
    }, 2000);
  }

  const tagsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    updateStack();
    
    const handleClickOutside = (event: MouseEvent) => {
      if (tagsRef.current && !tagsRef.current.contains(event.target as Node)) {
        setSelectedTags([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, [])

  return (
    <Block title="Profile">
      <div className="profile">
        <div className="profile-quick-container">
          <img src={currentImageSrc} onClick={playNye} className={`profile-avatar ${playNyeClass}`}/>
          <div className="profile-meta-container">
            <p className="profile-meta-title">
              Neverett
            </p>
            <p className="profile-meta-subtitle">
              Fullstack developer from Moscow, Russia
            </p>
          </div>
        </div>
        <p className="profile-text">
  Im neverett, i like to create QoL things, dreaming to create more
  prettier frontend, and to create the most useful and coolest APIs
  for something.<br/>
  Speaks russian(native), english ~b1-b2.<br/>
  Created a lot of bots(discord & telegram), custom API's with SQLite databases.<br/><br/>
  Under you can learn more of things that i had worked with.<br/>
  Hope you liked this website, you can leave a rating all below. 
        </p>
        <div className="profile-stack" ref={tagsRef}>
          <p className="profile-stack-title">My Tech Stack:</p>
          <div className="stack-tags-list">
            {stackCategories?.map(tag => (
              <div 
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`tag-button ${selectedTags.includes(tag) ? 'active' : ''}`}
              >
                #{tag}
              </div>
            ))}
          </div>
          <div className="profile-stack-container">
            {stackIcons && stackIcons.map((item) => {
              const isMatch = selectedTags.length === 0 || selectedTags.every(tag => item.tags.includes(tag));
              const isInactive = !isMatch;
              return (
                <a 
                  key={item.name}
                  className={`stack-skill ${isInactive ? 'inactive' : ''}`} 
                  style={{
                    '--accent-color': `#${item.accentColor}`, 
                    '--secondary-color': `#${item.secondaryColor}`,
                  } as React.CSSProperties}
                  href={item.aboutUrl}
                  target="_blank"
                >
                  <div className="stack-icon" dangerouslySetInnerHTML={{ __html: item.icon }} />
                  <p className="skill-name">{item.name}</p>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </Block>
  )
}

export default App