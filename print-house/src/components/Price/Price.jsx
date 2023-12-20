import { useEffect, useState } from "react";
import axios from 'axios';

export default function Price(props) {


let [PropsName, setPropsName]  = useState(props.PriceCost);  
useEffect(() => {
    setPropsName(props.PriceName)
}, [PropsName, props.PriceName]);

let [PropsCost, setPropsCost] = useState(props.PriceCost);
useEffect(() => {
    setPropsCost(props.PriceCost)
}, [PropsCost, props.PriceCost]);

let [PropsArea, setPropsArea] = useState(props.Area)
useEffect(() => {
    setPropsArea(props.Area)
}, [PropsArea, props.Area]);

let [PropsFactor, setPropsFactor] = useState(props.PriceFactorResolution)
useEffect(() => {
    setPropsFactor(props.PriceFactorResolution);
    console.log(props.PriceFactorResolution);
}, [PropsFactor, props.PriceFactorResolution]);

let [PropsPriceQuantity, setPropsPriceQuantity] = useState(props.PriceQuantity)
useEffect(() => {
    setPropsPriceQuantity(props.PriceQuantity);
}, [PropsPriceQuantity, props.PriceQuantity]);


let [PriceAddition, setPriceAddition] = useState([]);
let [SumPriceAdditions, setSumPriceAdditions] = useState(props.SumPriceAdditions);
useEffect(() => {
    setPriceAddition(props.ListCheckedAdditions);
    setSumPriceAdditions(props.SumPriceAdditions);

}, [PriceAddition, props.ListCheckedAdditions, props.SumPriceAdditions]);


let [FullPrice, setFullPrice] = useState(0);
useEffect(() => {
    setFullPrice(Math.round(PropsCost*PropsArea*PropsFactor*PropsPriceQuantity + SumPriceAdditions*PropsPriceQuantity))
}, [PropsArea, props.Area, PropsCost, props.PriceCost, PropsFactor, props.PriceFactorResolution, PropsPriceQuantity, props.PropsPriceQuantity, props.SumPriceAdditions, SumPriceAdditions]);


const Options = (PropsAdd) => {
return (
<div>
{PropsAdd.map(option => (<div className="d-flex flex-row justify-content-between" > <div className="justify-content-start">{option[0]}</div> <div className="justify-content-end" >+{option[1]}₽</div></div>))}
</div>
    )};


let [PriceFormTarget, setPriceFormTarget] = useState(false);
function targetPriceForm(){// Кнопка раскрытия формы заказа
if    (!PriceFormTarget) {setPriceFormTarget( !PriceFormTarget) }
else { // Заказ

}};  


function TelegramMessage(massagePost){
    const TOKEN = "5698301113:AAFrSfVgJo33K6n_VzDmQMlbgtfiQ91F8vY";
    const CHAT_ID = "-1001807784586";
    const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
    const URI_API_DOC = `https://api.telegram.org/bot${TOKEN}/sendDocument`;


    //document.querySelector('#tg').addEventListener('submit', function(e) {
    //    e.preventDefault(); // Обнулили стандартное действие формы
        
        let massage  = massagePost;

        let formData = new FormData();
        formData.append('chat_id', CHAT_ID)
        //formData.append('document', this.InputFile.files[0])

        
        // axios.post(URI_API_DOC,  formData, {
        //     headers: { 'Content-Type' : 'multipart/form-data' }
        //     })

        axios.post(URI_API, {  // Первый параметр куда отправляем, второй - объект
            chat_id:  CHAT_ID, 
            parse_mode: 'html',
            text: massage
        }) 
        //  .then((res) => {
        //      this.InputName.value = "";
        //      this.InputTel.value = "";
        //      this.InputEmail.value ="";
        //      this.InputText.value = "";
        //      success.innerHTML = "Message sent!";
        //      success.style.opacity = '1';
        //  })
        //  .catch((err) =>{
        //      console.warn(err);
        //  })
        .finally(() =>{ console.log("TelegramMessage end") })
         console.log(massage);
        //document.querySelector("#form_sand_ok").style.display="block";
};

function PriceForm() {
    const [checked, setChecked] = useState(true);
    const [NamePerson, setNamePerson] = useState("Имя");
    const [Mail, setMail] = useState("Maile");
    const [Phone, setPhone] = useState("Phone");
    const [PaymentOptions, setPaymentOptions] = useState("Безналичный рассчет");
    const [Promokod, setPromokod] = useState('');

    let Order = {
        date : new Date,
        name : PropsName,
        area : PropsArea,
        cost : PropsCost,
        factor   : PropsFactor,
        quantity : PropsPriceQuantity,
        addition : PriceAddition,
        fullPrice: FullPrice
        };

        let massagePost= `Заказ от   ${Order.date} \n  
        Наименование: ${Order.name} \n 
        Размер изделия(площадь):  ${Order.area}\n 
        Каталожная стоимость:  ${Order.cost}\n
        Множитель за высокое разрешение:  ${Order.factor}\n 
        Дополнительные опции:  ${Order.addition}\n
        Количество:  ${Order.quantity} \n
        Общая стоимость: ${Order.fullPrice}рублей \n
        Имя заказчик: ${NamePerson}\n
        Телефон: ${Phone} \n
        Email: ${Mail} \n
        Способ оплаты: ${PaymentOptions} \n
        Промокод: ${Promokod} \n          
        `;



    function chengeValue(event) {
        setPaymentOptions(event.target.value);
    };

    let [Thanks,setThanks] = useState(false);
    let ThanksSend = () => { 
        if (Thanks) {
            return <div>Спасибо за заказ, мы скоро свяжемся  с вами!!!</div>
        }};


    let ClickSend = ()=> { TelegramMessage(massagePost);
        setThanks(true)};
 

    if (PriceFormTarget) {
    return ( 
    <div>    
        <div className="price_form text-start" >
            <div className="user_data">
                <div>
                    <div className="form-item">
                    <div className="vp_wr">
                            <span className="vp_atext">Скидка постоянного клиента      </span>
                        </div>
                        <input className="mt-2 mb-2 form-control ng-pristine ng-untouched ng-valid" type="text" onChange={(e) => setPromokod(e.target.value)} placeholder="Ваш код" size="7"></input>
                        <label className="d-grid">
                            <span>Ваше имя</span>
                            <input className="mt-1 mb-1 form-control ng-pristine ng-untouched ng-invalid ng-invalid-required" type="text" onChange={(e) => setNamePerson(e.target.value)} placeholder="Михаил В." required="required"></input>
                        </label>
                    </div>
                    <div className="form-item"> 
                        <label className="d-grid">
                            <span>Ваш email</span> 
                            <input className="mt-1 mb-1 form-control ng-pristine ng-untouched ng-invalid ng-invalid-required" type="text"  onChange={(e) => setMail(e.target.value)}  placeholder="Misha.B@mail.ru" required="required"></input>
                        </label>
                    </div>
                    <div className="form-item">
                        <label className="d-grid">
                            <span>Ваш телефон</span> 
                            <input className="mt-1 mb-1 form-control ng-pristine ng-untouched ng-invalid ng-invalid-required" type="text" onChange={(e) => setPhone(e.target.value)} placeholder="8(965)000-00-00" required="required"></input>
                        </label>
                    </div>
                    <div className="form-item">
                        <span>Варианты оплаты</span><br/>
                        <lable><input type="radio" name="radio" value={"Безналичный рассчет"} checked={PaymentOptions === "Безналичный рассчет" ? true : false}   onChange={()=> {setPaymentOptions("Безналичный рассчет")}} /><span>&emsp;Безналичный рассчет (пришлите реквизиты)</span><br/></lable>
                        <lable><input type="radio" name="radio" value={"Картой через он-лайн платформу"} checked={PaymentOptions === "Картой через он-лайн платформу" ? true : false}  onChange={()=> {setPaymentOptions("Картой через он-лайн платформу")}} /><span>&emsp;Картой через он-лайн платформу</span><br/></lable>
                        <lable><input type="radio" name="radio" value={"Наличными в офисе"} checked={PaymentOptions === "Наличными в офисе" ? true : false}  onChange={()=> {setPaymentOptions("Наличными в офисе")}} /><span>&emsp;Наличными в офисе</span><br/></lable>
                    </div>
                    <div className="form-item">
                        <input type="checkbox" checked={checked}  /*  onChange={() => setChecked(!checked)} */ />
                        <lable> Я принимаю <a href="#">условия обработки персональных данных</a>  </lable>
                    </div>
                 </div>
            </div>
        </div>
        <span className="btn btn-success btn-lg w-100" ng-show="!show_form" ng-click="show_form=1" onClick = {ClickSend} >Заказать</span>
        <ThanksSend/>
    </div>    
    )}};







    return (
<div className="price">
        <div className='detali'>
            <div className="text-center">
                <div className="text-muted">
                    Итоговая стоимость
                </div>
                <div className="h3">
                    <span ng-bind="kalk.data.price" className="ng-binding">
                {FullPrice}
                    </span>    
                ₽</div>
                <div className="text-muted">
                    <div className="text-success">{PropsName}</div><br/>
                        Включены услуги:
                    </div>
                    {PriceAddition}


                    <div className="klientdescount">
                        <div className="cn tools d-grid">
                            <PriceForm /> 
                                <span className= {PriceFormTarget ? "d-none" :"btn btn-success btn-lg"}  ng-show="!show_form" ng-click="show_form=1" onClick = { ()=>{
                                    if (!PriceFormTarget)  targetPriceForm(); 
                                }} 
                                >Заказать
                            </span>
                        </div>
                    <div className="frm_inpline d-grid">
                        <br/>    
                        <span className="btn btn-outline-success btn-lg" ng-click="sendRassh() ">Отправить расчет на свой email</span>
                    </div>
                </div>
            </div>
        </div>
</div> 
    
)}