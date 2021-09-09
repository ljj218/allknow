<!--
 * @Author: dragon
 * @Date: 2021-09-08 17:43:56
 * @LastEditTime: 2021-09-09 09:55:17
 * @LastEditors: dragon
 * @Description: 
 * @FilePath: \allknow\src\components\more.vue
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
