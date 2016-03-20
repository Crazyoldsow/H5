### 移动端开发知识点

##### 首先是px dpr dpi(ppi) pt 

* px: 浏览器使用的抽象单位 css中的 属于浏览器设计的一种逻辑像素  设备独立像素
* dp: 设备独立像素, 人称设备无关像素.也就是设备的物理像素 dip 与dp相同一般用于android/ophone中 
    * 在每英寸160点的显示器上面 1dp = 1px;
* pt: 用于印刷业是一个标准的长度单位  1pt = 1/72英寸
* dpr: 设备的缩放比 是px和dp之间的比值  公式是: 1px = dpr^2 * dp(pt);
    * x方向上或者y方向上面： 设备像素比(dpr) = 物理像素(physical pixel)/设备独立像素(dip||px)
   
    * 在javascript中 可以通过window.devicePixelRatio 获取到当前设备的dpr.
        * ![dpr测试图片1](http://7xlqb6.com1.z0.glb.clouddn.com/dpr%E6%B5%8B%E8%AF%95%E5%9B%BE%E7%89%871.png)
        * ![dpr测试图片2](http://7xlqb6.com1.z0.glb.clouddn.com/dpr%E6%B5%8B%E8%AF%95%E5%9B%BE%E7%89%872.png)
    * css中,可以通过 -webkit-device-pixel-ratio, -webkit-min-device-pixel-ratio 和 -webkit-max-device-pixel-ratio 进行媒体的查询 
    * <font color = "red">要想在不同分辨率的情况下得到的都是清晰的图片那么就只能在不同dpr下获取不同尺寸的图片</font>
        * devicePixelRatio 是在DOM API里的 用来表示当前屏幕的密度  现有的设备桐乡有 0.752 1 1.5 2 等数值 
        * [这里是一个我看到的简单的兼容各个屏幕dpr的代码](https://github.com/amfe/lib-flexible/issues/11)
        * 上面的代码的缺点是安卓机下面dpr都等于1 了，但是实际情况是dpr五花八门 
* ppi: 指的是屏幕每英寸的像素数量 ppi越高 单位dp 就会越多 图像就会越清晰 ppi的计算公式是对角线的dp(pt)数，在retina高清屏下面一般ppi都是大于等于2的.

##### 移动端下面1px 的偏差问题

* 对于retina屏幕来说1px = 2dp 所以一像素边框的话会显示的比较粗
    * 解决方案： scale(0.5)
    
        .border{position:relative;}
        .border:before{
            content: "";
            position:absolute;
            top:-1px;
            left:0px;
            border-top:1px solid #ccc;
            -webkit-transform:sacle(0.5);
            transform:scale(0.5);
        }

##### 多行文本的溢出情况
    * 单行文本溢出：
        * 主要代码是 `overflow:hidden;text-overflow:ellipsis;white-space:nowrap;`
        * 多行文本溢出：
            .inaline {
                display: -webkit-box !important;
                overflow: hidden;
                text-overflow:ellipsis;
                word-break:break all;
                -webkit-box-orient:vertical  //这是写文本的方向的
                -webkit-line-clamp: 3  //number: 显示几行
            }

##### viewport 
    * 默认的情况下如果没有写viewport的meta标签的话就会在手机页面上显示PC端的页面  默认的是以viewport = 980 的宽度显示的
    * 
    
##### rem 
    * 相比于em : em 是根据父级元素的宽高来计算该元素的宽高，但是如果嵌套太多层的话就很难计算子集元素的宽高了
    * rem: 是相比较于根元素(html)里面的元素来计算其后代元素的宽高这样可以很方便的计算出后级元素的宽高
        * 一副720px的设计稿可以在html里面的设置：html{font-size:100px;}  然后如果有一个200px宽度的div其width:2rem;
        * 一般在不同分辨率的屏幕下面的做法是利用media 的 screen来根据屏幕大小改变font-size的大小
    * 字体应该使用px而不能使用rem因为在PC或者大一点的屏幕上字体显示会很大，按说移动端的规定是在大屏上面一行显示的字数比小屏上多而不是大
    
##### click tap穿透
    * 300ms延迟： 移动设备访问的web页面都是PC上的页面，在默认的情况下viewport是980px的页面，往往都是需要双击或者捏开放大的页面，而正是为了确认用户单击or双击，safari需呀一个300ms来判断，而后来慢慢演变成了一个这个的设计。所以在移动端用tap来代替
    
    * tap 穿透 ： 在移动端点击一个蒙层后蒙层消失后会使得下面身上带click的元素也被触发，
        1. 加一个和蒙层相同大小的透明的蒙层，让它来接受下面上面穿透的那个tap 
        2. 加一个动画300ms再让这个蒙层消失
        3. 统一使用tap事件 ，但是这个方法不是很靠谱，因为在里面的会有一些原生的input 等等
        4. 改用fastclick库

##### BUG

    *　在安卓机子下面没有touchend touchstart&touchmove 只会触发一次
        * 修复：在touchmove 里面加入：event.preventdefault() ，但是导致在页面不会滚动，所以如果页面需要滚动的话就不适合用这个


##### 开启局部的弹性滚动

    body {
        overflow:scroll;
        -webkit-oveflow-scrolling: touch;
    }
    
<font color = "red">安卓不支持此功能</font>

##### 有关移动端的字体设置
    1. 行宽
        * 理想阅读的行宽是65个字符, 航款式产生的物理长度，与字体的大小设计间距等无关. 
        * 移动端的行宽肯定没有办法达到这个值，这个目前没有普遍的一个标准，但是在传统上 报纸或者是每一个窄行都会趋于39个字符,
    2. 宽松行距,紧凑行距
        * 行之间的空白 太紧凑的话有时会看叉行，太宽的话会阻断视线流
        * 行距的标准通常是1.4em ，但是一般来说有点紧凑
    3. 最好的状态
        * 最佳状态 --- 多数笔画通常都能排在像素网格中 --这样看起来会比较的好看
        * 在移动设备上面需要使用X 的高度来代替[即小写字母x的高度]
        * 大脑的识别是文字的顶部，而不是底部，所以要确保文字的顶部最契合像素
    4. 移动端的起伏边
        * 以中文为例，每一行的字数因为标点的问题也许不是很一致，然后就会产生起伏边这样子。
        * 解决方法: 在文字里面加上text-align : justify;  [见移动端开发/右端对齐例子]
        * 如何控制标点符号避免在首或者尾也就是每一行的第一个字，或者是最后一个字，做法是word-break:break-all;
    5. 减少反差
        * 桌面的标题跟正文字号差距为2-3 倍. 
        * 多数设计师使用斐波那契数列的字号组合，在移动端应该缩小比例反差
            * 比如你用黄金比例1.618 与字号相乘 在移动端就用 1.382 来代替
    6. 调整字间距
        * 一般情况下不支持使用这个方法
        * 具体情况具体对待
##### line-height的问题：

1. line-height: 用途是让我们的文本可以在父级元素中居中显示

    1. line-height 的定义：
        * normal 默认设置合理的行间距
        * number: 这个数字会与当前的字体尺寸进行相乘来设置成行间距
        * length: 设置成固定的行间距
        * % : 基于当前字体尺寸的百分比设置行间距
        * iherit: 从父级元素继承line-height 属性的值
        
    2. <font color = "red">布局的时候出现的问题：　字体很大的时候，字体和父级之间有一些空隙</font>
        * 产生原因：line-height 与font-size 的计算值得差(行距)分成了两半 分别加到了上下
                空白间距 = line-height – font-size
        * 解决方法： 给父容器添加line-height:100%; 
                举个例子： 一个容器的高度： 80px  line-height:60px;
                    normal：情况下计算出来的上下间距各为6px;
                    number: 2 上下空白间隙为20px
                    100%: 没有行间距
                    inherit: 根据父级的line-height 进行设置
    3. 使用flex布局的是偶一定要写上各种的兼容模式
        1. <font color="red">遇到的问题： 安卓4.3的手机下面flex布局会有问题</font>
            * 解决方法： hack的处理方法： flex布局的时候 width:0 而不是写一个宽度
    
* <font color = "#F87219" size = "2px"> 参考资料</font>
    * [http://www.html-js.com/article/Mobile-terminal-H5-mobile-terminal-HD-multi-screen-adaptation-scheme%203041](http://www.html-js.com/article/Mobile-terminal-H5-mobile-terminal-HD-multi-screen-adaptation-scheme%203041)
    * 慕课网移动webapp开发知识点
    * [https://leohxj.gitbooks.io/front-end-database/content/user-interface/mobile-fonts.html](https://leohxj.gitbooks.io/front-end-database/content/user-interface/mobile-fonts.html)
