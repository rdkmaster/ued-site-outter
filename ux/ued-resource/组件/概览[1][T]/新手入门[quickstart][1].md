## 预备知识

建议按照章节顺序学习，效果更佳。

### HTML5 / CSS3 相关知识

Jigsaw的组件大大弱化了开发者的 HTML5 / CSS3 的技能要求，因此这方面的内容只要大概了解一下即可，在无需非常深入学习的前提下，也可以继续下一步的学习，或者直接上手开发，边写代码边学习。

推荐的内容：（待补充）

### ES6相关知识

现代化网页开发必备技能之一，如果你是一个彻头彻尾的新手，或者还没掌握ES6，那请先学习一下阮一峰的[《ECMAScript 6 入门》](http://es6.ruanyifeng.com/)。

如果你非常忙，没有时间把书看完，那么我建议你着重阅读如下的小节。在通读全书的时候，也请着重阅读如下小节。

- let 和 const 命令 <http://es6.ruanyifeng.com/#docs/let>
- 变量的解构赋值 <http://es6.ruanyifeng.com/#docs/destructuring>
- Set 和 Map 数据结构 <http://es6.ruanyifeng.com/#docs/set-map>
- Promise 对象 <http://es6.ruanyifeng.com/#docs/promise>
- Iterator 和 for...of 循环 <http://es6.ruanyifeng.com/#docs/iterator>
- 修饰器 <http://es6.ruanyifeng.com/#docs/decorator>

以上列表是我假设你已经熟悉了ES5的前提下给出来的，如果你连ES5都不熟悉，那还是请乖乖的把整本书看完吧。

### TS相关知识

所有基于Angular或者Jigsaw的页面都必须采用[TypeScript](https://www.tslang.cn)语言编码，如果你还不了解它，那请先[学习](https://www.tslang.cn/docs/home.html)一下这门语言。

莫慌！如果你已经熟悉了ES6，那只要简单的浏览一下TS的语法即可，无需专门学习；甚至你都可以跳过这一步，在以后的日子里边写代码边学也可以。

如果你非常忙，那么我建议你着重阅读如下的小节：

- 类型相关，这部分是TS的精华
    - [基础类型](https://www.tslang.cn/docs/handbook/basic-types.html)，建议仔细阅读；
    - [枚举](https://www.tslang.cn/docs/handbook/enums.html)，建议仔细阅读；
    - [类型推论](https://www.tslang.cn/docs/handbook/type-inference.html)，建议简单了解；
    - [类型兼容性](https://www.tslang.cn/docs/handbook/type-compatibility.html)，建议简单了解；
    - [高级类型](https://www.tslang.cn/docs/handbook/advanced-types.html)，建议仔细阅读；
- 语言相关，如果你已经熟悉了ES6，则如下内容可以快速过一下就好
    - [变量声明](https://www.tslang.cn/docs/handbook/variable-declarations.html)，基本上可直接跳过；
    - [函数](https://www.tslang.cn/docs/handbook/functions.html)，箭头函数的语法一定要学扎实，非常重要；
    - [泛型](https://www.tslang.cn/docs/handbook/generics.html)，建议了解一下，至少要能看懂其语法；
    - [装饰器](https://www.tslang.cn/docs/handbook/decorators.html)，建议只了解语法，会用就行啦，无需理解其原理；
- OOP相关，这是TS另一个非常有价值的功能
    - [接口](https://www.tslang.cn/docs/handbook/interfaces.html)，建议了解语法；
    - [类](https://www.tslang.cn/docs/handbook/classes.html)，建议仔细阅读；
- 项目配置，普通开发可以无视，TL必须了解，且越多越好
    - [tsconfig.json](https://www.tslang.cn/docs/handbook/tsconfig-json.html)
    - [编译选项](https://www.tslang.cn/docs/handbook/compiler-options.html)

## Angular

Angular的概念很多，知识点也不少，但值得庆幸是你无需学习完所有的概念才能开工，只要学习和理解**模块**和**组件**两大概念，即可开工干活了，如果你要开发的是一个SPA（单页应用），那么还需要再学习**路由**的相关知识。注意，ES6、TS、Angular都有各自的模块概念，初学者容易混淆，[这个文章](https://angular.cn/guide/architecture#模块)做一些阐述。

Angular所有概念的学习材料，都可以在 <https://angular.cn/docs> 找到。这里提供的是一站式的所有资料，因此别去搜索引擎找了，多数没啥价值。只要耐心将这里列出的知识点都阅读一两遍，就可以完全满足日常开发所需，多数bug也可以在这里找到答案。**强烈建议**初学者优先阅读官方的[《英雄指南》](https://angular.cn/tutorial)这一系列文章，它以从零开发一个简单SPA为线索介绍了Angular的所有基础知识。学习完了[《英雄指南》](https://angular.cn/tutorial)之后，再按需阅读“核心知识”章节的内容。这个过程约需要花掉2到3天的时间。

以下是其他学习途径：

- 有问题需要询问的话，可以到[这里](http://ngfans.net)发帖询问，我会在上面帮你解答；
- 推荐一下大漠穷秋的[入门视频](http://ngfans.net/category/2/videos)，非常棒，推荐自学能力弱的同学仔细观看，动手编码；
- 这里是一些[优质学习资源](http://ngfans.net/topic/5/post)，东西较多，建议有了一定基础之后再按需学习。

## Jigsaw

待补充。。。


## 更新记录
- 20180218 新建。