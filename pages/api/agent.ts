
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    output_text: string
  }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const URL = 'https://api.discontinuity.ai/agent/demo/'
    //const URL = 'http://127.0.0.1:8000/agent/demo/'
  
    fetch(`${URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '2c4ffb86-d335-11ed-bddf-325096b39f47',
      },
      body: JSON.stringify({q: `${req.query.q}`})
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data)
        res.status(200).json(data)
      })
      .catch((error) => {
        console.error('Error:', error)
        res.status(501)
      })
  }