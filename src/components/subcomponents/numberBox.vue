<template>
  <div class="mui-numbox" data-numbox-min="1" data-numbox-max="max">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" @change='countChanged' ref="numbox"/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from '../../mui/js/mui.js'
export default {
    mounted() {//初始化数量选项框
      mui('.mui-numbox').numbox()
  },
  methods:{
    // 每当数据框数据被修改时，立即把最新的数据，通过事件调用传递给父组件
      countChanged() {
        // console.log(this.$refs.numbox.value);
        this.$emit('getcount', parseInt(this.$refs.numbox.value))
      }
  },
  props: ['max'],
  watch: {
    // 属性监听
    max: function(newVal, oldVal) {
      // 使用js api 设置numbox最大值
      mui('.mui-numbox').numbox().setOption('max', newVal)
    }
  }
};
</script>


<style lang="less" scoped>
</style>
