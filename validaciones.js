document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('ingresoForm');
    const confirmationScreen = document.getElementById('confirmationScreen');

    const fields = {
        nombre: document.querySelector('[name="nombre"]'),
        dni: document.querySelector('[name="dni"]'),
        email: document.querySelector('[name="email"]'),
        emailConfirm: document.querySelector('[name="emailConfirm"]'),
        telefono: document.querySelector('[name="telefono"]'),
        tipoCliente: document.getElementsByName('tipoCliente'),
        empresaNombre: document.querySelector('[name="empresaNombre"]'),
        empresaCuit: document.querySelector('[name="empresaCuit"]'),
        provincia: document.querySelector('[name="provincia"]'),
        localidad: document.querySelector('[name="localidad"]'),
        tipoDispositivo: document.querySelector('[name="tipoDispositivo"]'),
        otroDispositivo: document.querySelector('[name="otroDispositivo"]'),
        marca: document.querySelector('[name="marca"]'),
        otraMarca: document.querySelector('[name="otraMarca"]'),
        modelo: document.querySelector('[name="modelo"]'),
        sistemaOperativo: document.querySelector('[name="sistemaOperativo"]'),
        garantia: document.querySelector('[name="garantia"]'),
        ordenCompra: document.querySelector('[name="ordenCompra"]'),
        tipoProblema: document.querySelector('[name="tipoProblema"]'),
        desdeCuando: document.querySelector('[name="desdeCuando"]'),
        tipoPersistencia: document.getElementsByName('tipoPersistencia'),
        descripcionProblema: document.querySelector('[name="descripcionProblema"]'),
        reparadoAntes: document.getElementById('reparadoAntesCheckbox'),
        detalleReparadoAntes: document.getElementById('detalleReparadoAntes'),
        preferenciasContacto: document.getElementsByName('preferenciasContacto'),
        aceptaDiagnostico: document.getElementById('aceptaDiagnostico'),
        aceptaTerminos: document.getElementById('aceptaTerminos'),
    };

    const selectors = {
        tipoClienteFieldset: document.querySelector('[name="tipoCliente"]')?.closest('fieldset'),
        modalidadEntrega: document.getElementsByName('modalidadEntrega'),
        domicilioDireccionLabel: document.getElementById('domicilioDireccionLabel'),
        direccionDomicilio: document.getElementById('direccionDomicilio'),
    };

    const getSelectedRadio = (radioNodeList) => Array.from(radioNodeList).find((radio) => radio.checked)?.value || '';

    const addMessage = (element, message) => {
        const container = element.closest('label') || element.parentElement;
        if (!container) return;
        let messageEl = container.querySelector('.error-message');
        if (!messageEl) {
            messageEl = document.createElement('span');
            messageEl.className = 'error-message';
            container.appendChild(messageEl);
        }
        messageEl.textContent = message;
    };

    const removeMessage = (element) => {
        const container = element.closest('label') || element.parentElement;
        if (!container) return;
        const messageEl = container.querySelector('.error-message');
        if (messageEl) {
            messageEl.remove();
        }
    };

    const setStatus = (element, valid, message) => {
        element.classList.remove('campo-error', 'campo-ok');
        if (valid) {
            element.classList.add('campo-ok');
            removeMessage(element);
        } else {
            element.classList.add('campo-error');
            if (message) addMessage(element, message);
        }
    };

    const setGroupStatus = (groupSelector, valid, message) => {
        const group = document.querySelector(groupSelector);
        if (!group) return;
        group.classList.remove('campo-error', 'campo-ok');
        if (valid) {
            group.classList.add('campo-ok');
            const error = group.querySelector('.error-message');
            if (error) error.remove();
        } else {
            group.classList.add('campo-error');
            let messageEl = group.querySelector('.error-message');
            if (!messageEl) {
                messageEl = document.createElement('span');
                messageEl.className = 'error-message';
                group.appendChild(messageEl);
            }
            messageEl.textContent = message;
        }
    };

    const validateNombre = () => {
        const value = fields.nombre.value.trim();
        const regex = /^[A-Za-zÀ-ÿ ]{5,80}$/;
        const valid = regex.test(value);
        setStatus(fields.nombre, valid, valid ? '' : 'Nombre completo debe tener 5-80 letras y espacios solamente.');
        return valid;
    };

    const validateDni = () => {
        const value = fields.dni.value.trim();
        const regex = /^\d{7,8}$/;
        const valid = regex.test(value);
        setStatus(fields.dni, valid, valid ? '' : 'DNI debe tener solo números y 7-8 dígitos.');
        return valid;
    };

    const validateEmail = () => {
        const value = fields.email.value.trim();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const valid = regex.test(value);
        setStatus(fields.email, valid, valid ? '' : 'Ingresa un correo electrónico válido.');
        return valid;
    };

    const validateEmailConfirm = () => {
        const value = fields.emailConfirm.value.trim();
        const valid = value === fields.email.value.trim() && value.length > 0;
        setStatus(fields.emailConfirm, valid, valid ? '' : 'Los correos electrónicos deben coincidir.');
        return valid;
    };

    const validateTelefono = () => {
        const value = fields.telefono.value.trim();
        const digits = value.replace(/[^0-9]/g, '').length;
        const regex = /^[\d\s+\-]+$/;
        const valid = regex.test(value) && digits >= 8;
        setStatus(fields.telefono, valid, valid ? '' : 'Teléfono debe tener al menos 8 dígitos y puede incluir +, espacios y guiones.');
        return valid;
    };

    const validateTipoCliente = () => {
        const value = getSelectedRadio(fields.tipoCliente);
        const valid = value === 'Particular' || value === 'Empresa';
        setGroupStatus('#tipoClienteGroup', valid, valid ? '' : 'Selecciona un tipo de cliente.');
        if (!valid) return false;
        if (value === 'Empresa') {
            const nombreEmpresa = fields.empresaNombre.value.trim();
            const cuit = fields.empresaCuit.value.trim();
            const cuitRegex = /^(\d{2}-\d{8}-\d|\d{11})$/;
            const validNombre = nombreEmpresa.length > 0;
            const validCuit = cuitRegex.test(cuit);
            setStatus(fields.empresaNombre, validNombre, validNombre ? '' : 'Nombre de empresa requerido.');
            setStatus(fields.empresaCuit, validCuit, validCuit ? '' : 'CUIT debe ser ##-########-# o 11 dígitos.');
            return validNombre && validCuit;
        }
        removeMessage(fields.empresaNombre);
        removeMessage(fields.empresaCuit);
        fields.empresaNombre.classList.remove('campo-error', 'campo-ok');
        fields.empresaCuit.classList.remove('campo-error', 'campo-ok');
        return true;
    };

    const validateTipoProblema = () => {
        const value = fields.tipoProblema.value;
        const valid = value !== '';
        setStatus(fields.tipoProblema, valid, valid ? '' : 'Selecciona el tipo de problema.');
        return valid;
    };

    const validateDesdeCuando = () => {
        const value = fields.desdeCuando.value.trim();
        const valid = value !== '';
        setStatus(fields.desdeCuando, valid, valid ? '' : 'Indica desde cuándo ocurre el problema.');
        return valid;
    };

    const validateTipoPersistencia = () => {
        const value = getSelectedRadio(fields.tipoPersistencia);
        const valid = value === 'Permanente' || value === 'Intermitente';
        setGroupStatus('#tipoPersistenciaGroup', valid, valid ? '' : 'Selecciona cómo se presenta el problema.');
        return valid;
    };

    const validateDescripcionProblema = () => {
        const value = fields.descripcionProblema.value.trim();
        const valid = value.length >= 20 && value.length <= 500;
        setStatus(fields.descripcionProblema, valid, valid ? '' : 'Describe el problema con al menos 20 caracteres.');
        return valid;
    };

    const validateReparadoAntes = () => {
        if (fields.reparadoAntes.checked) {
            const value = fields.detalleReparadoAntes.value.trim();
            const valid = value.length >= 10;
            setStatus(fields.detalleReparadoAntes, valid, valid ? '' : 'Describe la reparación anterior con al menos 10 caracteres.');
            return valid;
        }
        fields.detalleReparadoAntes.classList.remove('campo-error', 'campo-ok');
        removeMessage(fields.detalleReparadoAntes);
        return true;
    };

    const validatePreferenciasContacto = () => {
        const selected = Array.from(fields.preferenciasContacto).some((checkbox) => checkbox.checked);
        setGroupStatus('#preferenciasContactoGroup', selected, selected ? '' : 'Selecciona al menos una preferencia de contacto.');
        return selected;
    };

    const validateAcepta = () => {
        const validDiagnostico = fields.aceptaDiagnostico.checked;
        const validTerminos = fields.aceptaTerminos.checked;
        setStatus(fields.aceptaDiagnostico, validDiagnostico, validDiagnostico ? '' : 'Debes aceptar el diagnóstico y el presupuesto.');
        setStatus(fields.aceptaTerminos, validTerminos, validTerminos ? '' : 'Debes aceptar los términos y condiciones.');
        return validDiagnostico && validTerminos;
    };

    const validateProvincia = () => {
        const value = fields.provincia.value.trim();
        const valid = value !== '';
        setStatus(fields.provincia, valid, valid ? '' : 'Selecciona una provincia.');
        return valid;
    };

    const validateLocalidad = () => {
        const value = fields.localidad.value.trim();
        const valid = value.length >= 2;
        setStatus(fields.localidad, valid, valid ? '' : 'Localidad debe tener al menos 2 caracteres.');
        return valid;
    };

    const validateTipoDispositivo = () => {
        const value = fields.tipoDispositivo.value;
        const valid = value !== '';
        setStatus(fields.tipoDispositivo, valid, valid ? '' : 'Selecciona el tipo de dispositivo.');
        if (!valid) return false;
        if (value === 'Otro') {
            const other = fields.otroDispositivo.value.trim();
            const validOther = other.length > 0;
            setStatus(fields.otroDispositivo, validOther, validOther ? '' : 'Describe el tipo de dispositivo.');
            return validOther;
        }
        fields.otroDispositivo.classList.remove('campo-error', 'campo-ok');
        removeMessage(fields.otroDispositivo);
        return true;
    };

    const validateMarca = () => {
        const value = fields.marca.value;
        const valid = value !== '';
        setStatus(fields.marca, valid, valid ? '' : 'Selecciona una marca.');
        if (!valid) return false;
        if (value === 'Otra') {
            const other = fields.otraMarca.value.trim();
            const validOther = other.length > 0;
            setStatus(fields.otraMarca, validOther, validOther ? '' : 'Especifica la otra marca.');
            return validOther;
        }
        fields.otraMarca.classList.remove('campo-error', 'campo-ok');
        removeMessage(fields.otraMarca);
        return true;
    };

    const validateModelo = () => {
        const value = fields.modelo.value.trim();
        const valid = value.length >= 2;
        setStatus(fields.modelo, valid, valid ? '' : 'Modelo debe tener al menos 2 caracteres.');
        return valid;
    };

    const validateSistemaOperativo = () => {
        const value = fields.sistemaOperativo.value;
        const valid = value !== '';
        setStatus(fields.sistemaOperativo, valid, valid ? '' : 'Selecciona un sistema operativo.');
        return valid;
    };

    const validateGarantia = () => {
        if (fields.garantia.checked) {
            const value = fields.ordenCompra.value.trim();
            const valid = value.length > 0;
            setStatus(fields.ordenCompra, valid, valid ? '' : 'Ingresa número de orden o fecha de compra.');
            return valid;
        }
        fields.ordenCompra.classList.remove('campo-error', 'campo-ok');
        removeMessage(fields.ordenCompra);
        return true;
    };

    const showConfirmation = () => {
        form.classList.add('hidden');
        confirmationScreen.classList.remove('hidden');
        const orderNumber = `TF-${Math.floor(100000 + Math.random() * 900000)}`;
        confirmationScreen.innerHTML = `
            <div class="confirmation-card">
                <h2>Ingreso confirmado</h2>
                <p>Tu equipo fue registrado correctamente en TechFix.</p>
                <p class="order-number">Orden: ${orderNumber}</p>
                <p>Guarda este número para seguimiento. Te contactaremos pronto.</p>
                <a href="index.html" class="btn btn-primary">Volver al inicio</a>
            </div>
        `;
    };

    const validateForm = () => {
        const validations = [
            validateNombre(),
            validateDni(),
            validateEmail(),
            validateEmailConfirm(),
            validateTelefono(),
            validateTipoCliente(),
            validateProvincia(),
            validateLocalidad(),
            validateTipoDispositivo(),
            validateMarca(),
            validateModelo(),
            validateSistemaOperativo(),
            validateTipoProblema(),
            validateDesdeCuando(),
            validateTipoPersistencia(),
            validateDescripcionProblema(),
            validateReparadoAntes(),
            validatePreferenciasContacto(),
            validateGarantia(),
            validateAcepta(),
        ];

        return validations.every(Boolean);
    };

    const toggleempresaFields = () => {
        const value = getSelectedRadio(fields.tipoCliente);
        const container = document.querySelector('.empresa-fields');
        if (value === 'Empresa') {
            container.classList.remove('hidden');
        } else {
            container.classList.add('hidden');
        }
    };

    const toggletipoDispositivo = () => {
        const other = fields.tipoDispositivo.value === 'Otro';
        document.getElementById('otroDispositivoLabel').classList.toggle('hidden', !other);
        document.getElementById('otroDispositivo').required = other;
    };

    const togglemarcaEquipo = () => {
        const other = fields.marca.value === 'Otra';
        document.getElementById('otraMarcaLabel').classList.toggle('hidden', !other);
        document.getElementById('otraMarca').required = other;
    };

    const togglegarantiaFields = () => {
        document.getElementById('garantiaFields').classList.toggle('hidden', !fields.garantia.checked);
    };

    const togglemodalidadEntrega = () => {
        const selected = getSelectedRadio(selectors.modalidadEntrega);
        const show = selected === 'Domicilio';
        selectors.domicilioDireccionLabel.classList.toggle('hidden', !show);
        selectors.direccionDomicilio.required = show;
    };

    const toggleReparadoAntes = () => {
        const show = document.getElementById('reparadoAntesCheckbox').checked;
        document.getElementById('reparadoAntesLabel').classList.toggle('hidden', !show);
    };

    const updateCounter = (input, counterId, max) => {
        const counter = document.getElementById(counterId);
        if (counter) {
            counter.textContent = `${input.value.length} / ${max}`;
        }
    };

    fields.nombre.addEventListener('input', validateNombre);
    fields.dni.addEventListener('input', validateDni);
    fields.email.addEventListener('input', validateEmail);
    fields.emailConfirm.addEventListener('input', validateEmailConfirm);
    fields.telefono.addEventListener('input', validateTelefono);
    fields.provincia.addEventListener('change', validateProvincia);
    fields.localidad.addEventListener('input', validateLocalidad);
    fields.tipoDispositivo.addEventListener('change', () => { toggletipoDispositivo(); validateTipoDispositivo(); });
    fields.otroDispositivo.addEventListener('input', validateTipoDispositivo);
    fields.marca.addEventListener('change', () => { togglemarcaEquipo(); validateMarca(); });
    fields.otraMarca.addEventListener('input', validateMarca);
    fields.modelo.addEventListener('input', validateModelo);
    fields.sistemaOperativo.addEventListener('change', validateSistemaOperativo);
    fields.garantia.addEventListener('change', () => { togglegarantiaFields(); validateGarantia(); });
    fields.ordenCompra.addEventListener('input', validateGarantia);
    fields.tipoProblema.addEventListener('change', validateTipoProblema);
    fields.desdeCuando.addEventListener('change', validateDesdeCuando);
    Array.from(fields.tipoPersistencia).forEach((radio) => {
        radio.addEventListener('change', validateTipoPersistencia);
    });
    fields.descripcionProblema.addEventListener('input', (event) => {
        updateCounter(event.target, 'descripcionContador', 500);
        validateDescripcionProblema();
    });
    fields.reparadoAntes.addEventListener('change', () => {
        toggleReparadoAntes();
        validateReparadoAntes();
    });
    fields.detalleReparadoAntes.addEventListener('input', (event) => {
        updateCounter(event.target, 'reparadoAntesContador', 300);
        validateReparadoAntes();
    });
    Array.from(fields.preferenciasContacto).forEach((checkbox) => {
        checkbox.addEventListener('change', validatePreferenciasContacto);
    });
    fields.aceptaDiagnostico.addEventListener('change', validateAcepta);
    fields.aceptaTerminos.addEventListener('change', validateAcepta);

    Array.from(fields.tipoCliente).forEach((radio) => {
        radio.addEventListener('change', () => {
            toggleempresaFields();
            validateTipoCliente();
        });
    });

    Array.from(selectors.modalidadEntrega).forEach((radio) => {
        radio.addEventListener('change', () => {
            togglemodalidadEntrega();
        });
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validateForm()) {
            showConfirmation();
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    form.addEventListener('reset', () => {
        setTimeout(() => {
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach((input) => {
                input.classList.remove('campo-error', 'campo-ok');
                removeMessage(input);
            });
            document.getElementById('otroDispositivoLabel').classList.add('hidden');
            document.getElementById('otraMarcaLabel').classList.add('hidden');
            document.getElementById('garantiaFields').classList.add('hidden');
            document.getElementById('domicilioDireccionLabel').classList.add('hidden');
            document.getElementById('reparadoAntesLabel').classList.add('hidden');
            selectors.direccionDomicilio.required = false;
            document.getElementById('otroDispositivo').required = false;
            document.getElementById('otraMarca').required = false;
            updateCounter(document.getElementById('descripcionProblema'), 'descripcionContador', 500);
            updateCounter(document.getElementById('detalleReparadoAntes'), 'reparadoAntesContador', 300);
        }, 10);
    });

    toggleempresaFields();
    toggletipoDispositivo();
    togglemarcaEquipo();
    togglegarantiaFields();
    togglemodalidadEntrega();
    toggleReparadoAntes();
});
