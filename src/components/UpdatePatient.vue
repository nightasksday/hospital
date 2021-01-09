<template>
  <el-container>
    <el-main style="height:100%;overflow-y: auto">
      <div class="subject">修改病人信息</div>
      <div class="shadowBox" style="padding: 20px;margin-right: 0;display: flex">
        <div style="margin-top: 0;margin-left: 400px;text-align: left;width: 400px;color: black;">

          <div v-if="currentJob === 0">
            <!-- 修改生命状态-->
            <div>
              <div style="font-size: 20px">修改生命状态</div>
              <el-form label-position="top" size=mini ref="applyForm"
                       label-width="150px" class="demo-ruleForm" style="margin:9px 0 auto;width: 330px;">

                <el-form-item label="生命状态" prop="liveState" class="form-label" style="text-align: left">
                  <el-select v-model="newLiveState" placeholder="请选择生命状态" style="width: 330px">
                    <el-option
                      v-for="item in liveStateOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" v-on:click="submitNewLiveState"
                             style="background-color: #356eff;border-color: #356eff;width: 100px;height: 30px;float: right;margin-top: -10px">
                    提交
                  </el-button>
                </el-form-item>

              </el-form>
            </div>
            <div v-if="newLiveState === 1">
              <div style="font-size: 20px">修改病情评级</div>
              <el-form label-position="top" size=mini ref="applyForm"
                       label-width="150px" class="demo-ruleForm" style="margin:9px 0 auto;width: 330px;">

                <el-form-item label="病情评级" prop="sickLevel" class="form-label" style="text-align: left">
                  <el-select v-model="newGrade" placeholder="请选择病情评级" style="width: 330px">
                    <el-option
                      v-for="item in sickLevelOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" v-on:click="submitNewSickLevel"
                             style="background-color: #356eff;border-color: #356eff;width: 100px;height: 30px;margin-top: -10px;float: right">
                    提交
                  </el-button>
                </el-form-item>

              </el-form>
            </div>

          </div>

            <div v-if="currentJob === 3">
              <div style="font-size: 20px">登记病人每日信息</div>
              <el-form :model="dailyInformation" label-position="top" size=mini ref="applyForm"
                       label-width="150px" class="demo-ruleForm" style="margin:9px 0 auto;width: 330px;">

                <el-form-item label="登记日期" prop="currentDate" class="form-label" style="text-align: left">
                  <el-date-picker type="date" v-model="dailyInformation.currentDate" value-format="yyyy-MM-dd"
                                  autocomplete="off" style="width: 330px"
                                  :clearable="false" :editable="false"
                                  placeholder="请输入登记日期"
                                  prefix-icon="1"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="生命状态" class="form-label" style="text-align: left">
                  <el-select v-model="dailyInformation.lifeCondition" placeholder="请选择生命状态" style="width: 330px">
                    <el-option
                      v-for="item in liveStateOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="体温" class="form-label" style="text-align: left">
                  <el-input type="text" v-model="dailyInformation.temperature" autocomplete="off"
                            placeholder="请输入病人体温" style="width: 330px" autosize></el-input>
                </el-form-item>

                <el-form-item label="症状" class="form-label" style="text-align: left">
                  <el-input type="textarea" v-model="dailyInformation.symptom" autocomplete="off"
                            placeholder="请输入病人今日症状" style="width: 330px;"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" v-on:click="submitDailyInformation"
                             style="background-color: #356eff;border-color: #356eff;width: 100px;height: 30px;float: right;margin-top: -10px">
                    提交
                  </el-button>
                </el-form-item>

              </el-form>
            </div>

            <!-- 添加核酸检测单-->
            <div v-if="(currentJob === 0 || currentJob === 3) && newLiveState === 1">
              <div style="font-size: 20px">登记新核酸检测单</div>
              <el-form :model="testForm" label-position="top" size=mini ref="applyForm"
                       label-width="150px" class="demo-ruleForm" style="margin:9px 0 auto;width: 330px;">

                <el-form-item label="检测日期" prop="testDate" class="form-label" style="text-align: left">
                  <el-date-picker type="date" v-model="testForm.testDate" value-format="yyyy-MM-dd"
                                  autocomplete="off" style="width: 330px"
                                  :clearable="false" :editable="false"
                                  placeholder="请输入病人核酸检测日期"
                                  prefix-icon="1"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="核酸检测结果" prop="testDate" class="form-label" style="text-align: left">
                  <el-select v-model="testForm.testResult" placeholder="请选择检测结果" style="width: 330px">
                    <el-option
                      v-for="item in testResultOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="病情评级" class="form-label" style="text-align: left">
                  <el-select v-model="testForm.grade" placeholder="请选择病情评级" style="width: 330px">
                    <el-option
                      v-for="item in sickLevelOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" v-on:click="submitNewTest"
                             style="background-color: #356eff;border-color: #356eff;width: 100px;height: 30px;float: right;margin-top: -10px">
                    提交
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
      </div>
          </div>

    </el-main>
  </el-container>
