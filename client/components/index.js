/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './Navbar'
export {default as Home} from './Home'
export {default as SingleProduct} from './SingleProduct'
export {default as Checkout} from './Checkout'
export {default as AddressForm} from './AddressForm'
export {default as Cart} from './Cart'
export {default as UserProfile} from './UserProfile'
export {default as OrderProfile} from './SingleOrder'
export {default as OrderConfirmation} from './OrderConfirmation'

export {Login, Signup} from './AuthForm'
