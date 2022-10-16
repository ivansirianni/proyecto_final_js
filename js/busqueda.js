//CONSTRUCTOR DE OBJETOS, FORMA TRADICIONAL
class Sucursales{
    constructor(direccion, zona, telefono, imagen){        
        this.direccion = direccion,
        this.zona = zona,
        this.telefono = telefono
        this.imagen = imagen
    }//metodo
   
}

//SUCURSALES
const sucursal1 = new Sucursales("Bajada Puccio 1552", "NORTE", 4251236, "sucursal.jpg")

const sucursal2 = new Sucursales("Arijon 155 Bis", "SUR", 4125842, "sucursal.jpg")

const sucursal3 = new Sucursales("Entre Ríos 729", "CENTRO", 4568523, "sucursal.jpg")

const sucursal4 = new Sucursales("Pellegrini 6523", "OESTE", 4362145, "sucursal.jpg")

const sucursal5 = new Sucursales("Bv. Seguí 6411", "SUDOESTE", 4302562, "sucursal.jpg")

//ARRAY CON SUCURSALES
const locales = [sucursal1, sucursal2, sucursal3, sucursal4, sucursal5]
console.log(locales)

//VARIABLES
let mis_sucursales = document.getElementById("sucursales") //SUCURSALES

//BUSCADOR DE SUCURSALES POR ZONA
const textoBuscar = document.querySelector("#textoBuscar")
const botonBuscar = document.querySelector("#botonBuscar")
const resultadoBusqueda = document.querySelector("#sucursales")

const buscarProductos = ()=>{   
    
    resultadoBusqueda.innerHTML = ""

    const textoProducto = textoBuscar.value.toLowerCase();    
    for (let local of locales){
        let descripcion = local.zona.toLowerCase();       
        if(descripcion.indexOf(textoProducto) !== -1){
                resultadoBusqueda.innerHTML += `<div class="card d-flex justify-content-start text-light bg-dark" style="width: 18rem;">
                                                <img class="card-img-top" style="height: 250px;" src="sources/${local.imagen}" alt="${local.zona} de Zona: ${local.zona}">
                                                <div class="card-body">
                                                    <h4 class="card-title">${local.zona}</h4>
                                                    <p>Dirección: ${local.direccion}</p>
                                                    <p class="">Teléfono: ${local.telefono}</p>
                                                    <button class="btn btn-outline-light btn_ubi">Ver Ubicación</button>
                                                </div>
                                            </div>`
                                           
            }  
            let btn_ubi = document.getElementsByClassName("btn_ubi")
            for(let compra of btn_ubi){
            compra.addEventListener("click", ()=>{
            Swal.fire({
          title: 'Ubicación',         
          html: `Ultimos pasos!, <b>haga click en el siguiente</b> ` +
          '<a href="https://www.google.com.ar/maps/@-32.9511051,-60.7098175,15z">link</a> ' +
          ' para ver como llegar.',
          imageUrl: 'https://i.blogs.es/635f55/maps/450_1000.webp',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
        })
    })
}
    }
    if(resultadoBusqueda.innerHTML === ""){
    //POP-UP MENSAJE PRODUCTO NO ENCONTRADO
    Toastify({
        text: "El producto no se encuentra en la tienda",
        duration: 2000,
        gravity: "top", 
        position: "center", 
        stopOnFocus: false, 
        style: {
          background: "red",
          color: "white"
        },
      }).showToast(); 
    }
}

botonBuscar.addEventListener("click" , buscarProductos)
//VA BUSCANDO A MEDIDA QUE VAMOS ESCRIBIENDO EN EL BUSCADOR
textoBuscar.addEventListener("keyup", buscarProductos)
  
  



