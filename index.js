//////////////////////////////
/////////// VARIABLES
//////////////////////////////

const input_costillas = document.getElementById("cantidad_costillas");
const input_patatas = document.getElementById("cantidad_patatas");
const input_vino_tinto = document.getElementById("cantidad_vino_tinto");
const input_postre = document.getElementById("cantidad_postre");


const boton_mas_costillas = document.getElementById("btn_mas_costillas");
const boton_mas_patatas = document.getElementById("btn_mas_patatas");
const boton_mas_vino_tinto = document.getElementById("btn_mas_vinotinto");
const boton_mas_postre = document.getElementById("btn_mas_postre");

const boton_menos_costillas = document.getElementById("btn_menos_costillas");
const boton_menos_patatas = document.getElementById("btn_menos_patatas");
const boton_menos_vino_tinto = document.getElementById("btn_menos_vinotinto");
const boton_menos_postre = document.getElementById("btn_menos_postre");

const span_costillas = document.getElementById("subtotal-precio-costillas");
const span_patatas = document.getElementById("subtotal-precio-patatas");
const span_vino_tinto = document.getElementById("subtotal-precio-vinotinto");
const span_postre = document.getElementById("subtotal-precio-postre");

const btn_cerrar_ventana = document.getElementById("btn_cerrar_ventana");
const btn_pedir_comanda = document.getElementById("btn_pedir_comanda");


const span_total = document.getElementById("total");

//los codigo que tien cada plato
const codigos_platos =
{
    costillas: "costillas",
    patatas: "patatas",
    vinotinto: "vinotinto",
    postre: "postre"
};


//varibale donde se muestras las posibles operaciones globales
//el valor tiene que conincidir con el id del html
//btn_MENOS_costillas
//btn_MAS_costillas
let operacion_menu = {
    mas: "mas",
    menos: "menos"
};



//resultado total donde iremos almacenando el precio total
let resultado_total = 0;

//menu principal
const calcular_plato_pedido = (elemento) =>
{

    //obtenemos el id que obtenemso al hacer click sobre el boton
    //el id lo parseamos btn_menos_costillas y obtenemos la operacion que debemos realizar si es menos/mas
    //y la cantidad que tenemos anteriormente
    //el objeto opciones contiene la operacion que demeos realizar
    const [codigo_elemento, opciones] = obtener_id(elemento.currentTarget);

    //segun el codigo que obtengamos
    switch(codigo_elemento)
    {
        case codigos_platos.costillas:
            calcular_datos(input_costillas, CARTA[0].precio, span_costillas, opciones);
        break;
        case codigos_platos.patatas: 
            calcular_datos(input_patatas, CARTA[1].precio, span_patatas, opciones);
        break;
        case codigos_platos.vinotinto: 
            calcular_datos(input_vino_tinto, CARTA[2].precio, span_vino_tinto, opciones);
        break;
        case codigos_platos.postre: 
            calcular_datos(input_postre, CARTA[3].precio, span_postre, opciones);
        break;
        default:
            console.log("error" + codigo_elemento);
        break;
    }

    //calculamos el total
    calcular_suma_total();

};

//llamada desde calcular_plato_pedido
//realiza una serie de funciones
//1) obtiene el valor del input
//2) realiza la comprobamcion de la operacion(suma o resta) que debe realizar.
//    ademas comrpueba que no obtenga numeros mayores al maximo ni menores a 0
const calcular_datos = (input, precio, precio_subtotal_elemento, opciones_operaciones) =>
{
    //1
    cantidad_platos = obtener_valor_input(input);
    //2
    cantidad_platos = chequear_cantidad_platos(cantidad_platos, opciones_operaciones);
    input.value = cantidad_platos;

    //renderizamos la operacion en el html
    const precio_subtotal = cantidad_platos * precio;
    precio_subtotal_elemento.textContent = precio_subtotal + " €";

};


