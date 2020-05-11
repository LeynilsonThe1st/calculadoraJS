window.addEventListener("load", () => {
    var num1;
    var num2;
    var operador;
    var resultado;
    var tela = document.querySelector("#tela");
    var botoes = document.querySelectorAll("button[id*=botao-]");
    var operadores = document.querySelectorAll("button[id*=oper-]");

    botoes.forEach(botao => {
        botao.addEventListener("click", botaoPress);
    });

    operadores.forEach(botao => {
        botao.addEventListener("click", operadorPress);
    });

    function imprimir(valor) {
        tela.innerHTML = valor;
    }

    function arrendodar(valor, places=8) {
        let power = Math.pow(10, places);
        let res = Math.round(valor * power) / power;
        if (res.toFixed().length > 1 && res.toString().length > 10) {
            return arrendodar(res, 9 - parseInt(res.toFixed().length) );
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
        if (resultado) {
            limpar();
            resultado = undefined;
        }

        let valor =
            Number.parseInt(e.target.value) != NaN
                ? e.target.value
                : Number.parseInt(e.target.value);
        actualizarTela(valor);
        console.log(num1, num2, operador);
    }

    function contemPonto(valor) {
        if (valor.indexOf(".") > 0) {
            return true;
        }
        return false
     }

    function operadorPress(e) {
        animar(e.target);
        let oper = e.target.value;

        if (typeof num1 == typeof num2) {
            // tela.innerHTML;
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
        console.log(num1, num2, operador);
    }

    function actualizarTela(valor) {
        switch (valor) {
            case "ac":
                num1 = undefined;
                num2 = undefined;
                operador = undefined;
                limpar();
                break;
            case ".":
                if (!contemPonto(tela.innerHTML)) {
                    tela.innerHTML += ".";
                }
                break;
            case "+/-":
                if (tela.innerHTML[0] == "-") {
                    tela.innerHTML = parseFloat(tela.innerHTML.substring(1));
                } else if (tela.innerHTML.length == 0) {
                    tela.innerHTML = "-";
                } else {
                    if (typeof num1 == "number") {
                        tela.innerHTML = "-" + num1;
                        break
                    }
                    tela.innerHTML = "-" + tela.innerHTML;
                }
                console.log(num1, num2, operador, tela.innerHTML);
                break;
            case "%":
                tela.innerHTML = perc(tela.innerHTML);
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

    function calcular(n1, n2, op) {
        switch (op) {
            case "+":
                return n1 + n2;
            case "-":
                return n1 - n2;
            case "x":
                return n1 * n2;
            case "/":
                return arrendodar(n1 / n2);
            default:
                break;
        }
    }


});
