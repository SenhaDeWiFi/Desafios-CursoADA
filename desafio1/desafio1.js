const reciboDeVenda = 'régua/valor3=cupom0;lápis/valor0.5=cupom0;mochila/valor50=cupom10;estojo/valor8=cupom0;cola/valor4=cupom0;cola/valor4=cupom0;mochila/valor50=cupom10;lápis/valor0.5=cupom0;cola/valor4=cupom0;lápis/valor0.5=cupom0;mochila/valor50=cupom10;tesoura/valor5=cupom0;caneta/valor1=cupom0;cola/valor4=cupom0;estojo/valor8=cupom0;borracha/valor2=cupom0;caderno/valor15=cupom5;lápis/valor0.5=cupom0;lápis/valor0.5=cupom0;tesoura/valor5=cupom0;'
const vendasfull = reciboDeVenda.trim().split(/[\/=;]/i)
vendasfull.pop()
const produtos = [], valores = [], cupons = [], quantidades = [], listaDaVenda = []
const totais = {
    valorTotal: 0,
    valorTotalDesconto: 0,
    quantidadeDeProdutos: 0
}

vendasfull.map((a, x) => {
    valorNumericoAtual = (+vendasfull[x].match(/\d+.\d+|\d+/))
    if (x % 3 == 0 ){
        a = a[0].toUpperCase() + a.slice(1)
        if (produtos.indexOf(a) == -1) {
            produtos.push(a)
            quantidades[produtos.indexOf(a)] = 1
            totais.quantidadeDeProdutos++;
        }else {
            quantidades[produtos.indexOf(a)]++
            totais.quantidadeDeProdutos++;
        }
    }else if (x % 3 == 1){
        valores.push(valorNumericoAtual)
    } else {
        cupons.push(valorNumericoAtual)
    }
})

for (let i = 0; i < produtos.length ; i++) {
    
    const molde = { 
        produto: produtos[i],
        valor: valores[i], 
        cupom: cupons[i],
        quantidade: quantidades[i],
    }

    totais.valorTotal += valores[i] * quantidades[i]
    totais.valorTotalDesconto += (valores[i] * quantidades[i]) - (cupons[i] * valores[i] * quantidades[i]/100)

    listaDaVenda.push({...molde}) 
}
console.log(listaDaVenda)
console.log(totais)