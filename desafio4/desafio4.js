/*
*
*   Piloto: Marcos
*   Co-pilotos: Isabela, João, Kawã, Pedro  
*   Obs: Não coloquei a mão no código depois da sala temática :)
*
*/

const pow = (numero, potencia) => {
    if(potencia == 0) return 1;

    let resultado = numero;

    for(let i = potencia; i > 1; i--) {
        resultado = resultado * numero

    }

    return resultado;
}

const handleClick = () => {
    const peso = document.getElementById('peso').value;
    const altura = document.getElementById('altura').value;
    const resultado = document.getElementById('resultado');

    const imc = peso / pow(altura, 2);
    
    resultado.innerText = gerarImc(imc);

}

const gerarImc = (imc) => {
    if(imc >= 30) {
        return 'Obesidade';
    } else if(imc >= 25) {
        return 'Sobrepeso';
    } else if(imc >= 18.5) {
        return 'Peso normal';
    } 

    return 'Abaixo do peso';
}

console.log(pow(10, 5));