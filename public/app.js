let colecciones = {
    docentes: { profesor: 'string', alias: 'string', email: 'string', departamento: 'string' },
    ausencias: { fecha: 'string', hora: 'number', nombre: 'string', curso: 'string' }
};



let index = `
    <style>
        #div {
            text-align: justify
        }

        img { 
            display: block;
            margin-left: auto;
            margin-right: auto;
        }

        .footer {
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            background: linear-gradient(to bottom, #ffffff 0%, #3399ff 100%);
            color: black;
            font-weight: bold;
            text-align: center;
        }
    </style>

    <div id="div" style="margin: 10px 30px 30px; color: black; font-weight: normal">
        <img src="https://pbs.twimg.com/profile_images/3658661792/5c71b7b6ab15cbd10bb8f3fb0afd20fd_400x400.jpeg" 
        alt="logo" width="100" height="100"/>

        <img width="300" height="80" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5f361c20-87a0-47f4-9217-383117f5371c/d6j6xa9-1a77fd5f-5311-4992-a4cc-bf52c2a65a0d.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzVmMzYxYzIwLTg3YTAtNDdmNC05MjE3LTM4MzExN2Y1MzcxY1wvZDZqNnhhOS0xYTc3ZmQ1Zi01MzExLTQ5OTItYTRjYy1iZjUyYzJhNjVhMGQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.TMUl6Rx5XwrQMZq0Hm9A4qNV8d6shXC-cS6oAFMnMHk" >
        <br><small>AQUI VA ER LOGIN ABE</small><br><br>
        <p>(Recomendado instalar si se usa desde Chrome)</p>
    </div>
    
    <div class="footer">
        <p>Copyright &copy; JAMP</p><small>IES Luis V&eacute;lez, &Eacute;cija</small>
    </div>`;


function desactivarMenus () {
    document.getElementById('nav-app').style.display = 'none';
//    document.getElementById('nav-login').style.display = 'none';
}


window.addEventListener('load', function () {

    let hoy = new Date();
    // Fecha formateada. getMonth() devuelve un valor entre 0 y 11.
    let hoyYYYYMMDD = hoy.getFullYear() + ('0' + (hoy.getMonth()+1)).slice(-2) + ('0' + hoy.getDate()).slice(-2)
    

    let login = `
    <div>
Nombre: <input type="text" name="nombre" id="loginNombre">
Clave: <input type="text" name="clave" id="loginClave">
<button class="insertar" title="Login" 
onclick="
fetch('/api/docentes/'
  + document.getElementById('loginNombre').value + '/'
  + document.getElementById('loginClave').value , { method: 'GET' })
.then(res => res.json())
.then(data => { 
    if (JSON.stringify(data) != 'null') {
        document.getElementById('nav-app').style.display = 'block';
        document.getElementById('nav-login').style.display = 'none';
        document.getElementById('login').style.display = 'none';
        document.getElementById('inicio').style.display = 'block';
        document.getElementById('inicio').innerHTML= '<h1>AUSENCIAS DE HOY</h1><br/>';
        verAusencias(hoyYYYYMMDD); 
    }
    else {
        console.log('ko');
    }   
})
">Login</button>
</div>
`;



    desactivarMenus(); 

    let l = document.getElementById('login');
    let i = document.getElementById('inicio');
    let a = document.getElementById('docentes');
    let c = document.getElementById('ausencias');
    let h = document.getElementById('acerca');

    h.innerHTML = index;

    l.style.display = 'block';
    document.getElementById('nav-login').innerHTML = login;
    l.innerHTML = "<h1>AUSENCIAS DE HOY</h1><br/>";
    verAusencias(hoyYYYYMMDD);


    document.getElementById('menu-inicio').addEventListener('click', function (e) {
        i.style.display = 'block';
        i.innerHTML =  "<h1>AUSENCIAS DE HOY</h1><br/>";
        verAusencias(hoyYYYYMMDD); 
        a.style.display = 'none'; a.innerHTML = '';
        c.style.display = 'none'; c.innerHTML = '';
    });

    document.getElementById('menu-docentes').addEventListener('click', function (e) {
        verDocumentos('docentes');
        a.style.display = 'block';
        i.style.display = 'none';
        c.style.display = 'none'; c.innerHTML = '';
        h.style.display = 'none';
    });

    document.getElementById('menu-ausencias').addEventListener('click', function (e) {
        verDocumentos('ausencias');
        c.style.display = 'block';
        i.style.display = 'none';
        a.style.display = 'none'; a.innerHTML = '';
        h.style.display = 'none';
    });

    document.getElementById('menu-acerca').addEventListener('click', function (e) {
        verDocumentos('ausencias');
        h.style.display = 'block';
        i.style.display = 'none';
        c.style.display = 'none';
        a.style.display = 'none'; a.innerHTML = '';
    });

});

