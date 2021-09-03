import React, {useState, useEffect} from 'react';
import { Empty } from 'salve/lib/salve/patterns';
import Api from '../../Api';
import Butao from '../../Components/Butao_list';
import Campo from '../../Components/Campo';
import Header from '../../Components/Header';
import { DatePicker, DatePickerInput } from 'rc-datepicker';
import Checkbox from '../../Components/Checkbox';



export default ({Dados, Avisando, Fechar, Id, setAlert, setAlertTipo, name}) => {
const [Nome, setNome] = useState("");
const [Titulo, setTitulo] = useState("Editar Anuncio");
const [Img1, setImg1] = useState("../assets/avatarimg.png");
const [Imgs, setImgs] = useState("");
const [Link, setLink] = useState("");
const [DataIni, setDataIni] = useState(new Date());
const [DataFim, setDataFim] = useState(new Date());
const [res1, setres1] = useState(false);
const [Viz, setViz] = useState(0);
const [Infor, setInfor] = useState("nulo");
const [Mudar, setMudar] = useState(false);


useEffect(() => {
 console.log(Imgs)
  }, [Imgs]);
  useEffect(() => {
    setNome(name);
     }, []);

useEffect( async ()=> {
  if(Infor !== "nulo"){
   await setres1(Infor.ativo);
    await setNome(Infor.nome);
   await  setLink(Infor.link);
    await setDataIni(Infor.DataIni);
    await setDataFim(Infor.DataFim);
    await setImg1(Infor.foto);
   
    await setViz(Infor.QuantVi);
    await setMudar(true);
     }

  }, [Infor]);

  useEffect(() => {
    console.log(res1)
    console.log(Img1);
      }, [res1]);


       useEffect(() => {
      Vizualizar();
         }, []);

  const criando = ()=>{
    console.log(Nome);
    if(Nome !=="" && Nome !==" " && Nome !=="  " && Nome !=="   " && Nome !=="    " && Nome !=="     " && Nome !=="      "
    && Nome !=="       " && Nome !=="        " && Nome !=="         " && Nome !=="          " 
    && Nome !=="           " ){
      if (navigator.onLine) {
                
        Api.EditandoAnun(Dados, Id, setAlertTipo, setAlert, Imgs, Nome, Link, DataIni, DataFim, res1, Viz, Img1  );
 
       
      } else {
        setAlert("Sem Internet");
        setAlertTipo("danger");
      }
    } else {
      setAlert("Coloque um nome no campo");
        setAlertTipo("danger");
    }
    
  }

  const ColocarImg1 = (e)=>{
    const reader = new FileReader()
    reader.onload = () => {
      if(reader.readyState === 2) {
        setImg1(reader.result);
      }
    }
   reader.readAsDataURL(e.target.files[0]);
    setImgs(e.target.files[0]);
  }
  const ExcImg1 = ()=>{
   
    setImgs("");
    setImg1("../assets/avatarimg.png");
  }
  const DatandoA = (jsDate, dateString)=>{
    let currentDate = '';
    let now =new Date(jsDate);
    let Dia = now.getDate();
    let Mes = (now.getMonth()+1);
    let Ano = now.getFullYear();
    Dia = Dia < 10 ? '0'+Dia : Dia;
    Mes = Mes < 10 ? '0'+Mes : Mes;
    currentDate = Ano+'-'+Mes+'-'+Dia;
    let variac = new Date(currentDate +"T00:00:00.000").getTime();
    setDataIni(variac);
  }

  const DatandoB = (jsDate, dateString)=>{
    let currentDate = '';
    let now =new Date(jsDate);
    let Dia = now.getDate();
    let Mes = (now.getMonth()+1);
    let Ano = now.getFullYear();
    Dia = Dia < 10 ? '0'+Dia : Dia;
    Mes = Mes < 10 ? '0'+Mes : Mes;
    currentDate = Ano+'-'+Mes+'-'+Dia;
    let variac = new Date(currentDate +"T00:00:00.000").getTime();
    setDataFim(variac);
  }

  const Vizualizar = async ()=>{
     
    if (navigator.onLine) {
      
      await Api.VizualizandoAnun(Id, Dados, setInfor);
      
     } else {
       setAlert("Sem Internet");
       setAlertTipo("danger");
     }
  }

  const Peencher = async ()=>{
   
  }

  

        return (
            <>
<div className="content-wrapper">
                <Header 
                Titulo={Titulo}
                Avisando={Avisando}
                Fechar={Fechar}
                />
               <section className="content">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12">
                    
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
                    <strong>Digite o Nome do Anuncio:</strong><br />
                    <div className="input_cadatro">
                              <Campo 
                                  type={"text"}
                                  placeholder= {name}
                                  icon={"fas "}
                                  value={Nome}
                                  onChange={e=>setNome(e.target.value)}
                                  mask={null}
                                />

                            </div> 
                    <br />
                    <strong>Digite a Quantidade Vizualizações:</strong><br />
                    <div className="input_cadatro">
                              <Campo 
                                  type={"text"}
                                  placeholder= {Viz}
                                  icon={"fas "}
                                  value={Viz}
                                  onChange={e=>setViz(e.target.value)}
                                  mask={null}
                                />

                            </div> 
                    <br />
                    <strong>Digite o Link:</strong><br />
                    <div className="input_cadatro">
                              <Campo 
                                  type={"text"}
                                  placeholder= {"Digite o Link"}
                                  icon={"fas "}
                                  value={Link}
                                  onChange={e=>setLink(e.target.value)}
                                  mask={null}
                                />

                            </div> 
                    <br />
                    <strong>Escolha a Data Início:</strong><br />
                    <DatePickerInput
                                  onChange={DatandoA}
                                  value={DataIni}
                                  className='my-custom-datepicker-component'
                                  
                                />
                                <br /> 
                                <strong>Escolha a Data Fim:</strong><br />
                    <DatePickerInput
                                  onChange={DatandoB}
                                  value={DataFim}
                                  className='my-custom-datepicker-component'
                                  
                                />
                                <br /> 
                             
                                <>
                                {Mudar === true   &&
                                <>
                                 <Checkbox 
                                 label={"Ativando a Notícia"} 
                                 res={res1} 
                                 onChange={(value)=>{setres1(value)}} 
                                 /> <br />
                                 </>
                                }
                                </>
                               
                               
                    <strong>Coloque uma Imagem 400px por 100px  :</strong><br />
                    <div className="FotosArqui" >
                    <div className="FotoQuaAnun" >
                      {Img1 === "../assets/avatarimg.png" ?
                       <img src={Img1} alt="imagem" className="FotoQua2" />
                      :
                      <img src={Img1} alt="imagem" className="FotoQua1" />
                      }
                   
                    </div>
                  
                 
                  

                    {Imgs === "" ?
                     <div class="input-group">
                     <input type="file"
                     accept="image/*"
                     className="Arquivos"
                     onChange={(e)=>ColocarImg1(e)} 
                     />
                   </div>
                    :
                    <div className="row no-print">
                   <div className="col-12">
                  <Butao 
                   style={"btn .btn-sm btn-danger"}
                   titulo={"Excluir"}
                   onClick={()=>ExcImg1()}
                   />  
                   </div>
                   </div>

                    } 
                   
                   

                   </div>
                  </address>
                </div>
                
              </div>
              <div className="row no-print">
             
                <div className="col-12">
                <Butao 
                style={"btn .btn-sm btn-info"}
                titulo={"Salvar"}
                onClick={()=>criando()}
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