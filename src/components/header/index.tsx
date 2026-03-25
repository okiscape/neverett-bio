import { useEffect, useState } from "react";
import "./main.css"

function App() {
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

  return (
    <>
      <div className="header-main-container">
        <div className="header-items-container">
          <span className="header-item">Neverett</span>
        </div>

        <div className="header-items-container w-40">
          <div className="header-item"><RealTimeClock/></div>
        </div>
      </div>
    </>)
}

export default App