import {NewClient,GetAllClients,ClientUpdate} from "./clientAction";
const AddClient  = async (req,res) => {
    try{
        NewClient(req).then(result => {
            res.send(result)
        }).catch(err=>{
            res.send(err)
        })
    }
    catch(err){
        res.status(500).send(`Server Error : ${err} . Please contact administrator`)
    }
}
const ListClient = async (req,res) => {
    try{                
        GetAllClients().then(result => {
            res.send(result)
        }).catch(err=>{
            res.send(err)
        })
    }
    catch(err){
        res.status(500).send(`Server Error : ${err} . Please contact administrator`)
    }
}
const UpdateClient = async (req,res) => {
    try{        
        const { id } = req.params;
                
        if(!id){
            return res.status(404).json({ error: 'Item not found' });
        }                
        ClientUpdate(req).then(result => {
            res.send(result)
        }).catch(err=>{
            res.send(err)
        })   
        
    }
    catch(err){
        res.status(500).send(`Server Error : ${err} . Please contact administrator`)
    }
}
module.exports = {
    AddClient : AddClient,
    ListClient : ListClient,
    UpdateClient : UpdateClient
}