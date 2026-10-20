// script.js

// Mapeo directo a los archivos HTML existentes en tu repositorio
const paginasCampos = {
    "Agronomía y Sistemas Naturales": "agronomia-sistemas-naturales.html",
    "Artes": "artes.html",
    "Ciencias Biológicas y Química": "ciencias-biologicas-quimica.html",
    "Ciencias Económicas y Administrativas": "ciencias-economicas-administrativas.html",
    "Ciencias Exactas": "ciencias-exactas.html",
    "Ciencias de la Educación": "ciencias-educacion.html",
    "Ciencias de la Tierra y Agropecuarias": "ciencias-tierra-agropecuaria.html",
    "Ciencias Jurídicas": "ciencias-juridicas.html",
    "Ciencias Sociales": "ciencias-sociales.html",
    "Ciencias Tecnológicas": "ciencias-tecnologicas.html",
    "Estudios Mediales": "estudios-mediales.html",
    "Humanidades": "humanidades.html",
    "Salud y Bienestar": "salud-bienestar.html"
};

document.getElementById('submitButton').addEventListener('click', function () {
    const campos = [
        document.getElementById('campoocupacional1').value,
        document.getElementById('campoocupacional2').value,
        document.getElementById('campoocupacional3').value
    ];

    if (campos.includes("")) {
        alert("Por favor, selecciona una opción en cada uno de los 3 campos.");
        return;
    }

    // Contar cuántas veces se seleccionó cada campo
    const conteo = {};
    campos.forEach(campo => {
        conteo[campo] = (conteo[campo] || 0) + 1;
    });

    const camposUnicos = Object.keys(conteo);
    let instruccionGeneral = '';

    switch (camposUnicos.length) {
        case 1:
            instruccionGeneral = 'Tus intereses se concentran en un solo campo: </strong>Elige 3 carreras</strong> dentro de él.';
            break;
        case 2:
            instruccionGeneral = 'Tienes un campo predominante: <strong>Elige 2 carreras</strong> del campo repetido y <strong>1 carrera</strong> en la otra.';
            break;
        case 3:
            instruccionGeneral = 'Tus intereses son diversos: <strong>Elige 1 carrera por cada campo</strong>.';
            break;
    }

    // Generar enlaces directos a las páginas HTML de cada campo seleccionado
    let htmlBotones = '<div class="cards-campos">';
    camposUnicos.forEach(campo => {
        const repeticiones = conteo[campo];
        const archivo = paginasCampos[campo];
        let cuantas = '1 carrera';
        if (camposUnicos.length === 1) cuantas = '3 carreras';
        else if (camposUnicos.length === 2) cuantas = repeticiones === 2 ? '2 carreras' : '1 carrera';
        else if (camposUnicos.length === 3) cuantas = '1 carrera';

        htmlBotones += `
            <div class="campo-item">
                <div class="campo-info">
                    <strong>${campo}</strong>
                    <span>Debes elegir: <strong>${cuantas}</strong></span>
                </div>
                <button type="button" class="btn-campo" onclick="window.open('${archivo}', '_blank')">Ver carreras disponibles →</button>
            </div>
        `;
    });
    htmlBotones += '</div>';

    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `
        <div class="instruccion-box">
            <p>${instruccionGeneral}</p>
        </div>
        ${htmlBotones}
        <button type="button" class="btn-more-info" onclick="window.open('info.html', '_blank')">Ver listado general de áreas UC</button>
    `;
    resultElement.style.display = 'block';
});