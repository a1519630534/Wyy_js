export default function (timestamp){

    // console.log(timestamp);
    if (timestamp) {
        let time = new Date(timestamp);
        let y = time.getFullYear(); //getFullYear方法以四位数字返回年份
        
        let M = time.getMonth() + 1; // getMonth方法从 Date 对象返回月份 (0 ~ 11)，返回结果需要手动加一
        let d = time.getDate(); // getDate方法从 Date 对象返回一个月中的某一天 (1 ~ 31)

        // console.log(y + '年' + M + '月' + d +'日');
        return y + '年' + M + '月' + d +'日';
      } else {
          return '';
      }
}