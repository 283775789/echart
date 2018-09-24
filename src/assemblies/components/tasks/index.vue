<template>
  <div class="pv-tasks" v-if="taskStatus && taskStatus.visible">
    <!-- task ball -->
    <div v-if="popupTasks.taskball" class="pv-taskball" @click="openTaskPopup">
      <div class="pv-taskball-inner">
        <span class="pv-taskball-num">{{taskStatus.doneStep}}</span>
        <span>/ {{taskStatus.totalStep}}<br>进度</span>
      </div>
    </div>
    <!-- /task ball -->

    <!-- popup: tasks -->
    <mt-popup
      class="xtask"
      style="width: 100%;"
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
          <template v-if="currentTask.index===0">
            <img class="pv-task-bill" src="@images/tasks/task-status.png" @click="startTask" />
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
            <a class="pv-task-btn" style="top: 48.4%;" @click="startTask"></a>
          </template>

          <!-- task2: share artical for the first time -->
          <template v-if="currentTask.index===2">
            <img v-if="currentTask.step===1" class="pv-task-bill" src="@images/tasks/share-artical-step1.png" @click="handleTaskClick" />
            <img v-if="currentTask.step===2" class="pv-task-bill" src="@images/tasks/share-artical-step2.png" @click="handleTaskClick" />
            <img v-if="currentTask.step===3" class="pv-task-bill" src="@images/tasks/share-artical-step3.png" @click="handleTaskClick" />
            <img v-if="currentTask.step===4" class="pv-task-bill" src="@images/tasks/share-artical-step4.png" />
            <div v-if="currentTask.step===4" class="pv-task-btn" style="top: 42.7%;" to="/withdraw">
              <a class="pv-task-btn" style="top: 48.4%;" @click="startTask"></a>
              <a class="pv-task-btn" style="top: 48.4%;" @click="startTask"></a>
            </div>
          </template>

          <!-- task3: invite friends for the first time -->
          <template v-if="currentTask.index===3">
            <img v-if="currentTask.step===1" class="pv-task-bill" src="@images/tasks/invite-step1.png" @click="handleTaskClick" />
            <img v-if="currentTask.step===2" class="pv-task-bill" src="@images/tasks/invite-step2.png" />
            <a class="pv-task-btn" style="top: 48.4%;" @click="startTask"></a>
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
        visible: true,
        taskball: false
      },
      taskClosing: false,
      currentTask: {
        index: 0,
        step: 1
      },
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
            'status': 0,
            share: {
              title: 'xxx',
              desc: 'xxx',
              shareurl: 'xxx',
              picurl: 'xxx'
            }
          },
          {
            'step': 3,
            'length': 2,
            'stepname': '首次邀请好友',
            'income': 5500,
            'description': '首次邀请好友奖励0.5元，邀请成功再得5元',
            'status': 0,
            share: {
              title: 'xxx',
              desc: 'xxx',
              shareurl: 'xxx',
              picurl: 'xxx'
            }
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

  methods: {
    getAllTaskStatus () {
      this.axios.post('/task/newtask').then((response) => {
        if (response.data.code === 0) {
          this.taskStatus = response.data.data
        }
      })
    },

    startTask () {
      this.currentTask.step = 1
      this.currentTask.index = this.taskStatus.stepList[1].status === 0 ? 2 : 3
    },

    handleTaskClick () {
      this.currentTask.step++
    },

    openTaskPopup () {
      this.popupTasks.visible = true
      this.popupTasks.taskball = false
      this.currentTask.step = 1
      this.currentTask.index = 0
    },

    closeTaskPopup () {
      this.popupTasks.visible = false
      this.popupTasks.taskball = true
    },

    share () {
      const index = this.currentTask.index
      const title = this.taskStatus.stepList[index].artical.title
      const desc = this.taskStatus.stepList[index].artical.desc
      const shareUrl = this.taskStatus.stepList[index].artical.shareurl
      const iconUrl = this.taskStatus.stepList[index].artical.picurl

      // 2-文章分享到微信朋友圈 3-收徒二维码分享到朋友圈
      this.pad.share.call(this, index, shareUrl, iconUrl, title, desc)
      this.getAllTaskStatus()
    }
  },

  created () {
    this.getAllTaskStatus()
  }
}
</script>

<style lang="scss">
  @import "style"
</style>
