import React, { useState } from 'react'
import { capitalize, listOfNames } from '../Functions/script'

const Receipt = (props) => {
  const { nameList, setNameList, error, setError } = props
  const [toggle, setToggle] = useState(1)
  const [paylist, setPaylist] = useState([])
  const [owelist, setOwelist] = useState([])
  const [templist, setTemplist] = useState([])

  const submit1 = (e) => {
    let value = ""
    for (let i = 0; i < nameList.length; i++) {
      if (parseInt(e.target.value) === nameList[i].id) {
        value = nameList[i].name
      }
    }
    if (paylist.includes(e.target.value)) {
      deleteHandler(e.target.value, paylist, setPaylist)
      deleteHandler(value, templist, setTemplist)
    } else {
      setPaylist([...paylist, e.target.value])
      setTemplist([...templist, value])
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
    if (toggle === 1 && paylist.length === 0) {
      setError("Please select at least 1 person.")
      e.preventDefault()
      return
    }
    e.preventDefault()
    setToggle(num => num + 1)
  }

  const toggleDown = (e) => {
    e.preventDefault()
    setToggle(num => num - 1)
  }

  console.log(paylist, owelist, templist)

  return (
    <form className='contentSection'>
      <div className={`content ${toggle === 1 ? "activeContent" : "displayNone"}`}>
        <div className={`error ${error ? "" : "colorWhite"}`}>{error}</div>
        <p className='listHeader'>Who paid?</p>
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
        <div className={`error ${error ? "" : "colorWhite"}`}>{error}</div>
        <p className='listHeader'>Who owes {`${listOfNames(templist)}`}?</p>
        <div className='list'>
          <label className='label'>
            <input type="checkbox" value={nameList.length + 1} onChange={submit2} />
            <p>Everyone</p>
          </label>
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
      <div className={`content ${toggle === 3 ? "activeContent" : "displayNone"}`}>
        <div className={`error ${error ? "" : "colorWhite"}`}>{error}</div>
        <div className='listHeader'>How did you want to split the bill?</div>
        <div className='list'>
          <label className='label'>
            <input type="checkbox" value={nameList.length + 1} onChange={submit2} />
            <p>Evenly</p>
          </label>
          <label className='label'>
            <input type="checkbox" value={nameList.length + 1} onChange={submit2} />
            <p>Itemized</p>
          </label>
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