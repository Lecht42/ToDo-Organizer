function getTodayISODate() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.toISOString();
}

export default getTodayISODate;
