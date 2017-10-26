<template>
  <transition name="slide">
    <div class="singer-detail">

    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {getSingerDetail} from '../../api/singer'
  import {ERR_OK} from '../../api/config'
  //  import Singer from '../../common/js/singer'
  //  import ListView from '../../base/listview/listview.vue'
  //  //使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）
  //  import {mapMutations} from 'vuex'
  //  const HOT_NAME = 'hot';
  //  const HOT_SINGER_LENGTH = 10;
  import {mapGetters} from 'vuex' //从map中取数据的语法糖
  export default{
    data(){
      return {
        songs: []
      }
    },
    computed: {
      ...mapGetters([
        'singer'
      ])
    },
    created(){
      this._getDetail();
    },
    methods: {
      _getDetail (){
        if (typeof this.singer == 'undefined') {
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            console.log(res);
          } else {

          }
        })
      },
      _normalizeSongs(list){
        let ret = [];
        list.forEach(function (item, index) {
          let musicData = item;
        })
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../stylus/variable.styl"

  .singer-detail
    position: fixed
    z-index: 100
    top: 0
    right: 0
    bottom: 0
    height: 100vh
    width: 100vw
    background: $color-background

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>

