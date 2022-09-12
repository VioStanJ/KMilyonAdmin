import axios from 'axios';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Modal } from 'react-bootstrap';
import CreateGame from '../Components/CreateGame';

export default class Game extends Component{

    constructor(props){
        super(props);

        this.state = {
            load : true,
            games:[],
            show : false,
            game : {},
            create:false,
            types:[]
        }
    }

    componentDidMount(){
        if(this.state.load){
            this.refresh();
        }
    }

    refresh = () => {
        axios.get("/games/all").then((res)=>{
            console.log(res,"Games");
            this.setState({load:false});
            if(res.data.status === 200){
                this.setState({games:res.data.data});
            }
        }).catch((err)=>{
            console.log(err,'err games');
        });
        this.setState({load:false});
    }

    edit = (type) => {
        console.log(type);
        // this.setState({show:true,game:type});
    }

    openCreateModal = () => {
        axios.get("/gametypes/all").then((res)=>{
            this.setState({load:false});
            if(res.data.status === 200){
                this.setState({types:res.data.data});
            }
        }).catch((err)=>{
            console.log(err,'err game types');
        });

        this.setState({show:true});
    }

    save = () => {
        console.log("saved");
    }

    render() {
        const columns = [
            {
                name: 'Imaj',
                selector : row => <span><img src={row.image} alt="" style={{width:40,height:40}} /></span>
            },
            {
                name: 'Non',
                selector : row => row.name
            },
            {
                name: 'Slug',
                selector : row => row.slug
            },
            {
                name: 'Tip',
                selector : row => row.game_type.name
            },
            {
                name: 'Deskripsyon',
                selector: row => row.description,
                sortable: true,
            },
            {
                name: 'Opsyon',
                cell : row => <span>
                    <button className='btn btn-primary' onClick={()=>this.edit(row)}>Modifye</button>
                    <button className='btn btn-danger ms-3'>Efase</button>
                </span>
            }
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
            <div className="row">
                <h4 className="text-success col">{this.state.games.length} Jwèt</h4>  
                <button className='btn btn-secondary btn-sm col' onClick={this.openCreateModal}><i className="fa-solid fa-plus"></i> Kreye Jwèt</button>    
            </div> 
            <br />        
            <DataTable
                columns={columns}
                pagination={true}
                fixedHeader={true}
                striped={true}
                data={this.state.games}
                />

            <CreateGame
                show={this.state.show}
                hide={()=>this.setState({show:false})}
                types={this.state.types}
                save={this.save}
                />
                
        </div> 
        }
    }
}