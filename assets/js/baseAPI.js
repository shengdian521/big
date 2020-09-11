$.ajaxPrefilter(function(o){
 o.url="http://ajax.frontend.itheima.net"+o.url
 if(o.url.indexOf("/my/")!==-1){
    o.headers={
        Authorization: localStorage.getItem("token") || ""
     }
 }
//  全局挂载complete
// complete 调用ajax时不管成功还是失败都会调用
 o.complete= function(res){
    // console.log(res)
    // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      // 1. 强制清空 token
      localStorage.removeItem('token')
      // 2. 强制跳转到登录页面
      location.href = '/login.html'
    }
  }
})