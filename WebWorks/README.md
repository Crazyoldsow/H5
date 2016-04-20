## Web Worker

Javascript 被设计为运行在一个单线程的环境中，这就意味着多个脚本无法同时运行。考虑这么样一个需求, 你需要处理一个 UI 事件，查询和处理大量的API data,然后操作 DOM

JavaScript 将在CPU利用率很高的情况下挂起浏览器，
运行一个循环特别多的事件浏览器有时候会显示“A script on this page maybe busy,....” 建议你结束该脚本

#### 什么是 Web Workers

像上面的情况下就可以使用这个 Web Workers 。他会在不终端用户界面的情况下来做这些计算比较昂贵的任务，这个任务通常是在单独的线程中运行的

Web Workers 允许一个大的脚本在不打断其他脚本运行的情况下相应用户的click 等操作。然后在不打断页面响应的情况下执行该脚本

当一个Web Workes 脚本运行在外面，是不能获取到Web 页面的window 对象的，这也意味着它不可以直接操作web 页面的 DOM API. 尽管 Web Workers 不能阻塞浏览器渲染，但是他们也一直在利用 CPU 使得系统无响应


#### Web Workers 怎么工作？

它是一个 JavaScript 脚本文件，在这代码中设置了事件的监听，和主页面进行交流，

<pre>
	var worker = new Worker("bigLoop.js");
</pre>  

如果该文件存在，浏览器将开启一个新的线程，异步下载该脚本，如果没有找到该文件，线程将自动结束

如果你的应用中有多个这样的线程则使用 <code>importScript()</code>的方式将所有的脚本都引入该页面，文件名作为参数

<pre>
	importScript("bigLoop.js", "anotherHelper.js");
</pre>

当Web Workers 被触发，它和主页面的通信是用<code>postMessage()</code>来实现的，根据浏览器版本的不同，<code>postMessage()</code> 支持 string or  JSON 作为参数

在主页面接收Web Workers 响应的用的是<code>onMessage()</code> 事件，现在让我们来写一个<code>bigLoop.js</code> 以及主页面 <code>mian.html</code> 来观察一下

#### 结束进程

worker.terminate()

#### 处理错误

<pre>
worker.onerror = function(event){
	//...
}
</pre>

#### 查看浏览器是否支持

<pre>
	function myFunction(){
		if(Modernizr.webworkers){
			console.log("Congratulation!")
		}else{
			console.log("Sorry~ you do not have web Workers support")
		}
	}
</pre>

这个需要引入一个 Modernizr.min.js CDN 的链接地址为：[https://cdnjs.com/libraries/modernizr](https://cdnjs.com/libraries/modernizr)

#### 适用于worker的功能
1. navigator 对象
2. location 对象 (只读)
3. XMLHttprequest 
4. setTimeout() /clearTimeout() setInterval()/ clearInterval()
5. 应用缓存
6. 使用 importScript() 导入外部脚本的情况[上面有介绍呦]
7. 生成其他 Web Worker

#### 不适用情况
1. 操作DOM 
2. 访问window对象
3. 访问document对象
4. parent对象也就是调用它的文件



#### PS: <strong style="color:red;">我遇到的问题</strong>

1. 在学习的过程中，在chrome上面运行我写的代码，发现报错了：
	* main.html:12 Uncaught SecurityError: Failed to construct 'Worker': Script at 'your file path'...
	* 最后问题在stack overflow 上面找到了答案。阿西吧 这真是个神奇的网站哈哈具体答案见下面
	* [http://stackoverflow.com/questions/21408510/chrome-cant-load-web-worker](http://stackoverflow.com/questions/21408510/chrome-cant-load-web-worker)
	* 总体的意思就是说chrome 不支持, 我在safari 下面运行确实是好的 ：）
	
	
###### 参考文章
 * [http://www.html5rocks.com/zh/tutorials/workers/basics/#toc-introduction-jsconcurrency](http://www.html5rocks.com/zh/tutorials/workers/basics/#toc-introduction-jsconcurrency)
 * [http://www.tutorialspoint.com/html5/html5_web_workers.htm](http://www.tutorialspoint.com/html5/html5_web_workers.htm)







