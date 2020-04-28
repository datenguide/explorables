import React from 'react'
import clsx from 'clsx'
import './MapNav.css'

function MapNav({ items, currentItem, onItemClick }) {
  return (
    <div className="map-nav">
      {items.map((item) => (
        <button
          className={clsx({ active: currentItem === item })}
          key={item.id}
          onClick={() => onItemClick(item)}
        >
          {item.title}
        </button>
      ))}
    </div>
  )
}

export default MapNav
