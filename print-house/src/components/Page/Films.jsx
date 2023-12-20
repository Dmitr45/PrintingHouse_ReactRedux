import { useState, useEffect } from 'react';
import Price from '../Price/Price'; // Компонент ценового предложения

export default function ServicePage() { 

//================================= Price ======================================================================
class MyPrice {
  constructor(params){
      this.name = params.name             // Наименование услуги     ''
      this.category = params.category     // Категория тавара        ''
      this.cost = params.cost             // Стоимость базовая       00
      this.factor = params.factor         // Множитель за качество   [Фактор '', наценка 0.0]
      this.area = params.area             // Площадь                 mm2
      this.quantity = params.quantity     // Количество              00
      this.add = params.add               // Дополнительные услуги   [[Услуга, цена],   [Услуга, цена]]
  }
  additionCost(){ //Стоимость дополнений
      let sum= 0;
      for (let i=0; i< this.add.length ; i++){
          sum+= this.add[i][1];
      }
      return sum
  }
}
let [PriceName, setPriceName] = useState("Выберите материал");
let [ServiceActive, setServiceActive  ] = useState({name: "Выберите материал", cost: 0 , additionals: [ ]});
let [PriceCategory, setPriceCategory] = useState("Баннеры");
let [PriceCost, setPriceCost] = useState(0);
let [PriceFactor, setPriceFactor] = useState(1);
let [PriceArea, setPriceArea] = useState(1);
let [PriceQuantity, setPriceQuantity] = useState(1);
let [PriceAdd, setPriceAdd] = useState([["Дополнений нет",0]]);
let [ListAdditions, setListAdditions] = useState([]);
let [ListCheckedAdditions, setListCheckedAdditions] = useState([]);
let [SumPriceAdditions, setSumPriceAdditions] = useState(0);


//================================= Вариабельная часть логики ======================================================================
class MyService {
  constructor(params){
      this.name = params.name
      this.cost = params.cost
      this.additionals = params.additionals
      this.index = params.index
  }
}
const Service0 = new MyService({name: "Выберите материал", cost: 0 ,additionals: [ { }]});
const Service1 = new MyService({name: "Обои флезилиновые", cost: 950,additionals: [
  { name: "Резка в размер", checked: false, cost: 40}
  ]});
const Service2 = new MyService({name: "Фотобумага 220гр", cost: 580,additionals: [
  { name: "Люверсы", checked: false, cost: 160},
  { name: "Ламинация", checked: false, cost: 320},
  { name: "Плакатный профиль", checked: false, cost: 800},
  { name: "Приклейка скотча", checked: false, cost: 400}
  ]});
const Service3 = new MyService({name: "Постерная бумага 150гр", cost: 460,additionals: [
  { name: "Резка в размер", checked: false, cost: 40},
  { name: "Люверсы", checked: false, cost: 160},
  { name: "Ламинация", checked: false, cost: 320},
  { name: "Плакатный профиль", checked: false, cost: 800},
  { name: "Приклейка скотча", checked: false, cost: 400}
  ]});
const Services = [Service0, Service1, Service2, Service3]


useEffect(() => {  
    setServiceActive(Services.find(item=> item.name === PriceName));   
}, [PriceName]);

useEffect(() =>{
    setPriceCost(ServiceActive.cost);
    setListAdditions(ServiceActive.additionals);
    //if (ListAdditions !== ServiceActive.additionals) {setListAdditions(ServiceActive.additionals);}
},[ServiceActive]);



//    Размер
let [Width, setWidth] = useState(1);           // Ширина
let [Height, setHeight] = useState(1);         // Высота
let [Area, setArea] = useState(1);             // Площадь изделия

useEffect(() => {     setArea( Width*Height);
}, [Width, Height]);

//    =-========= Разрешение печати =============
class MyResolution {
    constructor(params){
        this.name = params.name
        this.factor = params.factor
    }}

let [PriceFactorResolution, setPriceFactorResolution] = useState();
let [PriceNameResolution, setPriceNameResolution] = useState();

    useEffect(() => { setPriceFactor(PriceFactor);
        setPriceFactorResolution(PriceFactor);
        console.log(PriceFactor,  PriceFactorResolution )
    }, [PriceFactor]);

    let dpi360 = new MyResolution ({name: "360 dpi - сольвентная печать", factor: 1}); 
    let dpi600 = new MyResolution ({name: "600 dpi - сольвентная печать", factor: 1.1}); 
    let dpi720 = new MyResolution ({name: "720 dpi - экосольвентная печать", factor: 1.25}); 
    let dpi1440 = new MyResolution ({name: "1440 dpi - экосольвентная печать", factor: 1.3}); 
    let dpi1440U = new MyResolution ({name: "1440 dpi - ульфтрафиолетовая печать", factor: 2});

//    =-========= Количество =============
useEffect(() => { setPriceQuantity(PriceQuantity);
    //console.log(PriceQuantity )
}, [PriceQuantity]);

//   ============= Дополнения ===============



const Checkbox = ({ isChecked, label, checkHandler, index }) => {
  if (index !== 0 ){
  return (
    <div> 
      <input
        type="checkbox"
        id={`checkbox-${index}`}
        checked={isChecked}
        onChange={checkHandler}
      />
      <label htmlFor={`checkbox-${index}`}>{label}</label>
    </div>
  )}
}


  const updateCheckStatus = index => { 
    setListAdditions(
      ListAdditions.map((Additions, currentIndex) =>
        currentIndex === index ? { ...Additions, checked: !Additions.checked 
        }  : Additions
      )
    ) 
  }


  useEffect(() => { 
  let arrAddObj = ListAdditions.filter((ListAdditions) => ListAdditions.checked === true);
  let arrAdd = arrAddObj.map((obj)=>  [obj.name, "            ", obj.cost, <br/> ] );
  let fullCostAdd = 0; 
  arrAddObj.map((obj)=>{ fullCostAdd+= obj.cost  });
  setSumPriceAdditions(fullCostAdd);
  setListCheckedAdditions(  arrAdd  ); 
}, [ListAdditions]);

//=====================================================================================================================
return(
<div className="calcForm_flex shadow mb-5 bg-white rounded">
    <div className="calcForm_select">
        <div className='kalk_colwrap'>
{/*============================== Вариабельная часть ===========================================================================*/}
<div className='frm_line mt-3'>  {/*    Выбор услуги */}
                <div className='frm_flab d-flex justify-content-between fw-bold'>
                  <span>Материал</span>
                </div>
                <div className='frm_inp'>
                  <div className='frm_inpline'>
                    <div className='csel ng-pristine ng-untouched ng-valid'>
                    <form>
                    <select 
                      name="article" 
                      className="mt-2 mb-2 form-control ng-pristine ng-untouched ng-valid"
                      value={PriceName}
                      onChange={(e) =>
                        setPriceName(e.target.value)}
                    >
                       <option value={Service0.name}>"Выберите материал"</option>
                      <option value={Service1.name}>{Service1.name}</option>
                      <option value={Service2.name}>{Service2.name}</option>
                      <option value={Service3.name}>{Service3.name}</option>
                    </select>
                    </form>
                    </div>
                  </div>
                </div>
              </div>
{/*=====================  Размер  ====================================*/}
<div className='frm_line mt-5'>
                <div className='frm_flab d-flex justify-content-between fw-bold'>
                <span>Размер</span>
                </div>
                <div className='frm_inp'>
                  <div className='frm_inpline'>
                  <div className="row">
                  <div className="col-sm">
                    <div className='csel ng-pristine ng-untouched ng-valid'>
                    <form>
                    <span>Ширина, м</span>
                      <input 
                      name="Width"
                      type="number"
                      className="mt-2 mb-2 form-control ng-pristine ng-untouched ng-valid"
                      value={Width}
                      onChange={(e) =>
                        setWidth(e.target.value)}
                      > 
                      </input> 
                    </form>
                    </div>
                    </div>
                    <div className="col-sm">
                    <div className='csel ng-pristine ng-untouched ng-valid'>
                    <form>
                    <span> Высота, м</span>  
                      <input 
                      name="Height"
                      type="number"
                      className="mt-2 mb-2 form-control ng-pristine ng-untouched ng-valid"
                      value={Height}
                      onChange={(e) =>
                        setHeight(e.target.value)}
                      >  
                      </input> 
                    </form>
                    </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
{/*=====================  Разрешение экрана  ====================================*/}
<div className='frm_line mt-5'>
        <div className='frm_flab d-flex justify-content-between fw-bold'>
            <span>Разрешение печати</span>
        </div>
        <div className='frm_inp'>
            <div className='frm_inpline'>
                <div className='csel ng-pristine ng-untouched ng-valid'>
                    <form>
                    <select 
                        name="article" 
                        className="mt-2 mb-2 form-control ng-pristine ng-untouched ng-valid"
                        value={PriceFactor}
                        onChange={(e) =>
                        setPriceFactor(e.target.value)}
                    >
                        <option value={dpi360.factor}>{dpi360.name}</option>
                        <option value={dpi600.factor}>{dpi600.name}</option>
                        <option value={dpi720.factor}>{dpi720.name}</option>
                        <option value={dpi1440.factor}>{dpi1440.name}</option>
                        <option value={dpi1440U.factor}>{dpi1440U.name}</option>
                        </select>
                    </form>
                </div>
            </div>
        </div>
    </div>
    {/*=====================  Количество  ====================================*/}
<div className='frm_line mt-5'>
                <div className='frm_flab d-flex justify-content-between fw-bold'>
                <span>Количество</span>
                </div>
                <div className='frm_inp'>
                  <div className='frm_inpline'>
                  <div className="row">
                  <div className="col-sm">
                    <div className='csel ng-pristine ng-untouched ng-valid'>
                    <form>
                      <input 
                      name="Width"
                      type="number"
                      className="mt-2 mb-2 form-control ng-pristine ng-untouched ng-valid"
                      value={PriceQuantity}
                      onChange={(e) =>
                        setPriceQuantity(e.target.value)}
                      > 
                      </input> 
                    </form>
                    </div>
                    </div>
                    <div className="col-sm"><span>В штуках</span></div>
                    </div>
                  </div>
                </div>
              </div>
{/*=====================  Дополнения  ====================================*/}
<div className='frm_line mt-5'>
                <div className='frm_flab d-flex justify-content-between fw-bold'>
                <span>Дополнительные опции</span>
                </div>
                              
            {ListAdditions.map((additions, index) => (
            <div className='d-flex justify-content-between align-content-around'>
            
            <Checkbox
                key={additions.name}
                isChecked={additions.checked}
                checkHandler={() => updateCheckStatus(index)}
                label={additions.name}
                index={index}
                
              /> 
            </div>
            )) }
</div>

{/*============================== END Вариабельная часть ===========================================================================*/}
        </div>
    </div>
{/*============================== Форма заказа ===========================================================================*/}
<div className="calcForm_price">
        <Price PriceName={PriceName} PriceCost={PriceCost} Area={Area} PriceFactorResolution={PriceFactorResolution} PriceQuantity={PriceQuantity} ListCheckedAdditions={ListCheckedAdditions}  SumPriceAdditions ={SumPriceAdditions}/>
    </div>
</div>
)};