//funcion que obtenos el valor del input y lo transformarmos en numero
const obtener_valor_input = (elemento_actual) => 
{
    let valor = elemento_actual.value;
    valor = valor - 0; // conversion a numero
    
    return valor

};

//funcion donde obtiene el id al objeto que hemos hecho click
const obtener_id = (objeto) =>
{

    //split del id "btn_menos_costillas"
    //menos seria la opcion
    //costillas el valor
    let splitted_id = objeto.id.split("_");

    let opciones = {};

    //comprobamos que no se salga de los valores ya predefinidos
    switch (splitted_id[1])
    {
        case operacion_menu.mas:
            opciones["operacion"] = operacion_menu.mas;
        break;

        case operacion_menu.menos: 
            opciones["operacion"] = operacion_menu.menos;
        break;
        default:
            console.log("eeror en la conversion");
            // opciones["operacion"] = operacion_menu.mas;
        break;
    }

    let valor = splitted_id[2];
    if (valor === undefined)
    {
        return "0";
    }

    return [valor, opciones ];

};

const chequear_cantidad_platos = (cantidad_chequear, opciones) =>
{

    switch (opciones.operacion)
    {
        case operacion_menu.mas: cantidad_chequear++; break;
        case operacion_menu.menos: cantidad_chequear--; break;
        default: 
            console.log("error" + cantidad_chequear);
        break;

    }

    if (cantidad_chequear <= 0)
    {
        cantidad_chequear = 0;
    }

    if (cantidad_chequear == Number.MAX_VALUE)
    {
        cantidad_chequear = Number.MAX_VALUE;
    }

    return cantidad_chequear;

};

const calcular_suma_total = () =>
{
    //cogemos el valor de "12 €" y lo convertimos en numero
    const suma_costillas = span_costillas.textContent.split(" ")[0] - 0;
    const suma_patatas = span_patatas.textContent.split(" ")[0] - 0;
    const suma_vinotinto = span_vino_tinto.textContent.split(" ")[0] - 0;
    const suma_postre = span_postre.textContent.split(" ")[0] - 0;

    //mostramos en el span la suma de todos los demas
    resultado_total = suma_costillas + suma_patatas + suma_vinotinto + suma_postre;
    span_total.innerHTML = "SUBTOTAL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + resultado_total + " €";

};


//////////////////////////////////
//EVENTOS CLICK
///////////////////////////////////



boton_mas_costillas.addEventListener("click", calcular_plato_pedido);
boton_mas_patatas.addEventListener("click", calcular_plato_pedido);
boton_mas_vino_tinto.addEventListener("click", calcular_plato_pedido);
boton_mas_postre.addEventListener("click", calcular_plato_pedido);

boton_menos_costillas.addEventListener("click", calcular_plato_pedido);
boton_menos_patatas.addEventListener("click", calcular_plato_pedido);
boton_menos_vino_tinto.addEventListener("click", calcular_plato_pedido);
boton_menos_postre.addEventListener("click", calcular_plato_pedido);


btn_cerrar_ventana.addEventListener("click", () => {
    const menu = document.getElementById("menu_emergente");

    if (menu.classList[1] === "visible") {
        menu.classList.remove("visible");
        menu.classList.add("invisible");

    }


});


//boton donde ocultamos y pedimos 
btn_pedir_comanda.addEventListener("click", () => {

    const menu = document.getElementById("menu_emergente");

    //cambiamos la clase de visible por la de invisible
    if (menu.classList[1] === "visible") {
        menu.classList.remove("visible");
        menu.classList.add("invisible");

    }


});

//evento sobre btn_pedir_platos, enseña el primer menu
document.getElementById("btn_pedir_platos").addEventListener("click", () => {

    const menu = document.getElementById("menu_emergente");
    if (menu.classList[1] === "invisible") {
        menu.classList.remove("invisible");
        menu.classList.add("visible");

    }

});


