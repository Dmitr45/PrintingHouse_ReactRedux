import React from "react";
import  {CategoryServiceConsumer} from '../CategoryStore-serviceContext/'
const withCategoryService = () => (Wrapped) =>  {


    return (props) => {
        return (
            <CategoryServiceConsumer>
            {
                (CategoryStoreService) => {
                return   (  <Wrapped {...props} CategoryStoreService={CategoryStoreService}  /> )
                } 
            }
            </CategoryServiceConsumer>
        );
    }
};

export default withCategoryService;