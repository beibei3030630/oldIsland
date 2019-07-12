const formatMonth = date => {
  // 转换为中文数字月份
  const currentMonth =date.getMonth();
  const monthArr = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  return monthArr[currentMonth];
}
const formatYear=date=>{
  const currentYear=date.getFullYear();
  return currentYear;
}
export{
  formatMonth,formatYear
}