import router from '@/router/'
const user=JSON.parse(sessionStorage.getItem('users'));
const sessionUser=JSON.parse(sessionStorage.getItem('sessionUser'));


const access_token=(localStorage.getItem('access_token'));

const initialState = sessionUser  ? { status: { loggedIn: true }, sessionUser } : { status: {}, sessionUser: null };
if(user && user.userType){
    initialState.userType = user.userType;
}else{
    initialState.userType = 'Patient';
}

// getters
const getters = {
  loading:state=>{
    return state.status.loading;
  },
  isLoggedIn:state=>{
      return state.status.loggedIn;
  },
  sessionUser:state=>{
      return state.sessionUser;
  }
}

// actions
const actions = {
  login({ dispatch, commit }, { username, password,access_token}) {

    commit('loginRequest',true);

    setTimeout(function(){
        const user = {name:username, access_token:access_token}
        sessionStorage.setItem('sessionUser',JSON.stringify(user));
        localStorage.setItem('access_token',access_token);
  /*    localStorage.setItem('refresh_token',refreshToken);
      localStorage.setItem('auth_client',auth_client);*/

        commit('loginRequest',false);
        commit('loginSuccess',user);
        //debugger;
      router.push('/home')


    },1000);
    },
    logout({ commit }) {
        //userService.logout();
        sessionStorage.removeItem('sessionUser');
      localStorage.removeItem('access_token');
  ;
        commit('logout');
        router.push('/login');
    },

}

// mutations  router.push('/login');
const mutations = {

  loginRequest(state, loading){
    state.status = {loading:loading};
  },
  loginSuccess(state, user) {
    state.status = { loggedIn: true };
    state.sessionUser = user;
  },
  logout(state) {
     state.status = {};
     state.sessionUser = null;
  },

}

export default {
  namespaced: true,
  state:initialState,
  getters,
  actions,
  mutations
}
