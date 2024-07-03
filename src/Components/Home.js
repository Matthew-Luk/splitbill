import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validate, capitalize, convert } from '../Functions/script'
import '../SCSS/styles.scss'
import Receipt from './Receipt'

const Home = (props) => {
  const { nameList, setNameList } = props
  const [searchName, setSearchName] = useState("")
  const [error, setError] = useState("")
  const [toggle, setToggle] = useState(1)
  const [index, setIndex] = useState(1)
  const navigate = useNavigate()

  const addName = (e) => {
    e.preventDefault()
    const name = e.target[0].value.toLowerCase()
    const result = validate(nameList, name)
    if (result === true) {
      const input = convert(index, name)
      setNameList([...nameList, input])
      increment(index)
      localStorage.setItem("savedIndex", JSON.stringify(index))
      localStorage.setItem("savedNameList", JSON.stringify([...nameList, input]))
      setError("")
    } else {
      setError(result)
    }
    setSearchName("")
  }

  const increment = (e) => {
    setIndex(idx => idx + 1)
  }

  const updateSearchValue = (e) => {
    setSearchName(e.target.value)
  }

  const clearLocalStorage = (e) => {
    e.preventDefault()
    localStorage.clear()
    window.location.reload()
  }

  const toggleTab = (e) => {
    setToggle(e)
    setError("")
  }

  useEffect(() => {
    const retArr = JSON.parse(localStorage.getItem("savedNameList"))
    const newIndex = JSON.parse(localStorage.getItem("savedIndex")) + 1
    console.log(newIndex)
    if (retArr) {
      setNameList(retArr)
    } if (newIndex) {
      setIndex(newIndex)
    }
  }, [setNameList])

  return (
    <div className='container'>
      <div className='tabs'>
        <div className={`tab btlr ${toggle === 1 ? "activeTab" : ""}`} onClick={() => toggleTab(1)}>Add People</div>
        <div className={`tab btrr ${toggle === 2 ? "activeTab" : ""}`} onClick={() => toggleTab(2)}>Add Receipt</div>
      </div>
      <div className='contentSection'>
        <div className={`content ${toggle === 1 ? "activeContent" : "displayNone"}`}>
          <div className={`error ${error ? "" : "colorWhite"}`}>{error}</div>
          <div className='list'>
            {
              nameList.map((item, index) => (
                <p key={index}>{index + 1}. {capitalize(item.name)}</p>
              ))
            }
          </div>
          <form onSubmit={addName}>
            <input type="text" placeholder='Name...' onChange={updateSearchValue} value={searchName} />
            <div className='buttons'>
              <button type='submit'>Add</button>
              <button onClick={clearLocalStorage}>Clear all</button>
            </div>
          </form>
        </div>
        <div className={`content ${toggle === 2 ? "activeContent" : "displayNone"}`}>
          <Receipt nameList={nameList} setNameList={setNameList} error={error} setError={setError} index={index}/>
        </div>
      </div>
    </div>
  )
}

export default Home