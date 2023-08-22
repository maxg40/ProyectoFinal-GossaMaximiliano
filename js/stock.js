document.addEventListener('DOMContentLoaded', function() {
    let inputNombre = document.getElementById ('nameProduct');
    let inputDescription = document.getElementById ('descriptionProduct');
    let inputImg = document.getElementById ('imgUrl');
    let inputCant = document.getElementById ('cantProduct');
    let msj = document.getElementById ('mensaje');
    let enviarButton = document.getElementById('enviarButton');
    let inputVendedor = document.getElementById ('vendedor');

    let stock = []; 


    class Producto {
        constructor (nombre,descripcion,img,cant){
            this.img = img;
            this.nombre = nombre;
            this.descripcion = descripcion;
            this.cant = cant;
        }
    }

    inputVendedor.onclick =()=>{
        let pass = prompt('Ingrese contraseña de vendedor');
        let passCorrecto = 'maxisabe';
        if (pass === passCorrecto){
            window.location.href = 'repositor.html';
        }
        else{
            alert ('Contraseña incorrecta')
        }
        
    }

    enviarButton.addEventListener('click', function() {
        let nombre = inputNombre.value;
        let descripcion = inputDescription.value;
        let img = inputImg.value;
        let cant =  inputCant.value;
        
        try {
            const productos = new Producto (nombre,descripcion,img,cant);
            stock.push (productos);
            const enJSON = JSON.stringify(stock);
                
            localStorage.setItem("producto", enJSON);
            
            console.log ('Se cargaron los productos con exito')
            msj.innerHTML = `<h2>El producto se cargo con exito</h2>`
        }catch (error){
            console.log ('Error al subir archivos', error);
            msj.innerHTML= `Error al cargar el producto`
        }finally {
            const verProducto = JSON.parse(localStorage.getItem("producto"))
            console.log (verProducto);
        }

    });

});