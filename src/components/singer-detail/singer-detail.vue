<template>
  <transition name="slide">
    <music-list :title="title" :songs="songs" :bg-image = "bgImage">

    </music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {getSingerDetail} from '../../api/singer'
  import {ERR_OK} from '../../api/config'
  import {createSong} from '../../common/js/song'
  import {MusicList} from '../../components/music-list/music-list.vue'
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
      ]),
      title(){
        console.log(this.singer);
//        return this.singer.name;
      },
      bgImage(){
//        return this.singer.avatar;
      }
    },
    created(){
      this._getDetail();
    },
    methods: {
      _getDetail (){
        if (typeof this.singer == 'undefined') {//singer指向的是？
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.data.list);
//              console.log(res.data.list);
            console.log(this.songs);
          } else {

          }
        })
      },
      _normalizeSongs(list){
        let ret = [];
        list.forEach(function (item, index) {
          let musicData = item.musicData;
          if (musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData));
          }
        });
        return ret
      }
    },
    components: {MusicList}
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../stylus/variable.styl"

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>

