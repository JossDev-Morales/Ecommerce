//requires
const data=JSON.parse(localStorage.getItem("Orders"))
//variables
let orderContainer = document.querySelector(".container")
let preview = document.querySelector(".preview")
let FloatNewO=document.querySelector(".floatNewO")
let newOname= document.querySelector("#name")
let newOpara= document.querySelector("#para")
let clsinputsP=document.querySelector(".clsPara")
let clsinputsN=document.querySelector(".clsName")
let addorder=document.querySelector(".addOrder")
let CancelOrder=document.querySelector(".CancelOrder")
let succes=document.querySelector(".succes")
//events
document.addEventListener("DOMContentLoaded",()=>{
    if (preview.children.length===0) {
        const noItems=document.createElement("div")
        noItems.classList.add("noItemsP") 
        noItems.classList.add("mapOrder")
        noItems.insertAdjacentHTML("afterbegin",'<i class="fa-solid fa-plus"></i>')
        noItems.addEventListener("click",()=>{
            FloatNewO.classList.add("focusIF")
        })
        preview.insertAdjacentElement("afterbegin",noItems)
    }
})
clsinputsN.addEventListener("click",()=>{
    newOname.value=""
    
})
clsinputsP.addEventListener("click",()=>{
    newOpara.value=""
})
addorder.addEventListener("click",()=>{
    const arrOrders=JSON.parse(localStorage.getItem("Orders"))
    if (arrOrders.length<3) {
       if (newOname.value=="") {
        swal("Error","El titulo no puede estar vacio", "error")
       }else{
        if (newOname.value.length<16&&newOname.value.includes(" ")) {
            const arrNewOrder = {"name": newOname.value,"para": newOpara.value,"Order":[]}
        const getOrders = JSON.parse(localStorage.getItem("Orders"))
        getOrders.push(arrNewOrder)
        localStorage.setItem("Orders",JSON.stringify(getOrders))

        FloatNewO.classList.remove("focusIF")
        
        newOname.value=""
        newOpara.value=""
        succesF()
        }else if (newOname.value.length<=8&&newOname.value.includes(" ")===false) {
        let arrNewOrder
        let cadena =newOname.value
        newOname.value.lastIndexOf("s")==newOname.value.length-1?arrNewOrder = {"name": cadena.substring(0, cadena.length - 1)+"'s Orden","para": newOpara.value,"Order":[]}:arrNewOrder = {"name": newOname.value+"'s Orden","para": newOpara.value,"Order":[]}
        const getOrders = JSON.parse(localStorage.getItem("Orders"))
        getOrders.push(arrNewOrder)
        localStorage.setItem("Orders",JSON.stringify(getOrders))

        FloatNewO.classList.remove("focusIF")
        
        newOname.value=""
        newOpara.value=""
        succesF(true)
        } else {
            swal("Error","El nombre no puede ser mayor a 15 y debe tener al menos un espcio o debe ser menor a 8","error")
        }
       }
    }else{
        swal("Error", "Solo puedes tener un maximo de 3 Ordenes por usuario","error")
    }
    
})
CancelOrder.addEventListener("click",()=>{
    FloatNewO.classList.remove("focusIF")
    newOname.value=""
    newOpara.value=""
})
//functions
function succesF(reload) {
    succes.classList.add("scsActive")
    
        if (reload===true) {
            setTimeout(()=>{
            
                window.location.reload()
            },2000)
        }
        setTimeout(()=>{succes.classList.remove("scsActive")},2000)
}
function ordersGenerator(orders) {
    orders.forEach(element => {
        let order=element.Order
        let priceOfOrder= 0
        let nameOfOrder=element.name.replace(" ","")
        let nameNoSpaceless=element.name
        let paraOrder=element.para
        let arrItems=[]
        let arrID=[]
        let index=data.indexOf(element)+1
        order.forEach(el => {
            priceOfOrder+=el.price
            arrItems.push(el.name)
            arrID.push(el.id)
        })
        const orderDiv=document.createElement("div")
        orderDiv.classList.add("anOrder")
        orderDiv.setAttribute("id",`${nameOfOrder}${priceOfOrder}${index}`)
        const orderTitle=document.createElement("h1")
        orderTitle.classList.add("TOfOrder")
        orderTitle.textContent=nameOfOrder
        const nameOrder=document.createElement("h2")
        nameOrder.classList.add("nameElement")
        nameOrder.textContent=paraOrder
        const NumOrder=document.createElement("div")
        NumOrder.classList.add("NumOrder")
        NumOrder.textContent=`Orden:${index}`
        const ListProducts=document.createElement("ul")
        ListProducts.classList.add("UlProducts")
        const PriceOrderE=document.createElement("div")
        PriceOrderE.classList.add("PriceElement")
        PriceOrderE.textContent=priceOfOrder
        PriceOrderE.insertAdjacentHTML("beforeend",'<i class="fa-solid fa-dollar-sign"></i>')
        const BuyOrderE=document.createElement("div")
        BuyOrderE.classList.add("BuyElement")
        BuyOrderE.textContent="Buy"
        BuyOrderE.insertAdjacentHTML("beforeend",'<i class="fa-solid fa-money-check-dollar"></i>')
        const DelateOrderE=document.createElement("div")
        DelateOrderE.classList.add("DelateElement")
        DelateOrderE.textContent="Delate"
        DelateOrderE.insertAdjacentHTML("beforeend",'<i class="fa-solid fa-trash"></i>')
        const ProductsT=document.createElement("h1")
            ProductsT.classList.add("ProductsT")
            ProductsT.textContent="Productos:"
        ListProducts.insertAdjacentElement("beforeend",ProductsT)
        arrItems.forEach(element => {
            const LiProducts=document.createElement("li")
            LiProducts.classList.add("LiProducts")
            LiProducts.insertAdjacentHTML("beforeend",`<div class="IconProduct"><i class="fa-solid fa-circle-notch"></i></div>${element}`)
            const DelateLIP=document.createElement("div")
            DelateLIP.classList.add("DelateLIP")
            DelateLIP.textContent="X"
            DelateLIP.addEventListener("click",(e)=>{
                ListProducts.removeChild(e.target.parentElement)
                let compare1=LiProducts.textContent
                data.forEach(element => {
                    element.Order.forEach(e => {
                        if (e.name==compare1.substring(0, compare1.length - 1)) {
                            let ind=element.Order.indexOf(e)
                           for (let i = element.Order.length-1; i <element.Order.length ; i++) {
                                element.Order.splice(ind,1)
                                localStorage.setItem("Orders",JSON.stringify(data))
                           }
                        }
                    }); 
                });
            })
            LiProducts.insertAdjacentElement("beforeend",DelateLIP)
            ListProducts.insertAdjacentElement("beforeend",LiProducts)
        });
        orderDiv.insertAdjacentElement("beforeend",orderTitle)
        orderDiv.insertAdjacentElement("beforeend",nameOrder)
        orderDiv.insertAdjacentElement("beforeend",NumOrder)
        orderDiv.insertAdjacentElement("beforeend",ListProducts)

        orderDiv.insertAdjacentElement("beforeend",PriceOrderE)
        orderDiv.insertAdjacentElement("beforeend",BuyOrderE)
        orderDiv.insertAdjacentElement("beforeend",DelateOrderE)
        orderContainer.insertAdjacentElement("beforeend",orderDiv)

    })}
