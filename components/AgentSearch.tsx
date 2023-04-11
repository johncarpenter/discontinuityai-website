import { buttonize } from '@/lib/utils/buttonize'
import { timeoutPromise } from '@/lib/utils/timeoutFetch'
import React, { useEffect, useState } from 'react'
import { ColorIcon } from './DiscontinuityIcon'

const AgentSearch = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResponse | null>(null)
  const [loading, setLoading] = useState(false)

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const sendQueryRequest = async() => {
    if (query === '') {
      return
    }
    setResults(null)
    setLoading(true)

    try { 
      let res = await timeoutPromise(10000, fetch(`/api/agent?q=${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data)
          setResults(data)
          setLoading(false)
          setQuery('')
        })
        .catch((error) => {
          console.error('Error:', error)
          setResults({ error: 'Unable to search at this time' })
          setLoading(false)
          setQuery('')
        }));
    } catch(error) {
      setLoading(false)
      setResults({ error: 'Unable to search at this time' })
    }



    
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      sendQueryRequest()
    }
  }
  const QuestionPill = ({ q }) => {
    return (
      <span
        role="button"
        onClick={() => setQuery(q)}
        className="m-2 whitespace-nowrap inline-flex items-center rounded-md bg-secondary-400 px-2.5 py-0.5 text-sm font-medium text-gray-800"
      >
        {q}
      </span>
    )
  }

  return (
    <>
      <div className="w-full">
        <div className="flex flex-row flex-wrap justify-center space-x-1 ">
          <QuestionPill q="What is Discontinuity.AI?" />
          <QuestionPill q="How do Agents work?" />
          <QuestionPill q="How do I contact you?" />
          <QuestionPill q="How does this work for ecommerce? " />
          <QuestionPill q="How do I get started?" />
        </div>

        <div className="relative mt-2 flex items-center">
          <input
            type="text"
            name="search"
            id="search"
            value={query}
            disabled={loading}
            onChange={handleQueryChange}
            onKeyUp={handleKeyPress.bind(this)}
            className="border-0 dark:text-gray-100 dark:bg-gray-900 block w-full rounded-xl p-2 pr-8 leading-normal shadow-md shadow-secondary-200 ring-2 ring-inset ring-secondary-300 focus:ring-2 focus:ring-inset focus:ring-secondary-300 text-xl md:text-3xl lg:text-4xl"
          />

          <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
            {loading ? (
              <div role="status">
                <span className="inline-flex items-center animate-pulse ">
                  <ColorIcon width={48} height={48} />
                  <span className="sr-only">Loading...</span>
                </span>
              </div>
            ) : (
              <span {...buttonize(sendQueryRequest)} className="inline-flex items-center  ">
                <ColorIcon width={48} height={48} />
              </span>
            )}
          </div>
        </div>

        {results && (
          <div className="mt-6">
            {results?.error ? (
              <div className="text-secondary-500">{results?.error}</div>
            ) : (
              <div className="text-gray-200 text-lg">
                {results?.response?.output_text}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export interface SearchResponse {
  agent?: string
  response?: {
    output_text: string
  }
  error?: string
}

export default AgentSearch
