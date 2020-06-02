window.addEventListener("load", () => {
    var num1;
    var num2;
    var operador;
    var resultado;
    var tela = document.querySelector("#tela");
    var botoes = document.querySelectorAll("button[id*=botao-]");
    var operadores = document.querySelectorAll("button[id*=oper-]");

    alert("Podes usar as teclas do teclado para digitar números e operadores\nPressione C para limpar a tela e DELETE ou na tela para eliminar um dígito de cada vez\n");

    botoes.forEach(botao => {
        botao.addEventListener("click", botaoPress);
    });

    operadores.forEach(botao => {
        botao.addEventListener("click", operadorPress);
    });

    tela.addEventListener("mousedown", () => {
        actualizarTela("del");
        debug(false);
    });

    window.addEventListener("keydown", teclaPress);

    function imprimir(valor) {
        tela.innerHTML = valor;
    }

    function arrendodar(valor, casas = 8) {
        let pot = Math.pow(10, casas);
        let res = Math.round(valor * pot) / pot;
        if (res.toFixed().length > 1 && res.toString().length > 10) {
            return arrendodar(res, 9 - parseInt(res.toFixed().length));
        }
        return res;
    }

    function animar(btn) {
        btn.focus();
        setTimeout(() => {
            btn.blur();
        }, 100);
    }

    function botaoPress(e) {
        animar(e.target);

        let valor =
            Number.parseInt(e.target.value) != NaN
                ? e.target.value
                : Number.parseInt(e.target.value);
        actualizarTela(valor);
        debug(false);
    }

    function teclaPress(e) {
        let tecla = e.key;
        let op;
        switch (tecla) {
            case "0":
                animar(document.querySelector("#botao-0"));
                actualizarTela(0);
                break;
            case "1":
                animar(document.querySelector("#botao-1"));
                actualizarTela(1);
                break;
            case "2":
                animar(document.querySelector("#botao-2"));
                actualizarTela(2);
                break;
            case "3":
                animar(document.querySelector("#botao-3"));
                actualizarTela(3);
                break;
            case "4":
                animar(document.querySelector("#botao-4"));
                actualizarTela(4);
                break;
            case "5":
                animar(document.querySelector("#botao-5"));
                actualizarTela(5);
                break;
            case "6":
                animar(document.querySelector("#botao-6"));
                actualizarTela(6);
                break;
            case "7":
                animar(document.querySelector("#botao-7"));
                actualizarTela(7);
                break;
            case "8":
                animar(document.querySelector("#botao-8"));
                actualizarTela(8);
                break;
            case "9":
                animar(document.querySelector("#botao-9"));
                actualizarTela(9);
                break;
            case ".":
                animar(document.querySelector("#botao-ponto"));
                actualizarTela(".");
                break;
            case "c":
                animar(document.querySelector("#botao-ac"));
                actualizarTela("ac");
                break;
            case "%":
                animar(document.querySelector("#botao-perc"));
                actualizarTela("%");
                break;
            case "+":
                op = document.querySelector("#oper-mais");
                animar(op);
                operadorPress(e, op, op.value);
                break;
            case "-":
                op = document.querySelector("#oper-menos");
                animar(op);
                operadorPress(e, op, op.value);
                break;
            case "/":
                op = document.querySelector("#oper-div");
                animar(op);
                operadorPress(e, op, op.value);
                break;
            case "*":
                op = document.querySelector("#oper-mult");
                animar(op);
                operadorPress(e, op, op.value);
                break;
            case "=":
                op = document.querySelector("#oper-igual");
                animar(op);
                operadorPress(e, op, op.value);
                break;
            case "Enter":
                e.preventDefault();
                op = document.querySelector("#oper-igual");
                animar(op);
                operadorPress(e, op, op.value);
                break;
            case "Backspace":
                actualizarTela("del");
                break;
        }
        debug(false);
    }

    function contemPonto(valor) {
        if (valor.indexOf(".") > 0) {
            return true;
        }
        return false;
    }

    function operadorPress(e, btn, op) {
        animar(btn || e.target);
        let oper = op || e.target.value;

        if (typeof num1 == typeof num2) {
            num1 = resultado = calcular(
                parseFloat(num1),
                parseFloat(num2),
                operador
            );
            imprimir(parseFloat(resultado));
            num2 = undefined;
            operador = undefined;
        } else {
            limpar();
        }

        switch (oper) {
            case "+":
                operador = operador != "+" ? oper : operador;
                break;
            case "-":
                operador = operador != "-" ? oper : operador;
                break;
            case "x":
                operador = operador != "x" ? oper : operador;
                break;
            case "/":
                operador = operador != "/" ? oper : operador;
                break;
            case "=":
                if (typeof num1 == typeof num2) {
                    num1 = resultado = calcular(
                        parseFloat(num1),
                        parseFloat(num2),
                        operador
                    );
                    imprimir(parseFloat(resultado));
                    num2 = undefined;
                    operador = undefined;
                }
                break;
            default:
                break;
        }
        debug(false);
    }

    function actualizarTela(valor) {
        if (resultado) {
            limpar();
            resultado = undefined;
        }
        switch (valor) {
            case "ac":
                num1 = undefined;
                num2 = undefined;
                operador = undefined;
                limpar();
                animarTela();
                break;
            case "del":
                if (operador && typeof num2 == "number") {
                    imprimir(apagar(num2));
                } else if (!operador && typeof num1 == "number") {
                    imprimir(apagar(num1));
                } else {
                    imprimir(apagar(tela.innerHTML));
                }
                break;
            case ".":
                if (!contemPonto(tela.innerHTML)) {
                    tela.innerHTML += ".";
                }
                break;
            case "+/-":
                if (operador && typeof num2 == "number") {
                    imprimir(negar(num2));
                } else if (!operador && typeof num1 == "number") {
                    imprimir(negar(num1));
                } else {
                    imprimir(negar(tela.innerHTML));
                }
                break;
            case "%":
                if (operador) {
                    imprimir(perc(num2));
                } else {
                    imprimir(perc(num1));
                }
                break;
            default:
                if (tela.innerHTML.length < 9) {
                    if (tela.innerHTML == "0") {
                        tela.innerHTML = "";
                    } else if (tela.innerHTML == "-0") {
                        tela.innerHTML = "-";
                    }
                    tela.innerHTML += valor;
                }
                break;
        }
        if (operador) {
            num2 = parseFloat(tela.innerHTML);
        } else {
            num1 = parseFloat(tela.innerHTML);
        }
    }

    function limpar() {
        tela.innerHTML = 0;
    }

    function perc(valor) {
        return valor / 100;
    }

    function negar(valor) {
        return valor - valor * 2;
    }

    function apagar(valor) {
        if (valor != 0) {
            let num = valor.toString();
            if (num.length > 1) {
                animarTela();
                return parseFloat(num.substring(0, num.length - 1));
            }
            animarTela();
            return 0;
        }
        animarTela();
        return valor;
    }

    function animarTela() {
        tela.classList.add("apagado");
        setTimeout(() => {
            tela.classList.remove("apagado");
        }, 200);
    }

    function calcular(n1, n2, op) {
        switch (op) {
            case "+":
                return arrendodar(n1 + n2);
            case "-":
                return arrendodar(n1 - n2);
            case "x":
                return arrendodar(n1 * n2);
            case "/":
                return arrendodar(n1 / n2);
            default:
                break;
        }
    }

    function debug(on = true) {
        if (on) {
            console.clear();
            console.table({
                tela: tela.innerHTML,
                num1: num1,
                num2: num2,
                resultado: resultado,
                operador: operador
            });
        }
    }
});
