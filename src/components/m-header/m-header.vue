<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">Walliam music</h1>
  </div>
</template>
<script type="text/ecmascript-6">
export default{}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../stylus/variable.styl"
  @import "../../stylus/mixin.styl"
body
  background: #000
  .m-header
    position: relative
    height: 44px
    text-align: center
    color: $color-theme
    font-size: 0
    .icon
      display: inline-block
      vertical-align: top
      margin-top: 6px
      width: 30px
      height: 32px
      margin-right: 9px
      bg-image('logo')
      background-size: 30px 32px
    .text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: 12px
        font-size: 20px
        color: $color-theme
</style>
