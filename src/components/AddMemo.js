import { API, graphqlOperation} from 'aws-amplify'
import { useState, useRef, useEffect } from "react"
import { createMemo } from '../graphql/mutations'

const AddMemo = ({memos, setMemos}) => {
    const [state, setState] = useState({
        memo: '',
        description:'',
        category: '',
        completed: false,
    })

    //const formRef = useRef() /* Work on form reset */
    const memoRef = useRef() // for focus on the field

    useEffect(() => {
        memoRef.current.focus()
    }, [])

    const handleSubmit =  (e) => {
        e.preventDefault()
        const saveMemo = async () => {
            const res = await API.graphql(graphqlOperation(createMemo, 
                { input: {title: state.memo, 
                            description: state.description,
                            category: state.category,
                            completed: state.completed
                        }}))
            const updatedMemos = [res.data.createMemo, ...memos]
            setMemos(updatedMemos)
            //formRef.current.reset()
            setState({
                memo:'',
                description: ''
            })
            memoRef.current.focus()
        }
        saveMemo()
    }
    
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })        
    }

    return(
        <div className="container-top">
            <form onSubmit={handleSubmit} className="memo-form">
                <div className="form-content">
                    <input type="text" name="memo" onChange={handleChange}
                            value={state.memo} ref={memoRef} placeholder="Enter your memo" />   
                    <textarea name="description" onChange={handleChange}
                            value={state.description} placeholder="Any details..." rows="3"></textarea>
                </div>
                <div className="form-button">
                    <button type="submit">Add Memo</button>
                </div>
            </form>
        </div>
    )
}
export default AddMemo