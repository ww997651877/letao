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
    
    // 发送ajax请求，获取下拉菜单的列表数据（全部的一级分类）
    // 通过分页获取一级分类的接口，模拟获取全部数据的接口，page=1,pageSize:100
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function(info) {
        console.log(info);
        var htmlStr = template('dropdownTpl', info);
        $('.dropdown-menu').html(htmlStr);
      }
    })

  });

  // 3.给下拉菜单的所有a添加点击事件，通过事件委托注册
  $('.dropdown-menu').on('click','a',function() {
    // 获取a的文本
    var txt = $(this).text();

    // 将文本设置给按钮
    $('#dropdownText').text( txt );
    
  });

  // 4.进行文件上传初始化
  $('#fileupload').fileupload({
    dataType: 'json',
    // 表示文件上传完成的回调函数
    done: function( e, data ) {
      console.log(data);
      // 后台返回的结果
      var result = data.result;
      // 获取文件上传的地址
      var picUrl = result.picAddr;
      // 设置给img的src
      $('#imgBox img').attr('src', picUrl);
    }
  })

})