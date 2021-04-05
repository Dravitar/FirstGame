const $ = (id) => { return document.getElementById(id) }
const formatOne = (num, v) => {
  let str = "";
  /*let secondBit = nD(0);
  if(num.floor()!=num){
    secondBit = num.minus(num.floor());
    console.log(secondBit);
  }*/
  switch (v) {
    case 1:
      while(num.gt(0)) {
        str += "1";
        num = num.minus(1);
      }
      return str;
      break;
    case 2:
      while(num.gt(0)) {
        let d = num.minus(num.div(10).floor().times(10));
        if(d.eq(0)) str = "_"+str;
        while(d.gt(0)) {
          str = "1"+str; 
          d=d.minus(1);
        }
        num = num.div(10).floor();
        if(num.gt(0)) str = " "+str; 
      } 
      /*if(secondBit.neq(0)){
        var sstr = "";
        while(secondBit.gt(0)) {
          let e = num.times(10).floor();
          if(e.eq(0)) sstr = sstr+"_";
          while(e.gt(0)) {
            str = str+"1";
            e=e.minus(1);
          }
          secondBit = secondBit.times(10).minus(secondBit.times(10).floor());
          if(secondBit.gt(0)) sstr = sstr+" ";
        }
      }
      str = str+"."+sstr;*/
      return str;
      break;
    case 3:
      while(num.gt(0)) {
        let d = num.minus(num.div(10).floor().times(10));
        let x = Decimal.minus(10,d);
        if(d.eq(0)) str = "_"+str;
        while(d.gt(0)) {
          str = "1"+str; 
          d=d.minus(1);
        }
        while(x.gt(0)) {
          str = "_"+str;
          x = x.minus(1);
        }
        num = num.div(10).floor();
        if(num.gt(0)) str = " "+str; 
      } 
      /*if(secondBit.neq(0)){
        var sstr = "";
        while(secondBit.gt(0)) {
          let e = num.times(10).floor();
          if(e.eq(0)) sstr = sstr+"_";
          while(e.gt(0)) {
            sstr = sstr+"1";
            e=e.minus(1);
          }
          secondBit = secondBit.times(10).minus(secondBit.times(10).floor());
          if(secondBit.gt(0)) str = str+" ";
        }
      }*/
      return str;
      break;
    default:
        let exp = num.log10();
        let d = num;
        while(d.gt(100)) d = d.div(10);
        let n = d.minus(d.div(10).floor().times(10));
        d = d.div(10);
        let x = Decimal.minus(10,d);
        let sstr="";
        while(d.gt(1)) {
          sstr = "1"+sstr;
          d=d.minus(1);
        }
        while(x.gt(0)) {
          sstr = "_"+sstr
          x=x.minus(1);
        }
        str = str+sstr+" ";
        sstr = "";
        x = Decimal.minus(10,n);
        while(n.gt(0)) {
          sstr = "1"+sstr;
          n=n.minus(1);
        }
        while(x.gt(0)) {
          sstr = "_"+sstr;
          x=x.minus(1);
        }
        str = str+sstr;
        str = str+" (";
        sstr = "";
        while(exp.gt(0)){
          let d = exp.minus(exp.div(10).floor().times(10));
          let x = Decimal.minus(10,d);
          while(d.gt(0)) {
            sstr = "1"+sstr;
            d=d.minus(1);
          }
          while(x.gt(0)) {
            sstr = "_"+sstr;
            x=x.minus(1);
          }
          exp = exp.div(10).floor();
          if(exp.gt(0)) sstr = " "+sstr;
        }
        str = str+sstr+")";
        return str;
        break;
  }
}

const initiate = () => {
  loadGame(localStorage.getItem("firstGameSave"));
  setInterval(checkVis, 100);
  setInterval(progress, 50);
  setInterval(saveGame, 10000);
}

const checkVis = () => {
  $("numberSpace").textContent = formatOne(player.number, player.formatVersion);
  player.maxNum.gte(25) ? $("firstAutomator").style.display = "" : $("firstAutomator").style.display = "none";
  player.maxNum.gte(100) ? $("secondAutomator").style.display = "" : $("secondAutomator").style.display = "none";
  if(player.maxNum.gte(200)) {
    $("automatorTabButton").style.display = "";
    $("upgradeTabButton").style.display = "";
  }
  else{
    $("automatorTabButton").style.display = "none";
    $("upgradeTabButton").style.display = "none";
  }
  //player.maxNum.gte(1e16) || player.maxOneness.gte(1) ? $("prestigeTabButton").style.display = "" : $("prestigeTabButton").style.display = "none";
  for(var i=0;i<2;i++){
    let j = i+1;
    $("auto"+j+"RateSpace").textContent = formatOne(player.autoUpgrade[i], player.formatVersion);
    $("auto"+j+"NextRateSpace").textContent = formatOne(player.autoUpgrade[i].plus(1), player.formatVersion);
    $("auto"+j+"PriceSpace").textContent = formatOne(player.autoUpgradePrice[i], player.formatVersion);
  }
  if(player.upgrade[0]<3) $("upgrade"+1+"PriceSpace").textContent = formatOne(player.upgradePrice[0], player.formatVersion);
  $("upgrade2Effect").textContent = formatOne(Decimal.pow(2,player.upgrade[1]),player.formatVersion);
  $("upgrade3Effect").textContent = formatOne(Decimal.pow(Decimal.times(1.5,player.upgrade[2]),player.autoUpgrade[1]),player.formatVersion);
  for(var i=0;i<3;i++){
    $("upgrade"+j+"PriceSpace").textContent = formatOne(player.upgradePrice[i], player.formatVersion);
    if(player.upgradePrice[i].eq(0)) {
      $("upgrade"+j+"PriceSpace").textContent = "Purchased!";
      $("upgrade"+j).style.backgroundColor = "green";
    }
  }  
}

