class Categorias{
    constructor(id, name, image){
        this.id = id,
        this.name = name,
        this.image = image        
    }   
}
let divisiones = []
const ver_categorias = async() =>{
    const response = await fetch("categorias.json")
    const data = await response.json()
    console.log(data)
    for (let items of data){        
        let nueva_categoria = new Categorias(items.id, items.name, items.image)
        divisiones.push(nueva_categoria)
    }   
    localStorage.setItem("cat_nuevas", JSON.stringify(divisiones))    
}

ver_categorias()
