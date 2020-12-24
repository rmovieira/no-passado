import React from 'react';
import {
    Text,
    Linking,
    StyleSheet,
    View,
    ScrollView,
    Image,
    Pressable,
} from 'react-native';
import PropTypes from 'prop-types';
import HTML from 'react-native-render-html';


export default class ResultadoWiki extends React.Component {

    static propTypes = {
        resultado: PropTypes.object.isRequired,
    }

    state = {
        mostrarMais: false,
    }

    onLinkPress = (_, href) => {
        Linking.openURL(href);
    }

    mostrarMais = () => {
        this.setState({ mostrarMais: !this.state.mostrarMais });
    }


    render() {
        const { tema, fato, resumo, miniatura } = this.props.resultado;
        // "thumbnail": {
        // "height": 180,
        //  "source": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Praia_de_Pi%C3%A7arras.jpg/320px-Praia_de_Pi%C3%A7arras.jpg",
        //   "width": 320
        // },
        console.log('---', fato);
        return (
            <View>
                <ScrollView>
                    <Text style={estilo.tema} >
                        {tema}
                    </Text>
                    {
                        miniatura &&
                        < Image
                            resizeMode={'contain'}
                            style={estilo.imagem}
                            source={{ uri: miniatura.source }}
                        // source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Praia_de_Pi%C3%A7arras.jpg/320px-Praia_de_Pi%C3%A7arras.jpg' }}
                        />
                    }
                    <HTML source={{ html: `<p>${fato}</p>` }} contentWidth={450}
                        onLinkPress={this.onLinkPress}
                        tagsStyles={{
                            p: { fontSize: 18 },
                            a: { fontSize: 18 },
                        }}
                    />
                    {
                        resumo &&
                        <Pressable onPress={this.mostrarMais}>
                            <Text style={estilo.mostrarMais}>{this.state.mostrarMais ? 'Mostrar menos...' : 'Mostrar mais...'}</Text>
                        </Pressable>
                    }
                    {
                        this.state.mostrarMais &&
                        <View style={estilo.resumo}>
                            <Text style={estilo.textoResumo} >
                                {resumo}
                            </Text>
                        </View>
                    }
                </ScrollView>
            </View>
        );

    }
}

const estilo = StyleSheet.create({
    tema: { fontSize: 25, paddingVertical: 10 },
    mostrarMais: { fontSize: 18, marginTop: 10, color: 'gray' },
    resumo: { borderRadius: 10, padding: 5, backgroundColor: 'ghostwhite', borderColor: 'ghostwhite' },
    textoResumo: { color: 'gray', fontSize: 18 },
    imagem: { height: 180, width: '100%' },
});