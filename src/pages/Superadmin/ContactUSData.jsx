import React from 'react'

export default function ContactUSData() {
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
              <th scope="col">Subject</th>
                <th scope="col">Message</th>
            </tr>
          </thead>
          <tbody>
            <tr className='text-center'>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>Test Subject</td>
              <td>This is a test message.</td>
            </tr>
            <tr className='text-center'>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>Another Subject</td>
              <td>This is another test message.</td>
            </tr>
           
            </tbody>
        </table>
        </div>
    </div>
  )
}
