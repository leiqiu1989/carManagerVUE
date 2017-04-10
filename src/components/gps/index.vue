<template>
    <div class="panel panel-transparent flexbox" v-loading="loading" element-loading-text="数据加载中....">
        <div class="panel-heading">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'GPSDevice' }">GPS设备管理</el-breadcrumb-item>
                <el-breadcrumb-item>列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="panel-toolbar">
            <el-form :inline="true" :model="condition" class="demo-form-inline">
                <el-form-item label="车牌号码" class="no-margin">
                    <el-input v-model="condition.plateNumber" placeholder="车牌号码"></el-input>
                </el-form-item>
                <el-form-item label="GPS设备编号" class="no-margin">
                    <el-input v-model="condition.uniqueId" placeholder="GPS设备编号"></el-input>
                </el-form-item>
                <el-form-item label="SIM卡号码" class="no-margin">
                    <el-input v-model="condition.simcard" placeholder="SIM卡号码"></el-input>
                </el-form-item>
                <el-form-item class="no-margin">
                    <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="panel-toolbar">
            <el-button type="primary" size="small" @click="addGPS">
                <i class="fa fa-plus fa-patch"></i>
                新 增
            </el-button>
            <el-button type="primary" size="small">
                <i class="fa fa-shopping-cart fa-patch"></i>
                售 卖
            </el-button>
            <el-button type="primary" size="small">
                <i class="fa fa-upload fa-patch"></i>
                导 入
            </el-button>
            <el-button type="primary" size="small">
                <i class="fa fa-download fa-patch"></i>
                导 入
            </el-button>
        </div>
        <div class="panel-body grow">
            <el-table           
                :data="tableData"
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
                width="300">
                </el-table-column>
                <el-table-column
                prop="simCard"
                label="SIM卡号">
                </el-table-column>
                <el-table-column
                label="销售日期">
                    <template scope="scope">
                        <el-icon name="time" v-if="scope.row.saleTime"></el-icon>
                        {{ scope.row.saleTime | dateformat("yyyy/MM/dd") }} 
                    </template>
                </el-table-column>
                <el-table-column
                label="套餐到期日期">
                    <template scope="scope">
                        <el-icon name="time"></el-icon>
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
    import api from '../../base/api'
    export default {
        data() {
            return {
                loading:false,
                currentPage:1,
                total:0,
                tableData: [],
                condition:{
                    plateNumber:null,
                    uniqueId:null,
                    simcard:null
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
                api.GPSList(param).then((response) => {
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
                });
            },
            handleCurrentChange(pageNum){
                this.getData(pageNum);
            },
            onSubmit(){
                this.getData();
            },
            // 新增
            addGPS(){
                this.utilHelper.changeRouter('gps/add');
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>