//散点图
<style scoped>
.point{
    height: 800px;
}
.main{
    width: 100%;
    height: calc(100% - 120px);
}
</style>

<template>
<div class="point">
    <v-header :name = "name"></v-header>
    <div class="main"></div><!-- 主体部分 -->
</div>
</template>

<script>
import * as echarts from 'echarts'  //引入echarts
import header from '@/components/header'
import axios from 'axios'
import china from 'echarts/map/js/china'        //引入china地图
import { getCoordinateSystemDimensions } from 'echarts'

export default {
    created() {
        this._getCityData()  //获取数据
    //在Vue生命周期的created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中
    //在created()钩子函数执行的时候DOM 其实并未进行任何渲染，而此时进行DOM操作无异于徒劳，所以此处一定要将DOM操作的js代码放进Vue.nextTick()的回调函数中
    //在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候，这个操作都应该放进Vue.nextTick()的回调函数中。
    },
    components: {
        'v-header': header
    },
    data() {                //父组件设置data
        return{
            lengendArray: [],   //图表类型设置
            myChart: {},        //图表对象
            name: '散点图',
            color: this.$store.state.color,
            geoCoordMap: {}  //城市信息
        }        
    },
    methods: {
        _init(options) {       //初始化
            this.myChart = echarts.init(document.querySelector('.point .main'));    //获取节点
            this.myChart.setOption(options);
            this.lengendArray = options.series;
            this.lengendArray.forEach((data) => {
                data.selected = true;
            });
            this.$root.push(this.myChart);
            window.addEventListener('resize',function(){
                this.myChart.resize();
            }.bind(this))
        },
        _getCityData(){
            axios.get('/static/data/cityData.json').then((res) => {
                this.geoCoordMap = res.data;
                this.$nextTick(() => {
                    this._getMyChart();     //创建图表，进行设置
                })
            })
        },
        convertData(data){           //处理数据，返回键值对（城市名称，坐标）
            let res = [];
            for(let i = 0; i < 4; i++){
                let l = data.length;
                let x = parseInt(Math.random() * l);
                let geoCoord = this.geoCoordMap[data[x].name];
                if(geoCoord){
                    res.push({
                        name: data[x].name,
                        value: geoCoord.concat(Math.random() * 200)
                    })
                }
            }
            return res;
        },
        _getMyChart(){              
            axios.get('static/data/point/testData.json').then((res) => {
                let options = {
                    titie: {
                        show: false
                    },
                    tooltip: {          //提示框
                        trigger: 'item',        //'item':数据项图形触发
                        formatter: function(params){        //提示框的格式，自定义函数
                        return params.name + ':' + params.value[2];} //城市+坐标
                    },
                    legend:{
                        show: false
                    },
                    visualMap: {
                        min: 0,
                        max: 200,
                        bottom: 50,
                        splitNumber: 5,
                        inRange: {
                            color: ['#255B78', '#2A7484', '#2F9696', '#3BBCB0', '#51D4EB']
                        },
                        textStyle: {
                            color: '#fff'
                        },                    
                    },
                    geo:{
                        map: 'china',
                        label: {
                            emphsise: {
                                show: false
                            }
                        },
                        zoom: 1,
                        top: 50,
                        itemStyle: {
                            normal: {
                                color: '#3c4247',
                                opacity: 0.6,
                                borderColor: 'rgba(255, 255, 255, 0.35)'
                            },
                            emphsise:{
                                color: '#2a333d'
                            }

                        }
                    },
                    series: [{            //数据
                        name: '标签1',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        symbolSize: function(val){
                            return val[2] / 6;
                        },
                        label: {
                            normal:{
                                show: false
                            },
                            emphsise:{
                                show: false
                            }
                        },
                        itemStyle: {
                            emphsise:{
                                borderColor: '#fff',
                                borderWidth: 1
                            }
                        },
                        data: this.convertData(res.data)     //处理数据
                        }, {
                        name: '标签2',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        symbolSize: function(val) {
                            return val[2] / 6;
                        },
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            emphasis: {
                            borderColor: '#fff',
                            borderWidth: 1
                            }
                        },
                        data: this.convertData(res.data)
                    }, {
                        name: '标签3',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        symbolSize: function(val) {
                            return val[2] / 6;
                        },
                        label: {
                            normal: {
                            show: false
                            },
                            emphasis: {
                            show: false
                            }
                        },
                        itemStyle: {
                            emphasis: {
                            borderColor: '#fff',
                            borderWidth: 1
                            }
                        },
                        data: this.convertData(res.data)
                    }]
                }
                this._init(options);    //生成图表
            });  
       }
   }
}
</script>