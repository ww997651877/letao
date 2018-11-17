$(function() {
  // 1.一进入页面，发送请求，获取数据进行渲染
  var currentPage = 1; //当前页
  var pageSize = 5; //每页条数

  render();

  // 根据currentPage和pageSize请求对应的数据，进行渲染
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function( info ) {
        console.log(info);
        // 根据模板引擎进行渲染
        var htmlStr = template("secondTpl",info);
        $('tbody').html(htmlStr);

        // 进行分页初始化
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3, //版本号
          totalPages: Math.ceil( info.total / info.size ),
          currentPage: info.page,
          onPageClicked: function( a, b, c, page) {
            // 更新当前页
            currentPage = page;
            // 重新渲染
            render();
          }
        })
      }
    })
  }

  // 2.点击添加按钮，显示添加模态框
  $('#addBtn').click(function() {
    // 显示添加模态框
    $('#addModal').modal('show');
    
  })

})