import React from 'react'

export default function FeedbackData() {
  return (
    <div>
     <div>
        <table className="table table-bordered">
          <thead>
            <tr className='text-light text-center' >
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
                <th scope="col">Message</th>
            </tr>
          </thead>
          <tbody>
            <tr className='text-center'>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>This is a test feedback message.</td>
            </tr>
            <tr className='text-center'>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>This is another test feedback message.</td>
            </tr>
           
            </tbody>
        </table>
        </div>
    </div>
  )
}
