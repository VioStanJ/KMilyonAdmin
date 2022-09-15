import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class ManageGame extends Component{

    constructor(props){
        super(props);
        this.state = {
            load : true,
            game : {},
            draws : []
        }
    }

    componentDidMount(){
        this.refresh();
    }

    refresh = () => {
        this.setState({load:true});
        const slug = this.props.match.params.slug;
        console.warn(slug);
        // axios.get("/games/show/").then((res)=>{
        //     console.log(res,"Games");
        //     this.setState({load:false});
        //     if(res.data.status === 200){
        //         this.setState({games:res.data.data});
        //     }
        // }).catch((err)=>{
        //     console.log(err,'err games');
        // });
        // this.setState({load:false});
    }

    render() {
        return (
             <div>
                Manage Game
             </div>
        );
    }
}

export default withRouter(ManageGame);
// export default ManageGame;