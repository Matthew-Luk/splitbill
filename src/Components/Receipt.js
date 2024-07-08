import React, { useState } from 'react'
import { capitalize, listOfNames, convertNumToName, convertNamesToNum, deleteFromList, calculateTotalEvenly } from '../Functions/script'

const Receipt = (props) => {
  const { namelist, setNamelist, error, setError, index } = props
  const [toggle2, setToggle2] = useState(1)
  const [paylist, setPaylist] = useState([])
  const [owelist, setOwelist] = useState([])
  const [templist, setTemplist] = useState([])
  // const [checkAll, setCheckAll] = useState(true)
  const [split, setSplit] = useState("")
  const [total, setTotal] = useState(0)

  const submit1 = (e) => {
    if (paylist.includes(e.target.value)) {
      deleteFromList(e.target.value, paylist, setPaylist)
    } else {
      setPaylist([...paylist, e.target.value])
    }
  }

  const submit2 = (e) => {
    if (owelist.includes(e.target.value)) {
      deleteFromList(e.target.value, owelist, setOwelist)
    } else {
      setOwelist([...owelist, e.target.value])
    }
  }

  const submit3 = (e) => {
    setSplit(e.target.value)
  }

  const handleTotal = (e) => {
    setTotal(parseInt(e.target.value))
  }

  const toggleUp = (e) => {
    e.preventDefault()
    if (toggle2 === 1) {
      if (paylist.length === 0) {
        setError("Please select at least 1 person.")
        return
      }
    } else if (toggle2 === 2) {
      if (owelist.length === 0) {
        setError("Please select at least 1 person.")
        return
      } else {
        setTemplist(convertNumToName(namelist, paylist.concat(owelist), index))
      }
    } else if (toggle2 === 3) {
      if (split === "") {
        setError("Please select how you want to split the bill.")
      } else if (split === "evenly") {
        setToggle2(4)
        setTotal(0)
      } else {
        setToggle2(5)
      }
      return
    } else if (toggle2 === 4) {
      submitReceipt()
      window.location.reload()
    }
    setError("")
    setToggle2(num => num + 1)
  }

  const toggleDown = (e) => {
    e.preventDefault()
    setError("")
    setToggle2(num => num - 1)
  }

  const submitReceipt = () => {
    let temp = convertNamesToNum(namelist, templist)
    setNamelist(calculateTotalEvenly(namelist, paylist, temp, total))
    localStorage.setItem("savedNamelist", JSON.stringify([...namelist]))
    localStorage.setItem("savedToggle1", JSON.stringify(2))
  }

  console.log(namelist, paylist, owelist, templist, split, total)

  return (
    <form className='contentSection' onSubmit={submitReceipt}>
      <div className={`content ${toggle2 === 1 ? "activeContent" : "displayNone"}`}>
        <div className={`error ${error ? "" : "colorWhite"}`}>{error}</div>
        <p className='listHeader'>{namelist.length !== 0 ? "Who paid?" : "Add people before adding a receipt."}</p>
        <div className='list'>
          {
            namelist.map((item, index) => (
              <label key={index} className='label1'>
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
      <div className={`content ${toggle2 === 2 ? "activeContent" : "displayNone"}`}>
        <div className={`error ${error ? "" : "colorWhite"}`}>{error}</div>
        <p className='listHeader'>Who owes {`${listOfNames(convertNumToName(namelist, paylist))}`}?</p>
        <div className='list'>
          <label className='label1'>
            <input type="checkbox" value={namelist.length + 1} onChange={submit2} />
            <p>Everyone</p>
          </label>
          {
            namelist.map((item, index) => (
              <label key={index} className='label1'>
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
      <div className={`content ${toggle2 === 3 ? "activeContent" : "displayNone"}`}>
        <div className={`error ${error ? "" : "colorWhite"}`}>{error}</div>
        <div className='listHeader'>How did you want to split the bill?</div>
        <div className='list'>
          <label className='label1'>
            <input type="radio" name='question' value={"evenly"} onChange={submit3} />
            <p>Evenly</p>
          </label>
          <label className='label1'>
            <input type="radio" name='question' value={"itemized"} onChange={submit3} />
            <p>Itemized</p>
          </label>
        </div>
        <div className="buttons">
          <button onClick={toggleDown}>Back</button>
          <button onClick={toggleUp}>Next</button>
        </div>
      </div>
      <div className={`content ${toggle2 === 4 ? "activeContent" : "displayNone"}`}>
        <div className={`error ${error ? "" : "colorWhite"}`}>{error}</div>
        <div className='listHeader'>What was the total for the bill?</div>
        <div className='list'>
          {/* <label className='label2'>
            <p>Subtotal:</p>
            <div className='dollarInput'>
              <p>$</p>
              <input className='input2' type="number" id='subtotal' placeholder='0.00' onChange={handleTotal} />
            </div>
          </label>
          <label className='label2'>
            <p>Tip:</p>
            <div className='dollarInput'>
              <p>$</p>
              <input className='input2' type="number" id='tip' placeholder='0.00' onChange={handleTotal} />
            </div>
          </label>
          <label className='label2'>
            <p>Tax:</p>
            <div className='dollarInput'>
              <p>$</p>
              <input className='input2' type="number" id='tax' placeholder='0.00' onChange={handleTotal} />
            </div>
          </label>
          <p className='or'>OR</p> */}
          <label className='label2'>
            <p>Total:</p>
            <div className='dollarInput'>
              <p>$</p>
              <input className='input2' type="number" id='total' placeholder='0.00' onChange={handleTotal} />
            </div>
          </label>
        </div>
        <div className="buttons">
          <button onClick={toggleDown}>Back</button>
          <button type='submit'>Submit</button>
        </div>
      </div>
    </form>
  )
}

export default Receipt