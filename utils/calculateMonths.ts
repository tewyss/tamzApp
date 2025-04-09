const getLastMonths = (count: number) => {
    const months = [];
    const today = new Date();
  
    for (let i = count - 1; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      months.push(`${year}-${month}-01`);
    }
  
    return months;
  };
export default getLastMonths;