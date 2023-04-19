<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <i class="fas fa-hand-holding-usd"></i>
      <h1>Currency converter</h1>
      <div class="subtitle">
        <h2>and countries info</h2>
        <i class="fas fa-globe-europe"></i>
      </div>
  </header>
  <RouterView v-slot="{Component}">
    <KeepAlive include="HomeView">
      <component :is="Component" />
    </KeepAlive>
  </RouterView>

</template>

<style lang="scss">

//base 

*{
  margin:0;
  padding:0;
  box-sizing: border-box;
  font-family:sans-serif;
}
.btn{
padding: $space-h;
border:none;
background-color: $clr-main;
box-shadow: 0px 0px 1px #000;
margin:0 auto;
display: block;
&:hover{
  cursor: pointer;
  background-color: $clr-second;
  color:#fff;
}
}
img{
  max-width:70%;
  height:auto;
  display: block;
}
body{
  max-width:1000px;
  margin:0 auto;
}
.link{
  text-decoration: none;
  color:#000;
  box-shadow: 0px 0px 1px #000;
  font-size: $font-xs;
  margin-inline:auto;
  margin-block:$space-h;
  padding: $space-h;
  text-align: center;
  &:hover{
    cursor: pointer;
    background:$clr-second;
    color:#fff;
  }
  &-back{
    margin:$space-1;
  }
}

header{
  padding:$space-1;
  text-align: center;
  letter-spacing:0.5ch;
  line-height:$space-3;
  i{
    font-size: $font-lg;
  }
  h1{
    font-size:$font-lg;
    font-weight: 900;
  }
  h2{
    font-size: $font-xs;
    font-weight: 100;
    margin:$space-h;
    background:$clr-main;
  }
}

</style>
