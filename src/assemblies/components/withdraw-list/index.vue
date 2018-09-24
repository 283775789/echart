<template>
  <!-- withdraw list -->
  <div class="pv-card xwithdraw-swiperbox">
    <div class="pv-swiper swiper-container swiper-no-swiping" :id="id">
        <div ref="swiperWrapper" class="swiper-wrapper">
            <div class="swiper-slide"
              ref="slide"
              v-for="(item,index) in liveWithdrawal"
              :key="index">
              <div class="pv-flexrow xsavespacing">
                <div class="pv-flexrow-cell">
                  <img class="pv-avatar" :src="`${staticUrl}/img/avatars/${item.headimg}`" />
                </div>
                <div class="pv-flexrow-cell">
                  <div class="TEXT_MEDIUM">{{item.nickname}}</div>
                  <div class="TEXT_SMALL COLOR_WEAKING">{{item.withdrawtime}}</div>
                </div>
                <div class="pv-flexrow-cell FLEX1">
                  <span class="TEXT_MEDIUM">提现<em class="COLOR_PRICE">{{item.withdrawmoney|liToYuan}}</em>元</span>
                </div>
              </div>
            </div>
        </div>
    </div>
  </div>
  <!-- /withdraw list -->
</template>

<script>
export default {
  name: 'pv-withdraw-list',

  data () {
    return {
      id: 'swiper' + (new Date()).getTime(),
      liveWithdrawal: [
        {
          nickname: 'hsin',
          headimg: '1.jpg',
          withdrawtime: '1小时前',
          withdrawmoney: 100000
        },
        {
          nickname: '极品玩家',
          headimg: '2.jpg',
          withdrawtime: '1小时前',
          withdrawmoney: 10000
        },
        {
          nickname: '声声慢',
          headimg: '3.jpg',
          withdrawtime: '1小时前',
          withdrawmoney: 10000
        },
        {
          nickname: '唐武',
          headimg: '4.jpg',
          withdrawtime: '1小时前',
          withdrawmoney: 10000
        },
        {
          nickname: '蓝离',
          headimg: '5.jpg',
          withdrawtime: '1小时前',
          withdrawmoney: 10000
        },
        {
          nickname: '阿头',
          headimg: '6.jpg',
          withdrawtime: '1小时前',
          withdrawmoney: 10000
        }
      ]
    }
  },

  mounted () {
    const vm = this
    const swiperHeight = vm.$refs.swiperWrapper.offsetHeight
    const slideHeight = vm.$refs.slide[0].firstChild.offsetHeight

    vm.swiper = new window.Swiper(`#${this.id}`, {
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      slidesPerView: swiperHeight / slideHeight,
      loopedSlides: vm.liveWithdrawal.length,
      direction: 'vertical'
    })
  }
}
</script>

<style lang="scss">
  @import "style"
</style>
