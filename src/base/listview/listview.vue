<template>
  <!--子组件emit scroll时候,调用父组件的scroll-->
  <scroll @scroll="scroll"
          :listenScroll="listenScroll"
          :probeType="probeType"
          :data="data"
          class="listview"
          ref="listview">
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <uL>
          <li @click="selectItem(item)" v-for="item in group.items" class="list-group-item">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </uL>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove"
         @touchend.stop>
      <ul>
        <li v-for="(item, index) in shortcutList" :data-index="index" class="item"
            :class="{'current':currentIndex===index}">{{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}} </div>
    </div>
    <div v-show="!data.length" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from '../../base/scroll/scroll'
  import Loading from '../../base/loading/loading'
  import { getData } from '../../common/js/dom'

  const TITLE_HEIGHT = 30;
  const ANCHOR_HEIGHT = 18;
//5-2 16:50
  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    computed: {
      shortcutList() {
        return this.data.map((group) => {
          return group.title.substr(0, 1)
        })
      },
      fixedTitle() {
        if (this.scrollY > 0) {
          return ''
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    data() {
      return {
        scrollY: -1,
        currentIndex: 0,//高亮的列表索引
        diff: -1
      }
    },
    created() {
      this.probeType = 3;//3可以监听swap
      this.listenScroll = true;
      this.touch = {};
      this.listHeight = [];
    },
    methods: {
      selectItem(item) {
        this.$emit('select', item) //因为是基础组件，所以不再此处写业务逻辑，向外部派发即可。
      },
      onShortcutTouchStart(e) { //此处为何两个scroll函数
        let anchorIndex = getData(e.target, 'index');
        let firstTouch = e.touches[0];
//        this.$refs.listview.scrollToElement(this.$refs.listGroup[anchorIndex], 0); //scroll滚动到指定位置
        this.touch.y1 = firstTouch.pageY; //触摸开始的坐标
        this.touch.anchorIndex = anchorIndex; //触摸开始的索引
        this._scrollTo(anchorIndex); //scroll滚动到指定位置
      },
      onShortcutTouchMove(e) {
//        console.log(e.touches);
        let firstTouch = e.touches[0]; //move时当前的触摸事件
        this.touch.y2 = firstTouch.pageY; //当前实时触摸的坐标
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0;//滚动的变量的个数（左侧小菜单）
//        console.log(anchorIndex);
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta;
        this._scrollTo(anchorIndex);
      },
      refresh() {
        this.$refs.listview.refresh();
      },
      scroll(pos) {
        this.scrollY = pos.y;
      },
      _calculateHeight() {
        this.listHeight = [];
        const list = this.$refs.listGroup;
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      _scrollTo(index) { //list的索引
        if (!index && index !== 0) {//不存在且不为0
          return
        }
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2
        }
        this.scrollY = -this.listHeight[index]
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      }
    },
    watch: {
      data() {//监听,data变化时调用某方法
        setTimeout(() => {
          this._calculateHeight()
        }, 20)
      },
      scrollY(newY) { //监听data中的scrollY
        const listHeight = this.listHeight;
//        console.log(newY);
        // 当滚动到顶部，newY>0
        if (newY > 0) {
          this.currentIndex = 0;
          return
        }
        // 在中间部分滚动
        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i];
          let height2 = listHeight[i + 1];
          if (!height2 ||(-newY >= height1 && -newY < height2)) {
            this.currentIndex = i
//            this.diff = height2 + newY
            return
          }
        }
        // 当滚动到底部，且-newY大于最后一个元素的上限
        this.currentIndex = listHeight.length - 2
        this.currentIndex = 0
      },
      diff(newVal) {
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../stylus/variable.styl"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
