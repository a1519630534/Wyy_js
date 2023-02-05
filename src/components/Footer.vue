<template>
    
     <!-- footer部分开始 -->
     <footer>
        <div class="play_q" style="width: 100%;background-color: #333;height: 50px;position: fixed; bottom: 0;">
            <audio controls height="100" width="100" style="margin-left: 670px;">
                
                <!-- <source src="playUrl.url" type="audio/mpeg">
                <source src="playUrl.url" type="audio/ogg"> -->
                <embed height="50" width="100" src="horse.mp3">
            </audio>
        </div>
        <div class="footer-box">
            <div class="footer-left">
                <div>
                    <ul>
                        <li><a href="#">服务条款</a></li>
                        <li></li>
                        <li><a href="#">隐私政策</a></li>
                        <li></li>
                        <li><a href="#">儿童隐私政策</a></li>
                        <li></li>
                        <li><a href="#">版权投诉指引</a></li>
                        <li></li>
                        <li><a href="#">意见反馈</a></li>
                        <li></li>
                        <li><a href="#">广告合作</a></li>
                    </ul>
                </div>
                <div>
                    <p>网易公司版权所有©1997-2021杭州乐读科技有限公司运营：</p><a href="#">浙网文[2021] 1186-054号</a>
                </div>
                <div>
                    <p>违法和不良信息举报电话：0571-89853516 举报邮箱：</p><a href="#">ncm5990@163.com</a>
                </div>
                <div>
                    <a href="#">粤B2-20090191-18 工业和信息化部备案管理系统网站</a>
                    <a href="#">浙公网安备 33010902002564号</a>
                </div>
            </div>
            <div class="footer-right">
                <ul>
                    <li><a href="#"></a><span></span></li>
                    <li><a href="#"></a><span></span></li>
                    <li><a href="#"></a><span></span></li>
                    <li><a href="#"></a><span></span></li>
                    <li><a href="#"></a><span></span></li>
                </ul>
            </div>
        </div>
    </footer>
    <!-- footer部分结束 -->
</template>

<script>

import { defineComponent } from 'vue';

export default defineComponent({

  name: 'Footer',

});

</script>

<style lang="less">

</style>