/*--------------------
 OPERACIONES CRUD 
--------------------*/

function verAusencias(fecha) {
    fetch(`/api/ausencias/${fecha}`,
        {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
          // Estas 2 líneas se eliminarán en un futuro
          document.getElementById('login').innerHTML += JSON.stringify(data); 
          document.getElementById('inicio').innerHTML += JSON.stringify(data); 
        
          document.getElementById('login').innerHTML += mostrarAusencias(data);
          document.getElementById('login').innerHTML += mostrarAusencias(data);
        })
}


function verDocumentos(coleccion) {
    fetch(`/api/${coleccion}`,
        {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            document.getElementById(`${coleccion}`).innerHTML
                = json2table(coleccion, data, "table-responsive-full sort-table")
        })
}

function insertar(coleccion, objeto) {
    if (Object.values(objeto).every(x => (x !== null && x !== ''))) {

        fetch(`/api/${coleccion}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(objeto)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                OK.style.display = 'block';
                setTimeout(() => OK.style.display = 'none', 1500);
                verDocumentos(`${coleccion}`);
            })
            .catch(err => {
                KO.style.display = 'block';
                setTimeout(() => KO.style.display = 'none', 1500);
            });
    }
}

function modificar(coleccion, id, objeto) {
    // let objeto = { nombre: campo1, precio: campo2 };

    fetch(`/api/${coleccion}/${id}`,
        {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(objeto)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            OK.style.display = 'block';
            setTimeout(() => OK.style.display = 'none', 1500);
            verDocumentos(`${coleccion}`);
        })
        .catch(err => {
            KO.style.display = 'block';
            setTimeout(() => KO.style.display = 'none', 1500);
        });
}

function eliminar(coleccion, id) {
    // if (confirm("El documento para " + documento.nombre + " va a ser eliminado. ¿Está seguro?")) {
    fetch(`/api/${coleccion}/${id}`,
        {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            OK.style.display = 'block';
            setTimeout(() => OK.style.display = 'none', 1500);
        })
        .catch(err => {
            KO.style.display = 'block';
            setTimeout(() => KO.style.display = 'none', 1500);
        });
    // }
}

/*--------------------
 FUNCIONES AUXILIARES 
--------------------*/

function entradaOK() {
    return true;
}

// Función para CONVERTIR AUSENCIAS JSON A HTML
function mostrarAusencias( jsonData ) {
 
    // José Antonio, esta función debes desarrollarla tú.
    // Es una simple tabla sin botones de insertar, modificar ni eliminar. 
    //
    // Tampoco debe tener ningún tipo de input.
    //
    // Debe devolver un string con texto HTML
}

// Función para CONVERTIR JSON A TABLA HTML
function json2table(collection, jsonData, classes) {

    classes = classes || '';

    let colNames = Object.keys(colecciones[collection]);

    /*let botonesOrdenar = (campo) => `
<div class="sort-table-arrows">
    <button class="button" title="ascendente" onclick="
        sort(true, '${collection}-${campo}', 'content-table')">
    <span>🔼</span>
    </button>
    <button class="button" title="descendente" onclick="
        sort(false, '${collection}-${campo}', 'content-table')">
    <span>🔽</span>
    </button>
</div>`;*/

    let botonInsertar = `
<button class="insertar" title="Insertar" onclick="
    insertar('${collection}',  { 
        ${colNames[0]}: document.getElementById('${collection}.${colNames[0]}').value,
        ${colNames[1]}: document.getElementById('${collection}.${colNames[1]}').value,
        ${colNames[2]}: document.getElementById('${collection}.${colNames[2]}').value,
        ${colNames[3]}: document.getElementById('${collection}.${colNames[3]}').value
    }) ">
<span>✏️</span>
</button>
`;

    let botonModificar = (fila) => `
<button class="modificar" title="Modificar" onclick="
    modificar ('${collection}', '${fila._id}', {
        ${colNames[0]}: document.getElementById('${fila._id}.${colNames[0]}').value,
        ${colNames[1]}: document.getElementById('${fila._id}.${colNames[1]}').value,
        ${colNames[2]}: document.getElementById('${fila._id}.${colNames[2]}').value,
        ${colNames[3]}: document.getElementById('${fila._id}.${colNames[3]}').value
        
    }) ">
<span>🔄</span>
</button>
`;

    let botonEliminar = (fila) => `
<button class="eliminar" title="Eliminar" onclick="
    eliminar('${collection}', '${fila._id}'); 
    document.getElementById('${fila._id}').remove()">
<span>🗑️</span>
</button>
`;

    // función para hacer que la primera letra del campo sea mayúscula y las demas minúsculas
    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    let celdaInsertar = `
<td data-label="operacion" class="operacion">${botonInsertar}</td>`;

    let celdaModificarEliminar = (row) => `
<td data-label="operacion" class="operacion">${botonModificar(row)} ${botonEliminar(row)}</td>`;

    let celdaSinDatos = (campo) => `
<td data-label="${collection}-${campo}" class="${collection}-${campo}">
<span style="color:black; font-weight:bold; font-size:1em;">${campo.toUpperCase()} </span>
<input id="${collection}.${campo}" 
    ${colecciones[collection][campo] == 'number'
            ? `type="number" min="1" max="6" placeholder=${campo} `
            : `type="text" placeholder=${campo}`}  >
</td>`;

    let celdaConDatos = (documento, campo) => `
<td data-label="${collection}-${campo}" class="${collection}-${campo}">
<span style="color:black; font-weight:bold; font-size:1em;">${campo.capitalize()} </span>
<input id="${documento._id}.${campo}" 
    ${colecciones[collection][campo] == 'number'
            ? 'type="number" min="1" max="6"'
            : 'type="text" '}  
    value="${colecciones[collection][campo] == 'number'
            ? documento[campo]
            : documento[campo]}" 
    >
</td>`;

    let table = `
<table id="content-table" class="${classes}">
<thead>
    <tr> 
    ${colNames.map(colName => `<th class="${collection}-${colName}"> ${colName} </th>`).join(' ')}
    <th class="operacion">Operación</th> 
    </tr>
</thead>
<tbody>
    <tr>
    ${colNames.map(colName => celdaSinDatos(colName)).join(' ')} ${celdaInsertar}
    </tr> 
    ${jsonData.map(row =>
        `<tr id="${row._id}">${colNames.map(colName => celdaConDatos(row, colName)).join(' ')} ${celdaModificarEliminar(row)}
         </tr>`
    ).join(' ')}
</tbody>
</table>`;

    // console.log(table);  // Para depuración

    return table;
}

// Función para ORDENAR POR COLUMNAS (https://codepen.io/mlegakis/pen/jBYPGr)
function sort(ascending, columnClassName, tableId) {
    let tbody = document.getElementById(tableId).getElementsByTagName("tbody")[0];
    let rows = tbody.getElementsByTagName("tr");
    let unsorted = true;
    while (unsorted) {
        unsorted = false
        for (let r = 0; r < rows.length - 1; r++) {
            let row = rows[r];
            let nextRow = rows[r + 1];
            let value = row.getElementsByClassName(columnClassName)[0].childNodes[1].value;
            let nextValue = nextRow.getElementsByClassName(columnClassName)[0].childNodes[1].value;
            value = value.replace(',', ' '); // in case a comma is used in float number
            nextValue = nextValue.replace(',', '');
            if (!isNaN(value)) {
                value = parseFloat(value);
                nextValue = parseFloat(nextValue);
            }
            if (ascending ? value > nextValue : value < nextValue) {
                tbody.insertBefore(nextRow, row);
                unsorted = true;
            }
        }
    }
};
