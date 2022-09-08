import axios from 'axios';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import DataTable from 'react-data-table-component';

export default class GameType extends Component{

    constructor(props){
        super(props);

        this.state = {
            load : true,
            types:[]
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

    render() {
        const columns = [
            {
                name: 'Non',
                selector : 'name'
            },
            {
                name: 'Imaj',
                selector: 'icon',
                sortable: true,
            },
            {
                name: 'Option',
                cell : row => <span></span>
            }
        ]

        if(this.state.load){
            return <h1>Loading</h1>;
        }else{
            return <div className='container'>
            <div className="row">
                <div>
                    <h4 className='orange'>Tip Jwèt</h4>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/home">Akèy</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Lis Tip Jwèt yo</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <hr />
            <br />
            <h4 className="text-muted">{this.state.types.length} Tip Jwèt</h4>           
            <DataTable
                columns={columns}
                pagination={true}
                fixedHeader={true}
                striped={true}
                data={this.state.types}
                />
        </div>
        }
    }
}