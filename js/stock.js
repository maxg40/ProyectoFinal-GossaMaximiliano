document.addEventListener('DOMContentLoaded', function() {
    let inputNombre = document.getElementById ('nameProduct');
    let inputDescription = document.getElementById ('descriptionProduct');
    let inputImg = document.getElementById ('imgUrl');
    let inputCant = document.getElementById ('cantProduct');;
    let enviarButton = document.getElementById('enviarButton');
    let inputVendedor = document.getElementById ('vendedor');
    let inputPass = document.getElementById('contraseña');

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
        
            Swal.fire({
                title: 'Enter your password',
                inputLabel: 'Password',
                html: '<input type="password" name="contraseña" id="contraseña" placeholder="Contraseña de vendedor">',
                confirmButtonText:'Aceptar',
            })
            let password = inputPass;
            if (password === 'maxisabe') {
                Swal.fire({
                    icon:'success',
                    title: 'Contraseña correcta, ingresará al sitio de reposición',
                    isConfirmed: 'confirm',
                })
                setTimeout(() => {
                    window.location.href = './repositor.html';
                },3000)
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Contraseña incorrecta',
                    })
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
            
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            
            Toast.fire({
                icon: 'success',
                title: 'El producto se cargo correctamente'
            })
        }catch (error){
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            
            Toast.fire({
                icon: 'error',
                title: 'Error al cargar el producto'
            })
        }finally {
            const verProducto = JSON.parse(localStorage.getItem("producto"))
            console.log (verProducto);
        }

    });

});