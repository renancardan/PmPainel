import React, {useState, useEffect} from 'react';
import Api from '../../Api';
import Butao from '../../Components/Butao_list';
import Campo from '../../Components/Campo';
import Header from '../../Components/Header';
import Select from '../../Components/Select';
import DataTime from '../../Components/DateFormat';
import Maps from '../../Components/maps';
import ChatWindow from '../../Components/ChatVirzul'


export default ({Dados, Avisando, Fechar, Id, setAlert, setAlertTipo, Alert, AlertTipo, }) => {
  const [Infor, setInfor] = useState("nulo");
  const [Grupo, setGrupo] = useState();
  const [ListGrupo, setListGrupo] = useState([]);
  const [AtuaMaps, setAtuaMaps] = useState(false);
  const [MapsCaixa, setMapsCaixa] = useState(false);
  const [Loc, setLoc] = useState({});

  useEffect(() => {
    if(Infor.localizacao){
      setLoc(Infor.localizacao);
    }
    }, [Infor]);


 useEffect(() => {
 Vizualizar();
 }, []);

 useEffect(() => {
listandoGrupos();
  }, []);

  const MsgBloque = ()=>{
      setAlert("Ok");
      setAlertTipo("BloqueioCont");
  }

  const listandoGrupos = ()=>{
    Api.Gruposconta(Dados, setListGrupo);
  }

  const AbrirMaps = ()=>{
    setAtuaMaps(true);
    setMapsCaixa(!MapsCaixa);
   
  }
 

 
 
  const Vizualizar = async ()=>{
    
    if (navigator.onLine) {
      
      await Api.VizualizandoOcorren(Id, Dados, setInfor);
      
     } else {
       setAlert("Sem Internet");
       setAlertTipo("danger");
     }
  }

  

  

        return (
            <>
<div className="content-wrapper">
  {/* Content Header (Page header) */}
  <Header 
  Titulo={"Vizualizando Ocorrência"}
  Avisando={Avisando}
  Fechar={Fechar}
  />

{Infor !== "nulo" &&
    <section className="content">
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          
          {/* Main content */}
          <div className="invoice p-3 mb-3">
                {/* title row */}
                <div className="row">
                  <div className="col-12">
                    <h4>
                      <i className="fas fa-university" /> Instituição {Dados.instituicao} 
                    </h4>
                  </div>
                  {/* /.col */}
                </div>
                {/* info row */}
               
                <div className="row invoice-info">
                  <div className="col-sm-4 invoice-col">
                    <address>
                      <strong>Nome da Vítima:</strong><br />
                      {Infor.nomevitima}<br />
                      <strong>Cidade:</strong><br />
                      {Infor.cidade}<br />
                      <strong>Estado:</strong><br />
                      {Infor.estado}<br />
                      <strong>Data de Inicio:</strong><br />
                      <DataTime 
                        DateIni={Infor.dataInicio.seconds}
                        />
                      <br />
                      <strong>Data de Finalização:</strong><br />
                      {Infor.ativo === true ?
                      <p>Em Andamento</p>
                      :
                      <DataTime 
                      DateIni={Infor.dataFim.seconds}
                      />
                      }
                     
                      <br />
                     
                    </address>
                  </div>
                  {/* /.col */}
                  <div className="col-sm-4 invoice-col">
                   
                       <address>
                      <strong>Condicionais</strong><br />
                      {Infor.condicionais &&
                      <>
                         {Infor.condicionais.map((item, key)=>(
                          <>
                          <string>{item.nome}</string> <br />
                          </>
         
                        ))}
                      </>
                      }
                     
                      
                      
                     </address>
                  
                   
                  </div>
                  {/* /.col */}
                  <div className="col-sm-4 invoice-col">
                    <address>
                     
                      
                    </address>
                  </div>
                  
                  {/* /.col */}
                </div>
               
               
                <div className="row no-print">
                  <div className="col-12">
                
                  
                     
                   
                  </div>
                </div>
                <div className="card ">
                 <div className="app-window">
                <div className="contentarea">
                {Id !== null &&
                        <>
                        <ChatWindow
                        data={Id}
                        setActiveChat={null}
                        setAlert={setAlert}
                        setAlertTipo={setAlertTipo}
                        Alert={Alert}
                        AlertTipo={AlertTipo}
                        AbrirMaps={AbrirMaps} 
                        MapsCaixa={MapsCaixa}
                        Nome={Infor.nomevitima} 
                        Dados={Dados} 
                        Vizul={Infor.mensagem}
                        Varia={Infor.idvitima}
                        setVizul={null}
                        />
                        {AtuaMaps === true &&
                         <Maps 
                         MapsCaixa={MapsCaixa}
                         Loc={Loc}
                         />
                        }
                       
                        </>
                       }
                      
                </div>
                </div>
                </div>
              </div> 

          {/* /.invoice */}
          
        </div>{/* /.col */}
      
      </div>{/* /.row */}
    </div>{/* /.container-fluid */}
  </section>
}

  {/* /.content */}
</div>
{/* /.content-wrapper */}

            </>
        );
}