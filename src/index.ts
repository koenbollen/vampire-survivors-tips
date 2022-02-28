import ReactDOM from 'react-dom'
import data from './data.json'
import { App } from './App'

const lookup = data.items.reduce<{ [key: string]: typeof data.items[0] }>((m, i) => {
  m[i.key] = i
  return m
}, {})
data.items.forEach(item => {
  item.from?.forEach(k => {
    if (!(k in lookup)) {
      console.error('Missing key:', k)
    }
  })
})

ReactDOM.render(App(), document.getElementById('app'))
