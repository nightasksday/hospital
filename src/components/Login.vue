<template>
  <div id="base_login"
       style="height: 100%;">
    <div class="login_container">
      <el-form :model="loginForm"
               :rules="rules"
               label-position="top"
               label-width="0px"
               size="small"
               style="width: 260px;margin: auto"
               v-loading="loading">
        <div class="login_title" style="">登录</div>
        <el-form-item prop="id" label="用户名" class="form-label" style="text-align: left"
                      label-width="80px">
          <el-input type="text"
                    v-model="loginForm.id"
                    auto-complete="off"
                    placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button type="primary"
                     style="background-color: #356eff;border-color: #356eff;width: 260px;border-radius: 3px;margin-top: 25px;margin-bottom: 5px"
                     v-on:click="login" round>登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>

</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        id: 0,
      },
      rules: {
        id: [{required: true, message: 'ID不得为空', trigger: 'blur'}],
      },
      loading: false,
      staff:{
        job:2,
        id:1
      }
    }
  },
  methods: {
    login() {
      if (this.loginForm.id === "") {
        this.$message.error('ID名不得为空');
        return;
      }
      // this.$store.commit('setCurrentUser', this.staff);
      // this.$router.replace({path: '/Home'})
      this.$axios.post('/login', {
        id: this.loginForm.id
      })
        .then(resp => {
          if (resp.data.staff === null){
            throw error()
          }
          console.log(resp)
          if (resp.status === 200) {
            this.$message({
              message: '登陆成功',
              type: 'success'
            });
            this.$store.commit('setCurrentUser', resp.data.staff);
            this.$router.replace({path: '/Home'})
          }
        })
        .catch(error =>
          this.$message.error('ID不存在')
          
    )

    }
  }
}
</script>

<style scoped>
  #base_login {
    background-color: whitesmoke;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }

  body {
    margin: 0;
    padding: 0;
  }

  .login_container {
    border-radius: 3px;
    background-clip: padding-box;
    top: 50%;
    position: relative;
    height: 280px;
    margin: -187px auto;
    width: 330px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 5px auto 45px auto;
    text-align: center;
    font-size: 32px;
    color: black;
  }
</style>
<style>
  .login_container .form-label .el-form-item__label {
    padding-bottom: 3px;
    color: #888888;
    font-size: 12px;
  }
</style>
