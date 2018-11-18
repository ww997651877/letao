$(function() {

  var currentPage = 1;
  var pageSize = 3;

  // 1.一进入页面，发送请求，渲染页面
  render();

  function render() {
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function(info) {
        console.log(info);
        var htmlStr = template('productTpl', info);
        $('tbody').html(htmlStr);

        // 进行分页初始化
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          totalPages: Math.ceil(info.total / info.size),
          currentPage: info.page,
          onPageClicked: function( a, b, c, page) {
            console.log(page);
            // 更新当前页
            currentPage = page;
            // 重新渲染
            render();
          }
        });


      }
    })
  }

  // 2.添加按钮，显示添加模态框
  $('#addBtn').click(function() {
    $('#addModal').modal('show');

    // 发送ajax请求，请求所有的二级分类的数据，进行渲染
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function(info) {
        console.log(info);
        // 结合模板渲染
        var htmlStr = template('dropdownTpl',info);
        $('.dropdown-menu').html(htmlStr);
        
      }
    })
  });

  // 3.通过事件委托，给所有dropdown里面的a添加点击事件
  $('.dropdown-menu').on('click','a',function() {
    // 获取文本，设置给按钮
    var txt = $(this).text();
    $('#dropdownText').text(txt);

    // 获取id，设置给隐藏域
    var id = $(this).data('id');
    $('[name="brandId"]').val(id);
  });




})