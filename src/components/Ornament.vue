<template>
  <img src="@/assets/img/1.png" alt="background" id="pic1">
  <img src="@/assets/img/3.png" alt="background" id="pic2">
  <img src="@/assets/img/5.png" alt="background" id="pic3">
  <img src="@/assets/img/7.png" alt="background" id="pic4">
</template>

<style scoped>
#pic1 {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 15%;
  z-index: 0;
}

#pic2 {
  position: fixed;
  top: 0;
  right: 0;
  width: 15%;
  z-index: 0;
}

#pic3 {
  position: fixed;
  top: 0;
  left: 0;
  width: 15%;
  z-index: 0;
}

#pic4 {
  position: fixed;
  top: 0;
  right: 15%;
  width: 15%;
  z-index: 0;
}

@media (max-width: 768px) {
  #pic1 {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 30%;
    z-index: 0;
  }

  #pic2 {
    display: none;
  }

  #pic3 {
    position: fixed;
    top: 0;
    left: 0;
    width: 30%;
    z-index: 0;
  }

  #pic4 {
    position: fixed;
    top: 0;
    right: 0;
    width: 30%;
    z-index: 0;
  }
}
</style>