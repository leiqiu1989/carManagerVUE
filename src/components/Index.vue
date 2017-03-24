<template>
    <div class="container">
        <div class="header">
            <h3>货车帮企业管理后台</h3>
        </div>
        <div class="content">
            <div class="left-content">
                <v-menu></v-menu>
            </div>
            <div class="right-content">
                <router-view name="contentView"></router-view>
            </div>
        </div>
    </div>    
</template>

<script>
    import menu from './base/menu.vue'; 
    export default {
        components:{
            "v-menu":menu
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    .header
        border-radius:2px
        height:50px
        line-height:50px
        background-color: #324157
        border-bottom:1px solid #ccc
        font-size:20px
        color:#fff
        letter-spacing:2px
        padding-left:10px
        > h3
            font-weight:700
    .content
        position: absolute
        bottom: 0
        top: 50px
        right: 0
        left: 0
        .left-content
            position:absolute
            top:0
            bottom:0
            width: 200px
            background-color:#eef1f6
        .right-content
            position: absolute
            top: 0
            left: 200px
            bottom: 0
            right: 0
            padding: 10px
</style>