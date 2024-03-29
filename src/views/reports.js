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
      console.log(id)
      if (result.value) {
        this.sendDelete(id)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado','O report continua seguro.')
      }
    })
  }
  sendDelete(userId)
  {
    const baseUrl = "http://pint2021.herokuapp.com/Report/apgar_report/"+userId 
    axios.delete(baseUrl)
    .then(response =>{
      if (response.data.success) {
        Swal.fire('Apagado!','O pedido foi apagado com sucesso')
        this.obterDadosTabela()
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
      
      let array = new Array()
      for(let a of res.data.reports)
        if(a.hasOwnProperty('ID_Report_Indoor'))
          array.push(a)
      let locaisindoorpiechar={labels:[],series:[]}
      for(let a of array){
        if(locaisindoorpiechar.labels.findIndex(element => element === a.Local_Indoor.Nome ) === -1){
          locaisindoorpiechar.labels.push(a.Local_Indoor.Nome)
          locaisindoorpiechar.series.push(1)
        }
        else {
          let index = locaisindoorpiechar.labels.findIndex(element => element === a.Local_Indoor.Nome )
          locaisindoorpiechar.series[index] = locaisindoorpiechar.series[index] + 1
        }
      }



      let max = -1, maxindex = 0
      for(let i = 0; i<locaisindoorpiechar.series.length;i++)
        if(max<=locaisindoorpiechar.series[i])
          {max=locaisindoorpiechar.series[i]; maxindex = i}

      this.setState({
        listareports:res.data.reports,
        numeroreportsnainstituicao:res.data.reports.length,
        locaisindoorereports:locaisindoorpiechar,
        localindoorcommaisreports:[locaisindoorpiechar.labels[maxindex],max]
      })
      console.log(1,locaisindoorpiechar)
      
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
      console.log(data)
      let nome, local, datarep, descricao, idreport
      switch(tipoReport){
        case 1:{
          nome = data.Outros_Util.Pessoa.PNome + ' ' +data.Outros_Util.Pessoa.UNome
          local = data.Local.Nome
          datarep = data.Report.Data.split('T')[0] +' ' +data.Report.Data.split('T')[1]
          descricao = data.Report.Descricao
          idreport = data.Report.ID_Report
          break;
        }
        case 2:{
          nome = data.Utils_Instituicao.Pessoa.PNome + ' ' +data.Utils_Instituicao.Pessoa.UNome
          local = data.Local.nome
          datarep = data.Report.Data.split('T')[0] +' ' +data.Report.Data.split('T')[1]
          descricao = data.Report.Descricao
          idreport = data.Report.ID_Report
          break;
        }
        case 3:{
          nome = data.Utils_Instituicao.Pessoa.PNome + ' ' +data.Utils_Instituicao.Pessoa.UNome
          local = data.Local_Indoor.Nome
          datarep = data.Report.Data.split('T')[0] +' ' +data.Report.Data.split('T')[1]
          descricao = data.Report.Descricao
          idreport = data.Report.ID_Report
          break;
        }
      }
      return(
        <tr key={index}>
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
          <td className="td-actions text-right">
            <OverlayTrigger
              overlay={
                <Tooltip id="tooltip-21130535">Remover</Tooltip>
              }>
              <Button
                className="btn-simple btn-link p-1"
                type="button"
                variant="danger"
                onClick={()=>this.onDelete(idreport)}
              >
                <i className="fas fa-times"></i>
              </Button>
            </OverlayTrigger>
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
    
</p>
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
