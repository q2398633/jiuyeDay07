<template>
  <div class="login-container">
    <el-card class="login_box">
      <!-- 顶部LoGo -->
      <img src="../../assets/images/logo_index.png" alt />
      <!-- 表单 -->
      <el-form ref="loginForm" status-icon :model="loginForm" :rules="loginRules">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile"  placeholder="请输入您的手机号!"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input  v-model="loginForm.code" placeholder="请输入您的验证码!" style="width: 280px"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked"></el-checkbox>我已阅读并同意
          <el-link type="primary">用户协议</el-link>和<el-link type="primary">隐私保护</el-link>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="login()">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // 校验手机号的
    const checkMobile = (rule, value, callback) => {
      // 校验逻辑
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不对~'))
      }
    }
    return {
      // 表单对应的对象
      loginForm: {
        mobile: '',
        code: ''
      },
      // 表单校验规则对象
      loginRules: {
        mobile: [
          // 具体的校验规则
          { required: true, message: '手机号必填哦~', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码必填', trigger: 'blur' },
          { len: 6, message: '必须六位哦~', trigger: 'blur' }
        ]
      },
      checked: true
    }
  },
  methods: {
    login () {
      // 整体表单的校验
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 如果校验成功, 进行登录
          this.$http
            .post(
              'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
              this.loginForm
            )
            .then(res => {
              // res是响应对象,包含响应数据
              const data = res.data
              // 后台返回的json内容已经转换成了对象
              console.log(data)
              // 登录成功跳转首页
              this.$router.push('/')
            })
            .catch(() => {
              // 监听错误,使用消息提示组件
              this.$message.error('用户名或密码错误')
            })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .login_box {
    width: 450px;
    height: 350px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
        img {
            display: block;
            width: 200px;
            margin: 10px auto 20px;
        }
  }
}
.el-checkbox {
    margin-right: 5px;
}
</style>
