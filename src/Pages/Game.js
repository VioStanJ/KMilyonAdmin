import axios from 'axios';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import FormData from 'form-data'
import { Modal } from 'react-bootstrap';
import Select from 'react-select';

export default class Game extends Component{

    constructor(props){
        super(props);

        this.state = {
            load : true,
            games:[],
            show : false,
            game : {},
            create:false,
            types:[],
            modal_title : '',
            edit : false,
            name : '',
            description : '',
            type_id : 0,
            image : null,
            temp : null,
            type : {}
        }
    }

    componentDidMount(){
        if(this.state.load){
            this.refresh();
            this.getTypes();
        }
    }

    refresh = () => {
        this.setState({load:true});
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

    edit = (game) => {
        console.log(game);
        this.setState({modal_title:"Modifye Jwèt : "+game.name,edit:true,show:true,game:game,name:game.name,description:game.description,
            type:{value : game.game_type.id,label:game.game_type.name}});
    }

    openCreateModal = () => {
    
        this.setState({modal_title:"Kreye Jwèt",edit:false});

        this.setState({show:true});
    }

    getTypes = () => {
        axios.get("/gametypes/all").then((res)=>{
            this.setState({load:false});
            if(res.data.status === 200){
                this.setState({types:res.data.data});
            }
        }).catch((err)=>{
            console.log(err,'err game types');
        });
    }

    save = () => {

        console.log(this.state.edit);
        let dt = new FormData();
        if(this.state.edit){
            dt.append("id",this.state.game.id);
        }
        dt.append("type_id",this.state.type.value);
        dt.append("name",this.state.name);
        dt.append("description",this.state.description);
        if(this.state.image === null || this.state.image === 'null'){
            dt.append("image",null);
        }else{
            dt.append("image",this.state.image);
        }

        const config = {
            withCredentials: true,
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }

        axios({
            method: 'POST',
            url: this.state.edit?"/games/edit":"/games/create",
            data: dt,
            config
        }).then( (response) => {
            console.warn(response,"RPx");
            if(response.status === 200){
                this.setState({show:false});
                this.refresh();
            }
            console.log(response,"SAVE GAME");
        }).catch((err)=>{
            console.warn(err);
        });
    }

    delete = (game) => {
        console.log(game);
    }

    handleFile = (e) => {
        let file = e.target.files[0];
        if(file == null){
            return;
        }
        this.setState({ image: file, temp: URL.createObjectURL(e.target.files[0]) });
    }

    setType = (e) => {
        if(e === null || e === 'null'){
            this.setState({type:null});
            return;
        }
        this.setState({type:e});
    }

    manage = (game) => {
        console.log(game);
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
                selector : row => <b>{row.game_type.name}</b>
            },
            {
                name: 'Deskripsyon',
                selector: row => row.description,
                sortable: true,
            },
            {
                name: 'Opsyon',
                cell : row => <span>
                    <button className='btn btn-primary' onClick={()=>this.edit(row)} data-bs-toggle="tooltip" data-bs-placement="top" title="Modifye"><i className="fa-solid fa-pen"></i></button>
                    <Link to={"/game/manage/"+row.slug} className='btn btn-warning mx-3' data-bs-toggle="tooltip" data-bs-placement="top" title="Jere"><i className="fas fa-tools"></i></Link>
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
                
                <Modal show={this.state.show} 
                onHide={()=>this.setState({show:false})} 
                animation={true}
                centered size="lg">
                <Modal.Header closeButton>
                <Modal.Title>{this.state.modal_title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label  htmlFor="name" className="form-label">Nom Jwèt la</label>
                            <input type="email" className="form-control" id="name" aria-describedby="emailHelp"
                                onChange={(e)=>this.setState({name:e.target.value})} value={this.state.name}/>
                        </div>

                        <div className="mb-3">
                            <label  htmlFor="description" className="form-label">Dekri Jwèt la </label>
                            <textarea className="form-control" id="description" rows="3" 
                                onChange={(e)=>this.setState({description:e.target.value})}>{this.state.description}</textarea>
                        </div>

                        <div className="mb-3">
                            <label  htmlFor="image" className="form-label">Imaj Jwèt la</label>
                            <input className="form-control" type="file" id="image" onChange={this.handleFile}/>
                        </div>
                        <div className="md-5">
                            <label htmlFor="type">Tip Jwèt</label>
                            <Select
                                isClearable isSearchable
                                defaultValue={this.state.type}
                                value={this.state.type}
                                onChange={this.setType}
                                options={this.state.types.map((item) => {
                                    return { value: item.id, label: item.name };
                                })} 
                                placeholder="Select Game Type"
                                />
                        </div>
                        <br />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    
                <button className='btn btn-secondary' variant="secondary" onClick={()=>this.setState({show:false})}>
                Fèmen
                </button>
                <button className="btn btn-primary" onClick={this.save}>
                    Anrejistre
                </button>
                </Modal.Footer>
            </Modal>
        </div> 
        }
    }
}