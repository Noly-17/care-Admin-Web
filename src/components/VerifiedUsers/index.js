import React, { Component } from "react";
import { db, auth } from '../../firebase';
import { getDatabase, ref, child, get, update, onValue } from "firebase/database";
import { Table, Button } from 'react-bootstrap';
import MapContainer from '../Map'
import { connect } from 'react-redux'
import { Box, Grid } from '@material-ui/core'


class VerifiedUsers extends React.Component {
    state = {
        users: null,
        userId: null,
        usersAd: [],
        lat: null,
        long: null,
        isShow: true,
        searchUser: ''
    }

   async componentWillMount(){
        const dbRef = ref(db, 'users/');
        onValue(dbRef, (snap) => {
            const users = []
            snap.forEach(item => {

                const data = item.val()
              
                    if(auth.currentUser.uid == data.id){
                        this.setState({
                            usersAd: data.address
                        })
                    }
            
            
            })
            this.setState({
                users: users,
            })

    });
    }

    async componentDidMount() {
        const dbRef = ref(db, 'users/');
      onValue(dbRef, (snap) => {
                const users = []
                snap.forEach(item => {

                    const data = item.val()
                  
                        const userDat = item.val()
                        if(this.state.usersAd == userDat.address){
                        if(userDat.verified == true){
                        users.push(userDat)
                        console.log(userDat)
                        }
                    }
                
                
                })
                this.setState({
                    users: users,
                })

        });

    


    }



    render() {

        console.log(this.state.searchUser)



        return (
            <>
            <Box style={{ display: 'grid', gridTemplateColumns: '3fr 1fr'}}>
                    <Box>
                    <h1>Verified Users</h1>
                    </Box>
                     
                     <input type='text' placeholder='Search Phone Number' style={{marginBottom: 10}} onChange={event => this.setState({searchUser: event.target.value})}/> 
                      
                    
            </Box>
                 {
                    this.state.isShow &&
                    <Table striped bordered hover>
                        <thead  style={{backgroundColor: '#3db588'}}>
                            <tr>
                                <th>Full Name</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {
                            this.state.users &&
                            this.state.users.filter((val) => {
                                if(this.state.searchUser == '') {
                                    return val
                                } else if (val.phoneNumber.toLowerCase().includes(this.state.searchUser.toLowerCase())) {
                                    return val
                                }
                            }).map(user => {
                                return (

                                    <tbody >
                                        <tr >
                                            <td style={{ borderStyle: 'none solid solid none' }}>{`${user.fullname}`}</td>
                                            <td style={{ borderStyle: 'none solid solid none' }}>{`${user.address}`}</td>
                                            <td style={{ borderStyle: 'none solid solid none' }}>{`${user.phoneNumber}`}</td>
                                            <td style={{ borderStyle: 'none solid solid none' }}>{`${user.email}`}</td>
                                            <td style={{ borderTopRightRadius: '15px', borderBottomRightRadius: '15px' }}>
                                            <Button style={{ marginRight: 20 }} onClick={() => {
                                                    this.setState({
                                                        userId: user.id,
                                                        isShow: false,

                                                    })
                                                }} key={user.id}>View</Button>
                                            <Button variant="danger" onClick={() => {
                                                        const postData = {
                                                            fullname: user.fullname,
                                                            address: user.address,
                                                            adminRole: user.adminRole,
                                                            display_picture: user.display_picture,
                                                            email: user.email,
                                                            phoneNumber: user.phoneNumber,
                                                            id: user.id,
                                                            verified: true,
                                                            verify_photo: user.verify_photo
                                                        };
                                                        const updates = {};
                                                        updates['/users/' + user.id] = postData;
                                                        update(ref(db), updates)

                                                        this.setState({
                                                            userId: user.id,
                                                        })
                                                    }} key={user.id}>Remove</Button>
                                            </td>
                                        </tr>
                                    </tbody>


                                )
                                
                            })
                        }

                    </Table>
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
                                        <img className='card-img-top' src={`${user.verify_photo}`} alt='' />
                                    </div>
                                    <div className='card-body text-dark'>
                                        <h4 className='card-title'>{`${user.fullname}`}</h4>
                                    </div>
                                </div>
                                :null
                                
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifiedUsers);


