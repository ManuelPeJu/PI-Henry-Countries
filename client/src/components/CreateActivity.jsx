import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, postActivities } from '../redux/actions';

import "./CSS/Form.css"
import "./CSS/Header.css"

const CreateActivity = () => {
    const countries = useSelector((state) => state.countries)
    const dispatch = useDispatch();
    const history = useHistory();

    const [input, setInput] = useState({
        name: "",
        difficulty: 0,
        duration: 0,
        season: "",
        idCountries: []
    })

    useEffect(() => {
        dispatch(getCountries())
        // console.log(input)
    }, [dispatch])


    function pushCountry (e) {
        e.preventDefault();
        let value = e.target.value;
        const aux = input.idCountries;
        aux.push(value);
        setInput({
            ...input,
            idCountries: aux
        })
    }

    function deleteCountry(e){
        setInput({
            ...input,
            idCountries: input.idCountries.filter(el => el !== e)
        })
    }

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }


    function handleSubmit(e) {
        e.preventDefault();

        try {
            if(!input.name || !input.difficulty || !input.duration || !input.season || !input.idCountries) {
                return alert("You must complete the form")
            } 
            dispatch(postActivities(input));
            alert("Activity created");
            setInput({
                name: "",
                difficulty: 0,
                duration: 0,
                season: "",
                idCountries: []
            });
            history.push("/Home")
            // console.log(input)

        } catch (error) {
            console.log(error)
        }

    }




    return (
        <div className="background-form">
            <header className='main-header'>
                <div>
                    <h1>
                        <Link to={"/"}>
                            <span>C</span>lick <span>M</span>aps
                        </Link>
                    </h1>
                    <div className='back-button-header'>
                        <Link to={"/Home"}><button>Home</button></Link>
                    </div>
                </div>
            </header>

            <h1 className='form-header'>Create your Activity!!</h1>

            <form className='form-grid' onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <div>
                    <label>Name: </label>
                        <input
                            type = "text"
                            value = {input.name}
                            name = "name"
                            placeholder='name of activity'
                            onChange = {handleChange}
                        />
                    </div>

                    <div>
                    <label>Difficulty: </label>
                        <input
                            type = "number"
                            value = {input.difficulty}
                            name = "difficulty"
                            onChange = {handleChange}
                            max = "5"
                        />
                    </div>

                    <div>
                        <label>Duration: </label>
                        <input
                            type = "number"
                            value = {input.duration}
                            name = "duration"
                            onChange = {handleChange}
                            max = "24"
                            min = "0"
                        />
                    </div>

                    <div>
                    <label>Season: </label>
                        <select name='season' onChange={handleChange} value={input.season}>
                            <option value="">Choose a season</option>
                            <option value="Winter">Winter</option>
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer</option>
                            <option value="Autumn">Autumn</option>
                        </select>
                    </div>

                    <div>
                        <label>Countries: </label>
                            <select name='idCountries' onChange={pushCountry}>
                                <option>Choose a Country</option>
                                    {
                                        countries.map((c) => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))
                                    }

                            </select>
                    </div>
                    {
                        input.idCountries.map((c) =>
                            <p key={c} type="button" onClick={() => deleteCountry(c)}>
                                <button className='delete-button'>X</button> {c}
                            </p>
                        )
                    }

                </div>

                <button className='create-button' type='submit'>Create Activity</button>
            </form>
        </div>
    )
}

export default CreateActivity;




// console.log(errors)
//             console.log(input)

//             if(
//                 !errors.name &&
//                 !errors.difficulty &&
//                 !errors.duration &&
//                 !errors.season &&
//                 !errors.idCountries
//             )