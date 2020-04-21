import React from 'react'
import classNames from 'classnames'
import './MapNav.css'

function MapNav({ items, currentItem, onItemClick }) {
  return (
    <div className="map-nav">
      {items.map(({ id, title }) => {
        const buttonClass = classNames({ active: currentItem === id })
        return (
          <button
            key={id}
            className={buttonClass}
            onClick={() => onItemClick(id)}
          >
            {title}
          </button>
        )
      })}
    </div>
  )
}

export default MapNav
