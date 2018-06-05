---
title: Angular单页面应用架构
date: 2016-06-01 10:39:05
categories: 
- ["framework", "angular"]
- ["language", "javascript"]
- test
tags: 
- angular.js
- test
---
如今Angular正处于十分尴尬的境地，因为要不了很久它也会被更加优秀和新奇的框架取代，但是angular的架构思路仍然具备重要的借鉴价值。

得益于angular非常完整的生态，各团队都能较为容易地开发出用户体验良好的web app。

但是，只有真正把一个应用越做越大，越做越复杂的时候，我们才能体会到一个软件架构的重要性，也才更能感受到架构的局限性带来的窘境。

angular的性能缺陷是先天性的，但应用规模很小的时候，这的确不值一提，因为显然，还有很多angular之外的优化点更值得关注。但人类的天性，总是会把事情越搞越大、越做越复杂。因此性能瓶颈的到来只是时间问题。

我期待今 Angular 2.0正式版推出的时候，我们希望能够小范围跟进，明 全方面铺展开，顺便的，也能更多地采用ES6的新特性。

在前端开发领域，有时候，哪种技术栈更优秀取决于哪个牛逼吹得更响，不信你找一群前端开发来问问他们angular和react哪个好。

##文件组织结构
绝大多数观点都是建议，将angular的代码文件按照业务模块进行组织，因为开发和维护某一个功能的时候，尽可能快地定位相关文件，是很能显著提高开发效率的，如果相关业务文件分散在不同文件夹，将会显得凌乱。并且，个人认为，前端开发工具的未来一定是向着IDE的趋势发展的（个人观点）。前端对编译器（翻译器）和调试器的需求正越来越强，尤其是前者。暂且忽略主要浏览器（Firefox 、Chrome、Edge）已支持WebAssembly技术的现实，typescript逐渐大众化，前端必须要懂翻译器。并且angular的开发语言也是typescript。
![Angular App代码组织结构](https://static.oschina.net/uploads/img/201606/01000245_RNAR.png "Angular App代码组织结构")

##路由系统
路由系统非常重要，在现代web应用开发中，没有路由系统，所谓单页面应用无从谈起。

angular自带的路由模块（ngRoute模块）不支持嵌套路由，提供的接口不够丰富。比较受推崇的是第三方的ui.router模块。当我们构建一个单页面应用，我们首先需要分析那一部分是需要动态切换的，哪一部分是一直固定不变的，然后针对动态切换的那一部分设计路由。当然，我们还可以继续给动态切换的各个页面继续细分，并设计二级路由。

出于性能的考虑，angular中的控制器是只有当需要的时候才会创建，页面切换的时候，新页面的控制器会被创建，旧页面的控制器会被销毁，同时会触发响应的$destroy事件。

在app中需要添加对路由模块的依赖：
```JavaScript
angular.module('myApp', ['ui.router']);
```  
然后在各个模块的控制器文件中（比如 module1.controller.js）定义路由：
```JavaScript
'use strict';
angular.module('myApp')
    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state("module1", {
                    url: "/module1",
                    templateUrl: '/app/module1/index.html',
                    controller: 'module1Controller'
                });
        }
    ])
    .controller('module1Controller', ['$rootScope', '$scope', '$log',
        function($rootScope, $scope, $log) {

        }
    ]);
```
当然也可以将所有路由定义在一个单独的代码文件中，这取决于不同团队的代码组织习惯。
当还需要设置app的默认路由，即当没有任何匹配的路由的时候，默认跳转的路径地址：
```JavaScript
'use strict';
angular.module('myApp')
    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            // 无任何匹配的时候，默认跳转到module1
            $urlRouterProvider.otherwise('/module1');
        }
    ]);
```
每一个app在最初创建的时候，应该分析该app可以划分为多少个模块，然后针对每个模块定义文件夹和路由名称，并且将代码文件（html模板文件、控制器、过滤器、服务、指令）名称都按照统一的风格命名好，将每一个控制器和一部分通用的服务、指令和过滤器定义好，然后其它开发人员再进行“填”代码的工作，这样比较容易能保证代码的良好结构和统一的风格。也能有效减少重复代码。
app设计初期的顶层设计工作至关重要，随着app规模不断扩大，其作用愈加明显。

##控制器
控制器本质上是为了实现局部作用域，一个函数（控制器）负责一个html模板的业务逻辑，控制器只在需要“激活”的时候才实例化，一方面减少了变量命名冲突，同时提升了性能和减少了资源占用（路由切换的时候旧的控制器会被销毁）。

##指令
指令本质上是angular对web组件的实现方式，复杂的angular单页面应用，几乎都是由众多的自定义指令（嵌套）组成。自定义指令，也是自定义html标签。
例如我们可以主页面划分为三部分:
```html
<body>
    <layout-header></layout-header>
    <div ui-view></div>
    <layout-footer></layout-footer>
</body>
```
uiView指令所定义的dom元素为路由所定义的子模块的插入点。子模块仍然可以细分为多个子模块，各子模块可以通过指令将业务代码及html模板分开，这样可以有效将任务分离及形成更好的代码组织方式。使用ng-if控制子模块的编译状态，提高性能。指令内可以嵌套定义。

为了提高代码的可维护性，通常建议将dom的操作均封装在指令内，而控制器内不进行dom操作。

##服务，常量
Angular提供多种注册服务的方法，如下所示：

|接口|含义|
|:-------------:|:-------------:|:-----:|
|provider|注册一个服务，该服务的特殊之处是，它可用config函数进行配置|
|constant|注册一个只读的变量|
|value|注册一个变量，可读写|
|factory|注册一个服务|
|service|注册一个服务|

Angular的所有服务为单例模式，通过注入的方式提供给各个控制器、服务、以及过滤器使用。

为了使我们的app架构更加科学和提高可维护，我们在每一个业务模块下的文件夹中，建立XX.sevice.js，里面包含该模块所需的各种服务。
由于angular的所有模块本质上是全局的，因此显然这些服务也可被其它模块使用，但是为了使我们的代码更加合理，我们应该将通用性强的服务写到一个公共的文件夹中。

每一个app中都会存在大量常量，我们可以使用constant方法非常方便地创建常量，并且自动地注入到所有需要的地方：
```JavaScript
'use strict';
angular.module('myApp')
    .constant('module1Contant', {
        week: {
            '0': '星期一',
            '1': '星期二',
            '2': '星期三',
            '3': '星期四',
            '4': '星期五',
            '5': '星期六',
            '6': '星期日'
        },
        other: {
            //...
        }
    });
```

上面的代码是将一周的七天映射为0-6的字符。
针对常量的数据结构，通常设计为字典的形式，比数组的方式更佳。尤其是用于过滤器的时候。

##过滤器
过滤器用于控制变量的展示。业务数据应当尽可能保留其原始的形态，当显示在界面的时候，通过控制器对齐进行转换，以对用户更友好，并且不修改原始值。
如下过滤器可以将0-6的数字转换成一个星期的每一天。
```JavaScript
'use strict';
angular.module('myApp')
    //将 0-6 转换成星期一、星期二……
    .filter('week', ['module1Contant', function(module1Contant) {
        return function(input) {
            return module1Contant.week[input];
        };
    }]);
```
##异常处理
angular各模块的异常均通过$exceptionHandler服务进行处理，系统应该重写该服务，以实现自己的异常处理逻辑。
JavaScript由于是单线程，在app的构建过程中，局部出现的异常可能会导致整个app奔溃，重写该服务的好处是，整个app不会因为某一个controller、service、filter、directive出现异常而崩溃。
```JavaScript
angular.module('myApp')
    .factory('$exceptionHandler', ['$log', 'handles', function ($log, handles) {
        return function (exception, cause) {
            $log.error(exception);
            //处理异常
            handles.handleException(exception);
            //注意这里不再抛出异常
            //throw exception;        
        };    
    }]);
```
值得注意的是$exceptionHandler服务内部产生的异常会被自身处理。

##表单校验
Angular提供了ngMessages用于增强表单校验，用户需自定义校验函数扩充该模块。

```html
<script src="./angular-messages.min.js">
```

```Javascript
angular.module('MyApp', ['ngMessages']);
```

通过指令的方式扩充表单校验模块，此处我们定义指令 appValidator：
```JavaScript
'use strict';
angular.module('myApp')
    .directive('appValidator', ['$log', function($log) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function($scope, elem, attrs, ctrl) {
                //校验ip地址
                var isIp = function(str) {
                    var re = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]|\*)\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]|\*)\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]|\*)\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]|\*)$/;
                    return re.test(str);
                };
                if (attrs.hasOwnProperty('isIp')) {
                    ctrl.$validators.isIp = function(modelValue, viewValue) {
                        return viewValue ? isIp(viewValue) : true;
                    };
                }
            }
        };
    }]);
```

目前已为该指令添加了校验表单输入参数是否为ip地址的校验逻辑。
此时，只要在表单中添加appValidator指令，并且添加isIp属性，即可实现对该表单的输入是否是ip地址的校验。

```html
<form name="formName">
    <input type="text" app-validator is-ip name="ip" ng-model="params.ip" />
    <div ng-messages="formName.ip.$error">
        <div ng-messages-include="messagesTemplate"></div>
    </div>
</form>
```

当用户在表单中输入字符时，会即时对输入值进行校验。
可以看到，在表单中使用了ngMessages和ngMessagesInclude指令，该指令的组合用于显示校验的提示文本，其中ngMessagesInclude的值为html模板，可以在app的run函数中进行定义：

```JavaScript
'use strict';
angular.module('myApp', ['ngMessages'])
    .run(['$templateCache',
        function($templateCache) {
            //设置表单报错的模板
            var messagesTemplate = [
                '<div>',
                '<div ng-message="required">不能为空</div>',
                '<div ng-message="minlength">参数太短</div>',
                '<div ng-message="isIp">不是合法的IPV4地址</div>',
                '</div>'
            ].join('');
            $templateCache.put("messagesTemplate", messagesTemplate);
        }
    ])
```

可以看到模板中定义了各种校验状态下对应的提示文本。对表单的所有校验结果均会存储在formName.ip.$error变量中，ngMessage指令对应的属性值会作为key从formName.ip.$error中取值，如果值为true，则显示相应的提示文本。如果出现多个校验均不通过，则优先显示靠前的提示文本。
也可以通过后台进行异步的数据校验，校验函数的定义方式大致如下：

```JavaScript
ctrl.$asyncValidators.uniqueUsername = function(modelValue, viewValue) {
    var value = modelValue || viewValue;
    return $http.get('/api/users/' + value).
    then(function resolved(res) {
        if (res.data) {
            //用户名已经存在,验证失败,给下一个promise传递失败通知.
            return $q.reject('res.data');
        } else {
            //用户名不存在,验证成功.
            return true;
        }
    }, function rejected() {});
};
```

##绑定html
##动画机制
Angular提供了优雅的元素动画解决方案，需要与CSS3的animation属性配合使用。
```html
<script src="./angular-animate.min.js">
```

```JavaScript
angular.module('myApp', ['ngAnimate']);
```

添加了模块以后，angular会在dom操作的时候为dom添加特定的状态类。
支持如下指令：

|Directive|Supported Animations|
|:-------------:|:-------------|
|ngRepeat | enter, leave and move|
|ngView | enter and leave|
|ngInclude | enter and leave|
|ngSwitch | enter and leave|
|ngIf | enter and leave|
|ngClass | add and remove (the CSS class(es) present)|
|ngShow & ngHide | add and remove (the ng-hide class value)|
|form & ngModel | add and remove (dirty, pristine, valid, invalid & all other validations)|
|ngMessages | add and remove (ng-active & ng-inactive)|
|ngMessage | enter and leave|

比如如下dom：
```html
<div ng-if="state"></div>
```
当state的值由false变为true的时候，angular会自动为该元素添加.ng-enter类。
我们只要为该类定义一个动画样式即可，如下为一个从右滑动到原始位置的并出现回弹效果的动画定义：

```CSS
@keyframes bounceInRight {
    0%,
    100%,
    60%,
    75%,
    90% {
        animation-timing-function: cubic-bezier(0.215, .61, .355, 1)
    }
    0% {
        opacity: 0;
        transform: translate3d(3000px, 0, 0)
    }
    60% {
        opacity: 1;
        transform: translate3d(-25px, 0, 0)
    }
    75% {
        transform: translate3d(10px, 0, 0)
    }
    90% {
        transform: translate3d(-5px, 0, 0)
    }
    100% {
        transform: none
    }
}
.ng-enter {
    animation-name: bounceInRight;
    animation-duration: 0.5s;
}
```

##性能优化
###JavaScript本身的性能
JavaScript的执行性能只能依赖浏览器针对JavaScript进行优化以及WebAssembly标准的落实。
由于JavaScript的单线程机制，如果页面内存在大量的密集计算，会导致界面的交互的卡顿或停止，应该应用HTML5提供的javascript多线程解决方案Web Workers来解决。
Web Workers的线程内不能操作Dom。
Dom元素结构本身比较复杂，操作dom是比较缓慢且耗时的，针对这个问题，能做的优化就是尽量减少dom操作的频率。

###Angular性能优化
针对 angular本身的性能优化主要集中在如下几点：
1) 优化$digest 循环
2) 优化ng-repeat
3) 优化过滤器和表达式
4) 渲染优化
5) 优化$watch表达式
6) 加载优化

