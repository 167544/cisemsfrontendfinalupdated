
let SelectedList = {
    data :[{id:103,name:"priya"}]
}

const SelectedDataReducer = (state = SelectedList ,action) => {
    switch(action.type){
        case "setSelecteddata":
            return {
               
                data :action.payload
            }
     
        default:
            return state;
    }

}

export default SelectedDataReducer;