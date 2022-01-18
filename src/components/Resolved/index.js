import React, { Component } from "react";
import { db, auth } from '../../firebase';
import { getDatabase, ref, child, get, update, onChildAdded, onChildChanged, onValue, onChildRemoved, query, orderByChild, equalTo } from "firebase/database";
 import MapContainer from '../Map'
import { connect } from 'react-redux'
import { Table, Button, Modal, Form } from 'react-bootstrap';



class Resolved extends React.Component {
    state = {
        users: null,
        userId: null,
        lat: null,
        long: null,
        isShow: true,
        modalShow: false
    }



    async componentDidMount() {
        const dbUser = ref(db, 'users/');
        const dbRef = ref(db, 'requests/');

      onValue(dbUser, (snapshot) => {

                // Fetch the Users Address
                snapshot.forEach(user => {
                    const data = user.val()
                    const userAd = data.address;
                    if(auth.currentUser.uid == data.id){

                        // Fetch the Request Address
                        onValue(dbRef, (snap) => {
                            const users = []
                            snap.forEach(req => {
                                const reqAd = req.val()
                                if(userAd == reqAd.address){
                                
                                // Check the status
                                if(reqAd.status == 'Resolved'){
                                users.push(reqAd)
                                console.log(reqAd.address)
                                }
                            }
                            })
                            this.setState({
                                users: users,
                            })
            
                    });

                    }
                })
               

        });

    }



    render() {


        return (
            <>
                {
                    this.state.isShow &&
                    <>
                    <Table striped bordered hover >
                    <thead  style={{backgroundColor: '#3db588'}}>
                            <tr>
                                <th>Names</th>
                                <th>Latitude</th>
                                <th>Longtitude</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {
                            this.state.users &&
                            this.state.users.map(user => {

                                return (
                                    <>
                                    <tbody >
                                        <tr >
                                            <td style={{ borderStyle: 'none solid solid none', borderTopLeftRadius: '15px', borderBottomLeftRadius: '15px' }}>{`${user.username}`}</td>
                                            <td style={{ borderStyle: 'none solid solid none' }}>{`${user.lat}`}</td>
                                            <td style={{ borderStyle: 'none solid solid none' }}>{`${user.long}`}</td>
                                            <td style={{ borderTopRightRadius: '15px', borderBottomRightRadius: '15px' }}>
                                                <Button  onClick={() => {
                                                    this.setState({
                                                        userId: user.id,
                                                        isShow: false,

                                                    })
                                                }} key={user.id} style={{ marginRight: 20 }}>View</Button>
                                                <Button onClick={() => this.setState({...this.state, modalShow: true})}>Notes</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <Modal
                                     show={this.state.modalShow}
                                 size="lg"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                            > 
                                <Modal.Header>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    Respondent Report
                                </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p>
                                    {user.notes}
                                    </p>
                                </Modal.Body>
                                <Modal.Footer>
                                 <Button  onClick={() => this.setState({...this.state, modalShow: false})}>Close</Button>
                                </Modal.Footer>
                               </Modal>
                                    </>


                                )
                            })
                        }

                    </Table>
                    </>
                }

                {
                    this.state.isShow == false &&
                    this.state.users &&
                    this.state.users.map(user => {
                        return (


                            user.id == this.state.userId ?
                                <>
                                <div className='card text-center'>
                                    <a className='btn btn-outline-danger' type='button' onClick={() => {
                                        this.setState({
                                            isShow: true
                                        })
                                    }}>Back</a>
                                    
                                        

                                    <div className='overflow'>
                                        <img className='card-img-top' src={`${user.profile_picture}`} alt='' />
                                    </div>
                                    <MapContainer lng={user.long} lat={user.lat} />

                                    <div className='card-body text-dark'>
                                
 
                                    </div>
                                    
                                </div>
                                     
                                </>
                                
                                :
                                null
                        )
                    })
                }




            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        lat: state.lat,
        long: state.long
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleLocation: () => dispatch({ type: 'LONGLAT', value: 69 })
    }
}

console.log(mapDispatchToProps)

export default connect(mapStateToProps, mapDispatchToProps)(Resolved);


