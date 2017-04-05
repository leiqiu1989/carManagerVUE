<template>
    <el-menu default-active="2-1">
        <el-submenu index="1">
            <template slot="title">
                <i class="fa fa-car"></i>
                车辆管理
            </template>
            <el-menu-item index="1-1">
                <router-link :to="{ name: 'CarManager'}">车辆管理</router-link>
            </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title">
                <i class="fa fa-signal"></i>
                GPS设备管理
            </template>
            <el-menu-item index="2-1">                
                <router-link :to="{ name: 'GPSDevice'}">GPS设备管理</router-link>
            </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title">
                <i class="fa fa-clipboard"></i>
                模板管理
            </template>
            <el-menu-item index="3-1">
                <router-link :to="{ name: 'TemplateManager'}">模板管理</router-link>
            </el-menu-item>
        </el-submenu>
        <el-submenu index="4">
            <template slot="title">
                <i class="fa fa-bar-chart"></i>
                车辆状态报表
            </template>
            <el-menu-item index="4-1">
                <router-link :to="{ name: 'TemplateManager'}">车辆状态报表</router-link>
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        name: 'menu'
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>    
</style>