import Header from "../components/header"

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <div className="w-[90%] lg:max-w-6xl mx-auto">
      <Header />
      { children }
    </div>
  )
}

export default Layout