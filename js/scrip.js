

document.addEventListener('DOMContentLoaded', function() {
    let nombreInput = document.getElementById('nombre');
    let apellidoInput = document.getElementById('apellido');
    let nacimientoInput = document.getElementById('nacimiento');
    let enviarButton = document.getElementById('enviarButton');
    let articleElement = document.getElementById ('irRepo');
    
    usuario = []

    enviarButton.addEventListener('click', function() {
        let nombre = nombreInput.value;
        let apellido = apellidoInput.value;
        let nacimiento = nacimientoInput.value;
    
        let fechaNacimiento = new Date(nacimiento);
        let añoNacimiento = fechaNacimiento.getFullYear();
        
        let añoActual = new Date().getFullYear();
        let edadEnAños = añoActual - añoNacimiento;
        
        usuario.push(nombre,apellido,edadEnAños)
        validarEdad (nombre, edadEnAños);
    });

    

    const validarEdad = (nombre, edadEnAños) =>  {
        
        if  (edadEnAños >= 18){
            Swal.fire({
                icon:'success',
                title:`Hola ${nombre}`,
                text: 'en unos segundos sera dirigido al sitio de pedidos',
                })
        setTimeout ( () => {
            window.location.href = './html/stock.html';
        },5000 )
        
        }
        else {
            Swal.fire ({
                icon: 'error',
                title: 'Lo sentimos',
                text: 'Usted es menor de edad',
            })
        }
    }
    
    articleElement.onclick = () => {
        (async()=> {
            const {value:password} = await Swal.fire({
                imageUrl: './img/fondo.png',
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
                    window.location.href = './html/repositor.html';
                },3000)
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Contraseña incorrecta',
                    })
        }
    
    })()
    }
});


