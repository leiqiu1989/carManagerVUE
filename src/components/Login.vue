<template>
    <div class="container">
        <div class="login">
            <div class="header">
                货车帮企业管理后台
            </div>
            <div class="content">
                <el-form v-loading="loading" :model="form" :rules="rules" element-loading-text="正在登陆..." ref="form">
                <el-form-item label="账 号" prop="name">
                    <el-input v-model="form.name" placeholder="请输入登录账号"></el-input>
                </el-form-item>
                <el-form-item label="密 码" prop="pwd">
                    <el-input v-model="form.pwd" type="password" placeholder="请输入登录密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')">登 录</el-button>
                    <el-button type="default" @click="onReset">重 置</el-button>
                </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../base/api'
    import { mapActions } from 'vuex'
    export default {
        data() {
            return {
                form: {
                    name: '13598',
                    pwd: '123456'
                },
                rules:{
                    name:[{
                        required: true, message: '用户名不能为空!', trigger: 'blur'
                    }],
                    pwd:[{
                        required: true, message: '密码不能为空!', trigger: 'blur'
                    }]
                },
                loading:false,
            }
        },
        methods: {
            onSubmit(form) {
                var me = this;
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        me.loading = true;
                        setTimeout(function() {
                            api.Login({                    
                                username:me.form.name,
                                password:me.form.pwd                    
                            }).then((response) => {
                                var data = response.data;
                                if (data.status === 'OK') {
                                    var content = data.content;
                                    if (content) {
                                        me.setLoginStatus(true);
                                        me.setIdentity({
                                            sid: content.id,
                                            st: content.token,
                                            username: me.form.name
                                        });
                                    }
                                    me.utilHelper.changeRouter({name:'GPSDevice'});
                                } else {
                                    var msg= data.errorMsg || '登录失败'
                                    me.$message.error(msg);
                                }
                                me.loading = false;
                            });
                        }, 500);
                    } else {
                        return false;
                    }
                });
            },
            onReset(){
                this.form.name = '';
                this.form.pwd = '';
            },
            ...mapActions(['setLoginStatus','setIdentity'])
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    .container
        position:absolute
        top:0
        bottom:0
        right:0
        left:0
        background-color:#1f2d3d
        .login
            position:absolute
            background-color:#fff
            top:30%
            left:50%
            width:450px
            height:auto
            margin-top:0
            transform:translate(-50%, -30%)
            border: 1px solid #cfcfcf
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2)
            .header
                padding:12px
                color: #31708f
                background-color: #d9edf7
                border-color: #bce8f1
                font-size:14px            
            .content
                padding:20px
            
    
</style>