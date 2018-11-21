$(function() {


  render();

  // 读取本地存储，返回数组
  function getHistory() {
    var jsonStr = localStorage.getItem('search_list') || '[]';
    var arr = JSON.parse(jsonStr);
    return arr;
  }

  // 读取本地历史 根据数组 进行页面渲染
  function render() {
    var arr = getHistory();
    var htmlStr = template('search_tpl', {list:arr});
    $('.lt_history').html(htmlStr);
  }

  // 清空所有历史
  $('.lt_history').on('click','.btn_empty',function() {
    mui.confirm('你确定要清空历史记录吗？','温馨提示',['取消','确认'],function(e) {
      if (e.index === 1) {
        localStorage.removeItem('search_list');

        render();
      }
    })
  });

  // 删除单个历史记录
  $('.lt_history').on('click','.btn_delete',function() {
    var index = $(this).data('index');

    // 获取本地存贮的数组
    var arr = getHistory();

    // 根据下标，删除数组中的对应项
    arr.splice(index, 1);

    localStorage.setItem('search_list',JSON.stringify(arr));

    render();
  });


  // 添加单个历史记录功能
  $('.search_btn').click(function() {
    // 获取搜索关键字
    var key = $('.search_input').val().trim();

    if(key === '') {
      mui.toast('请输入搜索关键字');
      return;
    }

    var arr = getHistory();

    // 如果有重复项，需要先将重复项删除，后面再添加到最前面
    var index = arr.indexOf(key);
    if (index != -1) {
      arr.splice(index,1);
    }

    // 2.如果长度超过10个，删除最后一个pop()
    if (arr.length >= 10) {
      arr.pop();
    }

    arr.unshift(key);

    localStorage.setItem('search_list',JSON.stringify(arr));

    render();

    $('.search_input').val('');

    location.href = 'searchList.html?key=' + key;
  })
})