"use strict";//esta directiva es de ámbito global al documento
const ERROR = "ERROR";
const PUNTO = '.'
const VACIO = " "
class CalculadoraBasica {

    constructor() {
        this.pantalla = VACIO;
        this.memoria = Number(0);
        this.operando1 = null;
        this.operando2 = null;
        this.operacion = VACIO;
        this.resultado = Number(0);


    }

    actualizarPantalla() {


        document.querySelector('input[type="text"]').value = this.pantalla;
    }

    digitos(value) {

        this.pantalla += value;
        this.actualizarPantalla();
    }
    decimales() {
        this.quitarSimboloDecimales(PUNTO);

        if (!this.pantalla.includes(".")) {
            this.pantalla += ".";
            this.actualizarPantalla();
        }

    }
    /*En caso de que tras introducir una punto se presione el simbolo de una operación, se borrará automáticamente*/
    quitarSimboloDecimales(simbolo) {
        if (this.pantalla.length > 0) {
            if (this.pantalla.charAt(-1) === simbolo) {
                this.borrarUltimoDigito();
            }
        }

    }

    suma() {
        this.quitarSimboloDecimales(PUNTO);
        this.asignarOperandos();
        this.ejecutarOperaciónBasica();
        this.operacion = '+';

    }
    resta() {
        this.quitarSimboloDecimales(PUNTO);
        this.asignarOperandos();
        this.ejecutarOperaciónBasica();
        this.operacion = '-';

    }
    multiplicacion() {
        this.quitarSimboloDecimales(PUNTO);
        this.asignarOperandos();
        this.ejecutarOperaciónBasica();
        this.operacion = '*';

    }
    division() {
        this.quitarSimboloDecimales(PUNTO);
        this.asignarOperandos();
        this.ejecutarOperaciónBasica();
        this.operacion = '/';

    }
    recuperarMemoria() {
        this.quitarSimboloDecimales(PUNTO);
        this.pantalla = this.memoria;
        this.actualizarPantalla();
        this.operando1 = null;
        this.operando2 = null;
    }
    restarMemoria() {
        this.quitarSimboloDecimales(PUNTO);
        this.operando1 = Number(this.pantalla)
        this.operando2 = Number(this.memoria)
        this.operacion = "-";
        this.ejecutarOperaciónBasica();
        this.pantalla = VACIO;

    }
    sumarMemoria() {
        this.quitarSimboloDecimales(PUNTO);
        this.operando1 = Number(this.pantalla)
        this.operando2 = Number(this.memoria)
        this.operacion = "+";
        this.ejecutarOperaciónBasica();
        this.pantalla = VACIO;

    }

    reiniciar() {

        this.pantalla = VACIO;
        this.actualizarPantalla();
    }
    borrarError() {
        if (this.pantalla === ERROR) {
            this.pantalla = VACIO;

        } else {
            this.borrarUltimoDigito();
        }

    }
    borrarUltimoDigito() {
        this.pantalla = this.pantalla.slice(0, -1)
        this.actualizarPantalla();
    }
    igual() {
        this.quitarSimboloDecimales(PUNTO);
        this.actualizarPantalla();
        this.asignarOperandos();
        this.ejecutarOperaciónBasica();
        this.operando1 = null;
        this.operando2 = null;
    }
    porcentaje() {
        this.quitarSimboloDecimales(PUNTO);
        this.asignarOperandoUnarias();
        this.operando2 = Number(this.pantalla);
        this.operacion = "%"
        this.resultado = this.operando1 * Number(eval(this.operando2 + "/" + Number(100)))
        this.procesarResultado();
        this.actualizarPantalla();
        this.pantalla = VACIO;

    }
    raizCuadrada() {
        this.quitarSimboloDecimales(PUNTO);
        this.asignarOperandoUnarias();
        this.operacion = 'sqrt'
        this.resultado = Math.sqrt(this.operando1);//devuelve un number
        this.procesarResultado();
        this.actualizarPantalla();
        this.pantalla = VACIO;

    }

