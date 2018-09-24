<template>
  <div class="pv-tasks">
    <!-- task ball -->
    <div v-if="this.popupTasks.taskball" class="pv-taskball" @click="openTaskPopup">
      <div class="pv-taskball-inner">
        <span class="pv-taskball-num">{{taskStatus.doneStep}}</span>
        <span>/ {{taskStatus.totalStep}}<br>进度</span>
      </div>
    </div>
    <!-- /task ball -->

    <!-- popup: closing -->
    <mt-popup
      v-if="taskClosing"
      class="xtask xtop"
      style="width: 100%;"
      :modal="false"
      v-model="tasktwosucc"
      popup-transition="popup-fade">
      <div class="pv-task">
        <a class="pv-ico xclose"
           @click="closeTaskPopup">
        </a>

        <div class="pv-task-body">
          <img class="pv-task-bill" src="@images/tasks/task-close.png" @click="handleTaskClick" />
          <div class="pv-task-btn" style="top: 43%;" to="/withdraw">
            <div class="pv-task-note"><span>红包将在<var>3</var>天后过期</span></div>
            <img style="width: 5.825rem;" src="@images/tasks/task-close-btn1.png" @click="closeTaskPopup" />
            <img style="width: 5.825rem;" src="@images/tasks/task-status-btn1.png" @click="openTaskPopup" />
          </div>
        </div>
      </div>
    </mt-popup>
    <!-- /popup: closing  -->

    <!-- popup: tasks -->
    <mt-popup
      v-else
      class="xtask"
      style="width: 100%;"
      :class="[$store.state.currentTask.position]"
      :modal="false"
      v-model="popupTasks.visible"
      popup-transition="popup-fade">
      <div class="pv-task">
        <a class="pv-ico xclose"
           @click="closeTopTaskPop">
        </a>

        <!-- task list -->
        <div class="pv-task-body">
          <!-- task status -->
          <template v-if="$store.state.currentTask.index===0 && taskStatus">
            <img class="pv-task-bill" src="@images/tasks/task-status.png" />
            <i class="pv-ico xtask xno1"
               :class="{xdone:taskStatus.stepList[0].status===1}">
               <span>{{taskStatus.stepList[0].status===1? '已':'待'}}领取</span>
            </i>
            <i class="pv-ico xtask xno2"
               :class="{xdone:taskStatus.stepList[1].status===1}">
               <span>{{taskStatus.stepList[1].status===1? '已':'待'}}领取</span>
            </i>
            <i class="pv-ico xtask xno3"
               :class="{xdone:taskStatus.stepList[2].status===1}">
               <span>{{taskStatus.stepList[2].status===1? '已':'待'}}领取</span>
            </i>
            <i class="pv-ico xtask xno4"
               :class="{xdone:taskStatus.stepList[3].status===1}">
               <span>{{taskStatus.stepList[3].status===1? '已':'待'}}领取</span>
            </i>
            <a class="pv-task-btn" style="top: 48.4%;" @click="startTask">
              <img style="width: 12.45rem;" src="@images/tasks/task-status-btn1.png" />
              <img v-if="1===2" style="width: 12.45rem;" src="@images/tasks/task-status-btn2.png" />
            </a>
          </template>

          <!-- task2: share artical for the first time -->
          <template v-if="$store.state.currentTask.index===2">
            <img v-if="$store.state.currentTask.step===1" class="pv-task-bill" src="@images/tasks/share-artical-step1.png" @click="handleTaskClick" />
            <img v-if="$store.state.currentTask.step===2" class="pv-task-bill" src="@images/tasks/share-artical-step2.png" @click="handleTaskClick" />
            <img v-if="$store.state.currentTask.step===3" class="pv-task-bill" src="@images/tasks/share-artical-step3.png" @click="handleTaskClick" />
            <img v-if="$store.state.currentTask.step===4" class="pv-task-bill" src="@images/tasks/share-artical-step4.png" />
            <div v-if="$store.state.currentTask.next ===0">
              <router-link v-if="$store.state.currentTask.step===4" class="pv-task-btn" style="top: 42.7%;" to="/student">
                 <img style="width: 11.975rem;" src="@images/tasks/task2-btn1.png" />
              </router-link>
            </div>
            <div v-if="$store.state.currentTask.next ===1">
              <router-link v-if="$store.state.currentTask.step===4" class="pv-task-btn" style="top: 42.7%;" to="/withdraw">
                <img style="width: 11.975rem;" src="@images/tasks/invite-btn1.png" />
              </router-link>
            </div>
            <div v-if="$store.state.currentTask.next ===2">
              <div v-if="$store.state.currentTask.step===4" class="pv-task-btn" style="top: 42.7%;" to="/withdraw">
                <img style="width: 5.825rem;" src="@images/tasks/withdraw-btn1.png" />
                <img style="width: 5.825rem;" src="@images/tasks/withdraw-btn2.png" />
              </div>
            </div>
          </template>

          <!-- task3: invite friends for the first time -->
          <template v-if="$store.state.currentTask.index===3">
            <img v-if="$store.state.currentTask.step===1" class="pv-task-bill" src="@images/tasks/invite-step1.png" @click="handleTaskClick" />
            <img v-if="$store.state.currentTask.step===2" class="pv-task-bill" src="@images/tasks/invite-step2.png" />
            <div v-if="$store.state.currentTask.next ===0">
              <router-link v-if="$store.state.currentTask.step===2" class="pv-task-btn" style="top: 53.9%;" to="/withdraw">
                 <img style="width: 11.975rem;" src="@images/tasks/invite-btn1.png" />
              </router-link>
            </div>
            <div v-if="$store.state.currentTask.next ===2 && $store.state.currentTask.step===2">
              <div class="pv-task-btn" style="top: 53.9%;" to="/withdraw">
                <img style="width: 5.825rem;" src="@images/tasks/withdraw-btn1.png" />
                <img style="width: 5.825rem;" src="@images/tasks/withdraw-btn2.png" />
              </div>
            </div>
          </template>

          <!-- task4: withdraw for the first time -->
          <template v-if="$store.state.currentTask.index===4">
            <img v-if="$store.state.currentTask.step===1" class="pv-task-bill" src="@images/tasks/withdraw-step1.png" @click="handleTaskClick" />
            <img v-if="$store.state.currentTask.step===2" class="pv-task-bill" src="@images/tasks/withdraw-step2.png" @click="handleTaskClick" />
            <a v-if="$store.state.currentTask.step===2" class="pv-task-videobtn"></a>
            <img v-if="$store.state.currentTask.step===3" class="pv-task-bill" src="@images/tasks/withdraw-step3.png" @click="handleTaskClick" />
            <img v-if="$store.state.currentTask.step===4" class="pv-task-bill" src="@images/tasks/withdraw-step4.png" @click="handleTaskClick" />
            <img v-if="1==2" class="pv-task-bill" src="@images/tasks/withdraw-step5.png" @click="handleTaskClick" />
            <img v-if="1==2" class="pv-task-bill" src="@images/tasks/withdraw-step6.png" @click="handleTaskClick" />
            <img v-if="1==2" class="pv-task-bill" src="@images/tasks/withdraw-step7.png" @click="handleTaskClick" />
            <div v-if="$store.state.currentTask.step===4" class="pv-task-btn" style="top: 40%;" to="/withdraw">
               <img style="width: 5.825rem;" src="@images/tasks/withdraw-btn1.png" />
               <img style="width: 5.825rem;" src="@images/tasks/withdraw-btn2.png" />
            </div>
          </template>
        </div>
        <!-- /task list -->
      </div>
    </mt-popup>
    <!-- /popup: tasks -->
  </div>
