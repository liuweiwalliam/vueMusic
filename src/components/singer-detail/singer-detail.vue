<template>
  <transition name="slide">
    <div class="singer-detail">

    </div>
  </transition>
</template>
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

