/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as Home} from './home'
export {default as SingleProduct} from './SingleProduct'
export {default as Cart} from './Cart'
export {default as UserProfile} from './UserProfile'
export {default as OrderProfile} from './SingleOrder'

export {Login, Signup} from './auth-form'
