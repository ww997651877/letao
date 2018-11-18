$(function() {
  
  var currentPage = 1;
  var pageSize = 5;
  // 一进入页面，发送ajax请求，获取数据，进行渲染
  render();
  function render() {
    $.ajax({
    type: 'get',
    url: '/category/queryTopCategoryPaging',
    data: {
      page: currentPage,
      pageSize: pageSize
    },
    dataType: 'json',
    success: function(info) {
      console.log(info);
      var htmlStr = template('firstTpl',info);
      $('tbody').html(htmlStr);

      // 分页初始化
      $('#paginator').bootstrapPaginator({
        bootstrapMajorVersion: 3,
        totalPages: Math.ceil(info.total / info.size),
        currentPage: info.page,

        onPageClicked: function( a, b, c, page) {
          currentPage = page;
          render();
        }
      });
    }
    });
  }
})