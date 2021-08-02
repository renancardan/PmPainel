import React, { useState, useEffect} from 'react';
import RoomIcon from '@material-ui/icons/Room';
import SweetAlert from 'react-bootstrap-sweetalert';
import Modal from 'react-awesome-modal';
import Geocoder from 'react-native-geocoding';
import Api from '../Api';



let recorder = '';

export default ({ AbrirMaps, MapsCaixa, data, Nome, Dados,  setAlert, setAlertTipo, Alert, AlertTipo,  setFormu}) => {
   
    const [User, setUser] = useState('');
    const [list, setList] = useState([]);
    const [Visible, setVisible] = useState(false);
    const [Body, setBody] = useState('');
    const [nome, setnome] = useState(Dados.nome);
    const [TemUmlt, setTemUmlt] = useState('');
    const [DateIni, setDateIni] = useState('');
    const [time, setTime] = useState('');
    const [ListInt, setListInt] = useState([]);
    const [NumOc, setNumOc] = useState(data);
    const [Vtr, setVtr] = useState("");
    const [AtenCop, setAtenCop] = useState("");
    const [CompVt, setCompVt] = useState("");
    const [DateH, setDateH] = useState("");
    const [Verh, setVerh] = useState("");
    const [Periodo, setPeriodo] = useState("");
    const [Horas, setHoras] = useState("");
    const [Rua, setRua] = useState("");
    const [Numero, setNumero] = useState("");
    const [Bairro, setBairro] = useState("");
    const [Cidade, setCidade] = useState("");
    const [Estado, setEstado] = useState("");
    const [Lat, setLat] = useState("");
    const [Lng, setLng] = useState("");
    
    

    useEffect(()=>{ 
       
       PegandoList()
    }, [data]);

    useEffect(()=>{  
       
     }, []);

    useEffect(()=>{  
        ListandoList();
        ListandoTempo();
     }, [list]);

     useEffect(()=>{
        PegDados();
    }, []);

    useEffect(()=>{
        PeriodoHoras();
    }, [Horas]);

    useEffect(() => {
        Geocoder.init('AIzaSyBVYpwN6IT9kjonTs76bq1G9aSxYRhYU7U', {language:'pt-br'});
      }, []);

      useEffect(()=>{
        tempo();
    }, [DateIni]);

    const tempo = ()=>{
        let currentDate = '';
        let mdate ='';
        let Mhora = '';
        let now =new Date(DateIni * 1000);
        let hours = now.getHours();
      
        let minutes = now.getMinutes();
        let Dia = now.getDate();
        let Mes = (now.getMonth()+1);
        let Ano = now.getFullYear(); 
        hours = hours < 10 ? '0'+hours : hours;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        Dia = Dia < 10 ? '0'+Dia : Dia;
        Mes = Mes < 10 ? '0'+Mes : Mes;
        currentDate = Dia+'/'+Mes+'/'+Ano;
        mdate = Dia+'/'+Mes+'/'+Ano;
        setDateH(mdate);
        currentDate += ' ';
        currentDate += hours+':'+minutes;
            Mhora = hours+':'+minutes;
        setVerh( Mhora)
        setTime(currentDate);
        setHoras(hours);
       
        
    }


    const ListandoList = ()=>{
        for(let i in list){
            let listra = [];
            if(list[i].id === data) {
                list[i].nome.forEach(result=>{
                    listra.push({
                       type:result.type,
                       autor:result.autor,
                       body: result.body,
                       date: result.date,
                       nome: result.nome,
                    });
                });
                setListInt(listra);
            }
        }


       
       
      
    }

    const ListandoTempo = ()=>{
        for(let i in list){
            let Temp = [];
            if(list[i].id === data) {  
                setDateIni(list[i].dataIni);
            }
        }


       
       
      
    }
   
    
  

    const PeriodoHoras = ()=>{
        if( Horas >= 6  ) {
            if(Horas < 12 ){
                setPeriodo("Manhã");
            }
           
        }
        if( Horas >= 12  ) {
            if(Horas < 18 ){
                setPeriodo("Tarde");
            }
           
        }

        if( Horas >= 18  ) {
            if(Horas < 24 ){
                setPeriodo("Noite");
            }
           
        }

        if( Horas >= 0  ) {
            if(Horas < 6 ){
                setPeriodo("Madrugada");
            }
           
        }

    }

  

    const PegDados = ()=> {
       
        Api.DadosForm(data, setVtr, setAtenCop, setCompVt, setRua, setNumero, setBairro, setCidade, setEstado, setLat, setLng );
    }

    const EnviandoVtr = ()=> {
        console.log(AtenCop); 
        Api.EnviVtr(data, Vtr, AtenCop, CompVt, Periodo, Rua, Numero, Bairro, Cidade, Estado, Lat, Lng);
    }

   

  

    const PegandoList = ()=>{
        Api.PesquisarConversa(data, Dados, setList, setUser, setTemUmlt, setDateIni);
    }

    

   

   

 

  

  

    const closeModal = ()=>{
            setVisible(false);
            setBody('');
    }

    function Concluir() {
        setAlert("ok");
        setAlertTipo("Concluir");
      }

      const ConclusaoOc = ()=>{
        setAlert(" ");
        setAlertTipo(" ");
        Api.ConcluirOc(data);
    }

    function cancelar() {
        setAlert(" ");
        setAlertTipo(" ");
      }
      const fecharFormu = ()=>{
        setFormu(true);
      }
          
     
    

    return (
        <div className="chatWindow" style={{height: MapsCaixa ? '50%' : '100%'}}>
             { Alert !== " " && AlertTipo === "Concluir" &&
              <SweetAlert
              success
              showCancel
              confirmBtnText="Sim"
              cancelBtnText="Não"
              confirmBtnBsStyle="success"
              onConfirm={()=>ConclusaoOc()}
              onCancel={cancelar}
              focusCancelBtn
            >
              Tem certeza que deseja Concluir a Ocorrencia {Nome}!
            </SweetAlert>
            }
            <Modal visible={Visible} width="500" height="500" effect="fadeInUp" onClickAway={() =>closeModal()}>
                    <div>
                    <video width="500" height="500" controls
                    preload="auto"
                source src={Body} type="video/mp4" type="video/ogg"
                >

                    
               
                </video>
                        <a href="javascript:void(0);" onClick={() => closeModal()}>Close</a>
                    </div>
                </Modal>
            <div className="chatWindow--header">
            <div className="chatWindow--headerinfo">
           
            <div className="chatWindow--name"  style={{margin: '30px'}}>  
            <string className="textTitulo" >Nome: {Nome}</string><br/>
            <string className="textTitulo" >Inicio da ocorrencia: {time}</string>
            </div>
            </div>
            <div className="chatWindow--headerbuttons">
                    <div className="chatWindow--btn3"
                     onClick={null}
                    >
                        <p className="textButao" >CONCLUIDO</p>
                    </div>
                   
                    <div className="chatWindow--btn1"
                     onClick={()=>fecharFormu()}
                    >
                        <p className="textButao" >CHAT</p>
                    </div>
                    
                    <div className="chatWindow--btn"
                    onClick={AbrirMaps}
                    >
                        <RoomIcon style={{color: MapsCaixa?'#5d0bf7':'#919191'}} />
                    </div>

                </div>
            </div>
            <div style={{ overflow: 'auto'}} >
            <div className="chatWindow--body1">
                <h5>Fomulário de Ocorrência</h5>
              
                    <div className="card card-warning">
                    <div className="card-header">
                        <h3 className="card-title">Policias e Vtr da Ocorrência</h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                        
                        <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Nº da Ocorrência</label>
                                <input type="text" 
                                className="form-control"
                                 placeholder="Digite o Numero da Ocorrência..."
                                 value={NumOc}
                                 onChange={t=>setNumOc(t.target.value)}
                                 disabled
                                  />
                            </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group">
                                <label>Vtr</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Digite a Vtr" 
                                value={Vtr}
                                onChange={t=>setVtr(t.target.value)}
                                onBlur={()=>EnviandoVtr()}
                                />
                            </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group">
                                <label>Atendente Copom</label>
                                <textarea 
                                className="form-control" 
                                rows={4} 
                                placeholder="Digite o Nome dos Atendentes ..." 
                                defaultValue={""} 
                                value={AtenCop}
                                onChange={t=>setAtenCop(t.target.value)}
                                onBlur={()=>EnviandoVtr()}
                                />
                            </div>
                            </div>
                            <div className="col-sm-6">
                            {/* text input */}
                            <div className="form-group">
                                <label>Componente da Vtr</label>
                                <textarea 
                                className="form-control" 
                                rows={4} 
                                placeholder="Digite o Nome dos Componentes da Vtr ..." 
                                defaultValue={""}
                                value={CompVt}
                                onChange={t=>setCompVt(t.target.value)}
                                onBlur={()=>EnviandoVtr()}
                                />
                            </div>
                            </div>
                            
                        </div>
                       
                    </div>
                    {/* /.card-body */}
                    </div>
                    <div className="card card-success">
                    <div className="card-header">
                        <h3 className="card-title">Data da Ocorrência</h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Data</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="07/05/2021" 
                                value={DateH}
                                onChange={t=>setDateH(t.target.value)}
                                onBlur={()=>EnviandoVtr()}
                                />
                            </div>
                            </div>
                            <div className="col-sm-6">
                            {/* text input */}
                            <div className="form-group">
                                <label>Hora</label>
                                <input 
                                type="text" 
                                className="form-control"
                                placeholder="15:20:00"
                                value={Verh}
                                onChange={t=>setVerh(t.target.value)}
                                onBlur={()=>EnviandoVtr()}
                                />
                            </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group">
                                <label>Período</label>
                                <input 
                                type="text" 
                                className="form-control"
                                placeholder="15:20:00"
                                value={Periodo}
                                onChange={t=>setPeriodo(t.target.value)}
                                disabled
                                />
                            </div>
                            </div>
                        </div>
                        <div className="row">
                           
                        </div>
                        
                    </div>
                    {/* /.card-body */}
                    </div>
                    <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Endereço da Ocorrência</h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="form-group">
                                <label>Rua</label>
                                <input 
                                type="text"
                                 className="form-control" 
                                 placeholder="Digite o Nome da Rua, ou Avenida..." 
                                 value={Rua}
                                 onChange={t=>setRua(t.target.value)}
                                 onBlur={()=>EnviandoVtr()}
                                 />
                            </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group">
                                <label>Número</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Digite o Número da Casa..." 
                                value={Numero}
                                onChange={t=>setNumero(t.target.value)}
                                onBlur={()=>EnviandoVtr()}
                                />
                            </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group">
                                <label>Bairro</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Digite o Bairro..." 
                                value={Bairro}
                                onChange={t=>setBairro(t.target.value)}
                                onBlur={()=>EnviandoVtr()}
                                />
                            </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group">
                                <label>Cidade</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Digite a Cidade..." 
                                value={Cidade}
                                onChange={t=>setCidade(t.target.value)}
                                onBlur={()=>EnviandoVtr()}
                                />
                            </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group">
                                <label>Estado</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Digite o Estado..." 
                                value={Estado}
                                onChange={t=>setEstado(t.target.value)}
                                onBlur={()=>EnviandoVtr()}
                                />
                            </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group">
                                <label>Latitude</label>
                                <input 
                                type="text"
                                 className="form-control" 
                                 placeholder="Digite a Cidade..."
                                 disabled
                                 value={Lat}
                                 onChange={t=>setLat(t.target.value)}
                                 onBlur={()=>EnviandoVtr()}
                                 />
                            </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group">
                                <label>Longitude</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Digite o Estado..."
                                disabled
                                value={Lng}
                                onChange={t=>setLng(t.target.value)}
                                onBlur={()=>EnviandoVtr()}
                                />
                            </div>
                            </div>
                           
                        </div>
                     
                        
                    </div>
                    {/* /.card-body */}
                    </div>
                    <div className="card card-danger">
                    <div className="card-header">
                        <h3 className="card-title">Envolvidos da Ocorrência</h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                    <div className="row">
                    <div className="col-sm-12">
                            <div className="form-group">
                                <label>Conduzidos</label>
                                <textarea className="form-control" rows={3} placeholder="Digite as Informações dos Conduzidos..." defaultValue={""} />
                            </div>
                            </div>
                            <div className="col-sm-12">
                            <div className="form-group">
                                <label>Vítimas</label>
                                <textarea className="form-control" rows={3} placeholder="Digite as Informações das Vitimas..."  defaultValue={""} />
                            </div>
                            </div>
                            <div className="col-sm-12">
                            <div className="form-group">
                                <label>Objetos Apreendidos</label>
                                <textarea className="form-control" rows={3} placeholder="Digite os objetos apreendidos..."  defaultValue={""} />
                            </div>
                            </div>
                           
                        </div>
                     
                        
                    </div>
                    {/* /.card-body */}
                    </div>
                    <div className="card card-info">
                    <div className="card-header">
                        <h3 className="card-title">Informações da Ocorrência</h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                    <div className="row">
                    <div className="col-sm-6">
                            <div className="form-group">
                                <label>Grupo da Ocorrência</label>
                                <select className="form-control">
                                <option>Contra Pessoa</option>
                                <option>Contra Patrimônio</option>
                                <option>Contra Paz Pública</option>
                                <option>Diversos</option>
                                </select>
                            </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group">
                                <label>Ocorrência</label>
                                <select className="form-control">
                                <option>Atrito Familiar</option>
                                <option>Furto</option>
                                <option>Achado de Cadáver</option>
                                <option>Ameaça</option>
                                </select>
                            </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group">
                                <label>Resultado</label>
                                <select className="form-control">
                                <option>Resolvido No Local</option>
                                <option>Nada Constatado</option>
                                <option>Evadiu-se</option>
                                <option>Conduzido a DRPC</option>
                                </select>
                            </div>
                            </div>
                            <div className="col-sm-12">
                            <div className="form-group">
                                <label>Relato da Ocorrência</label>
                                <textarea className="form-control" rows={10} placeholder="Digite o relato da Ocorrência..."  defaultValue={""} />
                            </div>
                            </div>
                            <div className="col-sm-12">
                            <div className="form-group">
                                <label>Providências Tomadas</label>
                                <textarea className="form-control" rows={10} placeholder="Digite as providências tomadas.."  defaultValue={""} />
                            </div>
                            </div>
                           
                        </div>
                     
                        
                    </div>
                    {/* /.card-body */}
                    </div>
                    </div>
{/* /.card */}
{/* general form elements disabled */}
                   
           
            
 
             </div>
        </div>
    );
}