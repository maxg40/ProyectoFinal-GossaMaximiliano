let inputVendedor = document.getElementById('vendedor');

carro = [];

class Producto {
    constructor(nombre, cantidad) {
        this.nombre = nombre;
        this.cantidad = cantidad;
    }
}

inputVendedor.onclick = async () => {
    const { value: password } = await Swal.fire({
        title: 'Esta ingresando al sector de reposición',
        inputLabel: 'Ingrese clave de vendedor',
        input: 'password',
        confirmButtonText: 'Aceptar',
        inputAttributes: {
            maxlength: 10,
            autocapitalize: 'off',
            autocorrect: 'off',
        },
        allowOutsideClick: 'false',
    })

    if (password === 'maxisabe') {
        Swal.fire({
            icon: 'success',
            title: 'Contraseña correcta, ingresará al sitio de reposición',
            isConfirmed: 'confirm',
        })
        setTimeout(() => {
            window.location.href = './repositor.html';
        }, 3000)
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Contraseña incorrecta',
        })
    }

}


try {

    const cargarStock = async () => {
        const resp = await fetch('../datos.json');
        const datos = await resp.json();
        const baseDatos = datos.data;
        productCards = document.getElementById('cards')
        let number = 0;
        htmlBase = '';
        baseDatos.forEach(baseDatos => {

            number += 1;
            productCards.innerHTML += `<div class="cards ">
            <img src="${baseDatos.img}" class="card-img-top" alt="foto de producto">
            <div class="card-body">
            <h5 class="card-title">${baseDatos.nombre}</h5>
        <p class="card-text">${baseDatos.description}</p>
        <button type="button" class="btn  bg-grad"> Cantidad en Stock <span id="modifCant${number}" class="badge text-bg-secondary">${baseDatos.cant}</span></button>
            <input type="text" name="cantidad" id="cantPedido-${number}" class="styleInput"  placeholder="Cantidad a pedir"> 
        <button type="button" id="btnCargar-${number}" class="btn btn-shadown bg-grad"> Cargar al carro </button>
        </div>
        </div>`;
            let guardarCantJSON = JSON.stringify(baseDatos.cant);
            localStorage.setItem(`cantidad${number}`, guardarCantJSON)
            let guardarJSON = JSON.stringify(baseDatos.nombre);
            localStorage.setItem(`producto${number}`, guardarJSON);

        });
        for (let i = 1; i <= number; i++) {
            let inputCargar = document.getElementById(`btnCargar-${i}`);
            let inputCantPedido = document.getElementById(`cantPedido-${i}`);
            let modificaSpan = document.getElementById(`modifCant${i}`);
            inputCargar.addEventListener("click", function () {
                const dropCantidad = JSON.parse(localStorage.getItem(`cantidad${i}`))
                const dropProduct = JSON.parse(localStorage.getItem(`producto${i}`));
                let nombre = dropProduct;
                let cantidad = inputCantPedido.value.trim();
                try {
                    if (cantidad > dropCantidad) {
                        throw new Error('Esta ingresando un valor mayor al stock')
                    }
                    if ((cantidad === "0") || (cantidad === '')) {
                        throw new Error('No ingreso un valor correspondiente')
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.message,
                    })
                    return;
                }
                producto = new Producto(nombre, cantidad);
                carro.push(producto);
                console.log(carro);
                restoStock = (dropCantidad - cantidad);
                modificaSpan.textContent = restoStock;
            });
        }

    }

    cargarStock()
} catch (error) {
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
        title: 'Signed in successfully'
    })
}
