<template>
  <div class="singer">
    <list-view :data="singers" @select='selectSinger'>
    </list-view>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getSingerList } from '../../api/singer'
  import { ERR_OK } from '../../api/config'
  import Singer from '../../common/js/singer'
  import ListView from '../../base/listview/listview.vue'
  //使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）
  import {mapMutations} from 'vuex' 
  const HOT_NAME = 'hot';
  const HOT_SINGER_LENGTH = 10;
  console.log(ListView);
  export default{
    data(){
      return {
        singers: []
      }
    },
    created(){
      this._getSingerList();
    },
    methods: {
      selectSinger(singer){
        this.setSinger(singer);//this.$store.commit('...')
//        this.$store.commit('SET_SINGER',singer)
        this.$router.push({
          path: `/singer/${singer.id}`
        });
      },
      _getSingerList(){
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = this._normalizeSinger(res.data.list);
//            console.log(this,_normalizeSinger);
//            console.log(this._normalizeSinger(res.data.list));
          }
        })
      },
      _normalizeSinger(list){
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        //此处可以添加校验
        list.forEach(function (item, index) {
          if (index <= 9) {
            map.hot.items.push(new Singer({id: item.Fsinger_mid, name: item.Fsinger_name}))//向hotname中push
          }
          const key = item.Findex;
          if (!map[key]) {//map下不存在这个key
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({id: item.Fsinger_mid, name: item.Fsinger_name}))
        });
        let hot = [], ret = [];
        for (let key in map) {
          let val = map[key];
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) { //不以a-z开头的是热门
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        });
        return hot.concat(ret)
      },
      ...mapMutations({
        setSinger:'SET_SINGER' //对应的是mutationTypes对应的常量
      })
    },
    components: {ListView}
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../stylus/variable.styl"
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
