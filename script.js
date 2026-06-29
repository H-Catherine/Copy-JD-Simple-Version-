// script.js
document.addEventListener('DOMContentLoaded', function() {
    // 轮播功能
    initCarousel();
    
    // 标签切换功能（楼层商品分类）
    initTabSwitching();
    
    // 分类标签功能（如果需要的话）
    initCategoryTabs();
});

function initCarousel() {
    const track = document.querySelector('.carousel-track');
    if (!track) return; // 如果没有轮播元素则退出
    
    const slides = Array.from(track.children);
    if (slides.length === 0) return;
    
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    const slideWidth = slides[0].getBoundingClientRect().width;
    let currentIndex = 0;
    let autoSlideInterval;

    // 设置每张幻灯片的位置
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    
    slides.forEach(setSlidePosition);

    // 移动到指定幻灯片
    const moveToSlide = (track, currentSlide, targetIndex) => {
        const targetSlide = slides[targetIndex];
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentIndex = targetIndex;
        
        // 更新指示点
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[currentIndex]) {
            dots[currentIndex].classList.add('active');
        }
    };

    // 下一张
    const nextSlide = () => {
        const targetIndex = (currentIndex + 1) % slides.length;
        moveToSlide(track, slides[currentIndex], targetIndex);
    };

    // 上一张
    const prevSlide = () => {
        const targetIndex = (currentIndex - 1 + slides.length) % slides.length;
        moveToSlide(track, slides[currentIndex], targetIndex);
    };

    // 自动播放
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(nextSlide, 3000);
    };

    // 停止自动播放
    const stopAutoSlide = () => {
        clearInterval(autoSlideInterval);
    };

    // 事件监听器
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    // 点击指示点切换幻灯片
    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            const targetIndex = index;
            moveToSlide(track, slides[currentIndex], targetIndex);
            stopAutoSlide();
            startAutoSlide();
        });
    });

    // 鼠标悬停时暂停自动播放
    if (track) {
        track.addEventListener('mouseenter', stopAutoSlide);
        track.addEventListener('mouseleave', startAutoSlide);
    }

    // 初始化自动播放
    startAutoSlide();
}

function initTabSwitching() {
    // 处理楼层内的标签切换
    const tabs = document.querySelectorAll('.tabs span');
    const lists = document.querySelectorAll('.goods-list');

    if (tabs.length > 0 && lists.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // 清除所有标签的active样式
                tabs.forEach(item => item.classList.remove('active'));
                // 给当前点击的标签加上active
                this.classList.add('active');

                // 获取当前标签对应id
                const targetId = this.getAttribute('data-id');
                // 隐藏所有商品，只显示对应id的商品
                lists.forEach(list => list.classList.remove('show'));
                const targetList = document.getElementById(targetId);
                if (targetList) {
                    targetList.classList.add('show');
                }
            });
        });
    }
}

function initCategoryTabs() {
    // 处理分类标签切换
    const categoryTabs = document.querySelectorAll('.tab');
    const productLists = document.querySelectorAll('.product-list');

    if (categoryTabs.length > 0 && productLists.length > 0) {
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();

                // 移除所有标签的 active 类
                categoryTabs.forEach(t => t.classList.remove('active'));
                // 给当前点击的标签添加 active 类
                this.classList.add('active');

                // 获取当前标签对应的分类
                const category = this.getAttribute('data-category');

                // 隐藏所有商品列表，显示对应分类的列表
                productLists.forEach(list => {
                    list.classList.remove('active');
                    if (list.id === category) {
                        list.classList.add('active');
                    }
                });
            });
        });
    }
}
// 添加楼层分类切换功能
document.addEventListener('DOMContentLoaded', function() {
    // 为所有楼层的分类标签添加点击事件
    const allFloorTabs = document.querySelectorAll('.floor-tabs .tab');
    
    allFloorTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            const clickedCategory = this.getAttribute('data-category');
            const floorContainer = this.closest('.floor');
            
            // 更新当前楼层的标签激活状态
            const floorTabs = floorContainer.querySelectorAll('.floor-tabs .tab');
            floorTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 显示对应分类的产品
            const productCategories = floorContainer.querySelectorAll('.product-category');
            productCategories.forEach(category => {
                if (category.getAttribute('data-category-name') === clickedCategory) {
                    category.classList.add('active');
                } else {
                    category.classList.remove('active');
                }
            });
        });
    });
});