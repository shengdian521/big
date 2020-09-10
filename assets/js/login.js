$(function(){
   $("#link_reg").on("click",function(){
      $(".reg_box").show()
      $(".login_box").hide()
   })
   $("#link_login").on("click",function(){
    $(".reg_box").hide()
    $(".login_box").show()
   })
   // 从layui中获取form对象
   // 类似于jq
   var form=layui.form
   var layer = layui.layer
   form.verify({
      username: function(value, item){ //value：表单的值、item：表单的DOM对象
        if(/(^\_)|(\__)|(\_+$)/.test(value)){
          return '用户名首尾不能出现下划线\'_\'';
        }
        if(/^\d+\d+\d$/.test(value)){
          return '用户名不能全为数字';
        }
      }
      //我们既支持上述函数式的方式，也支持下述数组的形式
      //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
      ,pass: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ],
      yz:function(value){
     var pwd= $(".layui-input[name=password]").val()
      if(pwd!=value){
         return "两次输入不一样"
      }
      }
    })
    
 $("#form-reg").on("submit",function(e){
   var data={
      username:$("#form-reg [name=username]").val(),
      password:$("#form-reg [name=password]").val()
    }
   e.preventDefault()
      $.post("/api/reguser",data,function(res){
      if(res.status !== 0){
          return layer.msg(res.message) 
           }
           layer.msg("成功")
           $("#link_login").click()
         })
      })
 $("#form-login").submit(function(e){
e.preventDefault()
$.ajax({
   url:"/api/login",
   type:"POST",
   data:$(this).serialize(),
   success:function(res){
   if(res.status !== 0){
       return layer.msg("登录失败")
   }
     layer.msg("登录成功")
   //   得到的token保存到localstorage
   localStorage.setItem("token",res.token)
     location.href = '/index.html'
}
})

 })
})
