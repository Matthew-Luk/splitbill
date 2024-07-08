import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import { validate, capitalize, convert } from '../Functions/script'
import '../SCSS/styles.scss'
import Receipt from './Receipt'

const Home = (props) => {
  const { namelist, setNamelist } = props
  const [searchName, setSearchName] = useState("")
  const [error, setError] = useState("")
  const [toggle, setToggle] = useState(1)
  const [index, setIndex] = useState(1)
  // const navigate = useNavigate()

  const addName = (e) => {
    e.preventDefault()
    const name = e.target[0].value.toLowerCase()
    const result = validate(namelist, name)
    if (result === true) {
      const input = convert(index, name)
      setNamelist([...namelist, input])
      increment(index)
      localStorage.setItem("savedIndex", JSON.stringify(index))
      localStorage.setItem("savedNamelist", JSON.stringify([...namelist, input]))
      localStorage.setItem("savedToggle1", JSON.stringify(1))
      setError("")
    } else {
      setError(result)
    }
    setSearchName("")
  }

  const increment = () => {
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
    localStorage.setItem("savedToggle1", JSON.stringify(e))
    setError("")
  }

  useEffect(() => {
    const newArr = JSON.parse(localStorage.getItem("savedNamelist"))
    const newIndex = JSON.parse(localStorage.getItem("savedIndex")) + 1
    const newToggle = JSON.parse(localStorage.getItem("savedToggle1"))
    if (newArr) {
      setNamelist(newArr)
    } if (newIndex) {
      setIndex(newIndex)
    } if (newToggle !== 1) {
      setToggle(newToggle)
    } if (newToggle === null) {
      setToggle(1)
    }
  }, [setNamelist])


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
              namelist.map((item, index) => (
                <p key={index}>{index + 1}. {capitalize(item.name)}</p>
              ))
            }
          </div>
          <form onSubmit={addName}>
            <input className='input1' type="text" placeholder='Name...' onChange={updateSearchValue} value={searchName} />
            <div className='buttons'>
              <button type='submit'>Add</button>
              <button onClick={clearLocalStorage}>Clear all</button>
            </div>
          </form>
        </div>
        <div className={`content ${toggle === 2 ? "activeContent" : "displayNone"}`}>
          <Receipt namelist={namelist} setNamelist={setNamelist} error={error} setError={setError} index={index} />
        </div>
      </div>
    </div>
  )
}

export default Home