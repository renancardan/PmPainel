import React from 'react';
import { Link } from 'react-router-dom';
import Butao from './Butao_list';
import DataTime from './DateFormat';
import Header from './Header';


export default ({Lista, Avisando, Fechar}) => {

  const Salvando = ()=>{
    var pegar_dados  = document.getElementById('dados').innerHTML;
    var janela = window.open('', '', 'width=800, heigth=600'  );
    janela.document.write('<html><head>');
    janela.document.write('<title>Lista de Ocorrências</title></head>');
    janela.document.write('<body>');
    janela.document.write(pegar_dados);
    janela.document.write('</body></html>');
    janela.document.close();
    janela.print();
  }

        return (

          <div className="content-wrapper" id="dados">
            <Header 
            Titulo={"Lista de  Ocorrências"}
            Avisando={Avisando}
            Fechar={Fechar}
            />
            <div className="row">
              <section className="col-12">
              <div  >

{/* <DatePicker locale='pt-br'  onChange={null} value={date} /> */}

 <div className="card-header">
 
   <h3 className="card-title" style={{ marginBottom: "10px", marginRight: "20px"}}>Lista de Ocorrência  </h3> 
  
   
   
 </div>
   <div class="card-body table-responsive p-0">
   <div className="col-sm-4">
    <div className="form-group" style={{"margin":10}}>
    <Butao 
    style={"btn btn-sm btn-info"}
    titulo={"Salvar Em pdf"}
    onClick={()=>Salvando()}
    />
    </div>
    </div> 
   
     <table style={{"borderCollapse":"collapse", "border":"1px solid #000", "margin":20}} >
       <thead>
         <tr>
           <th style={{"borderCollapse":"collapse", "border":"1px solid #000"}} >Nº Copom</th>
           <th style={{"borderCollapse":"collapse", "border":"1px solid #000"}} >Atendente Copom</th>
           <th style={{"borderCollapse":"collapse", "border":"1px solid #000"}} >VTR</th>
           <th style={{"borderCollapse":"collapse", "border":"1px solid #000"}} >Componentes VTR</th>
           <th style={{"borderCollapse":"collapse", "border":"1px solid #000"}} >Data</th>
           <th style={{"borderCollapse":"collapse", "border":"1px solid #000"}} >Período</th>
           <th style={{"borderCollapse":"collapse", "border":"1px solid #000"}} >Rua</th>
           <th style={{"borderCollapse":"collapse", "border":"1px solid #000"}} >Nº</th>
           <th style={{"borderCollapse":"collapse", "border":"1px solid #000"}} >Bairro</th>
           <th style={{"borderCollapse":"collapse", "border":"1px solid #000"}} >Ocorrência</th>
           <th style={{"borderCollapse":"collapse", "border":"1px solid #000"}} >Resultado</th>
          
         </tr>
       </thead>
      
       <tbody >
       {Lista.map((item, key)=>(

              

               
               <tr key={item.list.id}  >
               <td style={{"borderCollapse":"collapse", "border":"1px solid #000"}} >
               {item.list.id}
                </td>

                 <td style={{"borderCollapse":"collapse", "border":"1px solid #000"}}>
                 {item.list.atendenteCopom} 
                 </td>

                 <td style={{"borderCollapse":"collapse", "border":"1px solid #000"}}>
                 {item.list.vtr}
                 </td>

                 <td style={{"borderCollapse":"collapse", "border":"1px solid #000"}}>
                 {item.list.componentesVtr}
                 </td>

                 <td style={{"borderCollapse":"collapse", "border":"1px solid #000"}}>
                 <DataTime 
                  DateIni={item.list.date}
                  />
                 </td >

                 <td style={{"borderCollapse":"collapse", "border":"1px solid #000"}}>
                 {item.list.periodo}
                 </td>

                 <td style={{"borderCollapse":"collapse", "border":"1px solid #000"}}>
                 {item.list.rua}
                 </td>

                 <td style={{"borderCollapse":"collapse", "border":"1px solid #000"}}>
                 {item.list.numero}
                 </td>

                 <td style={{"borderCollapse":"collapse", "border":"1px solid #000"}}>
                 {item.list.bairro}
                 </td>


                 <td style={{"borderCollapse":"collapse", "border":"1px solid #000"}}>
                 {item.list.condi.map((item, key)=>(
                   <>
                   <sting>{item.nome}/</sting><br/>
                   </>
                 ))}
                 </td>

                 <td style={{"borderCollapse":"collapse", "border":"1px solid #000"}}>
                 {item.list.resultado}
                 </td>
             </tr>
            
        ))}
           </tbody> 
     
       
       
     </table>
      
    </div>
   </div>
              </section>
                </div>
                
          </div>
                
          
        
        );
    }