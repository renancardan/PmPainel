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
import EditOc from './EditarOcrr';
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
      const [Resu, setResu] = useState("");
      const [Bairro, setBairro] = useState("");
      const [PesqBtn, setPesqBtn] = useState(false);
     
     

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


               
               


                

         

               const Pagina1 = (id)=>{
                setId(id);
                setPag1(true);
               }

               const Pagina2 = async (id)=>{
                setId(id);
                setPag1(true);
                setPag2(true);

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
                          bairro:  UsuariosContServ[i].bairro,
                          resultado: UsuariosContServ[i].resultado,
                          condi: UsuariosContServ[i].condi,  
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
              setPesqBtn(false);
              ListOc();
              setBairro("");
              setResu("");
            }

            const Pesquivar = ()=> {
              if(Bairro !== "" && Resu === ""){
                let listra = [];
                for(let i in UsuariosContServ ) {
                  
                    if( UsuariosContServ[i].bairro.toLowerCase() == Bairro.toLowerCase() ) {
                      listra.push({
                        id: UsuariosContServ[i].id, 
                        date: UsuariosContServ[i].date,
                        ativo: UsuariosContServ[i].ativo, 
                        dateIn: UsuariosContServ[i].dateIn,
                        bairro: UsuariosContServ[i].bairro,
                        resultado: UsuariosContServ[i].resultado,
                        condi: UsuariosContServ[i].condi,  
                    });   
                    }
                   
                  }
                   setQuant(listra.length);
                  setUsuariosContServ(listra);
                  setPesqBtn(true);
              }
              if(Bairro === "" && Resu !== ""){
                let listra = [];
                for(let i in UsuariosContServ ) {
                  
                    if( UsuariosContServ[i].resultado == Resu ) {
                      listra.push({
                        id: UsuariosContServ[i].id, 
                        date: UsuariosContServ[i].date,
                        ativo: UsuariosContServ[i].ativo, 
                        dateIn: UsuariosContServ[i].dateIn,
                        bairro: UsuariosContServ[i].bairro,
                        resultado: UsuariosContServ[i].resultado,
                        condi: UsuariosContServ[i].condi,  
                    });   
                    }
                   
                  }
                   setQuant(listra.length);
                  setUsuariosContServ(listra);
                  setPesqBtn(true);
              }
           

              if(Bairro !== "" && Resu !== ""){
                let listra = [];
                for(let i in UsuariosContServ ) {
                  
                    if( UsuariosContServ[i].resultado == Resu ) {
                      if( UsuariosContServ[i].bairro.toLowerCase() == Bairro.toLowerCase() ) {
                      listra.push({
                        id: UsuariosContServ[i].id, 
                        date: UsuariosContServ[i].date,
                        ativo: UsuariosContServ[i].ativo, 
                        dateIn: UsuariosContServ[i].dateIn,
                        bairro: UsuariosContServ[i].bairro,
                        resultado: UsuariosContServ[i].resultado,
                        condi: UsuariosContServ[i].condi,  
                    }); 
                  }  
                    }
                   
                  }
                   setQuant(listra.length);
                  setUsuariosContServ(listra);
                  setPesqBtn(true);
              }
          

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
                        <div className="card card-warning">
                    <div className="card-header">
                        <h3 className="card-title">Filtros para pesquisa</h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                    <div className="row" >
                    <div className="col-sm-2">
                            <div className="form-group">
                                <label>Antes</label>
                                <DatePickerInput
                                  onChange={DatandoA}
                                  value={DataA}
                                  className='my-custom-datepicker-component'
                                  disabled={VerA}
                                  
                                />
                            </div>
                            </div>
                            <div className="col-sm-2">
                            <div className="form-group">
                                <label>Depois</label>
                                <DatePickerInput
                                onChange={datando}
                                value={DataP}
                                className='my-custom-datepicker-component'
                                disabled={VerD}
                                
                              />
                            </div>
                            </div> 
                            <div className="col-sm-2">
                            <div className="form-group">
                                <label>Resultado Final</label>
                                <select className="form-control"
                                value={Resu}
                                onChange={t=>setResu(t.target.value)} 
                                >
                                <option>Pesquisar</option>
                                <option>Condução ao DP</option>
                                <option>Resolvido no local</option>
                                <option>Evadiu-se</option>
                                <option>Nada constatado</option>
                                <option>Ocorrência computada</option>
                                <option>Outros</option>
                                </select>
                                
                              
                            </div>
                            </div>
                            <div className="col-sm-2">
                            <div className="form-group">
                                <label>Rua</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Digite a Rua "
                                value={Bairro}
                                onChange={t=>setBairro(t.target.value)}
                                />
                            </div>
                            </div>  
                            <div className="col-sm-2">
                            <div className="form-group">
                                <label>Bairro de Bacabal</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Digite o Bairro"
                                value={Bairro}
                                onChange={t=>setBairro(t.target.value)}
                                />
                                
                            </div>
                            </div> 
                            <div className="col-sm-2">
                            <div className="form-group">
                                <label>Vtr</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Digite A Vtr"
                                value={Bairro}
                                onChange={t=>setBairro(t.target.value)}
                                />
                            </div>
                            </div> 
                            <div className="col-sm-2">
                            <div className="form-group">
                                <label>Atendente Copom</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Digite o Atendente"
                                value={Bairro}
                                onChange={t=>setBairro(t.target.value)}
                                />
                            </div>
                            </div> 
                            <div className="col-sm-2">
                            <div className="form-group">
                                <label>Componentes da Vtr</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Digite os Componentes "
                                value={Bairro}
                                onChange={t=>setBairro(t.target.value)}
                                />
                            </div>
                            </div>
                            <div className="col-sm-2">
                            <div className="form-group">
                                <label>Conduzidos</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Digite os Conduzidos "
                                value={Bairro}
                                onChange={t=>setBairro(t.target.value)}
                                />
                            </div>
                            </div>  
                            <div className="col-sm-2">
                            <div className="form-group">
                                <label>Vítimas</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Digite as Vítimas "
                                value={Bairro}
                                onChange={t=>setBairro(t.target.value)}
                                />
                            </div>
                            </div>  
                            <div className="col-sm-2">
                            <div className="form-group">
                                <label>Objetos Ap.</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Digite os objetos apreendidos "
                                value={Bairro}
                                onChange={t=>setBairro(t.target.value)}
                                />
                            </div>
                            </div>  
                          
                            <div className="col-sm-2">
                            <div className="form-group">
                                <label>Ocorrência</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Digite as Ocorrências "
                                value={Bairro}
                                onChange={t=>setBairro(t.target.value)}
                                />
                            </div>
                            </div>  
                            {PesqBtn === false ?
                            <div className="col-sm-2">
                            <div className="form-group">
                            <Butao 
                              style={"btn btn-sm btn-primary"}
                              titulo={"Pesquisar"}
                              onClick={()=>Pesquivar()}
                              />
                                
                            </div>
                            </div> 
                            :
                            <div className="col-sm-2">
                            <div className="form-group">
                            <Butao 
                            style={"btn btn-sm btn-secondary"}
                            titulo={"Limpar Pesquisa"}
                            onClick={()=>LimpandoPesq()}
                            />
                            </div>
                            </div> 
                            }
                          
                                   
                    </div>
                       
                    </div>
                    {/* /.card-body */}
                    </div>
                    <div className="card card-primary">

                     {/* <DatePicker locale='pt-br'  onChange={null} value={date} /> */}
                    
                      <div className="card-header">
                      
                        <h3 className="card-title" style={{ marginBottom: "10px"}}>Lista de Ocorrência  </h3> 

                      </div>
                        <div class="card-body table-responsive p-0">
                          <table class="table table-hover text-nowrap">
                            <thead>
                              <tr>
                                <th>Data</th>
                                <th>Bairro</th>
                                <th>Resultado</th>
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
                                      <td >
                                      {item.list.bairro}
                                      </td>
                                      <td >
                                      {item.list.resultado}
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
                                    onClick={()=>Pagina1(item.list.id)}
                                    />

                                    <Butao 
                                    style={"btn btn-xs btn-success"}
                                    titulo={"Editar"}
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
        {Pag2 === false ?
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

        :
        <>
         <EditOc
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
         
        </>
        
         }
      </div>

        );
    }

