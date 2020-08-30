import router from "../store/modules/authentication";

export default {
  async loginform(data) {
    let response = await
      fetch(`https://apertum-interview.herokuapp.com/api/user/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors'
      })
    if (response.ok) {
      return await
        response.json();
    } else {
      throw new Error(response.statusText);
    }
  },
  async getuserlist() {
    let response = await
      fetch(`https://apertum-interview.herokuapp.com/api/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("access_token")
        },
        mode: 'cors'
      })
    if (response.ok) {
      return await
        response.json();
    } else {
      alert(1)
      sessionStorage.clear();
      localStorage.removeItem("access_token");
      throw new Error(response.statusText);


    }
  },
}
