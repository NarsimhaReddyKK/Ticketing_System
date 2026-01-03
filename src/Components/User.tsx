export const User = () => {
  return (
    <div className="ticket">
          <div className="ticket__details">
            <h1 className="ticket__title"><span className="ticket__title-span">Email: </span></h1>
            <h2 className="ticket__id">User_Id: </h2>
        </div>
        <select className="ticket__select">
            <option value="" className="ticket__select-option">User</option>
            <option value="" className="ticket__select-option">Admin</option>
        </select>
    </div>
  )
}
