$(function(){
    get()
    var layer = layui.layer
    var form = layui.form
    function get(){
        $.ajax({
            type:"get",
            url:"/my/article/cates",
            success:function(res){
                console.log(res.data);
              var htmlstr=template("tpl-table",res)
              $("tbody").html(htmlstr)
            }
        })
    }
    let index=null
    $("#btntianjia").click(function(){
        index=layer.open({
            type:1,
            area: ['500px', '250px'],
            title: '添加文章分类'
            ,content: $("#hhh").html()
          }); 
    })
    $("body").on("submit","#tanchu",function(e){
        e.preventDefault()
        $.ajax({
            method:"post",
            url:"/my/article/addcates",
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg("添加失败")
                }
                get()
                layer.msg("添加成功")
                layer.close(index)
            }
          
        })
       
    })
    var index2=null;
    $("body").on("click","#bianji",function(){
        index2=layer.open({
            type:1,
            area: ['500px', '250px'],
            title: '修改文章分类'
            ,content: $("#hhhh").html()
          });
          var id=$(this).attr("data-id")
          $.ajax({
              method:"get",
              url:"/my/article/cates/"+id,
              success:function(res){
                form.val("form-edit",res.data)
                console.log(res.data);
              }
          })
    })

    $("body").on("submit","#xiugai",function(e){
       console.log( $(this).serialize());
        e.preventDefault()
        $.ajax({
            method:"post",
            url:"/my/article/updatecate",
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg("修改文章失败")
                }
                layer.msg("修改文章成功")
                layer.close(index2)
                get()
            }
        })
    })

$("body").on("click","#shanchu",function(){
    var id=$(this).attr("data-id")
    layer.confirm('要删除吗', {icon: 3, title:'提示'}, function(index){
       $.ajax({
           method:"get",
           url:"/my/article/deletecate/"+id,
          success:function(res){
            if(res.status!==0){
                return layer.msg("删除失败")
            }
            layer.msg("删除成功")
            layer.close(index);
            get()
          }
       })
       
      });
})


})