    cambioSigno() {
        this.quitarSimboloDecimales(PUNTO);
        this.asignarOperandoUnarias();
        this.operando2 = Number(-1);
        this.operacion = "*";
        this.ejecutarOperaciónBasica();
    }
    asignarOperandoUnarias() {
        //Si la pantalla está vacía no asigno operandos, ya que Number( ) devuelve 0, produciendo resultados erróneos en operaciones como la multiplicación                                                             
        if (this.pantalla !== VACIO) {
            this.operando1 = Number(this.pantalla);
        } else {
            this.operando1 = this.memoria;
        }
    }
    asignarOperandos() {

        if (this.pantalla != VACIO) {
            //Si la pantalla está vacía no asigno operandos, ya que Number( ) devuelve 0, produciendo resultados erróneos en operaciones como la multiplicación 
            if (this.operando1 !== null && this.operando2 === null) {

                this.operando2 = Number(this.pantalla);
            } else {

                this.operando1 = Number(this.pantalla);
            }
        }

    }
    /**
     * Método que ejecuta los calculos de las operaciones básicas: Suma, resta , multiplicación y división.
    * Estas presentan una estructura similar:
    *   -En caso de que el segundo operando sea null , se le asigna un elemento neutro.
    *   -Una vez estemos seguros de que ningún operando es null, se realiza la operación llamando a eval en #operaciónSimple, y se guarda
    *   el resultado de la misma en memoria y en el operando 1. En caso de ser errónea se muestra el mensaje "error"
    *   -Una vez hemos hecho el cálculo, establecemos como null el segundo operando.ç
    *   -Actualizamos la pantalla y nos preparamos para las siguientes operaciones. (vaciando el elemento pantalla internamente)
    */
    ejecutarOperaciónBasica() {

        switch (this.operacion) {
            case "*":
                this.operandoNeutro(Number(1))
                this.operacionSimple();
                this.operando2 = null;
                break;
            case "+":
                this.operandoNeutro(Number(0))
                this.operacionSimple();
                this.operando2 = null;
                break;
            case "/":
                this.operandoNeutro(Number(1))
                this.operacionSimple();
                this.operando2 = null;
                break;
            case "-":
                this.operandoNeutro(Number(0))
                this.operacionSimple();
                this.operando2 = null;
                break;

        }
        this.actualizarPantalla();
        this.pantalla = VACIO;

    }
    /**
     * En caso de que el segundo operando sea null a la hora de llamar a ejecutar cálculos, 
     * se le asigna un número que no modifique el actual operando1.
     * En caso de sumas y restas, será 0.
     * En caso de multiplicaciones y divisiones , 1.
     * @param {*} neutro 
     */
    operandoNeutro(neutro) {
        if (this.operando2 === null) {
            this.operando2 = neutro;
        }
    }

