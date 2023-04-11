import { buttonize } from "@/lib/utils/buttonize";
import { useState } from "react";
import AgentSearch from "./AgentSearch";



export default function CTA1() {
    return (
      <div className="relative isolate overflow-hidden dark:bg-primary-700/70 bg-primary-400/90 rounded-xl">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              We build agents that connect the best foundation models <span className="text-secondary-500">with your</span> data and documents. 
              <br/>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Our AI agents are a new type of automation tool that uses natural language to analyze patterns and take actions. Our AI agents can be customized to suit the specific needs of a business and can automate tasks, optimize processes, and ultimately enhance customer experience and business performance.
            </p>
            <h3 className="mt-2"><span className="text-2xl font-bold tracking-tight text-secondary-500">Ask our Agent about Discontinuity.AI</span></h3>

            <div className="mt-5 flex items-center justify-center gap-x-6">
              <AgentSearch />
            </div>
          </div>
        </div>
      </div>
    )
  }
  