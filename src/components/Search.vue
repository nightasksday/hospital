<template>
  <el-container>
    <el-main style="height:100%;overflow-y: auto">
      <div class="subject">查询与修改</div>
      <div class="shadowBox" style="padding: 20px;margin-right: 0;display: flex">
        <div style="margin-top: 0;margin-left: 11px;text-align: left;width: 330px;color: black;">
          <div class="innerHeader">
          <div class="innerTitle">信息管理</div></div>
          <!--    查询护士长并显示其结果      -->
          <div v-if="this.currentJob === 0">

            <div style="font-size: 18px;display: flex"><div style="width: 470px;margin-top: 2px">当前区域护士长</div>
              <el-form label-position="top" size=mini ref="applyForm" label-width="150px" class="demo-ruleForm" style="width: 330px;float: right">
              <el-form-item>
                <el-button type="primary" v-on:click="searchNurseLeader"
                           style="background-color: #356eff;border-color: #356eff;width: 100px;height: 30px;float: right">
                  查询
                </el-button>
              </el-form-item>
            </el-form></div>

          </div>

          <!--    查询病床并显示其结果      -->
          <div v-if="this.currentJob === 2">
            <div style="font-size: 18px;display: flex"><div style="width: 470px;margin-top: 2px">当前区域的病床</div>
            <el-form label-position="top" size=mini ref="applyForm"
                     label-width="150px" class="demo-ruleForm" style="width: 330px;float: right">
              <el-form-item>
                <el-button type="primary" v-on:click="searchSickBed"
                           style="background-color: #356eff;border-color: #356eff;width: 100px;height: 30px;float: right">
                  查询
                </el-button>
              </el-form-item>
            </el-form></div>
          </div>

            <!--    查询当前区域病房护士并显示其结果      -->
            <div v-if="this.currentJob === 0 || this.currentJob === 2">
              <div style="font-size: 18px;display: flex"><div style="width: 700px;margin-top: 2px">当前区域病房护士</div>
              <el-form label-position="top" size=mini ref="applyForm"
                       label-width="150px" class="demo-ruleForm" style="width: 330px;">
                <el-form-item>
                  <el-button type="primary" v-on:click="searchRoomNurse"
                             style="background-color: #356eff;border-color: #356eff;width: 100px;height: 30px;float: right">
                    查询
                  </el-button>
                </el-form-item>
              </el-form>
            </div>

            </div>
            <div style="font-size: 18px;display: flex">
              <div style="width: 800px;margin-top: 2px" v-if="currentJob===0||currentJob===2">当前区域病人</div>
              <div style="width: 800px;margin-top: 2px" v-if="currentJob===1">各区域病人</div>
              <div style="width: 800px;margin-top: 2px" v-if="currentJob===3">您负责的病人</div>
              <el-form label-position="top" size=mini ref="applyForm"
                       label-width="150px" class="demo-ruleForm" style="width: 330px;">
                <el-form-item>
                  <el-button type="primary" v-on:click="searchPatient"
                             style="background-color: #356eff;border-color: #356eff;width: 100px;height: 30px;float: right;">
                    查询
                  </el-button>
                </el-form-item>
              </el-form>
            </div>

            <el-collapse v-model="activeNames" @change="handleChange" v-if="this.currentJob === 0 || this.currentJob === 2">
              <el-collapse-item title="病人筛选" name="1">
                <div>

                  <!--    根据病房护士的id查询病人      -->
                  <div>
                    <div style="font-size: 18px">根据<span style="color:black">
                      <span>病房护士</span>的id</span>查询病人
                    </div>
                    <el-form label-position="top" size=mini ref="applyForm"
                             label-width="150px" style="margin:9px 0 auto;width: 330px;">
                      <el-form-item prop="name" class="form-label" label-width="80px"
                                    v-if="this.currentJob != 3">
                        <el-input type="text" v-model="roomNurseIdForSearchPatient"
                                  auto-complete="off" placeholder="请输入护士id" style="width: 330px">
                        </el-input>
                      </el-form-item>

                      <el-form-item>
                        <el-button type="primary" v-on:click="searchPatientByRoomNurseId"
                                   style="background-color: #356eff;border-color: #356eff;width: 100px;height: 30px;float: right;margin-top: -10px">
                          查询
                        </el-button>
                      </el-form-item>
                    </el-form>

                  </div>

                </div>
              </el-collapse-item>
            </el-collapse>

        </div>
        <div style="margin-top: 0;margin-left: 30px;text-align: left;width: 100%;color: black;" v-if="tableDisplayed === 2">
          <div class="innerHeader" style="margin-bottom: 0">
          <div class="innerTitle">查询结果</div></div>

          <el-table class="table_head table_border" :data="patientTableData">
            <el-table-column prop="id" label="ID" column-key="id" width="60" sortable></el-table-column>
            <el-table-column prop="name" label="姓名" column-key="name" width="80"></el-table-column>
            <el-table-column prop="gender" label="性别" column-key="gender" width="80"></el-table-column>
            <el-table-column prop="age" label="年龄" column-key="age" width="80"></el-table-column>
            <el-table-column prop="treatArea" label="治疗区域" v-if="this.currentJob === 1" column-key="treatArea"
                             :filters="[{text: '轻症', value: '轻症'}, {text: '重症', value: '重症'}, {text: '危重症', value: '危重症'}, {text: '隔离区', value: '隔离区'}]" :filter-method="filterHandler"></el-table-column>
            <el-table-column prop="nurseID" label="病房护士ID" v-if="this.currentJob !== 1" column-key="nurseID" width="100"></el-table-column>
            <el-table-column prop="grade" label="病情评级" column-key="grade" width="100"
                             :filters="[{text: '轻症', value: '轻症'}, {text: '重症', value: '重症'}, {text: '危重症', value: '危重症'}]" :filter-method="filterHandler"></el-table-column>
            <el-table-column prop="waitTransfer" label="待转移" column-key="waitTransfer" width="80"
                             :filters="[{text: '是', value: '是'}, {text: '否', value: '否'}]" :filter-method="filterHandler"></el-table-column>
            <el-table-column prop="leaveHospital" label="可出院" column-key="leaveHospital" width="80"
                             :filters="[{text: '是', value: '是'}, {text: '否', value: '否'}]" :filter-method="filterHandler"></el-table-column>
            <el-table-column prop="lifeCondition" label="生命状态" column-key="lifeCondition"
                             :filters="[{text: '出院', value: '出院'}, {text: '治疗', value: '治疗'}, {text: '死亡', value: '死亡'}]" :filter-method="filterHandler"></el-table-column>
            <el-table-column prop="modify" label="操作" column-key="modify" width="80"  v-if="this.currentJob===0||this.currentJob===3">
              <template slot-scope="scope">
                <el-button @click="handleModify(scope.$index)" v-if="canRegister(scope.$index)" type="text">登记</el-button>
                <el-button @click="leaveHospital(scope.$index)" v-if="canLeave(scope.$index)" type="text">出院</el-button>
              </template>
            </el-table-column>
          </el-table>

        </div>
        <div style="margin-top: 0;margin-left: 30px;text-align: left;width: 380px;color: black;" v-if="tableDisplayed === 1">
          <div class="innerHeader" style="margin-bottom: 0">
            <div class="innerTitle">查询结果</div></div>
          <el-table class="table_head table_border" :data="staffTableData">
            <el-table-column prop="id" label="ID" column-key="id" width="60" sortable></el-table-column>
            <el-table-column prop="name" label="姓名" column-key="name" width="80"></el-table-column>
            <el-table-column prop="gender" label="性别" column-key="gender" width="80"></el-table-column>
            <el-table-column prop="age" label="年龄" column-key="age" width="80"></el-table-column>
            <el-table-column prop="delete" label="操作" column-key="delete" width="80" v-if="currentJob===2">
              <template slot-scope="scope">
                <el-button @click="handleDelete(scope.$index)" type="text" size="small">删除</el-button></template>
              </el-table-column>
          </el-table>
        </div>
        <div style="margin-top: 0;margin-left: 30px;text-align: left;width: 240px;color: black;" v-if="tableDisplayed === 3">
          <div class="innerHeader" style="margin-bottom: 0">
            <div class="innerTitle">查询结果</div></div>
          <el-table class="table_head table_border" :data="bedTableData">
            <el-table-column prop="id" label="ID" column-key="id" width="60" sortable></el-table-column>
            <el-table-column prop="roomID" label="病房号" column-key="roomID" width="80"></el-table-column>
            <el-table-column prop="state" label="状态" column-key="state" width="100"></el-table-column>
          </el-table>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
    export default {
      name: "Search",
      data() {
        return {
          currentJob: this.$store.state.currentJob,
          currentId: this.$store.state.currentId,
          tableDisplayed:0,
          searchID:'',
          roomNurseIdForSearchPatient:'',
            bedTableData:[{
            id: '0',
            roomID: '1',
            state: '空闲'
          }, {
            id: '1',
            roomID: '1',
            state: '空闲'
          }, {
            id: '2',
            roomID: '1',
            state: '空闲'
          }, {
            id: '3',
            roomID: '1',
            state: '3号病人使用'
          }],
          staffTableData:[{
            id: '0',
            name: '王小虎',
            gender: '男',
            age: 8,
          }, {
            id: '1',
            name: '王小虎',
            gender: '男',
            age: 8,
          }, {
            id: '3',
            name: '王小虎',
            gender: '男',
            age: 8,
          }, {
            id: '5',
            name: '王小虎',
            gender: '男',
            age: 8,
          }],
          patientTableData:[{
            id: '0',
            name: '王小虎',
            gender: '男',
            age: 8,
            treatArea: '轻症区',
            nurseID: 1,
            grade: '轻症',
            waitTransfer:'是',
            leaveHospital: '是',
            lifeCondition: '出院'
          }, {
            id: '1',
            name: '王小虎',
            gender: '男',
            age: 8,
            treatArea: '危重症区',
            nurseID: 1,
            grade: '重症',
            waitTransfer:'是',
            leaveHospital: '否',
            lifeCondition: '出院'
          }, {
            id: '2',
            name: '王小虎',
            gender: '男',
            age: 8,
            treatArea: '轻症区',
            nurseID: 1,
            grade: '轻症',
            waitTransfer:'是',
            leaveHospital: '是',
            lifeCondition: '出院'
          }, {
            id: '3',
            name: '王小虎',
            gender: '男',
            age: 8,
            treatArea: '隔离区',
            nurseID: 1,
            grade: '轻症',
            waitTransfer:'否',
            leaveHospital: '是',
            lifeCondition: '治疗'
          }]

        }
      },
      methods: {
        handleDelete(index) {
          alert(this.staffTableData[index].id)
        },

        canRegister(index) {
          return this.patientTableData[index].leaveHospital === "否"
        },

        canLeave(index) {
          return this.patientTableData[index].leaveHospital === "是" && this.currentJob === 0 && this.patientTableData[index].treatArea === "轻症"
        },

        handleModify(index) {
          this.$store.state.modifyPatientId = this.patientTableData[index].id;
          this.$router.replace({path: '/UpdatePatient'})
        },

        filterHandler(value, row, column) {
          const property = column['property'];
          return row[property] === value;
        },

        proceedPatient(patient) {
      this.patientTableData = [];
      for (let i = 0; i < patient.length; i++) {
        if (patient[i].gender === 0) {
          patient[i].gender = '男'
        } else {
          patient[i].gender = '女'
        }
        if (patient[i].treatArea === 0) {
          patient[i].treatArea = '隔离区'
        } else if (patient[i].treatArea === 1) {
          patient[i].treatArea = '轻症区'
        } else if (patient[i].treatArea === 2) {
          patient[i].treatArea = '重症区'
        } else if (patient[i].treatArea === 3) {
          patient[i].treatArea = '危重症区'
        }
        if (patient[i].grade === 1) {
          patient[i].grade = '轻症'
        } else if (patient[i].grade === 2) {
          patient[i].grade = '重症'
        } else if (patient[i].treatArea === 3) {
          patient[i].grade = '危重症'
        }
        if (patient[i].waitTransfer === 0) {
          patient[i].waitTransfer = '否'
        } else {
          patient[i].waitTransfer = '是'
        }
        if (patient[i].leaveHospital === 0) {
          patient[i].leaveHospital = '否'
        } else {
          patient[i].leaveHospital = '是'
        }
        if (patient[i].lifeCondition === 0) {
          patient[i].lifeCondition = '出院'
        } else if (patient[i].lifeCondition === 1) {
          patient[i].lifeCondition = '治疗'
        } else if (patient[i].lifeCondition === 2) {
          patient[i].lifeCondition = '死亡'
        }
        this.patientTableData.push(
          {
            id: patient[i].id,
            name: patient[i].name,
            gender: patient[i].gender,
            age: patient[i].age,
            treatArea: patient[i].treatArea,
            nurseID: patient[i].nurseID,
            grade: patient[i].grade,
            waitTransfer: patient[i].waitTransfer,
            leaveHospital: patient[i].leaveHospital,
            lifeCondition: patient[i].lifeCondition
          }
        );
      }
      this.$message.success("查询成功")
    },

        searchPatient() {
          this.tableDisplayed = 2;



          if (this.currentJob === 0||this.currentJob === 2) {
            this.$axios.post('/searchAreaPatient', {
              staffId: this.currentId
            })
              .then(resp => {
                console.log(resp);
                let patient = resp.data.patient;
                this.proceedPatient(patient);
              })
              .catch(error => {
                this.$message.error("查询失败，请重试");
                console.log(error)
              })
          }
          if (this.currentJob === 1) {
            this.$axios.post('/searchAllPatient', {
              staffId: this.currentId
            })
              .then(resp => {
                console.log(resp);
                let patient = resp.data.patient;
                this.proceedPatient(patient);
              })
              .catch(error => {
                this.$message.error("查询失败，请重试");
                console.log(error)
              })
          }
          if (this.currentJob === 3) {
            this.$axios.post('/searchNursePatient', {
              staffId: this.currentId
            })
              .then(resp => {
                console.log(resp);
                let patient = resp.data.patient;
                this.proceedPatient(patient);
              })
              .catch(error => {
                this.$message.error("查询失败，请重试");
                console.log(error)
              })
          }

        },

        searchPatientByRoomNurseId() {
          if (this.roomNurseIdForSearchPatient === '') {
            this.$message.error("护士id不得为空");
            return
          }
          this.$axios.post('/searchPatientByRoomNurseId', {
            staffId: this.currentId,
            roomNurseId: this.roomNurseIdForSearchPatient
          })
            .then(resp => {
              console.log(resp);
              if (resp.data.status === 1) {
                this.$message.error("此人不在您的管辖范围内")
                return
              }
              let patient = resp.data.patient;
              this.proceedPatient(patient);
            })
            .catch(error => {
              this.$message.error("查询失败，请重试");
              console.log(error)
            })

        },

        searchNurseLeader() {
          this.tableDisplayed = 1;
          this.$axios.post('/searchNurseLeader', {
            staffId: this.currentId
          })
            .then(resp => {
              console.log(resp);
              this.nurseLeaderResult = [];
              if (resp.data.nurseLeader.gender === 0) {
                resp.data.nurseLeader.gender = '男'
              } else {
                resp.data.nurseLeader.gender = '女'
              }
              this.nurseLeaderResult.push(
                {
                  id: resp.data.nurseLeader.id,
                  name: resp.data.nurseLeader.name,
                  gender: resp.data.nurseLeader.gender,
                  age: resp.data.nurseLeader.age
                }
              );
              this.$message.success("查询成功")
            })
            .catch(error => {
              this.$message.error("查询失败，请重试");
              console.log(error)
            })
        },

        searchRoomNurse() {
          this.tableDisplayed = 1;
          this.$axios.post('/searchRoomNurse', {
            staffId: this.currentId
          })
            .then(resp => {
              console.log(resp);
              this.roomNurseResult = [];
              for (var i = 0; i < resp.data.roomNurses.length; i++) {
                if (resp.data.roomNurses[i].gender === 0) {
                  resp.data.roomNurses[i].gender = '男'
                } else {
                  resp.data.roomNurses[i].gender = '女'
                }
                this.roomNurseResult.push(
                  {
                    id: resp.data.roomNurses[i].id,
                    name: resp.data.roomNurses[i].name,
                    gender: resp.data.roomNurses[i].gender,
                    age: resp.data.roomNurses[i].age
                  },
                )
              }
              this.$message.success("查询成功")
            })
            .catch(error => {
              this.$message.error("查询失败，请重试");
              console.log(error)
            })
        },

        searchSickBed() {
          this.tableDisplayed = 3;
          this.$axios.post('/searchSickBed', {
            staffId: this.currentId
          })
            .then(resp => {
              console.log(resp);
              this.sickBedsResult = [];
              for (var i = 0; i < resp.data.sickBeds.length; i++) {
                this.sickBedsResult.push(
                  {
                    sickBedId: resp.data.sickBeds[i].id,
                    sickRoomId: resp.data.sickBeds[i].sickRoomID,
                    patientId: resp.data.sickBeds[i].patientId
                  }
                )
              }
              this.$message.success("查询成功")
            })
            .catch(error => {
              this.$message.error("查询失败，请重试");
              console.log(error)
            })
        },

        jump(para) {
          this.$store.commit('setModifyTarget', para);
          this.$router.replace({path: '/ModifyStaff'})
        },

        deleteRoomNurse(para) {
          this.$axios.post('/deleteRoomNurse', {
            staffId: para
          })
            .then(resp => {
              console.log(resp);
              if (resp.data.status === 1) {
                this.$axios.post('/searchRoomNurse', {
                  staffId: this.currentId
                })
                  .then(resp => {
                    console.log(resp);
                    this.roomNurseResult = [];
                    for (var i = 0; i < resp.data.roomNurses.length; i++) {
                      if (resp.data.roomNurses[i].gender === 0) {
                        resp.data.roomNurses[i].gender = '男'
                      } else {
                        resp.data.roomNurses[i].gender = '女'
                      }
                      this.roomNurseResult.push(
                        {
                          id: resp.data.roomNurses[i].id,
                          name: resp.data.roomNurses[i].name,
                          gender: resp.data.roomNurses[i].gender,
                          age: resp.data.roomNurses[i].age
                        },
                      )
                    }
                  });
                this.$message.success("删除成功")
              } else {
                this.$message.error("删除失败，此护士正在工作")
              }
            })
            .catch(error => {
              this.$message.error("删除失败，请重试");
              console.log(error)
            })
        },



        leaveHospital(index) {
          this.$axios.post('/deleteSatisfiedPatient', {
            patientId: para,
          })
            .then(resp => {
              this.$axios.post('/searchSatisfiedPatient', {
                staffId: this.currentId,
              })
                .then(resp => {
                  console.log(resp);
                  this.satisfiedPatientResult = [];
                  for (var i = 0; i < resp.data.patients.length; i++) {
                    if (resp.data.patients[i].gender === 0) {
                      resp.data.patients[i].gender = '男'
                    } else {
                      resp.data.patients[i].gender = '女'
                    }
                    this.satisfiedPatientResult.push(
                      {
                        patientId: resp.data.patients[i].patientId,
                        name: resp.data.patients[i].name,
                        age: resp.data.patients[i].age,
                        gender: resp.data.patients[i].gender,
                      }
                    )
                  }
                });
              this.$message.success("出院成功")
            })
            .catch(error => {
              this.$message.error("出院失败，请重试");
              console.log(error)
            })
        },



      }
    }
</script>

<style>
  .el-collapse-item__content{
    padding-bottom: 0!important;
  }
  .el-table{
    padding-top: 0;
    padding-bottom: 0;
  }
  .el-button{
    padding: 0;
  }
</style>
