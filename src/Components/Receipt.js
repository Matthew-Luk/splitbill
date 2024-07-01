import React, { useState } from 'react'
import { capitalize } from '../Functions/script'

const Receipt = (props) => {
  const { nameList, setNameList } = props
  const [toggle, setToggle] = useState(1)
  const [paylist, setPaylist] = useState([])
  const [owelist, setOwelist] = useState([])

  const submit1 = (e) => {
    if (paylist.includes(e.target.value)) {
      deleteHandler(e.target.value, paylist, setPaylist)
    } else {
      setPaylist([...paylist, e.target.value])
    }
  }

  const submit2 = (e) => {
    if (owelist.includes(e.target.value)) {
      deleteHandler(e.target.value, owelist, setOwelist)
    } else {
      setOwelist([...owelist, e.target.value])
    }
  }

  const deleteHandler = (deleteValue, arr, setArr) => {
    const newList = arr.filter((item) => {
      return item !== deleteValue
    })
    setArr([...newList])
  }

  const toggleUp = (e) => {
    e.preventDefault()
    setToggle(num => num + 1)
  }

  const toggleDown = (e) => {
    e.preventDefault()
    setToggle(num => num - 1)
  }

  console.log(paylist, owelist)

  return (
    <form className='contentSection'>
      <div className={`content ${toggle === 1 ? "activeContent" : "displayNone"}`}>
        <p>Who paid?</p>
        <div className='list'>
          {
            nameList.map((item, index) => (
              <label key={index} className='label'>
                <input type="checkbox" value={index + 1} onChange={submit1} />
                <p>{capitalize(item.name)}</p>
              </label>
            ))
          }
        </div>
        <div className="buttons">
          <button onClick={toggleUp}>Next</button>
        </div>
      </div>
      <div className={`content ${toggle === 2 ? "activeContent" : "displayNone"}`}>
        <p>Who owes?</p>
        <div className='list'>
          {
            nameList.map((item, index) => (
              <label key={index} className='label'>
                <input type="checkbox" value={index + 1} onChange={submit2} />
                <p>{capitalize(item.name)}</p>
              </label>
            ))
          }
        </div>
        <div className="buttons">
          <button onClick={toggleDown}>Back</button>
          <button onClick={toggleUp}>Next</button>
        </div>
      </div>
    </form>
  )
}

export default Receipt