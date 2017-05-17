# LESS介绍及其与Sass的差异
##1、LESS介绍
LESS和Sass在语法上有些共性，比如下面这些：

● 混入(Mixins)——class中的class；

● 参数混入——可以传递参数的class，就像函数一样；

● 嵌套规则——Class中嵌套class，从而减少重复的代码；

● 运算——CSS中用上数学；

● 颜色功能——可以编辑颜色；

● 名字空间(namespace)——分组样式，从而可以被调用；

● 作用域——局部修改样式；

● JavaScript 赋值——在CSS中使用JavaScript表达式赋值。

##### LESS和Sass的主要不同:

1. 他们的实现方式，LESSS是基于JavaScript，所以，是在客户端处理的。

1. Sass是基于Ruby的，然后是在服务器端处理的。很多开发者不会选择LESS因为JavaScript引擎需要额外的时间来处理代码然后输出修改过的CSS到浏览器。关于这个有很多种方式，我选择的是只在开发环节使用LESS。一旦我完成了开发，我就复制然后粘贴LESS输出的到一个压缩器，然后到一个单独的CSS文件来替代LESS文件。另一个选择是使用LESS.app来编译和压缩你的LESS文件。两个选择都将最小化你的样式输出，从而避免由于用户的浏览器不支持JavaScript而可能引起的任何问题。尽管这不大可能，但终归是有可能的。

##2、Less 安装

[中文学习网站] : <http://less.bootcss.com/#>
####1、源码安装

1.下载less.js;

2.创建一个文件来放你的样式，比如style.less;

3.添加以下代码到你的HTML的<head>中:

	<link rel="stylesheet/less" type="text/css" href="styles.less"> 
	<script src="less.js" type="text/javascript"></script> 

>在浏览器上跑 less.js 非常方便开发，但是不推荐用于生产环境。

>在客户端使用 Less.js 是最容易的方式，并且在开发阶段很方便，但是，在生产环境中，性能和可靠性非常重要，我们建议最好使用 node.js 或其它第三方工具进行预编译。

####2、Less CDN 加速

CDN.

	<script src="http://cdn.bootcss.com/less.js/1.7.0/less.min.js"></script>
##3、Less 编译
#### 1) NPM
npm 安装

	$ npm install -g less
	
编译输出

	$ lessc styles.less > styles.css
	
编译输出并压缩

	$ lessc -x styles.less > styles.css


###  语法
##### 1、变量
	@nice-blue: #5B83AD;
	@light-blue: @nice-blue + #111;

	#header {
  		color: @light-blue;
	}

	//注意 {}
	
	// Variables
	@images: "../img";

	// 用法
	body {
  		color: #444;
  		background: url("@{images}/white-sand.png");
	}

##### 2、Mixin
	#header {
 	 	color: @light-blue;
	}

	//名称后面加括号表示只能被引用，不能输出到页面

	//#header() {
	//  color: @light-blue;
	//}
	#nav {
  		font-size: 3em;
  	
  		//引用的时候后面是否加括号都一样
  	
  		header();
	}
	
也可以嵌套伪类选择器
	
	.my-hover-mixin() {
  		&:hover {
    		border: 3px solid red;
  		}
	}
	button {
  	.my-hover-mixin;
	}
	
##### 3、嵌套
	#header {
  		color: black;
  		.navigation {
    		font-size: 12px;
  		}
  		.logo {
    		width: 300px;
  		}
	}

##### 4、运算
	@base: 5%;
	@filler: @base * 2;
	@other: @base + @filler;

	color: #888 / 4;
	background-color: @base-color + #111;
	height: 100% / 2 + @filler;
	@var: 1px + 5;
	
##### 5、函数

Less 内置了多种函数用于转换颜色、处理字符串、算术运算等。这些函数在函数手册中有详细介绍。

函数的用法非常简单。下面这个例子将介绍如何将 0.5 转换为 50%，将颜色饱和度增加 5%，以及颜色亮度降低 25% 并且色相值增加 8 等用法：

	@base: #f04615;
	@width: 0.5;

	.class {
  		width: percentage(@width); // returns `50%`
  		color: saturate(@base, 5%);
  		background-color: spin(lighten(@base, 25%), 8);
	}

##### 6、命名空间与访问器
	#bundle {
  		.button {
    		display: block;
    		border: 1px solid black;
    		background-color: grey;
    		&:hover {
      			background-color: white
    		}
  		}
  	.tab { ... }
  	.citation { ... }
	}
	
	#header a {
  		color: orange;
  		#bundle > .button;  //访问器
	}
##### 7、作用域

	@var: red;

	#page {
  		#header {
    		color: @var; // white
  		}
  		@var: white;
	}
	
##### 8、注释
	//content
	
	/*centent
	  centent */
##### 8、导入
和你预期的工作方式一样。你可以导入一个 .less 文件，此文件中的所有变量就可以全部使用了。如果导入的文件是 .less 扩展名，则可以将扩展名省略掉：

	@import "library"; // library.less
	@import "typo.css";