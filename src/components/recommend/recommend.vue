<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList" >
    <div>
      <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
        <slider>
          <div v-for="item in recommends">
            <a :href="item.linkUrl">
              <img class="needsclick" :src="item.picUrl" @load="afterImgLoad">
              <!--@load="loadImage"-->
            </a>
          </div>
        </slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li class="item" v-for="item in discList">
            <div class="icon">
              <img width="60" height="60" v-lazy="item.imgurl">
            </div>
            <div class="text">
              <h2 class="name" v-html="item.creator.name"></h2>
              <p class="desc" v-html="item.dissname"></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="loading-container" v-show = "!discList.length">
      <loading></loading>
    </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  import { getRecommend, getDiscList } from '../../api/recommend'
  import { ERR_OK } from '../../api/config'
  import Slider from '../../base/slider/slider'
  import Scroll from '../../base/scroll/scroll'
  import Loading from '../../base/loading/loading'
  export default{
    created (){
      setTimeout(this._getRecommend,2000)
//      this._getRecommend();

      setTimeout(this._getDiscList,2000)
//      this._getDiscList()
    },
    data(){
      return {
        recommends: [],
        discList: [],
        isImgLoad:false
      }
    },
    methods: {
      _getRecommend(){
        (getRecommend()).then((res) => {
          if (res.code === ERR_OK) {
            let data = res.data;
            this.recommends = data.slider;
//            console.log(this.recommends);
          } else {

          }
        })
      },
      _getDiscList(){
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list;
//            console.log(this.discList);
          }
        })
      },
      afterImgLoad(){
        if(this.isImgLoad){
          return
        }
        this.$refs.scroll.refresh();
//        console.log(1);
        this.isImgLoad = true
      }
    },
    components: {Slider,Scroll,Loading}
  }
</script>

<style scoped="" lang="stylus" rel="stylesheet/stylus">
  @import "../../stylus/variable.styl"
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
    .slider-wrapper
      position: relative
      width: 100%
      overflow: hidden
    .recommend-list
      .list-title
        height: 65px
        line-height: 65px
        text-align: center
        font-size: $font-size-medium
        color: $color-theme
      .item
        display: flex
        box-sizing: border-box
        align-items: center
        padding: 0 20px 20px 20px
        .icon
          flex: 0 0 60px
          width: 60px
          padding-right: 20px
        .text
          display: flex
          flex-direction: column
          justify-content: center
          flex: 1
          line-height: 20px
          overflow: hidden
          font-size: $font-size-medium
          .name
            margin-bottom: 10px
            color: $color-text
          .desc
            color: $color-text-d
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
