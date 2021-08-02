import React, { Component, useState, useEffect } from 'react';
import CheckboxCond from './CheckboxCond';
import Butao from './Butao_list';
import Api from '../Api';
import SearchIcon from '@material-ui/icons/Search';



export default ({Forms, setForms, activeChat, setVirModal, setAlert, setAlertTipo }) => {

    const [Condicao, setCondicao] = useState([]);
    const [Pesquisa, setPesquisa] = useState('');
    const [CondVer, setCondVer] = useState(Forms);
    


    useEffect(() => {
        if(activeChat !== null) {
            PegarCondi();
        }
       
    }, [activeChat]);


    const PegarCondi = async ()=> {
        await Api.PegarCondicionais(Condicao, setCondicao);
       
    }

    const AdicionaCond = (va, jane)=>{
      let id = va;
      let nome = jane;
        Api.AddCon(activeChat, id, nome, setAlertTipo, setAlert);
       }

       const FecharCond = ()=>{
        setVirModal(false);
       }

        return (
            <div className="formularioCond">
            <div className="card card-warning">
            <div className="card-header">
              <h3 className="card-title">Condicionais da Ocorrência</h3>
            </div>
            <div className="busca">
                        <div className="busca-input">
                        <SearchIcon fontSize="small" style={{color: '#919191'}} />
                        <input type="search" 
                        placeholder="Procurar Condicional"
                        onChange={e=>{setPesquisa(e.target.value)}}
                        value={Pesquisa}
                        />
                        </div>
                        </div>
            {/* /.card-header */}
            <div className="card-body">
            <div className="row no-print">
            <div className="col-12">
           
             <Butao 
            style={"btn .btn-sm btn-danger"}
            titulo={"Fechar"}
            onClick={()=>FecharCond()}
            />    
            </div>
          </div>
            
              { Condicao.filter((val)=>{
                if (Pesquisa == "") {
                  return val;
                }else if (val.nome.toLowerCase().includes(Pesquisa.toLowerCase())) {
                  return val;
                }
              }).map((item, key)=>(
            
                <>
                {Forms.filter(te => te.id.includes(item.id)).length === 0 &&
                   <>
                   <div className="CaixaEndPes" >
                   <string>{item.nome}</string>
                   <div className="chatWindow--btn1"
                   onClick={()=>AdicionaCond(item.id, item.nome)}
                   >
                   <p className="textButao" >Add</p>
                   </div>
                   </div>
                    <br /> 
                  </> 
                }
               
               
              {/* <CheckboxCond
              key={key} 
              label={item.nome}
              Forms={Forms}
              id={item.id} 
              res={false}
              activeChat={activeChat}
              onChange={(value, chek)=>{addCond(value, chek)}} 
              />  */}
             
                </>
              ))}
                </div>
            {/* /.card-body */}
          </div>
            </div>

 
        );
    }
