export const formatTime = (time: number | string) => {
  return time.toString().length === 1 ? "0" + time : time;
};

export const convertTime = (timeStamp: number) => {
  const date = new Date(timeStamp * 1000);
  const hours = date.getHours().toString();
  const mins = date.getMinutes().toString();

  return {
    hours: formatTime(hours),
    mins: formatTime(mins),
  };
};
