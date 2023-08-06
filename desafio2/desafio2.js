const avaliacoes = [2, 15, 18, 25, 40]

mediaAvaliacoes = avaliacoes.reduce((acc, curr, currIndex) =>{
    media = acc + (curr * (currIndex + 1))
    return media
})/100
console.log("A media das notas é " + mediaAvaliacoes)