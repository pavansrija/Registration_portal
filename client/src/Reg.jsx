import React, { useState } from 'react';
import axios from 'axios';
import './Reg.css';

const Reg = () => {
    const [selected, setSelected] = useState('');
    const [data, setData] = useState([]);
    const [valid, setValid] = useState(null);

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');


    const [editMode, setEditMode] = useState(false);
    const [editUserData, setEditUserData] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3003', { id, name, phone }).then((result) => {
            if (result.data[0] === 'valid') {
                setValid(true);
                setData(result.data[1]);
            } else {
                setValid(false);
            }
        }).catch((error) => {
            console.error("Error:", error);
        });
    };

    const handleOptionChange = (e) => {
        setSelected(e.target.value);
    };


    const handleEdit = (userData) => {
        setEditMode(true);
        setEditUserData(userData);
    };
    const handleUpdate = () => {
        // Implement update functionality here
        // Send updated data to the server
        console.log("Update button clicked");
        axios.post('http://localhost:3003/update', editUserData)
            .then(response => {
                console.log("Update successful");
                setEditMode(false); // Toggle edit mode off after successful update
            })
            .catch(error => {
                console.error("Error updating data:", error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'id') setId(value);
        else if (name === 'name') setName(value);
        else if (name === 'phone') setPhone(value);
    };
    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    return (
        <div>
            <h1 style={{ color: 'red' }}>STUDENT DETAILS</h1>
            <form action="" onSubmit={handleSubmit}>
                <label>
                    <input type='radio' name='option' value='id' checked={selected === 'id'} onChange={handleOptionChange} />ID
                </label>
                <label>
                    <input type='radio' name='option' value='name' checked={selected === 'name'} onChange={handleOptionChange} />Name
                </label>
                <label>
                    <input type='radio' name='option' value='phone' checked={selected === 'phone'} onChange={handleOptionChange} />Phone
                </label><br></br>
                <input
                    type="text"
                    name={selected}
                    value={selected === 'id' ? id : selected === 'name' ? name : selected === 'phone' ? phone : ''}
                    onChange={handleInputChange}></input>

                <button type='submit'>Display</button>
            </form>

            {valid === true && (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Identity Number</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>email</th>
                                <th>aadhar number:</th>
                                <th>branch</th>
                                <th>section</th>
                                <th>Place</th>
                                <th>father name:</th>
                                <th>father mobile:</th>
                                <th>mother name:</th>
                                <th>mother mobile:</th>
                                <th>gardian name:</th>
                                <th>gardian mobile:</th>
                                <th>Hostel Name</th>
                                <th>Room number</th>
                                
                                
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.email}</td>
                                    <td>{item.aadharnumber}</td>
                                    <td>{item.branch}</td>
                                    <td>{item.section}</td>
                                    <td>{item.place}</td>
                                    <td>{item.fathername}</td>
                                    <td>{item.fathermobile}</td>
                                    <td>{item.mothername}</td>
                                    <td>{item.mothermobile}</td>
                                    <td>{item.gardianmobile}</td>
                                    <td>{item.gardianmobile}</td>
                                    <td>{item.hostelname}</td>
                                    <td>{item.roomno}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {editMode ? (
                        <div>
                            <h2>Edit User Data</h2>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Identity Number:</td>
                                        <td><input type="text" value={editUserData.id} disabled /></td>
                                    </tr>
                                    <tr>
                                        <td>Name:</td>
                                        <td><input type="text" name="name" value={editUserData.name} onChange={handleEditInputChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>Phone:</td>
                                        <td><input type="text" name="phone" value={editUserData.phone} onChange={handleEditInputChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>Email:</td>
                                        <td><input type="email" name="email" value={editUserData.email} onChange={handleEditInputChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>aadhar number:</td>
                                        <td><input type="text" name="aadharnumber" value={editUserData.aadharnumber} onChange={handleEditInputChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>branch</td>
                                        <td><input type="text" name="branch" value={editUserData.branch} onChange={handleEditInputChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>section:</td>
                                        <td><input type="text" name="section" value={editUserData.section} onChange={handleEditInputChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>Place:</td>
                                        <td><input type="text" name="place" value={editUserData.place} onChange={handleEditInputChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>father name:</td>
                                        <td><input type="text" name="fathername" value={editUserData.fathername} onChange={handleEditInputChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>father mobile:</td>
                                        <td><input type="text" name="fathermobile" value={editUserData.fathermobile} onChange={handleEditInputChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>mother name:</td>
                                        <td><input type="text" name="mothername" value={editUserData.mothername} onChange={handleEditInputChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>mother mobile:</td>
                                        <td><input type="text" name="mothermobile" value={editUserData.mothermobile} onChange={handleEditInputChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>gardian name:</td>
                                        <td><input type="text" name="gardianname" value={editUserData.gardianname} onChange={handleEditInputChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>gardian mobile:</td>
                                        <td><input type="text" name="gardianmobile" value={editUserData.gardianmobile} onChange={handleEditInputChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>hostelname:</td>
                                        <td><input type="text" name="hostelname" value={editUserData.hostelname} onChange={handleEditInputChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>roomno:</td>
                                        <td><input type="text" name="roomno" value={editUserData.roomno} onChange={handleEditInputChange} /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <button onClick={handleUpdate}>Update</button>
                        </div>
                    ) : (
                        <button onClick={() => handleEdit(data[0])}>Edit</button>
                    )}


                </>


            )}
            {valid === false && <p>Not a valid user</p>}
        </div>
    );
};

export default Reg;
