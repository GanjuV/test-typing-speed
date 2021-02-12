export const msToTime = (duration) => {
  let milliseconds = parseInt(duration % 1000),
    seconds = Math.floor((duration / 1000) % 60);
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return `${seconds}s:${milliseconds}ms`;
};
