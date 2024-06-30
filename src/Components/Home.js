import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addNameToList, capitalize } from '../Functions/script'
import '../SCSS/styles.scss'

const Home = (props) => {
  const { nameList, setNameList } = props
  const [ searchName, setSearchName ] = useState("")
  const [ error, setError ] = useState("")
  const [ toggle, setToggle ] = useState(1)
  const navigate = useNavigate()

  const addName = (e) => {
    e.preventDefault()
    const name = e.target[0].value.toLowerCase()
    const result = addNameToList(nameList, name)
    if(result === true) {
      setNameList([...nameList, name])
      localStorage.setItem("savedNameList", JSON.stringify([...nameList, name]))
      setError("")
    }else{
      setError(result)
    }
    setSearchName("")
  }

  const updateSearchValue = (e) => {
    setSearchName(e.target.value)
  }

  const clearLocalStorage = () => {
    localStorage.clear()
    window.location.reload()
  }

  const toggleTab = (e) => {
    console.log(e)
    setToggle(e)
  }

  useEffect(() => {
    const retArr = JSON.parse(localStorage.getItem("savedNameList"))
    if(retArr) {
      setNameList(retArr)
    }
  },[setNameList])

  return (
    <div className='container'>
      <div className='tabs'>
        <div className={`tab btlr ${toggle === 1 ? "activeTab" : ""}`} onClick={() => toggleTab(1)}>Add Name</div>
        <div className={`tab btrr ${toggle === 2 ? "activeTab" : ""}`} onClick={() => toggleTab(2)}>Add Receipt</div>
      </div>
      <div className='contentSection'>
        {error ? <div className='error'>{error}</div> : ""}
        <div className={`content ${toggle === 1 ? "activeContent" : "displayNone"}`}>
          <div className='list'>
            {
              nameList.map((item, index) => (
                <p key={index}>{index+1}. {capitalize(item)}</p>
              ))
            }
          </div>
          <form onSubmit={addName}>
            <input type="text" placeholder='Name...' onChange={updateSearchValue} value={searchName}/>
            <button type='submit'>Add</button>
            <button onClick={clearLocalStorage}>Clear all</button>
          </form>
        </div>
        <div className={`content ${toggle === 2 ? "activeContent" : "displayNone"}`}>
          <p>content 2</p>
        </div>
      </div>
    </div>
  )
}

export default Home