</template>

<script>
    export default {
        name: "UpdatePatient",

      data() {
        return {
          patientId: this.$store.state.modifyPatientId,
          currentId: this.$store.state.currentId,
          currentJob: this.$store.state.currentJob,
          sickLevelOption: [
            {
              value: 1,
              label: "轻症"
            },
            {
              value: 2,
              label: "重症"
            },
            {
              value: 3,
              label: "危重症"
            }
          ],
          liveStateOption: [
            {
              value: 1,
              label: "正在治疗"
            },
            {
              value: 2,
              label: "死亡"
            },
          ],
          testResultOption: [
            {
              value: 0,
              label: "阳性"
            },
            {
              value: 1,
              label: "阴性"
            },
          ],

          newGrade: '',
          newLiveState: 1,
          dailyInformation: {
            temperature: '',
            currentDate:'',
            symptom: '',
            lifeCondition: '',
          },

          testForm: {
            grade: '',
            testResult: '',
            testDate: ''
          }

        }
      },
      methods: {
        submitNewSickLevel() {
          if (this.newGrade === '') {
            this.$message.error("请选择病情评级");
            return
          }
          this.$axios.post('/modifyGrade', {
            patientId: this.patientId,
            newGrade: this.newGrade
          })
            .then(resp => {
              if (resp.status === 200) {
                this.$message.success("修改成功");
                this.newGrade = ''
              } else {
                this.$message.success("修改错误，请重试")
              }
            })
        },
        submitNewLiveState() {
          if (this.newLiveState === '') {
            this.$message.error("请选择生命状态");
            return
          }
          this.$axios.post('/modifyLiveState', {
            patientId: this.patientId,
            newLiveState: this.newLiveState
          })
            .then(resp => {
              if (resp.status === 200) {
                this.$message.success("修改成功");
                this.newLiveState = ''
              } else {
                this.$message.success("修改错误，请重试")
              }
            })
        },

        submitDailyInformation() {
          if (this.dailyInformation.currentDate === '' ||
            this.dailyInformation.temperature === '' ||
            this.dailyInformation.symptom === '' ||
            this.dailyInformation.lifeCondition === ''){
            this.$message.error("任何一项不得为空");
            return
          }
          this.$axios.post('/submitDailyInformation', {
            currentDate: this.dailyInformation.currentDate,
            patientId: this.patientId,
            temperature: this.dailyInformation.temperature,
            symptom: this.dailyInformation.symptom,
            lifeCondition: this.dailyInformation.lifeCondition,
          })
            .then(resp => {
              if (resp.data.status === 0) {
                this.$message.success("提交成功");
                this.dailyInformation.currentDate = '';
                this.dailyInformation.temperature = '';
                this.dailyInformation.symptom = '';
                this.dailyInformation.lifeCondition = '';
              } else {
                this.$message.error("今日已提交，无法重复提交")
              }
            })
        },

        submitNewTest() {
          if (this.testForm.testDate === '' ||
            this.testForm.testResult === '' ||
            this.testForm.grade === '') {
            this.$message.error("任何一项不得为空");
            return
          }
          this.$axios.post('/submitNewTest', {
            patientId: this.patientId,
            grade: this.testForm.grade,
            testResult: this.testForm.testResult,
            testDate: this.testForm.testDate
          })
            .then(resp => {
              if (resp.data.status === 0) {
                this.$message.success("提交成功");
                this.testForm.testDate = '';
                this.testForm.testResult = '';
                this.testForm.grade = ''
              } else {
                this.$message.error("今日已提交，无法重复提交")
              }
            })
        }
      }
    }
</script>

<style>
  .el-input__inner {
    padding-left: 10px!important;
    padding-right: 10px!important;
  }
  .el-textarea__inner {
    padding-left: 10px!important;
    padding-right: 10px!important;
    border-radius: 2px;
    letter-spacing: 0;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
</style>
