import React from 'react'

export default function AppoinmentData() {
  return (
    <div>
   <div>
        <table className="table table-bordered">
          <thead>
            <tr className='text-light text-center' >
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone No</th>
              <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Service</th>
            </tr>
          </thead>
          <tbody>
            <tr className='text-center'>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>2023-10-01</td>
              <td>10:00 AM</td>
              <td>Consultation</td>
            </tr>
            <tr className='text-center'>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>2023-10-02</td>
              <td>11:00 AM</td>
              <td>Follow-up</td>
            </tr>   
            </tbody>
        </table>
        </div>
    </div>
  )
}
