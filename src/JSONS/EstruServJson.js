export default  { 
   Estrut:{  nome: " ", 
            telefone: " ", 
            cidade: " ", 
            estado: " ", 
            instituicao: " ",
            conta:{ admin:{ativo:false, desbloqueado:false, tipo:""},
                    app:{ativo:false, desbloqueado:false, tipo:""},
                    NegApp:{ativo:false, desbloqueado:false, tipo:""},
                    serv:{ativo:false, desbloqueado:false, tipo:""},
                    servApp:{ativo:false, desbloqueado:false, tipo:""},
            
                },
            grupo:{
                id:"mjcq9CMFFexmf5JPvTtX",
                nome:"Geral",
                menu:{
                    aplicativos:{
                                        listaAppServ:{
                                                Ver:true,
                                                btn_vizualizar:true,
                                                btn_desativar:true,
                                                btn_ativar:true,
                                                btn_bloquear:true,
                                                },
                                        ativarAppServ:{
                                            Ver:true,
                                            btn_ativar:true,
                                            },
                                        vizualizarAppServ:{
                                            Ver:true,
                                            btn_desativar:true,
                                            }
                            },
                    condicionais:{
                                        listaCondicionais:{
                                            Ver:true,
                                            btn_editar:true,
                                            btn_desativar:true,
                                            btn_ativar:true,
                                            btn_criarCondicional:true,
                                            },
                                        editarCondicional:{
                                            Ver:true,
                                            btn_salvar:true,
                                            },
                                        criarCondicional:{
                                            Ver:true,
                                            btn_salvar:true,
                                            },
                            },
                    contas:{
                                        listaContasServ:{
                                            Ver:true,
                                            btn_vizualizar:true,
                                        },
                                        listaAppsserv:{
                                            Ver:true,
                                            btn_bloquear:true,
                                            btn_desbloquear:true,
                                        },
                                        contaServ:{
                                            Ver:true,
                                            btn_bloquear:true,
                                            btn_desbloquear:true,
                                        }
                         },
                    }
                    },
   }
 };