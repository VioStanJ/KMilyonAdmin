import React, { Component } from 'react'
import DataTable from 'react-data-table-component';
import { Modal } from 'react-bootstrap';
import moment from 'moment/moment';

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

    }
    
    render() {
        const columns = [
            {
                name: 'Non',
                selector : row => row.firstname
            },
            {
                name: 'Prenon',
                selector : row => row.lastname
            },
            {
                name: 'Nimewo Tikè',
                selector : row => <b>{row.ticket_number}</b>
            },
            {
                name: 'Genyen',
                selector : row => <b>{row.won?<i className="text-success fa-solid fa-check"></i>:<i className="text-danger fa-solid fa-xmark"></i>}{row.gain}</b>
            },
            {
                name: 'Dat Acha',
                selector: row => <span>{moment(row.buying_date).format('LLL')??'--'}</span>,
                sortable: true,
            }
        ];

        return <Modal show={this.props.show} 
            onHide={this.props.hide} 
            animation={true}
            centered size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Tikè Yo</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <DataTable
                    theme="solarized"
                    columns={columns}
                    pagination={true}
                    fixedHeader={true}
                    striped={true}
                    filtered={true}
                    data={this.props.tickets}
                    />

            </Modal.Body>

        </Modal>        
    }
}

export default Ticket;