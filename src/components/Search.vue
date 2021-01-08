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
                                  auto-complete="off" placeholder="请输入护士id" v-model.trim="searchID" style="width: 330px">
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
            <el-table-column prop="wait" label="待转移" column-key="wait" width="80"
                             :filters="[{text: '是', value: '是'}, {text: '否', value: '否'}]" :filter-method="filterHandler"></el-table-column>
            <el-table-column prop="leave" label="可出院" column-key="leave" width="80"
                             :filters="[{text: '是', value: '是'}, {text: '否', value: '否'}]" :filter-method="filterHandler"></el-table-column>
            <el-table-column prop="lifeCondition" label="生命状态" column-key="lifeCondition"
                             :filters="[{text: '出院', value: '出院'}, {text: '治疗', value: '治疗'}, {text: '死亡', value: '死亡'}]" :filter-method="filterHandler"></el-table-column>
            <el-table-column prop="modify" label="操作" column-key="modify" width="80"  v-if="currentJob===0||currentJob===3">
              <template slot-scope="scope">
                <el-button @click="handleModify(scope.$index)" type="text">登记</el-button>
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
      created() {
        //主治医生登陆时，查看有无可出院的病人
        if (this.currentJob === 0) {
          this.$axios.post('/searchSatisfiedPatient', {
            staffId: this.currentId,
          })
            .then(resp => {
              console.log(resp);
              if (resp.data.patients.length === 0) {
                this.$message.error("您管辖的区域暂无可出院病人");
                return
              }
              this.satisfiedPatientResult = [];
              for (var i = 0; i < resp.data.patients.length; i++) {
                if (resp.data.patients[i].gender === 0) {
                  resp.data.patients[i].gender = '男'
                } else {
                  resp.data.patients[i].gender = '女'
                }
                this.satisfiedPatientResult.push(
                  {
                    patientId: resp.data.patients[i].patientID,
                    name: resp.data.patients[i].name,
                    age: resp.data.patients[i].age,
                    gender: resp.data.patients[i].gender,
                  }
                )
              }
              this.$message.warning("有可出院病人，请尽快操作")
            })
            .catch(error => {
              this.$message.error("查询失败，请重试");
              console.log(error)
            })
        }
      },
      data() {
        return {
          tableDisplayed:0,
          searchID:'',
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
            treatArea: '轻症',
            nurseID: 1,
            grade: '轻症',
            wait:'是',
            leave: '是',
            lifeCondition: '出院'
          }, {
            id: '1',
            name: '王小虎',
            gender: '男',
            age: 8,
            treatArea: '轻症',
            nurseID: 1,
            grade: '重症',
            wait:'是',
            leave: '否',
            lifeCondition: '出院'
          }, {
            id: '2',
            name: '王小虎',
            gender: '男',
            age: 8,
            treatArea: '轻症',
            nurseID: 1,
            grade: '轻症',
            wait:'是',
            leave: '是',
            lifeCondition: '出院'
          }, {
            id: '3',
            name: '王小虎',
            gender: '男',
            age: 8,
            treatArea: '隔离区',
            nurseID: 1,
            grade: '轻症',
            wait:'否',
            leave: '是',
            lifeCondition: '治疗'
          }],
          currentJob: this.$store.state.currentJob,
          currentId: this.$store.state.currentId,

          treatAreaOption: [
            {
              value: 1,
              label: "轻症区"
            },
            {
              value: 2,
              label: "重症区"
            },
            {
              value: 3,
              label: "危重症区"
            },
            {
              value: 0,
              label: "隔离区"
            }
          ],

          roomNurseIdForSearchPatient: '',

          patientByRoomNurseIdResult: [
            // {
            //   patientId: 1,
            //   name: "哈哈",
            //   age: 7,
            //   gender: "男"
            // }
          ],

          searchPatientStateForm: {
            patientId: null,
            sickLevel: null,
            liveState: null,
          },

          patientByStateResult: [
            // {
            //   patientId: 9,
            //   name: "666",
            //   age: 8,
            //   gender: "男"
            // }
          ],

          satisfiedPatientResult: [
            // {
            //   patientId: 16,
            //   name: 'hhh',
            //   age: 78,
            //   gender: '女',
            // }
          ],

          specialPatientResult: [
            // {
            //   patientId: 16,
            //   name: 'hhh',
            //   age: 78,
            //   gender: '女',
            //   sickLevel: 3,
            // }
          ],

          nurseLeaderResult: [
            {
              id: 5,
              name: '杨宇晗',
              gender: '男',
              age: 10
            },
          ],

          roomNurseResult: [
            // {
            //   id: 6,
            //   name: '刘俊伟',
            //   gender: '男',
            //   age: 10,
            // },
            // {
            //   id: 7,
            //   name: '刘伟',
            //   gender: '男',
            //   age: 19,
            // },
          ],

          sickBedsResult: [
            // {
            //   sickBedId: 9,
            //   sickRoomId: 5,
            //   patientId: 4
            // },
            // {
            //   sickBedId: 19,
            //   sickRoomId: 15,
            //   patientId: -1
            // }
          ],

          emergencyNurseSearchForm: {
            treatArea: null
          },

          emergencyNurseSearchResult: [
            // {
            //   patientId: 9,
            //   name: "哈哈哈",
            //   age: 78,
            //   gender: "男"
            // }
          ],

        }
      },
      methods: {
        handleDelete(index) {
          alert(this.staffTableData[index].id)
        },

        handleModify(index) {
          this.$store.state.modifyPatientId = this.patientTableData[index].id;
          this.$router.replace({path: '/UpdatePatient'})
        },

        filterHandler(value, row, column) {
          const property = column['property'];
          return row[property] === value;
        },

        searchPatient() {
          this.tableDisplayed = 2;
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

        searchSatisfiedPatient() {
          this.$axios.post('/searchSatisfiedPatient', {
            staffId: this.currentId,
          })
            .then(resp => {
              console.log(resp);
              if (resp.data.patients.length === 0) {
                this.$message.error("您管辖的区域暂无可出院病人");
                return
              }
              this.satisfiedPatientResult = [];
              for (var i = 0; i < resp.data.patients.length; i++) {
                if (resp.data.patients[i].gender === 0) {
                  resp.data.patients[i].gender = '男'
                } else {
                  resp.data.patients[i].gender = '女'
                }
                this.satisfiedPatientResult.push(
                  {
                    patientId: resp.data.patients[i].patientID,
                    name: resp.data.patients[i].name,
                    age: resp.data.patients[i].age,
                    gender: resp.data.patients[i].gender,
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

        deleteSatisfiedPatient(para) {
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

        searchSpecialPatient() {
          this.$axios.post('/searchSpecialPatient', {
            staffId: this.currentId,
          })
            .then(resp => {
              console.log(resp);
              if (resp.data.patients.length === 0) {
                this.$message.error("暂无待转入其他区域的病人");
                return
              }
              this.specialPatientResult = [];
              for (var i = 0; i < resp.data.patients.length; i++) {
                if (resp.data.patients[i].gender === 0) {
                  resp.data.patients[i].gender = '男'
                } else {
                  resp.data.patients[i].gender = '女'
                }
                switch (resp.data.patients[i].sickLevel) {
                  case 1 : {
                    resp.data.patients[i].sickLevel = '轻症';
                    break
                  }
                  case 2 : {
                    resp.data.patients[i].sickLevel = '重症';
                    break
                  }
                  case 3 : {
                    resp.data.patients[i].sickLevel = '危重症';
                    break
                  }
                }
                this.specialPatientResult.push(
                  {
                    patientId: resp.data.patients[i].patientID,
                    name: resp.data.patients[i].name,
                    age: resp.data.patients[i].age,
                    gender: resp.data.patients[i].gender,
                    sickLevel: resp.data.patients[i].sickLevel,
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

        transformPatient(id) {
          this.$axios.post('/transformPatient', {
            patientId: id,
          })
            .then(resp => {
              if (resp.data.status === 1) {
                this.$axios.post('/searchSpecialPatient', {
                  staffId: this.currentId,
                })
                  .then(resp => {
                    console.log(resp);
                    this.specialPatientResult = [];
                    for (var i = 0; i < resp.data.patients.length; i++) {
                      if (resp.data.patients[i].gender === 0) {
                        resp.data.patients[i].gender = '男'
                      } else {
                        resp.data.patients[i].gender = '女'
                      }
                      switch (resp.data.patients[i].sickLevel) {
                        case 1 : {
                          resp.data.patients[i].sickLevel = '轻症';
                          break
                        }
                        case 2 : {
                          resp.data.patients[i].sickLevel = '重症';
                          break
                        }
                        case 3 : {
                          resp.data.patients[i].sickLevel = '危重症';
                          break
                        }
                      }
                      this.specialPatientResult.push(
                        {
                          patientId: resp.data.patients[i].patientID,
                          name: resp.data.patients[i].name,
                          age: resp.data.patients[i].age,
                          gender: resp.data.patients[i].gender,
                          sickLevel: resp.data.patients[i].sickLevel,
                        },
                      )
                    }
                  })
                  .catch(error => {
                    console.log(error)
                  });
                this.$message.success("转出成功")
              } else {
                this.$message.error("目标治疗区域无法移入新病人")
              }
            })
            .catch(error => {
              this.$message.error("出错了，请重试");
              console.log(error)
            })
        },

        searchPatientByRoomNurseId() {
          if (this.roomNurseIdForSearchPatient === '' && this.currentJob !== 3) {
            this.$message.error("护士id不得为空");
            return
          }
          if (this.currentJob === 3) {
            this.roomNurseIdForSearchPatient = this.currentId
          }
          this.$axios.post('/searchPatientByRoomNurseId', {
            staffId: this.currentId,
            roomNurseId: this.roomNurseIdForSearchPatient
          })
            .then(resp => {
              console.log(resp)
              this.patientByRoomNurseIdResult = []
              if (resp.data.status === 1) {
                this.$message.error("此人不在您的管辖范围内")
                return
              } else if (resp.data.status === -1) {
                this.$message.error("该人不在照顾病人")
                return
              }
              for (var i = 0; i < resp.data.patients.length; i++) {
                if (resp.data.patients[i].gender === 0) {
                  resp.data.patients[i].gender = '男'
                } else {
                  resp.data.patients[i].gender = '女'
                }
                this.patientByRoomNurseIdResult.push(
                  {
                    patientId: resp.data.patients[i].patientID,
                    name: resp.data.patients[i].name,
                    age: resp.data.patients[i].age,
                    gender: resp.data.patients[i].gender,
                    sickLevel: resp.data.patients[i].sickLevel,
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

        jumpToModifyPatient(para) {
          this.$store.commit('setModifyPatientId', para);
          this.$router.replace({path: '/ModifyPatient'})
        },

        searchPatientByState() {
          if (this.searchPatientStateForm.sickLevel === null &&
            this.searchPatientStateForm.liveState === null) {
            this.$message.error("至少选择一项");
            return
          }
          this.$axios.post('/searchPatientByState', {
            staffId: this.currentId,
            sickLevel: this.searchPatientStateForm.sickLevel,
            liveState: this.searchPatientStateForm.liveState,
          })
            .then(resp => {
              console.log(resp)
              this.patientByStateResult = [];
              if (resp.data.patients.length === 0) {
                this.$message.error('无这样的病人或您没有全选管辖这个病人')
                return
              }
              for (var i = 0; i < resp.data.patients.length; i++) {
                if (resp.data.patients[i].gender === 0) {
                  resp.data.patients[i].gender = '男'
                } else {
                  resp.data.patients[i].gender = '女'
                }
                this.patientByStateResult.push(
                  {
                    patientId: resp.data.patients[i].patientID,
                    name: resp.data.patients[i].name,
                    age: resp.data.patients[i].age,
                    gender: resp.data.patients[i].gender,
                  }
                )
              }
              this.$message.success("查询成功")
            })
            .catch(error => {
              console.log(error)
              this.$message.error('查询错误，请重试')
            })
        },

        emergencyNurseSearch() {
          if (this.emergencyNurseSearchForm.treatArea === null) {
            this.$message.error("请选择治疗区域");
            return
          }
          this.$axios.post('/emergencyNurseSearch', {
            treatArea: this.emergencyNurseSearchForm.treatArea
          })
            .then(resp => {
              console.log(resp);
              this.emergencyNurseSearchResult = [];
              if (resp.data.patients.length === 0) {
                this.$message.error('无这样的病人');
                return
              }
              for (var i = 0; i < resp.data.patients.length; i++) {
                if (resp.data.patients[i].gender === 0) {
                  resp.data.patients[i].gender = '男'
                } else {
                  resp.data.patients[i].gender = '女'
                }
                this.emergencyNurseSearchResult.push(
                  {
                    patientId: resp.data.patients[i].patientID,
                    name: resp.data.patients[i].name,
                    age: resp.data.patients[i].age,
                    gender: resp.data.patients[i].gender,
                  }
                )
              }
              this.$message.success("查询成功")
            })
            .catch(error => {
              console.log(error);
              this.$message.error('查询错误，请重试')
            })
        }
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
    padding: 0!important;
  }
</style>
