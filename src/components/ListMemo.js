import dateFormat from 'dateformat'

const ListMemo = ({memo, handleDelete}) => {
    const createdDate = dateFormat(memo.createdAt, 'mm/d/yyyy')
    return (
        <div className="card">
            <div className="card-header">
                {memo.title}
            </div>
            <div className="card-body">
                {memo.description || <p style={{color: 'gray'}}>No details</p>}                
                <div className="card-footer">
                    <span className="date">Created at {createdDate}</span>
                    <span className="delete" onClick={() => handleDelete(memo)}>&times; <span className="tip">Delete this memo</span> </span>
                </div>
            </div>
        </div>
    )
}

ListMemo.defaultProps = {
    id: '3243242',
    title: 'No memo yet',
    description: 'Please create a new memo'
}
export default ListMemo
