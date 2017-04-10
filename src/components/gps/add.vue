<template>
    <div class="panel panel-transparent" v-loading="loading" element-loading-text="数据处理中....">
        <div class="panel-heading">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'GPSDevice' }">GPS设备管理</el-breadcrumb-item>
                <el-breadcrumb-item>新增GPS设备</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="panel-body">
            <el-row :gutter="20">
                <el-col :span="10">
                    <el-form ref="form" :model="form" :rules="rules" label-width="130px">
                        <el-form-item label="GPS设备编号" prop="uniqueId">
                            <el-input v-model="form.uniqueId" :maxlength="15"></el-input>
                        </el-form-item>
                        <el-form-item label="GPS设备类型" prop="name">
                            <el-select v-model="form.name" placeholder="请选择GPS设备类型">
                                <el-option label="ET-08S" value="ET-08S"></el-option>
                                <el-option label="ET-08K" value="ET-08K"></el-option>
                                <el-option label="ET-08BD" value="ET-08BD"></el-option>
                                <el-option label="ET-08B" value="ET-08B"></el-option>
                                <el-option label="ET-15S" value="ET-15S"></el-option>
                                <el-option label="ET-15K" value="ET-15K"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="绑定SIM卡号码" prop="simcard">
                            <el-input v-model="form.simcard" :maxlength="15"></el-input>
                        </el-form-item>
                        <el-form-item label="出库日期" required>
                            <el-col :span="11">
                                <el-form-item prop="outStockTime">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="form.outStockTime"
                                    :picker-options="pickerOptions"></el-date-picker>
                                </el-form-item>                                
                            </el-col>
                        </el-form-item>                        
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
                            <el-button @click="onCancel">取消</el-button>
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
            var checkNumber = (rule, value, callback) => {
                if (!/^[0-9]*$/.test(value)) {
                    callback(new Error('只能输入数字'));
                }else{
                    callback();
                }
            };
            return {
                loading:false,
                form:{
                    uniqueId:null,
                    name:null,
                    simcard:null,
                    outStockTime:null
                },
                rules: {
                    uniqueId: [
                        { required: true, message: 'GPS设备编号不能为空', trigger: 'blur' },
                        { validator: checkNumber, trigger: 'blur' }
                    ],
                    name: [
                       { required: true, message: 'GPS设备类型不能为空', trigger: 'change' }
                    ],
                    simcard: [
                        { required: true, message: 'SIM卡号码不能为空', trigger: 'blur' },
                        { validator: checkNumber, trigger: 'blur' }
                    ],
                    outStockTime: [
                        { type: 'date', required: true, message: '出库日期不能为空', trigger: 'change' }
                    ]
                },
                pickerOptions:{
                    disabledDate(time){
                        return time.getTime() > Date.now();
                    }
                }
            }
        },
        methods: {    
            handleCurrentChange(pageNum){
                this.getData(pageNum);
            },
            onSubmit(formName){
                var me = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        me.loading = true;
                        var outStockTime = me.utilHelper.formatDate(me.form.outStockTime);
                        me.form.outStockTime = outStockTime;
                        api.addGPS(me.form).then((response)=>{
                            var data = response.data;
                            if (data.status === 'OK') {
                                me.$message({
                                    message: '数据添加成功!',
                                    type: 'success'
                                });
                                me.utilHelper.changeRouter({name:'GPSDevice'});
                            } else {
                                var msg= data.errorMsg || '登录失败'
                                me.$message.error(msg);
                            }
                            me.loading = false;
                        });
                    }
                });
            },
            onCancel(){
                this.utilHelper.changeRouter({name:'GPSDevice'});
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>