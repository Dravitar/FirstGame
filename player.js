const getDefaultPlayer = () => {
 return {
   number: nD(0),
   upgrade: [0,],
   lastTick: new Date().getTime(),
 }
}

const player = getDefaultPlayer();
