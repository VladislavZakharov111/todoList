import React from 'react'
import { useState , useEffect } from 'react'
import { useDispatch,useSelector } from "react-redux";
import { actionSetCategories,actionSetTitle,actionSetDoneTask,actionSetValueSort } from "../../store/todoReducer";
import { arrayCategories } from "../mainPage/constants"

export function Filters() {

    const dispatch = useDispatch()
    const [filterName, setFilterName] = useState<any>(``) 
    const [filterCategories, setFilterCategories] = useState<any>(null)
    const [done,setDone] = useState<any>(null)
    const [sortState, setSortState] = useState<any> (false)

    useEffect(() =>{
        if(filterName.length === 0)
            dispatch(actionSetTitle(null))
        else
            dispatch(actionSetTitle(filterName))
    },[filterName])

    useEffect(() =>{
        dispatch(actionSetCategories(filterCategories))
    },[filterCategories])

    useEffect(() =>{
        dispatch(actionSetDoneTask(done))
    },[done])
    
    useEffect(() =>{
        dispatch(actionSetValueSort(sortState))
    },[sortState])

    const handleFilterName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterName(e.target.value)
    }

    const handleFilterCategories = (e:React.ChangeEvent<HTMLSelectElement>) =>{
        if(e.target.value === 'Все')
            setFilterCategories(null)
        else
            setFilterCategories(e.target.value)
    }
  
    const handleDone = (e:React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value)
        if(e.target.value === 'Все')
            setDone(null)
        else{
            e.target.value === "Выполнено" ? setDone(true) : setDone(false)
        }
    }
  
    const handleSort = (e:React.ChangeEvent<HTMLSelectElement>) =>{
        e.target.value === `По возрастанию` ? setSortState(true) : setSortState(false)
    }
    return (
        <div>
            <input onChange ={handleFilterName} type="text" />
            <select onChange={handleFilterCategories}>
                <option>Все</option>
                {arrayCategories.map((categories:any) =>  <option>{categories}</option>)}
            </select>
            <select onChange={handleDone}>
                <option>Все</option>
                <option>Не выполнено</option>
                <option>Выполнено</option>
            </select>
                Cортировка заголовка
            <select onChange={handleSort}>
                <option >
                    По возрастанию
                </option>
                <option>
                    По убыванию
                </option>
            </select>
        </div>
    )
}

