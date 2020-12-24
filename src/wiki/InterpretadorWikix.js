export const extrair = dados => {
    const paginas = Object.values(dados.query.pages);
    const conteudos = paginas[0].revisions[0];
    const conteudoTotal = conteudos.slots.main['*'];

    const linhas = conteudoTotal.split('\n');
    const temas = {};

    const identificarTema = texto => {
        if (texto.startsWith('==') && !texto.startsWith('===')) {
            return texto.replace(/=*/g, '').trim();
        }
    };

    const identificarConteudo = texto => {
        if (texto.startsWith('*')) {
            return texto;
        }
    };

    const limparConteudo = texto => {
        if (!texto) {
            return '';
        }
        return texto.replace(/[*]/g, '').trim();
    };

    let temaAtual = '';
    let anoAtual = '';
    for (let index = 0; index < linhas.length; index++) {
        const linha = linhas[index];
        const tema = identificarTema(linha);
        if (tema) {
            if (!temas[tema]) {
                temas[tema] = [];
            }
            temaAtual = tema;
            continue;
        }
        if (temaAtual) {
            let conteudo = identificarConteudo(linha);
            if (conteudo) {
                if (conteudo.includes(' — ')) {
                    anoAtual = '';
                    temas[temaAtual].push(limparConteudo(conteudo));
                    continue;
                }
                if (conteudo.startsWith('* [[') && conteudo.endsWith(']]') && conteudo.match(/\[{2}\d*\]{2}/)) {
                    anoAtual = conteudo;
                    continue;
                }
                if (anoAtual) {
                    conteudo = `${anoAtual} — ${conteudo}`;
                    temas[temaAtual].push(limparConteudo(conteudo));
                    continue;
                }
                temas[temaAtual].push(limparConteudo(conteudo));
            }
        }

    }

    return temas;
};

const obterTextoDoLink = texto => {
    const pedacos = texto.split('|');
    if (pedacos.length > 1) {
        return pedacos[1].trim().replace(/\[\[/g, '').replace(/\]\]/g, '');
    } else {
        return texto.trim().replace(/\[\[/g, '').replace(/\]\]/g, '');
    }
};

const obterLinkDoTexto = texto => {
    const pedacos = texto.split('|');
    if (pedacos.length > 1) {
        return pedacos[0].trim().replace(/\[\[/g, '').replace(/\]\]/g, '');
    } else {
        return texto.trim().replace(/\[\[/g, '').replace(/\]\]/g, '');
    }
};

export const normalizar = fato => {
    let links = [];
    const regex = new RegExp(/\[\[/, 'ig');
    const referencia = fato.match(regex);
    let ultimoFim = 0;
    for (const match of referencia) {
        const inicio = fato.indexOf(match, ultimoFim);
        const pedaco = fato.slice(inicio, fato.indexOf(']]', inicio) + 2);
        ultimoFim = inicio + 2;
        const texto = obterTextoDoLink(pedaco);
        links.push({ link: pedaco, texto });
    }

    // // let textoNormalizado =;
    let textoNormalizado = fato;

    links.forEach(item => {
        const { link, texto } = item;
        textoNormalizado = textoNormalizado.replace(link, texto);
        while (textoNormalizado.includes(link)) {
            textoNormalizado = textoNormalizado.replace(link, texto);
        }

    });

    links = links.map(item => obterLinkDoTexto(item.link));
    links = [...new Set(links)];
    return {
        texto: textoNormalizado,
        links,
    };
};
