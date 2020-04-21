import flexsearch from 'flexsearch'
import regions from '@datenguide/metadata'

const getLabel = (id) => `${id} - ${regions[id].name}`

const regionsIndex = flexsearch.create()
Object.keys(regions).forEach((id) => {
  regionsIndex.add(id, getLabel(id))
})

const searchRegion = (filter) => {
  const regionsResult = regionsIndex.search({
    query: filter || '1',
  })

  return regionsResult.map((id) => ({
    value: id,
    name: getLabel(id),
  }))
}

export default searchRegion
