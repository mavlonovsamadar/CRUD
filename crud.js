const openModal = () => {
  let modal = document.querySelector('.modal-container');
  let exit = document.querySelector('.exit');  
  
  modal.classList.add("active")
document.querySelector('#btnSalvar2').style.display="none"  

if(modal.classList.contains("active")){
  exit.onclick= () => {
      modal.classList.remove("active")
  }
}

}

const PostFunc = () =>{
let inp = document.querySelector('#m-nome');
let data = {name: inp.value}

if(inp.value !== "" && !inp.value.includes(' ')){
  let url = "http://localhost:3000/data"
fetch(url, {
 method: "POST",
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(data), 
}).then(res => {
if(res.status === 201){
  alert('success')
  //value = ""
}  
else{
  alert('xato')
}
  
})
}
else{alert('So`z kiriting')
}
}


let getUrl = "http://localhost:3000/data"
fetch(getUrl)
.then(res => res.json())
.then(data => {
  data.forEach(elem => {
    let div = document.querySelector('.div');
    div.innerHTML += `
    <li style="padding: 5px;"> ${elem.name}   <button class='delete' data-id=${elem.id}>Delete</button>
    <button class="edit" data-id-edit=${elem.id}>Edit</button>
     </li>`
   
    div.onclick = (e) =>{
      document.querySelector('#btnSalvar').style.display="none"  
        let modal = document.querySelector('.modal-container');
        let exit = document.querySelector('.exit');  
        exit.onclick= () => {
          modal.classList.remove("active")
      }
      let id = e.path[0].getAttribute('data-id')
        DeleteFunc(id)

        let edit_id = e.target.getAttribute("data-id-edit")
        if(e.target.classList.contains("edit")){
          modal.classList.add("active")
          EditFunc(edit_id)
        }
    }
  });
})



const EditFunc = (edit_id) => {
  fetch(`http://localhost:3000/data/${edit_id}`)
  .then(res => res.json())
  .then(data => {
    let inp = document.querySelector('#m-nome');
    inp.value = data.name
    let btnSalvar2 = document.querySelector('#btnSalvar2');
    btnSalvar2.onclick = (e) => {
      e.preventDefault()
      if(inp.value !== "" && !inp.value.includes(' ')){
         fetch(`http://localhost:3000/data/${edit_id}`, {
        method: "PUT",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name: inp.value}), 
  }).then(res =>{
    if(res.status === 200){
      alert("Edit Success");
    }
  })
  }
    else{alert("Qatorni to'ldiring")}
  
}
})
}


const DeleteFunc = (id) => {
        //console.log(id);
fetch(`http://localhost:3000/data/${id}`, {
  method: "DELETE"
}).then(res =>res.status === 200 ? alert('Delete done') : (""))
}


let btn = document.querySelector('#btnSalvar');  
btn.onclick = (e) => {
e.preventDefault()
PostFunc() 
}