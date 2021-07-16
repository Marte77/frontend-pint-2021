import React from "react";
import ChartistGraph from "react-chartist";
import './style_auxiliar.css';
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


class lotacao extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      listindoor:[],
      dadostabelas:[],
      numerolocaisoutdoor:0,
      numerolocaisindoor:0
    }
  }

  componentDidMount(){
    const idinst=localStorage.getItem('idinstituicao');

    const url = "http://pint2021.herokuapp.com/Locais/get_lista_locais_indoor_local/"+idinst;
    axios.get(url).then(res => {
      if(res.data){
        const data = res.data.data;
        this.setState({ listindoor:data });
      }
      else{
        alert("No data");
      }
      console.log(res)
    })
    .catch(error => {
      alert(error)
    });
    this.obterDadosTabelas('2021-07-01','2021-07-16')
  }

  obterDadosTabelas(dataliminf, datalimsup){
    const url = 'http://pint2021.herokuapp.com/Locais/get_dados_tabela_lotacao/'+localStorage.getItem('idinstituicao')+ '/'+dataliminf + '/'+ datalimsup+'/'
    axios.get(url).then(res=>{
      this.setState({dadostabelas:res.data})
    }).catch(err=>{
      console.log(err)
      alert(err)
    })
  }

  loadTabelaCrowdZero(isCrowdZero){
    if(this.state.dadostabelas.length ===0)
      return
    let arraycomtodos = new Array()
    
    if(isCrowdZero)
      this.state.dadostabelas.ZonasCrowdZero[0].ZonasOutdoor.forEach(element => {
        arraycomtodos.push(element)
      });
    //this.state.dadostabelas.ZonasNotCrowdZero.ZonasOutdoor.forEach(element => {
    //  arraycomtodos.push(element)
    //});
    
    
    this.state.dadostabelas.ZonasCrowdZero[0].ZonasIndoor.forEach(element => {
      arraycomtodos.push(element)
    });
    if(!isCrowdZero)
      this.state.dadostabelas.ZonasNotCrowdZero.ZonasIndoor.forEach(element => {
        arraycomtodos.push(element)
      });
    return arraycomtodos.map((data,index)=>{
        if(data.hasOwnProperty('Local'))//é local outdoor
        {
          let totreports = data.Nreports[0][0] +data.Nreports[1][1]+data.Nreports[2][1]
          return (
            <tr key = {index}>
              <td>
                {data.Local.Nome}
              </td>
              <td>
                {totreports}
              </td>
              <td>
                {data.Nreports[0][1]}
              </td>
              <td>
                {data.Nreports[1][1]}
              </td>
              <td>
                {data.Nreports[2][1]}
              </td>
              <td>
                obter data desinfecao
              </td>
            </tr>
          )
        }else{
          let totreports = data.Nreports[0][0] +data.Nreports[1][1]+data.Nreports[2][1]
          return (
            <tr key = {index}>
              <td>
                {data.LocalIndoor.Nome}
              </td>
              <td>
                {totreports}
              </td>
              <td>
                {data.Nreports[0][1]}
              </td>
              <td>
                {data.Nreports[1][1]}
              </td>
              <td>
                {data.Nreports[2][1]}
              </td>
              <td>
                obter data desinfecao
              </td>
            </tr>
          )  
      }
    })
    
  }
  


  render(){
  return (
    <>
      <Container fluid>
<Row>
<Col md="4">
            <Card>
              <Card.Header>
              
              <p className="first_titulo">Lotação na Instituicao: Interior</p>
                <hr></hr>
                
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                    data={{
                      labels: ["30%", "5%","5%","30%","10%","20%"],
                      series: [30, 5,5,30,10,20],
                    }}
                    type="Pie"
                  />
                </div>
                <div className="legend">
                  
                  <i className="fas fa-circle text-info"></i>Utilizadores Instituição  <br/>
                  <i className="fas fa-circle text-info"></i> Registos Globais
                  
                </div>  
              </Card.Body>
            </Card>
          </Col>

<Col md="4">
            <Card>
              <Card.Header>
              
              <p className="first_titulo">Lotação na Instituicao: Exterior</p>
                <hr></hr>
                
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                    data={{
                      labels: ["90%", "5%","5%"],
                      series: [90, 5,5],
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
 <Container fluid>
    <Row>
          <Col md="12">
            <Card className="card-tasks">
              <Card.Header>
              <br/>
                <p className="first_titulo_esquerda">&nbsp;&nbsp;&nbsp;Zonas Indoor
                <Dropdown>
               <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdown_stylev2">
                 Tipo
               </Dropdown.Toggle>
               <Dropdown.Menu>
                 <Dropdown.Item href="#/action-1">Total</Dropdown.Item>
                 <Dropdown.Item href="#/action-2">Pouco populado</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Muito populado</Dropdown.Item>
                   <Dropdown.Item href="#/action-2">Extremante populado</Dropdown.Item>
               </Dropdown.Menu>
             </Dropdown>    
              <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdown_style_utilizadorespendentes">
    Ordenar por
  </Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Asc.</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Desc.</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>    
</p>                
              </Card.Header>
<br/>
              <Card.Body>
                <div id="table-scroll">
                  <Table id="table-scroll">
                    <tbody id="table-scroll">
                    <tr>
                        
                        <th className="th">Local</th>
                        <th>Total</th>
                        <th>Pouco populado</th>
                        <th>Muito populado</th>
                        <th>Extemamente populado</th>
                        <th>Data/hora última desinfeção</th>
                        <th></th>

                    </tr>
                      {this.loadTabelaCrowdZero(false)}
                    </tbody>
                  </Table>
                </div>
                

              </Card.Body>
               
              <br/><br/>
              <Card.Header>
              <br/>
                <p className="first_titulo_esquerda">&nbsp;&nbsp;&nbsp;Zonas CrowdZero
              <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdown_stylev2">
                 Tipo
               </Dropdown.Toggle>
               <Dropdown.Menu>
                 <Dropdown.Item href="#/action-1">Total</Dropdown.Item>
                 <Dropdown.Item href="#/action-2">Pouco populado</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Muito populado</Dropdown.Item>
                   <Dropdown.Item href="#/action-2">Extremante populado</Dropdown.Item>
               </Dropdown.Menu>
             </Dropdown>    
              <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdown_style_utilizadorespendentes">
    Ordenar por
  </Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Asc.</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Desc.</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>    
</p>                
              </Card.Header>
<br/>
              <Card.Body>
                <div id="table-scroll">
                  <Table id="table-scroll">
                    <tbody id="table-scroll">
                      <tr>
                        <th className="th">Local</th>
                        <th>Total</th>
                        <th>Pouco populado</th>
                        <th>Muito populado</th>
                        <th>Extemamente populado</th>
                        <th>Data/hora última desinfeção</th>
                        <th></th>
                      </tr>
                      {this.loadTabelaCrowdZero(true)}
                    </tbody>
                  </Table>
                </div>
                

              </Card.Body>
            </Card>
          </Col>
          </Row>
     </Container>
      </Container>
    </>
  );
}
}
export default lotacao;
