class Cat1{
    constructor(id, title, images, description, price){
        this.id = id,
        this.title = title,
        this.images = images,
        this.description = description,
        this.price = price        
    }   
}
let categoria1 = []
const ver_categoria1 = async() =>{
    const response = await fetch("https://api.escuelajs.co/api/v1/categories/1/products")
    const data = await response.json()    
    for (let items of data){        
        let nueva_categoria1 = new Cat1(items.id, items.title, items.images, items.description, items.price)
        categoria1.push(nueva_categoria1)
    }   
    localStorage.setItem("cat_nuevas", JSON.stringify(categoria1))    
}

ver_categoria1()
let carrito_compra = JSON.parse(localStorage.getItem("carrito")) || []

//VARIABLES
let btn_carrito = document.getElementById("boton_carrito")//BOTON DEL CARRITO

let modalBody = document.getElementById("modal-body")// MODAL DE LA CARD

let finalizar_compra = document.getElementById("btn_compra")//BOTON PARA FINALIZAR LA COMPRA DEL CARRITO

let total_compra = document.getElementById("total") //PARA EL PRECIO TOTAL

let productos_destacados = document.getElementById("productos_destacados") // DIV DONDE SE VA A CARGAR EL CATALOGO

let div_categorias = document.getElementById("div_categorias")// DIV DONDE VAN LAS CATEGORIAS

let btn_ocultar_destacados = document.getElementById("ocultar_catalogo")//BOTON PARA OCULTAR CATALOGO

let btn_mostrar_catalogo = document.getElementById("ver_catalogo")//BOTON PARA MOSTRAR CATALOGO

let btn_vaciar = document.getElementById("btn_vaciar") // BOTON PARA VACIAR EL CARRITO




