// 未登录的用户被拦截
$.ajax({
  type: 'get',
  url: '/employee/checkRootLogin',
  dataType: 'json',
  success: function(info) {
    console.log(info);
    if(info.success) {
      console.log('已登录');
    }
    if(info.error === 400) {
      location.href = 'login.html';
    }
  }
});