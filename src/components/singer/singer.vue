<template>
  <div class="singer">

  </div>
</template>

<script type="text/ecmascript-6">
  import { getSingerList } from '../../api/singer'
  import { ERR_OK } from '../../api/config'
  const HOT_NAME  = 'remen';
  const HOT_SINGER_LENGTH = 10;
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
      _getSingerList(){
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = res.data.list;
            }
        })
      }
    },
    _normalizeSinger(list){
      let map = {
        hot:{
          title:HOT_NAME,
          items:[]
        }
      }
      //ci chu keyi tianjai jiaoyan
      list.forEach(function (item , index) {
        if(index <= 9){
          map.hot.item.push({
            id:item.Fsinger.mid,
            name:item.Fsinger.name,
            avartar:`https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger.mid}.jpg?max_age=2592000`
          })
        }
        const key = item.Findex;
        if(!map[key]){
          map[key]= {
            title:key,
            item:[]
          }
        }
      })
    }
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
