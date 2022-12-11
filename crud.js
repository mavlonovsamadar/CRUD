const openModal = () => {
    let modal = document.querySelector('.modal-container');
    let exit = document.querySelector('.exit');  
    
    modal.classList.add("active")
if(modal.classList.contains("active")){
    exit.onclick= () => {
        modal.classList.remove("active")
    }
}

}

const VAlueInput = () =>{
let value = document.querySelector('#m-nome').value;
let data = {name: value}

if(value !== ""){
    let url = "http://localhost:3000/data"
fetch(url, {
   method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data), 
}).then(res => {
  if(res.status === 201){
    alert('success')
    value = ""
  }  
  else{
    alert('xato')
  }
    
})
}
else{alert('to`ldir')
}
}


let getUrl = "http://localhost:3000/data"
fetch(getUrl)
.then(res => res.json())
.then(data => {
    data.forEach(elem => {
      let div = document.querySelector('.div');
      div.innerHTML += `
      <li style="padding: 5px;"> ${elem.name}  <b data-id=${elem.id}>DELETE</b> </li>`
     
      div.onclick = (e) =>{
          let id = e.path[0].getAttribute('data-id')
          //console.log(id);
          fetch(`http://localhost:3000/data/${id}`, {
            method: "DELETE"
          }).then(res =>res.status === 200 ? alert('Delete success') : alert('Error'))
      }
    });
})



let btn = document.querySelector('#btnSalvar');  
btn.onclick = (e) => {
  // e.preventDefault()
    VAlueInput() 
}