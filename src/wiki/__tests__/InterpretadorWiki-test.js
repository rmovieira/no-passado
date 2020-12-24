/* eslint-disable quotes*/
import * as InterpretadorWiki from '../InterpretadorWiki';

test('Deve normalizar corretamente os textos', () => {
    let texto = '**O presidente português [[Sidónio Pais]] é [[Sidónio Pais#Assassinato|assassinado]] na estação ferroviária do Rossio, Lisboa.';
    let resultado = InterpretadorWiki.normalizar(texto);
    let esperado = {
        links: ['Sidónio Pais', 'Sidónio Pais#Assassinato'],
        texto: '**O presidente português <a href="https://pt.wikipedia.org/wiki/Sidónio Pais">Sidónio Pais</a> é <a href="https://pt.wikipedia.org/wiki/assassinado">assassinado</a> na estação ferroviária do Rossio, Lisboa.',
    };
    expect(resultado).toEqual(esperado);

    texto = '* [[2001]] — A [[Organização das Nações Unidas para a Educação, a Ciência e a Cultura|UNESCO]] designa a [[região vinhateira do Douro]], no norte de [[Portugal]], na lista dos locais que são [[Património Mundial|Património da Humanidade]].';
    resultado = InterpretadorWiki.normalizar(texto);
    esperado = {
        links: ['2001', 'Organização das Nações Unidas para a Educação, a Ciência e a Cultura', 'região vinhateira do Douro', 'Portugal', 'Património Mundial'],
        texto: '* <a href="https://pt.wikipedia.org/wiki/2001">2001</a> — A <a href="https://pt.wikipedia.org/wiki/UNESCO">UNESCO</a> designa a <a href="https://pt.wikipedia.org/wiki/região vinhateira do Douro">região vinhateira do Douro</a>, no norte de <a href="https://pt.wikipedia.org/wiki/Portugal">Portugal</a>, na lista dos locais que são <a href="https://pt.wikipedia.org/wiki/Património da Humanidade">Património da Humanidade</a>.',
    };
    expect(resultado).toEqual(esperado);

    texto = '* [[1939]] — A [[União das Repúblicas Socialistas Soviéticas|União Soviética]] é expulsa da [[Sociedade das Nações|Liga das Nações]] por sua agressão à [[Finlândia]].';
    resultado = InterpretadorWiki.normalizar(texto);
    esperado = {
        links: ['1939', 'União das Repúblicas Socialistas Soviéticas', 'Sociedade das Nações', 'Finlândia'],
        texto: '* <a href="https://pt.wikipedia.org/wiki/1939">1939</a> — A <a href="https://pt.wikipedia.org/wiki/União Soviética">União Soviética</a> é expulsa da <a href="https://pt.wikipedia.org/wiki/Liga das Nações">Liga das Nações</a> por sua agressão à <a href="https://pt.wikipedia.org/wiki/Finlândia">Finlândia</a>.',
    };
    expect(resultado).toEqual(esperado);

    texto = "* [[1702]] — Os [[47 rōnin]], liderados por [[Oishi Kuranosuke Yoshio|Oishi Yoshio]], iniciam o ataque à mansão de [[Kira Yoshinaka]] para vingar a morte do seu ''[[daimyō]],'' [[Asano Takumi No Kami Naganori|Asano Naganori]].";
    resultado = InterpretadorWiki.normalizar(texto);
    esperado = {
        links: ['1702', '47 rōnin', 'Oishi Kuranosuke Yoshio', 'Kira Yoshinaka', 'daimyō', 'Asano Takumi No Kami Naganori'],
        texto: '* <a href="https://pt.wikipedia.org/wiki/1702">1702</a> — Os <a href="https://pt.wikipedia.org/wiki/47 rōnin">47 rōnin</a>, liderados por <a href="https://pt.wikipedia.org/wiki/Oishi Yoshio">Oishi Yoshio</a>, iniciam o ataque à mansão de <a href="https://pt.wikipedia.org/wiki/Kira Yoshinaka">Kira Yoshinaka</a> para vingar a morte do seu <i><a href="https://pt.wikipedia.org/wiki/daimyō">daimyō</a>,</i> <a href="https://pt.wikipedia.org/wiki/Asano Naganori">Asano Naganori</a>.',
    };
    expect(resultado).toEqual(esperado);

    texto = '* [[1758]] — [[Processo dos Távoras]]: Teresa Leonor de [[Casa dos Távoras|Távora]] e seu marido são presos acusados de serem os mandantes do atentado ao rei [[José I de Portugal|D. José I]]';
    resultado = InterpretadorWiki.normalizar(texto);
    esperado = {
        links: ['1758', 'Processo dos Távoras', 'Casa dos Távoras', 'José I de Portugal'],
        texto: '* <a href="https://pt.wikipedia.org/wiki/1758">1758</a> — <a href="https://pt.wikipedia.org/wiki/Processo dos Távoras">Processo dos Távoras</a>: Teresa Leonor de <a href="https://pt.wikipedia.org/wiki/Távora">Távora</a> e seu marido são presos acusados de serem os mandantes do atentado ao rei <a href="https://pt.wikipedia.org/wiki/D. José I">D. José I</a>',
    };
    expect(resultado).toEqual(esperado);

    texto = "No calendário ''litúrgico'' tem a letra dominical '''C''' para o dia da semana.";
    resultado = InterpretadorWiki.normalizar(texto);
    esperado = {
        links: [],
        texto: 'No calendário <i>litúrgico</i> tem a letra dominical <b>C</b> para o dia da semana.',
    };
    expect(resultado).toEqual(esperado);

});
/* eslint-enable quotes*/