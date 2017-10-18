<template>
  <div ref="wrapper">
    <slot>
    </slot>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  export default{
    props: {
      probeType: {
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
      },
      listenScroll: {
        type: Boolean,
        default: false//scroll 是否监听滚动事件
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
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          scrollX:this.scrollX
        });
        if (this.listenScroll) {
          let me = this;
          (this.scroll).on('scroll', (pos) => {
            me.$emit('scroll', pos)
          });
        }
      },
      enable(){
        this.scroll.enable()
      },
      disable(){
        this.scroll.disable()
      },
      refresh(){
        this.scroll.refresh()
      },
      scrollTo(){
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement(){
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data(){
//          console.log(this.data);
        setTimeout(() => {
          this.refresh()
        }, 20)
      }
    }
  }
</script>
