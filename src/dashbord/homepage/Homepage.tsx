import { Navbar } from './Navbar'
import { DrawerComponent } from './DrawerComponent'

export function Homepage() {
  console.log('This is Home')
  return (
    <div className="container-fluid p-0">
      <nav>
        <Navbar />
      </nav>
      <div className="d-flex">
        <div className="sideNav" style={{ width: '20%' }}>
          <DrawerComponent />
        </div>
        <div className="main" style={{ width: '80%', background: '#77b5d9' }}>
          <h1>Home Page</h1>
        </div>
      </div>
    </div>
  )
}
