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

class reports extends React.Component{
  onDelete(id){
    Swal.fire({title: 'Tem a certeza?',text: 'O report vai ser apagado',type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, quero apagar !',
      cancelButtonText: 'Não, manter o report.'
    }).then((result) => {
      if (result.value) {
        this.sendDelete(id)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado','O report continua seguro.')
      }
    })
  }
  sendDelete(userId)
  {
    const baseUrl = "http://localhost:3000/Filme/delete" 
    axios.post(baseUrl,{id:userId})
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

  constructor(props){
    super(props)
    this.state = {
      temporeports:7,
      listareports:[],
      localindoorcommaisreports:["sem ifno",0],
      numeroreportsnainstituicao:0,
      locaisindoorereports:{
        labels: ["Cantina ", "Bar","Aula magna","Estacionamento"],
        series: [30, 15,15,40],
      },
      dadosgraficobarras: {
        labels: ["S","T","Q","Q","S","S","D",],
        series: [[20,30,25,80,20,30,25,],],
      }
    }
  }
  componentDidMount(){
    this.obterDadosTabela()
    this.obterDadosGrafico()
  }

  obterDadosGrafico(){
    let dadosjson = {labels:[], series:[[]]}
    let url = 'https://pint2021.herokuapp.com/Instituicao/numero_reports_x_dias/'+localStorage.getItem('idinstituicao')+ '/'+this.state.temporeports
    axios.get(url).then( res=>{
      //console.log(res.data)
      
      var arraylabelsdias = ["Dom","Seg","Ter","Quar","Quin","Sext","Sab"]
      
      console.log(res.data.res)
      for(let dia of res.data.res){
        
        dadosjson.labels.push(arraylabelsdias[dia.diasemana])
        dadosjson.series[0].push(dia.NReports)
        
      }
      
      
      dadosjson.labels.reverse()
      dadosjson.series[0].reverse()
      this.setState({dadosgraficobarras:dadosjson})
      console.log(dadosjson)
    }).catch( err=>{
      console.log(err)
      alert(err)
    })
  }

  obterDadosTabela(){
    const urlgeral = 'http://pint2021.herokuapp.com/'
    const url1 = urlgeral + 'Instituicao/getReportsTodosPorTempo/'+localStorage.getItem('idinstituicao')
    let body = {tempo:this.state.temporeports, tipoTempo:"dd"}

    axios.put(url1,body).then(res=>{
      console.log(res.data)
      let array = new Array()
      for(let a of res.data.reports)
        if(a.hasOwnProperty('ID_Report_Indoor'))
          array.push(a)
      let locaisindoorpiechar={labels:[],series:[]}
      for(let a of array){
        locaisindoorpiechar.labels.push(a.Local_Indoor.Nome)
        let nreportsdesselocal = 0
        for(let b of array)
          if(b.Local_Indoor.ID_Local_Indoor === a.Local_Indoor.ID_Local_Indoor)
            nreportsdesselocal++
        locaisindoorpiechar.series.push(nreportsdesselocal)
      }
      let max = -1, maxindex = 0
      for(let i = 0; i<locaisindoorpiechar.series.length;i++)
        if(max<=locaisindoorpiechar.series[i])
          {max=locaisindoorpiechar.series[i]; maxindex = i}

      this.setState({
        listareports:res.data.reports,
        numeroreportsnainstituicao:res.data.reports.length,
        locaisindoorereports:locaisindoorpiechar,
        localindoorcommaisreports:[locaisindoorpiechar.labels[maxindex],locaisindoorpiechar.series[maxindex]]
      })
      
    }).catch(error => {
      alert(error)
    });

  }


  loadDadosTabela(){ 
    return this.state.listareports.map((data,index)=>{
      let tipoReport = 0,tipoReportstring="" //1-rep outdoor outros, 2 rep outdoor util inst, 3 - rep indoor
      if(data.hasOwnProperty('ID_Report_Out_Util'))
        {tipoReport =1; tipoReportstring="Report Outdoor Outro Util"}
      else if (data.hasOwnProperty('ID_Report_Out_Insti'))
        {tipoReport = 2; tipoReportstring="Report Outdoor Util Inst"}
      else {tipoReport = 3; tipoReportstring="Report Indoor"}
      let nome, local, datarep, descricao 
      switch(tipoReport){
        case 1:{
          nome = data.Outros_Util.Pessoa.PNome + ' ' +data.Outros_Util.Pessoa.UNome
          local = data.Local.nome
          datarep = data.Report.Data.split('T')[0] +' ' +data.Report.Data.split('T')[1]
          descricao = data.Report.Descricao
          break;
        }
        case 2:{
          nome = data.Utils_Instituicao.Pessoa.PNome + ' ' +data.Utils_Instituicao.Pessoa.UNome
          local = data.Local.nome
          datarep = data.Report.Data.split('T')[0] +' ' +data.Report.Data.split('T')[1]
          descricao = data.Report.Descricao
          break;
        }
        case 3:{
          nome = data.Utils_Instituicao.Pessoa.PNome + ' ' +data.Utils_Instituicao.Pessoa.UNome
          local = data.Local_Indoor.nome
          datarep = data.Report.Data.split('T')[0] +' ' +data.Report.Data.split('T')[1]
          descricao = data.Report.Descricao
          break;
        }
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
          <td>
            {nome}
          </td>
          <td>
            {local}
          </td>
          <td>
            {tipoReportstring}
          </td>
          <td>
            {datarep}
          </td>
          <td>
            {descricao}
          </td>
        </tr>
      )

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
              
              <p className="first_titulo">Zonas com maior número de Reports</p>
                <hr></hr>
                
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                    data={this.state.locaisindoorereports}
                    type="Pie"
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>

           <Col lg="3" sm="6">  {/*coluna Estatisticas Diárias*/}
            <Card className="card-stats">
              <Card.Body>
                <Row>
                    <div className="numbers">
                      <p className="first_titulo">Reports da Instituição</p>
                      
                      <p className="secound_titulo">Nº total de  reportes na Instituição: </p>
                      <Card.Title><h3 className="aligncenter">{this.state.numeroreportsnainstituicao}</h3></Card.Title>    
                    <div class="container">
                     <a class="button6" href="#popup1">Alterar limites de lotação</a>
                    </div>
                    <hr/>
                      <p className="first_titulo">Zona com mais reports: </p>
                      <p className="secound_titulo">{this.state.localindoorcommaisreports[0]} </p>
                      <Card.Title><h3 className="aligncenter">{this.state.localindoorcommaisreports[1]}</h3></Card.Title>
                      <br/>
                    </div>

                </Row>
              </Card.Body>  
            </Card>
          </Col>   {/*coluna Estatisticas Diárias*/}


<Col md="5">
            <Card>
              <Card.Header>

              <p className="first_titulo_esquerda">&nbsp;&nbsp;&nbsp;&nbsp;Análise Reports da Semana:
     </p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                  <ChartistGraph
                    data={this.state.dadosgraficobarras}
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
          <Col md="12">
            <Card className="card-tasks">
              <Card.Header>
                <p className="first_titulo_esquerda">Lista de Reports:
              <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdown_style_utilizadorespendentes">
    Ordenar por
  </Dropdown.Toggle>
  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Data Asc.</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Data Desc.</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>    
</p>
 
                <br/>
                <div class="input-group">
                      <div class="form-outline">
                        <input id="search-input" type="search" id="form1" class="form-control" placeholder="Search"></input>
                     </div>
                      <button id="search-button" type="button" class="btn btn-primary">
                        <i class="fas fa-search"></i>
                     </button>
                    </div>
              </Card.Header>

              <Card.Body>
                <div id="table-scroll">
                  <Table id="table-scroll">
                    <tbody id="table-scroll">
                    <tr>
                        <th></th>
                        <th>Utilizador</th>
                        <th>Local</th>
                        <th>Tipo report</th>
                        <th>Data</th>
                        <th>Descrição</th>
                        <th>Excluir</th>
                    </tr>
                      {this.loadDadosTabela()}
                    
                    </tbody>
                  </Table>
                </div>

                <br/><br/>


      <div id="popup1" class="overlay">
  <div class="popup">
    <h2>Limite de lotação</h2>
    <a class="close" href="#">&times;</a>
    <div class="content">
      <p>Alterar limite de lotação da Instituição:</p>
    </div>
    <Form>
    <Row>
    
                  <Col md="3" >
                      <p3>Pouco</p3>
                      <br></br>
                      <input style={{width:'115%'}} type="number" id="InstituicaoPouco" name="InstituicaoPouco"></input>

                  </Col>
                 
                  <Col md="3">
                  <p3>Moderado</p3>
                      <br></br>
                      <input style={{width:'115%'}} type="number" id="InstituicaoPouco" name="InstituicaoPouco"></input>
                  </Col>
                  
                  <Col md="3">
                  <p3>Elevado</p3>
                      <br></br>
                      <input style={{width:'115%'}} type="number" id="InstituicaoPouco" name="InstituicaoPouco"></input>
                  </Col>

                  </Row>
                  

               <br/>
                  <Button
                    className="btn-fill pull-left" 
                    type="submit"
                    variant="info"
                  >
                    Alterar lotação
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
export default reports;
