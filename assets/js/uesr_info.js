$(function(){
    var form=layui.form
    var layer = layui.layer
    form.verify({
        nickname:function(value){
                if(/(^\_)|(\__)|(\_+$)/.test(value)){
                  return '用户名首尾不能出现下划线\'_\'';
                }
                if(/^\d+\d+\d$/.test(value)){
                  return '用户名不能全为数字';
                }
        }
    })
    initinfo()
  var restbtn=null
    function initinfo(){
        $.ajax({
         type:"get",
         url:"/my/userinfo",
         success:function(res){
          console.log(res.data);
         if(res.status!==0){
             return layer.msg("获取用户信息失败")
         }
         form.val("formkk",res.data)
         restbtn=res.data
         }
        })
    }
    $("#resetbtn").click(function(e){
        e.preventDefault()
        form.val("formkk",restbtn)
    })
    // 监听表单提交
    $(".layui-form").submit(function(e){
        e.preventDefault()
        $.ajax({
            method:"post",
            url:"/my/userinfo",
            data:$(this).serialize(),
            success:function(res){
              if(res.status!==0){
                  return layer.msg("提交失败")
              }
              layer.msg("提交成功")
            //   获取index.js的方法重新渲染头像
              window.parent.get()
            }
        })
    })
})