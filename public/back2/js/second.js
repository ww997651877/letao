$(function() {
  var currentPage = 1;
  var pageSize = 5;
  render();

  function render() {
    $.ajax({
      type: 'get',
      url: "/category/querySecondCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function(info) {
        console.log(info);
        var htmlStr = template('secondTpl',info);
        $('tbody').html(htmlStr);

        // 进行分页初始化
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          totalPages: Math.ceil(info.total / info.size),
          currentPage: info.page,
          onPageClicked: function( a, b, c, page ) {
              currentPage = page;
              render();
          }
        });
      }
    });
  }

  $('#addBtn').click(function() {
    $('#addModal').modal('show');

    $.ajax({
      type: 'get',
      url: "/category/queryTopCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function( info ) {
        console.log(info);
        var htmlStr = template('dropdownTpl',info);
        $('.dropdow-menu').html(htmlStr);
      }
    })
  });


  
})