import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClientTable from '../component/tables/ClientList';
import Swal from 'sweetalert2';

const EditClient = () => {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({});
  
    useEffect(() => {
        fetchData();
    }, []);  
    const fetchData = async () => {
        try {
            let url = process.env.SERVER_URL ?? `http://localhost:9001/client/${'listAllClient'}`
            const response = await axios.get(url);
            setData(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };
  
    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };  
    const handleSubmit = async (event) => {
        event.preventDefault();
        let url = process.env.SERVER_URL ?? `http://localhost:9001/client/`
        try {                      
            if (!formData.id) {
                const response = await axios.post(url+'new', formData);
                Swal.fire(response.data.status_message)
                if(!response.data.error)
                    setData([...data, response.data.data]);                
            }          
            else {
                const response = await axios.put(url+`update/${formData.id}`, formData);
                Swal.fire(response.data.status_message)
                if(!response.data.error)
                    setData(data.map((item) => (item.id === response.data.data.id ? response.data.data : item)));                
            }
            setFormData({});
        } catch (error) {
            console.error(error);
        }
    };  
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://example.com/api/data/${id}`);
            setData(data.filter((item) => item.id !== id));
        } catch (error) {
            console.error(error);
        }
    };
    const colsList = ['id','name','gstin']  
    return (
        <div>      
            <div className="row">
                <form className="form needs-validation" onSubmit={handleSubmit}>
                    <div className="row form-group">
                        <div className="form-floating  col-md-6 text-center mb-3">
                            <input name="name" className="form-control" type="text" value={formData.name || ''} required onChange={handleInputChange} />
                            <label className="label"  htmlFor="company">Company Name</label>
                        </div>
                        <div className="form-floating col-md-6 text-center mb-3">
                            <input name="short_name" className="form-control" type="text" value={formData.short_name || ''} required onChange={handleInputChange} />
                            <label className="label" htmlFor="name">Short Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-floating col-md-6 text-center mb-3">
                            <input name="gstin" className="form-control" type="text" value={formData.gstin || ''} required onChange={handleInputChange} />
                            <label className="label" htmlFor="email">gstin</label>
                        </div>
                        
                        <div className="form-floating col-md-6 text-center mb-3">
                            <input name="pan" className="form-control" type="text" value={formData.pan || ''} required onChange={handleInputChange} />
                            <label className="label" htmlFor="phone">PAN</label>
                        </div>
                    </div>
                    <div className="form-floating col-md-6 text-center mb-3">
                        <input name="email" className="form-control" type="email" value={formData.email || ''}  required onChange={handleInputChange} />
                        <label className="lbl label" htmlFor="email">Email Id</label>
                    </div>
                    <div className="d-flex justify-content-around col-lg-12 mb-3">
                        <input className="btn btn-primary submit-btn" type="submit" value="Add/Update" />
                        <button className="btn btn-warning" type="button" onClick={() => setFormData({})}>Clear</button>
                    </div>            
                </form>
            </div>
            <hr/>
            <ClientTable data={data} colsList={colsList} update={setFormData} deleteControl={handleDelete} />
            <hr/>      
        </div>
    );
};

export default EditClient;
