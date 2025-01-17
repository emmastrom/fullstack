const Filter = ({search, handle}) => {
    return (
        <div>
        find countries <input value={search} onChange={handle}/>
      </div>
    )
  }
  
  export default Filter