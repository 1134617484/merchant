 <template>
  <div class="container">
    <div class="config_success">
      <div class="upload_attestation" v-if="status==0">
        <div class="upload_attestation_just">
          身份证人像面
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            action
            accept=".png, .jpg"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUploadJust"
            :on-change="onchange_just"
          >
            <img v-if="imageUrl.just" :src="imageUrl.just" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="upload_attestation_reverse">
          身份证国徽面
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            action
            accept=".png, .jpg"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-change="onchange_avatar"
          >
            <img v-if="imageUrl.avatar" :src="imageUrl.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>

      <!-- <div v-if="status==0"><img src="@/assets/images/go.png"/><span>未认证</span></div> -->
      <div class="relatice" v-if="status==3">
        <img src="@/assets/images/go.png" />
        <span>您已认证成功!</span>
      </div>
      <div class="relatice" v-if="status==1">
        <img src="@/assets/images/go.png" />
        <span>正在认证中!</span>
      </div>
      <div v-if="status==2" class="relatice error">
        <img src="@/assets/images/error.png" />
        <span class="error_right">认证失败!</span>
      </div>
        <p  v-if="status==2" class="error_cause">认证失败原因: {{error_remarks}}</p>
        <p v-if="status==2" class="error_p" ><span class="error_url" @click="again">重新认证</span></p>

    </div>
    <div class="example" v-if="status==0">
      <h1 class="example-title">
        身份证拍摄示例
        <!-- <a class="link" href="javascript:;">常见问题</a> -->
      </h1>
      <div class="example-wrapper">
        <ul class="flex example-list">
          <li class="example-item flex-1">
            <div class="example-item-inner">
              <img
                src="https://mqq-imgcache.gtimg.cn/res/mqq/auth/img/idcard/ico_upload_example0.png"
                class="example-item-img"
              />
              <span class="ico-example-success"></span>
            </div>
            <p class="example-tips">标准</p>
          </li>
          <li class="example-item flex-1">
            <div class="example-item-inner">
              <img
                src="https://mqq-imgcache.gtimg.cn/res/mqq/auth/img/idcard/ico_upload_example1.png"
                class="example-item-img"
              />
              <span class="ico-example-error"></span>
            </div>
            <p class="example-tips">边框缺失</p>
          </li>
          <li class="example-item flex-1">
            <div class="example-item-inner">
              <img
                src="https://mqq-imgcache.gtimg.cn/res/mqq/auth/img/idcard/ico_upload_example2.png"
                class="example-item-img"
              />
              <span class="ico-example-error"></span>
            </div>
            <p class="example-tips">字迹模糊</p>
          </li>
          <li class="example-item flex-1">
            <div class="example-item-inner">
              <img
                src="https://mqq-imgcache.gtimg.cn/res/mqq/auth/img/idcard/ico_upload_example3.png"
                class="example-item-img"
              />
              <span class="ico-example-error"></span>
            </div>
            <p class="example-tips">有反光点</p>
          </li>
        </ul>
      </div>
      <div class="mod-form">
        <!-- <div class="form-agreement">
          <label class="form-check-wrap" for="agreement-check">
            <div class="form-check-inner">
              <input type="checkbox" checked class="form-checkbox" id="agreement-check" />
            </div>
          </label>
          同意接受
          <a
            class="form-link"
            href="javascript:;"
          >安吉商户平台相关协议</a>
        </div>-->
      </div>
      <el-button type="primary" class="submitBtn" @click="submit_upload">立即提交</el-button>
    </div>
  </div>
</template>

<script src='./AC.js'></script>

<style lang="css" scoped>
</style>
<style lang="css" scoped src='./AC.css'></style>