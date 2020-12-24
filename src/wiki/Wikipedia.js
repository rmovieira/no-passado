import * as InterpretadorWiki from './InterpretadorWiki';

const PESQUISA_PADRAO = 'https://pt.wikipedia.org/w/api.php?action=query&format=json&prop=revisions%7Cpageprops&rvprop=content&rvslots=main&titles=';
const PESQUISA_RESUMO = 'https://pt.wikipedia.org/api/rest_v1/page/summary/';


export const buscarResumo = async texto => {
    const textoFormatado = texto.trim().replace(/ /g, '_');
    const resultado = await fetch(`${PESQUISA_RESUMO}${textoFormatado}`);
    const conteudo = await resultado.json();
    const { originalimage: imagem, thumbnail: miniatura, coordinates: coordenadas, extract: resumo, content_urls } = conteudo;
    const pagina = content_urls?.mobile?.page;
    return {
        imagem,
        miniatura,
        coordenadas,
        resumo,
        pagina,
    };
};

export const pesquisar = async texto => {
    const textoFormatado = texto.trim().toLowerCase().replace(/ /g, '_');
    let resultado = await fetch(`${PESQUISA_PADRAO}${textoFormatado}`);
    resultado = await resultado.json();
    const resultadoPreparado = InterpretadorWiki.extrair(resultado);
    return resultadoPreparado;
};

function gerarNumeroAleatorio(maximo) {
    return Math.floor(Math.random() * maximo);
}

export const recuperarResultadoAleatorio = async texto => {
    const resultado = await pesquisar(texto);

    const chaves = Object.keys(resultado);
    const chaveTema = gerarNumeroAleatorio(chaves.length);
    const fatos = resultado[chaves[chaveTema]];
    const chaveFato = gerarNumeroAleatorio(fatos.length);

    console.log(chaveTema, chaveFato);
    const fatoEscolhido = fatos[chaveFato];
    const { texto: fato, links } = InterpretadorWiki.normalizar(fatoEscolhido);
    if (links.length >= 2 && !links[0].match(/\D/g)) {
        const resumo = await buscarResumo(links[1]);
        resumo.resumo = resumo.resumo.replace(/\n/g, '');
        return { tema: chaves[chaveTema], fato, ...resumo };
    }

    return { tema: chaves[chaveTema], fato, links };
};
