//Variables

let containerList = document.querySelector(".wishContainer")
let clrWL=document.querySelector(".BclearWL")
const DataCons =JSON.parse(localStorage.getItem("ListaDeseos"))
//eventos
document.addEventListener("DOMContentLoaded",()=>{
    const DataCons =JSON.parse(localStorage.getItem("ListaDeseos"))
    DataCons.forEach(element => {
        containerList.insertAdjacentElement("beforeend",listConstructor(element.url,element.nombre,element.precio,element.id))
    });
})
clrWL.addEventListener("click",()=>{
    localStorage.setItem("ListaDeseos","[]")
    let long
    let ItemId
    DataCons.forEach(element => {
        long=containerList.children.length
        ItemId=containerList.children.item(long-long+1).id
        DataCons.forEach(element => {
            if (element.id==ItemId) {
                containerList.children.item(long-long+1).remove()
            }
        });
        
    });
    
})

//funciones 
function succesF(reload) {
    succes.classList.add("scsActive")
    
        if (reload===true) {
            setTimeout(()=>{
            
                window.location.reload()
            },2000)
        }
        setTimeout(()=>{succes.classList.remove("scsActive")},2000)
}
function DelateListItem(id) {
    const DbtnLI=document.createElement("div")
    DbtnLI.textContent="X"
    DbtnLI.classList.add("DBLI")
    DbtnLI.addEventListener("click",(e)=>{
        DataCons.forEach(element => {
            if (element.id===id) {
                let indexel=DataCons.indexOf(element)
                DataCons.splice(indexel,1)
                localStorage.setItem("ListaDeseos",JSON.stringify(DataCons))
                
            }
        });
        containerList.removeChild(e.target.parentElement)
    })
    return DbtnLI
}

function AddOrden(float) {
    const addorden =document.createElement("div")
    const imgorder= document.createElement("img")
    imgorder.setAttribute("src","/sources/png/006-anadir-al-carrito.png")
    addorden.classList.add("Oitem")
    addorden.appendChild(imgorder)
    
    addorden.addEventListener("click",()=>{
        if (float.children.length==0) {
            const noItemsWL=document.createElement("div")
            noItemsWL.textContent="Aun no tienes ordenes de compra"
            noItemsWL.classList.add("noItemsWL")
            float.insertAdjacentElement("beforeend",noItemsWL)
        }
        float.classList.toggle("focusIF")
    })
    return addorden
}
function listConstructor(Url,name,price,id) {
    
    const father=document.createElement("div")
    father.classList.add("elementList")
    father.setAttribute("id",id)
    const imagecontainer=document.createElement("div")
    imagecontainer.classList.add("imageCont")
    const image = document.createElement("img")
    image.classList.add("image")
    image.setAttribute("src",Url)
    const ElementData=document.createElement("div")
    ElementData.classList.add("DataElementCont")
    const nameElementData=document.createElement("h1")
    nameElementData.textContent=name
    const priceElementData=document.createElement("p")
    priceElementData.textContent=`Precio: ${price}`
    ElementData.insertAdjacentElement("beforeend",nameElementData)
    ElementData.insertAdjacentElement("beforeend",priceElementData)

    const arritemordtoadd=JSON.parse(localStorage.getItem("Orders"))
    const floatOrden=document.createElement("div")
    floatOrden.classList.add("ItemFLO")
    arritemordtoadd.forEach(element => {
    const orderitem=document.createElement("div")
    const orderitemimg=document.createElement("img")
    orderitemimg.addEventListener("click",()=>{
    const itemData={"name":name,"price":price,"img":Url,"id":id}
    const OrdersData=JSON.parse(localStorage.getItem("Orders"))
    OrdersData.forEach(element => {
            if (element.name==orderitem.textContent) {
                element.Order.push(itemData)
                localStorage.setItem("Orders",JSON.stringify(OrdersData))
                succesF()
            }
        });
        
    })
    
        orderitemimg.setAttribute("src","../sources/png/bag-icon.png")
        orderitem.classList.add("itemorders")
        orderitem.textContent=element.name
        orderitem.insertAdjacentElement("beforeend",orderitemimg)

        floatOrden.insertAdjacentElement("afterbegin",orderitem)
    });
    
    
    
    //inserciones elementos
    imagecontainer.insertAdjacentElement("afterbegin",image)
    ElementData.insertAdjacentElement("beforeend",nameElementData)
    ElementData.insertAdjacentElement("beforeend",priceElementData)
    //inserciones en father
    father.insertAdjacentElement("beforeend",imagecontainer)
    father.insertAdjacentElement("beforeend",ElementData)
    father.insertAdjacentElement("beforeend",floatOrden)
    father.insertAdjacentElement("beforeend",AddOrden(floatOrden))
    father.insertAdjacentElement("beforeend",DelateListItem(id))

    return father
}