import axios from 'axios';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Modal } from 'react-bootstrap';

export default class Game extends Component{

    constructor(props){
        super(props);

        this.state = {
            load : true,
            types:[],
            show : false,
            game : {}
        }
    }

    componentDidMount(){
        if(this.state.load){
            axios.get("/gametypes/all").then((res)=>{
                console.log(res.data.data,"ProfiGame Typesle");
                this.setState({load:false});
                if(res.data.status === 200){
                    this.setState({types:res.data.data});
                }
            }).catch((err)=>{
                console.log(err,'err game types');
            });
            this.setState({load:false});
        }
    }

    edit = (type) => {
        console.log(type);
        this.setState({show:true,game:type});
    }

    render() {
        const columns = [
            {
                name: 'ID',
                selector : row => row.id
            },
            {
                name: 'Non',
                selector : row => row.name
            },
            {
                name: 'Imaj',
                selector: row => row.icon,
                sortable: true,
            },
            // {
            //     name: 'Opsyon',
            //     cell : row => <span>
            //         <button className='btn btn-primary' onClick={()=>this.edit(row)}>Modifye</button>
            //         <button className='btn btn-danger ms-3'>Efase</button>
            //     </span>
            // }
        ]

        if(this.state.load){
            return <h1>Loading</h1>;
        }else{
            return <div className='container'>
            <div className="row">
                <div>

                    <h4 className='text-success'>Jwèt</h4>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb ">
                            <li className="breadcrumb-item"><Link to="/home" className='text-success'>Akèy</Link></li>
                            <li className="breadcrumb-item active text-success" aria-current="page">Jwèt yo</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <hr />
            <br />
            <h4 className="text-success">{this.state.types.length} Tip Jwèt</h4>           
            <DataTable
                columns={columns}
                pagination={true}
                fixedHeader={true}
                striped={true}
                data={this.state.types}
                />
            {/* Modal */}
            <Modal show={this.state.show} 
                onHide={()=>this.setState({show:false})} 
                animation={false}
                centered>
                <Modal.Header closeButton>
                <Modal.Title>Modifye - {this.state.game.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                {/* <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button> */}
                </Modal.Footer>
            </Modal>
        </div> 
        }
    }
}