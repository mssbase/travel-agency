export const formatTime = time => {
  if(typeof(time) === 'number' && time > 0){
    const hours = Math.floor(time/3600);
    const secondsAfterHours = time-(hours*3600);
    const minutes = Math.floor(secondsAfterHours/60);
    const secondsAfterMinutes = secondsAfterHours - (minutes*60);
    const seconds = Math.floor(secondsAfterMinutes % 60);

    const formatHours = hours.toString().padStart(2, '0');
    const formatMinutes = minutes.toString().padStart(2, '0');
    const formatSeconds = seconds.toString().padStart(2, '0');

    const formatedTime = formatHours + ':' + formatMinutes + ':' + formatSeconds;
    return formatedTime;


  } else if (typeof(time) !== 'number' || time < 0 ) return null;
};