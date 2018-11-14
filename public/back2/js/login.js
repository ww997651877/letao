$(function() {
  // 1.进行表单校验配置
  //   校验要求：
  //   （1）用户名不能为空，长度为2-6位
  //   （2）密码不能为空，长度为6-12位
  $('#form').bootstrapValidator({

    // 配置校验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-heart',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',  // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 配置校验字段（需要现在input中配置name）
    fields: {

      username: {
        // 进行多个规则配置
        validators: {
          // 非空校验
          notEmpty: {
            // 校验提示
            message: "用户名不能为空"
          },
          // 长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: "用户名长度必须是2-6位"
          }
        }
      },

      password: {
        validators: {
          notEmpty: {
            message: "密码不能为空"
          },
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须是6-12位"
          }
        }
      },




    }

  })
})