一个核心概念与性能密切相关：更新周期（Digest Cycle）。
每一个域都会存放一个由方法组成的数组 $$watchers。
AngularJS并不直接调用$digest()，而是调用$scope.$apply()，后者会调用$rootScope.$digest()。因此，一轮$digest循环从根域$rootScope开始，随后会遍历所有的子域（children scope）中的watchers。

![输入图片说明](https://static.oschina.net/uploads/img/201606/01004719_W8Ay.png "在这里输入图片标题")
每在页面绑定一个模型，则watcher数就会+1，一个很简单的例子：

```JavaScript
$scope.data = 'hello world';
//就算把下面这个对象注释掉，页面仍然有三个watcher
$scope.obj = {
    name: 'Li Lei',
    age: '25 years old'
};
```

```Html
<div>
     {{data}} {{obj.name}} {{obj.age}}
</div>
```

![输入图片说明](https://static.oschina.net/uploads/img/201606/01004653_cBOu.png "在这里输入图片标题")

触发$digest的两种方式：
1. 自动触发，比如ng-click、ng-model、$timeout 等等
2. 手动触发，$scope.$apply()

关于 $digest需要注意以下几点：
1) $digest循环最少会运行2次
2) $digest循环会持续运行直到model不再发生变化
3) $digest循环默认最多运行10次
如何减少watcher数量？
解绑$watch对象，你可以用$watch的返回函数解绑

