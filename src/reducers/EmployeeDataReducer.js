
let EmpData = {
    Empdata :[{id:103,name:"gayathri"}],
    selectedData : [{id:102,name:"priya"}]
}

const EmployeeReducer = (state = EmpData ,action) =>{
    switch(action.type){
        case "setEmpData":
            return {
                ...state,
                Empdata :action.payload

            }
        case "selectedData":{
            return {
                ...state,
                selectedData : action.payload
            }
        }
     
        default:
            return state;
    }

}

export default EmployeeReducer;