export const formatDateString = (dateString: string) => {
  const [year, month, day] = dateString
    .replace("년", "")
    .replace("월", "")
    .replace("일", "")
    .trim()
    .split(" ");

  const formattedMonth = month.length === 1 ? `0${month}` : month;
  const formattedDay = day.length === 1 ? `0${day}` : day;

  return `${year}-${formattedMonth}-${formattedDay}`;
};