const progress = () => {
  const diff = new Date().getTime() - player.lastTick;
  if($("auto1Active").checked) player.autoUpgradeCycle[0] = player.autoUpgradeCycle[0] + 50;
  if($("auto2Active").checked) player.autoUpgradeCycle[1] = player.autoUpgradeCycle[1] + 50;
  if(player.autoUpgradeCycle[0] >= (1000*(1/Math.max(player.autoUpgrade[0],1)))) {
    if(player.autoUpgrade[0] > 0 && player.autoUpgrade[0] <= 20) increaseNumber(1);
    else if(player.autoUpgrade[0] > 20){ 
      let increaseAmount = player.autoUpgrade[0]/20;
      increaseAmount = Decimal.times(increaseAmount, Decimal.pow(2,player.upgrade[1]));
      if(player.upgrade[2]>0) {
        increaseAmount = increaseAmount.times(Decimal.pow(Decimal.times(1.5,player.upgrade[2]),player.autoUpgrade[1]));
      }
      increaseNumber(increaseAmount);
      $("numberPerTick").textContent = increaseAmount;
    }
    player.autoUpgradeCycle[0] = 0;
  }
  if(player.autoUpgradeCycle[1] >= 1000*(1/Math.max(player.autoUpgrade[1],1))) {
    if(player.autoUpgrade[1] > 0 && player.autoUpgrade[1] <= 20) purchaseAuto(0, 1);
    else if(player.autoUpgrade[1] > 20){
      let increaseAmount = player.autoUpgrade[1]/20;
      purchaseAuto(0, increaseAmount);
    }
    player.autoUpgradeCycle[1] = 0;
  }
}

const increaseNumber = (n) => {
  player.number = player.number.plus(n);
  $("numberSpace").textContent = formatOne(player.number, player.formatVersion);
  if(player.number.gte(10)) $("firstAutomator").style.display = "";
  if(player.number.gte(100)) $("secondAutomator").style.display = "";
  if(player.number.gt(player.maxNum)) player.maxNum = player.number;
}

const purchaseAuto = (index, amount) => {
  while(player.number.gte(player.autoUpgradePrice[index]) && amount>0) {
    player.number = player.number.minus(player.autoUpgradePrice[index]);
    player.autoUpgrade[index] = player.autoUpgrade[index].plus(1);
    player.autoUpgradePrice[index] = player.autoUpgradePrice[index].times(player.autoUpgradePriceIncrease[index]);
    amount--;
  }
  checkVis();
}

const upgrade = (id) => {
  if(player.upgradePrice[id].neq(0) && player.number.gte(player.upgradePrice[id])){
    player.number = player.number.minus(player.upgradePrice[id]);
    player.upgrade[id] = player.upgrade[id] + 1;
    player.upgradePrice[id] = player.upgradePrice[id].times(player.upgradePriceIncrease[id]);
    if(player.upgradePrice[id].eq(0)) {
      let num = id+1;
      $("upgrade"+num+"PriceSpace").textContent = "Purchased!"
      $("upgrade3").style.backgroundColor = "green";
    }
    switch(id) {
      case 0: 
        if(player.upgrade[0]<3){
          player.formatVersion = player.formatVersion+1;
        }
        else {
          $("upgrade1").style.backgroundColor = "green";
          player.upgradePrice[0] = nD(0);
        }
        break;
      case 1:
        $("upgrade2Effect").textContent = formatOne(Decimal.pow(2,player.upgrade[1]),player.formatVersion);
        break;
      case 2:
        $("upgrade3Effect").textContent = formatOne(Decimal.pow(1.1,player.upgrade[2]),player.formatVersion);
        break;
    }
  }
}

const getPrestigeAmount = () => {
  if(player.number.gte(1e16)) return player.number.log10().div(16).pow(16).floor();
  else return nD(0);
}

const prestige = () => {
  let x = getPrestigeAmount();
  if(x.gt(0)) {
    player = getDefaultPlayer();
    player.oneness = player.oneness.plus(x);
    checkVis();
  }
}

const changeTab = (id) => {
  let tabs = document.getElementsByClassName("tab");
  for (const tab in tabs) {
    if(tabs[tab].id!=null){
      tabs[tab].id == id ? tabs[tab].style.display = "" : tabs[tab].style.display = "none";
    }
  }
}

const clearSave = () => {
  if(confirm("Do you really want to wipe the save?")){
    localStorage.removeItem("firstGameSave");
    player = getDefaultPlayer();
    saveGame();
    checkVis();
  }
}
