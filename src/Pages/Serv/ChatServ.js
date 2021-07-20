import React, { Component, useState, useEffect } from 'react';
import HeaderPage from '../../Components/HeaderPages';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Spinner  } from "react-awesome-spinners";
import Aviso from '../../Components/Aviso';
import CaixaInforme from '../../Components/CaixaInforme';
import Butao from '../../Components/Butao_list';
import Select from '../../Components/Select';
import Pagination from '../../Components/Pagination';
import ChatListItem from '../../Components/ChatListItem';
import ChatIntro from '../../Components/ChatIntro';
import ChatWindow from '../../Components/ChatWindow'
import Vizualizacao from './VizualizarApp';
import AtivarApp from './AtivarApp';
import Api from '../../Api';
import Maps from '../../Components/maps';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import Modal from 'react-awesome-modal';
import Condic from '../../Components/Condoc';


export default ({Dados, setDados, Loading,  setLoading,  Alert, setAlert, AlertTipo,
   setAlertTipo, Avisando, setAvisando}) => {
     
      const [Titulo, setTitulo] = useState("Chat");
      const [MapsCaixa, setMapsCaixa] = useState(false)
      const [Forms, setForms] = useState([]);
      const [user, setUser] = useState({
        id:1234,
        avatar: '//www.w3schools.com/howto/img_avatar2.png',
        name:"Renan Cardan"
      });
      const [Id, setId] = useState("");
      const [Nome, setNome] = useState("");
      const [Telefone, setTelefone] = useState("");
      const [Chatlist, setChatlist] = useState([]);
      const [activeChat, setActiveChat] = useState(null);
      const [Vizul, setVizul] = useState('');
      const [Varia, setVaria] = useState('');
      const [Loc, setLoc] = useState({});
      const [VirModal, setVirModal] = useState(false);
      const [Cont, setCont] = useState([]);
      const [NomeCond, setNomeCond] = useState('');
      const [AtuaMaps, setAtuaMaps] = useState(false);
      useEffect(() => {
          LevarTemp();
      }, [])
      useEffect(() => {
        PegarList();
    }, [])

    useEffect(() => {
    }, [Chatlist]);

   

   useEffect(() => {
   
      console.log(Cont);
   
  }, [Cont])

  useEffect(() => {
    CondPegar();
 }, [activeChat])
 

  useEffect(() => {
   Vizuali();
}, [Vizul ,activeChat]);

     

     const LevarTemp = async ()=>{
      await Api.VariacaoTemp();
      await Api.VarTempPegar(Dados, setVaria);
     }

     const AdicionaCond = ()=>{
      setVirModal(true);
     }

     const CondPegar = ()=>{
       if(activeChat !== null){
        Api.PegarCond(activeChat, setForms, setLoc);
       }
        
     }

    
     

      const PegarList = ()=>{
        Api.PesquisarList(Dados, setChatlist )
      }

    

      const AbrirMaps = ()=>{
        setAtuaMaps(true);
        setMapsCaixa(!MapsCaixa);
       
      }

      const Verconversa = async (id, nome, Quant)=>{
        setVirModal(false);
        setMapsCaixa(false);
        setAtuaMaps(false);
        await setForms([]);
        await setNome(nome);
        await setActiveChat(id);
        await setVizul(Quant);
    

      }

      const Vizuali = ()=>{
        if(Vizul !== '' && activeChat !== null) {
          Api.MsgLida(activeChat, Vizul);
        }
      }

      const TirarCond = async (Vale, tipo)=>{
        await setNomeCond(tipo)
        await setCont([...Forms.filter((item, index) => item.id !== Vale)]);
        await setAlert("oK");
        await setAlertTipo("Excluir");
        
      }

      const Cancelar = ()=>{
        setAlert(" ");
       setAlertTipo("");
      }

      const CondGuard = ()=>{
        Api.ExcluirCondi(activeChat, Cont, setAlertTipo, setAlert);
        setAlert(" ");
        setAlertTipo("");
      }

      
  
               
      
  return (
        
          <div>
            
           
            <div className="content-wrapper">
            { Alert !== " " && AlertTipo === "Excluir" &&
              <SweetAlert
              warning
              showCancel
              confirmBtnText="Sim"
              cancelBtnText="Não"
              confirmBtnBsStyle="danger"
              onConfirm={()=>CondGuard()}
              onCancel={()=>Cancelar()}
              focusCancelBtn
            >
              Tem certeza que deseja Excluir a Condicional {NomeCond}
            </SweetAlert>
            }
            
              <HeaderPage
              Avisando={Avisando} 
              Titulo={Titulo}
              />            
              <section className="content">
                <div className="container-fluid">
                  
                <div className="row">
                  <section className="col-12">
                  {Loading === true ?
                        <Spinner 
                        size={64}
                        color={"#5d0bf7"}
                        sizeUnit={'px'} 
                        />
                        :
                        
                    <div className="card ">
                        <div className="app-window">
                            <div className="contatos">
                                <div className="topo">
                
                                        <div className="topo--buttons">
                                            <div className="topo--btn" >
                                            <DonutLargeIcon style={{color: '#5d0bf7'}} /> 
                                            </div>
                                                <div className="topo--btn" 
                                                >
                                                    <ChatIcon  style={{color: '#5d0bf7'}} />
                                                </div>
                                                <div className="topo--btn">
                                                <MoreVertIcon style={{color: '#5d0bf7'}} />
                                                </div>
                                        </div>
                                </div>
                                <div className="busca">
                                <div className="busca-input">
                                <SearchIcon fontSize="small" style={{color: '#919191'}} />
                                <input type="search" placeholder="Procurar ou começar uma nova conversa" />
                                </div>
                                </div>
                                <div className="chatlist">
                                {Chatlist.map((item, key)=>(
                                        <ChatListItem 
                                        key={key}
                                        data={item}
                                        Ocorr={Chatlist[key].idOc}
                                        active={activeChat === Chatlist[key].idOc}
                                        onClick={()=>Verconversa(Chatlist[key].idOc, item.nome, Chatlist[key].QuantMsg)}
                                        />
                                ))}
                                </div>
                            </div>
                            <div className="contentarea">
                             {/* //18 - colocando o qual pagina vai mostrar  no contentarea*/}
                        {activeChat !== null &&
                        <>
                        <ChatWindow
                        data={activeChat}
                        setActiveChat={setActiveChat}
                        setAlert={setAlert}
                        setAlertTipo={setAlertTipo}
                        Alert={Alert}
                        AlertTipo={AlertTipo}
                        AbrirMaps={AbrirMaps} 
                        MapsCaixa={MapsCaixa}
                        Nome={Nome} 
                        Dados={Dados} 
                        Vizul={Vizul}
                        Varia={Varia}
                        setVizul={setVizul}
                        />
                        {AtuaMaps === true &&
                         <Maps 
                         MapsCaixa={MapsCaixa}
                         Loc={Loc}
                         />
                        }
                       
                        </>
                       }
                        {activeChat === null &&
                       
                          <ChatIntro />
                          
                          
                      }

                            </div>
                            {activeChat !== null &&
                            <>
                              {VirModal === false ?
                                      <div className="formularioCond">
                                      <div className="card card-info">
                                    <div className="card-header">
                                      <h3 className="card-title">Condicionais Preenchidas</h3>
                                    </div>
                                  
                                    {/* /.card-header */}
                                    <div className="card-body">
                                        {Forms.map((item,key)=>(
                                          <>
                                          <div className="listCond">
                                          <string> {item.nome}</string>
                                          <div className="chatWindow--btn2"
                                            onClick={()=>TirarCond(item.id, item.nome)}
                                            >
                                                <p className="textButao" >EXCLUIR</p>
                                            </div>
                                          </div>
                                       <br/>
                                          </>
                                         ))
                
                                      }
    
                                    <Butao 
                                        style={"btn .btn-sm btn-info"}
                                        titulo={"Add Condicionais"}
                                        onClick={()=>AdicionaCond()}
                                        />  
                                       
                                        </div>
                                    {/* /.card-body */}
                                  </div>
                                </div>
                                :
                                <Condic
                                Forms={Forms}
                                setForms={setForms}
                                activeChat={activeChat}
                                setVirModal={setVirModal}
                                />
                              }
                              </>
                    
   }
                        </div>                            
                    </div>
                        }
                    </section>       
               </div>
            </div>
          </section>
        </div>
       
     
      </div>

        );
    }

