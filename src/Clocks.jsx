import { useState, useEffect } from "react";

export const Clock = ({ isTomorrow }) => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);
  const timeString = `${time}`.slice(16, 24);
  const tomorrow = new Date(time);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const renderTomorrow = `${tomorrow}`.slice(0, 16);
  return <>{!isTomorrow ? <h1>{timeString}</h1> : <h1>{renderTomorrow}</h1>}</>;
};
