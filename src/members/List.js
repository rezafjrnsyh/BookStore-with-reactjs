import React, {useEffect, useState} from 'react';
import {Container, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import MemberService from "../services/MemberService";

function List({match}) {
    const { path } = match;
    console.log(path)
    const [members, setMembers] = useState([]);

    useEffect(() => {
        retrieveMembers();
    }, []);

    const retrieveMembers = () => {
        MemberService.getAll()
            .then((response) => {
                console.log('data',response.data);
                setMembers(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const updateStatus = (id, status) => {
        console.log("called", id)
        MemberService._delete(id, status)
            .then((res) => {
                console.log('res',res)
                retrieveMembers()
            })
    };

    return (
        <div>
            <Container>
                <div style={{textAlign:"left"}}>
                    <h1>Members</h1>
                    {/*<Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Book</Link>*/}
                </div>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th width="5%">No</th>
                        <th width="10%">Name</th>
                        <th width="30%">Email</th>
                        <th width="5%">Status</th>
                        <th width="10%"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {members && members.map((member, i) =>
                        <tr key={i}>
                            <td>{member.id}</td>
                            <td>{member.firstName + member.lastName}</td>
                            <td>{member.email}</td>
                            <td>{member.status}</td>
                            <td style={{ whiteSpace: 'nowrap'}}>
                                {/*<Link to={`${path}/edit/${member.id}`} className="btn btn-sm btn-primary">Edit</Link>*/}
                                {member.status === 0 ? <button style={{marginLeft:'10px'}} onClick={() => updateStatus(member.id, 1)} className="btn btn-sm btn-primary btn-active-member">
                                        <span>Activated</span>
                                    </button> :
                                    <button style={{marginLeft:'10px'}} onClick={() => updateStatus(member.id, 0)} className="btn btn-sm btn-danger btn-active-member" >
                                        <span>Inactive</span>
                                    </button> }
                            </td>
                        </tr>
                    )}
                    {members && !members.length &&
                    <tr>
                        <td colSpan="5" className="text-center">
                            <div className="p-2">No Members To Display</div>
                        </td>
                    </tr>
                    }
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

export default List;
