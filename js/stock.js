document.addEventListener('DOMContentLoaded', function() {
    let inputNombre = document.getElementById ('nameProduct');
    let inputDescription = document.getElementById ('descriptionProduct');
    let btnImgUrl = document.getElementById ('imgUrl');
    let btnImgArchivo = document.getElementById ('imgArchivo');
    let inputCant = document.getElementById ('cantProduct');;
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
    
    
    inputVendedor.onmousemove = async()=> {
            const {value:password} = await Swal.fire({
                title: 'Esta ingresando al sector de reposición',
                inputLabel: 'Ingrese clave de vendedor',
                input: 'password',
                confirmButtonText:'Aceptar',
                inputAttributes: {
                    maxlength: 10,
                    autocapitalize: 'off',
                    autocorrect: 'off',},                
                allowOutsideClick: 'false',
            })
            
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

btnImgArchivo.onclick = async()=>{
    const { value: imgArchivo } = await Swal.fire({
        title: 'Select image',
        input: 'file',
        inputAttributes: {
            'accept': 'image/*',
            'aria-label': 'Upload your profile picture'
        }
        })
        
        if (imgArchivo) {
        const reader = new FileReader()
        reader.onload = (e) => {
            Swal.fire({
            icon: 'success',
            title: 'Imagen cargada correctamente',
            imageUrl: e.target.result,
            imageAlt: 'The uploaded picture'
        })
        const imageSave = JSON.stringify(imgArchivo)
        localStorage.setItem ("imageFile", imageSave)
    }
    reader.readAsDataURL(imgArchivo)
    } 
}

btnImgUrl.onclick = async()=>{
    const { value: imgUrl } = await Swal.fire({
        input: 'url',
        inputLabel: 'URL de la imagen',
        inputPlaceholder: 'coloque su URL'
        })
        
        if (imgUrl) {
        Swal.fire(`Se cargo correctamente`)
        const imgSaveUrl = JSON.stringify(imgUrl)
        localStorage.setItem("imageUrl", imgSaveUrl)
        }
};

enviarButton.addEventListener('click', function() {
    const dropImageUrl = JSON.parse(localStorage.getItem("imageUrl"))
    const droptImageFile = JSON.parse(localStorage.getItem("imageFile"))
    let nombre = inputNombre.value;
    let descripcion = inputDescription.value;
    let cant =  inputCant.value;
    let img = dropImageUrl || droptImageFile;
    
    try {
        if ((cant,nombre,img,descripcion)=== ''){
            throw new Error ('Por favor, ingrese los datos en los campos correspondientes');
        }
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
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            
            Toast.fire({
                icon: 'error',
                title: error.message,
            })
        }finally {
            const verProducto = JSON.parse(localStorage.getItem("producto"))
            console.log (verProducto);
        }

    });

});