import { syncExpression } from "@aws-amplify/datastore"
import { useState } from "react"

const AddMemo = () => {
    const [memo, setMemo] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e);
    }
    
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="memo" onChange={e => setMemo(e.target.value)} 
                        value={memo} placeholder="Enter your memo" />
                <button type="submit">Add Memo</button>
            </form>
        </div>
    )
}
export default AddMemo