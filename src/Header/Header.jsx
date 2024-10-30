import React from 'react'
import LogoIcon from '../commonResource/images/icons/logo-sm.png'
import SearchIcon from '../commonResource/images/icons/search-icon-sm.png'
import CartIcon from '../commonResource/images/icons/cart-sm.png'
import { Link } from 'react-router-dom'
function Header() {
  return (
    <div>
            <div className="nav-wrapper fixed-top">
		<div className="container">
			<nav className="navbar navbar-toggleable-sm navbar-expand-md">
			    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target=".navbar-collapse">
			        ☰
			    </button>
			    <a className="navbar-brand mx-auto" to="/#"><img src={LogoIcon}/></a>

			    <div className="navbar-collapse collapse">
			        <ul className="navbar-nav nav-justified w-100 nav-fill">
						<li className="nav-item"><Link className="nav-link js-scroll-trigger" to="/mac">Mac</Link></li>
						<li className="nav-item"><Link className="nav-link js-scroll-trigger" to="/iphone">Iphone</Link></li>
						<li className="nav-item"><Link className="nav-link js-scroll-trigger" to="/ipad">Ipad</Link></li>
						<li className="nav-item"><Link className="nav-link js-scroll-trigger" to="/watch">Watch</Link></li>
						<li className="nav-item"><Link className="nav-link js-scroll-trigger" to="/tv">Tv</Link></li>
						<li className="nav-item"><Link className="nav-link js-scroll-trigger" to="/music">Music</Link></li>
						<li className="nav-item"><Link className="nav-link js-scroll-trigger" to="/support">Support</Link></li>
						<li className="nav-item" ><Link className="nav-link js-scroll-trigger" to="/search"><img src={SearchIcon}/></Link></li>
						<li className="nav-item"><Link  className="nav-link js-scroll-trigger" to="/cart"><img src={CartIcon}/></Link></li>
			        </ul>
			    </div>
			</nav>
		</div>
	</div>
    </div>
  )
}

export default Header
