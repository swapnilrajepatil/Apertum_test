<template>
<div>
    <div class="main">
        <p class="sign" align="center">Sign in</p>
        <form class="form1" @submit.prevent="validationform()">
          <div>
           <input class="un " type="text"  placeholder="Username" v-model="accountId">
          <p v-show="accountIderror &&(accountId==null||accountId=='')" class="degererro">Please Enter Your Username  </p>
          </div>
         <div>
              <input class="pass" type="password" placeholder="Password" v-model="pswd">
              <p v-show="passworderror &&( pswd==null|| pswd=='')" class="degererro">Please Enter Your password </p>
          </div>
            <p class="degererro">{{errorMessage}}</p>
          <button class="submit" >Sign in</button>
        </form>
    </div>
</div>
</template>

<script>
  import store from '@/store/'
  import { mapGetters } from 'vuex';
  import service from '../services/service'
    export default {
        name: "Login",
         data() {
            return {
              accountId:null,
              pswd: null,
              accountIderror: false,
              passworderror: false,
              errorMessage:null,
             // loading:null,
          }
      },

      beforeRouteEnter (to, from, next) {
        let isLoggedIn = store.getters['authentication/isLoggedIn'];
        if(isLoggedIn){
          next({
            path:'/',
            replace:true
          });
        }else{
          next()
        }
      },
      computed: {
        ...mapGetters('authentication', ['loading']),
        btnText() {
          return (this.loading) ? 'Logging In...' : 'Submit'
        },
        isvalid() {
          return (this.accountId && this.pswd)
        }
      },
      methods: {
        validationform(){
         this.errorMessage=null
          if(this.accountId==null || this.accountId==''){
            this.accountIderror = true;
          }
          if(this.pswd==null || this.pswd==''){
            this.passworderror = true;
          }
          else{
            this.loginform()
          }
        },
        async loginform(){
          let vm=this;

          let data={
            accountId:vm.accountId,
            pswd:vm.pswd
          }

          await service.loginform(data)
            .then(function (resJson) {

              if (resJson.token!=null) {
                let access_token=resJson.token;
                let  username= vm.accountId;
                 let password= vm.pswd;
                vm.$store.dispatch('authentication/login', {
                  username,
                  password,
                  access_token,

                });

              } else {

                vm.errorMessage = resJson.error_message;
                throw new Error(resJson.exception);
              }
            }).catch(function (err) {

            })
        },
      },
    }
</script>

<style scoped>

</style>
