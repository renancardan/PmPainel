import firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';

import firebaseConfig from './JSONS/firebaseConfig';

// const Auth = '';
// const db = '';
// if (!firebase.apps.length) {
  
//  }else {
//   const firebaseApp= firebase.app(); 
//   const Auth =firebaseApp.auth();
//   const db = firebaseApp.firestore();
//   }

const firebaseApp =  firebase.initializeApp(firebaseConfig);
const Auth =firebaseApp.auth();
const db = firebaseApp.firestore();


export default {


    cadastroserv:async (Email, Senha, Nome, Telefone, Cidade, 
      Estado, Instituicao, ContaTipo) => {
        await Auth.createUserWithEmailAndPassword(Email, Senha)
        .then( async () => {
          await localStorage.setItem('status', "2");
          const user =  await Auth.currentUser;
           await user.sendEmailVerification();
          const id = user.uid;
         
          await db.collection('users').doc(id).set({
            nomeCompleto: Nome, 
            telefone: Telefone, 
            cidade: Cidade, 
            estado: Estado, 
            instituicao: Instituicao,
            Conta:{ admin:{ativa:false, desbloqueda:false, tipo:false},
                    app:{ativa:false, desbloqueda:false, tipo:false} ,
                    negApp:{ativa:false, desbloqueda:false, tipo:false},
                    serv:{ativa:true, desbloqueda:false, tipo:ContaTipo},
                    servApp:{ativa:false, desbloqueda:false, tipo:false},
            
                  }
          });
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
                alert('Esse endereço de email já esta em uso!');
          }
      
          if (error.code === 'auth/invalid-email') {
            alert('Esse endereço de e-mail é inválido!');
          }

          if (error.code === 'auth/operation-not-allowed') {
            alert('Tente novamente mais tarde!');
          }

          if (error.code === 'auth/weak-password') {
            alert('Digite uma senha melhor!');
          }
        });
    },

    cadastroadmin:async (Email, Senha, Nome, Telefone, Cidade, 
      Estado, ContaTipo) => {
        await Auth.createUserWithEmailAndPassword(Email, Senha)
        .then( async () => {
          await localStorage.setItem('status', "1");
          const user =  await Auth.currentUser;
          await user.sendEmailVerification();
          const id = user.uid;
         
          await db.collection('users').doc(id).set({
            nomeCompleto: Nome, 
            telefone: Telefone, 
            cidade: Cidade, 
            estado: Estado, 
            Conta:{ admin:{ativa:true, desbloqueda:false, tipo:ContaTipo},
                    app:{ativa:false, desbloqueda:false, tipo:false} ,
                    negApp:{ativa:false, desbloqueda:false, tipo:false},
                    serv:{ativa:false, desbloqueda:false, tipo:false},
                    servApp:{ativa:false, desbloqueda:false, tipo:false},
            
                  }
          });
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
                alert('Esse endereço de email já esta em uso!');
          }
      
          if (error.code === 'auth/invalid-email') {
            alert('Esse endereço de e-mail é inválido!');
          }

          if (error.code === 'auth/operation-not-allowed') {
            alert('Tente novamente mais tarde!');
          }

          if (error.code === 'auth/weak-password') {
            alert('Digite uma senha melhor!');
          }
        });
    },
    
    LogandocontaServ:async (Email, Senha, Conta) => {
      await Auth.signInWithEmailAndPassword(Email, Senha).then( async() => {
        const autenticado =  await Auth.currentUser;
        const id = await autenticado.uid;
        const dados = await db.collection('users').doc(id).get();
        const result = dados.data();
        console.log(result.Conta.serv);
        const verificar = await autenticado.emailVerified;
        if( verificar === false ) {
          await localStorage.setItem('status', "1");
        } else {
            if(result.Conta.serv.ativa === false) {
              await localStorage.setItem('status', "2");
            } else {
              if(result.Conta.serv.desbloqueada === false){
                await localStorage.setItem('status', "3");
              } else {
                await localStorage.setItem('status', "4");
              }
              

            }
           
        }
  
        }).catch(error => {
            if (error.code === 'auth/invalid-email') {
              localStorage.setItem('erros', 'Esse endereço de e-mail é inválido!');
             }
             if (error.code === 'auth/user-disabled') {
              localStorage.setItem('erros', 'Seu usuário está desativado!');
            }
            if (error.code === 'auth/user-not-found') {
              localStorage.setItem('erros', 'Não existe esse usuário!');
            }
            if (error.code === 'auth/wrong-password') {
              localStorage.setItem('erros', 'E-mail e/ou senha errados!');
            }
      });

        const erros = await localStorage.getItem('erros');
        if(erros) {
          return erros;
        } else {
          return null;
        }

      
    },
    
    ativarServ: async()=> {
      
      const autenticado =  await Auth.currentUser;
      const id = await autenticado.uid;
      const result = db.collection("users").doc(id);
      return result.update({
          Conta: {
            serv:{
              ativa:true
            }
          }
      })
      .then(() => {
          console.log("ativado");
          return "Ativado";
      })
      .catch((error) => {
          console.error("Error updating document: ", error);
          return error;
      });
    },

    sairdaconta: async()=> {
      await Auth.signOut().then( async () => {
        
        
      });
    }

   
};