<template>
    <div class="container">
        <div class="header">
            <h3>货车帮企业管理后台</h3>
        </div>
        <div class="content">
            <div class="silder">
                <nav>
                    <ul class="mcd-menu">
                        <li>
                            <a href="">
                                <i class="fa fa-home"></i>
                                <strong>车辆管理</strong>
                            </a>
                        </li>
                        <li>
                            <a href="" class="active">
                                <i class="fa fa-edit"></i>
                                <strong>GPS设备管理</strong>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <i class="fa fa-gift"></i>
                                <strong>设备故障</strong>                                
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <i class="fa fa-globe"></i>
                                <strong>模板管理</strong>                               
                            </a>
                        </li>                                        
                    </ul>
                </nav>
            </div>
            <div class="body">
                <div class="panel panel-transparent">
                    <div class="panel-heading">
                        <h3>设备故障</h3>
                    </div>
                    <div class="panel-toolbar">
                        <el-form :inline="true" :model="condition" class="demo-form-inline">
                            <el-form-item label="车牌号码" class="no-margin">
                                <el-input v-model="condition.plateNumber" placeholder="车牌号码"></el-input>
                            </el-form-item>
                            <el-form-item label="GPS设备编号" class="no-margin">
                                <el-input v-model="condition.uniqueId" placeholder="GPS设备编号"></el-input>
                            </el-form-item>
                            <el-form-item class="no-margin">
                                <el-button type="primary" @click="onSubmit">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="panel-body">
                        <el-table
                            :data="tableData"
                            stripe
                            height="500"
                            style="width: 100%">
                            <el-table-column
                            type="selection"
                            width="55">
                            </el-table-column>
                            <el-table-column
                            prop="uniqueId"
                            label="GPS设备编号">
                            </el-table-column>
                            <el-table-column
                            prop="statusDesc"
                            label="是否销售"
                            width="100">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="设备型号"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="plateNumber"
                            label="绑定车辆"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="orgName"
                            label="所属机构"
                            width="200">
                            </el-table-column>
                            <el-table-column
                            prop="simCard"
                            label="SIM卡号">
                            </el-table-column>
                            <el-table-column
                            label="销售日期">
                                 <template scope="scope">
                                    {{ scope.row.saleTime | dateformat("yyyy/MM/dd") }}
                                </template>
                            </el-table-column>
                            <el-table-column
                            label="套餐到期日期">
                                <template scope="scope">
                                    {{ scope.row.endTime | dateformat("yyyy/MM/dd") }}
                                </template>
                            </el-table-column>
                            <el-table-column
                            prop="avlStatus"
                            label="设备状态">
                            </el-table-column>
                            <el-table-column
                            label="操作"
                            width="150">
                            <template scope="scope">
                                <el-button type="text" size="small">查看</el-button>
                                <el-button type="text" size="small">编辑</el-button>
                            </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="panel-footer">
                        <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-size="20"
                            layout="total, prev, pager, next"
                            :total="total">
                            </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
    import { mapGetters,mapActions } from 'vuex';
    export default {
        data() {            
            return {
                currentPage:1,
                total:0,
                tableData: [],
                condition:{
                    plateNumber:null,
                    uniqueId:null
                }
            }
        },
        computed:{
            ...mapGetters(['loginStatus','getIdentity'])
        },
        mounted() {
            if(!this.loginStatus){
                //this.utilHelper.changeRouter('authorize');
            }
        },
        created(){
            this.getData();
        },
        methods: {
            // 获取数据
            getData(pageNum){
                var me = this;
                var identity = this.getIdentity;
                var param =$.extend({
                    pageNumber:pageNum || 1,
                    pageSize:20,
                    sid:identity.sid,
                    st:identity.st
                },identity);
                if(this.condition.plateNumber){
                    param.plateNumber = this.condition.plateNumber;
                }
                if(this.condition.uniqueId){
                    param.uniqueId = this.condition.uniqueId;
                }
                this.$http.post('/avl/get-avl-info-list', param).then((response) => {
                    var data = response.data;
                    if (data.status === 'OK') {
                        var content = data.content;
                        me.tableData = content.result;
                        me.currentPage = pageNum;
                        me.total= content.totalCount;
                    } else {
                        alert(data.errorMsg || '登录失败');
                    }
                })
            },
            handleCurrentChange(pageNum){
                this.getData(pageNum);
            },
            onSubmit(){
                //this.getData();
                alert(this.loginStatus)
                console.log(this.getIdentity);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    .header
        border-radius:2px
        height:60px
        line-height:60px
        background-color: #eef1f6
        border-bottom:1px solid #ccc
        font-size:20px
        color:black
        letter-spacing:2px
        padding-left:10px;
    .content
        position: absolute;
        bottom: 0
        top: 60px
        right: 0
        left: 0
        .body
            position: absolute
            top: 0
            border: 1px solid #ccc
            left: 200px
            bottom: 0
            right: 0
            padding: 10px
</style>