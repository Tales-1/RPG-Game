let stagesArray = new Array(9).fill(false).map((item,index)=>{
    return { 
        stageNo:index+1,
        open:false,
        complete:false,
        selected:false,
    }
})
let updatedStagesArray
stagesArray[0].open = true

let mapObject = {
    selected:false,
    stageNo:0,
}

function updateMap(){
    stagesArray[mapObject.stageNo - 1].complete = true
    stagesArray[mapObject.stageNo - 1].open = true
    stagesArray[mapObject.stageNo].open = true
}

function displayStages(stageNo){
     updatedStagesArray = stagesArray.map((stage,index)=>{
        if(index+1 < stageNo){
            return {
                ...stage, open:true,complete:true,
            }
        } else if(index+1 === stageNo){
            return {...stage,open:true,complete:false}
        } else {return stage}
    })
    
    let stagesHtml = updatedStagesArray.map((stage,index)=>{
        return `<div class ="circle ${!stage.open ? "locked" : stage.complete ? "complete" : "open"}">
                    <img src="./imgs/lock-${stage.open ? "open" : "closed"}.png" alt="padlock" class="lock-img">
                    <span class="lock-number">${index + 1}</span>
                </div>
        `
    })
    stagesHtml = stagesHtml.join("")
    return stagesHtml
}

