import React from 'react';
import { View,Text,FlatList,ScrollView,TouchableOpacity } from 'react-native';
const {layout, text, forms, buttons,colors} = require ('../styles/main');
import {Shapes} from "react-native-background-shapes";
import { SimpleCard, Card } from "@paraboly/react-native-card";
import ModalInstructor from "react-native-modal";

class Dictionary extends React.Component {
  constructor(props) {
   
    super(props);
    const { navigation } = this.props;
    this.state = { 
      modalInstructor:false,
      title:'',
      content:'',
      elements:[ 
        {title: "Simulador de tarjeta de credito", concept:"Es una herramienta para identificar los pro y contra de una compra."},
        {title: "Interes", concept:"El interés es el precio que se paga por el uso del préstamo de dinero. Generalmente se expresa como un porcentaje anual sobre la suma prestada por parte de una institución financiera."},
        {title: "Cuota de manejo", concept:"La cuota de manejo de las tarjetas de crédito es el costo que se paga por tener disponible un cupo de crédito con una entidad financiera, permitiéndole realizar compras presenciales o por internet en todo el mundo y diferirlas hasta en 36 cuotas, sin los riesgos de cargar dinero en efectivo."},
        {title: "¿Que es un balance?", concept:"Es un informe financiero contable que refleja la situación económica y financiera de una empresa en un momento determinado."},
        {title: "Tarjeta de credito", concept:"Es producto financiero permite realizar compras que se pagan a futuro. Para solicitar una tarjeta de este tipo, es necesario dirigirse a una institución financiera o entidad bancaria, la cual solicitará al interesado una serie de documentos y garantías para asegurarse de que se trata de una persona solvente y capaz de cumplir con sus potenciales obligaciones de pago."},
        {title: "Ecard", concept:"La e card de Bancolombia es una tarjeta virtual recargable con la que tus compras en internet serán mucho más cómodas y seguras."},
        {title: "Compras en dolares", concept:"Es una compra que sucede de igual forma que una compra normal pero al momento del pago a deuda en dólares se liquida a la Tasa Representativa del Mercado (TRM). Algunas tarjetas de credito debitan este valor a 24 cuotas, consulta con tu entidad financiera para modificar este valor.Ejemplo: Viajes de Uber, compras en UberEats,compras en Spotify, entre otros servicios."},
        {title: "Fecha de corte", concept:"Son los días en los que la entidad financiera hace el corte de los consumos y compras que usted hizo con la tarjeta, y elabora el extracto, en donde se indica el valor de la próxima cuota a pagar, se relacionan las compras, intereses, plazo y avances hechos"},
        {title: "Tasa efectiva anual (EA)", concept:"Tasa Efectiva Anual, es el interes que se aplica a cualquier producto financiero que implique una deuda, este es un porcentaje que se aplica anualmente o mensualmente sobre el monto. "},
        {title: "Seguro de vida", concept:"Este seguro de vida cubre todos los riesgos de muerte, incapacidad total y permanente asociados a tarjetas de crédito. Es decir en caso de una calamidad se exonera un porcentaje de la deuda, consulta con tu entidad financiera que comprende tu seguro."},
      ]
    };
  }
    render() {
      return(
          <View style={ [layout.MainContainer, layout.AlignCenter] }>
            <Shapes
                primaryColor={colors.BackgroundColorDefault}
                secondaryColor={colors.main}
                height={1}
                borderRadius={20}
                figures={[
                {name: 'circle', position: 'center', size: 60},
                {name: 'donut', position: 'flex-start', axis: 'top', size: 80},
                {name: 'circle', position: 'center', axis: 'right', size: 100},
                {name: 'donut', position: 'flex-end', axis: 'right', size: 80},
                {name: 'circle', position: 'flex-end', axis: 'left', size: 100},
                ]}
            />
            <Text style={[text.TitleView, text.Strong, text.TLight]}>
               Conceptos financieros
            </Text>
            <ScrollView >
              <FlatList
                data = {this.state.elements}
                style={layout.MainContainerSVFlatlist}
                renderItem={({item}) =>
                  <Card
                    iconDisable
                    title={item.title}
                    content={item.concept}
                    styles={{ width: 200,height:400 }}
                    onPress={()=> {this.setState({modalInstructor: true}),this.setState({title: item.title}),this.setState({content: item.concept})}}
                  />
                  }/>
            </ScrollView>
            <ModalInstructor
              backdropColor = {colors.opacityMain}
              backdropOpacity = {0.9}
              style = { { margin: 0} }
              isVisible={this.state.modalInstructor}
              useNativeDriver={true}
            >  
              <View 
                style={layout.ModalTrialInfoCont}
              >
                <Text style={[text.TravelInfoTitle, text.Regular, text.TAccentPurple]}>
                {this.state.title}
                </Text>
                <View style={[layout.GralTextCont, {marginBottom: 30,marginTop:30}]}>
                <SimpleCard
                    titleFontSize = {16}
                    title={this.state.content}
                  />
                </View>
                <View style={[layout.GralTextCont]}>
                    <TouchableOpacity 
                        onPress={() => this.setState({modalInstructor: false})}
                        style={[buttons.GralButton, buttons.ButtonAccentPurple]}>
                        <Text style={[text.BText, text.TLight]}>
                            Cerrar 
                        </Text>
                    </TouchableOpacity>
                </View>
              </View>
            </ModalInstructor>  

          </View>
    );
  }
  }
  
  export default Dictionary;