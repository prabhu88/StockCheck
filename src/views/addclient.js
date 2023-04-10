import React,{useState} from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
const initialData = {
    cName: '',
    sName : '',
    gstin : '',
    pan : '',
    email : '',
}
const Client = () => {
    const [client,setClient] = useState(initialData)   
    const addCompany = (e) => {        
        e.preventDefault();        
        let url = process.env.SERVER_URL ?? `http://localhost:9001/client/new`
        Axios.post(url,client)
        .then(response => {
            if(response.data.error === false){
                Swal.fire(response.data.status_message)
            }
            else{
                Swal.fire(response.data.status_message)
            }
        })
    }
    return(        
        <section className="company_panel">
            <h1 className="title">Add New Client</h1>
            <div>
                <form className="form needs-validation" onSubmit={addCompany}>
                    <div className="row form-group">
                        <div className="form-floating  col-lg-6 text-center mb-3">
                            <input id="company" className="form-control" type="text" value={client.cName} required onChange={(e)=>{
                                setClient({...client,cName : e.target.value})
                            }} />
                            <label className="label"  htmlFor="company">Company Name</label>
                        </div>
                        <div className="form-floating col-lg-6 text-center mb-3">
                            <input id="name" className="form-control" type="text" value={client.sName} required onChange={(e)=>{
                                setClient({...client,sName : e.target.value})
                            }} />
                            <label className="label" htmlFor="name">Short Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-floating col-lg-6 text-center mb-3">
                            <input id="gstin" className="form-control" type="text" value={client.gstin} required onChange={(e)=>{
                                setClient({...client,gstin : e.target.value})
                            }} />
                            <label className="label" htmlFor="email">gstin</label>
                        </div>
                        
                        <div className="form-floating col-lg-6 text-center mb-3">
                            <input id="pan" className="form-control" type="text" value={client.pan} required onChange={(e)=>{
                                setClient({...client,pan : e.target.value})
                            }} />
                            <label className="label" htmlFor="phone">PAN</label>
                        </div>
                    </div>
                    <div className="form-floating col-lg-6 text-center mb-3">
                        <input id="email" className="form-control" type="email" value={client.email}  required onChange={(e)=>{
                            setClient({...client,email : e.target.value})
                        }} />
                        <label className="lbl label" htmlFor="email">Email Id</label>
                    </div>
                    <div className="form-floating col-lg-12 mb-3">
                        <input className="submit-btn" type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        </section>        
    )
}

export default Client