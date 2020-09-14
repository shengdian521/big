$(function () {
  var layer = layui.layer
  var form = layui.form
  var laypage = layui.laypage
  template.defaults.imports.dataFormat = function (date) {
    const dt = new Date(date)
    var y = dt.getFullYear()
    var m = padZero(dt.getMonth() + 1)
    var d = padZero(dt.getDate())
    var hh = padZero(dt.getHours())
    var mm = padZero(dt.getMinutes())
    var ss = padZero(dt.getSeconds())
    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
  }
  // 定义补零的函数
  function padZero(n) {
    return n > 9 ? n : '0' + n
  }
  var q = {
    pagenum: 1,
    pagesize: 2,
    cate_id: "",
    state: ""
  }
  // 获取文章列表数据
  get()
  function get() {
    $.ajax({
      method: 'GET',
      url: '/my/article/list',
      data: q,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取文章列表失败！')
        }
        // 使用模板引擎渲染页面的数据
        var htmlStr = template('tpl-table', res)
        console.log(res);
        $('tbody').html(htmlStr)
        // 调用渲染分页的方法
        fenye(res.total)
      }
    })
  }
  initcate()
  function initcate() {
    $.ajax({
      method: 'GET',
      url: "/my/article/cates",
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg('获取分类失败！')
        }
        var htmlStr = template("tpl-cate", res)
        $("[name=cate_id]").html(htmlStr)
        form.render()
      }
    })
  }
  $("#form-search").on("submit", function (e) {
    e.preventDefault()
    var cate_id = $("[name=cate_id]").val()
    var state = $("[name=state]").val()
    q.cate_id = cate_id
    q.state = state
    get()
  })
  // 分页
  function fenye(total) {
    laypage.render({
      elem: 'pageBox', // 分页容器的 Id
      count: total, // 总数据条数
      limit: q.pagesize, // 每页显示几条数据
      curr: q.pagenum, // 设置默认被选中的分页
      layout: ["count", "limit", "prev", "page", "next", "skip"],
      limits: [2, 3, 5, 10],
      jump: function (obj, first) {
        q.pagenum = obj.curr
        q.pagesize = obj.limit
        // 根据最新的q获取对应的数据列表，并渲染表格
        if (!first) {
          get()
        }
      }
    })
  }

  $("body").on("click", ".btn-delete", function () {
    var len=$(".btn-delete").length
    var id = $(this).attr("data-id")
    layer.confirm('要删除吗', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/delete/' + id,
        success: function(res) {
          if (res.status !== 0) {
            return layer.msg('删除文章失败！')
          }
          layer.msg('删除文章成功！')
          if(len==1){
             q.pagenum=q.pagenum===1?1:q.pagenum-1
          }
          get()
        }
      })
   
    })
  })
})