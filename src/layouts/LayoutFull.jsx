import { Link } from "gatsby"
import React from "react"
import { Footer } from "../components"

export const LayoutFull = ({ children }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-transparent py-6">
        <div className="container">
          <div className="flex flex-wrap -mx-3 xl:-mx-6">
            <div className="flex w-1/2 sm:w-1/2 xl:w-1/2 px-3 xl:px-6">
              <Link to="/" className="inline-block">
                <img alt="Logo" src="/logo.svg" width="150px" />
              </Link>
            </div>
            <div className="flex w-1/2 sm:w-1/2 xl:w-1/2 px-3 xl:px-6 justify-center items-end">
              <Link to="/search" className="soklink">
                Search
              </Link>
            </div>
          </div>
        </div>
      </header>

      {children}

      <Footer />
    </div>
  )
}
