var more_posts = [];
// 获取新的帖子函数
function loadmore(index) {
    $("#loadmore").css('display','none');//加载更多时，加载更多按钮隐藏
    $("#loading").css('display','block');//加载更多时，加载动画按钮出现
    $.ajax({
        'type':'post',
        'url': '/',
         async: false,
        'data': {
            'count': index,
        },
        'success': function (data) {
            if (data['code'] == 200) {
                // 获取到新的帖子后，返回保存到more_posts
                more_posts = data['data'];
            }
        }
    });
}

$(function () {
    // 第一次进入，执行，获取前10篇帖子
    var index = 0;//帖子起始值为0
    var posts;
    $.ajax({
        'type':'post',
        'url': '/',
        'data': {
            'count': index,
        },
        'success': function (data) {
            if (data['code'] == 200) {
                posts = data['data'];//获取到成功返回的帖子
                // 创建vue实例
                new Vue({
                    el: '#demo',
                    delimiters: ['[[', ']]'],//防止jinji2跟vue都是{{  }},我vue使用[[ ]]
                    data: {
                        main: posts //第一次获取到的十条帖子
                    },
                    methods: {
                        loadMore: function () { //加载更多执行的函数
                            index = index + 10;//增加十篇帖子
                            loadmore(index);
                                $("#loadmore").css('display','block');//loadmore（）函数结束  加载更多按钮显示
                                $("#loading").css('display','none');//loadmore（）函数结束  加载动画按钮消失
                                for (var i = 0; i < more_posts.length; i++) {
                                    var b = {
                                        'title': more_posts[i].title,
                                        'content': more_posts[i].content,
                                    };
                                    this. main.push(b);//将新的数据  推入main中
                                }
                        }
                    }
                })
            }
        }
    })
    // 向节点内插入新生成的数据
})