    /**
     * Este método hace uso de "Eval" para obtener el resultado de las operaciones simples( x , / , + , -)
     * Se realiza mediante este manejo de las posibles excepciones producidas durante el proceso de evaluación de la 
     * expresión que representa la operación.
     */
    operacionSimple() {

        try {
            this.resultado = eval(this.operando1 + this.operacion + this.operando2);
            this.procesarResultado();
        }
        catch (err) {
            //En caso de que eval de lugar a una excepción, se mostrará el mensaje de error.
            console.log(err)
            this.pantalla = ERROR;
        }

    }
    /*
     * Este método recibe el resultado de una operación y lo guarda en memoria y en el operando1. 
     * En caso de que la expresión evalue a NaN , memoria y operando 1 no serán modificados, 
     * y el mensaje "ERROR" se mostrará en la pantalla.   
     */
    procesarResultado() {
        if (!isNaN(this.resultado)) {
            this.memoria = this.resultado;//devuelve un number
            this.operando1=this.memoria;
            this.pantalla = this.memoria;
        } else {
            this.pantalla = ERROR;
        }

    }

}
const COMA = ','
class CalculadoraCientifica extends CalculadoraBasica {
    constructor() {
        super()
        this.shiftIsPressed = false;
        this.fixedExponent = false;
        this.hyp = false;
        this.deg = false;
    }
    /**
     * En memoria empleo 0 , ya que es el elemento neutro de las operaciones que sealizan con ella por defecto.
     */
    borrarMemoria() {
        this.memoria = Number(0)
        this.#shiftBotonesMemoria();

    }
    hiperbolica() {
        this.hyp = !this.hyp;
    }
    fe() {
        this.fixedExponent = !this.fixedExponent;
    }
    grados() {
        this.deg = !this.deg;
        var currentValue;
        this.deg ? currentValue = "RAD" : currentValue = "DEG";
        document.querySelector("input[name='deg']").value = currentValue;
    }
    /*
     * Este método recibe el resultado de una operación y lo guarda en memoria y en el operando1. 
     * En caso de que la expresión evalue a NaN , memoria y operando 1 no serán modificados, 
     * y el mensaje "ERROR" se mostrará en la pantalla.   
     *
     */
    procesarResultado() {//override de la básica
        if (!isNaN(this.resultado)) {
            console.log("operadion"+this.operacion+"resultado="+this.resultado)
            this.memoria = this.resultado;//devuelve un number
            this.operando1=this.memoria;
            if (this.fixedExponent) {

                this.#mostrarResultadoFe();

            } else {
                this.pantalla = this.memoria;
            }

            this.#shiftBotonesMemoria()


        } else {
            this.pantalla = ERROR;
        }

    }
    /**
     * Al activar el "fixed exponent", no se cambia como se guardan los resultados en la memoria 
     * pero si se cambia la forma de mostrarlos al ser procesados.
     * 
     * Para ello realizo un match:
     *  x.e: 89092012000000000
     *  -Este toma los valores previos a la secuencia de ceros, en este caso
     *      nonzero=89092012
     *  -Una vez lo tiene, resta esta cantidad de números a la cantidad de digitos totales.
     *  -Esta diferencia es equivalente al exponente, en este caso ,9
     *          89092012000000000=89092012e+9=89092012*10^9
     */
    #mostrarResultadoFe() {

