import React, { Component } from "react";
import { db, auth } from '../../firebase';
import { getDatabase, ref, child, get, update, onChildAdded, onChildChanged, onValue, onChildRemoved, query, orderByChild, equalTo } from "firebase/database";
import { Table, Button } from 'react-bootstrap';
import MapContainer from '../Map'
import { connect } from 'react-redux'


class TranferedOngoing extends React.Component {
    state = {
        users: null,
        userId: null,
        lat: null,
        long: null,
        isShow: true,
        usersAddress: null
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
                            if(reqAd.status == 'TOngoing'){
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
                                <th>Phone Number</th>
                                <th>Latitude</th>
                                <th>Longtitude</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {
                            this.state.users &&
                            this.state.users.map(user => {

                                return (

                                    <tbody >
                                        <tr >
                                            <td style={{  borderStyle: 'none solid solid none', borderTopLeftRadius: '15px', borderBottomLeftRadius: '15px' }}>{`${user.username}`}</td>
                                            <td style={{  borderStyle: 'none solid solid none' }}>{`${user.phoneNumber}`}</td>
                                            <td style={{  borderStyle: 'none solid solid none' }}>{`${user.lat}`}</td>
                                            <td style={{  borderStyle: 'none solid solid none' }}>{`${user.long}`}</td>
                                            <td style={{  borderTopRightRadius: '15px', borderBottomRightRadius: '15px' }}>
                                            <Button style={{ marginRight: 20 }} onClick={() => {
                                                    const postData = {
                                                        email: user.email,
                                                        id: user.id,
                                                        lat: user.lat,
                                                        long: user.long,
                                                        address: user.address,
                                                        phoneNumber: user.phoneNumber,
                                                        profile_picture: user.profile_picture,
                                                        status: "TResolved",
                                                        username: user.username,
                                                        };

                                                        const updates = {};
                                                        updates['/requests/' + user.id] = postData;
                                                        update(ref(db), updates)

                                                        this.setState({
                                                            userId: user.id,
                                                        })
                                                    }} key={user.id}>Done</Button>
                                                <Button style={{ marginRight: 20 }}
                                                         onClick={() => {
                                                    this.setState({
                                                        userId: user.id,
                                                        isShow: false,

                                                    })
                                                }} key={user.id}>View</Button>
                                            </td>
                                        </tr>
                                    </tbody>


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
                                        <p>lorem asdadada</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(TranferedOngoing);


