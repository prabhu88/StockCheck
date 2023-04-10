import React,{useEffect, useState} from 'react'
const TableHeader = ({colsList}) => {
    return (
      <thead>
        {
            colsList.map((colHeader) => (
                <th>{colHeader}</th>
            ))            
        }
        <th></th>        
      </thead>
    );
};
const TableBody = ({data,colsList,update,deleteControl}) =>{    
    return(
        <tbody>
            {
                data.map((row)=>(
                    <tr key={row.id}>
                        {
                            colsList.map((col)=>(
                                <td>{row[col]}</td>                                
                            ))
                        }
                        <td className="d-flex justify-content-around">
                            <button className="btn btn-sm btn-info" onClick={() => update(row)}>Edit</button>
                            <button className="btn btn-sm btn-danger" onClick={() => deleteControl(row.id)}>Delete</button>
                        </td>
                    </tr>
                ))
            }
        </tbody>
    )
}
const ClientTable = ({data,colsList,update,deleteControl}) => {
    const [tableData, setTableData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage,setRowsPerPage] = useState(5);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const handleItemsPerPageChange = (e) => {
        setRowsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };
    const handleSearch = (e) => {
        let searchText = (e.target.value).trim()
        if (searchText.trim() === '') {
            setTableData(data)
            return
        }
        const filteredData = tableData.filter((row) => {
            for (let col of colsList) {
              if (row[col] && row[col].toString().toLowerCase().includes(searchText.toLowerCase())) {
                return true
              }
            }
            return false
        })
        setTableData(filteredData)
    }
    useEffect(() => {
        setTableData(data)
    }, [data])
    
    return(
        <div className="col-md-12 col-sm-12">
            <div className="row justify-content-end p-2">
                <div className="col-md-3 pull-right">
                    <input className="form-control xs right" type="text" name="search"  
                        onChange={handleSearch}
                    />
                </div>
                <div className="col-md-2 col-sm-6">
                    <select className="form-control form-control-sm" value={rowsPerPage} onChange={handleItemsPerPageChange}>
                        <option value={5}>5 per page</option>
                        <option value={10}>10 per page</option>
                        <option value={20}>20 per page</option>
                    </select>
                </div>
            </div>
            <div className="row">
                <table className="table table-bordered">
                    <TableHeader colsList={colsList} />
                    <TableBody data={currentRows} colsList={colsList}                         
                        update={update} delete={deleteControl}                     
                    />
                </table>
            </div>
            <div className="row justify-content-center">
                <nav aria-label="Page navigation">
                    <ul className="pagination">
                    {
                        Array.from({ length: Math.ceil(tableData.length / rowsPerPage) }).map(
                        (_, index) => (
                            <li key={index} className="page-item">
                                <button
                                className="page-link"
                                onClick={() => paginate(index + 1)}
                                >
                                {index + 1}
                                </button>
                            </li>
                        ))
                    }
                    </ul>
                </nav>
            </div>
        </div>
    )
}
export default ClientTable