import React from 'react'
import classNames from 'classnames'
import './MapNav.css'

function MapNav({ items, currentItem, onItemClick }) {
  return (
    <div className="map-nav">
      {items.map((item) => {
        const buttonClass = classNames({ active: currentItem === item })
        return (
          <button
            key={item.id}
            className={buttonClass}
            onClick={() => onItemClick(item)}
          >
            {item.title}
          </button>
        )
      })}
    </div>
  )
}

export default MapNav
