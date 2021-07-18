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
      numerolocaisindoor:0,
      arrayalertas:[]
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
    this.obterAlertasMaisRecentes()
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

  obterAlertasMaisRecentes(){
    const url = 'http://pint2021.herokuapp.com/Alertas/get_ultimo_alerta_desinfecao/'+localStorage.getItem('idinstituicao')
    axios.get(url).then( res=>{
      this.setState({arrayalertas:res.data.Alertas})
    }).catch(err=>{
      console.log(err)
      alert(err)
    })
  
  }

  loadTabelaCrowdZero(isCrowdZero){
    if(this.state.dadostabelas.length ===0 || this.state.arrayalertas.length ===0 )
      return
    let arraycomtodos = new Array()
    let arrayalertas = this.state.arrayalertas
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
          let alerta
          for(let alertas of arrayalertas){
            if(data.Local.ID_Local === alertas.Local.ID_Local)
              alerta = alertas
          }
          if(alerta.alerta.length === 0)
            alerta = 'Erro'
          else alerta = alerta.alerta[0].Data.split('T')[0]
          
          let totreports = data.Nreports[0][1] +data.Nreports[1][1]+data.Nreports[2][1]
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
                {alerta}
              </td>
            </tr>
          )
        }else{
          let totreports = data.Nreports[0][1] +data.Nreports[1][1]+data.Nreports[2][1]
          
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
                LocalIndoor nao suporta Alerta
              </td>
            </tr>
          )  
      }
    })
    
  }
  
  loadPieChartLotacaoInterior(){
    if(this.state.dadostabelas.length === 0)
      return
    let jsonreturn = {labels:[],series:[]}
    let dadostabelas = this.state.dadostabelas
    let arrayLocaisIndoor = new Array()
    let nreportstotal = 0
    for(let local of dadostabelas.ZonasCrowdZero[0].ZonasIndoor)
      {
        nreportstotal = nreportstotal + local.Nreports[0][1] +local.Nreports[1][1] + local.Nreports[2][1]
        arrayLocaisIndoor.push([local.LocalIndoor.Nome,local.Nreports[0][1] +local.Nreports[1][1] + local.Nreports[2][1]])
      }
    for(let local of dadostabelas.ZonasNotCrowdZero.ZonasIndoor){
        nreportstotal = nreportstotal + local.Nreports[0][1] +local.Nreports[1][1] + local.Nreports[2][1]
        arrayLocaisIndoor.push([local.LocalIndoor.Nome,local.Nreports[0][1] +local.Nreports[1][1] + local.Nreports[2][1]])
    }
    for(let a of arrayLocaisIndoor){
      if(a[1]>0){
        jsonreturn.labels.push(a[0])
        jsonreturn.series.push(a[1]/nreportstotal * 100)
      }
    }
    return jsonreturn
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
                    data={this.loadPieChartLotacaoInterior()}
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
