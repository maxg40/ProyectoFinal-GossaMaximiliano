let inputVendedor = document.getElementById ('vendedor');
try  {

    inputVendedor.onclick =()=>{
        let pass = prompt('Ingrese contraseña de vendedor');
        let passCorrecto = 'maxisabe';
        if (pass === passCorrecto){
            window.location.href = './repositor.html';
        }
        else{
            alert ('Contraseña incorrecta')
        }
        
    }

const cargarStock = async () => {
    const resp = await fetch ('../datos.json');
    const datos = await resp.json();
    const baseDatos = datos.data;
    productCards = document.getElementById('cards')

    baseDatos.forEach(baseDatos => {
        productCards.innerHTML += `<div class="cards " style="width: 18rem;">
        <img src="${baseDatos.img}" class="card-img-top" alt="foto de producto">
        <div class="card-body">
        <h5 class="card-title">${baseDatos.nombre}</h5>
        <p class="card-text">${baseDatos.description}</p>
        <button type="button" class="btn  bg-grad"> Cantidad <span class="badge text-bg-secondary">${baseDatos.cant}</span></button>
        </div>
    </div>`
    });
}
cargarStock()
}catch (error) {
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