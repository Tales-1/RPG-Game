
let stagesArray = new Array(9).fill(false)
stagesArray[0] = true

const mapObject = {
    selected:false,
    level:0,
}
function displayStages(){
    let stagesHtml = stagesArray.map((stage,index)=>{
        return `<div class ="circle ${ stage ? "open" : "locked"}">
                    <img src="./imgs/lock-${stage ? "open" : "closed"}.png" alt="padlock" class="lock-img">
                    <span class="lock-number">${index + 1}</span>
                </div>
        `
    })
    stagesHtml = stagesHtml.join("")
    return stagesHtml
}

let mapHtml = `
        <div id="map-page">
            <h1 class="gc__title gc--white m-auto">Select Battle</h1>
            <div class="map">
                <div class="circle_container">
                  ${displayStages()}
                  </div>
            </div>
            <button id="start-game">
            Start Game!
        </button>
        </div>

         `
