const API_URL = "https://6852a7200594059b23ce857f.mockapi.io"

async function fetchData(endpoint, callbak) {
    try{
        const response = await fetch(`${API_URL}${endpoint}`, {method:"GET"})
        const data = await response.json()
        callbak(data)
    }catch(err){
        console.log(err);
    }
}

window.onload = ()=>{
    fetchData("/car", createCard)
}
const wrapperEl = document.querySelector(".wrapper")
function createCard(data){
    const fr = document.createDocumentFragment()
    data.forEach((car) => {
        const div = document.createElement("div")
        div.classList.add("card")
        div.innerHTML = `
            <img src=${car.image} alt="">
            <h3>${car.name}</h3>
            <h3>${car.price}</h3>
            <p>${car.brand}</p>
            <p>${car.color}</p>
            <button data-id=${car.id} class = "delete-btn-main border-[1px] rounded-[20px] bg-white shadow-md p-[5px]" name="delete-btn">delete</button>
        `
        fr.appendChild(div)
    })
    wrapperEl.appendChild(fr)
}



const formEl = document.querySelector(".form")
const inputNameEl = document.querySelector(".input-name")
const inputPriceEL = document.querySelector(".input-price")
const inputBrandEL = document.querySelector(".input-brand")
const inputColorEL = document.querySelector(".input-color")





wrapperEl.addEventListener("click", (evt) => {
    if(evt.target.name === "delete-btn"){
        if(confirm("Buni uchirishga ishonchingiz komilmi ?")){

            const id = evt.target.dataset.id
            
            fetch(`${API_URL}/car/${id}`,{method:"DELETE"})
                .then(() => {
                    wrapperEl.innerHTML = null
                    fetchData("/car", createCard)
                })
        }
        
    }
})

const elModalWrapper = document.querySelector(".modal-wrapper") 
const elModalItem = document.querySelector(".modal-item")





function handMoreBtn(id){
    elModalWrapper.classList.remove("scale-0")
    elModalItem.innerHTML = `
    <div class=" p-[20px]">
            <form class="form flex items-center flex-col w-[100%] "  action="">
                <input required  class="input-name outline-none w-[100%] mt-[10px] border-[1px] border-black-500 rounded-[20px] shadow-md p-[5px] "   type="text" placeholder="Name">
                <input required class="input-price outline-none w-[100%] mt-[10px] border-[1px] border-black-500 rounded-[20px] shadow-md p-[5px] "   type="number" placeholder="price">
                <input required class="input-brand outline-none w-[100%] mt-[10px] border-[1px] border-black-500 rounded-[20px] shadow-md p-[5px] "   type="text" placeholder="brand">
                <input required class="input-color outline-none w-[100%] mt-[10px] border-[1px] border-black-500 rounded-[20px] shadow-md p-[5px] "   type="text" placeholder="color">  
                <div class = "flex gap-[10px]">
                <button class = "create-Btn-form mt-[20px] border-[1px] border-black-500 p-[10px] rounded-[20px] bg-white">Create</button>
                <button onclick = "CloseBtn()" class = " close-Btn-form  mt-[20px] border-[1px] border-black-500 p-[10px] rounded-[20px] bg-white">Cancel</button>
                </div>
                </form>
    </div>
    `
    formEl.addEventListener("submit", (event) => {
        event.preventDefault()
        let newBlog = {
            name: inputNameEl.value, 
            price: Number(inputPriceEL.value), 
            brand: inputPriceEL.value, 
            color: inputPriceEL.value, 
        }
    
        
        fetch(`${API_URL}/car`,{
            method:"POST",
            body:JSON.stringify(newBlog),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(res =>{
            inputNameEl.value = ""
            inputPriceEL.value = ""
            inputBrandEL.value = ""
            inputColorEL.value = ""
            wrapperEl.innerHTML = null
            fetchData("/car", createCard)
        })
    })
}

elModalWrapper.addEventListener("click", (evt) => evt.target.id && elModalWrapper.classList.add("scale-0"))

function CloseBtn(){
    elModalWrapper.classList.add("scale-0")
}    