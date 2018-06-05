---
title: 使用$route服务重复刷新AngularJS的局部视图
date: 2015-07-13 14:10:05
tags: [AngularJS]
---
使用AngularJS的前端MVC特性可以方便地开发大规模单页面应用，但前端MVC不同于传统的服务端MVC，angular的路由中，嵌入了“#”字符，当我们点击一个链接的时候，并不会直接向服务端发起请求，而是先由angular的$routeProvider服务（由ngRoute模块定义）监测到路由的变化，然后匹配到预设的路由，加载数据和html模板，对模板进行编译后生成视图，并嵌入到ng-view指令所在的位置。

这里存在一个问题，当我们重复点击一个链接的时候，如果路由没有发生变化，$routeProvider不会重复刷新数据。

通常一个webapp的结构结构如下：

```javascript
'use strict';
var app = angular.module("myApp", ['ngRoute']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/action', {
        templateUrl: 'action.html',
        controller: 'actionController'
    }).otherwise({
        redirectTo: '/action'
    });
}]);
```

加入在action.html视图中存在如下锚点：

```html
<a href="#action" >链接</a>
```

当重复点击该链接的时候，视图不会重复刷新。

我们可以给链接绑定一个点击事件，借助$location服务和ngRoute模块的$route服务实现视图的重复刷新。

定义一个名为“reload-when-click”的指令（对指令的语法不做解释，可参考其它资料）：

```javascript
app.directive('reloadWhenClick', ['$location', '$route',
    function ($location, $route) {
        return {
            restrict: "A",//仅通过属性识别
            link: function (scope, elem, attrs) {
                var href = elem.attr("href");
                elem.on('click', function () {
                    //href为#url，$location.path()的值为/url
                    if (href.substring(1) === $location.path().substring(1)) {
                        $route.reload();
                    }
                });
            }
        };
    }
]);
```

然后只要在链接中加入“reload-when-click”属性即可：

```html
<a href="#action" reload-when-click>链接</a>
```

$route服务可以监控$location.url()的变化，然后连接控制器和视图，实现局部视图的跳转。

这里通过自定义指令给需要重复刷新的路由强制执行reload()方法。