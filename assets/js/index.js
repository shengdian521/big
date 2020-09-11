$(function(){
  get()
  var layer = layui.layer
  $("#tuichu").click(function(){
    layer.confirm('确认退出吗', {icon: 3, title:'提示'}, function(index){
        localStorage.removeItem('token')
        // 2. 重新跳转到登录页面
        location.href = '/login.html'
  
        // 关闭 confirm 询问框
        layer.close(index)
      });
  })
})
function get(){
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 有/my必须设置请求头
        // headers:{
        //     Authorization: localStorage.getItem("token") || ""
        // },
        success:function(res){
           if(res.status!==0){
               return layui.layer.msg("获取失败")
           }
           render(res.data)
        },
    })
}
function render(user){
     var name=user.nickname || user.username
     $("#welcome").html("欢迎&nbsp;&nbsp"+name)
     if(user.user_pic!==null){
        $(".layui-nav-img").attr("src",user.user_pic).show()
        $(".text-avatar").hide()
     }else{
        $(".layui-nav-img").hide()
        var first=name[0].toUpperCase()
        $(".text-avatar").html(first).show()
     }
}