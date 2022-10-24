const q = (el) => document.querySelector(el);

const seuVotoPara = q('.d-1-1 span');
const cargo = q('.d-1-2 span');
const descriçao = q('.d-1-4');
const aviso = q('.d-2');
const lateral = q('.d-1-right');
const numeros = q('.d-1-3');

const teclaBotao = document.querySelectorAll('.teclado--botao.numeros');
const teclaBranco = q('.teclado--botao.branco');
const teclaCorrige = q('.teclado--botao.corrige');
const teclaConfirma = q('.teclado--botao.confirma');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = []

const começarEtapa = () => {
    let etapa = etapas[etapaAtual];

    let numeroHTML = '';
    numero = '';
    votoBranco = false;

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHTML += `<div class="numero pisca"></div>`;
        } else {
            numeroHTML += `<div class="numero"></div>`;
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descriçao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHTML;
    //pegar as informações da tela atual
    //preencher com o que precisa ser preenchido
}

const atualizaInterface = () => {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });
    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        descriçao.innerHTML = `Nome: ${candidato.nome}<br> Partido: ${candidato.partido}`;
        aviso.style.display = 'block';

        let fotosHTML = '';
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHTML += `<div class="d-1-image small"><img src="${candidato.fotos[i].URL}" alt="Minions"><p>${candidato.fotos[i].legenda}</p></div>`;
            } else {
                fotosHTML += `<div class="d-1-image"><img src="${candidato.fotos[i].URL}" alt="Minions"><p>${candidato.fotos[i].legenda}</p></div>`;
            }

        }
        lateral.innerHTML = fotosHTML;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descriçao.innerHTML = '<p>NÚMERO ERRADO</p><div class="aviso--grande pisca">VOTO NULO</div>'
    }
}

for (let i = 0; i < teclaBotao.length; i++) {
    teclaBotao[i].addEventListener('click', () => {
        let elNumero = q('.numero.pisca')
        if (elNumero !== null) {
            elNumero.innerHTML = i + 1;
            numero = `${numero}${i + 1}`;

            elNumero.classList.remove('pisca');
            if (elNumero.nextElementSibling !== null) {
                elNumero.nextElementSibling.classList.add('pisca');
            } else {
                atualizaInterface();
            }
        }
    })

}
const teclaBotaoZero = document.querySelector('.teclado--botao.numerosZero');
for (let i = 0; i <= 0; i++) {
    teclaBotaoZero.addEventListener('click', () => {
        let elNumero = q('.numero.pisca')
        if (elNumero !== null) {
            elNumero.innerHTML = i;
            numero = `${numero}${i}`;

            elNumero.classList.remove('pisca');
            if (elNumero.nextElementSibling !== null) {
                elNumero.nextElementSibling.classList.add('pisca');
            } else {
                atualizaInterface();
            }
        }
    })
}

teclaBranco.addEventListener('click', () => {
    if (numero === '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        lateral.innerHTML = '';
        descriçao.innerHTML = '<div class="aviso--grande pisca">VOTO BRANCO</div>'
    } else {
        q('.tela-branco').style.display = 'block';
    }
})
teclaCorrige.addEventListener('click', () => {
    começarEtapa()
})
teclaConfirma.addEventListener('click', () => {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if (votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    }

    if (votoConfirmado) {
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined) {
            começarEtapa();
        } else {
            votoBranco = false;
            seuVotoPara.style.display = 'none';
            descriçao.innerHTML = '<div class="fim">FIM</div>';
            aviso.style.display = 'none';
            lateral.innerHTML = '';
            cargo.innerHTML = '';
            numeros.innerHTML = '';
            console.log(votos)
        }
    }
})

/*  CASO QUEIRA LIBERAR O VOTO EM BRANCO, MESMO HAVENDO NÚMEROS DIGITADOS NA TELA:
 function branco() {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--branco pisca">VOTO EM BRANCO</div>';
        lateral.innerHTML = '';
    }
} */

começarEtapa()

q('.tela-branco p').addEventListener('click', () => q('.tela-branco').style.display = 'none')
q('.btn').addEventListener('click', () => window.location.reload())