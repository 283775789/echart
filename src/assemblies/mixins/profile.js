export default {
  props: {
    reload: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      userData: {}
    }
  },

  methods: {
    getProfile (isReload) {
      const vm = this
      this.axios.post('/personal/profile').then(function (response) {
        if (response.data.code === 0) {
          vm.userData = response.data.data
          vm.$store.commit('updateUserData', response.data.data)
        }

        vm.$emit('update:reload', false)
      }).catch(function (error) {
        vm.$emit('update:reload', false)
        console.log(error)
      })
    }
  },

  created () {
    this.getProfile()
  },

  watch: {
    reload (newVal) {
      if (newVal) {
        this.getProfile(true)
      }
    }
  }
}
