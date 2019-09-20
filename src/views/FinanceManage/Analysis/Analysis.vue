<template>
    <div class="analysis">
        <div class="analysis_classify" v-for="(item) in analysis" :key="item.id">
            <p><img src="" alt="">{{item.name}}</p>
            <div class="analysis_text">
                <p><span>交易金额 :</span> {{item.pay_amount}}元</p>
                <p><span> 手续费   :</span> {{item.pay_poundage}}元</p>
                <p><span>入金金额 :</span> {{item.pay_actual_amount}}元</p>
            </div>
            <div class="analysis_footer">
                <p>
                    <span>交易笔数: {{item.total_count}}</span>
                    <span>失败率: {{isNaN(item.pending_count)?'0':item.pending_count/item.total_count*100}}%</span>
                </p>
                <p>
                    <span>成功笔数: {{item.success_count}}</span>
                    <span>失败笔数: {{item.pending_count}}</span>
                </p>
            </div>
        </div>
        <div class="analysis_classify">
            <p><img src="" alt="">微信公众号-901</p>
            <div class="analysis_text">
                <p><span>交易金额 :</span> 0元</p>
                <p><span> 手续费   :</span> 0元</p>
                <p><span>入金金额 :</span> 0元</p>
            </div>
            <div class="analysis_footer">
                <p>
                    <span>交易笔数: 0</span>
                    <span>失败率: 0%</span>
                </p>
                <p>
                    <span>成功笔数: 0</span>
                    <span>失败笔数: 0</span>
                </p>
            </div>
        </div>
        <div class="analysis_classify">
            <p><img src="" alt="">微信公众号-901</p>
            <div class="analysis_text">
                <p><span>交易金额 :</span> 0元</p>
                <p><span> 手续费   :</span> 0元</p>
                <p><span>入金金额 :</span> 0元</p>
            </div>
            <div class="analysis_footer">
                <p>
                    <span>交易笔数: 0</span>
                    <span>失败率: 0%</span>
                </p>
                <p>
                    <span>成功笔数: 0</span>
                    <span>失败笔数: 0</span>
                </p>
            </div>
        </div>
        <div class="analysis_classify">
            <p><img src="" alt="">微信公众号-901</p>
            <div class="analysis_text">
                <p><span>交易金额 :</span> 0元</p>
                <p><span> 手续费   :</span> 0元</p>
                <p><span>入金金额 :</span> 0元</p>
            </div>
            <div class="analysis_footer">
                <p>
                    <span>交易笔数: 0</span>
                    <span>失败率: 0%</span>
                </p>
                <p>
                    <span>成功笔数: 0</span>
                    <span>失败笔数: 0</span>
                </p>
            </div>
        </div>
        <div class="analysis_classify">
            <p><img src="" alt="">微信公众号-901</p>
            <div class="analysis_text">
                <p><span>交易金额 :</span> 0元</p>
                <p><span> 手续费   :</span> 0元</p>
                <p><span>入金金额 :</span> 0元</p>
            </div>
            <div class="analysis_footer">
                <p>
                    <span>交易笔数: 0</span>
                    <span>失败率: 0%</span>
                </p>
                <p>
                    <span>成功笔数: 0</span>
                    <span>失败笔数: 0</span>
                </p>
            </div>
        </div>
        <div class="analysis_classify">
            <p><img src="" alt="">微信公众号-901</p>
            <div class="analysis_text">
                <p><span>交易金额 :</span> 0元</p>
                <p><span> 手续费   :</span> 0元</p>
                <p><span>入金金额 :</span> 0元</p>
            </div>
            <div class="analysis_footer">
                <p>
                    <span>交易笔数: 0</span>
                    <span>失败率: 0%</span>
                </p>
                <p>
                    <span>成功笔数: 0</span>
                    <span>失败笔数: 0</span>
                </p>
            </div>
        </div>
    </div>
</template>
<script src="./Analysis.js"></script>
<style scoped lang="scss"  src="./Analysis.scss"></style>