</template>

<script>
export default {
  name: 'pv-tasks',

  data () {
    return {
      popupTasks: {
        visible: false,
        taskball: false
      },
      tasktwosucc: false,
      taskClosing: false,
      taskStatus: {
        'taskIncome': 6100,
        'noticeInfo': '提醒：此红包2日后过期',
        'totalStep': 4,
        'doneStep': 1,
        'visible': true,
        'stepList': [
          {
            'step': 1,
            'stepname': '首次登录APP',
            'income': 200,
            'description': null,
            'status': 1
          },
          {
            'step': 2,
            'length': 4,
            'stepname': '首次分享文章',
            'income': 400,
            'description': '首次分享文章奖励0.3元，文章首次被他人阅读奖励0.1元',
            'status': 0
          },
          {
            'step': 3,
            'length': 2,
            'stepname': '首次邀请好友',
            'income': 5500,
            'description': '首次邀请好友奖励0.5元，邀请成功再得5元',
            'status': 0
          },
          {
            'step': 4,
            'length': 4,
            'stepname': '首次提现',
            'income': 0,
            'description': '新手首次提现秒到账，后续提现大于5元在24小时内到账',
            'status': 0
          }
        ],
        'pageone': false
      }
    }
  },

  computed: {
    currentTaskStep () {
      return this.$store.state.currentTask.step
    }
  },

  methods: {
    getAllTaskStatus () {
      const vm = this
      this.axios.post('/task/newtask').then(function (response) {
        if (response.data.code === 0) {
          console.log(response.data.data)
          vm.taskStatus = response.data.data
          if (vm.taskStatus != null && vm.taskStatus.visible) {
            vm.popupTasks.visible = true
          }
        }
      }).catch(function (error) {
        console.log(error)
      })
    },

    getTask () {
      if (this.taskStatus.visible) {
        if (this.$store.state.currentTask.closepop) {
          this.closeTopTaskPop()
          this.$store.commit('updateCurrentTask', {
            closepop: false
          })
        } else {
          this.getAllTaskStatus()
          this.getNext(this.$store.state.currentTask.index)
        }
      }
    },

    getNext (index) {
      let next = 0
      if (index === 2) {
        if (this.taskStatus.stepList[2].status === 0 && this.taskStatus.stepList[3].status === 0) {
          next = 0
        }
        if (this.taskStatus.stepList[2].status === 1 && this.taskStatus.stepList[3].status === 0) {
          next = 1
        }
        if (this.taskStatus.stepList[2].status === 1 && this.taskStatus.stepList[3].status === 1) {
          next = 2
        }
        if (this.taskStatus.stepList[2].status === 0 && this.taskStatus.stepList[3].status === 1) {
          next = 0
        }

        this.$store.commit('updateCurrentTask', {
          next: next
        })
      }

      if (index === 3) {
        if (this.taskStatus.stepList[3].status === 1) {
          next = 2
        }
        if (this.taskStatus.stepList[3].status === 0) {
          next = 0
        }

        this.$store.commit('updateCurrentTask', {
          next: next
        })
      }
    },

    startTask () {
      const vm = this
      for (let i = 1; i <= 4; i++) {
        if (this.taskStatus.stepList[i - 1].status === 0) {
          let pos = 'xtop'
          if (i === 3) {
            pos = 'xbottom'
          }
          if (i === 2) {
            this.$store.commit('updateCurrentTask', {
              position: pos,
              index: i
            })
            this.$router.push(`/`)
          }
          if (i === 3) {
            this.$store.commit('updateCurrentTask', {
              position: pos,
              index: i,
              callback: function () {
                vm.getShareUrls(2)
              }
            })
            this.$router.push(`/student`)
          }
          if (i === 4) {
            this.$store.commit('updateCurrentTask', {
              position: pos,
              index: i
            })
            this.$router.push(`/withdraw`)
          }
          break
        }
      }
    },

    getShareUrls (type) {
      const vm = this

      const requestParams = this.qs.stringify({
        sharetype: type,
        // type: 1-share artical 2-share high-priced artical
        type: 3
      })

      this.axios.post('/article/share/url', requestParams).then(function (response) {
        if (response.data.code === 0) {
          const shareUrl = response.data.data
          // vm.pad.share.call(this, type, url, iconUrl, title, desc)
          vm.pad.share.call(this, type, shareUrl.uri, shareUrl.iconUrl, shareUrl.title, shareUrl.desc)

          // task3: invite success
          setTimeout(() => {
            vm.$store.commit('updateCurrentTask', {
              position: 'xtop',
              step: 2,
              callback: null
            })
          }, 1000)
        }
      }).catch(function (error) {
        console.log(error)
      })
    },

    handleTaskClick () {
      this.$store.state.currentTask.callback && this.$store.state.currentTask.callback()
    },

    openTaskPopup () {
      this.popupTasks.visible = true
      this.taskClosing = false
      this.popupTasks.taskball = false
      this.$store.commit('updateCurrentTask', {
        index: 0,
        step: 1,
        position: 'xtop'
      })
    },

    closeTopTaskPop () {
      this.taskClosing = true
      this.popupTasks.taskball = true
    },

    closeTaskPopup () {
      this.popupTasks.visible = false
      this.taskClosing = false
      this.popupTasks.taskball = true
      this.$store.state.currentTask.reset && this.$store.state.currentTask.reset()
    }
  },

  created () {
    this.getAllTaskStatus()
  },

  watch: {
    currentTaskStep (value) {
      const index = this.$store.state.currentTask.index
      const isTask2LastStep = index === 2 && value === 4
      const isTask3LastStep = index === 3 && value === 2
      const isTask4LastStep = index === 4 && value === 4

      if (isTask2LastStep || isTask3LastStep || isTask4LastStep) {
        this.getTask()
      }
    }
  }
}
</script>

<style lang="scss">
  @import "style"
</style>
