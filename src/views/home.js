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
// lista utilizadores em espera
constructor(props){
super(props);
this.state = {
listUtilsEspera:[]
}
}
componentDidMount(){
    this.PedidoUtilsEspera();
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
    }
    })
    .catch(error => {
    alert(error)
    });
    }
//fim lista de utilizadores em espera

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
         <Col md="7">
            <Card>
              <Card.Header>

              <p className="first_titulo_esquerda">Reportes:
              <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdown_style">
    Periodo de Tempo
  </Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Tempo real</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Hoje</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Esta semana</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown></p>

                
                <p className="card-category">Todos os reportes do local:</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                  <ChartistGraph
                    data={{
                      labels: [
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
                      ],
                      series: [
                        [
                          542,
                          443,
                          320,
                          780,
                          553,
                          453,
                          326,
                          434,
                          568,
                          610,
                          756,
                          895,
                        ],
                      ],
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
</Dropdown></p>
                <p className="card-category">Dados dos últimos 7 dias</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" /*id="chartHours"*/>
                  <ChartistGraph
                    data={{
                      labels: [
                        "S",
                        "T",
                        "Q",
                        "Q",
                        "S",
                        "S",
                        "D",
                      ],
                      series: [
                        [287, 385, 490, 492, 554, 586, 698],
                        /*[67, 152, 143, 240, 287, 335, 435],
                        [23, 113, 67, 108, 190, 239, 307],*/
                      ],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 800,
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
                    data={{
                      labels: ["90%", "10%"],
                      series: [90, 10],
                    }}
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
        sendDelete(userId)
        {
        const baseUrl = "http://localhost:3000/Filme/delete" 
        axios.post(baseUrl,{
        id:userId
        })
        .then(response =>{
        if (response.data.success) {
        Swal.fire(
        'Apagado!',
        'O pedido foi apagado com sucesso'
        )
        this.loadFilme()
        }
        })
        .catch ( error => {
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
        sendDelete(userId)
        {
        const baseUrl = "http://localhost:3000/Filme/delete" 
        axios.post(baseUrl,{
        id:userId
        })
        .then(response =>{
        if (response.data.success) {
        Swal.fire(
        'Apagado!',
        'O pedido foi apagado com sucesso'
        )
        this.loadFilme()
        }
        })
        .catch ( error => {
        alert("Error 325 ")
        })    
    } 




}
export default home;
