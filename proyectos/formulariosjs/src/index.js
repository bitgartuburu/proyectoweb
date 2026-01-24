document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById('formulario');
    const mensajeError = document.getElementById('mensajeError');

    formulario.addEventListener('submit', function (evento) {
        evento.preventDefault(); // Previene el envío del formulario para poder validarlo con Javascript

        // Aquí es donde indicamos que coja los valores de los distintos campos
        let nombre = document.getElementById('nombre').value;
        let apellido = document.getElementById('apellido').value;
        let edad = document.getElementById('edad').value;
        let telefono = document.getElementById('telefono').value;
        let email = document.getElementById('email').value;
        let provincias = document.getElementById('provincias').value;
        let via = document.getElementById('via').value;
        let direccion = document.getElementById('direccion').value;
        let terminos = document.getElementById('terminos').checked;

        // Validación de los campos uno por uno
        if (nombre.trim() === '') {
            mensajeError.innerText = 'El campo nombre no puede estar vacío.';
            return;
        }

         if (apellido.trim() === '') {
            mensajeError.innerText = 'El campo apellido no puede estar vacío.';
            return;
        }
     
        //valido la edad. tiene que ser entero mayor que 18 
        if (edad.trim() === '' || isNaN(edad)) { 
            mensajeError.innerText = 'Tiene que introducir un número entero en su edad.';  
            document.getElementById('edad').focus(); return;
         }
        edad = parseInt(edad); 
            if (edad < 18) { 
                mensajeError.innerText = 'Debe ser mayor de 18 años.'; 
                document.getElementById('edad').focus(); return; 
            }

        // Valida que el número de teléfono tiene exactamente 9 dígitos
        if (!/^\d{9}$/.test(telefono)) {
             mensajeError.innerText = 'El número de teléfono debe tener exactamente 9 dígitos.';
              document.getElementById('telefono').focus(); return;
         }

        if (email.trim() === '') {
            mensajeError.innerText = 'El campo email no puede estar vacío.';
            return;
        }

        if (!validarEmail(email)) {
            mensajeError.innerText = 'El formato del email no es válido.';
            return;
        }

        if (provincias === '') {
            mensajeError.innerText = 'Debes seleccionar una provincia.';
            return;
        }

        if (via === '') {
            mensajeError.innerText = 'Debes seleccionar un tipo de vía.';
            return;
        }

        
        if (direccion.length <= 5) {
            mensajeError.innerText = 'Debes seleccionar una dirección válida.';
            return;
        }   

        if (!terminos) {
            mensajeError.innerText = 'Debes aceptar los términos y condiciones.';
            return;
        }

        // Si todo está correcto, se puede proceder a enviar el formulario o hacer alguna otra acción
        mensajeError.innerText = '';
        // alert('Formulario enviado con éxito!');
        formulario.submit(); // Descomentar esta línea para permitir el envío del formulario
    });

    function validarEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Boton para limpiar los campos del formulario
    const botonLimpiar = document.getElementById('limpiar');
     botonLimpiar.addEventListener('click', function () {
         formulario.reset(); mensajeError.innerText = '';
         });
});