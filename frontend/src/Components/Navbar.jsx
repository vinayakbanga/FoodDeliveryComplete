import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon,ShoppingCartIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector} from 'react-redux'
// import image from "./"
import imagef from "../img1/logo.png"
import { logout } from '../Actions/userAction'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//10:30



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar({user}) {
  const dispatch = useDispatch();

  const {cartItems}=useSelector((state)=>state.cart)
  // console.log(cartItems.length);

  const userRole = user && user.user ? user.user.role : null;
  const handleLogout=()=>{
    dispatch(logout());
    toast.success("Logout Sucessfull")
  }

  let navigation = [
    { name: 'Menu', href: '/', current: true }
  ];

  if (user.isAuthenticated) {
    if (userRole === 'admin') {
      navigation.push({ name: 'All Orders', href: '/admin/orders', current: false });
    } else {
      navigation.push({ name: 'Orders', href: '/orders/me', current: false });
    }
    navigation.push({ name: `Hi, ${user.user.name}`, href: '#', current: false });
    navigation.push({ name: 'Logout', href: '/', onClick: handleLogout, current: false });
  } else {
    navigation.push({ name: 'Login', href: '/login', current: false });
    navigation.push({ name: 'Register', href: '/register', current: false });
  }

  
  return (
    <Disclosure as="nav" className="bg-white  mt-2  ">
      {({ open }) => (
        <>
          <div className=" mx-auto max-w-7xl px-2 sm:px-6 lg:px-2   ">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-900 hover:text-orange-700  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 md:items-center justify-center sm:items-stretch md:justify-between text-lg    ">
                <div className="flex flex-shrink-0 items-center">
                  <img
                  
                    className="h-16 w-auto"
                    src={imagef}
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 ">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={item.onClick}
                        className={classNames(
                          item.current ? 'text-orange-500' : 'text-gray-900 hover:text-orange-500  ',
                          'rounded-md px-3 py-2 text-base font-medium md:text-lg'
                        ) } 
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Link to="/cart">
                <button
                  type="button"
                  className="relative rounded-full bg-orange-500 p-1 text-white hover:text-orange-500 hover:border-orange-500 hover:bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-orange-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View items</span>
                  
                  <div className='flex items-center'>
                  <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                  <span class="  rounded-full  text-xs font-medium text-white  mb-5">{cartItems.length}</span>
                 
                  </div>
                </button>
                  </Link>

                {/* Profile dropdown
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item> */}
                      {/* <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item> */}
                      {/* <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu> */}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-orange-500 text-white' : 'text-gray-900 hover:bg-orange-500 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
