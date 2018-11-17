// 进度条
$(document).ajaxStart(function() {
  // 第一个ajax发送时调用，开启进度条
  NProgress.start();
});

// 所有ajax请求完成时，关闭进度条
$(document).ajaxStop(function() {
  NProgress.done();
});


$(function() {
  // 公共功能
  // 功能1： 导航点击切换显示隐藏
  $('.lt_aside .category').click(function() {
    $(this).next().stop().slideToggle();
  });

  // 功能2：左侧列表切换功能
  $('.lt_topbar .icon_left').click(function() {
    $('.lt_aside').toggleClass('hidemenu');
    $('.lt_main').toggleClass('hidemenu');
    $('.lt_topbar').toggleClass('hidemenu');
  });

  // 功能3：退出功能
  $('.lt_topbar .icon_right').click(function() {
    // 点击按钮，显示模态框
    $('#logoutModal').modal('show');
  });

  // 模态框的按钮点击事件
  $('#logoutBtn').click(function() {
    $.ajax({
      type: 'get',
      url: '/employee/employeeLogout',
      dataType: 'json',
      success: function(info) {
        console.log(info);
        if (info.success) {
          location.href = 'login.html';
        }
      }
    });

  })
})