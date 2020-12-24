import React from 'react';
import {
  SafeAreaView,
  Button,
  Modal,
  StyleSheet,
  Pressable,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import * as Wikipedia from './src/wiki/Wikipedia';
import ResultadoWiki from './src/wiki/ResultadoWiki';
import { DateSelectionCalendar, DefaultTheme } from 'react-native-easy-calendar';
import dayjs from 'dayjs';
import portuguesBrasileiro from 'dayjs/locale/pt-br';

export default class App extends React.Component {

  state = {
    data: new Date(),
    resultado: null,
    mostrarResultado: false,
  }

  constructor(props) {
    super(props);
    this.modal = React.createRef();
  }

  pesquisar = async () => {
    const dataComoTexto = dayjs(this.state.data).locale(portuguesBrasileiro).format('D [de] MMMM');
    const resultado = await Wikipedia.recuperarResultadoAleatorio(dataComoTexto);
    this.setState({ resultado, mostrarResultado: true });
  }

  mudarTexto = texto => {
    this.setState({ texto });
  }

  montarResultado = () => {
    const resultado = this.state.resultado;
    if (!resultado) {
      return;
    }
    return (
      <ResultadoWiki resultado={resultado} />
    );
  }

  setSelectedDate = data => {
    this.setState({ data });
  }

  setModalVisible = () => {
    this.setState({ mostrarResultado: !this.state.mostrarResultado });
  }

  onShow = x => {
    console.log(this.modal.current.layout);
  }

  onLayout = (event) => {
    // { nativeEvent: { layout: { x, y, width, height } } }
    console.log(event.nativeEvent);
  }

  montarModal = () => {
    return (

      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.mostrarResultado}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
        onShow={this.onShow}
        ref={this.modal}
      >
        <View style={styles.centeredView} onLayout={this.onLayout}>
          <View style={styles.modalView}>
            <Pressable
              style={styles.fecharResultado}
              onPress={this.setModalVisible}
            // hitSlop={150}
            // pressRetentionOffset={{ bottom: 500, left: 500, right: 500, top: 500 }}
            >
              <Text style={styles.textStyle}>X</Text>
            </Pressable>

            {this.montarResultado()}
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    const CustomTheme = {
      ...DefaultTheme,
      selectedDayContainer: {
        backgroundColor: 'black',
        borderRadius: 10,
      },
      normalArrowImage: {
        tintColor: 'black',
      },
    };
    return (
      <>
        <SafeAreaView>
          <DateSelectionCalendar
            onSelectDate={this.setSelectedDate}
            selectedDate={this.state.data}
            locale={portuguesBrasileiro}
            theme={CustomTheme}
          />
          <Button
            title={'Pesquisar'}
            onPress={this.pesquisar}
            color={'black'}
          />
        </SafeAreaView>
        {this.montarModal()}
      </>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
  },
  modalView: {
    // borderWidth: 1,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  fecharResultado: {
    justifyContent: 'center',
    backgroundColor: "#000",
    // backgroundColor: "#04997c",
    borderRadius: 50,
    width: 40,
    height: 40,
    padding: 0,
    elevation: 2,
    right: -1,
    top: -0,
    position: 'absolute',
    // borderWidth: 1,
    // borderBottomWidth: 2,
    // borderLeftWidth: 1,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
