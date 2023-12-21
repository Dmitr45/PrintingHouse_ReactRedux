

const initialState = {
   categories:  []
};

const reducer = (state= initialState, action) => {
    switch (action.type){
        case 'CATEGORIES_LOADED' :  // Если тип категории загружены, то мы меняем состояние массива категорий
            return {
                categories: action.payload
            };
        default : 
            return state; 

    }
};

export default reducer;