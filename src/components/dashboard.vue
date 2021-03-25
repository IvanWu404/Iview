<style scoped>
* {
  box-sizing: border-box;
}
.dashboard{
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg);
  /* 将图片扩大或者缩放来适应整个容器 */
  background-size: 100%;
  padding-top: 5%;
  z-index: -1;
}
.item{
  position: absolute;
  height: 100%;
  width: 68%;
  background: rgba(32, 32, 35, 0.5);
  transition: all 0.8s;    /* 所有元素0.8秒加载动画 */
  transform: scale(0.33);  /* 缩小 */
  text-align: center;
}
.flex-container{
  position: relative;
  height: 90%;
  width: 90%;
  overflow: hidden;
  margin: 0 auto 100px auto
}
.active{
  height: 100%;
  width: 69%;
  margin-left: 10px;
  line-height: 300px;
}
</style>

<template>
  <div class = "dashboard">
    <div class = "flex-container">
    <!-- 绑定点击事件 -->
      <div class = "item one" @click="clickChart('1')" style="transform: translate(-22.4%,-0.5%) scale(0.33)">
        <column></column>
      </div>
      <div class = "item two active" @click="clickChart('2')" style="transform: translate(43.7%,0) scale(1)">
        <point></point>
      </div>
    </div>
  </div>
</template>

<script>
  import column from '@/components/column'
  import point from '@/components/point'
  export default{
    mounted(){
      this._init();
    },
    data(){
      return{
        items: []
      }
    },
    methods:{
      _init(){
        this.items = document.querySelectorAll('.item');    //要加.
        for(let i = 0; i < this.items.length; i++){
          this.items[i].dataset.order = i + 1;    //order[0] = 1, order[1] = 2
        }       
      },
      clickChart(clickIndex) {   //点击切换实现
          let activeItem = document.querySelector('.active');
          let activeIndex = activeItem.dataset.order;  //h5新特性：dataset acitveIndex:2        
          let clickItem = this.items[clickIndex - 1];
          console.log(activeIndex);
          console.log(clickIndex);
          if (activeIndex === clickIndex){
            return;
          }
          activeItem.classList.remove('active');
          clickItem.classList.add('active');
          this._setStyle(activeItem,clickItem); //交换
      },
      _setStyle(el1, el2){    //交换transform实现
          let transform1 = el1.style.transform;
          let transform2 = el2.style.transform;
          el1.style.transform = transform2;
          el2.style.transform = transform1;         
      }
    },
    components: {
      column,
      point
    }
  }   
</script>
