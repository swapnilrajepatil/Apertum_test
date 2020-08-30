<template>
  <div class="card">
   <!-- <h1> Card</h1>-->
    <ul>
      <li><span>Name:</span> {{carddate.firstName+' '+carddate.lastName }}</li>
      <li> <span>AccountId:</span>{{carddate.accountId}} </li>
      <li><span> Age:</span> {{carddate.age}}  </li>
    </ul>
    <!--{{carddate}}-->
  </div>

</template>

<script>
    export default {
        name: "myCard",
       props:["carddate"]
    }
</script>

<style scoped>
.card{
  width: 300px;
  padding: 20px;
  margin: 15px;
  background: linear-gradient(to right, #9C27B0, #E040FB);
  display: inline-block;
  text-align: left;
  box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
}
  .card ul{
    list-style: none;
  }
  .card ul li{
    color: #ffff;
  }
.card ul li span{
  font-weight: bold;
  padding: 0 10px;
}

</style>
