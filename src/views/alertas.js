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
        alert("Criado com sucesso")
        window.location.reload()
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
              </p>
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