        var copiaMemoria = String(this.memoria)
        var nonZero = copiaMemoria.match(/[0-9]*[1-9]/g)[0]
        var exp = copiaMemoria.length - nonZero.length;
        this.pantalla = nonZero + "e^" + exp;
    }
    #shiftBotonesMemoria() {
        var estado = (this.memoria === Number(0))

        document.querySelector('input[name="mr"]').disabled = estado;
        document.querySelector('input[name="mc"]').disabled = estado;


    }
    almacenarEnMemoria() {
        this.memoria = Number(this.pantalla)
        this.#shiftBotonesMemoria();
    }
    mostrarPi() {

        this.ejecutarOperaciónBasica();
        this.pantalla = Math.PI;
        this.actualizarPantalla();

    }
    //override de la básica
    ejecutarOperaciónBasica() {
        super.ejecutarOperaciónBasica();
        if (this.operacion === '%') {
            this.operandoNeutro(Number(0))
            this.operacionSimple();
            this.operando2 = null;
            this.actualizarPantalla();
            this.pantalla = VACIO;
        }


    }

    modulo() {
        this.quitarSimboloDecimales(PUNTO);
        this.asignarOperandos();
        this.ejecutarOperaciónBasica();
        this.operacion = '%';

    }

    factorial() {

        this.quitarSimboloDecimales(COMA);
        this.ejecutarOperaciónBasica();
        this.asignarOperandoUnarias();
        this.#fact();

        this.procesarResultado();

    }
    #fact() {
        this.resultado = Number(1);
        var operando = Number(1);
        while (operando <= this.operando1) {
            this.resultado *= Number(operando)
            operando++;
        }

    }
    seno() {
        this.quitarSimboloDecimales(COMA);
        this.ejecutarOperaciónBasica();
        this.asignarOperandoUnarias();
        if (this.hyp) {
            this.shiftIsPressed ? this.resultado = Math.asinh(this.operando1) : this.resultado = Math.sinh(this.operando1);
        }
        this.shiftIsPressed ? this.resultado = Math.asin(this.operando1) : this.resultado = Math.sin(this.operando1);
        if (this.deg) {
            this.resultado = this.resultado * Number(180) / Number(4)
        }
        this.procesarResultado();

    }
    //override de la básica
    decimales() {
        this.pantalla += ",";
        this.actualizarPantalla();
    }
    cuadrado() {

        this.quitarSimboloDecimales(COMA);
        this.asignarOperandoUnarias();
        this.operando2 = Number(2)
        this.resultado = Math.pow(this.operando1, this.operando2);
        this.procesarResultado();
    }
    potenciaDeXBase10() {

        this.quitarSimboloDecimales(COMA);
        this.asignarOperandoUnarias();
        this.operando2 = Number(10)
        this.resultado = Math.pow(this.operando2, this.operando1);
        this.procesarResultado();
    }
    potenciaDeXBaseY() {

        this.quitarSimboloDecimales(COMA);
        this.ejecutarOperaciónBasica();
        this.asignarOperandoUnarias();
        this.resultado = Math.pow(this.operando1, this.operando2);
        this.procesarResultado();
    }
    coseno() {
        this.quitarSimboloDecimales(COMA);
        this.ejecutarOperaciónBasica();
        this.asignarOperandoUnarias();
        if (this.hyp) {
            this.shiftIsPressed ? this.resultado = Math.acosh(this.operando1) : this.resultado = Math.cosh(this.operando1);

        } else {
            this.shiftIsPressed ? this.resultado = Math.acos(this.operando1) : this.resultado = Math.cos(this.operando1);
        }
        if (this.deg) {
            this.resultado = this.resultado * Number(180) / Number(4)
        }
        this.procesarResultado();
    }
    tangente() {
        this.quitarSimboloDecimales(COMA);
        this.ejecutarOperaciónBasica();
        this.asignarOperandoUnarias();
        if (this.hyp) {
            this.shiftIsPressed ? this.resultado = Math.atanh(this.operando1) : this.resultado = Math.tanh(this.operando1);
        } else {
            this.shiftIsPressed ? this.resultado = Math.atan(this.operando1) : this.resultado = Math.tan(this.operando1);
        }
        if (this.deg) {
            this.resultado = this.resultado * Number(180) / Number(4)
        }
        this.procesarResultado();
    }
    log() {
        this.quitarSimboloDecimales(COMA);
        this.ejecutarOperaciónBasica();
        super.asignarOperandoUnarias();
        this.resultado = Math.log(this.operando1);
        this.procesarResultado();
    }
    shift() {
        //En caso de que shift no esté presionado y se presione (!(false)&true=true)
        //En caso de que shift  esté presionado y se presione de nuevo(!(true)&true=false)
        this.shiftIsPressed = !(this.shiftIsPressed) & true;
        if (this.shiftIsPressed) {
            document.querySelector('input[name="sin"]').value = "arcsin";
            document.querySelector('input[name="cos"]').value = "arcos";
            document.querySelector('input[name="tan"]').value = "arctan";
        } else {
            document.querySelector('input[name="sin"]').value = "sin";
            document.querySelector('input[name="cos"]').value = "cos";
            document.querySelector('input[name="tan"]').value = "tan";
        }


    }

}

var calculadoraCientifica = new CalculadoraCientifica();
document.addEventListener('keydown', (event) => {
    calculadoraCientifica.procesarTeclas(event);
});