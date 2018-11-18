$(function() {
  var currentPage = 1;
  var pageSize = 5;

  var currentId;
  var isDelete;
  // 一进入页面，发送ajax请求，获取数据，进行页面动态渲染

  render();

  function render() {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function(info) {
        console.log(info);
        var htmlStr = template('tmp',info);
        $('tbody').html(htmlStr);
  
        // 进行分页初始化
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          totalPages: Math.ceil(info.total / info.size),
          currentPage: info.page,
          onPageClicked: function( a, b, c, page) {
            console.log(page);
            currentPage = page;
            render();
          }
        })
      }
    });
  }


  // 启用禁用按钮，事件委托
  $('.lt_content tbody').on('click','.btn',function() {
    // 显示模态框
    $('#userModal').modal('show');
    currentId = $(this).parent().data('id');

    isDelete = $(this).hasClass('btn-danger') ? 0 : 1;

  });

$('#confirmBtn').click(function() {
  $.ajax({
    type: 'post',
    url: '/user/updateUser',
    data: {
      id: currentId,
      isDelete: isDelete
    },
    dataType: 'json',
    success: function(info) {
      console.log(info);

      if (info.success) {
        $('#userModal').modal('hide');
        render();
      }
    }
  })

});

})