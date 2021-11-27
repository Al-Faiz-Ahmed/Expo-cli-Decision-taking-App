export let data = {
    authUser: {},
    shoeAuthRoute:false,
    listOfOptions:[]
    
}

export function reducer(state, action) {
    switch (action.type) {
        case "USER_FOUND": {
            return {
                ...state,
                authUser: action.payload
            }
        }
        case "AUTH_ROUTE_FOUND": {
            return {
                ...state,
                shoeAuthRoute:true,
            }
        }
        case "USER_and_Route_FOUND": {
            return {
                ...state,
                authUser: action.payload,
                shoeAuthRoute:true,
            }
        }
        case "LIST_UPDTAE_LISTENER": {

            
                return {
                    ...state,
                    listOfOptions:[action.payload,...state.listOfOptions]
                }
            
        }
        default:
            return state;

    }
}