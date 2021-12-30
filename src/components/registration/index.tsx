import React from 'react'

export function Registration() {
    return (
            <div className='wrapper_registation'>
                Регистрация
                <form>
                    <input type= "email" placeholder='Email' />
                    <input type= "password" placeholder='Password' />
                    <input type= "password" placeholder='Repeat password' />
                    <button>Зарегестрироваться</button>
                </form>
            </div>
    )
}

