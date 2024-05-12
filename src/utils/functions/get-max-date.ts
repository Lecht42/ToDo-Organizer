function getMaxDate() {
  const today = new Date();
  const year = today.getFullYear() + 10; 
  const month = today.getMonth();
  const day = today.getDate();
  
  return new Date(year, month, day).toISOString();
}

export default getMaxDate;
