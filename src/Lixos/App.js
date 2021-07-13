import React, {useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import HeaderAdmin from './Estrutura/Admin/HeaderAdmin';
import MenuAdmin from './Estrutura/Admin/MenuAdmin';
import FooterAdim from './Estrutura/Admin/FooterAdmin';
import RoutesAdmin from './Estrutura/Admin/RoutesAdmin';
import HeaderServ from './Estrutura/Serv/HeaderServ';
import MenuServ from './Estrutura/Serv/MenuServ';
import FooterServ from './Estrutura/Serv/FooterServ';
import RoutesServ from './Estrutura/Serv/RoutesServ';
import LoginServ from './Estrutura/Serv/LoginServ';
import LoginAdmin from './Estrutura/Admin/LoginAdmin';
import PagVerificar from './Components/paginaum';
import AtivaPag from './Components/AtivaPag';
import Api from "./Api";




function App() {
  
  
  const [user, setUser] = useState(" ");
  const [Conta, setConta] = useState("serv");
  const [Email, setEmail] = useState("r.azevedoonline@gmail.com");
  const [Senha, setSenha] = useState("123456");
  const [Nome, setNome] = useState('');
  const [Telefone, setTelefone] = useState('');
  const [Confirsenha, setConfirsenha] = useState('');
  const [Cidade, setCidade] = useState('');
  const [Estado, setEstado] = useState('');
  const [Instituicao, setInstituicao] = useState('');
  const [ContaTipo, setContaTipo] = useState('');
  const [Loading, setLoading] = useState(false);
  const [Alert, setAlert] = useState(" ");
  const [AtivaCont, setAtivaCont] = useState(false);

   
  
     

       useEffect(() => {
        verStatus();
       }, []);

       setInterval(() =>{verStatus()}, 
        60000);

                  const cadastrando =  async () => {
                    await setLoading(true);
                    if(Email != '' && Senha != '' && Nome != '' && Telefone != ''
                    && Confirsenha != '' && Cidade != '' && Estado != '' 
                    && Instituicao != '' && ContaTipo !== '') {
                              if(Confirsenha === Senha) {
                                  if(Instituicao !== "Instituição" ) {
                                    if(Cidade !== "Cidade") {
                                      if(Estado !== "Estado") {
                                        if(ContaTipo !== "Conta") {
                                          await setConta("serv");
                                          const res = await Api.cadastroserv(Email, Senha, Nome, Telefone, 
                                            Cidade, Estado, Instituicao,  ContaTipo);
                                          await verStatus();

                                        } else {
                                          alert("Escolha Uma Conta"); 
                                        }
                                      } else {
                                      alert("Escolha Um Estado");
                                      }
                                    } else {
                                      alert("Escolha Uma Cidade");
                                    }
                                  } else {
                                    alert("Escolha Uma Instituição");
                                  }
                              } else {
                                alert("A Confirmação de senha está errado");
                              }
                    } else {
                  
                      alert("Preencha Todos os Campos");
                    }

                    await setLoading(false);
                  }



                  const cadastrandoadmin  =  async () => {
                    await setLoading(true);
                    if(Email != '' && Senha != '' && Nome != '' && Telefone != ''
                    && Confirsenha != '' && Cidade != '' && Estado != '' 
                    &&  ContaTipo !== '') {
                              if(Confirsenha === Senha) {
                                  if(Instituicao !== "Instituição" ) {
                                    if(Cidade !== "Cidade") {
                                      if(Estado !== "Estado") {
                                        if(ContaTipo !== "Conta") {
                                          await setConta("admin");
                                          const res = await Api.cadastroadmin(Email, Senha, Nome, Telefone,Cidade, Estado,  ContaTipo);
                                          await verStatus();

                                        } else {
                                          alert("Escolha Uma Conta"); 
                                        }
                                      } else {
                                      alert("Escolha Um Estado");
                                      }
                                    } else {
                                      alert("Escolha Uma Cidade");
                                    }
                                  } else {
                                    alert("Escolha Uma Instituição");
                                  }
                              } else {
                                alert("A Confirmação de senha está errado");
                              }
                    } else {
                      alert("Preencha Todos os Campos");
                    }

                    await setLoading(false);
                  }



                  const IndoLogar = async () => {
                    await localStorage.setItem('status', "0");
                    verStatus();
                    }



                  const logandoServ = async () => {
                      await setLoading(true);
                      if(Email !== "" && Senha !== "" && Conta !== " ") {
                        const res = await Api.LogandocontaServ(Email, Senha, Conta );
                          if(res) {                          
                            setAlert(res);
                            localStorage.setItem('erros', '');
                          } else {
                            await verStatus();
                          }
                        
                        
                      } else {
                       
                        setAlert("Preencha Todos os Campos");
                      }
                      await setLoading(false);
                    }


  
                   const verStatus = async() => {
                    const status = await localStorage.getItem('status');
                    if( status !== null ){
                      setUser(status);
                     
                    } else {
                      setUser("0");
                    }
                   }    



                  const sair = async ()=> {
                    await Api.sairdaconta();
                    await verStatus();
                  }

                  const AtivandoServ = async ()=> {
                     const res = await Api.ativarServ();
                     console.log("Resultado" + res);


                  }

      
  


  return (
    <div class="wrapper">

        {user === "0" &&  Conta === "serv" &&
          <LoginServ 
          setConta={setConta} 
          setEmail={setEmail} 
          Email={Email} 
          Senha={Senha} 
          setSenha={setSenha} 
          Confirsenha={Confirsenha}
          setConfirsenha={setConfirsenha}
          Cidade={Cidade}
          setCidade={setCidade}
          Estado={Estado}
          setEstado={setEstado}
          Instituicao={Instituicao}
          setInstituicao={setInstituicao}
          Nome={Nome}
          setNome={setNome}
          Telefone={Telefone}
          setTelefone={setTelefone}
          cadastrando={cadastrando}
          ContaTipo={ContaTipo}
          setContaTipo={setContaTipo}
          setLoading={setLoading}
          Loading={Loading}
          logando={logandoServ}
          Alert={Alert}
          setAlert={setAlert}
           />  
        }


        {user === "0" &&  Conta === "admin" &&
          <LoginAdmin 
          Email={Email} 
          setEmail={setEmail} 
          Senha={Senha} 
          setSenha={setSenha} 
          Confirsenha={Confirsenha}
          setConfirsenha={setConfirsenha}
          Cidade={Cidade}
          setCidade={setCidade}
          Estado={Estado}
          setEstado={setEstado}
          Nome={Nome}
          setNome={setNome}
          Telefone={Telefone}
          setTelefone={setTelefone}
          cadastrando={cadastrandoadmin}
          ContaTipo={ContaTipo}
          setContaTipo={setContaTipo}
          setLoading={setLoading}
          Loading={Loading}
          logando={logandoServ}
          />  
        }

       
        <BrowserRouter>

        {user === "4" && Conta === "admin" &&
          <>
            <HeaderAdmin/>
            <MenuAdmin 
             sair={sair}
            />
            <RoutesAdmin />
            <FooterAdim />
          </>
        }

        {user === "1" &&  Conta === "serv" &&
        <>
          <PagVerificar 
          IndoLogar={IndoLogar}
          />
        </>
        }
        
        {user === "2" &&  Conta === "serv" &&
          <>
           <AtivaPag
           IndoLogar={AtivandoServ}
           />
          </>
        }

        {user === "4" && Conta === "serv" &&
          <>
            <HeaderServ/>
            <MenuServ 
            sair={sair}
            />
            <RoutesServ />
            <FooterServ />
          </>
        }
       
      </BrowserRouter>

    </div>
  );
}

export default App;
