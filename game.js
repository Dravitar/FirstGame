const nD = (num) => { return new Decimal(num) }
const $ = (id) => { return document.getElementById(id) }

const initiate = () => {
  load();
  setInterval(progress(), 50);
}

const progress = () => {
 const diff = new Date().getTime() - player.lastTick;
 player.number = player.number.plus(diff.div(1000).times(player.upgrade[0]));
}

const increaseNumber = () => {
  player.upgrade[0] = player.upgrade[0].plus(1);
}

const load = () => {
 if(localStorage.getItem("firstGameSave") != null) player = localStorage.getItem("firstGameSave");
 return player;
}
