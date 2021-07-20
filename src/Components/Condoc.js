import React, { Component, useState, useEffect } from 'react';
import CheckboxCond from './CheckboxCond';
import Butao from './Butao_list';
import Api from '../Api';
import SearchIcon from '@material-ui/icons/Search';



export default ({Forms, setForms, activeChat, setVirModal}) => {

    const [Condicao, setCondicao] = useState([]);
    const [Pesquisa, setPesquisa] = useState('');
    const [CondVer, setCondVer] = useState(Forms);
    


    useEffect(() => {
        if(activeChat !== null) {
            PegarCondi();
        }
       
    }, [activeChat]);

  

    const addCond = (value, chek)=>{
      let mast = Forms.filter(item => item.id.includes(value.id));
          if(mast.length === 0){
            if(chek === true){
              setForms([...Forms.filter((item, index) => item.id !== value.id)]);
            }else {
              
              setForms([... Forms, value]);
            
            }
          }
       
        
       
      }

    const PegarCondi = async ()=> {
        await Api.PegarCondicionais(Condicao, setCondicao);
       
    }

    const AdicionaCond = ()=>{
        Api.AddCondi(activeChat, Forms);
        setVirModal(false);
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
            style={"btn .btn-sm btn-info"}
            titulo={"Salvar"}
            onClick={()=>AdicionaCond()}
            />
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
              <CheckboxCond
              key={key} 
              label={item.nome}
              Forms={Forms}
              id={item.id} 
              res={false}
              activeChat={activeChat}
              onChange={(value, chek)=>{addCond(value, chek)}} 
              /> <br />  
                </>
              ))}
                </div>
            {/* /.card-body */}
          </div>
            </div>

 
        );
    }
