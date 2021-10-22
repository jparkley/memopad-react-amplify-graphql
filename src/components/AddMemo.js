import { API, graphqlOperation} from 'aws-amplify'
import { useState } from "react"
import { createMemo } from '../graphql/mutations'

const AddMemo = ({memos, setMemos}) => {
    const [memo, setMemo] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit =  (e) => {
        e.preventDefault()
        const saveMemo = async () => {
            const res = await API.graphql(graphqlOperation(createMemo, { input: {title: memo, description: description}}))
            const updatedMemos = [res.data.createMemo, ...memos]
            setMemos(updatedMemos)
            setMemo('')
            setDescription('')
        }
        saveMemo()
    }
    
    return(
        <div className="container-top">
            <form onSubmit={handleSubmit} className="memo-form">
                <div className="form-content">
                    <input type="text" name="memo" onChange={e => setMemo(e.target.value)}
                            value={memo} placeholder="Enter your memo" />   
                    <textarea name="description" onChange={e=>setDescription(e.target.value)}
                            value={description} placeholder="Any details..." rows="3"></textarea>
                </div>
                <div className="form-button">
                    <button type="submit">Add Memo</button>
                </div>
            </form>
        </div>
    )
}
export default AddMemo