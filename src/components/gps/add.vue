<template>
    <div class="panel panel-transparent">
        <div class="panel-heading">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'GPSDevice' }">GPS设备管理</el-breadcrumb-item>
                <el-breadcrumb-item>新增GPS设备</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="panel-body">
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                        <el-form-item label="GPS设备编号">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="GPS设备类型">
                            <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="绑定SIM卡号码">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="活动时间">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>                        
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">立即创建</el-button>
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import api from '../../base/api'
    export default {
        data() {
            return {
                form:{

                },
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    region: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    date1: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    date2: [
                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ]
                }
            }
        },       
        created(){
            
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
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>