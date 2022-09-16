import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Modal } from 'react-bootstrap';
import qs from 'qs';
import moment from 'moment/moment';

class ManageGame extends Component{

    constructor(props){
        super(props);
        this.state = {
            load : true,
            game : {},
            draws : [],
            type : {},
            show : false,
            from : null,
            to:null,
            expiration:null,
            price:null,
            with_user:false
        }
    }

    componentDidMount(){
        this.refresh();
    }

    refresh = () => {
        this.setState({load:true});
        const slug = this.props.match.params.slug;

        axios.get("/games/show/"+slug).then((res)=>{
            console.log(res,"SHow");
            this.setState({load:false});
            if(res.data.status === 200){
                this.setState({game:res.data.data.game,type:res.data.data.game.game_type,draws:res.data.data.draws});
            }
        }).catch((err)=>{
            console.log(err,'err games');
        });
        this.setState({load:false});
    }

    save = (e) => {
        e.preventDefault();

        const config = {
            withCredentials: true,
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }

        let date = moment(this.state.expiration).format('yyyy-MM-DD HH:mm');

        const dt = {
            start_from : this.state.from,
            end_to : this.state.to,
            expiration_at : date,
            price : this.state.price,
            with_user : this.state.with_user,
            game_id : this.state.game.id
        }

        console.log(dt);
        
        axios({
            method:"POST",
            url:"/ticketdraws/create",
            data : qs.stringify(dt)
        }).then((res)=>{
            if(res.status === 200){
                this.clean();
                this.refresh();
            }
        }).catch((err)=>{
            console.warn(err);
        });
    }

    clean = () => {
        this.setState({
            show : false,
            from : null,
            to:null,
            expiration:null,
            price:null,
            with_user:false
        });
    }

    render() {
        const columns = [
            {
                name: 'ID',
                selector : row => <b>{row.id}</b>
            },
            {
                name: 'Demare A',
                selector : row => row.start_from
            },
            {
                name: 'Fini A',
                selector : row => row.end_to
            },
            {
                name: 'Pri',
                selector : row => <b>$ {row.price}</b>
            },
            {
                name: 'Ekspirasyon',
                selector: row => row.expiration_at,
                sortable: true,
            },
            {
                name: 'Ak Itilizatè',
                selector: row => row.with_user,
                sortable: true,
            },
            {
                name: 'Ekspire',
                selector: row => row.expired,
                sortable: true,
            },
            {
                name: 'Dat Kreyasyon',
                selector: row => row.created_at,
                sortable: true,
            },
            {
                name: 'Opsyon',
                cell : row => <span>
                    {/* <button className='btn btn-primary' onClick={()=>this.edit(row)} data-bs-toggle="tooltip" data-bs-placement="top" title="Modifye"><i className="fa-solid fa-pen"></i></button> */}
                    <Link to={"/game/manage/"+this.state.game.slug+"/ticket"} className='btn btn-warning mx-3' data-bs-toggle="tooltip" data-bs-placement="top" title="Jere"><i className="fas fa-tools"></i></Link>
                </span>
            }
        ];

        if(this.state.load){
            return <h1>Loading</h1>;
        }else{
            return <div className='container'>
                <div className="row">

                    <div className="col-3">
                        <div className="card">
                            <img src={'https://via.placeholder.com/100'} className="card-img-top" alt={this.state.game.name}/>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <div className="row">
                                        <span className='text-success'><b>Non</b></span>
                                        <span className='pl-2'>{this.state.game.name}</span>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <span className='text-success'><b>Detay</b></span>
                                        <small>{this.state.game.description}</small>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <span className='text-success'><b>Tip</b></span>
                                        <span className='pl-2'><i className={this.state.type.icon+" text-primary px-2 "}></i><b>{this.state.type.name}</b></span>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="flex justify-content-center align-items-center">
                                        {
                                            this.state.game.status?
                                                <h5 className='text-success'>AKTIVE</h5>
                                            :
                                                <h5 className='text-danger'>PA AKTIVE</h5>
                                        }
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-7">
                        <div className="row">
                            <h4 className="text-success col">Lis Tiraj Yo</h4>  
                            <button className='btn btn-secondary btn-sm col' onClick={()=>this.setState({show:true})}><i className="fa-solid fa-plus"></i> Kreye Tiraj</button>    
                        </div> 
                        <br />
                        <DataTable
                            columns={columns}
                            pagination={true}
                            fixedHeader={true}
                            striped={true}
                            data={this.state.draws}
                            />

                        <Modal show={this.state.show} 
                            onHide={()=>this.setState({show:false})} 
                            animation={true}
                            centered size="lg">
                            <Modal.Header closeButton>
                            <Modal.Title>Kreye Tiraj</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form onSubmit={this.save}>
                                    <div className="mb-3">
                                        <label  htmlFor="start_from" className="form-label">Premye Nimero Tikè</label>
                                        <input type="number" className="form-control" id="start_from" aria-describedby="emailHelp"
                                            onChange={(e)=>this.setState({from:e.target.value})} value={this.state.from} required/>
                                    </div>

                                    <div className="mb-3">
                                        <label  htmlFor="end_to" className="form-label">Dènye Nimero Tikè</label>
                                        <input type="number" className="form-control" id="end_to" aria-describedby="emailHelp"
                                            onChange={(e)=>this.setState({to:e.target.value})} value={this.state.to} required/>
                                    </div>

                                    <div className="mb-3">
                                        <label  htmlFor="expiration" className="form-label">Date ekspirasyon Tiraj la</label>
                                        <input type="datetime-local" className="form-control" id="expiration" aria-describedby="emailHelp"
                                            onChange={(e)=>this.setState({expiration:e.target.value})} value={this.state.expiration} required/>
                                    </div>

                                    <div className="mb-3">
                                        <label  htmlFor="price" className="form-label">Pri Tikè</label>
                                        <input type="number" className="form-control" id="price" aria-describedby="emailHelp"
                                            onChange={(e)=>this.setState({price:e.target.value})} value={this.state.price} required/>
                                    </div>

                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="flexCheckChecked" checked={this.state.with_user} onChange={()=>this.setState({with_user:!this.state.with_user})}/>
                                        <label className="form-check-label" htmlFor="flexCheckChecked">
                                            Tikè pou itilizatè
                                        </label>
                                    </div>

                                        <br />

                                    <button className='btn btn-secondary mx-5' variant="secondary" onClick={()=>this.setState({show:false})}>
                                    Fèmen
                                    </button>
                                    <button className="btn btn-primary" type='submit'>
                                        Anrejistre
                                    </button>
                                </form>
                            </Modal.Body>
                        </Modal>

                    </div>
                </div>
            </div>
        }
    }
}

export default withRouter(ManageGame);