//IMPORTAR O MODULO EXPRESS- framework de aplicação web para Node.js
const express = require('express')
//MÓDULO QUE PERMITE QUE O SERVIDOR ACEITE REQUISIÇÕES DIFERENTES (DOMINIOS)
const cors =require('cors');

//Instanciando express para app
const app = express();

//DEFININDO A PORTA QUE O SERVIDOR VAI EXECUTAR
const port=3001;

//Configura o express para analisar as requisições com o 
// corpo no formato json, isso é necessário para ler os dados enviadis
//no corpo da requisição POST
app.use(express.json());

//Habilita o CORS para todas as rotas da aplicação,permitindo acesso 
app.use(cors());

//Objeto( tabela com os preços)
const precos={
    bicicleta:0.75, // preço por km para bicicleta
    carro:0.25, // preço por km para carro
    drone: 1.20 // preço por km para drone
}

// Definindo uma rota de API tipo POST 

//função de callback lida com requisição 

app.post('/calcularfrete',(req,res)=>{
    // destruct para o corpo da requisição e extrair distancia e tipoTransporte
    const {distancia,tipoTransporte}= req.body;
    
    //verifica se a distancia ou tipotransporte não foram fornecidos
    if(distancia === undefined || tipoTransporte === undefined){
        return res.status(400).json({error:'Distancia e tipo de transporte são obrigátorios'})
    }

    //Busca o preço por KM no objeto convertendo o tipo de transporte para mínusculas
    const precoPorKm = precos[tipoTransporte.toLowerCase()];

    // verifica se o tipotransporte fornecido existe na tabela de preços
    if(precoPorKm === undefined){
        return res.status(400).json({error: "Tipo de transporte inválido"})
    }
    // calcula o valor total do frete multiplicando a distancia pelo preço por km
    const valorTotal = distancia * precoPorKm;

    //Envia a resposta com o objeto JSON
    // toFixed - formata o valor total para ter exatamente duas casas decimais
     res.json({valorTotal: valorTotal.toFixed(2)})
})


//INICIA O SERVIDOR PARA QUE ELE COMECE A ESCUTAR AS REQUISIÇÕES NA PORTA
app.listen(port,()=>{
    console.log(`Servidor Rodando na porta http://localhost:${port}`);
})


