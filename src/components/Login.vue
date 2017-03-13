<template>
    <div class="login">
        <div class="header">
            货车帮企业管理后台
        </div>
        <div class="content">
            <el-form ref="form">
            <el-form-item label="账 号">
                <el-input v-model="form.name" placeholder="请输入登录账号"></el-input>
            </el-form-item>
            <el-form-item label="密 码">
                <el-input v-model="form.pwd" type="password" placeholder="请输入登录密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登 录</el-button>
            </el-form-item>
            </el-form>
        </div>        
    </div>
    
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                form: {
                    name: '',
                    pwd: ''
                }
            }
        },
        methods: {
            validate(){
                if(!$.trim(this.form.name) || !$.trim(this.form.pwd)){
                    return false;
                }
                return true;
            },
            onSubmit() {
                var me = this;
                if(!this.validate()){
                    this.$message({
                        message: '账户名和密码不能为空!',
                        type: 'warning',
                        duration:1500
                    });
                    return false;                    
                }
                this.$http.post('/doLogin', {                    
                    username:this.form.name,
                    password:this.form.pwd                    
                }).then((response) => {
                    var data = response.data;
                    if (data.status === 'OK') {
                        var content = data.content;
                        if (content) {
                            me.setLoginStatus({
                                sid:content.id,
                                st:content.token
                            })
                        }
                        me.utilHelper.changeRouter('index');
                    } else {
                        var msg= data.errorMsg || '登录失败'
                        this.$message({
                            message: msg,
                            type: 'warning',
                            duration:1500
                        });
                    }
                })
            },
            ...mapActions(['setLoginStatus'])
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
    .login
        position:absolute
        top:30%
        left:50%
        width:450px
        height:auto
        margin-top:0
        transform:translate(-50%, -30%)
        border: 1px solid #cfcfcf
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2)
        .header{
            padding:12px
            color: #31708f
            background-color: #d9edf7
            border-color: #bce8f1
            font-size:14px
        }
        .content{
            padding:20px
        }
</style>