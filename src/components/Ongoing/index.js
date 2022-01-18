import React, { Component } from "react";
import { db, auth } from '../../firebase';
import { getDatabase, ref, child, get, update, onChildAdded, onChildChanged, onValue, onChildRemoved, query, orderByChild, equalTo, set } from "firebase/database";
import { Table, Button, Modal, Form } from 'react-bootstrap';
import MapContainer from '../Map'
import { connect } from 'react-redux'


class Ongoing extends React.Component {
    state = {
        users: null,
        userId: null,
        lat: null,
        long: null,
        isShow: true,
        modalShow: false,
        notes: null,
        Done: false,
        postData: null
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
                                if(reqAd.status == 'onGoing'){
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

    
    handleReport = (event) => {
        const text = event.target.value;
        event.preventDefault()
        console.log(text)

        this.setState({ ...this.state, notes: text})


     }

    handleDone = () => {
        this.setState({ ...this.state, Done: true})
        // const updates = {};
        //  updates['/requests/' + this.state.userId] = this.state.postData;
        //  update(ref(db), updates)
        const onGoingData = this.state.postData;
        const notes = this.state.notes

        let concatData = {
            ...onGoingData,
            notes
        }



        set(ref(db, 'requests/' + this.state.userId), concatData);


    }


    render() {

         

        // const MyVerticallyCenteredModal = (props) => {
        //     return (
        //       <Modal
        //         {...props}
        //         size="lg"
        //         aria-labelledby="contained-modal-title-vcenter"
        //         centered
        //       >
        //         <Modal.Header>
        //           <Modal.Title id="contained-modal-title-vcenter">
        //             Respondent Report
        //           </Modal.Title>
        //         </Modal.Header>
        //         <Modal.Body>
        //            <Form.Control onChange={this.handleReport} value={this.state.notes} as="textarea" rows={10} placeholder="Enter A Report Here...">
                    
        //           </Form.Control>
        //         </Modal.Body>
        //         <Modal.Footer>
        //           <Button onClick={this.handleDone} variant="success">Done</Button>
        //           <Button onClick={props.onHide}>Close</Button>
        //         </Modal.Footer>
        //       </Modal>
        //     );
        //   }


        return (
            <>
                {
                    this.state.isShow &&
                    <>
                    
                    <Table striped bordered hover >
                    <thead  style={{backgroundColor: '#3db588'}}>
                            <tr>
                                <th>Names</th>
                                <th>Assign Respondent</th>
                                <th>Number</th>
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
                                            <td style={{  borderStyle: 'none solid solid none', borderTopLeftRadius: '15px', borderBottomLeftRadius: '15px' }}>{`${user.username}`}</td>
                                            <td style={{  borderStyle: 'none solid solid none' }}>{`${user.address}`}</td>
                                            <td style={{  borderStyle: 'none solid solid none' }}>{`${user.phoneNumber}`}</td>
                                            <td style={{  borderStyle: 'none solid solid none' }}>{`${user.lat}`}</td>
                                            <td style={{  borderStyle: 'none solid solid none' }}>{`${user.long}`}</td>
                                            <td style={{  borderTopRightRadius: '15px', borderBottomRightRadius: '15px' }}>
                                                 
                                                <Button style={{ marginRight: 20 }} onClick={() => {
                                                    this.setState({...this.state, modalShow: true})
                                                    
                                                    const postData = {
                                                        email: user.email,
                                                        id: user.id,
                                                        lat: user.lat,
                                                        long: user.long,
                                                        address: user.address,
                                                        phoneNumber: user.phoneNumber,
                                                        profile_picture: user.profile_picture,
                                                        status: "Resolved",
                                                        username: user.username,
                                                         };

 

                                                        this.setState({
                                                            ...this.state,
                                                            modalShow: true,
                                                            postData: postData,
                                                            userId: user.id,
                                                        })
                                                        console.log('userID :', this.state.userId)
                                                      
                                                    }} key={user.id}>Done</Button>

                                                <Button onClick={() => {
                                                    this.setState({
                                                        userId: user.id,
                                                        isShow: false,

                                                    })
                                                }} key={user.id}>View</Button>
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
                                <Form.Control onChange={this.handleReport} value={this.state.notes} as="textarea" rows={10} placeholder="Enter A Report Here...">
                                    
                                </Form.Control>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button onClick={this.handleDone} variant="success">Done</Button>
                                <Button  onClick={this.state.modalShow}>Close</Button>
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
                                <div className='card text-center'>
                                    
                                    <a className='btn btn-outline-danger' type='button' onClick={() => {
                                        this.setState({
                                            isShow: true
                                        })
                                    }}>Back</a>

                                    <div className='overflow'>
                                        <img className='card-img-top' src={`${user.profile_picture}`} alt='' />
                                    </div>
                                    <div className='card-body text-dark'>
                                        <h4 className='card-title'>{`${user.username}`}</h4>
                                       
                                        <a className='btn btn-outline-danger' type='button' onClick={() => {
                                            this.setState({
                                                long: user.long,
                                                lat: user.lat
                                            })
                                        }}>Location</a>
                                    </div>
                                    <MapContainer lng={user.long} lat={user.lat} />
                                    
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Ongoing);


