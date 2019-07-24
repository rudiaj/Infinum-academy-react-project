
export function postBooking(model, valueSeats, id) {
  return(
    fetch(`https://flighter-hw7.herokuapp.com/api/${model}`, {
      method: "POST",
      headers: {
        "Authorization": `${(localStorage.getItem('token')) ? (localStorage.getItem('token')).slice(1, -1) : 'abc'}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
        },
      body: JSON.stringify({
        "booking": {
          "no_of_seats": `${valueSeats}`,
          "flight_id": `${id}`
        }
      })
    })
    .then((res) => res.json()));
}

