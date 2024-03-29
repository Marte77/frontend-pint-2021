import React from "react";
import ChartistGraph from "react-chartist";
import './style_auxiliar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import DropdownButton from 'react-bootstrap/DropdownButton'
import axios from 'axios';

// react-bootstrap components
import {
  Dropdown,
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
class home extends React.Component{
  
  constructor(props){
    super(props);
    var arraylabelsmeses = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mai",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]
    var arraylabelsdias = [
      "Dom",
      "Seg",
      "Ter",
      "Quar",
      "Quin",
      "Sext",
      "Sab"
    ]
    this.labels = [arraylabelsmeses, arraylabelsdias]
    this.state = {
      listUtilsEspera:[],
      listaDiasNumeroReports:[],
      labels : [arraylabelsmeses, arraylabelsdias],
      percentagem:0,nutilsinstituicao:0,npessoastodas:0
    }
  }
  componentDidMount(){
    this.PedidoUtilsEspera();
    this.obterReportsEmCadaDia();
    this.obterPercentagem();
  }
  
  PedidoUtilsEspera() {
    const idlocal=localStorage.getItem('idinstituicao');
      const idad=localStorage.getItem('idadmin');
      const idinst=localStorage.getItem('idinstituicao');
    const url = "https://pint2021.herokuapp.com/Utilizadores/listutilizadoresNoVerify/"+idinst;
    axios.get(url)
    .then(res => {
      console.log(res);
      if(res.status === 200){
      const data = res.data.ListaUtilizadores;
      this.setState({ listUtilsEspera:data });
    }else{
      alert("Erro dispositivo web");
    }}).catch(error => {
      alert(error)
    });
  }
  obterReportsEmCadaDia(){
    let url = 'https://pint2021.herokuapp.com/Instituicao/numero_reports_x_dias/'+localStorage.getItem('idinstituicao')+ '/'+7
    axios.get(url).then( res=>{
      //console.log(res.data)
      this.setState({listaDiasNumeroReports:res.data.res})
      var arraylabelsdias = this.state.labels[1]
      
      var arraydiasordenadosdeacordocompedido = new Array()
      for(let dia of res.data.res){
        arraydiasordenadosdeacordocompedido.push(arraylabelsdias[dia.diasemana])
      }
      
      arraydiasordenadosdeacordocompedido.reverse()
      this.setState({labels:[this.state.labels[0],arraydiasordenadosdeacordocompedido]})
    }).catch( err=>{
      console.log(err)
      alert(err)
    })
  
  }
   obterReportshoje(){
      
     console.log(this.state.listaDiasNumeroReports[0]);

if(this.state.listaDiasNumeroReports.length !==0)
           return this.state.listaDiasNumeroReports[0].NReports
  }

  obterPercentagem(){
    let url = 'http://pint2021.herokuapp.com/Instituicao/percentagem_util_por_inst/' + localStorage.getItem('idinstituicao')
    axios.get(url).then(res =>{
      console.log(res.data)
      this.setState({
        percentagem:res.data.percentagem*100,
        nutilsinstituicao:res.data.ntotalPessoasInst,
        npessoastodas:res.data.ntotalPessoas
      })
    }).catch(err=>{
      console.log(err)
      alert(err)
    })
  }

  loadGraficoNumeroReports(){
    let array = this.state.listaDiasNumeroReports
    if(array.length === 0)
      return [[0]]
    let arrayfinal = new Array()
    for(let obj in array){
      arrayfinal.push(array[obj].NReports)
    }
    return [arrayfinal]
  }

  loadGraficoLotacaoReports(){
    let array = this.state.listaDiasNumeroReports
    if(array.length === 0)
      return [[0]]
    let arrayfinal = new Array()
    for(let obj in array){
      arrayfinal.push(array[obj].densidademedia)
    }
    return [arrayfinal]
  }

  loadGraficoPercentagem(){
    let jsonreturn = {
      labels:[],
      series:[]
    }
    jsonreturn.series.push(100-(this.state.percentagem))
    jsonreturn.series.push(this.state.percentagem)
 jsonreturn.labels.push((Math.trunc((100-(this.state.percentagem)))).toString()+"%")
    jsonreturn.labels.push((Math.trunc(this.state.percentagem)).toString()+"%")
    return jsonreturn
  }

  render(){
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">  {/*coluna Estatisticas Diárias*/}
            <Card className="card-stats">
              <Card.Body>
                <Row>
                    <div className="numbers">
                      <p className="first_titulo">Estatísticas Diárias:</p>
                      
                      <p className="secound_titulo">Nº de reportes na Instituição: </p>
                      <Card.Title><h3 className="aligncenter">
                      <br/>
                       {this.obterReportshoje()}
                      </h3></Card.Title>    
                      <br/>
                </div>
                </Row>
              </Card.Body>  
            </Card>
          </Col>   {/*coluna Estatisticas Diárias*/}
          <Col md="7">{/*grafico reports por dias*/}
            <Card>

              <Card.Header>
                <p className="first_titulo_esquerda">Reportes:
           
                </p>
                <p className="card-category">Todos os reportes do local:</p>
              </Card.Header>

              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                  <ChartistGraph
                    data={{
                      labels: this.state.labels[1],
                      series: this.loadGraficoNumeroReports()
                    }}
                    type="Bar"
                    options={{
                      seriesBarDistance: 10,
                      axisX: {
                        showGrid: false,
                      },
                      height: "245px",
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          seriesBarDistance: 5,
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="7">
            <Card>
              <Card.Header>
              <p className="first_titulo_esquerda">Lotação:
              </p>
              <p className="card-category">Dados dos últimos 7 dias</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" /*id="chartHours"*/>
                  <ChartistGraph
                    data={{
                      labels: this.state.labels[1],
                      series: this.loadGraficoLotacaoReports()
                    }} 
                    type="Line"
                    options={{
                      
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: false,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              
            </Card>
          </Col>
          
        </Row>
        <Row>
          
          <Col md="8">
            <Card className="card-tasks">
              <Card.Header>
                <p className="first_titulo_esquerda">Utilizadores em espera</p>
                <p className="card-category">Faça a gestão de novos utilizadores</p>
              </Card.Header>
              <Card.Body>
                <div id="table-scroll">
                  <Table id="table-scroll">
                    <tbody id="table-scroll">
                        <th>
                          Tipo Utilizador  &nbsp;&nbsp;
                        </th>
                        <th>
                          Primeiro Nome
                        </th>
                        <th>
                          Último Nome &nbsp;&nbsp;
                        </th>
                        <th>
                          Email
                        </th>
                        <th>
                          Data Nascimento
                        </th>
                       <th>Aceitar</th>
                       <th>Recusar</th>
                       
                       {this.loadUtilsEspera()} 

                    </tbody>
                  </Table>
                </div>
                
                <button class="button_remocao">Remover todos</button>
                <button class="button_aceitacao">Aceitar todos</button>
                <br/><br/>
              </Card.Body>
              
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <Card.Header>
              
              <p className="first_titulo">Estatística global da Instituição:</p>
              
                <hr></hr>
                
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                    data={this.loadGraficoPercentagem()}
                    type="Pie"
                  />
                </div>
                <div className="legend">
                  
                  <i className="fas fa-circle text-danger"></i>Utilizadores Instituição  <br/>
                  <i className="fas fa-circle text-info"></i> Registos Globais
                  
                </div>
                
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
  }



  loadUtilsEspera(){
    return this.state.listUtilsEspera.map((data, index)=>{
    var tipo;
    console.log(data.ID_Admin);
    if(data.ID_Admin === undefined)
    {
      tipo="Utilizador";
    }
    else{
      tipo="Admin";
    }
    return(
    <tr key={index}>
    <td>{tipo}</td>
    <td>{data.Pessoa.PNome}</td>
    <td>{data.Pessoa.UNome}</td>
    <td>{data.Pessoa.Email}</td>
    <td>{data.Pessoa.Data_Nascimento}</td>


<td className="td-actions text-right">
                          <OverlayTrigger overlay={<Tooltip id="tooltip-537440761">      Aceitar</Tooltip>}>
                            <Button className="btn-simple btn-link p-1" type="button" variant="info"  onClick={()=>this.onAdd(data.ID_Util)}>
                              <i className="fas fa-check"></i>
                            </Button>
                            
                          </OverlayTrigger>
                          </td>
                          <td>
                          <OverlayTrigger  overlay={ <Tooltip id="tooltip-21130535">Remover</Tooltip> }>
                            <Button className="btn-simple btn-link p-1" type="button" variant="danger" onClick={()=>this.onDelete(data.ID_Util)}>
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
    </tr>
    )
    });
  }
  onDelete(id){
    console.log(id)
        Swal.fire({
        title: 'Tem a certeza?',
        text: 'O pedido pendente vai ser apagado',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, quero apagar !',
        cancelButtonText: 'Não, manter o pedido.'
        }).then((result) => {
        if (result.value) {
        this.sendDelete(id)
        } else if (result.dismiss === 
        Swal.DismissReason.cancel) {
          
        Swal.fire(
        'Cancelado',
        'O pedido continua seguro.'
        )
        }
        })
  }
  sendDelete(userId){
    const baseUrl = "https://pint2021.herokuapp.com/Utilizadores/recusarutil/ " +userId+"/"+localStorage.getItem('idinstituicao') 
    axios.post(baseUrl,{
      id:userId
    })
    .then(response =>{
      
      if (response.data.success) {
      Swal.fire('Apagado!','O pedido foi apagado com sucesso')
      this.PedidoUtilsEspera()
      }
    }).catch ( error => {
      alert(error)
    })    
  }   
  onAdd(id){
    console.log("id",id)
    Swal.fire({
      title: 'Tem a certeza?',
      text: 'O pedido será aceite',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, aceitar pedido!',
      cancelButtonText: 'Não, manter o pedido.'
    }).then(result => {
    if (result.value) {
      this.acepetutil(id)
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelado','O pedido continua seguro.')
    }
    })
  }
  acepetutil(userId){
    const baseUrl = "http://pint2021.herokuapp.com/Utilizadores/updateUtilVerify/"+userId
    console.log(baseUrl)
    axios.post(baseUrl,{
      idutil:userId
    })
    .then(response =>{
      if (response.data.success) {
      Swal.fire('Aceite com sucesso!')
      this.PedidoUtilsEspera()
    }
    })
    .catch ( error => {
      alert("Error 325 ")
    })    
  } 




}
export default home;
