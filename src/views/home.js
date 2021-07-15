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
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat"
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
    this.obterPercentagem()
  }
  PedidoUtilsEspera() {
    const url = "https://pint2021.herokuapp.com/Pessoas/getUtilsEspera";
    axios.get(url)
    .then(res => {
      console.log(res);
      if(res.status === 200){
      const data = res.data.Utils;
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
    /*
    labels: ["90%", "10%"],
                      series: [90, 10],*/
    let jsonreturn = {
      labels:[],
      series:[]
    }
    jsonreturn.series.push(100-(this.state.percentagem))
    jsonreturn.series.push(this.state.percentagem)
    jsonreturn.labels.push((100-(this.state.percentagem)).toString()+"%")
    jsonreturn.labels.push((this.state.percentagem).toString()+"%")
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
                      <Card.Title><h3 className="aligncenter">3</h3></Card.Title>    
                    <div class="container">
                    <button class="button">Ir para lotação</button>
                    </div>
                      <p className="secound_titulo">Nº de reportes fora da Instituição: </p>
                      <Card.Title><h3 className="aligncenter">3</h3></Card.Title>
                      <div class="container">
                    <button class="button">Ir para lotação</button>
                    </div>
                    </div>
                </Row>
              </Card.Body>  
            </Card>
          </Col>   {/*coluna Estatisticas Diárias*/}
          <Col md="7">{/*grafico reports por dias*/}
            <Card>

              <Card.Header>
                <p className="first_titulo_esquerda">Reportes:
                {/*<Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdown_style">
                      Periodo de Tempo
                  </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Tempo real</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Hoje</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Esta semana</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>*/}
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
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdown_style_lotacao">
                    Local Indoor
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Cantina</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">BAR</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">bla bla</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
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
                <p className="first_titulo_esquerda">Utilizadores em espera
               
              <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdown_style_utilizadorespendentes">
    Ordenar por
  </Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Mais Recente</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Mais Antigo</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown></p>
                <p className="card-category">Faça a gestão de novos utilizadores</p>
              </Card.Header>
              <Card.Body>
                <div id="table-scroll">
                  <Table id="table-scroll">
                    <tbody id="table-scroll">
 <th/>
                        <th>
                          Tipo Utilizador  &nbsp;&nbsp;
                        </th>
                        <th>
                          Primeiro nome
                        </th>
                        <th>
                          Ultimo nome &nbsp;&nbsp;
                        </th>
                        <th>
                          Email
                        </th>
                       
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
    <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input defaultValue="" type="checkbox"></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
    <td>{tipo}</td>
    <td>{data.Pessoa.PNome}</td>
    <td>{data.Pessoa.UNome}</td>
    <td>{data.Pessoa.Email}</td>


<td className="td-actions text-right">
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-537440761">
                                Aceitar
                              </Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="info"
                               onClick={()=>this.onAdd(data.id)}

                            >
                              <i className="fas fa-check"></i>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            overlay={
                              <Tooltip id="tooltip-21130535">Remover</Tooltip>
                            }
                          >
                            <Button
                              className="btn-simple btn-link p-1"
                              type="button"
                              variant="danger"
                              onClick={()=>this.onDelete(data.id)}
                            >
                              <i className="fas fa-times"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
    </tr>
    )
    });
  }
  onDelete(id){
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
    const baseUrl = "http://localhost:3000/Filme/delete" 
    axios.post(baseUrl,{
      id:userId
    })
    .then(response =>{
      if (response.data.success) {
      Swal.fire('Apagado!','O pedido foi apagado com sucesso')
      this.loadFilme()
      }
    }).catch ( error => {
      alert("Error 325 ")
    })    
  }   
  onAdd(id){
    Swal.fire({
      title: 'Tem a certeza?',
      text: 'O pedido será aceite',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, aceitar pedido !',
      cancelButtonText: 'Não, manter o pedido.'
    }).then(result => {
    if (result.value) {
      this.sendDelete(id)
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelado','O pedido continua seguro.')
    }
    })
  }
  sendDelete(userId){
    const baseUrl = "http://localhost:3000/Filme/delete" 
    axios.post(baseUrl,{
      id:userId
    })
    .then(response =>{
      if (response.data.success) {
      Swal.fire('Apagado!','O pedido foi apagado com sucesso')
      this.loadFilme()
    }
    })
    .catch ( error => {
      alert("Error 325 ")
    })    
  } 




}
export default home;
