import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';
import Select from 'react-select';

export default class CreateGame extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            types : [],
            name : '',
            description : '',
            type_id : 0,
            image : null,
            temp : null,
            type : {}
        }
    }
    
    componentDidMount(){
        console.log("MODAL Create Game did mount");
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

    save = () => {
        const data = {
            name : this.state.name,
            description : this.state.description,
            image : this.state.image,
            type_id : this.state.type.value
        }
        this.props.save(data);
    }

    render() {
        return (
            <Modal show={this.props.show} 
                onHide={this.props.hide} 
                animation={true}
                centered size="lg">
                <Modal.Header closeButton>
                <Modal.Title>Kreye Jwèt</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label  htmlFor="name" className="form-label">Nom Jwèt la</label>
                            <input type="email" className="form-control" id="name" aria-describedby="emailHelp"
                                onChange={(e)=>this.setState({name:e.target.value})}/>
                        </div>

                        <div className="mb-3">
                            <label  htmlFor="description" className="form-label">Dekri Jwèt la </label>
                            <textarea className="form-control" id="description" rows="3" 
                                onChange={(e)=>this.setState({description:e.target.value})}></textarea>
                        </div>

                        <div className="mb-3">
                            <label  htmlFor="image" className="form-label">Imaj Jwèt la</label>
                            <input className="form-control" type="file" id="image" onChange={this.handleFile}/>
                        </div>
                        <div className="md-5">
                            <label html htmlFor="type">Tip Jwèt</label>
                            <Select
                                    isClearable isSearchable
                                    defaultValue={this.state.type}
                                    value={this.state.type}
                                    onChange={this.setType}
                                    options={this.props.types.map((item) => {
                                        return { value: item.id, label: item.name };
                                    })} 
                                    placeholder="Select Game Type"
                                />
                        </div>
                        <br />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                <button className='btn btn-secondary' variant="secondary" onClick={this.props.hide}>
                    Close
                </button>
                <button className="btn btn-primary" onClick={this.save}>
                    Save Changes
                </button>
                </Modal.Footer>
            </Modal>
        );
    }
}