import React, { Component, useState, useEffect } from 'react';
import HeaderPage from '../../Components/HeaderPages';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Spinner  } from "react-awesome-spinners";
import Aviso from '../../Components/Aviso';
import CaixaInforme from '../../Components/CaixaInforme';
import Butao from '../../Components/Butao_list';
import Select from '../../Components/Select';
import Pagination from '../../Components/Pagination';
import CriarGrupo from './CriarGrupo';
import VizualizaOc from './VizualizarOcorr';
import DataTime from '../../Components/DateFormat';
import Api from '../../Api';
import 'moment/locale/pt-br.js';
import { DatePicker, DatePickerInput } from 'rc-datepicker';
import 'rc-datepicker/lib/style.css';


export default ({Dados, setDados, Loading,  setLoading,  Alert, setAlert, AlertTipo,
   setAlertTipo, Avisando, setAvisando}) => {
      const [Offset, setOffset] = useState(0);
      const [Limit, setLimit] = useState(10);
      const [Quant, setQuant] = useState(0);
      const [Pag1, setPag1] = useState(false);
      const [Pag2, setPag2] = useState(false);
      const [Titulo, setTitulo] = useState("Ocorrencia");
      const [Time, setTime] = useState("")
      const [UsuariosContServ, setUsuariosContServ] = useState([]);
      const [Lista, setLista] = useState(["list"]);
      const [Carreg, setCarreg] = useState(false);
      const [Cont, setCont] = useState(0);
      const [Id, setId] = useState("");
      const [Nome, setNome] = useState("");
      const [Telefone, setTelefone] = useState("");
      const [DataP, setDataP] = useState(new Date());
      const [DataA, setDataA] = useState(new Date());
      const [VerA, setVerA] = useState(false);
      const [VerD, setVerD] = useState(false);
     
     

      useEffect(() => {
       ListOc();     
      }, [])

      useEffect(() => {
     
       }, [Lista])

      useEffect(() => {
      
        Listando();   
       }, [UsuariosContServ])

       useEffect(() => {
        Listando();
       }, [Offset])
     
      
  
     
          const ListOc = async ()=>{
            if (navigator.onLine) {
             setCarreg(true);
              await Api.ListOcorr(Dados, setQuant, setUsuariosContServ);
             
            } else {
              setAlert("Sem Internet");
              setAlertTipo("danger");
            }

               
          }

          const Listando = async ()=>{
                
                  const cal1 = Quant/Limit;
                  const cal2 = Math.trunc(cal1);
                  const cal3 = cal2*10;
                  const cal4 = Quant - cal3;
                  if(Offset === cal3) {
                      
                          const inicio = Offset;
                          const fim = Quant;
                          var Listinha =[];
                          for (var i = inicio; i < fim; i++) {
                            Listinha.push({
                              list:UsuariosContServ[i],
                            });
                            setLista(Listinha);
                          
                    

                          }

                  } else {

                          const inicio = Offset;
                          const fim = (Offset + Limit) 
                          var Listinha =[];
                          for (var i = inicio; i < fim; i++) {
                            Listinha.push({
                              list:UsuariosContServ[i],
                            });
                            setLista(Listinha);
                           
                   

                        }
                  

                    } 

                    var num= Cont + 1;
                    setCont(num);
                    if(Cont === 1){
                      setCarreg(false); 
                    }          
                         
          }

          function confirma() {
            setAlert(" ");
            setAlertTipo(" ");
            setPag2(false);
            setPag1(false);
           
          }
          function cancelar() {
            setAlert(" ");
            setAlertTipo(" ");
            setPag2(false);
            setPag1(false);
          }

          const Fechar = ()=>{
            setPag2(false);
            setPag1(false);
          }


               
               


                

         

               const Pagina1 = ()=>{
                 setPag1(true);
               }

               const Pagina2 = async (id)=>{
                await setId(id);
                await setPag1(true);

              }

                const MsgDesativar = (id, nome)=>{
                  setId(id);
                  setNome(nome);
                  setAlert("Ok");
                  setAlertTipo("Desativar");
                  
                }

                const Desativar = async ()=>{
                 
                  setAlert(" ");
                  setAlertTipo(" ");
       
              if (navigator.onLine) {
                
                await Api.DesativandoCondicional(Dados, Id, setAlertTipo, setAlert);

                
               } else {
                 setAlert("Sem Internet");
                 setAlertTipo("danger");
               }


                }

                const MsgAtivar = (id, nome)=>{
                  setId(id);
                  setNome(nome);
                  setAlert("Ok");
                  setAlertTipo("ativar");
                  
                }

                const Ativar = async ()=>{
                 
                  setAlert(" ");
                  setAlertTipo(" ");
       
              if (navigator.onLine) {
                
                await Api.AtivandoCondicional(Dados, Id, setAlertTipo, setAlert);

                
               } else {
                 setAlert("Sem Internet");
                 setAlertTipo("danger");
               }


                }

                const date = new Date() // or Date or Moment.js

            const datando = async (jsDate, dateString)=>{
                setDataP(jsDate)
                let DatA = new Date(DataA).getTime();
                let Dat = new Date(jsDate).getTime();
                if(DatA > Dat){
                  setVerD(true);
                  let listanha = [];
                  for(let i in UsuariosContServ ) {
                    
                    if( UsuariosContServ[i].dateIn > Dat ) {
                      if( UsuariosContServ[i].dateIn < DatA ) {
                        listanha.push({
                          id: UsuariosContServ[i].id, 
                          date: UsuariosContServ[i].date,
                          ativo: UsuariosContServ[i].ativo, 
                          dateIn: UsuariosContServ[i].dateIn,   
                      });   
                      }
                     
                    }
                   
                }
               await  setQuant(listanha.length);
                await setUsuariosContServ(listanha);

                } else {
                  setAlert("A data Depois tem que ser menor que a de Antes");
                  setAlertTipo("danger");
                }
               
            }

            const DatandoA = (jsDate, dateString)=>{
              setDataA(jsDate)
              setVerA(true);
              setDataP(jsDate)
            }

            const LimpandoPesq = ()=>{
              setDataP(new Date());
              setDataA(new Date());
              setVerD(false);
              setVerA(false);
              ListOc();
            }
             
           
              
               
      
  return (
        
          <div>
             {Alert !== " " && AlertTipo === "success" &&
                  <SweetAlert  success title={Alert} onConfirm={confirma} onCancel={cancelar} />
                }

            {Alert !== " " && AlertTipo === "danger" &&
                  <SweetAlert  danger title={Alert} confirmBtnBsStyle="danger" onConfirm={confirma} onCancel={cancelar} />
                }


            { Alert !== " " && AlertTipo === "Desativar" &&
              <SweetAlert
              warning
              showCancel
              confirmBtnText="Sim"
              cancelBtnText="Não"
              confirmBtnBsStyle="danger"
              onConfirm={()=>Desativar()}
              onCancel={cancelar}
              focusCancelBtn
            >
              Tem certeza que deseja Desativar a condicional {Nome}!
            </SweetAlert>
            }
            { Alert !== " " && AlertTipo === "ativar" &&
              <SweetAlert
              warning
              showCancel
              confirmBtnText="Sim"
              cancelBtnText="Não"
              confirmBtnBsStyle="danger"
              onConfirm={()=>Ativar()}
              onCancel={cancelar}
              focusCancelBtn
            >
              Tem certeza que deseja ativar a condicional {Nome}!
            </SweetAlert>
            }
            { Pag1 === false ?
            <div className="content-wrapper">
               
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
                        <>
                    
                    <div className="card card-primary">
                    <div className="row" style={{margin:"10px"}}>
                    <div style={{margin:"10px", width:"250px"}}>
                      <string>Antes</string>
                    <DatePickerInput
                      onChange={DatandoA}
                      value={DataA}
                      className='my-custom-datepicker-component'
                      disabled={VerA}
                      
                    />
                    
                    </div>
                    <div style={{margin:"10px", width:"250px"}}>
                    <string>Depois</string>
                    <DatePickerInput
                      onChange={datando}
                      value={DataP}
                      className='my-custom-datepicker-component'
                      disabled={VerD}
                      
                    />
                    
                    </div>
                    <div style={{margin:"10px", width:"250px", paddingTop:"25px"}}>
                    <Butao 
                        style={"btn btn-sm btn-secondary"}
                        titulo={"Limpar Pesquisa"}
                        onClick={()=>LimpandoPesq()}
                        />
                    </div>
                    
                    </div>
                   

                     {/* <DatePicker locale='pt-br'  onChange={null} value={date} /> */}
                    
                      <div className="card-header">
                      
                        <h3 className="card-title" style={{ marginBottom: "10px"}}>Lista de Ocorrência  </h3> 

                      </div>
                        <div class="card-body table-responsive p-0">
                          <table class="table table-hover text-nowrap">
                            <thead>
                              <tr>
                                <th>Data</th>
                                <th>Status</th>
                                <th>Ações</th>
                              </tr>
                            </thead>
                            
                            { Lista[0].list ?
                            <tbody >
                            {Lista.map((item, key)=>(
    
                            
                                    <tr key={item.list.id}  style={{backgroundColor: item.list.ativo=== true ?"#98C0FF":"#FFF"}}>
                                    <td >
                                      <DataTime 
                                      DateIni={item.list.date}
                                      />
                                      </td>
                                    {item.list.ativo === false ?
                                       <td>Concluido</td>
                                    :
                                       <td>Em andamento</td>
                                    }
                                   
                                   
                                   
                                    <td>
                                    
                                   
                                    <Butao 
                                    style={"btn btn-xs btn-info"}
                                    titulo={"Vizualizar"}
                                    onClick={()=>Pagina2(item.list.id)}
                                    />
                                                             
                                                           
                                    </td>
                                  </tr>
                                 
                             ))}
                                </tbody> 
                                :
                                      <>
                                      { Carreg === true ?
                                        <Spinner 
                                        size={64}
                                        color={"#5d0bf7"}
                                        sizeUnit={'px'} 
                                        />
                                        :                                      
                                      <p style={{color:"red", margin:"20px"}}>Não existe App Cadastrado ou Desbloqueado</p>
                                      }
                                      </>
                            }
                            
                            
                          </table>
                            <Pagination
                            limit={Limit} 
                            total={Quant} 
                            offset={Offset}
                            setOffset={setOffset}
                            />
                         </div>
                        </div>
                        </>
                        }
                    </section>       
               </div>
            </div>
          </section>
        </div>
        :
        <>
          <VizualizaOc 
            setAlert={setAlert}
            setAlertTipo={setAlertTipo}
            Avisando={Avisando}
            Fechar={Fechar}
            Dados={Dados}
            Id={Id}
            Alert={Alert}
            AlertTipo={AlertTipo}
            />
        </>
        
         }
      </div>

        );
    }

