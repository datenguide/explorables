const fs = require('fs')

let rawdata = fs.readFileSync('schema.json')
let data = JSON.parse(rawdata)

const result = Object.keys(data)
  .map((key) => {
    const statistic = data[key]
    return {
      statistic: key,
      measures: Object.keys(statistic.measures)
        .map((key) => ({
          measure: statistic.measures[key].name,
          region_levels: statistic.measures[key].region_levels,
        }))
        .filter(
          (result) => result.region_levels && result.region_levels.length === 5
        )
        .map((m) => m.measure),
    }
  })
  .filter((s) => s.measures.length > 0)

console.log('--------------------------')
console.log('result', JSON.stringify(result, null, 2))
