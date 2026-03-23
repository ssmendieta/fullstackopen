const Persons = ({person, handleOnDelete}) => {
    return (
        <div key={person.id}>
        <p>{person.name} {person.number}</p><button onClick={() => handleOnDelete(person.id)}>delete</button>
        </div>
    )
}
    
export default Persons