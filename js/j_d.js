document.addEventListener('DOMContentLoaded', function () {
    function fn() {
        // 1. 获取元素
        var electric = document.querySelector('.electric'); // 电器
        var col_2 = electric.querySelector('.col_2'); // 轮播图整体
        var left_arrow = electric.querySelector('.left_arrow'); // 左箭头
        var right_arrow = electric.querySelector('.right_arrow'); // 右箭头
        var ol = electric.querySelector('ol'); // 小圆圈
        var focus_small = electric.querySelector('.focus_small'); // 轮播图图片区域
        var index = 0; // 轮播索引

        console.log(focus_small.children.length);

        // 2. 鼠标经过col_2 就显示隐藏左右按钮
        // mouseenter   鼠标经过显示按钮
        col_2.addEventListener('mouseenter', function () {
            left_arrow.style.display = 'block';
            right_arrow.style.display = 'block';
            // 鼠标经过停止定时器
            clearInterval(timer);
            timer = null; // 清除定时器变量
        })
        // mouseleave   鼠标离开显示按钮
        col_2.addEventListener('mouseleave', function () {
            left_arrow.style.display = 'none';
            right_arrow.style.display = 'none';
            // 鼠标离开开启定时器   不要加var，否则局部变量clearInterval 清不掉定时器
            timer = setInterval(ChangeImg, 3000);
        })

        // 3. 动态生成小圆圈  有几张图片，我就生成几个小圆圈
        for (var i = 0; i < focus_small.children.length; i++) {
            // 创建一个小li 
            var li = document.createElement('li');
            // 把小li插入到ol 里面
            ol.appendChild(li);

            // 记录当前小圆圈的索引号 通过自定义属性来做   索引号
            li.setAttribute('data-index', i); //index 属性可返回下拉列表中选项的索引位置
            // setAttribute() 方法添加指定的属性，并为其赋指定的值。

            focus_small.children[i].style.opacity = 0;

            // 4.小圆圈的排他思想 我们可以直接生成小圆圈的同时直接绑定点击事件
            li.addEventListener('click', function () {
                // 干掉所有人 把所有的小li 清除 now 类名
                for (var i = 0; i < ol.children.length; i++) {
                    ol.children[i].className = '';
                    focus_small.children[i].style.opacity = 0;
                }
                // 留下我自己  当前的小li 设置 now 类名
                this.className = 'now';
                // 当我们点击了某个小li 就拿到当前小li 的索引号

                // 5. 点击小圆圈 图片跳转
                index = this.getAttribute('data-index');
                focus_small.children[index].style.opacity = 1;

            })
        }
        // 把ol里面的第一个小li设置类名为 now
        ol.children[0].className = 'now';
        focus_small.children[0].style.opacity = 1;

        // 6. 点击右侧按钮， 图片往后切换一张
        function ChangeImg() {
            index++;
            if (index >= focus_small.children.length) {
                index = 0;
            }
            // 循环将全部图片和圆点重置为默认样式
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
                focus_small.children[i].style.opacity = 0;
            }
            // 将当前图片显示
            ol.children[index].className = 'now';
            focus_small.children[index].style.opacity = 1;
        }
        right_arrow.onclick = ChangeImg;

        // 7. 点击左侧侧按钮， 图片往前切换一张
        left_arrow.addEventListener('click', function () {
            index--;
            if (index < 0) {
                index = focus_small.children.length - 1;
            }
            // 循环将全部图片和圆点重置为默认样式
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
                focus_small.children[i].style.opacity = 0;
            }
            // 将当前图片显示
            ol.children[index].className = 'now';
            focus_small.children[index].style.opacity = 1;
        })

        // 8. 自动播放轮播图   定时器
        var timer = setInterval(ChangeImg, 3000);
    }
    fn();

    (function(){
        // 1. 获取元素
        var mobile = document.querySelector('.mobile'); // 电器
        var col_2 = mobile.querySelector('.col_2'); // 轮播图整体
        var left_arrow = mobile.querySelector('.left_arrow'); // 左箭头
        var right_arrow = mobile.querySelector('.right_arrow'); // 右箭头
        var ol = mobile.querySelector('ol'); // 小圆圈
        var focus_small = mobile.querySelector('.focus_small'); // 轮播图图片区域
        var index = 0; // 轮播索引

        console.log(focus_small.children.length);

        // 2. 鼠标经过col_2 就显示隐藏左右按钮
        // mouseenter   鼠标经过显示按钮
        col_2.addEventListener('mouseenter', function () {
            left_arrow.style.display = 'block';
            right_arrow.style.display = 'block';
            // 鼠标经过停止定时器
            clearInterval(timer);
            timer = null; // 清除定时器变量
        })
        // mouseleave   鼠标离开显示按钮
        col_2.addEventListener('mouseleave', function () {
            left_arrow.style.display = 'none';
            right_arrow.style.display = 'none';
            // 鼠标离开开启定时器   不要加var，否则局部变量clearInterval 清不掉定时器
            timer = setInterval(ChangeImg, 3000);
        })

        // 3. 动态生成小圆圈  有几张图片，我就生成几个小圆圈
        for (var i = 0; i < focus_small.children.length; i++) {
            // 创建一个小li 
            var li = document.createElement('li');
            // 把小li插入到ol 里面
            ol.appendChild(li);

            // 记录当前小圆圈的索引号 通过自定义属性来做   索引号
            li.setAttribute('data-index', i); //index 属性可返回下拉列表中选项的索引位置
            // setAttribute() 方法添加指定的属性，并为其赋指定的值。

            focus_small.children[i].style.opacity = 0;

            // 4.小圆圈的排他思想 我们可以直接生成小圆圈的同时直接绑定点击事件
            li.addEventListener('click', function () {
                // 干掉所有人 把所有的小li 清除 now 类名
                for (var i = 0; i < ol.children.length; i++) {
                    ol.children[i].className = '';
                    focus_small.children[i].style.opacity = 0;
                }
                // 留下我自己  当前的小li 设置 now 类名
                this.className = 'now';
                // 当我们点击了某个小li 就拿到当前小li 的索引号

                // 5. 点击小圆圈 图片跳转
                index = this.getAttribute('data-index');
                focus_small.children[index].style.opacity = 1;

            })
        }
        // 把ol里面的第一个小li设置类名为 now
        ol.children[0].className = 'now';
        focus_small.children[0].style.opacity = 1;

        // 6. 点击右侧按钮， 图片往后切换一张
        function ChangeImg() {
            index++;
            if (index >= focus_small.children.length) {
                index = 0;
            }
            // 循环将全部图片和圆点重置为默认样式
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
                focus_small.children[i].style.opacity = 0;
            }
            // 将当前图片显示
            ol.children[index].className = 'now';
            focus_small.children[index].style.opacity = 1;
        }
        right_arrow.onclick = ChangeImg;

        // 7. 点击左侧侧按钮， 图片往前切换一张
        left_arrow.addEventListener('click', function () {
            index--;
            if (index < 0) {
                index = focus_small.children.length - 1;
            }
            // 循环将全部图片和圆点重置为默认样式
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
                focus_small.children[i].style.opacity = 0;
            }
            // 将当前图片显示
            ol.children[index].className = 'now';
            focus_small.children[index].style.opacity = 1;
        })

        // 8. 自动播放轮播图   定时器
        var timer = setInterval(ChangeImg, 3000);
    }())

    (function(){
        // 1. 获取元素
        var computer = document.querySelector('.computer'); // 电器
        var col_2 = computer.querySelector('.col_2'); // 轮播图整体
        var left_arrow = computer.querySelector('.left_arrow'); // 左箭头
        var right_arrow = computer.querySelector('.right_arrow'); // 右箭头
        var ol = computer.querySelector('ol'); // 小圆圈
        var focus_small = computer.querySelector('.focus_small'); // 轮播图图片区域
        var index = 0; // 轮播索引

        console.log(focus_small.children.length);

        // 2. 鼠标经过col_2 就显示隐藏左右按钮
        // mouseenter   鼠标经过显示按钮
        col_2.addEventListener('mouseenter', function () {
            left_arrow.style.display = 'block';
            right_arrow.style.display = 'block';
            // 鼠标经过停止定时器
            clearInterval(timer);
            timer = null; // 清除定时器变量
        })
        // mouseleave   鼠标离开显示按钮
        col_2.addEventListener('mouseleave', function () {
            left_arrow.style.display = 'none';
            right_arrow.style.display = 'none';
            // 鼠标离开开启定时器   不要加var，否则局部变量clearInterval 清不掉定时器
            timer = setInterval(ChangeImg, 3000);
        })

        // 3. 动态生成小圆圈  有几张图片，我就生成几个小圆圈
        for (var i = 0; i < focus_small.children.length; i++) {
            // 创建一个小li 
            var li = document.createElement('li');
            // 把小li插入到ol 里面
            ol.appendChild(li);

            // 记录当前小圆圈的索引号 通过自定义属性来做   索引号
            li.setAttribute('data-index', i); //index 属性可返回下拉列表中选项的索引位置
            // setAttribute() 方法添加指定的属性，并为其赋指定的值。

            focus_small.children[i].style.opacity = 0;

            // 4.小圆圈的排他思想 我们可以直接生成小圆圈的同时直接绑定点击事件
            li.addEventListener('click', function () {
                // 干掉所有人 把所有的小li 清除 now 类名
                for (var i = 0; i < ol.children.length; i++) {
                    ol.children[i].className = '';
                    focus_small.children[i].style.opacity = 0;
                }
                // 留下我自己  当前的小li 设置 now 类名
                this.className = 'now';
                // 当我们点击了某个小li 就拿到当前小li 的索引号

                // 5. 点击小圆圈 图片跳转
                index = this.getAttribute('data-index');
                focus_small.children[index].style.opacity = 1;

            })
        }
        // 把ol里面的第一个小li设置类名为 now
        ol.children[0].className = 'now';
        focus_small.children[0].style.opacity = 1;

        // 6. 点击右侧按钮， 图片往后切换一张
        function ChangeImg() {
            index++;
            if (index >= focus_small.children.length) {
                index = 0;
            }
            // 循环将全部图片和圆点重置为默认样式
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
                focus_small.children[i].style.opacity = 0;
            }
            // 将当前图片显示
            ol.children[index].className = 'now';
            focus_small.children[index].style.opacity = 1;
        }
        right_arrow.onclick = ChangeImg;

        // 7. 点击左侧侧按钮， 图片往前切换一张
        left_arrow.addEventListener('click', function () {
            index--;
            if (index < 0) {
                index = focus_small.children.length - 1;
            }
            // 循环将全部图片和圆点重置为默认样式
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
                focus_small.children[i].style.opacity = 0;
            }
            // 将当前图片显示
            ol.children[index].className = 'now';
            focus_small.children[index].style.opacity = 1;
        })

        // 8. 自动播放轮播图   定时器
        var timer = setInterval(ChangeImg, 3000);
    }())
})