<!--
 * @Author: long_jj
 * @Date: 2021-09-02 14:13:00
 * @LastEditTime: 2021-09-06 17:13:22
 * @LastEditors: long_jj
 * @Description: 
 * @FilePath: \vue-template-demo-master\src\components\more.vue
-->
<template>
    <div class="more" @click="routerTo">
        {{text}}
        <van-icon name="arrow" />
    </div>
</template>

<script>
export default {
    name:"more",
    props:['text','path',],
    data() {
        return {

        };
    },
    created() {},
    mounted() {},
    methods: {
        routerTo(){
            if(!this.path) return;

            this.$router.push(this.path );
        }
    },
};
</script>

<style scoped lang="scss">
.more{
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 29px;
    // line-height: 35px;
    width: 100%;
    font-size: 12px;
    color: #8c8c8c;
    border-top: 1px solid rgb(239, 239, 239);
}
</style>
