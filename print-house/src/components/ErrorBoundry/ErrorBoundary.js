import React, {Component} from "react";
import ErrorIndicator from "../ErrorIndicator";

export default class ErrorBoundary extends Component {
    state = {
        hasError: false // Поумолчанию ошибки нет
    }

    componentDidCatch(){ // Если в одном из компонентов ниже по иерархии возникнет ошибка, нужно переключить в режим ошибки 
        this.setState({hasError: true});
    }

    render(){
        if (this.state.hisError) {
            return  <ErrorIndicator/>
        }
        else return this.props.children; // Если ошибки нет, то отрисуем 
    }
};

