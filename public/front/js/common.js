



mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false, //是否显示滚动条
});


// 此方法专门用于解析获取地址栏参数
function getSearch (k) {
  // 获取参数栏信息
  var str = location.search;
  // 对中文解码
  str = decodeURI(str);
  // 去掉问号
  str = str.slice(1);

  var arr = str.split('&');

  var obj = {};

  // 遍历数组，取得键值对
  arr.forEach(function(v,i) {
    var key = v.split('=')[0];
    var value = v.split('=')[1];
    obj[key] = value;
  })

  // 将需要获取的对应属性返回
  return obj[k];
}