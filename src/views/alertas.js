import React from "react";
import ChartistGraph from "react-chartist";
import './style_auxiliar.css';
import './style_popup.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
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


class alertas extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      listalertas:[],
      listaalerta:[],
      listatipo:[],
      listalocais:[],
      listatotais:[],
      totais:[],
      campotipo:"",
      campolocal:"",
      updatecampo:"",
    }
  }

  totais(){
    let returnjson = {
      labels: [],
      series: [[],],
    }
    for(let a of this.state.totais){
      returnjson.labels.push(a.NomeLocal)
      returnjson.series[0].push(a.NumeroAlertas)
    }
    return returnjson
  }

  componentDidMount(){
    const idinst=localStorage.getItem('idinstituicao');

    const url = "http://pint2021.herokuapp.com/Alertas/listalertas/"+idinst;
    axios.get(url).then(res => {
      if(res.data){
        const data = res.data.Alertas;
        this.setState({ listalertas:data });
      }
      else{
        alert("No data");
      }
      console.log(res)
    })
    .catch(error => {
      alert(error)
    });


    const url1 = "http://pint2021.herokuapp.com/Alertas/gettipoalerta";
    axios.get(url1).then(res => {
      if(res.data){
        const data = res.data.ListipoAlertas;
        this.setState({ listatipo:data });
      }
      else{
        alert("No data");
      }
      console.log(res)
    })
    .catch(error => {
      alert(error)
    });


    const url2 = "http://pint2021.herokuapp.com/Alertas/totalalertaslocais/"+idinst;
    axios.get(url2).then(res => {
      if(res.data){
        const data = res.data.alertas;
        this.setState({ totais:data });
      }
      else{
        alert("No data");
      }
      console.log(res)
    })
    .catch(error => {
      alert(error)
    });
  }


  gettIPO(ID)
    {
        const url="http://pint2021.herokuapp.com/Alertas/getalerta/"+ID
        axios.get(url)
          .then(res=>{
          if (res.data) {
              const data = res.data.Tipo
              this.state.campolocal= data[0].Local.Nome
              this.state.campotipo= data[0].Tipo_Alerta.Tipo_Alerta
            console.log('HEY', )
            console.log(JSON.stringify(data))
          }
          else {
            alert("Error web service")
          }
          })
            .catch(error=>{
            alert("Error server: "+error)
          })
    }

  loadFillAlerta(){
    var date= ""
    var mes=0
    return this.state.listalertas.map((data, index)=>{
      return(
        date = data.Data,
           mes = new Date(date).getMonth()+1,
           date = new Date(date).getDate() + "-" + mes + "-"+ new Date(date).getFullYear(),
        <tr key={index}>
            <td>{date}</td>
            <td>{data.Local.Nome}</td>
            <td>{data.Tipo_Alerta.Tipo_Alerta}</td>  
            <td>
              <a class="" href="#popup2" onClick={()=>this.gettIPO(data.ID_alerta)} ><i class="fas fa-edit"></i></a>
            </td>
        </tr>
        )
    });
  }

  loadFillTipo(){
    var date= ""
    var mes=0
    return this.state.listatipo.map((data, index)=>{
      return(
        <tr>
        <td></td>
        <td>
          {data.Tipo_Alerta}
        </td>
      </tr>
        )
    });
  }

  sendSaveTipo()
  {
    if (this.state.campotipo === "")
      alert("Inserir dado!")
    else{
      
    const url2 = "http://pint2021.herokuapp.com/Alertas/createTipoAlerta";
    const datpost={
      Tipo_Alerta:this.state.campotipo
    }
    axios.post(url2, datpost)
    .then(res => {
      if(res.data){
        this.componentDidMount()
      }
      else{
        alert("No data");
      }
      console.log(res)
    })
    .catch(error => {
      alert(error)
    });
    }
  }


   render(){
  return (
    <>
<Row>
<Col md="6">
            <Card>
              <Card.Header>

              <p className="first_titulo_esquerda">&nbsp;&nbsp;&nbsp;&nbsp;Total de Desinfeções:
              <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdown_style">
    Periodo de Tempo
  </Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Tempo real</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Hoje</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Esta semana</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Este mês</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Últimos 3 meses</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown></p>

                
                <p className="card-category">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Filtrar por intervalo de tempo)</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                  
                  <ChartistGraph
                    data={this.totais()}
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
          <Col md="6">
            <Card className="card-tasks">
              <Card.Header>
                <p className="first_titulo_esquerda">Definições de alertas
               
              </p>
                <p className="card-category">Faça a gestão do tipo de alertas</p>
              </Card.Header>
              <Card.Body>
                <div id="table-scroll">
                  <Table id="table-scroll">
                    <tbody id="table-scroll">
                      {this.loadFillTipo()}
                    </tbody>
                  </Table>
                </div>
                <a class="button2"  href="#popup1" >Criar Alerta</a>           
                <br/><br/>
              </Card.Body>
              
            </Card>
          </Col>
</Row>




      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-tasks">
              <Card.Header>
              <br/>
                <p className="first_titulo_esquerda">&nbsp;&nbsp;&nbsp;Alertas
              <Dropdown>
</Dropdown>    
</p>                
              </Card.Header>
<br/>
              <Card.Body>
                <div id="table-scroll">
                  <Table id="table-scroll">
                    <tbody id="table-scroll">
                    <tr>
                        
                        <th className="th">Data</th>
                        <th>Local</th>
                        <th>Tipo alerta</th>
                    </tr>
                     {this.loadFillAlerta()}
                    </tbody>
                  </Table>
                </div>
                

              </Card.Body>
            </Card>
          </Col>
        </Row>

<Row>
          <Col md="12">
            <Card className="card-tasks">
              <Card.Header>
                <p className="first_titulo_esquerda">Alertar Locais existentes: 
              <Dropdown>
</Dropdown>    
</p>
 
                <p className="card-category">Faça a emissão de alertas (densidade / desinfeção)</p>

              </Card.Header>

              <Card.Body>
                <div id="table-scroll">
                  <Table id="table-scroll">
                    <tbody id="table-scroll">
                    <tr>
                        <th></th>
                        <th>Local</th>
                        <th>Total Alertas</th>
                        <th>Pouco populado</th>
                        <th>Muito populado</th>
                        <th>Extemamente populado</th>
                        <th>Data última desinfeção</th>
                        <th></th>

                    </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input defaultValue="" type="checkbox"></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Palácio do gelo
                        </td>
                        <td>
                          1234
                        </td>
                        <td>
                          12
                        </td>
                        <td>
                          3
                        </td>
                        <td>
                          1
                        </td>
                         <td>
                           23/03/2019
                        </td>
                        <td></td>
                       <td></td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input defaultValue="" type="checkbox"></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Palácio do gelo
                        </td>
                        <td>
                          1234
                        </td>
                        <td>
                          12
                        </td>
                        <td>
                          3
                        </td>
                        <td>
                          1
                        </td>
                         <td>
                           23/03/2019
                        </td>
                       <td></td>
                       <td></td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Check className="mb-1 pl-0">
                            <Form.Check.Label>
                              <Form.Check.Input defaultValue="" type="checkbox"></Form.Check.Input>
                              <span className="form-check-sign"></span>
                            </Form.Check.Label>
                          </Form.Check>
                        </td>
                        <td>
                          Palácio do gelo
                        </td>
                        <td>
                          1234
                        </td>
                        <td>
                          12
                        </td>
                        <td>
                          3
                        </td>
                        <td>
                          1
                        </td>
                         <td>
                           23/03/2019
                        </td>
                       <td></td>
                       <td></td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                 <a class="button_adicionarv2" href="#popup3">Alertar zonas selecionadas</a>
                <br/><br/>


      <div id="popup1" class="overlay">
  <div class="popup">
    <h2>Tipo de alerta</h2>
    <a class="close" href="#">&times;</a>
    <div class="content">
      <p>Adicionar um novo tipo de alerta:</p>
    </div>
    <Form>
                  <Row>
                    <Col className="pr-1" md="10">
                      <Form.Group>
                        <label>Tipo de alerta</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Nome tipo de alerta"
                          type="text"
                          onChange={(value)=>this.setState({campotipo:value.target.value})}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

               <br/>
                  <Button
                    className="btn-fill pull-left" 
                    type="submit"
                    variant="info"
                    onClick={()=>this.sendSaveTipo()}
                  >
                    Inserir
                  </Button>
                  
                  </Form>
  </div>
</div>
<div id="popup2" class="overlay">
  <div class="popup">
    <h2>Atualizar alerta</h2>
    <a class="close" href="#">&times;</a>
    <div class="content">
    </div>
    <Form>
                  <Row>
                    <Col className="pr-1" md="10">
                      <Form.Group>
                        <label>Tipo de alerta</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Nome tipo de alerta"
                          type="text"
                          value={this.state.campotipo}
                          onChange={(value)=>this.setState({campotipo:value.target.value})}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="10">
                      <Form.Group>
                        <label>Local</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Nome do local"
                          type="text"
                          value={this.state.campolocal}
                          onChange={(value)=>this.setState({campolocal:value.target.value})}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

               <br/>
                  <Button
                    className="btn-fill pull-left" 
                    type="submit"
                    variant="info"
                  >
                    Atualizar
                  </Button>
                  
                  </Form>
  </div>
</div>
<div id="popup3" class="overlay">
  <div class="popup">
    <h2>Alertar locais</h2>
    <a class="close" href="#">&times;</a>
    <div class="content">
      <p>Alertar zonas selecionadas:</p>
    </div>
    <Form>
                 
                   <Row>
                    <Col className="pr-1" md="10">
                    <Form.Group>
                        <label>Tipo de alertas:</label>
                        <br/>
                   <select>
                     <option value="1">Alerta baixa lotacao</option>
                    <option  value="2">Alerta baixa lotacao</option>
                    <option  value="3">Alerta baixa lotacao</option>
                  </select>
                
                      </Form.Group>

                    </Col>
                  </Row>
                   <Row>
                    <Col className="pr-1" md="10">
                      <Form.Group>
                        <label>Descricao</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Descricao do alerta"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>


               <br/>
                  <Button
                    className="btn-fill pull-left" 
                    type="submit"
                    variant="info"
                  >
                    Alertar locais
                  </Button>
                  
                  </Form>
  </div>
</div>


              </Card.Body>
              
            </Card>
          </Col>
          </Row>

      </Container>

    </>
  );
}
}
export default alertas;
