function getMaxDate() {
  const today = new Date();
  const year = today.getFullYear() + 10; // Добавляем 10 лет к текущему году
  const month = today.getMonth();
  const day = today.getDate();
  return new Date(year, month, day).toISOString();
}

export default getMaxDate;
