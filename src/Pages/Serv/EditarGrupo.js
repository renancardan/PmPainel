import React, {useEffect, useState} from 'react';
import Api from '../../Api';
import Butao from '../../Components/Butao_list';
import Campo from '../../Components/Campo';
import Header from '../../Components/Header'; 
import Checkbox from '../../Components/Checkbox';
import SweetAlert from 'react-bootstrap-sweetalert';



export default ({Dados, Avisando, Fechar, Nome, Id, setAlert, setAlertTipo, MsgDesativar}) => {
const [nome, setnome] = useState(Nome);
const [Titulo, setTitulo] = useState("Editar Grupo");
const [Valor, setValor] = useState("nulo");
const [Alert1, setAlert1] = useState("");
const [AlertTipo1, setAlertTipo1] = useState("");
const [Infor, setInfor] = useState({});
const [res1, setres1] = useState(false);
const [res2, setres2] = useState(false);
const [res3, setres3] = useState(false);
const [res4, setres4] = useState(false);
const [res5, setres5] = useState(false);
const [res6, setres6] = useState(false);
const [res7, setres7] = useState(false);
const [res8, setres8] = useState(false);
const [res9, setres9] = useState(false);
const [res10, setres10] = useState(false);
const [res11, setres11] = useState(false);
const [res12, setres12] = useState(false);
const [res13, setres13] = useState(false);
const [res14, setres14] = useState(false);
const [res15, setres15] = useState(false);
const [res16, setres16] = useState(false);
const [res17, setres17] = useState(false);
const [res18, setres18] = useState(false);
const [res19, setres19] = useState(false);
const [res20, setres20] = useState(false);
const [res21, setres21] = useState(false);


useEffect(() => {   
    Alterar();
   }, [Infor])
   
   useEffect(() => {   
    dadosGrupo();
   }, [])

   useEffect(() => {   
  
   }, [res1])

   useEffect(() => {   
    estrutGrup();
   }, [res1, res2, res3, res4, res5, res6, res7,
     res8, res9, res10, res11, res12, res13, res14, res15, res16, res17, res18, res19, res20])

   useEffect(() => {   
    estrutGrup();
   }, [])

  const Editando = ()=>{
    console.log(nome);
    if(nome !=="" && nome !==" " && nome !=="  " && nome !=="   " && nome !=="    " && nome !=="     " && Nome !=="      "
    && nome !=="       " && nome !=="        " && nome !=="         " && nome !=="          " 
    && nome !=="           " ){
    if (navigator.onLine) {
                
       Api.EditarGrupo(Dados, Id, nome, Valor, setAlertTipo, setAlert);

      
     } else {
       setAlert("Sem Internet");
       setAlertTipo("danger");
     }
    } else {
      setAlert1("Coloque um nome no campo");
        setAlertTipo1("danger");
    }
  }

 const dadosGrupo = ()=>{
     Api.DadosGruposServ(Dados, Id, setInfor);
 }

 const Alterar = ()=> {
     if(Infor.aplicativos){
    setres1(Infor.aplicativos.listaAppServ.Ver);
     setres2(Infor.aplicativos.listaAppServ.btn_vizualizar);
     setres3(Infor.aplicativos.listaAppServ.btn_desativar);
     setres4(Infor.aplicativos.listaAppServ.btn_ativar);
     setres5(Infor.aplicativos.listaAppServ.btn_bloquear);
     setres6(Infor.aplicativos.ativarAppServ.btn_ativar);
     setres7(Infor.aplicativos.vizualizarAppServ.btn_desativar);
     setres8(Infor.condicionais.listaCondicionais.Ver);
     setres9(Infor.condicionais.listaCondicionais.btn_editar);
     setres10(Infor.condicionais.listaCondicionais.btn_desativar);
     setres11(Infor.condicionais.listaCondicionais.btn_ativar);
     setres12(Infor.condicionais.listaCondicionais.btn_criarCondicional);
     setres13(Infor.condicionais.editarCondicional.btn_salvar);
     setres14(Infor.condicionais.criarCondicional.btn_salvar);
     setres15(Infor.contas.listaContasServ.Ver);
     setres16(Infor.contas.listaContasServ.btn_vizualizar);
     setres17(Infor.contas.listaAppsserv.btn_bloquear);
     setres18(Infor.contas.listaAppsserv.btn_desbloquear);
     setres19(Infor.contas.contaServ.btn_bloquear);
     setres20(Infor.contas.contaServ.btn_desbloquear);
     }
     
    
 }
  const estrutGrup = ()=>{
      const Estrut = {
        aplicativos:{
            listaAppServ:{
                    Ver:res1,
                    btn_vizualizar:res2,
                    btn_desativar:res3,
                    btn_ativar:res4,
                    btn_bloquear:res5,
                    },
            ativarAppServ:{
                Ver:res4,
                btn_ativar:res6,
                },
            vizualizarAppServ:{
                Ver:res2,
                btn_desativar:res7,
                }
          },
      condicionais:{
        listaCondicionais:{
            Ver:res8,
            btn_editar:res9,
            btn_desativar:res10,
            btn_ativar:res11,
            btn_criarCondicional:res12,
            },
        editarCondicional:{
            Ver:res9,
            btn_salvar:res13,
            },
        criarCondicional:{
            Ver:res12,
            btn_salvar:res14,
            },
          },
        contas:{
          listaContasServ:{
              Ver:res15,
              btn_vizualizar:res16,
          },
          listaAppsserv:{
              Ver:res15,
              btn_bloquear:res17,
              btn_desbloquear:res18,
          },
          contaServ:{
              Ver:res16,
              btn_bloquear:res19,
              btn_desbloquear:res20,
          }
            }, 
      }

      setValor(Estrut);
  
  }

  const cancelar = ()=>{
    setAlertTipo1("")
    setAlert1("")
}


 
  

        return (
            <>
<div className="content-wrapper">
          {Alert1 !== " " && AlertTipo1 === "success" &&
                  <SweetAlert  success title={Alert1} onConfirm={cancelar} onCancel={cancelar} />
                }

            {Alert1 !== " " && AlertTipo1 === "danger" &&
                  <SweetAlert  danger title={Alert1} confirmBtnBsStyle="danger" onConfirm={cancelar} onCancel={cancelar} />
                }
                <Header 
                Titulo={Titulo}
                Avisando={Avisando}
                Fechar={Fechar}
                />
               <section className="content">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12">
                      <div className="callout callout-info">
            <h5><i className="fas fa-info" /> Nota:</h5>
           Crie grupo de permissões para os usuarios do sistema!
          </div>
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
                    <strong>Digite o Nome do Grupo:</strong><br />
                    <div className="input_cadatro">
                              <Campo 
                                  type={"text"}
                                  placeholder= {"Nome da condicional"}
                                  icon={"fas "}
                                  value={nome}
                                  onChange={e=>setnome(e.target.value)}
                                  mask={null}
                                />

                            </div> 
                    <br />
                    {Valor !== "nulo" &&
                    <>
                    {Valor.aplicativos.listaAppServ.Ver  &&
                                <>
                    <strong>Menus:</strong><br />
                   <Checkbox 
                   label={"Aplicativos"} 
                   res={res1} 
                   onChange={(value)=>{setres1(value)}} 
                   /> <br />
                    <Checkbox 
                   label={"Condicionais"} 
                   res={res8} 
                   onChange={(value)=>{setres8(value)}} 
                   /> <br />
                    <Checkbox 
                   label={"Contas"} 
                   res={res15} 
                   onChange={(value)=>{setres15(value)}} 
                   /> <br />
                   </>
                    }
                    </>
                }
                  </address>
                </div>
                <div className="col-sm-4 invoice-col">
                    <address>
                        {Valor !== "nulo" &&
                            <>
                                {Valor.aplicativos.listaAppServ.Ver === true &&
                                <>
                                <strong>Caixas do menu Aplicativos:</strong><br />
                                <span style={{color:"green", }}>Lista AppServ Desbloqueados</span> <br/>
                                <Checkbox 
                                label={"Botão Vizualizar"} 
                                res={res2} 
                                onChange={(value)=>{setres2(value)}} 
                                 /> <br />
                                 <Checkbox 
                                label={"Botão Desativar"} 
                                res={res3} 
                                onChange={(value)=>{setres3(value)}} 
                                 /> <br />
                                 <Checkbox 
                                label={"Botão Ativar"} 
                                res={res4} 
                                onChange={(value)=>{setres4(value)}} 
                                 /> <br />
                                  <Checkbox 
                                label={"Botão Bloquear"} 
                                res={res5} 
                                onChange={(value)=>{setres5(value)}} 
                                 /> <br />
                               
                                {Valor.aplicativos.ativarAppServ.Ver === true &&
                                <>
                                <span style={{color:"green", }}>Ativando AppServ </span> <br/>
                                <Checkbox 
                                label={"Botão Ativar"} 
                                res={res6} 
                                onChange={(value)=>{setres6(value)}} 
                                 /> <br />
                                </>                           
                                }
                                 {Valor.aplicativos.vizualizarAppServ.Ver === true &&
                                <>
                                <span style={{color:"green", }}> Vizualizando App</span> <br/>
                                <Checkbox 
                                label={"Botão Desativar"} 
                                res={res7} 
                                onChange={(value)=>{setres7(value)}} 
                                 /> <br />
                                </>                           
                                }
                            </>
                            }
                           {Valor.condicionais.listaCondicionais.Ver === true &&
                                <>
                                <strong>Caixas do menu Condicionais:</strong><br />
                                <span style={{color:"green", }}>Lista de Condicionais</span> <br/>
                                <Checkbox 
                                label={"Botão Editar"} 
                                res={res9} 
                                onChange={(value)=>{setres9(value)}} 
                                 /> <br />
                                 <Checkbox 
                                label={"Botão Desativar"} 
                                res={res10} 
                                onChange={(value)=>{setres10(value)}} 
                                 /> <br />
                                 <Checkbox 
                                label={"Botão Ativar"} 
                                res={res11} 
                                onChange={(value)=>{setres11(value)}} 
                                 /> <br />
                                  <Checkbox 
                                label={"Botão Criar Condicionais"} 
                                res={res12} 
                                onChange={(value)=>{setres12(value)}} 
                                 /> <br />
                               
                                {Valor.condicionais.editarCondicional.Ver === true &&
                                <>
                                <span style={{color:"green", }}>Editar Condicional </span> <br/>
                                <Checkbox 
                                label={"Botão Salvar"} 
                                res={res13} 
                                onChange={(value)=>{setres13(value)}} 
                                 /> <br />
                                </>                           
                                }
                                 {Valor.condicionais.criarCondicional.Ver === true &&
                                <>
                                <span style={{color:"green", }}> Criar Condicional</span> <br/>
                                <Checkbox 
                                label={"Botão Salvar"} 
                                res={res14} 
                                onChange={(value)=>{setres14(value)}} 
                                 /> <br />
                                </>                           
                                }
                            </>
                        }
                          {Valor.contas.listaContasServ.Ver === true &&
                                <>
                                <strong>Caixas do menu Contas:</strong><br />
                                <span style={{color:"green", }}>Lista de Contas Serv</span> <br/>
                                <Checkbox 
                                label={"Botão Vizualizar"} 
                                res={res16} 
                                onChange={(value)=>{setres16(value)}} 
                                 /> <br />
                                 <span style={{color:"green", }}>Lista de App Serv</span> <br/>
                                <Checkbox 
                                label={"Botão Bloquear"} 
                                res={res17} 
                                onChange={(value)=>{setres17(value)}} 
                                 /> <br />
                                 <Checkbox 
                                label={"Botão Desbloquear"} 
                                res={res18} 
                                onChange={(value)=>{setres18(value)}} 
                                 /> <br />                              
                                {Valor.contas.contaServ.Ver === true &&
                                <>
                                <span style={{color:"green", }}>Vizualizando Conta </span> <br/>
                                <Checkbox 
                                label={"Botão Bloquear"} 
                                res={res19} 
                                onChange={(value)=>{setres19(value)}} 
                                 /> <br />
                                 <Checkbox 
                                label={"Botão Desbloquear"} 
                                res={res20} 
                                onChange={(value)=>{setres20(value)}} 
                                 /> <br />
                                </>                           
                                }
                                 
                            </>
                        }
                        </>                           
                     } 
                      
                     
                    </address>
                  </div>
              </div>
              <div className="row no-print">
                <div className="col-12">
                <Butao 
                style={"btn .btn-sm btn-info"}
                titulo={"Editar"}
                onClick={()=>Editando()}
                />  
                </div>
              </div>
            </div> 
            </div>
            </div>
            </div>
          </section>
  
</div>

            </>
        );
}