```JavaScript
var unbinder = scope.$watch('scopeValueToBeWatcher', function(newVal, oldVal) {
    //code
});
unbinder(); //这一行将watcher从 $$watchers 中移除。
```

优化$digest 调用，可以直接调用$scope.$digest()；

当 ng-repeat 的数组被替换时, 它默认并不会重新利用已有的 Dom 元素，而是直接将其全部删除并重新生成新的数组 Dom 元素。可使用 “track by” 减少dom的操作。
例如：
```Html
ng-repeat="x in list track by $index"
```

####优化过滤器和表达式
最佳实践：
位于视图中的每个过滤器将至少被调用1次，表达式会被执行至少三次，表达式应尽量简单
①	使用过滤器或者过滤服务；
②	尽量不要使用内联方法处理数据；

使用过滤器：
使用过滤器： \{ \{number1 \| toUpperCase \} \} 优于
使用函数：\{ \{ toUpperCase \( number1 \) \} \}

####渲染优化
1. ng-hide 和 ng-show 简单地对CSS display属性进行切换。dom还存在于域中， 所有的$$watchers还是会被触发；
2. ng-if 和 ng-switch 实际上将DOM中完全移除，相应的域也会被移除。
3. 适当使用 ng-if 和 ng-switch 代替 ng-hide/ng-show

####优化$watch表达式
$scope.$watch(watchExpression, Callback, objectEquality);
*watchExpression每次$digest都会执行两次：应尽量简单；
*objectEquality应尽可能设置为false，以避免深度比较；

####加载优化
使用Ajax加载模板会导致Web应用缓慢或者有卡顿
使用$templateCache缓存服务，优点：减少http请求次数，加快响应。
有两种方式显式启用缓存，在控制器中，可以这样：
```JavaScript
$templateCache.put('template.html','');
```

在html页面中可以这样：
```html
<script type='text/ng-template' id='template.html'>
    <div>Hi there</div>
</script>
```

###开发者需要注意的其它问题

![输入图片说明](https://static.oschina.net/uploads/img/201606/01003820_486M.png "在这里输入图片标题")
