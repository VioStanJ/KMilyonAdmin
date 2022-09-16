import React, { Component } from 'react'
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import DataTable from 'react-data-table-component';

class Ticket extends Component{

    constructor(props){
        super(props);
        this.state = {
            show : false,
        }
    }

    componentDidMount(){
        this.refresh();
    }

    refresh = () => {
        this.setState({load:true});
        const slug = this.props.match.params.slug;
        console.log(slug);
        // axios.get("/games/show/"+slug).then((res)=>{
        //     console.log(res,"SHow");
        //     this.setState({load:false});
        //     if(res.data.status === 200){
        //         this.setState({game:res.data.data.game,type:res.data.data.game.game_type,draws:res.data.data.draws});
        //     }
        // }).catch((err)=>{
        //     console.log(err,'err games');
        // });
        this.setState({load:false});
    }
    
    render() {

        if(this.state.load){
            return <h1>Loading</h1>;
        }else{
            return <div className='container'>
                <div className="row">

                </div>
            </div>
        }
    }
}

export default withRouter(Ticket);