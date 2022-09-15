import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { stringify } from 'qs';

class ManageGame extends Component{

    constructor(props){
        super(props);
        this.state = {
            load : true,
            game : {},
            draws : [],
            type : {}
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

    render() {
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
                                        <span className='pl-2'><i className={this.state.type.icon+" text-primary px-2 "}></i>{this.state.type.name}</span>
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
                </div>
            </div>
        }
    }
}

export default withRouter(ManageGame);