function MapGenerator(orders) {
    //getData
    
    orders.forEach(element => {
        let order=element.Order
        let priceOfOrder= 0
        let nameOfOrder=element.name
        let index=data.indexOf(element)+1
        order.forEach(el => {
            priceOfOrder+=el.price
        })
        //constructor
        const map = document.createElement("div")
        map.classList.add("mapOrder")
        const nameMap=document.createElement("h1")
        nameMap.classList.add("mapName")
        nameMap.textContent=nameOfOrder
        const iconMap=document.createElement("img")
        iconMap.setAttribute("src","/sources/png/024-churros-1.png")
        iconMap.setAttribute("alt","Logo-icon")
        const mapPrice=document.createElement("span")
        mapPrice.textContent=priceOfOrder
        mapPrice.insertAdjacentHTML("beforeend",'<i class="fa-solid fa-dollar-sign"></i>')
        map.addEventListener("click",()=>{
            nameOfOrder=element.name.replace(" ","")
            let realOrder = document.getElementById(`${nameOfOrder}${priceOfOrder}${index}`)
            realOrder.classList.toggle("focusIF")
        })
        nameMap.insertAdjacentElement("afterbegin",iconMap)
        map.insertAdjacentElement("beforeend",nameMap)
        map.insertAdjacentElement("beforeend",mapPrice)
        preview.insertAdjacentElement("beforeend",map)
        
    })}

//callers
ordersGenerator(data)
MapGenerator(data)


let x =''