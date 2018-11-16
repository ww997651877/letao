// 需求：如果当前用户是未登录的，拦截到登录页
// 需要发送ajax请求询问后台，当前用户的登录状态
$.ajax({
  type: "get",
  url: "/employee/checkRootLogin",
  dataType: "json",
  success: function(info) {
    console.log(info);
    if(info.success) {
      // 用户已登录
      console.log("用户已登录，继续访问");
    }
    if(info.error === 400) {
      location.href = "login.html";
    }
  }
})