//FUNCIONES
//--------------- MOSTRAR CATALOGO
function funcion_mostrar_destacados(array){
    
    div_categorias.innerHTML = ""
    array.forEach((items)=>{
        let nueva_cat1 = document.createElement("div")
        nueva_cat1.innerHTML = `<div class="card mb-3 text-light bg-dark" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${items.images}" class="img-fluid rounded-start" alt="${items.title}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${items.title}</h5>
              <p class="card-text">${items.description}</p>
              <p class="card-text"><STRONG>Precio ONLINE: $${items.price}</STRONG></p>
              <p class="card-text"><STRONG>ID producto: ${items.id}</STRONG></p>
              <button id="agregar_carrito${items.id}" class="btn btn-outline-light">Agregar al carrito</button> 
            </div>
          </div>
        </div>
      </div>`
        div_categorias.append(nueva_cat1)
  
        let btn_agregar_carrito = document.getElementById(`agregar_carrito${items.id}`)        
        btn_agregar_carrito.addEventListener("click", ()=>{          
           funcion_carrito(items)
            
        })
    })
  }
  //--------------- OCULTAR CATALOGO
  function funcion_esconder_destacados(){
    div_categorias.innerHTML = ""
  }
  
  //--------------- AGREGAR AL CARRITO
  function funcion_carrito(items){
    let agregados = carrito_compra.find((e)=> (e.id == items.id))    
    if(agregados == undefined){        
      carrito_compra.push(items)
      localStorage.setItem("carrito", JSON.stringify(carrito_compra))    
       
      Toastify({
        style: {
            background: "linear-gradient(to right, yellow, orange)",
            color:"black"
        },
        text: `${items.title} ID ${items.id} se ha agregado al carrito`,
        offset: {
           x: 50, 
          y: 10 
        },
      }).showToast();
  
    }else{   
        
        Toastify({
            style: {
                background: "linear-gradient(to right, red, orange)",
                color:"black"
            },
          text: `${items.title} ID ${items.id} Ya se encuentra en el carrito`,
          offset: {
            x: 50,
            y: 10 
          },
        }).showToast();
    }
    
  }
  
  //--------------- CARGAR EL CARRITO
  function funcion_carga_carrito(array){
      
    modalBody.innerHTML = ""
    
    array.forEach((producto_carrito)=>{
       
        modalBody.innerHTML += `
        <div class="card border-primary mb-3" id ="producto_carrito${producto_carrito.id}" style="max-width: 540px;">
            <img class="card-img-top" height="300px" src="${producto_carrito.images}" alt="${producto_carrito.title}">
            <div class="card-body">
                    <h4 class="card-title">${producto_carrito.title}</h4>
                
                    <p class="card-text">$${producto_carrito.price}</p> 
                    <button class= "btn btn-danger" id="btn_eliminar${producto_carrito.id}"><i class="fas fa-trash-alt"></i></button>
            </div>    
        
        
        </div>`
  
  })
  array.forEach((producto_carrito, index)=>{
    document.getElementById(`btn_eliminar${producto_carrito.id}`).addEventListener("click",()=>{
      Toastify({
        style: {
            background: "green",
            color:"white"
          },
        text: `${producto_carrito.title} ha sido eliminado`,
        offset: {
          x: 50, 
          y: 10 
        },
      }).showToast();           
              
        array.splice(index, 1)
        console.log(array)      
        localStorage.setItem("carrito", JSON.stringify(array))      
        let producto_removido = document.getElementById(`producto_carrito${producto_carrito.id}`)      
        producto_removido.remove()      
        funcion_contador(array)
        
  
    })
    
  }) 
      
  funcion_contador(array)    
  }
  //--------------- COMPRA TOTAL
  function funcion_contador(array){
    let contador= 0
    
    contador = array.reduce((contador, producto_carrito)=>{
        return contador + producto_carrito.price
    },0)
    
    contador == 0 ? total_compra.innerHTML = `
    <iframe id="gif_carrito" src="https://media.tenor.com/8BeuRyZSb90AAAAj/shopping-cart-shopping.gif" width="480" height="292" frameBorder="0" class="giphy-embed"></iframe>
    <p id="textoCarrito">No hay productos en el carrito</p>` : total_compra.innerHTML = `Hasta el momento. el total de su compra es: $${contador}
    `
  }
  
  //--------------- FINALIZAR COMPRA
  function funcion_finalizar_compra(){
    //PReguntar si ta seguro
    Swal.fire({
        title: 'Desea finalizar su compra?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
    }).then((result)=>{
        if(result.isConfirmed){
            localStorage.clear()
            Swal.fire({
            title: 'Su compra se ha realizado con exito',
            icon: 'success',
            confirmButtonColor: 'green',
            text: `Muchas gracias, los productos han sido adquiridos `,
            })
            carrito_compra =[]
            funcion_carga_carrito(carrito_compra).remove()
            localStorage.removeItem("carrito")
            
        }else{          
            Swal.fire({
                title: 'No se ha realizado su compra',
                icon: 'info',
                text: `Los productos siguen en el carrito`,
                confirmButtonColor: 'green',
                timer:3500
            })
        }
    })
  }
  
  function vaciarCarrito(){
    Swal.fire({
      title: 'Desea vaciar el carrito?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
  }).then((result)=>{
      if(result.isConfirmed){
          localStorage.clear()
          Swal.fire({
          title: 'Su carrito ahora se encuentra vacio',
          icon: 'success',
          confirmButtonColor: 'green',
          text: `Se han eliminado todos los productos `,
          })
          carrito_compra =[]
          funcion_carga_carrito(carrito_compra).remove()
          localStorage.removeItem("carrito")
          
      }else{          
          Swal.fire({
              title: 'No se ha realizado la accion',
              icon: 'info',
              text: `Los productos siguen en el carrito`,
              confirmButtonColor: 'green',
              timer:3500
          })
      }
  })
  }
  function ocultar_categorias(){
    div_categorias.innerHTML = ""
   }
  
  
  
  //BOTONES Y EVENT LISTENERS
  //-------------- BOTON PARA MOSTRAR CATEGORIAS
  btn_mostrar_catalogo.addEventListener("click", ()=>{   
        funcion_mostrar_destacados(categoria1)
       
    })
    
  
  
  //--------------- BOTON FINALIZAR COMPRA
  finalizar_compra.addEventListener("click", ()=>{funcion_finalizar_compra()})
  
  
  
  //--------------- BOTON CARRITO
  btn_carrito.addEventListener("click", ()=>{
      funcion_carga_carrito(carrito_compra)
  })
  
  //-------------- BOTON PARA VACIAR EL CARRITO
  btn_vaciar.addEventListener("click", () =>{
    vaciarCarrito()       
       
  })
  //--------------- BOTON OCULTAR CATEGORIAS
btn_ocultar_destacados.onclick = ocultar_categorias
