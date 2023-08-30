let inputVendedor = document.getElementById ('vendedor');


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
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Contraseña incorrecta',
                })
    }

}


try  {

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