/***********  Dom Elements  ************* */
const dogBar = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")
const dogFilter = document.querySelector("#good-dog-filter")

/***********  Render Functions  ************* */

function renderDog(dog){
    const span = document.createElement("span")
    span.textContent = dog.name
    dogBar.append(span)

    span.addEventListener("click", event => {
       clearInfo()
       renderDogInfo(dog)
    })
}

function renderDogInfo(dogObj){
    const name = document.createElement("h2")
    name.textContent = dogObj.name

    const img = document.createElement("img")
    img.src = dogObj.image

    const button = document.createElement("button")
    if (dogObj.isGoodDog){
        button.textContent = "Good Dog!"
    }
    else{
        button.textContent = "Bad Dog!"
    }

    dogInfo.append(name, img, button)
    
    button.addEventListener("click", event => {
        updateBehavior(dogObj, event)
    })
}

function clearInfo() {
    dogInfo.innerHTML = ""
}
// Filter

dogFilter.addEventListener("click", event =>{
    clearInfo()
    if (event.target.textContent === "Filter good dogs: OFF"){
        event.target.textContent = "Filter good dogs: ON"
        goodDogsOnly()
    }
    else {
        event.target.textContent = "Filter good dogs: OFF"
        clearInfo()
    }
})


/***********  Fetch Functions  ************* */
function goodDogsOnly(){
    fetch ('http://localhost:3000/pups')
    .then(response => response.json())
    .then(dogsArray => {
        dogsArray.forEach(dog => {
            if (dog.isGoodDog)
                renderDogInfo(dog)

        })
    })
}

function loadDogs(){
    fetch ('http://localhost:3000/pups')
    .then(response => response.json())
    .then(dogsArray => {
        dogsArray.forEach(dog => {
            renderDog(dog)

        })
    })
}

function updateBehavior(dogObj, event) {
    let behavior = "Bad Dog!"
    if (dogObj.isGoodDog){
        dogObj["isGoodDog"] = false
    }
    else{
        dogObj["isGoodDog"] = true
        behavior = "Good Dog!"
    }
    
    fetch(`http://localhost:3000/pups/${dogObj.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(dogObj),
    })
    .then(response => response.json())
    .then(updatedDog => {
        event.target.textContent = behavior
    })
}

/***********  Intialize  ************* */
loadDogs()