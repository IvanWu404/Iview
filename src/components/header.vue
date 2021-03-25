// 子组件，存放数据
// name 图表的标题
// legendArr 图表所包含的多种类型
// myChart 当前图表对象
<style scoped>
.title {
    position: relative;
    display: flex;
    height: 50px;
    line-height: 50px;
    background-color: rgba(32, 32, 35, 0.2);
    color: white;
    width: 100%;
}
h1 {
    flex: 0 0 120px;
    font-size: 21px;
    font-weight: bold;
    padding-left: 20px;
}
</style>

<template>
    <div class="title">
        <h1>{{name}}</h1>
        <div class="legend-wrapper">
            <ul>
                <li v-for="(legend,index) in legendArr">
                    {{legend.name}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {     //接收父组件传的值
        name: String,
        myChart: Object,
        legendArr: {
            type: Array,
            default: []         //保证不会为空
        }
   }
}
</script>