/**
 * @fileOverview: scrollMonitor.js 树形菜单
 * @author: tianxiaoyun 
 * @contact: email misstian2008@163.com || 358926040
 * @version: 1.0
 * @external: [jquery.js]
 * @date: 2015-12
 */
;(function($,window,document,undefined){
    $.fn.scrollMonitor = function(options) {
        var defaults = {
                'monitorNav':'.floor-nav li',
                'curClass':'current',
                'container': $(window),
                'callback': $.noop
            };
        var params = $.extend({}, defaults, options || {});
        var i = 0;
        params.cache = [];//缓存数组
        $(this).each(function() {
            var top = $(this).offset().top -20;
            
            params.cache.push(top);
        });
        params.cache.push(document.body.offsetHeight);
        console.log(params.cache);
        var callback = function(call) {
            if ($.isFunction(params.callback)) {
                params.callback.call(call.get(0));
            }
        };
        var scrollFn = function(){
            var scrollTop = params.container.scrollTop();
            var index = monitor(scrollTop) ? monitor(scrollTop) : 0;
            $(params.monitorNav).eq(index).addClass(params.curClass).siblings().removeClass(params.curClass);

            function monitor(scrollTop){
                for(var i=0,len=params.cache.length;i<len;i++){
                    if(scrollTop >= params.cache[i] && scrollTop < params.cache[i+1]){
                        return i
                    }
                }
            }
            callback($(this));
            console.log($(this));

        }

        //加载完毕即执行
        scrollFn();
        //滚动执行
        params.container.bind("scroll", scrollFn);
        
    }

})(jQuery,window,document);

