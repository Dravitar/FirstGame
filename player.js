const nD = (num) => { return new Decimal(num) }

const getDefaultPlayer = () => {
 return {
   number: nD(0),
   maxNum: nD(0),
   autoUpgrade: [nD(0),nD(0),],
   autoUpgradeCycle: [0, 0,],
   autoUpgradePrice: [nD(25),nD(100),],
   autoUpgradePriceIncrease: [nD(1.1),nD(2),],
   autoUpgradeActive: [true,true,],
   upgrade: [0,0,0],
   upgradePrice: [nD(10),nD(100),nD(1500),],
   upgradePriceIncrease: [nD(100),nD(10),nD(10)],
   oneness: nD(0),
   maxOneness: nD(0),
   formatVersion: 1,
   lastTick: new Date().getTime(),
 }
}

var player = getDefaultPlayer();
