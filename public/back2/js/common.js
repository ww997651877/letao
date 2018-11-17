// 进度条
$(document).ajaxStart(function() {
  // 第一个ajax发送时调用，开启进度条
  NProgress.start();
});

// 所有ajax请求完成时，关闭进度条
$(document).ajaxStop(function() {
  NProgress.done();
})