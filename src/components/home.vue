<template>
  <div>
  <header>
    <h1 align="center">Welcome to Dashboard </h1>
  </header>
    <section>
    <div>
<label>Filter</label>
      <select class="un" v-model="selctfilter" @change="userlistfilter">
        <option value="0" selected>
          Select All
        </option>
        <option value="1">
          age > 20 && age < 30 && full name >=10
        </option>

      </select>
      <div>
      <slot v-for="user in userlist">
      <mycard :carddate="user"></mycard>
      </slot>
      </div>
    </div>
    </section>
    <footer>
      <!--<h5 align="center">Welcome to Dash board </h5>-->
    </footer>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import store from '@/store/'
  import mycard from './card/myCard'
  import service from '../services/service'
    export default {
        name: "home",
      data(){
          return{
            userlist:[],
            selctfilter:null,
          }
      },
      computed: {
        ...mapGetters('authentication', ['sessionUser']),

      },

      components:{
        mycard
      },

      beforeRouteEnter(to, from, next) {
        let isLoggedIn = store.getters['authentication/isLoggedIn'];
        if (!isLoggedIn) {
          next('/login',);
        } else {
          next()
        }
      },

      methods:{
        async getuserlist() {
          let vm = this;

          await service.getuserlist()
            .then(function (resJson) {
              vm.userlist=resJson

            })
            .catch(function (err) {});
        },
        userlistfilter: function () {

          let vm =this;
          if(vm.selctfilter==1){
            let userlistarr=vm.userlist.filter(function (object) {
              let fullname = object.firstName+object.lastName;
              return object.age >= 20 && object.age < 30 && fullname.length >=10
            });

            vm.userlist= userlistarr;
          }
          else {
            vm.getuserlist();
          }

        }
      },
      mounted(){
       this.getuserlist();
      }
    }
</script>

<style scoped>
section{
  padding: 0px;
  margin:0 auto;
  position: relative;
  text-align: center;
;
}
</style>
