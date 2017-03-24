<template>
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
                v-loading="loading"
                element-loading-text="数据加载中..."               
                :data="tableData"
                height="500"
                stripe>
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
                layout="total, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading:false,
                currentPage:1,
                total:0,
                tableData: [],
                condition:{
                    plateNumber:null,
                    uniqueId:null
                }
            }
        },       
        created(){
            this.getData();
        },
        methods: {
            // 获取数据
            getData(pageNum){
                var me = this;
                var param = {
                    pageNumber:pageNum || 1,
                    pageSize:20
                };
                if(this.condition.plateNumber){
                    param.plateNumber = this.condition.plateNumber;
                }
                if(this.condition.uniqueId){
                    param.uniqueId = this.condition.uniqueId;
                }
                this.loading = true;
                this.$http.post('/avl/get-avl-info-list', param).then((response) => {
                    var data = response.data;
                    if (data.status === 'OK') {
                        var content = data.content;
                        me.tableData = content.result;
                        me.currentPage = pageNum;
                        me.total= content.totalCount;
                    } else {
                        me.utilHelper.callBackProcess(data);
                    }
                    me.loading = false;
                })
            },
            handleCurrentChange(pageNum){
                this.getData(pageNum);
            },
            onSubmit(){
                this.getData();
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>