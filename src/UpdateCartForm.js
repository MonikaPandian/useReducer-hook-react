import React, { useState } from 'react';

const UpdateCartForm = ({ updateInput, setUpdateInput, handleUpdate, item }) => {
    const [update, setUpdate] = useState(false);
    return (
        <div>
            {update ?
                <div style={{ marginTop: "15px" }}>
                    <input type="text" value={updateInput} onChange={(e) => setUpdateInput(e.target.value)} />
                    <button className='btn' onClick={() => { handleUpdate(item); setUpdate(false) }}>Update</button>
                </div> : <button className='btn' onClick={() => setUpdate(true)}>Edit</button>}&nbsp;&nbsp;
        </div>
    )
}

export default UpdateCartForm
