import { Link } from "gatsby"
import React from "react"
//import DarkModeToggle from "react-dark-mode-toggle"
import { Footer } from "../components"
//import { useDarkMode } from "../hooks"

export const LayoutFull = ({ children }) => {
  //const [isDarkMode, setIsDarkMode] = useDarkMode()

  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-transparent py-6">
        <div className="container text-center">
          <div className="relative">
            <Link to="/" className="inline-block">
              <img alt="Logo" src="/logo.svg" width="150px"/>
            </Link>

            <div className="absolute top-0 right-0">
              {/* <DarkModeToggle
                onChange={setIsDarkMode}
                checked={isDarkMode}
                size={64}
                speed={1.75}
              /> */}
            </div>
          </div>
        </div>
      </header>

      {children}
      
      <Footer />
    </div>
  )
}
