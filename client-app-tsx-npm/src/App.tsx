import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';

interface IVals {
    id: number;
    name: string;
}

const vals = [
    {id: 1, name: 'Value 101'},
    {id: 2, name: 'Value 102'}
];

const App: React.FC = () => {
    const [values, setValues] = useState(vals);


    useEffect(() => {
        axios.get('http://localhost:5000/api/values')
            .then(resp => {
                setValues(resp.data);
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <div>
        </div>
    );
};

export default App;
