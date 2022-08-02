window.addEventListener('load', function () {
    // 1. 获取元素
    var arrow_l = document.querySelector('.arrow_l');
    var arrow_r = document.querySelector('.arrow_r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;

    // 轮播图主体ul 的宽度
    var focus_item = document.querySelector('.focus_item');
    focus_item.style.width = (focus_item.children.length + 1) * focus.offsetWidth + 'px';

    // 2. 鼠标经过focus 就显示隐藏左右按钮
    // mouseenter   鼠标经过显示按钮
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        // 鼠标经过停止定时器
        clearInterval(timer);
        timer = null; // 清除定时器变量
    })
    // mouseleave   鼠标离开显示按钮
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        // 鼠标离开开启定时器   不要加var，否则局部变量clearInterval 清不掉定时器
        timer = setInterval(function () {
            arrow_r.click();
        }, 2000);
    })

    // 3. 动态生成小圆圈  有几张图片，我就生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    // console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        // 创建一个小li 
        var li = document.createElement('li');
        // 把小li插入到ol 里面
        ol.appendChild(li);

        // 记录当前小圆圈的索引号 通过自定义属性来做   索引号
        li.setAttribute('index', i); //index 属性可返回下拉列表中选项的索引位置
        // setAttribute() 方法添加指定的属性，并为其赋指定的值。

        // 4.小圆圈的排他思想 我们可以直接生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function () {
            // 干掉所有人 把所有的小li 清除 current 类名
            for (var i = 0; i < ol.children.length; i++) {
                // 重要   className   类名
                ol.children[i].className = '';
            }
            // 留下我自己  当前的小li 设置current 类名
            this.className = 'current';

            // 5. 点击小圆圈，移动图片 当然移动的是 ul
            // animate(obj,target,callback);
            // ul 的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负值
            // 当我们点击了某个小li 就拿到当前小li 的索引号
            var index = this.getAttribute('index'); //getAttribute() 方法返回指定属性名的属性值。
            //当我们点击了某个小li就要把这个li 的索引号给 num；
            num = index;
            //当我们点击了某个小li就要把这个li 的索引号给 circle；
            circle = index;

            // focusWidth 在函数内是局部变量
            // var focusWidth = focus.offsetWidth;

            // console.log(focusWidth);
            // console.log(index);

            animate(ul, -index * focusWidth);
        })
    }
    // 把ol里面的第一个小li设置类名为 current
    ol.children[0].className = 'current'; //没有多余的小圆圈，因为克隆在for循环之后

    // 无缝滚动

    // 6. 克隆第一张图片(li)放到ul 最后面
    var first = ul.children[0].cloneNode(true); //cloneNode 克隆节点
    ul.appendChild(first); //appendChild() 方法向节点添加最后一个子节点

    // 7. 点击右侧按钮， 图片滚动一张
    var num = 0;
    //circle   圆圈   控制小圆圈的播放
    var circle = 0;

    // flag 节流阀
    var flag = true; // 关闭节流阀
    arrow_r.addEventListener('click', function () {
        if (flag) {
            // flag = false;
            // 如果走到了最后复制的一张图片，此时 我们的ul 要快速复原 left 改为 0
            if (num == ul.children.length - 1) {
                //ul.children.length - 1 = 4   ul.children.length多复制了一份 小li 的个数 5
                ul.style.left = 0;
                num = 0;
            }
            num++;
            // animate(obj, targin, callback);
            animate(ul, -num * focusWidth, function () {
                flag = true;
            }); // 回调函数后打开节流阀

            // 8. 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播
            circle++;
            // 如果circle == 4 说明走到最后我们克隆的这张图片 我们就复原
            if (circle == ol.children.length) {
                circle = 0;
            }

            //  先清除其余小圆圈的current类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            //  留下当前的小圆圈的current类名
            ol.children[circle].className = 'current';
        }
    })

    // 9. 左侧按钮做法
    arrow_l.addEventListener('click', function () {
        if (num == 0) {
            ul.style.left = -(ul.children.length - 1) * focusWidth + 'px'; //从第一张直接调到最后复制的一张
            num = ul.children.length - 1; //然后再第四张
        }
        num--;
        // animate(obj, targin, callback);
        animate(ul, -num * focusWidth);

        // 8. 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播
        circle--;
        // 如果circle < 0  说明第一张图片，则小圆圈要改为第4个小圆圈（3）
        // if (circle < 0) {
        //     circle = ol.children.length - 1;   // 第四个小圆圈的索引号为3
        // }
        circle = circle < 0 ? ol.children.length - 1 : circle;

        circleChange(); //调用函数
    })

    function circleChange() {
        //  先清除其余小圆圈的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        //  留下当前的小圆圈的current类名
        ol.children[circle].className = 'current';
    }

    // 10. 自动播放轮播图
    var timer = setInterval(function () {
        arrow_r.click();
    }, 2000);

    // // 必须先拿到brand_item，不让浏览器报错不认识 brand_item
    // var brand_item = document.querySelector('.brand_item');
    // var lis = brand_item.querySelectorAll('li');
    // for (var i = 0; i < lis.length; i++) {
    //     var index = i * 120;
    //     lis[i].style.backgroundPosition = '-' + index + 'px 0';
    // }
})

// box_brand   品牌栏
document.addEventListener('DOMContentLoaded', function () {
    var brand_items = document.getElementsByClassName('brand_item');
    for (var n = 0; n <= brand_items.length - 1; n++) {
        var lis = brand_items[n].querySelectorAll('li');
        for (var i = 0; i < lis.length; i++) {
            var index = i * 120;
            var a = lis[i].querySelector('a');
            a.style.backgroundPosition = '-' + index + 'px 0';
        }
    }
})