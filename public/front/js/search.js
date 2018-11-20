$(function() {

  // 分析功能需求
  // 1.根据搜索历史，进行渲染展示功能
  // 2.清空所有历史
  // 3.删除单个历史记录
  // 4.添加历史记录

  // 功能1：根据搜索历史，进行渲染展示功能
  // （1）从本地存储中，读取历史数据
  // （2）读取出来是json字符串，转换成数组
  // （3）通过模板引擎进行渲染
  render();
  // 读取本地存储，返回数组
  function getHistory() {
    // 读取不存在的item时，返回null，应该进行处理
    var jsonStr = localStorage.getItem('search_list') || '[]';
    var arr = JSON.parse(jsonStr); //转成数组
    return arr;
  }

  // 读取本地历史，根据数组，进行本地渲染
  function render() {
      // 通过模板引擎进行渲染
    var arr = getHistory();
    var htmlStr = template('search_tpl', { list: arr });
    $('.lt_history').html(htmlStr);
  }


  // 功能2： 清空所有历史
  // (1)给清空记录添加点击事件（事件委托）
  // （2）清空所有历史记录数据 localStorage.removeItem('search_list')
  // (3)页面重新渲染
  $('.lt_history').on('click', '.btn_empty', function() {

    // mui 确认框
    // 参数1：确认框内容
    // 参数2：标题
    // 参数3：按钮文本 arr
    // 参数4： 关闭确认框的回调函数
    mui.confirm('你确定要清空历史记录吗？','温馨提示',['取消','确认'], function(e) {
      // e.index 表示点击按钮的小标
      if (e.index === 1) {
        // 移除本地历史
        localStorage.removeItem('search_list');

        // 重新渲染
        render();
      }

    });
  });

  // 功能3：删除单个历史记录
  // （1）通过事件委托 给所有的删除按钮，添加点击事件
  // （2）获取需要删除的项的下标，
  // （3）根据下标从数组中删除该项
  // (4)将修改后的数组，转成jsonStr，存储到本地
  // （5）重新渲染
  $('.lt_history').on('click', '.btn_delete', function() {
    // 获取下标
    var index = $(this).data('index');
    // 获取本地存储的数组
    var arr = getHistory();

    // 根据下标，删除数组中的对应项
    arr.splice(index,1)
    // 转成jsonStr,存储到本地
    localStorage.setItem('search_list',JSON.stringify(arr));

    // 页面重新渲染
    render();
  });

  // 功能4：添加单个历史记录功能
  // （1）给搜索按钮添加点击事件
  // （2）获取搜索框的内容
  // （3）添加到数组的最前面
  // （4）转成jsonStr，存储到本地
  // （5）重新渲染
  $('.search_btn').click(function() {
    // 获取搜索关键字
    var key = $('.search_input').val().trim();

    if (key === '') {
      // alert('请输入搜索关键字');
      mui.toast('请输入搜索关键字');
      return;
    }

    // 获取数组
    var arr = getHistory();

    // 功能需求：
    // 1.如果有重复项，需要先将重复项删除，后面在添加到最前面
    
    var index = arr.indexOf(key);
    if ( index != -1 ) {
      // 有重复项，要删除
      arr.splice(index,1);

    }
    // 2.如果长度超过10个，删除最后一个 pop()
    if (arr.length >= 10) {
      // 删除最后一个
      arr.pop();
    }



    // 添加到数组的最前面 unshift
    arr.unshift(key);

    // 转成jsonStr 存储到本地
    localStorage.setItem('search_list',JSON.stringify(arr));

    // 重新渲染页面
    render();

    // 清空搜索框的内容
    $('.search_input').val('');

    // 跳转到搜索页
    location.href = 'searchList.html?key=' + key;

  })



})