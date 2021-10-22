import { API, graphqlOperation } from 'aws-amplify'
import { deleteMemo } from '../graphql/mutations'
import ListMemo from './ListMemo'

const ListMemos = ({memos, setMemos}) => {

    const handleDelete = async (memo) => {
        const res = await API.graphql(graphqlOperation(deleteMemo, { input: {id: memo.id}}))
        const deleted = res.data.deleteMemo
        const updatedMemos = memos.filter(memo => memo.id !== deleted.id)        
        setMemos(updatedMemos)
    }

    return (
        <div className="container-middle">
            {memos.map(memo => (
                <ListMemo key={memo.id} memo={memo} handleDelete={handleDelete} />
            ))}
        </div>
    )
}

export default ListMemos