// 柱状图
<style scoped>
.columnChart{
    height: 800px;
}
.main{      /* main必须设置宽和高 */
    width: 100%;
    height: calc(100% - 100px);
}
</style>

<template>
<div class="columnChart">
    <v-header :name = "name"></v-header>
    <div class="main"></div><!-- 主体部分 -->
</div>
</template>

<script>
import * as echarts from 'echarts'  //引入echarts
import header from '@/components/header'

export default {
    components: {
        'v-header': header
    },
    data() {
        return{
            lengendArray: [],
            myChart: {},        //图表对象
            name: '柱状图',
            color: this.$store.state.color
        }        
    },
    methods: {
        _init() {
            this.lengendArray = this.myChart.getOption().series;
            this.lengendArray.forEach(data => {
                data.selected = true;
            });
        }
     },
    mounted() {     //保证当前页面元素都已经加载完成
        // 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(document.querySelector('.columnChart .main'));
        this.myChart.setOption({
            title:{
                show: false
            },
            tooltip:{
                trigger: 'axis'
            },
            legend:{
                show: false
            },
            color: this.color,
            calculable: true,
            xAxis:[{
                name: '产品',
                type: 'category',
                axisLine: {
                    show: false
                },
                nameTextStyle:{
                    color :'rgba(255,255,255,0.69)'
                },
                axisLabel:{
                    textStyle:{
                        color:'white'
                    }
                },
                data:['产品一','产品二']
            }],
            yAxis: [{
                axisLine :{
                    show: false
                },
                nameLocation: 'end',
                nameGap: 20,
                nameRotate: 0,
                axisTick:{
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        color: ['rgba(230, 230, 230, 0.2)']
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: 'white',
                        fontSize: 14
                    }
                },
                name: '数量',
                type: 'value',
                nameTextStyle: {
                    color: 'rgba(255, 255, 255, 0.69)'
                }    
            }],
            series: [{
                name: '标签1',
                type: 'bar',
                data: [2.0, 4.9],
                barWidth: 16,
                barGap: 0
                }, {
                name: '标签2',
                type: 'bar',
                data: [2.6, 5.9],
                barWidth: 16,
                barGap: 0
                }, {
                name: '标签3',
                type: 'bar',
                data: [2.0, 6.4],
                barWidth: 16,
                barGap: 0
                }, {
                name: '标签4',
                type: 'bar',
                data: [4.0, 5.9],
                barWidth: 16,
                barGap: 0
                }, {
                name: '标签5',
                type: 'bar',
                data: [5.6, 4.9],
                barWidth: 16,
                barGap: 0
                }, {
                name: '标签6',
                type: 'bar',
                data: [2.0, 3.4],
                barWidth: 16,
                barGap: 0
            }]           
        });
        this._init();
    }
}
</script>
