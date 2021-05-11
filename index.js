document.addEventListener('DOMContentLoaded', () => {
    const tela = document.querySelector("#tela");
    const contexto = tela.getContext('2d');

    const pincel = {
        pos: {
            x: 0,
            y: 0
        },
        posAnterior: null,
        ativo: false,
        movendo: false
    };

    tela.width = 700;
    tela.height = 500;

    contexto.lineWidth = 5;
    contexto.strokeStyle = "red";

    const linha = {
        pos: {
            x: 350,
            y: 250
        },
        posAnterior: {
            x: 10,
            y: 10
        }
    }

    const desenharLinha = (linha) => {
        contexto.beginPath();
        contexto.moveTo(linha.posAnterior.x, linha.posAnterior.y);
        contexto.lineTo(linha.pos.x, linha.pos.y);
        contexto.stroke();
    }

    tela.onmousedown = (evento) => {
        pincel.ativo = true;
    }

    tela.onmouseup = (evento) => {
        pincel.ativo = false;
    }

    tela.onmousemove = (evento) => {
        pincel.pos.x = evento.clientX;
        pincel.pos.y = evento.clientY;
        pincel.movendo = true;
    }

    const ciclo = () => {
        if(pincel.ativo && pincel.movendo && pincel.posAnterior){
            let linha = {
                pos: pincel.pos,
                posAnterior : pincel.posAnterior
            }

            desenharLinha(linha);
            pincel.movendo = false;
        }

        pincel.posAnterior = {
            x: pincel.pos.x, 
            y: pincel.pos.y
        }

        setTimeout(ciclo, 10);
    }

    ciclo();
});