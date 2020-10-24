import React, { useEffect, useRef, useState } from 'react'
import { TweenMax, Power3 } from 'gsap'
import { motion, useCycle } from 'framer-motion'
import NavToggle from '../components/NavToggle'
import NavMenu from '../components/NavMenu'

const Nav = () => {
  let menu = useRef(null)

  const [state, setState] = useState(false)

  let targetElement = document.querySelector("html")

  const menuExpand = () => {
    TweenMax.to(menu, .6, { maxWidth: "350px", width: "100%", height: "550px", ease: Power3.easeOut })
    setState(true)
  }
  const menuShrink = () => {
    TweenMax.to(menu, .5, {width: 60, height: 60, ease: Power3.easeOut})
    setState(false)
  }
  
  useEffect(() => {
    TweenMax.fromTo("nav", .7, {opacity: 0}, {opacity: 1, duration: 0.1, ease: Power3.easeIn}),
    TweenMax.fromTo(".home_trav", .7, {opacity: 0, y: -40}, {opacity: 1, y: 0, duration: 0.6, delay: 0.3}),
    TweenMax.fromTo(".home_mags", .6, {opacity: 0, y: -30}, {opacity: 1, y: 0, duration: 0.6, delay: 0.4, ease: Power3.easeOut}),
    TweenMax.fromTo(".home_logo", .7, {opacity: 0, y: 30}, {opacity: 1, y: 0, duration: 0.6, delay: 0.6, ease: Power3.easeOut}),
    TweenMax.fromTo("h4", .7, {opacity: 0, y: 40}, {opacity: 1, y: 0, duration: 0.6, delay: 0.75, ease: Power3.easeOut})
  }, [])
  
  const menuToggle = state !== true ? menuExpand : menuShrink
  const [isOpen, toggleOpen] = useCycle(false, true)

  useEffect(() => {
    state
    ? targetElement.classList.add("no-scroll")
    : targetElement.classList.remove("no-scroll")
  })

  return (
    <nav
      ref={el => menu = el}
      onClick={() => { menuToggle(), toggleOpen() }}
      //toggle={() => { menuToggle(), toggleOpen() }}
    >
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
      >
        <NavToggle />
        <NavMenu />
      </motion.div>
    </nav>
  )
}

export default Nav