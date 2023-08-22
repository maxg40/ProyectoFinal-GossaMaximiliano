

document.addEventListener('DOMContentLoaded', function() {
    let nombreInput = document.getElementById('nombre');
    let apellidoInput = document.getElementById('apellido');
    let nacimientoInput = document.getElementById('nacimiento');
    let enviarButton = document.getElementById('enviarButton');
    let articleElement = document.getElementById ('menorEdad');
    let inputPass = document.getElementById ('contraseña');
    
    usuario = []

    enviarButton.addEventListener('click', function() {
        let nombre = nombreInput.value;
        let apellido = apellidoInput.value;
        let nacimiento = nacimientoInput.value;
        let passCorrecto = inputPass.value;
    
        let fechaNacimiento = new Date(nacimiento);
        let añoNacimiento = fechaNacimiento.getFullYear();
        
        let añoActual = new Date().getFullYear();
        let edadEnAños = añoActual - añoNacimiento;
        
        usuario.push(nombre,apellido,edadEnAños)
        sectorVendedor (nombre, passCorrecto, edadEnAños);
    });

    const sectorVendedor = (nombre, passCorrecto, edadEnAños) => {
        let passValido = 'maxisabe'

        if ( passCorrecto === passValido) {
            articleElement.innerHTML = `<h2>Hola vendedor ${nombre}, en seguida sera redirigido al sitio de reposición.</h2>`
            setTimeout(() => {
                window.location.href = './html/repositor.html';
            }, 3000);
        }
        else {
            alert ('Contraseña incorrecta, pasara al sitio de compra')
            validarEdad (edadEnAños, nombre);
        }
    }

    const validarEdad = (edadEnAños, nombre) =>  {
        
        if  (edadEnAños >= 18){
            articleElement.innerHTML = `<h2> Hola ${nombre}, en unos segundos sera redirigido a nuestro catálogo de compra. Gracias por visitarnos </h2>`;
        setTimeout ( () => {
            window.location.href = './html/stock.html';
        },3000 )
        
        }
        else {
            articleElement.innerHTML = `<h2> Lo sentimos ${nombre}, usted es menor de edad </h2>`;
        }
    }
    
});


