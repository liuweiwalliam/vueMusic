<template>
  <div ref="wrapper">
    <slot>

    </slot>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better_scroll';
  export default{
    props: {
      probtype: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: null
      },
      data: {
        type: Array,
        default: null
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll(){
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll({
          probeType: this.probeType,
          click: this.click
        })
      },
      enable(){
        this.scroll && this.scroll.enable();
      },
      disable(){
        this.scroll && this.scroll.disable();
      },
      refresh(){
        this.scroll && this.scroll.refresh()
      }
    },
    watch: {
      data(){
        setTimeout()
      }
    }
  }

</script>
