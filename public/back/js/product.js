$(function() {

  var currentPage = 1; //当前页
  var pageSize = 3; //每页条数
  var picArr = []; //存储所有用于上传的图片

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

    // 将校验状态，改成VALID
    $('#form').data('bootstrapValidator').updateStatus('brandId','VALID');
  });

  // 4.进行文件上传配置
  $('#fileupload').fileupload({
    dataType: 'json',
    // 文件上传完成的回调函数
    done: function(e,data) {
      // console.log(data);
      
      var picObj = data.result; //后台返回的结果 （图片名称/图片地址）
      var picUrl = picObj.picAddr; //图片地址

      // 往数组的最前面追加
      picArr.unshift(picObj);

      // 结构上是往最前面添加
      $('#imgBox').prepend('<img style="height: 100px;" src="' + picUrl + '">');

      if (picArr.length > 3) {
        // 将最前面的保留，将最后面移除
        // 移除数组最后一项
        picArr.pop();
        // 移除图片结构中最后一个图片,找到最后一个图片类型的元素，进行删除,然他自杀
        $('#imgBox img:last-of-type').remove();
      }

      if (picArr.length === 3) {
        // 说明文件上传满 3 张了，picStatus 状态应该更新成 VALID
        $('#form').data('bootstrapValidator').updateStatus('picStatus','VALID');
      }
    }
  });

  // 5.进行表单校验初始化
  $('#form').bootstrapValidator({
     // 配置排除项，默认会对隐藏域进行排除，我们需要对隐藏域进行校验
     excluded: [],

     // 配置校验图标
     feedbackIcons: {
       valid: 'glyphicon glyphicon-heart',    // 成功
       invalid: 'glyphicon glyphicon-remove',    // 失败
       validating: 'glyphicon glyphicon-refresh'    // 校验中
     },

    //  配置校验字段
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },

      proName: {
        validators: {
          notEmpty: {
            message: '请选择商品名称'
          }
        }
      },

      proDesc: {
        validators: {
          notEmpty: {
            message: '请选择商品描述'
          }
        }
      },

      num: {
        validators: {
          notEmpty: {
            message: '请输入商品库存数量'
          },
          // 正则校验，非零开头的数字
          // \d => 数字 0-9
          // * 表示出现 0个或多个
          // ？表示串行 0个或1个
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '请输入非零开头的数字'
          },
        }
      },

      size: {
        validators: {
          notEmpty: {
            message: '请输入尺码'
          },
          // 校验需求：必须是xx-xx的格式，xx两位数字
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '必须是 xx-xx 的格式，xx两位数字'
          }
        }
      },

      oldPrice: {
        validators: {
          notEmpty: {
            message: '请输入商品原价'
          }
        }
      },

      price: {
        validators: {
          notEmpty: {
            message: '请输入商品现价'
          }
        }
      },

      // 专门用于标记文件上传是否满3张
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传三张图片"
          }
        }
      }



    }
  });

  // 6.注册表单校验成功事件，阻止默认的提交，通过ajax提交
  $('#form').on('success.form.bv', function(e) {
    e.preventDefault();

    var params = $('#form').serialize();  //获取所有 input 中的数据

    console.log(picArr);
    
    // 还要加上图片的数据
    // params += "&picName1=xx&picAddr1=xx"

    params += '&picName1='+ picArr[0].picName +'&picAddr1=' + picArr[0].picAddr;
    params += '&picName2='+ picArr[1].picName +'&picAddr2=' + picArr[1].picAddr;
    params += '&picName3='+ picArr[2].picName +'&picAddr3=' + picArr[2].picAddr;


    $.ajax({
      type: 'post',
      url: '/product/addProduct',
      data: params,
      dataType: 'json',
      success: function(info) {
        console.log(info);
        if (info.success) {
          // 关闭模态框
          $('#addModal').modal('hide');
          // 重新渲染第一页
          currentPage = 1;
          render();
          // 重置内容和状态
          $('#form').data('bootstrapValidator').resetForm(true);

          // 重置下拉按钮 和 图片内容
          $('#dropdownText').text('请选择二级分类');
          $('#imgBox img').remove();
        }
      }
    });


  })


})