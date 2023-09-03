document.addEventListener('DOMContentLoaded', function () {
    let inputNombre = document.getElementById('nameProduct');
    let inputDescription = document.getElementById('descriptionProduct');
    let btnImgUrl = document.getElementById('imgUrl');
    let btnImgArchivo = document.getElementById('imgArchivo');
    let inputCant = document.getElementById('cantProduct');
    let enviarButton = document.getElementById('enviarButton');
    let inputVendedor = document.getElementById('vendedor');


    let stock = [];


    class Producto {
        constructor(nombre, descripcion, img, cant) {
            this.img = img;
            this.nombre = nombre;
            this.descripcion = descripcion;
            this.cant = cant;
        }
    }


    inputVendedor.addEventListener ('click', async () => {
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
            allowOutsideClick: 'true',
        })

        if (password === 'maxisabe') {
            Swal.fire({
                icon: 'success',
                title: 'Contraseña correcta, ingresará al sitio de reposición',
                isConfirmed: 'confirm',
            })

            window.location.href = './repositor.html';

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Contraseña incorrecta',
            })
        }
    
    })

    btnImgArchivo.onclick = async () => {
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
                localStorage.setItem("imageFile", imageSave)
            }
            reader.readAsDataURL(imgArchivo)
        }
    }

    btnImgUrl.onclick = async () => {
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

    enviarButton.addEventListener('click', function () {
        const dropImageUrl = JSON.parse(localStorage.getItem("imageUrl"))
        const droptImageFile = JSON.parse(localStorage.getItem("imageFile"))
        let nombre = inputNombre.value;
        let descripcion = inputDescription.value;
        let cant = inputCant.value;
        let img = dropImageUrl || droptImageFile;

        try {
            if ((cant, nombre, img, descripcion) === '') {
                throw new Error('Por favor, ingrese los datos en los campos correspondientes');
            }
            const productos = new Producto(nombre, descripcion, img, cant);
            stock.push(productos);
            const enJSON = JSON.stringify(stock);

            localStorage.setItem("producto", enJSON);

            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
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
            setTimeout(() => {
                stock.forEach (stock=> {
                    
                    Swal.fire({
                        background: '#ee9c98',
                        html: `<section id="cards" class="productos">
                        <div class="cards ">
                        <img src="${stock.img}" class="card-img-top" alt="foto de producto">
                        <div class="card-body">
                        <h5 class="card-title">${stock.nombre}</h5>
                        <p class="card-text">${stock.descripcion}</p>
                        <button type="button" class="btn  bg-grad"> Cantidad <span class="badge text-bg-secondary">${stock.cant}</span></button>
                        </div>
                        </div>
                        </section>`,
                    })
                })
                
            }, 3000);
        } catch (error) {
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
        }
    });
});