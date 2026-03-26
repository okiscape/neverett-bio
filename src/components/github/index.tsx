import { useEffect, useState } from "react";
import Block from "../block";
import "./main.css"; // Обычный импорт без переменных
import { get as neGet } from "node-emoji";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [profile, setProfile] = useState<{
    avatarUrl: string, username: string;
    status: {emoji: string, message: string};
    followers: number; following: number;
    totalStars: number; publicRepos: number
  }>();
  const [calendar, setCalendar] = useState<{
    total: number;
    weeks: {
      firstDay: string; 
      contributionDays: {
        contributionCount: number;
        date: string;
        weekday: number
      }[]
    }[]
  }>();

  useEffect(() => {
    async function fetchData() {
      try {
        const [pRes, cRes] = await Promise.all([
          fetch(`${API_URL}github/stats`),
          fetch(`${API_URL}github/calendar`)
        ]);
        const pData = await pRes.json();
        const cData = await cRes.json();
        setProfile(pData.stats);
        setCalendar(cData.calendar);
      } catch (e) {
        console.error("Fetch error", e);
      }
    }
    fetchData();
  }, []);

  if (!profile || !calendar) return <Block title="GitHub">Loading...</Block>;

  return (
    <Block title="GitHub">
      <div className="github-wrapper">
        <div className="github-header">
          <img src={profile.avatarUrl} className="github-avatar" alt="avatar" />
          <div className="github-info">
            <div className="github-info-title">
              <div className="github-info-name">{profile.username}</div>
              <div className="github-status">
                {neGet(profile.status.emoji)} {profile.status.message}
              </div>
            </div>
            <div className="github-stats">
              <div>Followers: {profile.followers}</div>
              <div>Total stars: {profile.totalStars}</div>
              <div>Follows: {profile.following}</div>
              <div>Public repo's: {profile.publicRepos}</div>
            </div>
          </div>
        </div>


        <div className="contributions-count">
          Total contributions: {calendar.total}
        </div>
        <div className="github-calendar">
          {calendar.weeks.map((week, wIdx) => 
            week.contributionDays.map((day, dIdx) => (
              <div 
                key={`${wIdx}-${dIdx}`} 
                className={`calendar-day ${day.contributionCount > 0 ? (day.contributionCount > 5 ? 'heavy' : 'active') : ''}`}
                title={`${day.date}: ${day.contributionCount}`}
              />
            ))
          )}
        </div>
      </div>
    </Block>
  );
}

export default App;